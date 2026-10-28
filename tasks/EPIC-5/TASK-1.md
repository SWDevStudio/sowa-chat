# EPIC-5 / TASK-1. Переменные окружения базы: размер пула и адрес для миграций

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/database.config.ts, apps/server/src/infra/config/env.schema.spec.ts, apps/server/src/infra/config/config.module.spec.ts, apps/server/.env.example
Ветка: feature/EPIC-5

## Что сделать

Добавить в конфиг две необязательные переменные базы данных. Подключение к БД и миграции делают следующие задачи, здесь только конфиг.

1. `apps/server/src/infra/config/env.schema.ts`, в `envObjectSchema`:
   - `SOWA_DB_POOL_SIZE` — целое число от 1 до 100, по умолчанию 10. Разбор как у портов: строка из цифр → `Number` → проверка диапазона → `.default(10)`. Нецифровое значение (`abc`) и значения вне диапазона (`0`, `101`) — ошибка с именем переменной.
   - `SOWA_MIGRATION_DATABASE_URL` — необязательный URL (`z.url()`). Пустая строка считается незаданной переменной: compose передаёт пустую строку, если переменная есть в шаблоне, но не заполнена. Для этого завести маленькую функцию `optionalUrl()` рядом с `port()`.
2. `apps/server/src/infra/config/database.config.ts` — группа `database` отдаёт три поля:

   ```ts
   {
     url: env.DATABASE_URL,
     poolSize: env.SOWA_DB_POOL_SIZE,
     migrationUrl: env.SOWA_MIGRATION_DATABASE_URL ?? env.DATABASE_URL,
   }
   ```

3. `apps/server/.env.example` — после `DATABASE_URL` две закомментированные строки:

   ```
   # SOWA_DB_POOL_SIZE=10
   # SOWA_MIGRATION_DATABASE_URL=postgres://sowa:sowa@127.0.0.1:5432/sowa
   ```

4. Обновить существующий тест «отдаёт группу database» в `config.module.spec.ts`: группа теперь `{ url, poolSize: 10, migrationUrl }`.

## Где

- `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/database.config.ts`.
- `apps/server/.env.example`.
- Тесты: `apps/server/src/infra/config/env.schema.spec.ts`, `apps/server/src/infra/config/config.module.spec.ts`.

## Требования из плана

- Приложение работает под пользователем PostgreSQL без прав суперпользователя. Достаточно одного пользователя (`DATABASE_URL`); кто хочет строже, задаёт отдельного пользователя для миграций (`SOWA_MIGRATION_DATABASE_URL`).
- 2–3 реплики с пулом по 10 укладываются в стандартный лимит подключений PostgreSQL.
- Собственные переменные — с префиксом `SOWA_`, в коде — типизированный конфиг без префиксов.

## Документация

- https://docs.nestjs.com/techniques/configuration
- https://zod.dev/api

## Критерии приёмки

- Без `SOWA_DB_POOL_SIZE` группа `database` отдаёт `poolSize: 10`, с `SOWA_DB_POOL_SIZE=25` — `25`.
- `SOWA_DB_POOL_SIZE` со значениями `abc`, `0` и `101` не проходит проверку, и в тексте ошибки есть `SOWA_DB_POOL_SIZE`.
- Без `SOWA_MIGRATION_DATABASE_URL` и с пустой строкой в ней `migrationUrl` равен `DATABASE_URL`; с заданной переменной — её значению.
- `SOWA_MIGRATION_DATABASE_URL=not-a-url` не проходит проверку, и в тексте ошибки есть имя переменной.

## Чего не делать

- Не подключать TypeORM и не трогать модули режимов — это TASK-3.
- Не менять `deploy/compose/docker-compose.dev.yml`: пользователь PostgreSQL в разработке один — `sowa`.

## История доработок

—
