# EPIC-8 / TASK-1. Модуль telemetry с внутренней шиной событий

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/telemetry/telemetry.module.ts, apps/server/src/telemetry/events/, apps/server/test/support/test-domain-events.ts, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/src/cli.module.ts
Ветка: feature/EPIC-8

## Что сделать

Внутренняя шина доменных событий на `@nestjs/event-emitter` с типами: имя события и тип его данных записаны в одном месте. Папки `apps/server/src/telemetry/` ещё нет — создать. Пакет `@nestjs/event-emitter` уже есть в `apps/server/package.json`.

1. `apps/server/src/telemetry/events/domain-events.ts` — реестр событий и общие типы:

   ```ts
   export interface DomainEvents {}

   export type DomainEventName = keyof DomainEvents & string;

   export type DomainEventHandler<Name extends DomainEventName> = (
     data: DomainEvents[Name],
   ) => void | Promise<void>;
   ```

   Реестр пока пустой: настоящие события добавляют задачи, которые их создают, — новой строкой `"apiKey.revoked": ApiKeyRevokedEvent;` в этом интерфейсе. Тип данных события объявляется в этом же файле: `telemetry` не импортирует `domain`.

2. `apps/server/src/telemetry/events/domain-event-bus.ts` — сервис шины:

   ```ts
   @Injectable()
   export class DomainEventBus {
     constructor(@Inject(EventEmitter2) private readonly emitter: EventEmitter2) {}

     async publish<Name extends DomainEventName>(name: Name, data: DomainEvents[Name]): Promise<void> {
       await this.emitter.emitAsync(name, data);
     }

     subscribe<Name extends DomainEventName>(name: Name, handler: DomainEventHandler<Name>): void {
       this.emitter.on(name, handler);
     }
   }
   ```

   `publish` ждёт всех подписчиков (`emitAsync`): подписчики выполняются в том же контексте CLS и в той же транзакции, что и код, который опубликовал событие. `EventEmitter2` импортируется из `@nestjs/event-emitter`.

3. `apps/server/src/telemetry/events/on-domain-event.decorator.ts` — типизированная обёртка над `@OnEvent`:

   ```ts
   export function OnDomainEvent<Name extends DomainEventName>(name: Name) {
     const onEvent = OnEvent(name);
     return (
       target: object,
       key: string | symbol,
       descriptor: TypedPropertyDescriptor<DomainEventHandler<Name>>,
     ): void => {
       onEvent(target, key, descriptor);
     };
   }
   ```

   Метод с параметром другого типа под `@OnDomainEvent(...)` не компилируется.

4. `apps/server/src/telemetry/telemetry.module.ts`:

   ```ts
   @Global()
   @Module({
     imports: [EventEmitterModule.forRoot()],
     providers: [DomainEventBus],
     exports: [DomainEventBus],
   })
   export class TelemetryModule {}
   ```

   `forRoot()` без опций: без wildcard, точка в имени — обычный символ.

5. Подключить `TelemetryModule` в `imports` модулей режимов `ApiModule` (`apps/server/src/api.module.ts`), `WorkerModule` (`apps/server/src/worker.module.ts`) и `CliModule` (`apps/server/src/cli.module.ts`) — сразу после `createLoggerModule(...)`. `MigrateModule` не трогать.

6. `apps/server/test/support/test-domain-events.ts` — тестовые события, только для тестов. Они добавляются в реестр через расширение модуля (образец — `apps/server/test/support/provided-context.d.ts`):

   ```ts
   export interface TestHappenedEvent {
     projectId: string;
     operatorId: string;
     conversationId: string;
     deletedMessages: number;
     operatorEmail: string;
     visitorIp: string;
   }

   export interface TestIgnoredEvent {
     projectId: string;
   }

   declare module "../../src/telemetry/events/domain-events.js" {
     interface DomainEvents {
       "test.happened": TestHappenedEvent;
       "test.ignored": TestIgnoredEvent;
     }
   }
   ```

   Поля `operatorEmail` и `visitorIp` нужны TASK-3: на них проверяется, что персональные данные не попадают в журнал. Состав полей не менять.

7. Тест `apps/server/src/telemetry/events/domain-event-bus.spec.ts` (vitest). Модуль: `Test.createTestingModule({ imports: [TelemetryModule], providers: [тестовый подписчик] })`, затем `await moduleRef.init()` — без него `@OnEvent` не регистрируется. Типы тестовых событий — `import type` из `../../../test/support/test-domain-events.js`.

   `ApiModule`, `WorkerModule` и `CliModule` статически не импортировать: их цепочка при загрузке вызывает `ConfigModule.forRoot` с `parseEnv`, а в unit-конфиге vitest переменных окружения нет. `apps/server/vitest.config.ts` не менять. Проверка подключения — как в `apps/server/src/infra/zones/zone-servers.spec.ts`: в `describe("TelemetryModule wiring")` сначала `beforeAll(() => { stubTestEnv(); })` (`stubTestEnv` из `../../../test/support/unit-probe.js`), модули режима загружаются динамически внутри теста:

   ```ts
   it.each([
     ["ApiModule", async () => (await import("../../api.module.js")).ApiModule],
     ["WorkerModule", async () => (await import("../../worker.module.js")).WorkerModule],
     ["CliModule", async () => (await import("../../cli.module.js")).CliModule],
   ])("%s imports TelemetryModule", async (_name, loadMode) => {
     const imports: unknown[] = Reflect.getMetadata("imports", await loadMode());
     expect(imports).toContain(TelemetryModule);
   });
   ```

   `vi.resetModules()` здесь не вызывать: после него `telemetry.module.js` загрузится заново, и `TelemetryModule` из статического импорта теста не совпадёт с тем, что в `imports`.

## Где

- `apps/server/src/telemetry/telemetry.module.ts`, `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/telemetry/events/domain-event-bus.ts`, `apps/server/src/telemetry/events/on-domain-event.decorator.ts` — новые файлы.
- `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/cli.module.ts` — строка в `imports`.
- `apps/server/test/support/test-domain-events.ts` — новый файл.
- Тест: `apps/server/src/telemetry/events/domain-event-bus.spec.ts` (`pnpm --filter @sowa-chat/server test`). Типы проверяет `pnpm --filter @sowa-chat/server check-types`: `expectTypeOf` проверяется компилятором, образец — `apps/server/src/infra/config/config.module.spec.ts`.

## Требования из плана

- `domain` не вызывает напрямую сокеты, ботов и вебхуки: он публикует событие во внутреннюю шину («сообщение создано»), а `realtime`, `bot-hub` и `events` на него подписаны. Так не возникает циклических зависимостей.
- `telemetry` — сквозной глобальный модуль: интерцептор, шина событий, логгер, метрики. Может зависеть только от `infra`.
- Доменные события проходят через шину; на неё подписаны логгер, счётчики метрик, `audit_log` и исходящие вебхуки. Новый способ отдачи — ещё один подписчик.
- Внутренняя шина событий — `@nestjs/event-emitter`.
- Имена внутренних событий — camelCase с точкой: `project.created`, `apiKey.revoked`.

## Документация

- https://docs.nestjs.com/techniques/events

## Критерии приёмки

- `publish("test.happened", данные)` доставляет те же данные методу с `@OnDomainEvent("test.happened")` и обработчику из `subscribe("test.happened", ...)`; обработчик `test.ignored` их не получает.
- Промис `publish` разрешается только после того, как асинхронный обработчик из `subscribe` закончил работу.
- `check-types` проходит с `expectTypeOf`: второй параметр `bus.publish<"test.happened">` — `TestHappenedEvent`, параметр `DomainEventHandler<"test.happened">` — `TestHappenedEvent`, третий параметр функции из `OnDomainEvent<"test.happened">(...)` — `TypedPropertyDescriptor<DomainEventHandler<"test.happened">>`.
- `Reflect.getMetadata("imports", ApiModule)`, то же для `WorkerModule` и `CliModule`, содержит `TelemetryModule`.

## Чего не делать

- Не делать отправку событий после фиксации транзакции — это эпик событий в реальном времени.
- Не добавлять настоящие события в `DomainEvents`.
- Не импортировать в `telemetry` ничего из `domain` и `api`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
