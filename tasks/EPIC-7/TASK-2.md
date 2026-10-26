# EPIC-7 / TASK-2. Фильтр ошибок с кодами из protocol

Исполнитель: sonnet
Зависит от: —
Ветка: feature/EPIC-7

## Что сделать

Глобальный фильтр исключений, который превращает любую ошибку в единое тело ответа из `protocol`: `{ code, message, requestId, details? }`.

1. HTTP-исключения Nest переводятся в коды по статусу: 400 → `validationFailed`, 401 → `unauthorized`, 403 → `forbidden`, 404 → `notFound`, 409 → `conflict`, 413 → `payloadTooLarge`, 429 → `rateLimited`.
2. Ошибка проверки zod-схемы (`ZodValidationException`) → 400, `validationFailed`, в `details` — список полей и что с ними не так.
3. Код может задать сам сервис: нужен способ бросить исключение с конкретным кодом из `protocol`.
4. Любая другая ошибка → 500, `internalError`. В логах — стек и подробности. В ответе: в `production` — только общий текст, без стека и внутренних деталей; в `development` можно добавить стек.
5. `requestId` берётся из контекста запроса.
6. Фильтр подключается через `APP_FILTER`.

## Где

- `apps/server/src/infra/http/`.

## Требования из плана

- В production ответы об ошибках без стек-трейсов и внутренних деталей.
- Коды ошибок — часть контракта, они описаны в `protocol`.

## Документация

- https://docs.nestjs.com/exception-filters
- https://docs.nestjs.com/faq/request-lifecycle

## Критерии приёмки

- Неверное тело — 400 с `code: validationFailed` и списком полей.
- Исключение «не найдено» — 404, `notFound`.
- Необработанная ошибка в `production` — 500 без стека и текста исходной ошибки; в логе есть стек.
- В каждом ответе с ошибкой есть `requestId`, совпадающий с заголовком `X-Request-Id`.

## Чего не делать

- Не ловить ошибки WebSocket — у сокетов свой фильтр в эпике WebSocket.

## История доработок

—
