# EPIC-12 / TASK-10. Guard оператора для /v1/operator: токен и контекст оператора

Исполнитель: sonnet
Зависит от: TASK-4, TASK-6, TASK-7, TASK-8
Владеет: apps/server/src/api/operator/operator-auth.guard.ts, apps/server/src/api/operator/operator-controller.decorator.ts, apps/server/src/api/operator/operator-auth.module.ts, apps/server/src/api.module.ts, apps/server/test/operator-auth-guard.e2e-spec.ts
Коммит: [SERVER]: guard operator api with operator token
Ветка: feature/EPIC-12

## Что сделать

Каждый маршрут `/v1/operator/*` требует токен оператора в заголовке `Authorization: Bearer …`. Токен проверяет `TokensService.verify(token, "operator")` (TASK-4, `apps/server/src/infra/tokens/tokens.service.ts`) без обращения к БД. Образец устройства — guard серверного ключа (TASK-7, `apps/server/src/api/server/`). Папки `apps/server/src/api/operator/` ещё нет — создать.

1. `operator-auth.guard.ts` — `@Injectable() OperatorAuthGuard implements CanActivate`, зависимости через `@Inject`: `TokensService`, `RequestContext`, `OperationSteps`.

   Claims токена разбираются схемой в этом же файле:

   ```ts
   const operatorClaimsSchema = z.object({
     projectId: z.string().min(1),
     role: z.enum(operatorRoles),
   });
   ```

   `operatorRoles` — из `@sowa-chat/protocol` (TASK-2).

   `async canActivate(context)`:
   1. `const token = bearerToken(request)` (`apps/server/src/infra/http/bearer-token.ts`, TASK-7); нет токена — 401;
   2. `const verified = await this.operationSteps.measure("auth", () => this.tokens.verify(token, "operator"))` — шаг `auth` медленной операции (решение EPIC-15);
   3. `undefined` (подпись, `alg`, `kid`, срок, `aud` `visitor`) — 401;
   4. `operatorClaimsSchema.safeParse(verified.claims)` не прошёл — 401;
   5. `setProjectId(claims.projectId)` и `setOperator({ operatorId: verified.subject, role: claims.role })` в `RequestContext`, `return true`.

   401 — `throw new ApiException({ code: "unauthorized", message: "Operator token is missing or invalid" })`. Текст один на все причины.

2. `operator-controller.decorator.ts`:

   ```ts
   export function OperatorController(path: string) {
     return applyDecorators(Controller(`operator/${path}`), Zone("operator"), UseGuards(OperatorAuthGuard));
   }
   ```

   Guard роли в этот декоратор добавит TASK-11.

3. `operator-auth.module.ts` — `OperatorAuthModule` с `@Global()`: `imports: [TokensModule, OperatorsModule, OperationStepsModule]`, `providers: [OperatorAuthGuard]`, `exports: [OperatorAuthGuard, TokensModule, OperatorsModule, OperationStepsModule]`. Причина `@Global()` и реэкспорта — та же, что у `ServerAuthModule` (TASK-7): guard из `@UseGuards` создаётся в модуле контроллера. `OperatorsModule` нужен здесь для списка блокировок (TASK-12).

4. `apps/server/src/api.module.ts`: добавить `OperatorAuthModule` в конец `imports`.

## Где

- `apps/server/src/api/operator/operator-auth.guard.ts`, `apps/server/src/api/operator/operator-controller.decorator.ts`, `apps/server/src/api/operator/operator-auth.module.ts` — новые файлы.
- `apps/server/src/api.module.ts`.
- Читать: `apps/server/src/api/server/server-key.guard.ts`, `apps/server/src/api/server/server-auth.module.ts`, `apps/server/src/infra/tokens/tokens.service.ts`, `apps/server/src/infra/request-context/request-context.ts`, `apps/server/src/telemetry/operation-steps/operation-steps.ts`.
- Тест: `apps/server/test/operator-auth-guard.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`): `startZoneE2eApp([OperatorGuardProbeController])` из `apps/server/test/support/zone-e2e-app.ts`; пробный контроллер `@OperatorController("guard-probe")` с `@Get()` возвращает `{ projectId, operator, authMs }` из `RequestContext` и `OperationSteps.current()?.steps.auth`. Токен оператора — `app.get(OperatorsService).issueToken(...)` для проекта из `createProject`; поддельные токены — `app.get(TokensService).sign(...)` и `SignJWT` из `jose` с тестовыми ключами из `decisions.md`. Запросы — `supertest` на `http://127.0.0.1:${ports.operator}`.

## Требования из плана

- Оператор (браузер): токен оператора (JWT, 15 мин), хранится в памяти вкладки, действия оператора в рамках роли.
- Токены операторов не хранятся у нас: проверяются по подписи без обращения к БД.
- После проверки ID оператора, его роль и ID проекта кладутся в контекст запроса.
- Авторизация только через заголовок `Authorization`; cookie для авторизации не используются.
- Шаг `auth` медленной операции замеряется `OperationSteps.measure("auth", ...)` (решение EPIC-15).

## Документация

- https://docs.nestjs.com/guards
- https://docs.nestjs.com/security/authentication

## Критерии приёмки

- Без токена и с мусорной строкой — 401 с `code` `unauthorized`; с токеном из `issueToken` — 200, в теле `projectId` проекта, `operator` `{ operatorId, role }` оператора и `authMs` — число не меньше 0.
- Токен с подменённым `alg` (`none`, HS256) и токен, подписанный ключом `test-2`, которого нет в `SOWA_TOKEN_SIGNING_KEYS`, — 401.
- Токен с `aud` `visitor` и просроченный токен (`ttlSeconds: 1`, запрос через 2 секунды) — 401.
- Токен с `aud` `operator` без `projectId` или с `role: "admin"` в claims — 401.

## Чего не делать

- Не делать проверку роли — это TASK-11.
- Не делать список заблокированных — это TASK-12.
- Не обращаться к БД в guard.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
