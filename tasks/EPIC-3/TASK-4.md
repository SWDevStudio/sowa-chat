# EPIC-3 / TASK-4. Уровень и формат логов, ограниченный буфер

Исполнитель: haiku
Зависит от: TASK-1
Ветка: feature/EPIC-3

## Что сделать

1. Добавить в модуль конфигурации:
   - `SOWA_LOG_LEVEL` — `trace`, `debug`, `info`, `warn`, `error`, `fatal`; по умолчанию `info`;
   - `SOWA_LOG_FORMAT` — `json` или `pretty`; по умолчанию `json`.
2. `pretty` выводит логи через `pino-pretty` для локальной разработки. `pino-pretty` стоит в devDependencies, поэтому в production-образе его нет: в `production` формат `pretty` запрещён схемой конфига.
3. Запись в stdout асинхронная, с ограниченным буфером: если получатель stdout завис, лишние строки отбрасываются, а не копятся в памяти.

## Где

- `apps/server/src/infra/logging/`.
- `apps/server/src/infra/config/`.
- `apps/server/.env.example`.

## Требования из плана

- `SOWA_LOG_LEVEL` задаёт уровень, `SOWA_LOG_FORMAT` — формат: `json` для серверов, `pretty` для локальной разработки.
- Логи в памяти не копятся: pino пишет в stdout асинхронно через небольшой буфер. Буфер ограничен (`maxLength`): если получатель stdout завис, лишние строки отбрасываются.

## Документация

- https://getpino.io/#/docs/asynchronous
- https://github.com/pinojs/sonic-boom
- https://github.com/pinojs/pino-pretty

## Критерии приёмки

- `SOWA_LOG_LEVEL=warn` — строк уровня `info` нет.
- `SOWA_LOG_FORMAT=pretty` в development — вывод не JSON; в production — сервис не стартует с понятной ошибкой.
- У буфера записи задан предел.

## Чего не делать

- Не менять состав полей и redact.

## История доработок

—
