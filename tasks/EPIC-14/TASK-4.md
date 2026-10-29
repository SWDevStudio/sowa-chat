# EPIC-14 / TASK-4. Приём событий реплик через транспорт Redis в `api` и `worker`

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/infra/replica-events/redis-transport-options.ts, apps/server/src/infra/replica-events/redis-transport-options.spec.ts, apps/server/src/infra/replica-events/replica-events.ts, apps/server/src/infra/replica-events/replica-events-transport.ts, apps/server/src/infra/replica-events/replica-events-transport.spec.ts, apps/server/src/infra/replica-events/cache-invalidate.controller.ts, apps/server/src/infra/replica-events/cache-invalidate.controller.spec.ts, apps/server/src/infra/replica-events/replica-events.module.ts, apps/server/src/main.ts, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/test/support/zone-e2e-app.ts, apps/server/test/replica-events.e2e-spec.ts
Коммит: [SERVER]: receive replica events over redis transport in api and worker
Ветка: feature/EPIC-14

## Что сделать

Каждая реплика `api` и `worker` подписывается на события реплик через транспорт Redis из `@nestjs/microservices` (pub/sub) и по `cache.invalidate` удаляет записи из своего кэша. Отправку из CLI делает TASK-5, события блокировки операторов — TASK-8. Папки `apps/server/src/infra/replica-events/` ещё нет — создать.

1. `redis-transport-options.ts` — параметры подключения транспорта из `REDIS_URL`. Транспорт Nest принимает объект параметров ioredis, а не URL, поэтому URL разбирается здесь:

   ```ts
   export interface RedisConnectionOptions {
     host: string;
     port: number;
     db: number;
     username?: string;
     password?: string;
     tls?: Record<string, never>;
   }

   export function redisTransportOptions(redisUrl: string): RedisConnectionOptions
   ```

   Разбор через `new URL(redisUrl)`: `host` — `hostname` без квадратных скобок IPv6; `port` — число из URL, по умолчанию `6379`; `db` — число из пути (`/2` → `2`), по умолчанию `0`; `username` и `password` — через `decodeURIComponent`, только если непустые (иначе поля нет); `tls: {}` — только для схемы `rediss:`. Пустые поля в объект не добавлять. Значения URL и пароль в логи и тексты ошибок не попадают.

2. `replica-events.ts` — имена событий реплик и их данные:

   ```ts
   export const replicaEventPatterns = {
     cacheInvalidate: "cache.invalidate",
   } as const;

   export const cacheInvalidateEventSchema = z.object({
     keys: z.array(z.string().min(1).max(256)).min(1).max(100),
   });
   export type CacheInvalidateEvent = z.infer<typeof cacheInvalidateEventSchema>;
   ```

   Имя `cache.invalidate` — из PLAN.md. TASK-8 добавит сюда события операторов.

3. `replica-events-transport.ts`:

   ```ts
   export const unlimitedRetryAttempts = Number.MAX_SAFE_INTEGER;
   export const replicaEventsRetryDelayMs = 1000;

   export function replicaEventsTransport(redisUrl: string): RedisOptions
   // { transport: Transport.REDIS, options: { ...redisTransportOptions(redisUrl),
   //   connectionName: "sowa-chat-replica-events", retryAttempts: unlimitedRetryAttempts,
   //   retryDelay: replicaEventsRetryDelayMs } }

   export const replicaEventsMicroservice: AsyncMicroserviceOptions
   // { inject: [redisConfig.KEY], useFactory: (redis: ConfigType<typeof redisConfig>) => replicaEventsTransport(redis.url) }

   export function connectReplicaEvents(app: INestApplication): void
   // const redis = app.get<ConfigType<typeof redisConfig>>(redisConfig.KEY);
   // app.connectMicroservice<MicroserviceOptions>(replicaEventsTransport(redis.url));
   ```

   `RedisOptions`, `AsyncMicroserviceOptions`, `MicroserviceOptions`, `Transport` — из `@nestjs/microservices`; `redisConfig` — `apps/server/src/infra/config/redis.config.ts`. `connectMicroservice` вызывать без `inheritAppConfig`: глобальный `ZoneGuard` из `configureApiApp` не должен действовать на обработчики событий. Реплика переподключается к Redis без ограничения попыток; события за время обрыва теряются, записи истекут через 60 секунд.

4. `cache-invalidate.controller.ts`:

   ```ts
   @Controller()
   export class CacheInvalidateController {
     @EventPattern(replicaEventPatterns.cacheInvalidate)
     async invalidate(@Payload() payload: unknown): Promise<void>
   }
   ```

   Конструктор — `@Inject(CACHE_MANAGER) cache: Cache`. `cacheInvalidateEventSchema.safeParse(payload)`: не прошло — `logger.warn("Ignored malformed cache.invalidate event")` (без содержимого события) и выход; прошло — `await this.cache.mdel(event.keys)`. Данные из Redis не доверенные: ничего, кроме удаления перечисленных ключей, по ним не делать.

5. `replica-events.module.ts` — `ReplicaEventsModule` с `controllers: [CacheInvalidateController]`. Подключить в `imports` `ApiModule` и `WorkerModule` после `AppCacheModule`.

6. Запуск режимов в `apps/server/src/main.ts`:
   - `runApi`: после `configureApiApp(app)` — `connectReplicaEvents(app)`, затем `await app.init()`, `await app.startAllMicroservices()`, затем `ZoneServers.listen` как сейчас.
   - `runWorker`: вместо `createContext(WorkerModule)` — `const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(WorkerModule, { bufferLogs: true, ...replicaEventsMicroservice })`, `useAppLogger(app)`, `await app.listen()`. HTTP-сервера у `worker` по-прежнему нет.
   - `migrate` и `cli` не менять: `cli` только публикует (TASK-5) и не подписывается.
   - Без Redis `api` и `worker` по-прежнему завершаются с кодом 1 на старте: `RedisModule` ждёт Redis раньше транспорта (`apps/server/test/redis-connection.e2e-spec.ts` должен проходить без правок).

7. `apps/server/test/support/zone-e2e-app.ts`, `startZoneE2eApp`: тот же порядок, что в `runApi` — `configureApiApp(app)`, `connectReplicaEvents(app)`, `await app.init()`, `await app.startAllMicroservices()`, `ZoneServers.listen`. Так e2e на нескольких экземплярах в одном процессе получают события реплик. `apps/server/test/support/zone-probe.ts` (без Redis) не менять.

## Где

- `apps/server/src/infra/replica-events/` — новые файлы из списка «Владеет».
- `apps/server/src/main.ts`, `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`.
- `apps/server/test/support/zone-e2e-app.ts`.
- Тесты: unit — `redis-transport-options.spec.ts`, `replica-events-transport.spec.ts`, `cache-invalidate.controller.spec.ts`; e2e — `apps/server/test/replica-events.e2e-spec.ts` (не длиннее 300 строк). В e2e: два экземпляра через `startZoneE2eApp()`, событие публикуется своим клиентом `ioredis` в формате транспорта Nest: `redis.publish("cache.invalidate", JSON.stringify({ pattern: "cache.invalidate", data: { keys } }))`; запуск `worker` — `spawnServer("worker", env)` из `apps/server/test/support/e2e-server.ts` (нужна сборка `dist`, как в `apps/server/test/server-modes.e2e-spec.ts`).

## Требования из плана

- Кэш — `@nestjs/cache-manager` с хранилищем в памяти. При изменении кэш сбрасывается на всех репликах через Redis: событие `cache.invalidate` уходит через транспорт Redis из `@nestjs/microservices` (pub/sub), и каждая реплика удаляет запись у себя. Если событие потеряется, запись всё равно истечёт через 60 секунд.
- Пароль из `REDIS_URL` не попадает в вывод.

## Документация

- https://docs.nestjs.com/microservices/redis
- https://docs.nestjs.com/faq/hybrid-application
- https://docs.nestjs.com/microservices/basics#event-based

## Критерии приёмки

- `redisTransportOptions("rediss://user:p%40ss@cache.local:6390/2")` — `{ host: "cache.local", port: 6390, db: 2, username: "user", password: "p@ss", tls: {} }`; `redisTransportOptions("redis://127.0.0.1")` — `{ host: "127.0.0.1", port: 6379, db: 0 }` без других полей.
- Два экземпляра `api` в одном процессе: в кэше каждого есть ключи `a` и `b`; после публикации `cache.invalidate` с `keys: ["a"]` в течение 2 секунд `a` нет в обоих кэшах, `b` осталась.
- Событие с неверными данными (`{ keys: "a" }`, пустой массив, не JSON-объект) не удаляет ничего и не роняет экземпляр: следующее верное событие обрабатывается.
- Пока запущен `worker` (`dist/main.js worker`), `PUBSUB NUMSUB cache.invalidate` в Valkey на 1 больше, чем до его запуска; `redis-connection.e2e-spec.ts` и `server-modes.e2e-spec.ts` проходят без правок.

## Чего не делать

- Не публиковать события из CLI и не подключать `ClientsModule` — это TASK-5.
- Не делать события операторов — это TASK-8.
- Не подключать транспорт к `migrate` и `cli`.
- Не передавать `inheritAppConfig: true`.

## История доработок

—
