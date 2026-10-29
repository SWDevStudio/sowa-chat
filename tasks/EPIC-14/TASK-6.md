# EPIC-14 / TASK-6. Блокировка оператора в сервисе: `disable`, `enable`, события и журнал аудита

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/operators/operators.service.ts, apps/server/src/domain/operators/operators.repository.ts, apps/server/src/domain/operators/operators.service.spec.ts, apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts, apps/server/test/operator-disable.e2e-spec.ts
Коммит: [SERVER]: disable and enable operators with audit events
Ветка: feature/EPIC-14

## Что сделать

Сейчас `disabled_at` ставится только прямым SQL в тестах. Задача добавляет блокировку и разблокировку в домен операторов. Команды CLI делает TASK-7, доставку до реплик — TASK-8. Образец всей задачи — `ProjectsService.addOrigin` и `removeOrigin` с событиями (`apps/server/src/domain/projects/projects.service.ts`, `projects.repository.ts`).

1. Доменные события в `apps/server/src/telemetry/events/domain-events.ts`:

   ```ts
   export interface OperatorBlockEvent {
     operatorId: string;
     projectId: string;
     externalId: string;
     actorKind: "cli" | "system";
   }
   ```

   В `DomainEvents`: `"operator.disabled": OperatorBlockEvent;` и `"operator.enabled": OperatorBlockEvent;`.

2. Правила журнала в `apps/server/src/domain/audit/audited-events.ts`: функция `operatorBlockAuditRecord(event: OperatorBlockEvent): AuditRecord` — `projectId: event.projectId`, `actorKind: event.actorKind`, `actorId: null`, `targetKind: "operator"`, `targetId: event.operatorId`, `data: { externalId: event.externalId }`; в `auditedEvents` — `"operator.disabled"` и `"operator.enabled"` с этим правилом.

3. `OperatorsRepository` (`operators.repository.ts`):
   - `markDisabled(projectId: string, externalId: string): Promise<string | undefined>` — один условный запрос `UPDATE operators SET disabled_at = now() WHERE project_id = $1 AND external_id = $2 AND disabled_at IS NULL RETURNING id`; возвращает ID оператора, если строка изменилась, иначе `undefined`;
   - `markEnabled(projectId: string, externalId: string): Promise<string | undefined>` — то же с `SET disabled_at = NULL … AND disabled_at IS NOT NULL`;
   - `findByExternalId(projectId: string, externalId: string): Promise<Operator | null>` — `findOneBy`.

   Условный `UPDATE` нужен, чтобы два одновременных вызова не опубликовали два события: событие публикует только тот, у кого строка изменилась (как `appendOrigin`).

4. `OperatorsService` (`operators.service.ts`), новые экспорты:

   ```ts
   export type OperatorActorKind = Extract<ActorKind, "cli" | "system">;
   export type OperatorBlockChange = "disabled" | "enabled" | "unchanged";

   export interface ChangeOperatorBlockInput {
     projectId: string;
     externalId: string;
     actorKind: OperatorActorKind;
   }

   export class OperatorNotFoundError extends Error {
     constructor(externalId: string) {
       super(`Operator "${externalId}" not found`);
     }
   }
   ```

   Конструктор получает третий параметр `@Inject(DomainEventBus) private readonly bus: DomainEventBus`. Методы с `@Transactional()`:
   - `disable(input): Promise<OperatorBlockChange>` — `markDisabled`; есть ID — `bus.publish("operator.disabled", { operatorId, projectId, externalId, actorKind })`, результат `"disabled"`; нет ID — `findByExternalId`: нет оператора — `OperatorNotFoundError`, есть (уже заблокирован) — `"unchanged"` без события;
   - `enable(input): Promise<OperatorBlockChange>` — то же через `markEnabled`, событие `"operator.enabled"`, результат `"enabled"` или `"unchanged"`.

5. `apps/server/src/domain/operators/operators.service.spec.ts`: в тестовый модуль добавить `{ provide: DomainEventBus, useValue: { publish } }` (как в `apps/server/test/support/projects-service-probe.ts`), чтобы старые тесты `issueToken` проходили, и добавить unit-тесты новых методов на заглушках репозитория.

Имена событий и полей выбраны в `tasks/EPIC-14/decisions.md` (раздел про TASK-6).

## Где

- `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts`.
- `apps/server/src/domain/operators/operators.repository.ts`, `apps/server/src/domain/operators/operators.service.ts`.
- Тесты: `apps/server/src/domain/audit/audited-events.spec.ts` (новые правила), `apps/server/src/domain/operators/operators.service.spec.ts`, e2e `apps/server/test/operator-disable.e2e-spec.ts` — модуль `Test.createTestingModule({ imports: [WorkerModule, OperatorsModule] })`, как в `apps/server/test/operators.e2e-spec.ts`; оператор создаётся `issueToken`.

## Требования из плана

- Заблокированный оператор (`disabled_at`) сразу попадает в список блокировок: запросы отклоняются, сокеты разрываются (список и реплики — TASK-8).
- Изменения доступа пишутся в журнал аудита.

## Документация

- https://docs.nestjs.com/techniques/events

## Критерии приёмки

- `disable` ставит `disabled_at`, возвращает `"disabled"` и пишет в `audit_log` одну запись `operator.disabled` с `target_kind` `operator`, `target_id` — ID оператора, `data` `{ externalId }`; повторный `disable` — `"unchanged"`, без новой записи.
- `enable` снимает `disabled_at`, возвращает `"enabled"` и пишет `operator.enabled`; `enable` незаблокированного — `"unchanged"` без записи; после `enable` `issueToken` снова выдаёт токен.
- Неизвестный `externalId` и оператор другого проекта — `OperatorNotFoundError` у обоих методов; два одновременных `disable` — один `"disabled"`, один `"unchanged"` и одна запись в журнале.
- `auditedEvents` содержит `operator.disabled` и `operator.enabled` с правилом из п. 2.

## Чего не делать

- Не делать команды CLI — это TASK-7.
- Не менять `DisabledOperators` и `operators.module.ts` — это TASK-7 и TASK-8.
- Не писать в журнал имя и аватар оператора: только `externalId`.

## История доработок

—
