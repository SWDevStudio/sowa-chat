# EPIC-8 / TASK-3. Подписчик журнала аудита

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2
Владеет: apps/server/src/domain/audit/audit-rule.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audit-log.listener.ts, apps/server/src/domain/audit/audit-log.listener.spec.ts, apps/server/src/domain/audit/audit.module.ts, apps/server/test/support/test-audit-rules.ts, apps/server/test/audit-log.e2e-spec.ts, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/src/cli.module.ts
Ветка: feature/EPIC-8

## Что сделать

Подписчик на внутренней шине (`DomainEventBus` из TASK-1), который записывает в `audit_log` (`AuditLogRepository` из TASK-2) события из явного списка.

1. `apps/server/src/domain/audit/audit-rule.ts` — правило аудита и его типы:

   ```ts
   export interface AuditRecord {
     projectId: string | null;
     actorKind: ActorKind;
     actorId: string | null;
     targetKind: string;
     targetId: string | null;
     data: JsonObject;
   }

   export type AuditRule<Name extends DomainEventName> = (event: DomainEvents[Name]) => AuditRecord;

   export type AuditRules = { [Name in DomainEventName]?: AuditRule<Name> };

   export const auditRules = Symbol("auditRules");

   export function auditedEventNames(rules: AuditRules): DomainEventName[] {
     return Object.keys(rules) as DomainEventName[];
   }
   ```

   Правило явно собирает запись из полей события: в `data` попадают только ID и неличные поля, которые правило выбрало само (например, число удалённых сообщений). Данные события целиком в запись не копируются. `action` в правиле нет: это всегда имя события.

2. `apps/server/src/domain/audit/audited-events.ts` — список событий приложения:

   ```ts
   export const auditedEvents: AuditRules = {};
   ```

   Пока пустой. Задачи, которые создают события (ключи, CLI и т. д.), добавляют сюда правило: `"apiKey.revoked": (event) => ({ ... })`.

3. `apps/server/src/domain/audit/audit-log.listener.ts` — класс `AuditLogListener`:
   - в конструкторе через `@Inject(...)`: `DomainEventBus`, `auditRules` (тип `AuditRules`), `AuditLogRepository`, `TransactionHost<TransactionalAdapterTypeOrm>`; поле `private readonly logger = new Logger(AuditLogListener.name)` (`Logger` из `@nestjs/common`, как в `HttpErrorFilter`);
   - `onModuleInit()` для каждого имени из `auditedEventNames(this.rules)` вызывает приватный обобщённый метод `subscribeRule<Name extends DomainEventName>(name: Name)`: он берёт `this.rules[name]` и подписывается `this.bus.subscribe(name, (event) => this.record(name, rule, event))`;
   - `record(name, rule, event)` внутри `try`: строит запись `{ ...rule(event), action: name }` и сохраняет её через `this.txHost.withTransaction(Propagation.Nested, () => this.auditLog.create(entry))`;
   - в `catch`: `this.logger.error({ err: error, action: name }, "Audit log write failed")` и выход без ошибки. Данные события в лог не попадают.

   `Propagation.Nested` даёт точку сохранения (`SAVEPOINT`) внутри транзакции того, кто опубликовал событие: ошибка записи откатывает только запись журнала, транзакция действия продолжается. Без внешней транзакции запись идёт в своей.

4. `apps/server/src/domain/audit/audit.module.ts`:

   ```ts
   @Module({
     providers: [
       AuditLogRepository,
       AuditLogListener,
       { provide: auditRules, useValue: auditedEvents },
     ],
   })
   export class AuditModule {}
   ```

   Подключить `AuditModule` в `imports` `ApiModule`, `WorkerModule` и `CliModule` сразу после `TelemetryModule`.

5. `apps/server/test/support/test-audit-rules.ts` — правила для тестовых событий из `apps/server/test/support/test-domain-events.ts` (TASK-1):

   ```ts
   export const testAuditRules: AuditRules = {
     "test.happened": (event) => ({
       projectId: event.projectId,
       actorKind: "operator",
       actorId: event.operatorId,
       targetKind: "conversation",
       targetId: event.conversationId,
       data: { deletedMessages: event.deletedMessages },
     }),
   };
   ```

   `test.ignored` в правила не входит.

6. Unit-тест `apps/server/src/domain/audit/audit-log.listener.spec.ts`: `Test.createTestingModule({ imports: [TelemetryModule], providers: [AuditLogListener, { provide: auditRules, useValue: testAuditRules }, { provide: AuditLogRepository, useValue: { create: vi.fn() } }, { provide: TransactionHost, useValue: { withTransaction: (_propagation, run) => run() } }] })`, затем `await moduleRef.init()`. Лог проверяется через `vi.spyOn(Logger.prototype, "error")`.

7. E2e-тест `apps/server/test/audit-log.e2e-spec.ts`: модуль `Test.createTestingModule({ imports: [WorkerModule, ProjectsModule], providers: [сценарии] }).overrideProvider(auditRules).useValue(testAuditRules).compile()`, сценарии с `@Transactional()` — по образцу `apps/server/test/transactions.e2e-spec.ts`. Очистка и чтение строк — `useTestDatabase()`, проект — `createProject(dataSource)` из `apps/server/test/support/fixtures.ts`. `createE2eApp()` здесь не подходит: в нём нельзя подменить список правил.

## Где

- `apps/server/src/domain/audit/audit-rule.ts`, `audited-events.ts`, `audit-log.listener.ts`, `audit.module.ts` — новые файлы.
- `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/cli.module.ts` — строка в `imports`.
- `apps/server/test/support/test-audit-rules.ts` — новый файл.
- Тесты: `apps/server/src/domain/audit/audit-log.listener.spec.ts` (`pnpm --filter @sowa-chat/server test`) и `apps/server/test/audit-log.e2e-spec.ts` (`pnpm --filter @sowa-chat/server test:e2e -- audit-log.e2e`, нужен Docker; `check-task` e2e не запускает, тестировщик запускает его сам).

## Требования из плана

- `audit_log` — подписчик внутренней шины, домен не импортирует подписчиков.
- У каждого действия есть автор: журнал показывает, кто ответил и кто закрыл диалог.
- Создание и отзыв ключей, удаления, блокировки пишутся в журнал аудита без персональных данных.
- IP — внутренняя системная информация, в БД не попадает.
- Транзакции — `@nestjs-cls/transactional`, доступ к БД только через `txHost.tx`.

## Документация

- https://docs.nestjs.com/techniques/events
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional

## Критерии приёмки

- Unit: `publish("test.happened", ...)` вызывает `create` один раз с `{ projectId, actorKind: "operator", actorId: operatorId, targetKind: "conversation", targetId: conversationId, data: { deletedMessages }, action: "test.happened" }`; `operatorEmail` и `visitorIp` нет нигде в аргументе; `publish("test.ignored", ...)` `create` не вызывает.
- Unit: если `create` отклоняет промис, `publish` разрешается без ошибки, а `Logger.error` вызван с `action: "test.happened"` и без данных события.
- E2e: `publish("test.happened", ...)` с ID существующего проекта создаёт одну строку `audit_log` с этими полями, `data` строки — ровно `{ deletedMessages: ... }`; `test.ignored` строку не создаёт.
- E2e: в `@Transactional()` сценарии, который создаёт проект и публикует `test.happened` с `projectId` несуществующего проекта, запись журнала не сохраняется, а проект сохраняется; если сценарий после публикации бросает ошибку, не сохраняются ни проект, ни запись журнала.

## Чего не делать

- Не добавлять в `auditedEvents` реальные события — их добавляют задачи, которые эти события создают (ключи, CLI и т. д.).
- Не копировать данные события в `data` целиком и не писать их в лог.
- Не подписываться через wildcard и `onAny`: список событий — только `auditRules`.
- Не менять `DomainEventBus`, `AuditLogRepository` и тестовые события TASK-1.

## История доработок

—
