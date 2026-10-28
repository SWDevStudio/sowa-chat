# EPIC-12 / TASK-11. Маршруты только для supervisor: декоратор и guard роли

Исполнитель: haiku
Зависит от: TASK-10
Владеет: apps/server/src/api/operator/supervisor-only.decorator.ts, apps/server/src/api/operator/operator-role.guard.ts, apps/server/src/api/operator/operator-role.guard.spec.ts, apps/server/src/api/operator/operator-controller.decorator.ts, apps/server/test/operator-roles.e2e-spec.ts
Коммит: [SERVER]: restrict supervisor-only operator routes
Ветка: feature/EPIC-12

## Что сделать

Маршрут оператора, помеченный `@SupervisorOnly()`, недоступен роли `operator` — 403. Ролей две (`operator`, `supervisor`), `supervisor` может всё, что может `operator`, поэтому отдельный декоратор для `operator` не нужен: любой маршрут `OperatorController` уже доступен обеим ролям.

1. `supervisor-only.decorator.ts`:

   ```ts
   export const supervisorOnlyMetadataKey = "supervisorOnly";

   export function SupervisorOnly() {
     return SetMetadata(supervisorOnlyMetadataKey, true);
   }
   ```

   Постоянный ключ и `SetMetadata`, а не `Reflector.createDecorator`, — по той же причине, что `Zone` (EPIC-4 TASK-1): ключ `createDecorator` случаен для каждой загрузки модуля.

2. `operator-role.guard.ts` — `@Injectable() OperatorRoleGuard implements CanActivate`, зависимости через `@Inject`: `Reflector`, `RequestContext`.

   `canActivate(context)` (синхронный):
   1. `const supervisorOnly = this.reflector.getAllAndOverride<boolean | undefined>(supervisorOnlyMetadataKey, [context.getHandler(), context.getClass()])`;
   2. не `true` — `return true`;
   3. `this.requestContext.operator().role === "supervisor"` — `return true`;
   4. иначе — `throw new ApiException({ code: "forbidden", message: "Supervisor role is required" })` (403).

3. `operator-controller.decorator.ts` (TASK-10): `UseGuards(OperatorAuthGuard)` заменить на `UseGuards(OperatorAuthGuard, OperatorRoleGuard)`. Порядок важен: guard роли читает оператора, которого кладёт `OperatorAuthGuard`. Зависимости guard роли (`Reflector`, глобальный `RequestContext`) видны из любого модуля, поэтому `operator-auth.module.ts` не меняется.

## Где

- `apps/server/src/api/operator/supervisor-only.decorator.ts`, `apps/server/src/api/operator/operator-role.guard.ts` — новые файлы.
- `apps/server/src/api/operator/operator-controller.decorator.ts`.
- Тесты:
  - `apps/server/src/api/operator/operator-role.guard.spec.ts` (unit, `pnpm --filter @sowa-chat/server test`): guard создаётся напрямую `new OperatorRoleGuard(new Reflector(), requestContextStub)`, `ExecutionContext` — заглушка с `getHandler` и `getClass` пробного класса с `@SupervisorOnly()` на одном методе;
  - `apps/server/test/operator-roles.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`): `startZoneE2eApp([RolesProbeController])` из `apps/server/test/support/zone-e2e-app.ts`; пробный `@OperatorController("roles-probe")` с маршрутами `@Get("any")` и `@Get("supervisor")` + `@SupervisorOnly()`; токены — `app.get(OperatorsService).issueToken(...)` с ролями `operator` и `supervisor`, запросы на `http://127.0.0.1:${ports.operator}`.

## Требования из плана

- Роли `operator` и `supervisor`; supervisor видит все диалоги и настройки и может то, что недоступно оператору (например, `DELETE /v1/operator/conversations/:id` — только supervisor).
- Роли передаёт бекенд админки, мы их не придумываем.
- Действия оператора — в рамках роли.

## Документация

- https://docs.nestjs.com/security/authorization#basic-rbac-implementation
- https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

## Критерии приёмки

- Метод без `@SupervisorOnly()` пропускает обе роли; метод с `@SupervisorOnly()` пропускает `supervisor` и бросает `ApiException` со статусом 403 для `operator` (unit).
- `GET /v1/operator/roles-probe/supervisor` с токеном `operator` — 403 с `code` `forbidden`, с токеном `supervisor` — 200; `GET /v1/operator/roles-probe/any` — 200 с обоими токенами (e2e).
- Без токена `GET /v1/operator/roles-probe/supervisor` — 401, а не 403: сначала срабатывает `OperatorAuthGuard` (e2e).

## Чего не делать

- Не добавлять другие роли и иерархию ролей.
- Не менять `OperatorAuthGuard` — список блокировок в нём делает TASK-12.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
