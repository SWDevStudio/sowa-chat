# EPIC-2 / TASK-2. Структура папок сервера и удаление «Hello World»

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-2

## Что сделать

1. Удалить заготовку `nest new`: `app.controller.ts`, `app.service.ts`, `app.controller.spec.ts`, `test/app.e2e-spec.ts`. Очистить `app.module.ts` от контроллера и провайдера: остаётся только `imports: [AppConfigModule]` (нужен для `portsConfig` в `main.ts`).
2. Папки слоёв создаются в задачах, которые их используют.

## Где

- `apps/server/src/`, `apps/server/test/`.

## Требования из плана

Структура сервера:

```
apps/server/src/
├─ domain/       conversations, messages, visitors, operators, bots, attachments
├─ api/
│  ├─ visitor/   REST и WS-namespace посетителя
│  ├─ operator/  REST и WS-namespace оператора
│  ├─ bot/       Bot API
│  └─ server/    server-to-server API
├─ channels/     адаптеры каналов: только web
├─ bot-hub/      доставка событий ботам, транспорты
├─ builtin-bots/ встроенные боты
├─ events/       исходящие события: подписки, доставка, журнал доставок
├─ abuse/        защита от спама
├─ telemetry/    интерцептор, шина событий, метрики
├─ realtime/     Socket.IO, Redis-адаптер, presence
├─ jobs/         процессоры BullMQ
└─ infra/        БД, Redis, S3, конфиг, health, логи
```

Подпапки `domain/` (conversations и т. д.) создавать не нужно: они появятся вместе с модулями.

## Документация

- https://docs.nestjs.com/modules

## Критерии приёмки

- `pnpm check-types`, `pnpm lint` и `pnpm test` проходят (тестов может не быть — это не ошибка; если vitest падает без тестов, включить `passWithNoTests`).
- В `apps/server/src` нет файлов «Hello World».

## Чего не делать

- Не создавать модули Nest в новых папках.
- Не трогать `main.ts` сверх того, что нужно для сборки без удалённых файлов.

## История доработок

—
