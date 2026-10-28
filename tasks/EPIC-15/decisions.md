# EPIC-15. Решения

## 28.10.2026, разбивка эпика (режим plan)

- Было 2 задачи, стало 5. Старая TASK-2 разделена на: замер шагов (TASK-2), переменную и конфиг (TASK-3), строку `warn` (TASK-4), шаг `db` (TASK-5).
- Шаг `auth` из эпика убран: guards авторизации ещё нет (EPIC-12, 13), есть только `ZoneGuard`. Чтобы шаг `auth` позже попал в операцию, начало операции (`beginOperation`) стоит в `ClsMiddleware`, до guards. Замер `auth` подключают эпики 12 и 13 вызовом `OperationSteps.measure("auth", ...)`.
- Порядок ради параллельности. Волна 1: TASK-1 (`telemetry/telemetry.*`, `telemetry/http-metrics/`, `api.module.ts`), TASK-2 (`telemetry/operation-steps/`, `infra/cls/cls-middleware.ts`), TASK-3 (`infra/config/`, `.env.example`) — без общих файлов. Волна 2: TASK-4 (`telemetry/slow-operations/`, `telemetry.interceptor.ts`, `telemetry.module.ts`) и TASK-5 (`infra/database/`, `test/support/offline-database.ts`) — без общих файлов.
- TASK-4 зависит и от TASK-1: по плану каждый запрос проходит через один `TelemetryInterceptor`, поэтому строку `warn` вызывает он же, а не второй interceptor. Число волн от этого не растёт.
- `api.module.ts` меняет только TASK-1: `MetricsModule` заменяется на `TelemetryModule`, дальше модули добавляются в `TelemetryModule`.
- Все задачи на haiku: решения записаны в файлах задач. TASK-5 предложение ставило на sonnet из-за выбора подхода; подход выбран здесь (подписчик `afterQuery`). Тесты везде sonnet: нет безопасности, конкурентности между репликами и публичного контракта. Ревью: sonnet.
- TASK-3 — простая: правка по образцу `redis.config.ts` и `env.schema.logging.spec.ts`, критерии целиком проверяются тестами.

## 28.10.2026, TASK-1. Метрики HTTP

- Имена метрик — `http_requests_total` и `http_request_duration_seconds` (соглашение Prometheus: snake_case, единица в имени), метки `zone`, `method`, `route`, `status`. Ошибки считаются по метке `status`, отдельной метрики ошибок нет.
- Реестр — `Registry` из `MetricsModule` (EPIC-6), глобальный `register` не используется.
- Зона — `zoneOfPort(ports, request.socket.localPort)`, как в `ZoneGuard`. `ZoneGuard` зону не сохраняет, а запрос с неверной зоной до interceptor не доходит. Без зоны (тестовые приложения без `ZoneGuard`) метрики не пишутся.
- Статус и длительность снимаются по событию `finish` ответа: interceptor видит исключение раньше `HttpErrorFilter`, статус там ещё 200.
- Запросы, отклонённые до interceptor (`ZoneGuard`, неизвестный маршрут, ошибка `body-parser`), в метрики не попадают: у них нет шаблона маршрута.
- Внутренние имена: `TelemetryModule`, `TelemetryInterceptor` (из плана), `HttpMetrics`, `HttpRequestRecord`.

## 28.10.2026, TASK-2. Замер шагов

- Шаги — закрытый список `operationSteps = ["auth", "db", "redis", "queueWait", "bot"]`, новый шаг добавляется в список: опечатку ловит компилятор.
- В контексте CLS по ключу `operationTiming` лежит объект `{ startedAt, steps }`; ссылку на него можно взять в начале операции и читать в конце, даже если контекст ALS к тому времени потерян (обработчик `finish`).
- Вне контекста CLS `record` ничего не делает, без исключения: код с замером работает и в CLI, и в тестах без контекста.
- Внутренние имена: `OperationSteps` (`current`, `record`, `measure`), `OperationStepsModule`, `beginOperation`, `operationTimingKey`, `OperationTiming`, `StepTimes`, `OperationStep`.

## 28.10.2026, TASK-3. `SOWA_SLOW_OPERATION_MS`

- Имя и умолчание 500 — из плана. Диапазон 1–600000 мс (до 10 минут): 0 отключал бы смысл порога, верхняя граница защищает от опечатки.
- Конфиг `slowOperationsConfig`, пространство `slowOperations`, поле `thresholdMs`.

## 28.10.2026, TASK-4. Строка о медленной операции

- Поля строки: `operation` (для HTTP — `"<метод> <шаблон маршрута>"`, для задач очереди позже — имя задачи), `durationMs`, `steps`; сообщение `Slow operation`; значения округлены до целых миллисекунд. Отдельных полей `method` и `route` нет: одно поле подходит и для фоновых задач.
- Порог строгий: строка пишется, если `durationMs > thresholdMs`.
- Общее время — от `startedAt` в `ClsMiddleware`, поэтому в него входят guards. Длительность в метриках (TASK-1) — от входа в interceptor, как обычно для метрик Nest.
- Внутренние имена: `SlowOperations` (`report`), `SlowOperationsModule`, `FinishedOperation`.

## 28.10.2026, TASK-5. Шаг `db`

- Логгер TypeORM не подходит: `logQuery` вызывается до запроса, `logQuerySlow` — только выше `maxQueryExecutionTime`. TypeORM 1.1.2 передаёт `executionTime` в `afterQuery` подписчика, подписчик подключается по рецепту Nest (`dataSource.subscribers.push(this)` в конструкторе). `createDataSourceOptions` не меняется.
- Неудачные запросы в шаг не попадают: у них TypeORM не даёт `executionTime`.
- Заглушка `DataSource` в `test/support/offline-database.ts` получает `subscribers: []`, иначе конструктор подписчика падает в unit-тестах.
- Внутреннее имя: `DatabaseStepSubscriber`.
