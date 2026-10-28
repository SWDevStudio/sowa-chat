# EPIC-5 / TASK-5. Режим migrate: шаги подготовки по порядку, коды выхода, миграции в e2e

Исполнитель: sonnet
Зависит от: TASK-4
Владеет: apps/server/src/infra/database/run-database-migrations.ts, apps/server/src/infra/database/database-migration.step.ts, apps/server/src/infra/preparation/, apps/server/src/migrate.module.ts, apps/server/src/main.ts, apps/server/package.json, apps/server/test/support/global-setup.ts, apps/server/test/migrate-mode.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

Режим `migrate` выполняет шаги подготовки по порядку и завершается: код 0 при успехе, код 1 при ошибке любого шага. Первый шаг — миграции базы. Эпик хранилища файлов добавит второй шаг: создание бакета и его CORS-правил.

1. `apps/server/src/infra/database/run-database-migrations.ts`:

   ```ts
   export async function runDatabaseMigrations(
     url: string,
     migrations: DatabaseMigration[] = databaseMigrations,
   ): Promise<string[]>
   ```

   Создаёт свой `DataSource` из `createDataSourceOptions({ url, poolSize: 1, entities: [] })` с переданным списком `migrations`, вызывает `initialize()` и `runMigrations()`, в `finally` — `destroy()`. Возвращает имена применённых миграций (`migration.name`). Эту функцию вызывают и шаг режима `migrate`, и глобальная подготовка e2e: миграции в тестах применяет тот же код.
2. `apps/server/src/infra/preparation/preparation-step.ts`:

   ```ts
   export interface PreparationStep {
     readonly name: string;
     run(): Promise<void>;
   }

   export const preparationSteps = Symbol("preparationSteps");
   ```

3. `apps/server/src/infra/preparation/preparation-runner.ts` — `PreparationRunner` (`@Injectable()`), в конструктор внедряется `@Inject(preparationSteps) steps: PreparationStep[]`. Метод `async run(): Promise<void>` выполняет шаги строго по очереди. Перед шагом пишет в лог `Preparation step started`, после — `Preparation step finished`, оба с полем `step` (имя шага). Ошибку шага не перехватывает: следующие шаги не выполняются, ошибка уходит наверх.
4. `apps/server/src/infra/database/database-migration.step.ts` — `DatabaseMigrationStep implements PreparationStep`, `name = "databaseMigrations"`. Внедряет группу `database` (`@Inject(databaseConfig.KEY)`), в `run()` вызывает `runDatabaseMigrations(database.migrationUrl)` и пишет в лог `Database migrations applied` с полем `migrations` — списком имён.
5. `apps/server/src/migrate.module.ts` — к существующим `imports` добавить провайдеры:

   ```ts
   providers: [
     DatabaseMigrationStep,
     {
       provide: preparationSteps,
       useFactory: (databaseMigration: DatabaseMigrationStep) => [databaseMigration],
       inject: [DatabaseMigrationStep],
     },
     PreparationRunner,
   ],
   ```

   Порядок шагов задаёт этот список. Модулей с Redis и HTTP в `MigrateModule` нет.
6. `apps/server/src/main.ts` — меняется только `runMigrate`:

   ```ts
   async function runMigrate() {
     const app = await createContext(MigrateModule);
     try {
       await app.get(PreparationRunner).run();
     } finally {
       await app.close();
     }
   }
   ```

   Ошибка шага отклоняет промис верхнего уровня: Node печатает ошибку с текстом PostgreSQL и завершает процесс с кодом 1. Остальные функции `main.ts` не трогать: их меняет параллельный эпик зон API (EPIC-4).
7. `apps/server/package.json` — скрипт `"start:migrate": "nest start -- migrate"` рядом с `start:api`, чтобы применить миграции к базе из `.env` при разработке. В `devDependencies` добавить `"@types/pg": "^8.23.1"` (`pnpm --filter @sowa-chat/server add -D @types/pg@^8.23.1`): e2e-тест импортирует `pg`, а своих типов у `pg` нет. Версия совпадает с `pg` `^8.23.1`.
8. `apps/server/test/support/global-setup.ts` — после запуска контейнера вызвать `runDatabaseMigrations(container.getConnectionUri())`, до `project.provide`.

## Где

- `apps/server/src/infra/database/` — новые `run-database-migrations.ts`, `database-migration.step.ts`.
- `apps/server/src/infra/preparation/` — новая папка: `preparation-step.ts`, `preparation-runner.ts`.
- `apps/server/src/migrate.module.ts`, `apps/server/src/main.ts` (только `runMigrate`), `apps/server/package.json`.
- `apps/server/test/support/global-setup.ts`.
- Тесты: `apps/server/src/infra/preparation/preparation-runner.spec.ts`, `apps/server/test/migrate-mode.e2e-spec.ts`.

## Требования из плана

- Перед выкаткой один шаг — `migrate`: он применяет миграции, создаёт бакет и обновляет его CORS-правила. Бакет и CORS — шаг эпика хранилища файлов.
- Подключение для миграций: `SOWA_MIGRATION_DATABASE_URL`, если она задана, иначе `DATABASE_URL` (поле `migrationUrl` группы `database`, TASK-1).
- Старые и новые поды работают одновременно, поэтому миграции только обратно совместимые (expand → contract) и запускаются отдельно до выкатки.
- В compose `migrate` отрабатывает и завершается до старта `api`: `api` ждёт его успешного завершения.

## Документация

- https://typeorm.io/docs/migrations/executing
- https://docs.nestjs.com/standalone-applications
- https://docs.nestjs.com/fundamentals/custom-providers

## Критерии приёмки

- `PreparationRunner` выполняет шаги в порядке списка; если первый шаг бросает ошибку, `run()` отклоняется этой ошибкой, а второй шаг не вызывается (unit).
- E2e: в новой базе контейнера (тест создаёт её через `CREATE DATABASE` и удаляет после себя) собранный `migrate` с `DATABASE_URL` этой базы и без `SOWA_MIGRATION_DATABASE_URL` завершается с кодом 0 и создаёт таблицу `migrations`; повторный запуск тоже выходит с кодом 0, число строк в `migrations` не меняется.
- E2e: `migrate` с `DATABASE_URL` на свободный порт и `SOWA_MIGRATION_DATABASE_URL` контейнера выходит с кодом 0; с `DATABASE_URL` контейнера и `SOWA_MIGRATION_DATABASE_URL` на свободный порт — с кодом 1, в выводе есть `ECONNREFUSED`.
- E2e: `runDatabaseMigrations(url, [BrokenMigration1700000000000])` (TypeORM требует метку времени в конце имени класса), где `up` выполняет `SELECT * FROM missing_table`, отклоняется ошибкой с текстом `missing_table`, и в таблице `migrations` нет строки этой миграции.
- Существующий e2e-тест «migrate запускается и завершается с кодом 0» проходит.

## Чего не делать

- Не создавать сущности и миграции с таблицами — это TASK-6.
- Не подключать к `MigrateModule` модули, которым нужен Redis или HTTP, и `DatabaseModule` приложения.
- Не делать шаг бакета и CORS — это эпик хранилища файлов.
- Не добавлять init-скрипты PostgreSQL и вторых пользователей в compose.

## История доработок

—
