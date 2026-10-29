# EPIC-13 / TASK-6. Guard посетителя и декоратор `VisitorController`

Исполнитель: haiku
Зависит от: TASK-4, TASK-5
Владеет: apps/server/src/api/visitor/visitor-auth.guard.ts, apps/server/src/api/visitor/visitor-auth.module.ts, apps/server/src/api/visitor/visitor-controller.decorator.ts, apps/server/test/support/zone-e2e-app.ts, apps/server/test/support/visitor-guard-probe.ts, apps/server/test/visitor-auth-guard.e2e-spec.ts
Коммит: [SERVER]: add visitor auth guard and controller decorator
Ветка: feature/EPIC-13

## Что сделать

Контроллеры `/v1/visitor/*` следующих эпиков (кроме создания сессии) закрываются guard посетителя. Образец — guard оператора: `apps/server/src/api/operator/operator-auth.guard.ts`, `operator-controller.decorator.ts`, `operator-auth.module.ts`; e2e-образец — `apps/server/test/operator-auth-guard.e2e-spec.ts` и `test/support/operator-guard-probe.ts`.

1. `api/visitor/visitor-auth.guard.ts` — `VisitorAuthGuard implements CanActivate`, зависимости через `@Inject(...)`: `TokensService`, `RequestContext`, `OperationSteps`. `canActivate`:
   1. `bearerToken(request)` (`infra/http/bearer-token.ts`); нет — 401;
   2. `await this.operationSteps.measure("auth", () => this.tokens.verify(token, "visitor"))`; `undefined` — 401;
   3. `visitorTokenClaimsSchema.safeParse(verified.claims)` (`domain/visitors/visitor-token-claims.ts`, TASK-5); не прошла — 401;
   4. `requestContext.setProjectId(claims.data.projectId)` и `requestContext.setVisitor({ visitorId: verified.subject })` (TASK-4); `return true`.

   401 — один приватный метод `unauthorized()`: `new ApiException({ code: "unauthorized", message: "Visitor token is missing or invalid" })`, один текст на все причины. Базу guard не читает: access-токен проверяется по подписи.

2. `api/visitor/visitor-controller.decorator.ts`:

   ```ts
   export function VisitorController(path: string) {
     return applyDecorators(
       Controller(`visitor/${path}`),
       Zone("public"),
       UseGuards(VisitorAuthGuard),
     );
   }
   ```

   `VisitorSessionController` (TASK-5) этот декоратор не использует.

3. `api/visitor/visitor-auth.module.ts` — `VisitorAuthModule` **без** `@Global()`:

   ```ts
   @Module({
     imports: [TokensModule, OperationStepsModule],
     providers: [VisitorAuthGuard],
     exports: [VisitorAuthGuard, TokensModule, OperationStepsModule],
   })
   export class VisitorAuthModule {}
   ```

   Модуль контроллеров с `@VisitorController` импортирует `VisitorAuthModule` явно: guard из `@UseGuards` создаётся в модуле контроллера, ему нужны экспортированные `TokensService` и `OperationSteps` (`RequestContext` — из глобального `RequestContextModule`). В `api.module.ts` модуль не добавлять: контроллеров с guard в этом эпике нет.

4. `test/support/zone-e2e-app.ts`: второй необязательный параметр модулей, остальные вызовы не меняются:

   ```ts
   export async function startZoneE2eApp(
     controllers: Type[] = [],
     imports: Type[] = [],
   ): Promise<ZoneProbeApp>
   ```

   `Test.createTestingModule({ imports: [ApiModule, ...imports], controllers })`.

5. `test/support/visitor-guard-probe.ts` — тестовый контроллер по образцу `OperatorGuardProbeController`: `@VisitorController("guard-probe")`, `GET` возвращает `{ projectId, visitor, authMs }` из `RequestContext` и `OperationSteps`; константа `visitorProbePath = "/v1/visitor/guard-probe"`. Тест поднимает приложение так: `startZoneE2eApp([VisitorGuardProbeController], [VisitorAuthModule])`.

## Где

- `apps/server/src/api/visitor/visitor-auth.guard.ts`, `visitor-auth.module.ts`, `visitor-controller.decorator.ts` — новые файлы.
- `apps/server/test/support/zone-e2e-app.ts` — общий helper.
- `apps/server/test/support/visitor-guard-probe.ts` — новый файл.
- Тест: `apps/server/test/visitor-auth-guard.e2e-spec.ts` (e2e; токены — через `POST /v1/visitor/session` с `createProject(dataSource, { publicKey: generateKey("publicKey") })` и через `TokensService.sign`; подделки — `test/support/forged-tokens.ts`; не длиннее 300 строк).

## Требования из плана

- Посетитель с токеном посетителя может только свои диалоги: ID посетителя и проекта берутся только из проверенного токена.
- Токены посетителей и операторов (JWT) не хранятся: проверяются по подписи без обращения к БД.
- `aud` разделяет токены посетителя и оператора; шаг `auth` измеряется `OperationSteps` (решение EPIC-15).

## Документация

- https://docs.nestjs.com/guards
- https://docs.nestjs.com/custom-decorators#decorator-composition

## Критерии приёмки

- Access-токен из `POST /v1/visitor/session` — 200 на `GET /v1/visitor/guard-probe`, в ответе `projectId` проекта, `visitor.visitorId` — ID созданного посетителя, `authMs` — число не меньше 0.
- Без `Authorization`, с мусором, без схемы `Bearer`, токен в cookie или query — 401 `unauthorized` `Visitor token is missing or invalid`, тело не содержит токен.
- Токен оператора (`aud` `operator`), просроченный токен, `alg` `none`, подпись чужим ключом (`test-2`), токен `visitor` без claim `projectId` — 401.
- Тот же путь на порту `operator` — 404.

## Чего не делать

- Не помечать `VisitorAuthModule` как `@Global()` и не подключать его в `api.module.ts`.
- Не проверять в guard отзыв сессии в БД.
- Не менять guards и модули оператора и серверного ключа.

## История доработок

—
