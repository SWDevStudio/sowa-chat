# EPIC-5 / TASK-8. E2e: фикстура проекта, очистка таблиц между тестами, запуск приложения

Исполнитель: haiku
Зависит от: TASK-6
Владеет: apps/server/test/support/test-database.ts, apps/server/test/support/fixtures.ts, apps/server/test/support/e2e-app.ts, apps/server/test/test-support.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

Помощники, на которых следующие эпики пишут e2e-тесты с базой. Контейнер с применёнными миграциями уже поднимает глобальная подготовка (TASK-2, TASK-5), его адрес — в `process.env.DATABASE_URL`.

1. `apps/server/test/support/test-database.ts`:
   - `truncateAllTables(dataSource: DataSource): Promise<void>` — берёт имена таблиц запросом `SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> 'migrations'`; если таблиц нет — выход; иначе один запрос `TRUNCATE TABLE "<a>", "<b>" RESTART IDENTITY CASCADE`, каждое имя в двойных кавычках. Таблицу `migrations` не трогает.
   - `useTestDatabase(): () => DataSource` — регистрирует хуки текущего файла тестов и возвращает функцию, которая отдаёт подключённый DataSource:
     - `beforeAll` — `new DataSource(createDataSourceOptions({ url: process.env.DATABASE_URL, poolSize: 2, entities: databaseEntities }))` и `initialize()`; если `DATABASE_URL` не задана — `throw new Error("DATABASE_URL is not set")`;
     - `beforeEach` — `truncateAllTables`;
     - `afterAll` — `destroy()`.
   Фикстуры и очистка не создают и не меняют схему: схема только из миграций.
2. `apps/server/test/support/fixtures.ts`:

   ```ts
   export interface ProjectFixture {
     name?: string;
     allowedOrigins?: string[];
     settings?: JsonObject;
   }

   export function createProject(dataSource: DataSource, fixture: ProjectFixture = {}): Promise<Project>
   ```

   Сохраняет проект через `dataSource.getRepository(Project)`. Имя по умолчанию — `project-<randomUUID()>`, чтобы два проекта в одном тесте не столкнулись по уникальному имени. Остальные поля без значения берут default из базы.
3. `apps/server/test/support/e2e-app.ts`:

   ```ts
   export async function createE2eApp(): Promise<INestApplication>
   ```

   `Test.createTestingModule({ imports: [ApiModule] }).compile()`, `createNestApplication({ bufferLogs: true })`, `useClsMiddleware(app)`, `app.useLogger(app.get(Logger))` (`Logger` из `nestjs-pino`), `await app.init()`. Порт не слушает: тесты ходят в приложение через `supertest` (`app.getHttpServer()`) или берут провайдеры через `app.get`. Конфиг приложение читает из `process.env`, поэтому база — контейнер.

## Где

- `apps/server/test/support/` — новые `test-database.ts`, `fixtures.ts`, `e2e-app.ts`. Образец сборки приложения — `createProbeApp` в `apps/server/test/support/unit-probe.ts`; его не менять.
- Тест: `apps/server/test/test-support.e2e-spec.ts`.

## Требования из плана

- Базы данных не создаются автоматически: схема — только миграциями, данные — фикстурами. `synchronize` не используется и в тестах.
- Критичные запросы покрываются тестами на реальном PostgreSQL, не на моках.
- Тесты: unit + e2e на testcontainers.

## Документация

- https://docs.nestjs.com/fundamentals/testing
- https://typeorm.io/docs/working-with-entity-manager/working-with-repository
- https://www.postgresql.org/docs/18/sql-truncate.html

## Критерии приёмки

- Проект, созданный `createProject` с именем `fixture-main`, приложение из `createE2eApp` находит по имени через свой `DataSource` (`app.get(DataSource).getRepository(Project)`).
- Два теста в одном файле с `useTestDatabase()`: первый создаёт проект, второй видит в `projects` ноль строк.
- После `truncateAllTables` в таблице `migrations` то же число строк, что до неё, и оно больше нуля.

## Чего не делать

- Не добавлять Valkey и SeaweedFS.
- Не менять глобальную подготовку e2e и существующие помощники в `test/support/`.
- Не создавать таблицы в тестах и фикстурах.

## История доработок

—
