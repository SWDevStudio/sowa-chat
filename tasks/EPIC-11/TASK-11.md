# EPIC-11 / TASK-11. Проверки Redis: maxmemory-policy noeviction и AOF

Исполнитель: haiku
Зависит от: TASK-8
Владеет: apps/server/src/infra/environment-checks/redis-checks.ts, apps/server/src/infra/environment-checks/redis-checks.spec.ts, apps/server/src/infra/environment-checks/registered-environment-checks.ts, apps/server/test/redis-checks.e2e-spec.ts
Коммит: [SERVER]: check redis eviction policy and aof
Ветка: feature/EPIC-11

## Что сделать

Две проверки Redis в реестре проверок окружения (TASK-3). Образец проверки — `apps/server/src/infra/environment-checks/config-checks.ts` (TASK-8). Обе идут и при старте, и в `doctor` (`onlyInDoctor: false`). В development их находки сами становятся `warn` (`runEnvironmentChecks`), отдельно development здесь не обрабатывать.

1. `apps/server/src/infra/environment-checks/redis-checks.ts`:

   ```ts
   export const redisEvictionPolicyCheck: EnvironmentCheck = { name: "redisEvictionPolicy", ... };
   export const redisAppendOnlyCheck: EnvironmentCheck = { name: "redisAppendOnly", ... };
   ```

   Значение настройки читается `context.redis.config("GET", "<имя>")` (ioredis): ответ — массив `[имя, значение]`, значение — второй элемент. Помощник `readRedisSetting(redis, name): Promise<string | undefined>` в том же файле: `undefined`, если массив пустой.
   - `redisEvictionPolicy` (`maxmemory-policy`):
     - значение `noeviction` → `[]`;
     - другое значение → `stop`, `maxmemory-policy is <значение>, but BullMQ needs noeviction: set maxmemory-policy noeviction in the Redis config`;
     - `config` бросил ошибку (управляемый Redis запрещает `CONFIG`) или значения нет → `warn`, `could not read maxmemory-policy (CONFIG GET is not allowed?): make sure maxmemory-policy is noeviction`.
   - `redisAppendOnly` (`appendonly`):
     - `yes` → `[]`;
     - другое значение → `warn`, `AOF is off (appendonly <значение>): set appendonly yes so queued jobs survive a Redis restart`;
     - ошибка или нет значения → `warn`, `could not read appendonly (CONFIG GET is not allowed?): make sure AOF is on`.

2. `registered-environment-checks.ts`: дописать `redisEvictionPolicyCheck`, `redisAppendOnlyCheck` в конец `registeredEnvironmentChecks`.

## Где

- Новый файл `apps/server/src/infra/environment-checks/redis-checks.ts`, правка `apps/server/src/infra/environment-checks/registered-environment-checks.ts`.
- Модульный тест `apps/server/src/infra/environment-checks/redis-checks.spec.ts`: `redis` в `CheckContext` — заглушка `{ config: vi.fn() }` (приведение `as unknown as Redis`), так проверяется и запрет `CONFIG GET`, которого на тестовом Valkey не воспроизвести.
- e2e `apps/server/test/redis-checks.e2e-spec.ts` на тестовом Valkey (`useTestRedis` из `test/support/test-redis.ts`, команда `redis.config("SET", "maxmemory-policy", …)`): перед тестом `CONFIG SET maxmemory-policy allkeys-lru`, в `afterEach` — обратно `noeviction` (контейнер общий для всех e2e); старт `api` — `spawnServer` из `test/support/e2e-server.ts`, `zonePortsEnv`, `waitForExit`, `waitForLive` из `test/support/startup-server.ts`, `productionOverrides` из `test/support/production-env.ts`.

## Требования из плана

| Проверка | Если не так |
|---|---|
| у Redis `maxmemory-policy noeviction` | в production — остановка: BullMQ теряет задачи при вытеснении ключей. Если управляемый Redis не даёт прочитать настройку — предупреждение «проверить не удалось» |
| у Redis включён AOF | предупреждение |

## Документация

- https://redis.io/docs/latest/commands/config-get/
- https://redis.io/docs/latest/develop/reference/eviction/
- https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/

## Критерии приёмки

- Модульно: `maxmemory-policy` `allkeys-lru` — находка `stop` с `noeviction` в тексте; `noeviction` — нет находок; `config` отклонён с ошибкой `NOPERM` — находка `warn` `could not read maxmemory-policy`.
- Модульно: `appendonly` `no` — находка `warn`, `yes` — нет находок; ошибка `config` — `warn`.
- e2e: при `allkeys-lru` `api` в production завершается с ненулевым кодом, в выводе есть `maxmemory-policy is allkeys-lru`; `api` в development (`.env.test`) при `allkeys-lru` стартует (`waitForLive`), в выводе есть то же сообщение предупреждением.

## Чего не делать

- Не менять настройки Redis из сервиса: проверка только сообщает.
- Не подключать Redis в режиме `cli` — это делает `doctor` сам (TASK-15).

## История доработок

—
