# EPIC-3 / TASK-1. JSON-логи через nestjs-pino

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-3

## Что сделать

Подключить `nestjs-pino` как логгер всего приложения во всех режимах.

1. Логи — JSON в stdout, одна строка — одно событие.
2. В каждой строке есть `service.name` (значение `sowa-chat-server`) и режим запуска (`api`, `worker`, `migrate`, `cli`).
3. Логгер Nest заменён на pino (`app.useLogger`, `bufferLogs: true`), чтобы и системные сообщения Nest шли в том же формате.
4. HTTP-запросы в режиме `api` логируются через pino-http.

## Где

- `apps/server/src/infra/logging/` — новый модуль.
- `apps/server/src/main.ts` и корневые модули режимов.

## Требования из плана

- Сервис сам не хранит логи и никуда их не отправляет: JSON в stdout забирает любой сборщик логов.
- Поля — по соглашениям OpenTelemetry (`service.name` и т. д.).
- В каждой записи: время, уровень, `service.name`, режим, `requestId` (добавит TASK-2), а где есть — ID проекта, диалога и бота (добавляются позже в своих эпиках).

## Документация

- https://docs.nestjs.com/techniques/logger
- https://github.com/iamolegga/nestjs-pino

## Критерии приёмки

- Запуск `api` выводит только JSON-строки, в каждой есть `service.name` и режим.
- Ответ на HTTP-запрос даёт строку лога запроса.
- Режим `worker` пишет логи в том же формате.

## Чего не делать

- Не делать `requestId`, redact и настройку уровня/формата — это TASK-2, TASK-3 и TASK-4.

## История доработок

—
