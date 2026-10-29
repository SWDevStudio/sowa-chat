# EPIC-14 / TASK-5. Публикация из CLI: отзыв ключа и изменение доменов сбрасывают кэш на всех репликах

Исполнитель: sonnet
Зависит от: TASK-2, TASK-3, TASK-4
Владеет: apps/server/src/infra/replica-events/replica-event-rules.ts, apps/server/src/infra/replica-events/replica-event-rules.spec.ts, apps/server/src/infra/replica-events/replica-events.publisher.ts, apps/server/src/infra/replica-events/replica-events.publisher.spec.ts, apps/server/src/infra/replica-events/replica-events-publisher.module.ts, apps/server/src/cli.module.ts, apps/server/test/replica-cache-sync.e2e-spec.ts, apps/server/test/replica-events-offline-redis.e2e-spec.ts
Коммит: [SERVER]: publish cache invalidation from cli to all replicas
Ветка: feature/EPIC-14

## Что сделать

Ключи и домены меняет только CLI — отдельный процесс, а не реплика `api`. Поэтому сброс на репликах отправляет CLI: по решению EPIC-10 (`tasks/EPIC-10/decisions.md`, раздел «Redis в режиме cli и сброс кэша на репликах») режим `cli` подписывается на доменные события и публикует события реплик клиентом `ClientsModule` с `Transport.REDIS`, без `RedisModule` и `waitForRedis`. Приём на репликах уже сделан в TASK-4.

1. `replica-event-rules.ts` — какое событие реплик отправить на доменное событие:

   ```ts
   export interface ReplicaEventMessage {
     pattern: string;
     data: JsonObject;
   }
   export type ReplicaEventRule<Name extends DomainEventName> = (
     event: DomainEvents[Name],
   ) => ReplicaEventMessage;
   export type ReplicaEventRules = { [Name in DomainEventName]?: ReplicaEventRule<Name> };

   function cacheInvalidate(keys: string[]): ReplicaEventMessage {
     return { pattern: replicaEventPatterns.cacheInvalidate, data: { keys } };
   }

   export const replicaEventRules: ReplicaEventRules = {
     "apiKey.revoked": (event) => cacheInvalidate(apiKeyCacheKeys(event)),
     "project.allowedOriginsChanged": (event) => cacheInvalidate(projectCacheKeys(event)),
     "project.operatorAllowedOriginsChanged": (event) => cacheInvalidate(projectCacheKeys(event)),
   };

   export function replicaEventNames(rules: ReplicaEventRules): DomainEventName[]
   ```

   `apiKeyCacheKeys`, `projectCacheKeys` — из `apps/server/src/infra/cache/cache-invalidation-rules.ts` (TASK-1), `replicaEventPatterns` — из `replica-events.ts` (TASK-4), `JsonObject` — из `@sowa-chat/protocol`. Ключи кэша не повторять руками. TASK-8 добавит сюда события операторов.

2. `replica-events.publisher.ts` — `ReplicaEventsPublisher implements OnModuleInit, BeforeApplicationShutdown`:
   - конструктор: `@Inject(DomainEventBus) bus`, `@Inject(replicaEventsClient) client: ClientProxy`;
   - `onModuleInit`: подписка через `bus.subscribe` на каждое событие из `replicaEventNames(replicaEventRules)`; обработчик только кладёт `rule(event)` в очередь `pending` (массив) и ничего не отправляет;
   - `beforeApplicationShutdown`: очередь пуста — выход без подключения к Redis; иначе по порядку `await lastValueFrom(this.client.emit(message.pattern, message.data).pipe(timeout(replicaPublishTimeoutMs)), { defaultValue: undefined })`. Любая ошибка — `logger.warn(\`Replica events not sent: ${message}\`)`, где `message` — `error.message`, и выход без исключения: изменение уже в БД, записи на репликах истекут через 60 секунд. Код выхода команды остаётся 0.
   - `replicaPublishTimeoutMs = 3000`.

   Почему отправка в `beforeApplicationShutdown`, а не сразу: доменное событие публикуется внутри транзакции команды (`@Transactional()` в `ApiKeysService.revoke`, `ProjectsService.addOrigin`), и реплика, получив сброс до коммита, перечитала бы из БД старую строку и держала бы её 60 секунд. `runCliCommand` закрывает приложение (`app.close()`) после того, как команда завершилась и транзакция закоммичена; `ClientsModule` закрывает клиент позже, в `onApplicationShutdown`.

3. `replica-events-publisher.module.ts`:

   ```ts
   export const replicaEventsClient = Symbol("replicaEventsClient");
   export const replicaPublishConnectTimeoutMs = 2000;

   @Module({
     imports: [
       ClientsModule.registerAsync([
         {
           name: replicaEventsClient,
           inject: [redisConfig.KEY],
           useFactory: (redis: ConfigType<typeof redisConfig>) => ({
             transport: Transport.REDIS,
             options: { ...redisTransportOptions(redis.url), connectTimeout: replicaPublishConnectTimeoutMs },
           }),
         },
       ]),
     ],
     providers: [ReplicaEventsPublisher],
   })
   export class ReplicaEventsPublisherModule {}
   ```

   `retryAttempts` не задавать: при недоступном Redis клиент не переподключается, и команда не ждёт. Клиент подключается только при первой отправке, поэтому команды без изменений (`project:list`, `key:generate`) к Redis не ходят. Если `replicaEventsClient` нужен в файле публикатора, а модуль импортирует публикатора, вынести символ в `replica-events.publisher.ts` и импортировать его в модуль — без цикла импортов.

4. `apps/server/src/cli.module.ts`: `ReplicaEventsPublisherModule` в `imports`. `RedisModule` не добавлять.

## Где

- `apps/server/src/infra/replica-events/replica-event-rules.ts`, `replica-events.publisher.ts`, `replica-events-publisher.module.ts` — новые.
- `apps/server/src/cli.module.ts`.
- Тесты: unit — `replica-event-rules.spec.ts`, `replica-events.publisher.spec.ts` (клиент — заглушка с `emit: vi.fn(() => of(undefined))`, шина — настоящий `DomainEventBus` на `EventEmitter2`); e2e — `apps/server/test/replica-cache-sync.e2e-spec.ts` и `apps/server/test/replica-events-offline-redis.e2e-spec.ts`, каждый не длиннее 300 строк. В e2e: два экземпляра `api` — `startZoneE2eApp([ProbeController])` (`apps/server/test/support/zone-e2e-app.ts`), пробный маршрут под `@ServerController(...)` как в `apps/server/test/server-key-guard.e2e-spec.ts`; команды — `runCliInProcess` (`apps/server/test/support/cli-run.ts`), проект и ключ — `setupMainProject` (`apps/server/test/support/key-cli.ts`); недоступный Redis — `vi.stubEnv("REDIS_URL", \`redis://127.0.0.1:${await findFreePort()}\`)` перед командой.

## Требования из плана

- Отзыв ключа сбрасывает кэш на всех репликах через Redis: событие `cache.invalidate` уходит через транспорт Redis из `@nestjs/microservices` (pub/sub), и каждая реплика удаляет запись у себя. Если событие потеряется, запись всё равно истечёт через 60 секунд.
- Решение EPIC-10: публикация из `cli` клиентом `ClientsModule` с `Transport.REDIS` только для публикации, без `RedisModule` и `waitForRedis`; при недоступном Redis команда CLI выходит с кодом 0 и пишет предупреждение в лог.

## Документация

- https://docs.nestjs.com/microservices/redis
- https://docs.nestjs.com/microservices/basics#client
- https://docs.nestjs.com/fundamentals/lifecycle-events

## Критерии приёмки

- Публикатор: доменное событие из таблицы кладёт сообщение в очередь и до `beforeApplicationShutdown` ничего не отправляет; в `beforeApplicationShutdown` отправляет сообщения по порядку; с пустой очередью `emit` не вызывается; ошибка `emit` даёт предупреждение `Replica events not sent: …` и не бросает исключение.
- Два экземпляра `api`: ключ `sk_` проверен на обоих (пробный маршрут — 200), `key:revoke` через `runCliInProcess` — код 0, после этого оба экземпляра в течение 2 секунд отвечают 401 тем же ключом, а не через 60 секунд.
- Два экземпляра `api`: `findSnapshotById` проекта прочитан на обоих, `origin:add` и `operator-origin:add` через CLI — оба экземпляра в течение 2 секунд возвращают новый список доменов.
- Недоступный Redis: `key:revoke` выходит с кодом 0, в выводе есть `Replica events not sent`, нет пароля из `REDIS_URL`, а `revoked_at` ключа в БД заполнен; `project:list` выходит с кодом 0 без этого предупреждения.

## Чего не делать

- Не подключать `RedisModule` и `waitForRedis` в `cli`.
- Не отправлять события реплик внутри транзакции.
- Не делать события операторов — это TASK-8.
- Не менять `cli-runner.ts`.

## История доработок

—
