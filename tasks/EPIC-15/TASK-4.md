# EPIC-15 / TASK-4. Медленный HTTP-запрос — одна строка `warn` с разбивкой по шагам

Исполнитель: haiku
Зависит от: TASK-1, TASK-2, TASK-3
Владеет: apps/server/src/telemetry/slow-operations/, apps/server/src/telemetry/telemetry.interceptor.ts, apps/server/src/telemetry/telemetry.module.ts
Ветка: feature/EPIC-15

## Что сделать

Опирается на готовое: `TelemetryInterceptor` и `TelemetryModule` (TASK-1), `OperationSteps`, `OperationStepsModule`, `OperationTiming` и `beginOperation` в `ClsMiddleware` (TASK-2), `slowOperationsConfig` (TASK-3).

1. `telemetry/slow-operations/slow-operations.ts`:

   ```ts
   export interface FinishedOperation {
     name: string;
     durationMs: number;
     steps: StepTimes;
   }
   ```

   `@Injectable() class SlowOperations`, конструктор `@Inject(slowOperationsConfig.KEY) config: ConfigType<typeof slowOperationsConfig>`, логгер `private readonly logger = new Logger(SlowOperations.name)` из `@nestjs/common` (как в `HttpErrorFilter`). Метод `report(operation: FinishedOperation): void`:
   - если `operation.durationMs <= config.thresholdMs` — ранний `return`, ничего не пишет;
   - иначе одна строка `this.logger.warn({ operation: name, durationMs, steps }, "Slow operation")`, где `durationMs` и каждое значение в `steps` округлены `Math.round` до целых миллисекунд. Округление шагов — отдельная маленькая функция.

   Сервис не знает про HTTP: позже его вызовут задачи очередей в `worker` с именем задачи в `name`.

2. `telemetry/slow-operations/slow-operations.module.ts` — `SlowOperationsModule`: `providers: [SlowOperations]`, `exports: [SlowOperations]`.

3. `telemetry/telemetry.module.ts`: добавить в `imports` `OperationStepsModule` и `SlowOperationsModule`.

4. `telemetry/telemetry.interceptor.ts`:
   - в конструктор добавить `@Inject(OperationSteps)` и `@Inject(SlowOperations)`;
   - в `intercept`, до подписки на `finish`, взять `const timing = this.operationSteps.current()` — ссылку на объект операции, пока контекст CLS активен (в обработчике `finish` контекст может быть потерян);
   - в обработчике `finish` после `recordHttpMetrics` вызвать приватный `reportSlowOperation(request, timing)`: если `timing` нет — ранний `return`; иначе `slowOperations.report(...)` с полями: `name` — метод и шаблон маршрута через пробел (`request.method`, пробел, `request.route.path`), `durationMs` — `performance.now() - timing.startedAt`, `steps` — `timing.steps`;
   - `reportSlowOperation` не зависит от зоны: ранний `return` по зоне остаётся только в `recordHttpMetrics`.

   Общее время берётся от `timing.startedAt` — начала операции в `ClsMiddleware`, поэтому в него входит время guards.

Пример строки (поля pino плюс эти):

```json
{"level":40,"operation":"GET /v1/visitor/conversations/:id/messages","durationMs":734,"steps":{"db":512,"redis":18},"msg":"Slow operation"}
```

## Где

- Новые: `apps/server/src/telemetry/slow-operations/slow-operations.ts`, `slow-operations.module.ts`.
- Меняются: `apps/server/src/telemetry/telemetry.interceptor.ts`, `apps/server/src/telemetry/telemetry.module.ts`.
- Тесты: `apps/server/src/telemetry/slow-operations/slow-operations.spec.ts`. Приложение — `createProbeApp({ controllers, onLogLine })` из `apps/server/test/support/unit-probe.ts` после `stubTestEnv({ SOWA_SLOW_OPERATION_MS: "50" })`, образец разбора строк лога — `apps/server/src/infra/logging/log-level-warn.spec.ts`. Пробный контроллер: медленный метод вызывает `operationSteps.record("db", 30)` и ждёт 100 мс, быстрый отвечает сразу.

## Требования из плана

- Медленные операции: если запрос или задача выполнялись дольше `SOWA_SLOW_OPERATION_MS` (по умолчанию 500 мс), пишется одна строка уровня `warn` с разбивкой времени по шагам (`auth`, `db`, `redis`, `queueWait`, `bot` и т. д.). Быстрые операции такую строку не пишут.
- Маршрут в строке — шаблон, а не настоящий URL с ID.
- Поля логов — camelCase.

## Документация

- https://docs.nestjs.com/interceptors
- https://github.com/iamolegga/nestjs-pino

## Критерии приёмки

- Медленный запрос даёт ровно одну строку с `msg: "Slow operation"` уровня `warn`: `operation` — `GET` и шаблон маршрута с `:id` (не настоящий ID), `durationMs` не меньше 100, `steps.db` равно 30.
- Быстрый запрос не даёт ни одной строки `Slow operation`.
- `SlowOperations.report` с `durationMs`, равным порогу, строку не пишет; с `durationMs` на 1 больше — пишет.

## Чего не делать

- Не менять метрики и их метки из TASK-1.
- Не подключать шаг `db` — это TASK-5.
- Не подключать замер к очередям — их ещё нет.

## История доработок

—
