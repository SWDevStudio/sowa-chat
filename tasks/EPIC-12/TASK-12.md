# EPIC-12 / TASK-12. Список заблокированных операторов в памяти реплики

Исполнитель: sonnet
Зависит от: TASK-8, TASK-10
Владеет: apps/server/src/domain/operators/disabled-operators.ts, apps/server/src/domain/operators/disabled-operators.spec.ts, apps/server/src/domain/operators/operators.module.ts, apps/server/src/api/operator/operator-auth.guard.ts, apps/server/test/support/offline-database.ts, apps/server/test/disabled-operators.e2e-spec.ts
Коммит: [SERVER]: reject disabled operators from in-memory list
Ветка: feature/EPIC-12

## Что сделать

Заблокированный оператор (`disabled_at`) с ещё действующим токеном получает 401 без обращения к БД на запросе. Список ID заблокированных хранится в памяти реплики: загружается при старте и меняется методами `add` и `remove`. Вызывать `add` и `remove` при блокировке и синхронизировать список между репликами будет эпик кэша (EPIC-14, команды `operator:disable` и `operator:enable`); в этом эпике блокировки через API нет.

1. `disabled-operators.ts` — `@Injectable() DisabledOperators implements OnApplicationBootstrap`, зависимость через `@Inject`: `OperatorsRepository` (TASK-8, `apps/server/src/domain/operators/operators.repository.ts`).

   ```ts
   private ids = new Set<string>();

   async onApplicationBootstrap(): Promise<void>  // await this.load()
   async load(): Promise<void>                    // this.ids = new Set(await this.operators.findDisabledIds())
   add(operatorId: string): void
   remove(operatorId: string): void
   has(operatorId: string): boolean
   ```

   `load` заменяет множество целиком одним присваиванием. Ошибка БД при старте не перехватывается: `api` без базы и так не стартует (`DatabaseModule`).

2. `operators.module.ts`: добавить `DisabledOperators` в `providers` и `exports`.

3. `apps/server/src/api/operator/operator-auth.guard.ts` (TASK-10): внедрить `DisabledOperators` через `@Inject` и после разбора claims, до записи в `RequestContext`, проверить `this.disabledOperators.has(verified.subject)`; `true` — тот же 401 `Operator token is missing or invalid`. Зависимость видна, потому что `OperatorAuthModule` реэкспортирует `OperatorsModule` (TASK-10).

4. `apps/server/test/support/offline-database.ts`: в `withOfflineDatabase` добавить `.overrideProvider(OperatorsRepository).useValue({ findDisabledIds: async () => [] })`. Без этого все unit-тесты с `ApiModule` и заглушкой базы (`startZoneProbeApp`, `createProbeApp`) упадут на загрузке списка при `app.init()`. В модулях без `OperatorsRepository` переопределение ничего не делает.

## Где

- `apps/server/src/domain/operators/disabled-operators.ts` — новый файл.
- `apps/server/src/domain/operators/operators.module.ts`, `apps/server/src/api/operator/operator-auth.guard.ts`, `apps/server/test/support/offline-database.ts`.
- Тесты:
  - `apps/server/src/domain/operators/disabled-operators.spec.ts` (unit, `pnpm --filter @sowa-chat/server test`): репозиторий — заглушка с `findDisabledIds`;
  - `apps/server/test/disabled-operators.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`): `startZoneE2eApp([DisabledProbeController])` из `apps/server/test/support/zone-e2e-app.ts`, пробный `@OperatorController("disabled-probe")` с `@Get()`; токен — `app.get(OperatorsService).issueToken(...)`, блокировка — `UPDATE operators SET disabled_at = now()` через `useTestDatabase` и `app.get(DisabledOperators).add(id)`; запросы на `http://127.0.0.1:${ports.operator}`.
- Полный `pnpm --filter @sowa-chat/server test` после правки `offline-database.ts` обязателен: от неё зависят все тесты с `ApiModule`.

## Требования из плана

- Заблокированный оператор (`disabled_at`) сразу попадает в список блокировок: запросы отклоняются.
- Список заблокированных операторов хранится в памяти каждой реплики и синхронизируется через Redis (синхронизация — EPIC-14); проверка токена — без обращения к БД.
- Уволенный оператор теряет доступ не позже чем через 15 минут, а после `disabled_at` — сразу.

## Документация

- https://docs.nestjs.com/fundamentals/lifecycle-events

## Критерии приёмки

- После `load` `has` истинен ровно для ID из `findDisabledIds`; `add` и `remove` меняют ответ `has`; повторный `load` заменяет список, а не дополняет (unit).
- Оператор, заблокированный в базе до старта приложения, со своим ещё действующим токеном получает 401 (e2e).
- Токен выдан, затем `disabled_at` выставлен в базе и вызван `DisabledOperators.add(id)` — следующий запрос с тем же токеном получает 401; после `remove(id)` — снова 200 (e2e).
- Существующие unit-тесты `apps/server` с `ApiModule` и заглушкой базы проходят.

## Чего не делать

- Не ходить в БД из guard и из `has`.
- Не делать команды блокировки, рассылку через Redis и разрыв сокетов — это EPIC-14 и эпик WebSocket.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
