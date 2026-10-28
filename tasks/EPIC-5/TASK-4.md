# EPIC-5 / TASK-4. Список миграций, DataSource для CLI TypeORM и скрипты migration:generate, migration:create

Исполнитель: haiku
Зависит от: TASK-3
Владеет: apps/server/src/infra/database/database-options.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/src/infra/database/migrations/, apps/server/src/data-source.ts, apps/server/package.json
Ветка: feature/EPIC-5

## Что сделать

Подготовить всё, чем разработчик создаёт миграции. Сам режим `migrate` — TASK-5.

1. Папка миграций `apps/server/src/infra/database/migrations/`. Пока миграций нет, в ней лежит пустой `.gitkeep`.
2. `apps/server/src/infra/database/database-migrations.ts` — явный список классов миграций:

   ```ts
   export type DatabaseMigration = new () => MigrationInterface;

   export const databaseMigrations: DatabaseMigration[] = [];
   ```

   Список явный, а не glob по папке: так миграции попадают в сборку `nest build` и загружаются одинаково из `dist` и из тестов на TypeScript. Каждую новую миграцию добавляют в этот список.
3. `createDataSourceOptions` в `apps/server/src/infra/database/database-options.ts` дополнительно отдаёт `migrations: databaseMigrations` и `migrationsTransactionMode: "each"`: каждая миграция идёт в своей транзакции, а миграция с `CREATE INDEX CONCURRENTLY` может отключить её у себя (`transaction = false`). Таблица миграций — по умолчанию TypeORM, `migrations`.
4. `apps/server/src/data-source.ts` — DataSource для CLI TypeORM:

   ```ts
   const database = databaseConfig();

   export default new DataSource(
     createDataSourceOptions({
       url: database.migrationUrl,
       poolSize: database.poolSize,
       entities: databaseEntities,
     }),
   );
   ```

   `databaseEntities` — тот же список из `apps/server/src/database-entities.ts`, что у приложения. Файл лежит в корне `src` по той же причине: он собирает сущности из `domain`.
5. Скрипты в `apps/server/package.json`:

   ```json
   "migration:generate": "nest build && node --env-file-if-exists=.env node_modules/typeorm/cli.js migration:generate --pretty -d dist/data-source.js",
   "migration:create": "node node_modules/typeorm/cli.js migration:create"
   ```

   Путь к файлу миграции передаётся аргументом после имени скрипта, например:
   `pnpm --filter @sowa-chat/server migration:create src/infra/database/migrations/AddSomething`.
   `migration:generate` сравнивает сущности со схемой базы из `.env` (`SOWA_MIGRATION_DATABASE_URL`, если задана, иначе `DATABASE_URL`), поэтому перед ним нужны `pnpm infra:up` и применённые миграции.

## Где

- `apps/server/src/infra/database/database-options.ts`, новые `apps/server/src/infra/database/database-migrations.ts` и `apps/server/src/infra/database/migrations/.gitkeep`.
- `apps/server/src/data-source.ts` — новый файл.
- `apps/server/package.json` — скрипты.
- Тесты: `apps/server/src/infra/database/database-options.spec.ts` (дополнить), `apps/server/src/data-source.spec.ts`, `apps/server/src/infra/database/database-migrations.spec.ts`.

## Требования из плана

- Миграции генерируются из сущностей, но каждая проверяется на ревью. GIN-индексы и `CREATE INDEX CONCURRENTLY` (миграция без транзакции) пишутся руками.
- Отдельный DataSource для CLI TypeORM — с тем же списком сущностей, что у приложения.
- Кто хочет строже, задаёт отдельного пользователя для миграций (`SOWA_MIGRATION_DATABASE_URL`).

## Документация

- https://typeorm.io/docs/migrations/why
- https://typeorm.io/docs/migrations/generating
- https://typeorm.io/docs/migrations/creating
- https://typeorm.io/docs/migrations/executing

## Критерии приёмки

- `createDataSourceOptions` отдаёт `migrations: databaseMigrations` и `migrationsTransactionMode: "each"` (unit).
- Default-экспорт `data-source.ts` — `DataSource`, у которого `options.entities` — это `databaseEntities`, а `options.url` равен `SOWA_MIGRATION_DATABASE_URL`, если она задана, и `DATABASE_URL`, если нет (unit, окружение через `stubTestEnv` из `test/support/unit-probe.ts`).
- Каждый класс, экспортированный из `.ts`-файлов папки `migrations` (кроме `*.spec.ts`), есть в `databaseMigrations` (unit: тест читает папку и импортирует файлы).
- В `package.json` есть скрипты `migration:generate` и `migration:create` (unit). Ручная проверка: `migration:create src/infra/database/migrations/Probe` создаёт файл `<время>-Probe.ts` в папке миграций; файл после проверки удалить.

## Чего не делать

- Не создавать сущности и миграции с таблицами — это TASK-6.
- Не делать режим `migrate` — это TASK-5.
- Не ставить `ts-node` и не запускать CLI TypeORM на исходниках `.ts`: CLI работает со сборкой в `dist`.

## История доработок

—
