# EPIC-6 / TASK-1. Valkey в e2e-окружении

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/test/support/valkey-container.ts, apps/server/test/support/global-setup.ts, apps/server/test/support/redis-url.setup.ts, apps/server/test/support/provided-context.d.ts, apps/server/test/support/test-redis.ts, apps/server/vitest.config.e2e.ts, apps/server/test/valkey-container.e2e-spec.ts
Ветка: feature/EPIC-6

## Что сделать

Поднять в e2e-окружении контейнер Valkey рядом с контейнером PostgreSQL и передать его адрес тестам так же, как адрес базы (EPIC-5 TASK-2, `tasks/EPIC-5/decisions.md`). Клиента Redis в приложении ещё нет: его подключит TASK-3 этого эпика, и его e2e-тесты пойдут на этом контейнере.

1. `test/support/valkey-container.ts`:

   ```ts
   export function startValkeyContainer(): Promise<StartedTestContainer>
   export function valkeyUrl(container: StartedTestContainer): string
   ```

   - `new GenericContainer("valkey/valkey:9.2")` из `testcontainers` — тот же образ, что в `deploy/compose/docker-compose.dev.yml`. `withExposedPorts(6379)`, ожидание `Wait.forLogMessage("Ready to accept connections")`. Порт на хосте случайный, как у PostgreSQL.
   - `valkeyUrl` возвращает `` `redis://${container.getHost()}:${container.getMappedPort(6379)}` ``.

2. `test/support/global-setup.ts`: запускать оба контейнера (`Promise.all`), миграции — как сейчас. Добавить `project.provide("redisUrl", valkeyUrl(valkey))`. Функция очистки останавливает оба контейнера.
3. `test/support/provided-context.d.ts`: в `ProvidedContext` поле `redisUrl: string`.
4. `test/support/redis-url.setup.ts` — по образцу `database-url.setup.ts`: `process.env.REDIS_URL = inject("redisUrl");`. В `vitest.config.e2e.ts` добавить файл в `setupFiles` после `database-url.setup.ts`. Так e2e-тесты, которые запускают `dist/main.js` с `{ ...process.env }`, получают Valkey контейнера, а не порт 6379 из `.env.test`.
5. `test/support/test-redis.ts` — помощник по образцу `useTestDatabase()` из `test/support/test-database.ts`:

   ```ts
   export function useTestRedis(): () => Redis
   ```

   `beforeAll` создаёт клиент `new Redis(process.env.REDIS_URL)` (`import { Redis } from "ioredis"`, при пустой переменной — `throw new Error("REDIS_URL is not set")`), `beforeEach` выполняет `flushall()`, `afterAll` — `quit()`. Возвращает функцию, которая отдаёт клиент. Очистка подключается явно в файле теста, а не глобально: многим e2e-тестам Redis не нужен.

## Где

- `apps/server/test/support/valkey-container.ts`, `apps/server/test/support/redis-url.setup.ts`, `apps/server/test/support/test-redis.ts` — новые файлы.
- `apps/server/test/support/global-setup.ts`, `apps/server/test/support/provided-context.d.ts`, `apps/server/vitest.config.e2e.ts` — правка.
- Образцы: `apps/server/test/support/postgres-container.ts`, `apps/server/test/support/database-url.setup.ts`, `apps/server/test/support/test-database.ts`, `apps/server/test/postgres-container.e2e-spec.ts`.
- Тест: `apps/server/test/valkey-container.e2e-spec.ts`. Запуск: `pnpm --filter @sowa-chat/server test:e2e -- test/valkey-container.e2e-spec.ts`, нужен Docker. `check-task` e2e-тесты не запускает.

## Требования из плана

- Тесты: e2e на testcontainers из того же образа, что в compose.
- Код работает через стандартный протокол Redis, поэтому совместимые серверы (Valkey, Dragonfly) подключаются без изменений кода. В dev-окружении стоит Valkey.

## Документация

- https://node.testcontainers.org/features/containers/
- https://node.testcontainers.org/features/wait-strategies/
- https://vitest.dev/config/#globalsetup
- https://github.com/redis/ioredis

## Критерии приёмки

- В e2e-тесте `process.env.REDIS_URL` равен `inject("redisUrl")`, схема `redis:`, порт не `6379` из `.env.test`; дочерний процесс, запущенный с `{ ...process.env }`, получает тот же `REDIS_URL`.
- Клиент `ioredis`, созданный в тесте по `REDIS_URL`, выполняет `SET` и `GET` на Valkey контейнера; `INFO server` содержит `valkey_version:9.2`.
- С `useTestRedis()` ключ, записанный в одном тесте, отсутствует в следующем.
- Ручная проверка: после прогона `docker ps` не показывает контейнер `valkey/valkey:9.2` от тестов.

## Чего не делать

- Не подключать клиент Redis в приложение — это TASK-3.
- Не менять `postgres-container.ts`, `database-url.setup.ts` и `.env.test`.

## История доработок

—
