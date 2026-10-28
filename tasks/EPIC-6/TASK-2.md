# EPIC-6 / TASK-2. Метрики /metrics

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/telemetry/metrics/, apps/server/src/api.module.ts
Ветка: feature/EPIC-6

## Что сделать

Папки `apps/server/src/telemetry/` ещё нет — создать.

1. `telemetry/metrics/metrics.module.ts` — `MetricsModule`. Провайдер реестра `prom-client` с токеном-классом `Registry`:

   ```ts
   {
     provide: Registry,
     useFactory: () => {
       const registry = new Registry();
       collectDefaultMetrics({ register: registry });
       return registry;
     },
   }
   ```

   Один реестр на приложение, глобальный `register` из `prom-client` не используется. Модуль экспортирует `Registry`: в него позже регистрируют свои метрики другие модули (`@Inject(Registry)`).

2. `telemetry/metrics/metrics.controller.ts` — `MetricsController`:
   - `@Zone("management")` (`apps/server/src/infra/zones/zone.decorator.ts`), `@Controller({ path: "metrics", version: VERSION_NEUTRAL })`.
   - `@Get()` с `@Header("Content-Type", Registry.PROMETHEUS_CONTENT_TYPE)` возвращает `registry.metrics()` (строка).
   - Реестр — через конструктор: `@Inject(Registry) private readonly registry: Registry` (явный `@Inject`, как в остальном коде сервера).
3. `MetricsModule` добавить в `imports` `ApiModule` (`apps/server/src/api.module.ts`) последним. В `WorkerModule` не добавлять: у `worker` нет HTTP-серверов.

## Где

- `apps/server/src/telemetry/metrics/metrics.module.ts`, `apps/server/src/telemetry/metrics/metrics.controller.ts` — новые файлы.
- `apps/server/src/api.module.ts` — правка.
- Тест: `apps/server/src/telemetry/metrics/metrics.controller.spec.ts` через `startZoneProbeApp([])` из `apps/server/test/support/zone-probe.ts` (контроллер приходит из `ApiModule`). Образец запросов к портам зон — `apps/server/src/api-versioning.spec.ts`.

## Требования из плана

- Метрики — формат Prometheus на `/metrics` (служебный порт 9090). Забирает Prometheus, VictoriaMetrics, Grafana Alloy, Datadog Agent.
- Метрики — это счётчики, а не список событий: память зависит только от числа комбинаций меток.
- Метки — только значения из ограниченного списка (зона, маршрут, статус, бот, проект). ID диалогов, посетителей и сообщений в метки не попадают.

## Документация

- https://github.com/siimon/prom-client
- https://docs.nestjs.com/fundamentals/custom-providers

## Критерии приёмки

- `GET /metrics` на служебном порту отвечает 200, `Content-Type` начинается с `text/plain;` и содержит `version=0.0.4`, в теле есть `process_cpu_user_seconds_total`.
- `GET /metrics` на публичном порту отвечает 404, `GET /v1/metrics` на служебном — 404.
- `app.get(Registry)` возвращает тот же реестр, что отдаёт `/metrics`: метрика, зарегистрированная в нём в тесте (`new Counter({ name: "probe_total", help: "probe", registers: [registry] })`), появляется в ответе.

## Чего не делать

- Не добавлять метрики HTTP-запросов — это эпик телеметрии запросов.
- Не использовать глобальный `register` из `prom-client`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

- 28.10.2026, вопрос исполнителя о `Content-Type`. `@Header` и возврат строки остаются, `@Res()` не используется. Express переставляет параметры: `text/plain; charset=utf-8; version=0.0.4`, Prometheus порядок параметров не важен. Тест проверяет `^text/plain;` и наличие `version=0.0.4`.
