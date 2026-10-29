# EPIC-11 / TASK-12. Проверки PostgreSQL: версия 18+ и права пользователя приложения

Исполнитель: haiku
Зависит от: TASK-11
Владеет: apps/server/src/infra/environment-checks/postgres-checks.ts, apps/server/src/infra/environment-checks/postgres-checks.spec.ts, apps/server/src/infra/environment-checks/registered-environment-checks.ts, apps/server/test/postgres-checks.e2e-spec.ts
Коммит: [SERVER]: check postgresql version and user rights
Ветка: feature/EPIC-11

## Что сделать

Три проверки PostgreSQL в реестре проверок окружения (TASK-3). Образец — `apps/server/src/infra/environment-checks/redis-checks.ts` (TASK-11). Все три идут и при старте, и в `doctor` (`onlyInDoctor: false`). Запросы — `context.dataSource.query(sql)`. `migrationDatabaseUrl` уже есть в `context.settings` (TASK-8).

1. `apps/server/src/infra/environment-checks/postgres-checks.ts`:

   ```ts
   export const postgresVersionCheck: EnvironmentCheck = { name: "postgresVersion", ... };
   export const postgresSuperuserCheck: EnvironmentCheck = { name: "postgresSuperuser", ... };
   export const postgresSchemaChangesCheck: EnvironmentCheck = { name: "postgresSchemaChanges", ... };
   ```

   - `postgresVersion`: `SHOW server_version_num` → строка `{ server_version_num: "180006" }`; `Number(...) < 180000` → `stop`, `PostgreSQL server_version_num <значение> is older than 18: upgrade to PostgreSQL 18 or later`. Выполняется и в development (там станет `warn`).
   - `postgresSuperuser`: в development → `[]`. `SELECT rolsuper AS "isSuperuser" FROM pg_roles WHERE rolname = current_user`; `true` → `warn`, `the application connects to PostgreSQL as a superuser: use a separate user without superuser rights`.
   - `postgresSchemaChanges`: в development или если `settings.migrationDatabaseUrl` задан → `[]`. Запрос:

     ```sql
     SELECT has_schema_privilege(current_user, 'public', 'CREATE')
         OR EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tableowner = current_user)
         AS "canChangeSchema"
     ```

     `true` → `warn`, `the application user can change the database schema and SOWA_MIGRATION_DATABASE_URL is not set: run migrations under a separate user and revoke CREATE on schema public from the application user`. Право `CREATE` на схему даёт создавать таблицы, владение таблицами — менять их.

   Суперпользователь и права на схему в development не проверяются: в `docker-compose.dev.yml` приложение работает под `POSTGRES_USER`, и предупреждение было бы на каждом старте разработчика.

2. `registered-environment-checks.ts`: дописать три проверки в конец `registeredEnvironmentChecks`.

## Где

- Новый файл `apps/server/src/infra/environment-checks/postgres-checks.ts`, правка `apps/server/src/infra/environment-checks/registered-environment-checks.ts`.
- Модульный тест `apps/server/src/infra/environment-checks/postgres-checks.spec.ts`: `dataSource` в `CheckContext` — заглушка `{ query: vi.fn() }` (`as unknown as DataSource`) с нужными строками.
- e2e `apps/server/test/postgres-checks.e2e-spec.ts`: тестовый PostgreSQL 18.6 работает под суперпользователем `sowa`; `spawnServer("api", env)`, `env = { ...process.env, ...(await zonePortsEnv()), ...productionOverrides }` (`test/support/startup-server.ts`, `test/support/production-env.ts`), `waitForLive`.

## Требования из плана

| Проверка | Если не так |
|---|---|
| PostgreSQL версии 18 и выше | остановка |
| пользователь приложения не суперпользователь | в production — предупреждение. Не остановка: в нашем `docker-compose.yml` приложение работает под `POSTGRES_USER`, а это суперпользователь контейнера |
| пользователь приложения может менять схему (нет отдельного пользователя для миграций) | в production — предупреждение |

- Приложение работает под пользователем PostgreSQL без прав суперпользователя. Достаточно одного пользователя; отдельный пользователь для миграций — по желанию.

## Документация

- https://www.postgresql.org/docs/18/functions-info.html#FUNCTIONS-INFO-ACCESS
- https://www.postgresql.org/docs/18/view-pg-roles.html
- https://www.postgresql.org/docs/18/runtime-config-preset.html

## Критерии приёмки

- Модульно: `server_version_num` `170004` — находка `stop`, `180006` — нет находок.
- Модульно: в production `isSuperuser: true` — находка `warn`, `canChangeSchema: true` без `migrationDatabaseUrl` — находка `warn`, с `migrationDatabaseUrl` — запрос не выполняется и находок нет; в development обе проверки не выполняют запросов.
- e2e: `api` в production под суперпользователем тестового PostgreSQL стартует (`waitForLive`), в выводе есть предупреждения `connects to PostgreSQL as a superuser` и `can change the database schema`.

## Чего не делать

- Не менять права пользователей и не создавать пользователей: проверка только сообщает.

## История доработок

—
