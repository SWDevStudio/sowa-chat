# EPIC-15 / TASK-5. Шаг `db`: время запросов к БД через подписчик TypeORM

Исполнитель: haiku
Зависит от: TASK-2
Владеет: apps/server/src/infra/database/database-step.subscriber.ts, apps/server/src/infra/database/database-step.subscriber.spec.ts, apps/server/src/infra/database/database.module.ts, apps/server/test/support/offline-database.ts, apps/server/test/database-step.e2e-spec.ts
Ветка: feature/EPIC-15

## Что сделать

Время каждого запроса к PostgreSQL прибавляется к шагу `db` текущей операции в одном месте, без правок репозиториев. `OperationSteps` и `OperationStepsModule` — из TASK-2 (`apps/server/src/telemetry/operation-steps/`).

Логгер TypeORM для этого не подходит: `logQuery` вызывается до запроса и не знает длительности, а `logQuerySlow` — только для запросов дольше `maxQueryExecutionTime`. Подходит событие подписчика `afterQuery`: TypeORM 1.x передаёт в `AfterQueryEvent` поле `executionTime` в миллисекундах (`undefined` у неудачного запроса).

1. `infra/database/database-step.subscriber.ts` — по рецепту Nest «Subscribers»:

   ```ts
   @Injectable()
   export class DatabaseStepSubscriber implements EntitySubscriberInterface {
     constructor(
       @InjectDataSource() dataSource: DataSource,
       @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
     ) {
       dataSource.subscribers.push(this);
     }

     afterQuery(event: AfterQueryEvent): void
   }
   ```

   `afterQuery`: если `event.executionTime === undefined` — ранний `return`; иначе `this.operationSteps.record("db", event.executionTime)`. Неудачные запросы в шаг не попадают.

2. `infra/database/database.module.ts`: в `DatabaseModule.forRoot` добавить `OperationStepsModule` в `imports` и `providers: [DatabaseStepSubscriber]`. `createDataSourceOptions` (`database-options.ts`) не менять: подписчик добавляется в уже созданный `DataSource`.

3. `apps/server/test/support/offline-database.ts`: заглушка `DataSource` становится `{ isInitialized: false, subscribers: [] }`, иначе конструктор подписчика падает во всех unit-тестах с `createProbeApp` и `startZoneProbeApp`.

## Где

- Новый: `apps/server/src/infra/database/database-step.subscriber.ts`.
- Меняются: `apps/server/src/infra/database/database.module.ts`, `apps/server/test/support/offline-database.ts`.
- Тесты:
  - `apps/server/src/infra/database/database-step.subscriber.spec.ts` (vitest): подписчик с заглушкой `{ subscribers: [] }` и настоящим `OperationSteps` внутри `cls.run` с `beginOperation`;
  - `apps/server/test/database-step.e2e-spec.ts` (`pnpm --filter @sowa-chat/server test:e2e`, Postgres из testcontainers уже настроен в `test/support/`): `WorkerModule` с настоящей БД, как в `test/transactions.e2e-spec.ts`.

## Требования из плана

- Медленные операции: строка `warn` с разбивкой времени по шагам (`auth`, `db`, `redis`, `queueWait`, `bot` и т. д.). Эта задача даёт шаг `db`.

## Документация

- https://docs.nestjs.com/techniques/database#subscribers
- https://typeorm.io/docs/advanced-topics/listeners-and-subscribers

## Критерии приёмки

- После создания подписчик лежит в `dataSource.subscribers`.
- `afterQuery({ executionTime: 7 })` дважды в одной операции даёт `steps.db` равным 14; `afterQuery` с `executionTime: undefined` шаг не меняет; вне контекста CLS не бросает исключение.
- E2e: внутри `cls.run` с `beginOperation` запрос `dataSource.query("SELECT 1")` к настоящей БД добавляет в `steps` ключ `db` с числом не меньше 0.
- Существующие unit-тесты `apps/server` с `createProbeApp` и `startZoneProbeApp` проходят.

## Чего не делать

- Не править репозитории и `@Transactional`-сервисы.
- Не включать `logging` и `maxQueryExecutionTime` в настройках TypeORM.
- Не трогать `telemetry/`, кроме импорта `OperationSteps` и `OperationStepsModule`.

## История доработок

—
