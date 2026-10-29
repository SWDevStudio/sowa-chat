# EPIC-12 / TASK-7. Guard серверного ключа для /v1/server

Исполнитель: sonnet
Зависит от: TASK-6
Владеет: apps/server/src/infra/http/bearer-token.ts, apps/server/src/infra/http/bearer-token.spec.ts, apps/server/src/api/server/server-key.guard.ts, apps/server/src/api/server/server-controller.decorator.ts, apps/server/src/api/server/server-auth.module.ts, apps/server/src/api.module.ts, apps/server/test/support/zone-e2e-app.ts, apps/server/test/server-key-guard.e2e-spec.ts
Коммит: [SERVER]: guard server api with server key
Ветка: feature/EPIC-12

## Что сделать

Каждый маршрут `/v1/server/*` требует ключ `sk_…` в заголовке `Authorization`. Ключ проверяет `ApiKeysService.verify(key, "server")` из EPIC-9 (`apps/server/src/domain/keys/api-keys.service.ts`, возвращает `VerifiedApiKey { apiKeyId, projectId, botId }` или `undefined`). Папок `apps/server/src/api/` и `apps/server/src/api/server/` ещё нет — создать.

1. `apps/server/src/infra/http/bearer-token.ts` — общий разбор заголовка, им же пользуется guard оператора (TASK-10):

   ```ts
   const bearerPattern = /^Bearer +(\S+)$/i;

   export function bearerToken(request: Request): string | undefined
   ```

   `request` — `Request` из `express`. Нет заголовка `authorization` — `undefined`; заголовок не по шаблону — `undefined`; иначе — значение после `Bearer`. Cookie и query-параметры не читаются.

2. `server-key.guard.ts` — `@Injectable() ServerKeyGuard implements CanActivate`, зависимости через `@Inject`: `ApiKeysService`, `RequestContext` (TASK-6, `apps/server/src/infra/request-context/request-context.ts`), `OperationSteps` (`apps/server/src/telemetry/operation-steps/operation-steps.ts`).

   `async canActivate(context)`:
   1. `const key = bearerToken(context.switchToHttp().getRequest<Request>())`; нет ключа — 401;
   2. `const verified = await this.operationSteps.measure("auth", () => this.apiKeys.verify(key, "server"))` — так время проверки попадает в шаг `auth` медленной операции (решение EPIC-15, сигнатура `measure<T>(step, work)`);
   3. `undefined` (неверный, отозванный, `bk_` вместо `sk_`) — 401;
   4. `this.requestContext.setProjectId(verified.projectId)`, `return true`.

   401 — `throw new ApiException({ code: "unauthorized", message: "Server key is missing or invalid" })` (`apps/server/src/infra/http/api-exception.ts`). Текст один на все причины: по ответу нельзя узнать, существует ли ключ.

3. `server-controller.decorator.ts` — общий декоратор контроллеров внутренней зоны:

   ```ts
   export function ServerController(path: string) {
     return applyDecorators(Controller(`server/${path}`), Zone("internal"), UseGuards(ServerKeyGuard));
   }
   ```

   `Zone` — из `apps/server/src/infra/zones/zone.decorator.ts`. Версия `/v1` добавляется глобальным `enableVersioning` (`apps/server/src/api-app.ts`), поэтому `@ServerController("operator-token")` даёт `/v1/server/operator-token`.

4. `server-auth.module.ts` — `ServerAuthModule` с `@Global()`: `imports: [KeysModule, OperationStepsModule]`, `providers: [ServerKeyGuard]`, `exports: [ServerKeyGuard, KeysModule, OperationStepsModule]`. Guard из `@UseGuards` создаётся в модуле контроллера, поэтому его зависимости должны быть видны из любого модуля: отсюда `@Global()` и реэкспорт. `KeysModule` и `OperationStepsModule` подключаются здесь, а не в каждом модуле контроллеров (решение EPIC-9: `KeysModule` подключают эпики-потребители). `RequestContext` уже глобальный (TASK-6).

5. `apps/server/src/api.module.ts`: добавить `ServerAuthModule` в конец `imports`.

6. `apps/server/test/support/zone-e2e-app.ts` — запуск `ApiModule` с портами зон на настоящей базе и Redis для e2e этого эпика (TASK-9, TASK-10, TASK-11, TASK-12 им пользуются):

   ```ts
   export async function startZoneE2eApp(controllers: Type[] = []): Promise<ZoneProbeApp>
   ```

   Как `startZoneProbeApp` из `apps/server/test/support/zone-probe.ts`, но:
   - без `withOfflineDatabase` и `withOfflineRedis`: база и Redis — контейнеры e2e (`database-url.setup.ts`, `redis-url.setup.ts`);
   - без `stubTestEnv`: остальное окружение — из `apps/server/.env.test`; порты четырёх зон — `findFreePort()` и `vi.stubEnv` для `SOWA_PUBLIC_PORT`, `SOWA_OPERATOR_PORT`, `SOWA_INTERNAL_PORT`, `SOWA_MANAGEMENT_PORT`;
   - без `vi.resetModules()` и динамических импортов: `ApiModule`, `configureApiApp`, `ZoneServers` импортируются статически. Тесты берут провайдеры по классу (`app.get(ApiKeysService)`), а после `resetModules` классы в приложении были бы другими.

   Тип `ZoneProbeApp` — из `zone-probe.ts`.

## Где

- `apps/server/src/infra/http/bearer-token.ts` — новый файл.
- `apps/server/src/api/server/server-key.guard.ts`, `apps/server/src/api/server/server-controller.decorator.ts`, `apps/server/src/api/server/server-auth.module.ts` — новые файлы.
- `apps/server/src/api.module.ts`.
- Читать: `apps/server/src/domain/keys/api-keys.service.ts`, `apps/server/src/domain/keys/keys.module.ts`, `apps/server/src/telemetry/operation-steps/operation-steps.ts`, `apps/server/src/telemetry/operation-steps/operation-steps.module.ts`, `apps/server/src/infra/zones/zone.decorator.ts`, `apps/server/test/support/zone-probe.ts`.
- Тесты:
  - `apps/server/src/infra/http/bearer-token.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`);
  - `apps/server/test/support/zone-e2e-app.ts` и `apps/server/test/server-key-guard.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`). В e2e — пробный контроллер `@ServerController("guard-probe")` с `@Get()`, который возвращает `{ projectId: requestContext.projectId(), authMs: operationSteps.current()?.steps.auth }`; ключи выпускает `app.get(ApiKeysService).issue({ projectId, kind: "server", actorKind: "cli" })`, проект — `createProject` из `apps/server/test/support/fixtures.ts`, база — `useTestDatabase`; запросы — `supertest` на `http://127.0.0.1:${ports.internal}`.

## Требования из плана

| Кто | Чем авторизуется | Где хранится секрет | Что может |
|---|---|---|---|
| Бекенд админки | serverKey `sk_…` | только на бекенде админки | выпускать токены операторов, настраивать проект |

- Даже во внутренней зоне каждый запрос несёт ключ или токен: иначе любой скомпрометированный сервис или VPN-аккаунт получит доступ ко всей переписке.
- Авторизация только через заголовок `Authorization`; cookie для авторизации не используются.
- Контроллеры разделены по аудиториям, у каждой группы свои guards (`api/server/` — server-to-server API).
- Шаг `auth` медленной операции замеряется `OperationSteps.measure("auth", ...)` (решение EPIC-15).

## Документация

- https://docs.nestjs.com/guards
- https://docs.nestjs.com/custom-decorators#decorator-composition
- https://docs.nestjs.com/security/authentication

## Критерии приёмки

- `bearerToken`: `Bearer abc` и `bearer abc` дают `abc`; нет заголовка, `Basic abc`, `Bearer` без значения и `Bearer a b` дают `undefined` (unit).
- `/v1/server/guard-probe` на внутреннем порту без заголовка — 401 с `code` `unauthorized`; с верным `sk_` — 200, в теле `projectId` проекта ключа и `authMs` — число не меньше 0 (e2e).
- Отозванный ключ (`ApiKeysService.revoke`), `bk_` того же проекта, ключ с изменённым символом и `sk_` в cookie вместо заголовка — 401 (e2e).
- Тот же маршрут на публичном порту — 404 (`ZoneGuard` срабатывает раньше, e2e).

## Чего не делать

- Не кэшировать проверку ключа — это эпик кэша (EPIC-14).
- Не делать выдачу токена оператора — это TASK-9.
- Не подключать `KeysModule` прямо в `api.module.ts` — только через `ServerAuthModule`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
