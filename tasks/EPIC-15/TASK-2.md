# EPIC-15 / TASK-2. Замер времени шагов операции через `nestjs-cls`

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/telemetry/operation-steps/, apps/server/src/infra/cls/cls-middleware.ts
Ветка: feature/EPIC-15

## Что сделать

Механизм, которым любой код отмечает время шага (`auth`, `db`, `redis`, `queueWait`, `bot`) в контексте текущей операции. Контекст — `nestjs-cls`: `AppClsModule` уже глобальный (`infra/cls/app-cls.module.ts`), `ClsMiddleware` открывает контекст на каждый HTTP-запрос (`infra/cls/cls-middleware.ts`). Строку `warn` пишет TASK-4, шаг `db` подключает TASK-5.

1. `telemetry/operation-steps/operation-step.ts` — список шагов и типы:

   ```ts
   export const operationSteps = ["auth", "db", "redis", "queueWait", "bot"] as const;
   export type OperationStep = (typeof operationSteps)[number];
   export type StepTimes = Partial<Record<OperationStep, number>>;

   export interface OperationTiming {
     startedAt: number;
     steps: StepTimes;
   }
   ```

   `startedAt` — значение `performance.now()` в начале операции, время шагов — миллисекунды.

2. `telemetry/operation-steps/operation-timing.ts`:

   ```ts
   export const operationTimingKey = "operationTiming";
   export function beginOperation(cls: ClsService): OperationTiming
   ```

   `beginOperation` создаёт `{ startedAt: performance.now(), steps: {} }`, кладёт в контекст `cls.set(operationTimingKey, timing)` и возвращает его. Вызывается в начале операции, внутри активного контекста. Позже ту же функцию вызовут задачи очередей в `worker` внутри `cls.run(...)`.

3. `telemetry/operation-steps/operation-steps.ts` — `@Injectable() class OperationSteps`, конструктор `@Inject(ClsService) cls: ClsService`:
   - `current(): OperationTiming | undefined` — если `cls.isActive()` ложно, `undefined`; иначе `cls.get(operationTimingKey)`;
   - `record(step: OperationStep, durationMs: number): void` — берёт `current()`; если его нет, ничего не делает (ранний `return`, без исключения); иначе прибавляет `durationMs` к `steps[step]` (первое значение — с нуля). Время одного шага за операцию суммируется;
   - `measure<T>(step: OperationStep, work: () => Promise<T>): Promise<T>` — засекает `performance.now()`, ждёт `work()`, в `finally` вызывает `record(step, прошедшее время)`; ошибку `work` пробрасывает.

4. `telemetry/operation-steps/operation-steps.module.ts` — `OperationStepsModule`: `providers: [OperationSteps]`, `exports: [OperationSteps]`. `ClsModule` не импортировать: он уже глобальный.

5. `infra/cls/cls-middleware.ts`: в `setup` после `echoRequestId(...)` вызвать `beginOperation(cls)`. Так операция начинается до guards, и будущий шаг `auth` (guards EPIC-12, 13) попадёт в ту же операцию. Обработчик `setup` записать телом с двумя вызовами, а не выражением.

`OperationTiming` хранится по ссылке: кто взял объект через `current()`, видит шаги, записанные позже в той же операции. `@Transactional()` из `@nestjs-cls/transactional` открывает вложенный контекст с наследованием значений, поэтому шаги внутри транзакции попадают в тот же объект.

## Где

- Новые: `apps/server/src/telemetry/operation-steps/operation-step.ts`, `operation-timing.ts`, `operation-steps.ts`, `operation-steps.module.ts`.
- Меняется: `apps/server/src/infra/cls/cls-middleware.ts`.
- Тесты: `apps/server/src/telemetry/operation-steps/operation-steps.spec.ts` (vitest). Контекст в тестах — `ClsService` из `Test.createTestingModule({ imports: [ClsModule.forRoot({ global: true }), OperationStepsModule] })` и `cls.run(() => ...)`. Для проверки middleware — `createProbeApp` из `apps/server/test/support/unit-probe.ts` с пробным контроллером, который возвращает `operationSteps.current()` (в `providers` теста — `OperationSteps`).

## Требования из плана

- Медленные операции: если запрос или задача выполнялись дольше `SOWA_SLOW_OPERATION_MS`, пишется одна строка уровня `warn` с разбивкой времени по шагам (`auth`, `db`, `redis`, `queueWait`, `bot` и т. д.). Эта задача даёт только разбивку по шагам.
- Механизм подходит и для фоновых задач: позже его подключат задачи очередей в `worker`.

## Документация

- https://papooch.github.io/nestjs-cls/
- https://papooch.github.io/nestjs-cls/introduction/how-it-works

## Критерии приёмки

- В одном `cls.run` после `beginOperation`, `record("db", 10)` и `record("db", 15)` в `current().steps` — `{ db: 25 }`; `measure("redis", ...)` добавляет `redis` не меньше реального ожидания внутри `work`.
- Два параллельных `cls.run` (каждый с `beginOperation`, записи через `await` с задержками вперемешку) не видят шаги друг друга.
- Вне активного контекста `record` не бросает исключение, `current()` возвращает `undefined`.
- В приложении `createProbeApp` обработчик запроса видит `current()` со `startedAt` и пустыми `steps`.

## Чего не делать

- Не писать строку `warn` и не читать `SOWA_SLOW_OPERATION_MS` — это TASK-3 и TASK-4.
- Не подключать шаги `db` и `auth`: шаг `db` делает TASK-5, guards авторизации появятся в EPIC-12 и 13.
- Не подключать замер к очередям — их ещё нет.
- Не трогать `api.module.ts` и `telemetry.module.ts`: модуль подключает TASK-4.

## История доработок

—
