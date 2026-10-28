# EPIC-7 / TASK-3. Фильтр ошибок: единое тело ответа с кодом из protocol и requestId

Исполнитель: haiku
Зависит от: TASK-1
Владеет: apps/server/src/infra/http/error-code-of-status.ts, apps/server/src/infra/http/error-response.ts, apps/server/src/infra/http/http-error.filter.ts, apps/server/src/infra/http/http-error.filter.spec.ts, apps/server/src/infra/http/api-http.module.ts
Ветка: feature/EPIC-7

## Что сделать

Глобальный фильтр превращает любую ошибку HTTP-запроса в тело `ErrorResponse` из `@sowa-chat/protocol`: `{ statusCode, message, code, requestId, details? }`.

1. `error-code-of-status.ts` — код ошибки по HTTP-статусу:

   ```ts
   export function errorCodeOfStatus(status: number): ErrorCode
   ```

   Таблица (обычный `Map<number, ErrorCode>`): 400 → `validationFailed`, 401 → `unauthorized`, 403 → `forbidden`, 404 → `notFound`, 409 → `conflict`, 413 → `payloadTooLarge`, 429 → `rateLimited`. Статуса нет в таблице: 500 и выше → `internalError`, остальные → `validationFailed`.

2. `error-response.ts` — тело ответа по исключению:

   ```ts
   export const internalErrorMessage = "Internal server error";
   export function toErrorResponse(exception: unknown, requestId: string): ErrorResponse
   ```

   Правила по порядку, каждое — маленькая функция с ранним `return`:
   - `ZodValidationException` из `nestjs-zod` → `statusCode: 400`, `code: "validationFailed"`, `message: "Validation failed"`, `details` — по одному элементу на каждую ошибку из `exception.getZodError()`: `{ path: issue.path.join("."), message: issue.message }`. Проверка типа — `instanceof ZodError` (`import { ZodError } from "zod"`); если это не `ZodError`, `details` нет.
   - `HttpException` из `@nestjs/common` → `statusCode: exception.getStatus()`, `code: errorCodeOfStatus(статус)`. `message`: при статусе ниже 500 — `exception.message`, при 500 и выше — `internalErrorMessage`.
   - Всё остальное → `statusCode: 500`, `code: "internalError"`, `message: internalErrorMessage`.
   - Ключ `details` есть в теле только когда он задан. Других ключей, кроме пяти из `ErrorResponse`, в теле нет.

3. `http-error.filter.ts` — класс `HttpErrorFilter` с `@Catch()` (ловит всё):
   - если `host.getType() !== "http"` — `throw exception` (ошибки WebSocket фильтр не трогает);
   - `requestId` — значение заголовка ответа `X-Request-Id` (`response.getHeader(requestIdHeader)`, `requestIdHeader` из `apps/server/src/infra/request-id/request-id.ts`). Заголовок ставит `ClsMiddleware` первым делом на каждом запросе. Если это не строка — пустая строка;
   - ответ: `response.status(body.statusCode).json(body)` (`Response` из `express`).

4. В `ApiHttpModule` добавить провайдер `{ provide: APP_FILTER, useClass: HttpErrorFilter }`.

Сюда же попадают ошибки из Express-middleware до контроллера: Nest передаёт их в глобальные фильтры, а битый JSON превращает в `BadRequestException`. 404 неизвестного маршрута и 404 чужой зоны (`ZoneGuard`) — тоже `NotFoundException`.

## Где

- `apps/server/src/infra/http/` — новые файлы `error-code-of-status.ts`, `error-response.ts`, `http-error.filter.ts`; `api-http.module.ts` — провайдер.
- Тест: `apps/server/src/infra/http/http-error.filter.spec.ts` на `startZoneProbeApp` (`apps/server/test/support/zone-probe.ts`). Тестовый контроллер `@Zone("public")`, `@Controller("visitor/error-probe")`: POST с DTO `createZodDto(z.object({ name: z.string().min(1) }))`, GET, который бросает `new NotFoundException("Conversation not found")`, GET, который бросает `new Error("boom")`.

## Требования из плана

- Коды ошибок — часть контракта, они описаны в `protocol` (`errorCodes`, `errorResponseSchema`, `ErrorResponse`).
- В production ответы об ошибках без стек-трейсов и внутренних деталей.
- `requestId` в ответе — тот же, что в логах и в заголовке `X-Request-Id`.

## Документация

- https://docs.nestjs.com/exception-filters
- https://docs.nestjs.com/faq/request-lifecycle

## Критерии приёмки

- Неверное тело — 400, `code: "validationFailed"`, `message: "Validation failed"`, в `details` есть `{ path: "name", message: ... }`. Битый JSON (`{"name":`) — 400 `validationFailed`.
- `NotFoundException("Conversation not found")` — 404, `notFound`, `message: "Conversation not found"`. Неизвестный маршрут и маршрут чужой зоны — 404 `notFound`.
- `new Error("boom")` — 500, `code: "internalError"`, `message: "Internal server error"`, текста `boom` в ответе нет.
- В каждом теле ошибки `statusCode` равен HTTP-статусу, а `requestId` — заголовку `X-Request-Id`. Без своего заголовка в запросе тело проходит `errorResponseSchema.parse`; с заголовком `X-Request-Id: abc-123` в теле `requestId: "abc-123"` (такое тело схему не пройдёт: схема требует UUID, см. `decisions.md`).

## Чего не делать

- Не писать в лог — это TASK-4.
- Не делать исключение с кодом из `protocol` — это TASK-4.
- Не менять `errorResponseSchema` в `protocol`.

## История доработок

—
