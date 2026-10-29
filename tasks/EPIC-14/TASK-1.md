# EPIC-14 / TASK-1. Модуль кэша на 60 секунд, ключи кэша и сброс на своей реплике

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/cache/, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/src/cli.module.ts
Коммит: [SERVER]: add in-memory cache module with keys and local invalidation
Ветка: feature/EPIC-14

## Что сделать

Общая основа кэша эпика. Кэш проверенных ключей делает TASK-2, кэш проекта — TASK-3, сброс на других репликах — TASK-4 и TASK-5. Папки `apps/server/src/infra/cache/` ещё нет — создать.

1. `apps/server/src/infra/cache/app-cache.module.ts`:

   ```ts
   export const cacheTtlMs = 60_000;

   @Global()
   @Module({
     imports: [CacheModule.register({ isGlobal: true, ttl: cacheTtlMs })],
     providers: [LocalCacheInvalidation],
   })
   export class AppCacheModule {}
   ```

   `CacheModule` и `CACHE_MANAGER` — из `@nestjs/cache-manager` (уже в зависимостях), хранилище по умолчанию — в памяти процесса, `ttl` в миллисекундах. Своих хранилищ не делать.

2. `apps/server/src/infra/cache/cache-keys.ts` — все ключи кэша строятся только здесь:

   ```ts
   export const cacheKeys = {
     apiKey: (lookupPrefix: string) => `apiKey:${lookupPrefix}`,
     project: (projectId: string) => `project:${projectId}`,
     projectIdByPublicKey: (publicKey: string) => `projectIdByPublicKey:${publicKey}`,
   };
   ```

   `lookupPrefix` — значение колонки `api_keys.prefix` (например `sk_AbCdEfGhIjKl`), а не открытый ключ.

3. `apps/server/src/infra/cache/cache-invalidation-rules.ts` — какие ключи удалить при доменном событии:

   ```ts
   export function apiKeyCacheKeys(event: ApiKeyEvent): string[] {
     return [cacheKeys.apiKey(event.prefix)];
   }

   export function projectCacheKeys(event: ProjectOriginsEvent): string[] {
     return [cacheKeys.project(event.projectId)];
   }

   export type CacheInvalidationRule<Name extends DomainEventName> = (
     event: DomainEvents[Name],
   ) => string[];
   export type CacheInvalidationRules = {
     [Name in DomainEventName]?: CacheInvalidationRule<Name>;
   };

   export const cacheInvalidationRules: CacheInvalidationRules = {
     "apiKey.revoked": apiKeyCacheKeys,
     "project.allowedOriginsChanged": projectCacheKeys,
     "project.operatorAllowedOriginsChanged": projectCacheKeys,
   };

   export function cacheInvalidatedEventNames(rules: CacheInvalidationRules): DomainEventName[] {
     return Object.keys(rules) as DomainEventName[];
   }
   ```

   Образец таблицы правил — `auditedEvents` и `auditedEventNames` (`apps/server/src/domain/audit/audited-events.ts`, `apps/server/src/domain/audit/audit-rule.ts`). Типы событий — из `apps/server/src/telemetry/events/domain-events.ts`, этот файл не менять. `apiKeyCacheKeys` и `projectCacheKeys` экспортируются: их же использует TASK-5.

4. `apps/server/src/infra/cache/local-cache-invalidation.listener.ts` — класс `LocalCacheInvalidation implements OnModuleInit`. Конструктор: `@Inject(DomainEventBus) bus: DomainEventBus`, `@Inject(CACHE_MANAGER) cache: Cache` (тип `Cache` из `cache-manager`). В `onModuleInit` для каждого события из `cacheInvalidatedEventNames(cacheInvalidationRules)` подписывается через `bus.subscribe` и удаляет ключи правила: `await this.cache.mdel(rule(event))`. Образец подписки с приведением типа правила — `AuditLogListener.onModuleInit` и `subscribeRule` (`apps/server/src/domain/audit/audit-log.listener.ts`).

5. Подключить `AppCacheModule` в `imports` модулей `ApiModule` (`apps/server/src/api.module.ts`), `WorkerModule` (`apps/server/src/worker.module.ts`) и `CliModule` (`apps/server/src/cli.module.ts`) — строкой сразу после `TelemetryModule`. В CLI кэш нужен, потому что `ApiKeysService` и `ProjectsService` после TASK-2 и TASK-3 требуют `CACHE_MANAGER`. `MigrateModule` не трогать.

## Где

- `apps/server/src/infra/cache/app-cache.module.ts`, `cache-keys.ts`, `cache-invalidation-rules.ts`, `local-cache-invalidation.listener.ts` — новые.
- `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/cli.module.ts` — одна строка в `imports` и импорт.
- Тесты (vitest, `pnpm --filter @sowa-chat/server test`): `apps/server/src/infra/cache/cache-keys.spec.ts`, `cache-invalidation-rules.spec.ts`, `local-cache-invalidation.listener.spec.ts`, `app-cache.module.spec.ts`. Модуль для теста слушателя: `Test.createTestingModule({ imports: [EventEmitterModule.forRoot(), BusModule, AppCacheModule] })`, где `BusModule` — `@Global()` модуль внутри файла теста с `providers: [DomainEventBus]` и `exports: [DomainEventBus]` (в приложении `DomainEventBus` глобальный из `TelemetryModule`, а `TelemetryModule` в unit-тесте требует конфиг).

## Требования из плана

- В памяти реплики на 60 секунд держим то, что читается часто, а меняется редко: настройки проекта, проверенные ключи, настройки ботов, справочник тегов. Кэш — `@nestjs/cache-manager` с хранилищем в памяти.
- Сообщения и диалоги не кэшируем.
- Ключи кэша строятся в одном месте, чтобы сброс и чтение не разошлись.

## Документация

- https://docs.nestjs.com/techniques/caching
- https://docs.nestjs.com/techniques/events

## Критерии приёмки

- `cacheKeys.apiKey("sk_AbCdEfGhIjKl")` — `apiKey:sk_AbCdEfGhIjKl`, `cacheKeys.project("p-1")` — `project:p-1`, `cacheKeys.projectIdByPublicKey("pk_x")` — `projectIdByPublicKey:pk_x`; `cacheInvalidatedEventNames(cacheInvalidationRules)` — ровно три события из таблицы, правила возвращают ключи из `cacheKeys`.
- После `bus.publish("apiKey.revoked", event)` записи `cacheKeys.apiKey(event.prefix)` в `CACHE_MANAGER` нет, а запись с другим ключом осталась; после `project.allowedOriginsChanged` и после `project.operatorAllowedOriginsChanged` нет записи `cacheKeys.project(event.projectId)`.
- Запись, положенная `cache.set(key, value)` без своего срока, читается через 59 секунд и не читается через 61 секунду (`vi.useFakeTimers()`, `vi.advanceTimersByTime`).

## Чего не делать

- Не кэшировать ключи и проекты — это TASK-2 и TASK-3.
- Не подключать Redis и `@nestjs/microservices` — это TASK-4 и TASK-5.
- Не менять `domain-events.ts` и `audited-events.ts`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
