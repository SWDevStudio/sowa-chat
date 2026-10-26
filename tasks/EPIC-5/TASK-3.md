# EPIC-5 / TASK-3. Транзакции через nestjs-cls

Исполнитель: sonnet
Зависит от: TASK-1
Ветка: feature/EPIC-5

## Что сделать

Подключить `@nestjs-cls/transactional` с адаптером для TypeORM.

1. Расширить `ClsModule` (он уже подключён для `requestId`) плагином транзакций с адаптером `@nestjs-cls/transactional-adapter-typeorm`.
2. Сервис помечается `@Transactional()`, и все репозитории внутри работают в одной транзакции без ручной передачи `EntityManager`.
3. Репозитории обращаются к БД только через `TransactionHost` (`txHost.tx`). Описать в отчёте пример репозитория, по которому будут писать остальные.
4. Транзакции работают и вне HTTP-запроса: в режимах `worker` и `cli`.

## Где

- `apps/server/src/infra/database/`.
- Место, где подключён `ClsModule`.

## Требования из плана

- Транзакции через `nestjs-cls` с плагином `@nestjs-cls/transactional` и адаптером для TypeORM (AsyncLocalStorage).
- Запрос через обычный `@InjectRepository` молча пройдёт мимо транзакции, поэтому репозитории используют только `TransactionHost`.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional/typeorm-adapter
- https://docs.nestjs.com/recipes/async-local-storage

## Критерии приёмки

- Исключение внутри метода с `@Transactional()` откатывает обе записи, сделанные в нём через разные репозитории.
- Без исключения обе записи сохраняются.
- `@Transactional()` работает в режиме `worker`, где нет HTTP-запроса.

## Чего не делать

- Не делать базовый репозиторий с подстановкой `project_id` — это эпик изоляции проектов.

## История доработок

—
