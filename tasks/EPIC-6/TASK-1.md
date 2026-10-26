# EPIC-6 / TASK-1. Подключение к Redis через ioredis

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-6

## Что сделать

1. Провайдер клиента `ioredis` с адресом из `REDIS_URL` (группа `redis` в конфиге). Код получает клиент через инъекцию по токену, а не создаёт свой.
2. При остановке приложения соединение закрывается (`quit`) в lifecycle-хуке.
3. Модуль подключается в режимах `api` и `worker`.

## Где

- `apps/server/src/infra/redis/` — новый модуль.

## Требования из плана

- Redis: рассылка событий между репликами, presence, очереди BullMQ, счётчики. Клиент `ioredis` — один на BullMQ, адаптер Socket.IO, presence и счётчики.
- Код работает через стандартный протокол, поэтому совместимые серверы (Valkey, Dragonfly) подключаются без изменений кода. В dev-окружении стоит Valkey.
- Подписка pub/sub и блокирующие команды BullMQ требуют отдельных соединений; их создадут эти модули через `duplicate()` того же клиента. Сейчас нужен только основной клиент для обычных команд.

## Документация

- https://docs.nestjs.com/fundamentals/custom-providers
- https://docs.nestjs.com/fundamentals/async-providers
- https://docs.nestjs.com/fundamentals/lifecycle-events
- https://github.com/redis/ioredis

## Критерии приёмки

- `api` подключается к Valkey из `pnpm infra:up` и выполняет `PING`.
- После SIGTERM открытых соединений с Redis не остаётся.
- С недоступным Redis приложение пишет понятную ошибку.

## Чего не делать

- Не подключать BullMQ, Socket.IO и кэш.

## История доработок

—
