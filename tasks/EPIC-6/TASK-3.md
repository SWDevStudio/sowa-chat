# EPIC-6 / TASK-3. Подключение к Redis через ioredis с закрытием при остановке

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/infra/redis/, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/test/support/offline-redis.ts, apps/server/test/support/unit-probe.ts, apps/server/test/support/zone-probe.ts, apps/server/src/infra/zones/zone-servers.spec.ts, apps/server/test/redis-connection.e2e-spec.ts
Ветка: feature/EPIC-6

## Что сделать

Папки `apps/server/src/infra/redis/` ещё нет — создать. Адрес — `REDIS_URL`, в конфиге уже есть группа `redis` (`apps/server/src/infra/config/redis.config.ts`, поле `url`).

1. `infra/redis/redis-client.ts` — константа и три функции:

   ```ts
   export const redisStartupTimeoutMs = 5000;
   export function createRedisClient(url: string): Redis
   export function waitForRedis(client: Redis, timeoutMs: number): Promise<void>
   export async function closeRedis(client: Redis): Promise<void>
   ```

   - `createRedisClient`: `new Redis(url, { connectionName: "sowa-chat-server", connectTimeout: 5000, maxRetriesPerRequest: 3 })` (`import { Redis } from "ioredis"`). `retryStrategy` не задавать: после старта клиент переподключается без ограничения числа попыток, чтобы после сбоя Redis реплика вернулась в строй сама. Сразу подписаться на `error`: `new Logger("Redis").warn(`Redis connection error: ${error.message}`)` (`Logger` из `@nestjs/common`). Без подписчика `ioredis` печатает `[ioredis] Unhandled error event` в обход логгера. Адрес и пароль в лог не писать.
   - `waitForRedis`: если `client.status === "ready"` — сразу resolve. Иначе ждёт событие `ready`. Запоминает последнюю ошибку из события `error`. Если `ready` не пришло за `timeoutMs`, вызывает `client.disconnect()` и отклоняется с `new Error(`Redis is unavailable: ${lastError.message}`)`, а без ошибки — `` `Redis is unavailable: no response in ${timeoutMs} ms` ``. Таймер и подписки снимаются в обоих исходах.
   - `closeRedis`: при `client.status === "ready"` — `await client.quit()`, иначе `client.disconnect()`. `quit` при оборванном соединении ждал бы переподключения.

2. `infra/redis/redis.module.ts` — `RedisModule`:
   - Провайдер с токеном-классом `Redis` из `ioredis`:

     ```ts
     {
       provide: Redis,
       inject: [redisConfig.KEY],
       useFactory: async (redis: ConfigType<typeof redisConfig>) => {
         const client = createRedisClient(redis.url);
         await waitForRedis(client, redisStartupTimeoutMs);
         return client;
       },
     }
     ```

   - `exports: [Redis]`. Код получает клиент через `@Inject(Redis) private readonly redis: Redis` и своих клиентов не создаёт.
   - Класс модуля реализует `OnApplicationShutdown`: конструктор `@Inject(Redis) private readonly client: Redis`, в `onApplicationShutdown` — `await closeRedis(this.client)`.
   - Модуль не глобальный: кому нужен клиент, импортирует `RedisModule`.

3. Ошибка при старте. Если Redis недоступен, фабрика отклоняется через 5 секунд, Nest пишет ошибку и завершает процесс с кодом 1 (`process.exit(1)` при ошибке создания провайдеров — как с базой в EPIC-5 TASK-3). `main.ts` не менять.
4. `RedisModule` добавить в `imports` `ApiModule` (`apps/server/src/api.module.ts`) и `WorkerModule` (`apps/server/src/worker.module.ts`) после `DatabaseModule.forRoot(databaseEntities)`. В `CliModule` и `MigrateModule` не добавлять.
5. Заглушка для unit-тестов `test/support/offline-redis.ts` — по образцу `offline-database.ts`:

   ```ts
   export function withOfflineRedis(builder: TestingModuleBuilder): TestingModuleBuilder
   ```

   `builder.overrideProvider(Redis).useValue(offlineRedis)`, где `offlineRedis = { status: "end", ping: () => Promise.reject(new Error("Redis is offline in unit tests")), quit: () => Promise.resolve("OK"), disconnect: () => undefined }`. Обернуть в `withOfflineRedis` все сборки `ApiModule` в unit-тестах: `createProbeApp` (`test/support/unit-probe.ts`), `startZoneProbeApp` (`test/support/zone-probe.ts`) и тест в `src/infra/zones/zone-servers.spec.ts` (строка с `withOfflineDatabase(Test.createTestingModule({ imports: [ApiModule] }))`). Порядок: `withOfflineRedis(withOfflineDatabase(Test.createTestingModule(...)))`. Без заглушки unit-тесты пошли бы в `redis://127.0.0.1:6380` и падали через 5 секунд.

## Где

- `apps/server/src/infra/redis/redis-client.ts`, `apps/server/src/infra/redis/redis.module.ts` — новые файлы. Unit-тест `apps/server/src/infra/redis/redis-client.spec.ts`.
- `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts` — правка.
- `apps/server/test/support/offline-redis.ts` — новый файл; `apps/server/test/support/unit-probe.ts`, `apps/server/test/support/zone-probe.ts`, `apps/server/src/infra/zones/zone-servers.spec.ts` — правка.
- E2e: `apps/server/test/redis-connection.e2e-spec.ts` по образцу `apps/server/test/database-connection.e2e-spec.ts` (сборка, `spawnServer`, `findFreePort`). Valkey контейнера — `process.env.REDIS_URL` и `useTestRedis()` из TASK-1. Запуск: `pnpm --filter @sowa-chat/server test:e2e -- test/redis-connection.e2e-spec.ts`, нужен Docker.

## Требования из плана

- Redis: рассылка событий между репликами, presence, очереди BullMQ, счётчики. Клиент `ioredis` — один на BullMQ, адаптер Socket.IO, presence и счётчики.
- Код работает через стандартный протокол, поэтому совместимые серверы (Valkey, Dragonfly) подключаются без изменений кода. В dev-окружении стоит Valkey.
- Подписка pub/sub и блокирующие команды BullMQ требуют отдельных соединений; их создадут эти модули через `duplicate()` того же клиента. Сейчас нужен только основной клиент для обычных команд.

## Документация

- https://docs.nestjs.com/fundamentals/custom-providers
- https://docs.nestjs.com/fundamentals/async-providers
- https://docs.nestjs.com/fundamentals/lifecycle-events
- https://github.com/redis/ioredis

## Критерии приёмки

- E2e: модуль `Test.createTestingModule({ imports: [AppConfigModule, RedisModule] })` после `init()` отдаёт клиент, `ping()` возвращает `PONG`, а `CLIENT LIST` с клиента теста содержит `name=sowa-chat-server`. После `app.close()` у клиента `status` = `end`, и `CLIENT LIST` больше не содержит `name=sowa-chat-server`.
- E2e: `api`, запущенный из `dist/main.js` с Valkey контейнера, отвечает 404 на `/no-such-path` публичного порта, и `CLIENT LIST` содержит `name=sowa-chat-server`.
- E2e: `api` и `worker` с `REDIS_URL` = `redis://:unreachable-redis-password-5c1d@127.0.0.1:<свободный порт>` завершаются с кодом 1 быстрее 20 секунд; в выводе есть `ECONNREFUSED` и нет `unreachable-redis-password-5c1d`.
- Unit: `waitForRedis` для клиента на свободный порт отклоняется не позже чем через `timeoutMs` + 1 с с ошибкой `Redis is unavailable: connect ECONNREFUSED ...`, после чего `status` клиента — `end`. Весь `pnpm --filter @sowa-chat/server test` проходит без запущенного Redis.

## Чего не делать

- Не подключать BullMQ, Socket.IO, кэш и проверку `/health/ready` — проверка в TASK-4.
- Не включать `enableShutdownHooks` и не обрабатывать SIGTERM: это отклонённая EPIC-2 TASK-4. Закрытие проверяется через `app.close()`.
- Не задавать `retryStrategy`, который прекращает переподключение после старта.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
