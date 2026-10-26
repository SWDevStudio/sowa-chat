# EPIC-5 / TASK-1. Подключение TypeORM

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-5

## Что сделать

Подключить PostgreSQL через `@nestjs/typeorm` с настройками из модуля конфигурации.

1. `TypeOrmModule.forRootAsync` берёт `DATABASE_URL` из конфига (группа `database`).
2. `synchronize: false` — всегда, без исключений для development.
3. Пул соединений — 10 (переменная `SOWA_DB_POOL_SIZE`, по умолчанию 10).
4. Соединения закрываются при остановке приложения.
5. Модуль подключается в режимах `api`, `worker` и `cli`.

## Где

- `apps/server/src/infra/database/` — новый модуль.
- `apps/server/src/infra/config/` — переменная пула.

## Требования из плана

- ORM: TypeORM через `@nestjs/typeorm`, только Data Mapper: сущности и репозитории, без Active Record.
- `synchronize: false` всегда. Схему меняют только миграции.
- Сущности живут в `apps/server`, в `protocol` их нет.
- Базы данных не создаются автоматически: схема — только миграциями, данные — фикстурами.
- 2–3 реплики с пулом по 10 укладываются в стандартный лимит подключений PostgreSQL.

## Документация

- https://docs.nestjs.com/techniques/database
- https://typeorm.io/

## Критерии приёмки

- `api` стартует и подключается к PostgreSQL из `pnpm infra:up`.
- С недоступной БД `api` пишет понятную ошибку и завершается с кодом 1.
- После SIGTERM соединений с БД не остаётся.

## Чего не делать

- Не делать миграции и транзакции — это TASK-2 и TASK-3.
- Не создавать сущности.

## История доработок

—
