# EPIC-5 / TASK-3. Подключение к PostgreSQL через TypeORM в режимах api, worker и cli

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2
Владеет: apps/server/src/infra/database/, apps/server/src/database-entities.ts, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/src/cli.module.ts, apps/server/test/support/unit-probe.ts, apps/server/test/support/offline-database.ts, apps/server/test/database-connection.e2e-spec.ts, apps/server/test/server-modes.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

Подключить PostgreSQL через `@nestjs/typeorm` с настройками из группы конфига `database` (TASK-1).

1. `apps/server/src/infra/database/database-options.ts` — общие настройки DataSource для приложения, режима `migrate` и CLI TypeORM:

   ```ts
   export type DatabaseEntity = new () => object;

   export interface DatabaseConnection {
     url: string;
     poolSize: number;
     entities: DatabaseEntity[];
   }

   export function createDataSourceOptions(connection: DatabaseConnection): DataSourceOptions
   ```

   Возвращает `{ type: "postgres", url, poolSize, entities, synchronize: false, applicationName: "sowa-chat-server", connectTimeoutMS: 5000 }`. `synchronize: false` всегда, без исключений для development.
2. `apps/server/src/infra/database/database.module.ts` — `DatabaseModule` с методом `static forRoot(entities: DatabaseEntity[]): DynamicModule`, который возвращает `{ module: DatabaseModule, imports: [TypeOrmModule.forRootAsync(...)] }`. Фабрика `forRootAsync` берёт группу `database` (`inject: [databaseConfig.KEY]`) и возвращает `createDataSourceOptions({ url: database.url, poolSize: database.poolSize, entities })` плюс `retryAttempts: 3` и `retryDelay: 1000`: с недоступной базой приложение завершается примерно через 3 секунды, а не через 30 по умолчанию.
3. `apps/server/src/database-entities.ts` — общий список сущностей: `export const databaseEntities: DatabaseEntity[] = [];`. Файл лежит в корне `src`, рядом с модулями режимов: сущности живут в `domain`, а `infra` не импортирует `domain` (правило слоёв). Список заполнят задачи с сущностями, первой — TASK-6.
4. В `imports` модулей `ApiModule`, `WorkerModule`, `CliModule` добавить `DatabaseModule.forRoot(databaseEntities)`. `MigrateModule` не трогать: режим `migrate` подключается к базе сам (TASK-5).
5. Соединения закрывает сам `@nestjs/typeorm` в хуке остановки приложения, при любом `app.close()`. Обработку SIGTERM (`enableShutdownHooks`) не добавлять: задача корректной остановки отклонена разработчиком (EPIC-2 TASK-4).
6. Unit-тесты, которые собирают `ApiModule` через `createProbeApp`, не должны ходить в базу. `apps/server/test/support/offline-database.ts`:

   ```ts
   export function withOfflineDatabase(builder: TestingModuleBuilder): TestingModuleBuilder {
     return builder.overrideProvider(getDataSourceToken()).useValue({ isInitialized: false });
   }
   ```

   В `createProbeApp` (`apps/server/test/support/unit-probe.ts`) обернуть `Test.createTestingModule(...)` этой функцией перед `.compile()`.
7. Существующий e2e-тест «worker запускается и завершается с кодом 0» в `server-modes.e2e-spec.ts` должен проходить. Если worker с открытым пулом больше не завершается сам за время теста, заменить этот тест на «worker запускается и через 3 секунды всё ещё работает»: процесс не завершился, затем `stop()`. Поведение самого worker не менять.

## Где

- `apps/server/src/infra/database/` — новые `database-options.ts`, `database.module.ts`.
- `apps/server/src/database-entities.ts` — новый файл.
- `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/cli.module.ts`.
- `apps/server/test/support/offline-database.ts` — новый, `apps/server/test/support/unit-probe.ts`.
- Тесты: `apps/server/src/infra/database/database-options.spec.ts`, `apps/server/test/database-connection.e2e-spec.ts`; при необходимости `apps/server/test/server-modes.e2e-spec.ts` (пункт 7).

## Требования из плана

- ORM: TypeORM через `@nestjs/typeorm`, только Data Mapper: сущности и репозитории, без Active Record.
- `synchronize: false` всегда. Схему меняют только миграции.
- Сущности живут в `apps/server`, в `protocol` их нет.
- Слой `infra` ни от кого не зависит, `domain` зависит от `infra`.
- 2–3 реплики с пулом по 10 укладываются в стандартный лимит подключений PostgreSQL.

## Документация

- https://docs.nestjs.com/techniques/database
- https://typeorm.io/docs/data-source/data-source-options

## Критерии приёмки

- `createDataSourceOptions` отдаёт `type: "postgres"`, переданные `url`, `poolSize` и `entities`, `synchronize: false` и `applicationName: "sowa-chat-server"` (unit).
- E2e: собранный `api` с `DATABASE_URL` контейнера отвечает 404 на неизвестный путь, и пока он работает, в `pg_stat_activity` есть соединение с `application_name = 'sowa-chat-server'`.
- E2e: `api`, `worker` и `cli` с `DATABASE_URL` на свободный порт `127.0.0.1` завершаются с кодом 1, в выводе есть `ECONNREFUSED`.
- E2e: приложение из `AppConfigModule` и `DatabaseModule.forRoot([])` после запуска отдаёт `DataSource` с `isInitialized === true`, после `app.close()` — `false`.
- Unit-тесты, которые используют `createProbeApp`, проходят без запущенного PostgreSQL.

## Чего не делать

- Не делать миграции, CLI TypeORM и транзакции — это TASK-4, TASK-5 и TASK-7.
- Не создавать сущности.
- Не подключать `DatabaseModule` к `MigrateModule`.
- Не менять `main.ts`: его меняет параллельный эпик зон API (EPIC-4).

## История доработок

—
