# EPIC-15 / TASK-1. Метрики HTTP по шаблону маршрута: `TelemetryModule` и `TelemetryInterceptor`

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/telemetry/telemetry.module.ts, apps/server/src/telemetry/telemetry.interceptor.ts, apps/server/src/telemetry/telemetry.interceptor.spec.ts, apps/server/src/telemetry/http-metrics/, apps/server/src/api.module.ts
Ветка: feature/EPIC-15

## Что сделать

Модуль телеметрии и глобальный interceptor, через который проходит каждый HTTP-запрос. Реестр метрик уже есть: `MetricsModule` (`apps/server/src/telemetry/metrics/metrics.module.ts`, EPIC-6) экспортирует `Registry` из `prom-client`, свой экземпляр на приложение. Глобальный `register` из `prom-client` не использовать.

1. `telemetry/http-metrics/http-metrics.ts` — `@Injectable() class HttpMetrics`:
   - конструктор `@Inject(Registry) registry: Registry`;
   - в конструкторе создаёт `Counter` с именем `http_requests_total` и `Histogram` с именем `http_request_duration_seconds`, оба с `labelNames: ["zone", "method", "route", "status"]` и `registers: [registry]`; бакеты гистограммы — по умолчанию `prom-client`, `help` — короткий английский текст;
   - метод `record(request: HttpRequestRecord): void` — `counter.inc(labels)` и `histogram.observe(labels, durationSeconds)`.

   ```ts
   export interface HttpRequestRecord {
     zone: ApiZone;
     method: string;
     route: string;
     status: number;
     durationSeconds: number;
   }
   ```

   Метка `status` — `String(status)`.

2. `telemetry/telemetry.interceptor.ts` — `@Injectable() class TelemetryInterceptor implements NestInterceptor`:
   - конструктор: `@Inject(HttpMetrics)` и `@Inject(portsConfig.KEY) ports: ConfigType<typeof portsConfig>`;
   - если `context.getType() !== "http"` — сразу `return next.handle()`;
   - иначе запоминает `const startedAt = performance.now()`, подписывается `response.once("finish", ...)` и возвращает `next.handle()` без изменений;
   - в обработчике `finish` вызывает приватный метод `recordHttpMetrics(request, response, startedAt)`;
   - зона — `zoneOfPort(this.ports, request.socket.localPort)` (`infra/zones/zone-of-port.ts`, так же зону определяет `ZoneGuard`); если зона `undefined`, `recordHttpMetrics` ничего не записывает (ранний `return`): в настоящем приложении такой запрос не проходит `ZoneGuard`. Проверка зоны — только внутри `recordHttpMetrics`, не в `intercept`: TASK-4 добавит в обработчик `finish` второй вызов, которому зона не нужна;
   - маршрут — шаблон из Express: `request.route.path` (например, `/v1/visitor/conversations/:id/messages`), не `request.url` и не `originalUrl`;
   - статус — `response.statusCode` в момент `finish`: к этому времени `HttpErrorFilter` уже записал статус ошибки;
   - длительность — `(performance.now() - startedAt) / 1000`.

   Почему `finish`, а не `tap` или `catchError`: interceptor видит исключение раньше фильтра ошибок, и статус ответа там ещё 200. После `finish` статус окончательный.

3. `telemetry/telemetry.module.ts` — `TelemetryModule`: `imports: [MetricsModule]`, `providers: [HttpMetrics, { provide: APP_INTERCEPTOR, useClass: TelemetryInterceptor }]`. Образец регистрации — `ApiHttpModule` (`infra/http/api-http.module.ts`).

4. `api.module.ts`: в `imports` заменить `MetricsModule` на `TelemetryModule` (на том же месте). `MetricsModule` теперь подключается через `TelemetryModule`.

## Где

- Новые: `apps/server/src/telemetry/telemetry.module.ts`, `apps/server/src/telemetry/telemetry.interceptor.ts`, `apps/server/src/telemetry/http-metrics/http-metrics.ts`.
- Меняется: `apps/server/src/api.module.ts`.
- Образцы: `apps/server/src/telemetry/metrics/metrics.module.ts`, `apps/server/src/infra/http/api-http.module.ts`, `apps/server/src/infra/zones/zone.guard.ts`.
- Тесты: `apps/server/src/telemetry/telemetry.interceptor.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`). Приложение — `startZoneProbeApp` из `apps/server/test/support/zone-probe.ts` с пробным контроллером `@Zone("public")`, `@Controller("telemetry-probe")`: `@Get(":id")` отвечает 200, второй метод (например, `@Get(":id/fail")`) бросает `BadRequestException`. Метрики читать через `GET /metrics` на служебном порту. Таймауты vitest уже 30 с.

## Требования из плана

- Внутри один «пайп»: каждый запрос проходит через `TelemetryInterceptor`.
- HTTP: запросы, ошибки и длительность по маршрутам.
- Метки — только значения из ограниченного списка; маршрут — это шаблон, а не настоящий URL с ID. ID диалогов, посетителей и сообщений в метки не попадают: иначе каждое новое значение создаёт новый временной ряд, и память растёт без предела.

## Документация

- https://docs.nestjs.com/interceptors
- https://docs.nestjs.com/interceptors#binding-interceptors (`APP_INTERCEPTOR`)
- https://github.com/siimon/prom-client

## Критерии приёмки

- После `GET /v1/telemetry-probe/1` и `GET /v1/telemetry-probe/2` на публичном порту в `/metrics` ровно один ряд `http_requests_total` с `route="/v1/telemetry-probe/:id"`, `zone="public"`, `method="GET"`, `status="200"` и значением 2; ряда с `/v1/telemetry-probe/1` нет. Порядок меток в строке не проверять — только наличие каждой.
- Запрос, закончившийся ошибкой 400, учтён в `http_requests_total` и `http_request_duration_seconds_count` со `status="400"`.
- Запрос к пробному маршруту на служебном порту (`ZoneGuard` отвечает 404) не создаёт ряда с `route="/v1/telemetry-probe/:id"` и `zone="management"`, ответ — 404, а не 500.

## Чего не делать

- Не писать строку о медленных операциях и не замерять шаги — это TASK-2 и TASK-4.
- Не трогать `MetricsModule`, `MetricsController` и `ZoneGuard`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
