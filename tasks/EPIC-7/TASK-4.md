# EPIC-7 / TASK-4. Ошибка с кодом из protocol для сервисов и 500 без стека и подробностей

Исполнитель: haiku
Зависит от: TASK-3
Владеет: apps/server/src/infra/http/api-exception.ts, apps/server/src/infra/http/error-response.ts, apps/server/src/infra/http/http-error.filter.ts, apps/server/src/infra/http/server-errors.spec.ts, apps/server/test/support/zone-probe.ts
Ветка: feature/EPIC-7

## Что сделать

1. `api-exception.ts` — исключение, которым сервис задаёт код ошибки из `protocol`:

   ```ts
   export const errorCodeStatuses = {
     validationFailed: 400,
     unauthorized: 401,
     forbidden: 403,
     notFound: 404,
     conflict: 409,
     payloadTooLarge: 413,
     rateLimited: 429,
     internalError: 500,
     contextInvalid: 400,
   } satisfies Record<ErrorCode, number>;

   type ErrorDetail = NonNullable<ErrorResponse["details"]>[number];

   interface ApiExceptionInput {
     code: ErrorCode;
     message: string;
     details?: ErrorDetail[];
   }

   export class ApiException extends HttpException {
     readonly code: ErrorCode;
     readonly details: ErrorDetail[] | undefined;
     constructor({ code, message, details }: ApiExceptionInput) { ... }
   }
   ```

   Статус — `errorCodeStatuses[code]`, передаётся в `super(message, статус)`. Пример: `throw new ApiException({ code: "conflict", message: "Conversation is already assigned" })`.

2. `error-response.ts` — в `toErrorResponse` новое правило перед правилом `HttpException`: `ApiException` → `statusCode: exception.getStatus()`, `code: exception.code`, `details: exception.details` (ключ только если задан). `message` — по тому же правилу, что у `HttpException`: ниже 500 — `exception.message`, 500 и выше — `internalErrorMessage`.

3. `http-error.filter.ts` — запись в лог. В классе `private readonly logger = new Logger(HttpErrorFilter.name)` (`Logger` из `@nestjs/common`, в приложении он пишет через `nestjs-pino`). Если итоговый `statusCode` 500 и выше — `this.logger.error(exception)` до отправки ответа: в лог попадают текст и стек исходной ошибки. Ошибки ниже 500 в лог не пишутся (запрос и так есть в логе `pino-http`).

4. Тело ответа одинаковое в `development` и `production`: стека и текста исходной ошибки нет в обоих режимах. Отдельной проверки режима в фильтре нет.

5. `apps/server/test/support/zone-probe.ts` — второй необязательный параметр, чтобы тесты могли запустить приложение в `production`:

   ```ts
   export async function startZoneProbeApp(controllers: Type[], env: Record<string, string> = {}): Promise<ZoneProbeApp>
   ```

   `env` добавляется в вызов `stubTestEnv({ ...порты, ...env })`. Остальное не меняется.

## Где

- `apps/server/src/infra/http/api-exception.ts` — новый файл; `error-response.ts`, `http-error.filter.ts` — правки.
- `apps/server/test/support/zone-probe.ts` — параметр `env`.
- Тест: `apps/server/src/infra/http/server-errors.spec.ts` на `startZoneProbeApp(controllers, { SOWA_ENV: "production" })`. Строки лога — через `redirectLogsTo` из `apps/server/test/support/unit-probe.ts` (образец — `apps/server/src/infra/logging/log-redaction.spec.ts`).

## Требования из плана

- В production ответы об ошибках без стек-трейсов и внутренних деталей.
- Коды ошибок — часть контракта, они описаны в `protocol`.
- `contextInvalid` HTTP-ответом не приходит (событие SDK), статус 400 в таблице только для полноты `Record<ErrorCode, number>`.

## Документация

- https://docs.nestjs.com/exception-filters
- https://github.com/iamolegga/nestjs-pino

## Критерии приёмки

- `ApiException({ code: "conflict", message: "Conversation is already assigned" })` — 409, `code: "conflict"`, тот же `message`; с `details: [{ path: "seq", message: "too big" }]` — те же `details` в теле; `code: "forbidden"` — 403.
- В `production` обработчик бросает `new Error("database exploded at /srv/app")` — 500, тело ровно `{ statusCode: 500, message: "Internal server error", code: "internalError", requestId }`, строки `database exploded` и `/srv/app` в ответе нет.
- В логе для этого запроса есть запись уровня `error` с текстом `database exploded at /srv/app` и стеком.
- `ServiceUnavailableException("pool exhausted")` — 503, `code: "internalError"`, `message: "Internal server error"`, текста `pool exhausted` в ответе нет, в логе есть.

## Чего не делать

- Не добавлять стек в ответ и в `development`.
- Не логировать тела запросов и ответов.

## История доработок

—
