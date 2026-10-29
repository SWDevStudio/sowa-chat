# EPIC-14 / TASK-8. Блокировка оператора сразу действует на всех репликах

Исполнитель: sonnet
Зависит от: TASK-4, TASK-5, TASK-7
Владеет: apps/server/src/infra/replica-events/replica-events.ts, apps/server/src/infra/replica-events/replica-event-rules.ts, apps/server/src/infra/replica-events/replica-event-rules.spec.ts, apps/server/src/domain/operators/disabled-operators.ts, apps/server/src/domain/operators/disabled-operators.spec.ts, apps/server/src/domain/operators/operator-replica-events.controller.ts, apps/server/src/domain/operators/operator-replica-events.controller.spec.ts, apps/server/src/domain/operators/disabled-operators.module.ts, apps/server/test/operator-block-sync.e2e-spec.ts
Коммит: [SERVER]: sync operator blocks across replicas
Ветка: feature/EPIC-14

## Что сделать

`operator:disable` и `operator:enable` (TASK-7) меняют БД из процесса CLI, а список блокировок `DisabledOperators` живёт в памяти каждой реплики `api` и сейчас загружается только при старте (`onApplicationBootstrap` → `load()`, уже сделано). Задача доводит изменение до всех реплик тем же механизмом, что `cache.invalidate`: CLI публикует событие реплик после команды (публикатор TASK-5), каждая реплика обновляет свой список.

1. `apps/server/src/infra/replica-events/replica-events.ts`: в `replicaEventPatterns` добавить `operatorDisabled: "operator.disabled"` и `operatorEnabled: "operator.enabled"`; схема данных:

   ```ts
   export const operatorReplicaEventSchema = z.object({ operatorId: z.uuid() });
   export type OperatorReplicaEvent = z.infer<typeof operatorReplicaEventSchema>;
   ```

2. `apps/server/src/infra/replica-events/replica-event-rules.ts`: в `replicaEventRules` добавить
   - `"operator.disabled": (event) => ({ pattern: replicaEventPatterns.operatorDisabled, data: { operatorId: event.operatorId } })`;
   - `"operator.enabled"` — то же с `replicaEventPatterns.operatorEnabled`.

   В событие реплик идёт только `operatorId`: `externalId` и проект репликам не нужны.

3. `apps/server/src/domain/operators/operator-replica-events.controller.ts` — `OperatorReplicaEventsController` (`@Controller()`), конструктор `@Inject(DisabledOperators)`:
   - `@EventPattern(replicaEventPatterns.operatorDisabled) disabled(@Payload() payload: unknown): void` — `operatorReplicaEventSchema.safeParse`; прошло — `disabledOperators.add(operatorId)`;
   - `@EventPattern(replicaEventPatterns.operatorEnabled) enabled(@Payload() payload: unknown): void` — то же с `remove`;
   - неверные данные — `logger.warn("Ignored malformed operator replica event")` без содержимого и выход.

   Зарегистрировать в `DisabledOperatorsModule` (`apps/server/src/domain/operators/disabled-operators.module.ts`) в `controllers`. Модуль подключён только в `api` (через `OperatorAuthModule`), поэтому `worker` и `cli` эти события не обрабатывают.

4. `apps/server/src/domain/operators/disabled-operators.ts`: изменение в этом же процессе (например, вызов `OperatorsService.disable` в тесте или будущий маршрут API) тоже меняет список сразу — методы с `@OnDomainEvent("operator.disabled")` (вызывает `add(event.operatorId)`) и `@OnDomainEvent("operator.enabled")` (вызывает `remove`). Декоратор — `apps/server/src/telemetry/events/on-domain-event.decorator.ts`. Методы `load`, `add`, `remove`, `has` и загрузку при старте не менять.

5. Реплики получают события через транспорт из TASK-4 (`connectReplicaEvents` в `runApi` и в `startZoneE2eApp`), CLI отправляет их публикатором TASK-5 после завершения команды. При недоступном Redis команда CLI выходит с кодом 0 и предупреждением (TASK-5); блокировка уже в БД, новые реплики загрузят её при старте, а действующие токены на старых репликах истекут не позже чем через 15 минут.

## Где

- `apps/server/src/infra/replica-events/replica-events.ts`, `apps/server/src/infra/replica-events/replica-event-rules.ts`.
- `apps/server/src/domain/operators/operator-replica-events.controller.ts` — новый; `apps/server/src/domain/operators/disabled-operators.module.ts`, `apps/server/src/domain/operators/disabled-operators.ts`.
- Тесты: unit — `replica-event-rules.spec.ts` (новые правила), `operator-replica-events.controller.spec.ts`, `disabled-operators.spec.ts` (подписка на доменные события: модуль с `EventEmitterModule.forRoot()` и `DomainEventBus`); e2e — `apps/server/test/operator-block-sync.e2e-spec.ts`, не длиннее 300 строк: два экземпляра `startZoneE2eApp([ProbeController])` с пробным маршрутом `@OperatorController(...)` как в `apps/server/test/disabled-operators.e2e-spec.ts`, токен — `issueTestOperator` (`apps/server/test/support/operator-guard-probe.ts`), команды — `runCliInProcess` с `--project` — имя проекта оператора.

## Требования из плана

- Заблокированный оператор (`disabled_at`) сразу попадает в список блокировок: запросы отклоняются, сокеты разрываются.
- Список заблокированных операторов хранится в памяти каждой реплики и синхронизируется через Redis.
- Уволенный оператор теряет доступ не позже чем через 15 минут, а после `disabled_at` — сразу.

## Документация

- https://docs.nestjs.com/microservices/redis
- https://docs.nestjs.com/microservices/basics#event-based
- https://docs.nestjs.com/techniques/events

## Критерии приёмки

- Два экземпляра `api`, у оператора действующий токен (пробный маршрут — 200 на обоих): после `operator:disable` через CLI оба экземпляра в течение 2 секунд отвечают 401 `unauthorized` на этот токен.
- После `operator:enable` через CLI тот же токен в течение 2 секунд снова проходит на обоих экземплярах.
- Экземпляр, запущенный после `operator:disable`, сразу отвечает 401 на токен заблокированного оператора.
- Событие реплик с неверными данными (`operatorId` не UUID, нет поля) не меняет список и не роняет экземпляр; `OperatorsService.disable` в процессе экземпляра сразу делает `DisabledOperators.has(operatorId)` истинным.

## Чего не делать

- Не разрывать сокеты оператора — это эпик WebSocket; он подпишется на эти же события.
- Не подключать `DisabledOperatorsModule` в `worker` и `cli`.
- Не менять публикатор (`replica-events.publisher.ts`): новые правила он берёт из `replicaEventRules`.

## История доработок

—
