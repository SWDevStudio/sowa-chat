# EPIC-5 / TASK-2. PostgreSQL 18.6 в контейнере для всех e2e-тестов

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/test/support/postgres-container.ts, apps/server/test/support/global-setup.ts, apps/server/test/support/database-url.setup.ts, apps/server/test/support/provided-context.d.ts, apps/server/vitest.config.e2e.ts, apps/server/test/postgres-container.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

Перед e2e-тестами поднимается PostgreSQL в контейнере, и все e2e-тесты, в том числе запущенный из них `dist/main.js`, получают его адрес в `DATABASE_URL`. Тогда e2e не зависят от `pnpm infra:up`, а следующие задачи эпика проверяют работу с БД на настоящем PostgreSQL.

1. `apps/server/test/support/postgres-container.ts`:

   ```ts
   export function startPostgresContainer(): Promise<StartedPostgreSqlContainer>
   ```

   `new PostgreSqlContainer("postgres:18.6")` из `@testcontainers/postgresql`, `.withDatabase("sowa").withUsername("sowa").withPassword("sowa").start()`. Образ тот же, что в `deploy/compose/docker-compose.dev.yml`. Пользователь один — тот, которого создаёт контейнер.
2. `apps/server/test/support/global-setup.ts` — глобальная подготовка vitest:

   ```ts
   export default async function setup(project: TestProject) {
     const container = await startPostgresContainer();
     project.provide("databaseUrl", container.getConnectionUri());
     return async () => {
       await container.stop();
     };
   }
   ```

   `TestProject` — тип из `vitest/node`.
3. `apps/server/test/support/provided-context.d.ts` — тип значения для `provide` и `inject`:

   ```ts
   declare module "vitest" {
     export interface ProvidedContext {
       databaseUrl: string;
     }
   }
   export {};
   ```

4. `apps/server/test/support/database-url.setup.ts` — файл `setupFiles`, выполняется в каждом процессе тестов после `env` из конфига:

   ```ts
   import { inject } from "vitest";

   process.env.DATABASE_URL = inject("databaseUrl");
   ```

   Так значение из `.env.test` заменяется адресом контейнера. Тесты, которые запускают `dist/main.js` с `{ ...process.env }`, получают его без правок. `.env.test` не менять.
5. `apps/server/vitest.config.e2e.ts` — в `test` добавить `globalSetup: ["./test/support/global-setup.ts"]` и `setupFiles: ["./test/support/database-url.setup.ts"]`. Контейнер один на весь прогон.
6. Проверка в тесте — через `DataSource` из `typeorm` (`new DataSource({ type: "postgres", url: process.env.DATABASE_URL })`, `initialize`, `query`, `destroy`): у `pg` в проекте нет типов.

Для e2e нужен запущенный Docker.

## Где

- `apps/server/test/support/` — новые файлы `postgres-container.ts`, `global-setup.ts`, `database-url.setup.ts`, `provided-context.d.ts`.
- `apps/server/vitest.config.e2e.ts`.
- Тест: `apps/server/test/postgres-container.e2e-spec.ts`.

## Требования из плана

- Тесты: unit + e2e на testcontainers (Postgres, Redis, SeaweedFS из того же образа, что в compose).
- Базы данных не создаются автоматически: схема — только миграциями, данные — фикстурами. Контейнер создаёт пустую базу, схему в ней создаст режим `migrate` (TASK-5).

## Документация

- https://node.testcontainers.org/modules/postgresql/
- https://vitest.dev/config/#globalsetup
- https://vitest.dev/config/#setupfiles
- https://vitest.dev/api/#inject

## Критерии приёмки

- В e2e-тесте `process.env.DATABASE_URL` указывает не на порт `5432` из `.env.test`, а на контейнер: запрос `SHOW server_version` по этому адресу возвращает версию, которая начинается с `18.6`.
- Существующие e2e-тесты сервера проходят с контейнером так же, как раньше.
- Ручная проверка: после `pnpm --filter @sowa-chat/server test:e2e` команда `docker ps --filter label=org.testcontainers=true` не показывает контейнер `postgres:18.6`.

## Чего не делать

- Не добавлять Valkey и SeaweedFS: Valkey добавит эпик Redis, SeaweedFS — эпик хранилища файлов.
- Не применять миграции в глобальной подготовке — это TASK-5.
- Не менять `.env.test` и существующие e2e-тесты.

## История доработок

—
