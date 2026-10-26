# EPIC-5 / TASK-4. Сущность и миграция projects

Исполнитель: haiku
Зависит от: TASK-2
Ветка: feature/EPIC-5

## Что сделать

1. Сущность `Project` и репозиторий через `TransactionHost`.
2. Миграция, созданная `migration:generate` и проверенная вручную.

Колонки таблицы `projects`:

| Колонка | Тип | Свойство в коде | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | первичный ключ, по умолчанию `uuidv7()` (встроена в PostgreSQL 18) |
| `name` | `text` | `name` | уникальное: по имени проект находят команды CLI (`--project main`) |
| `allowed_origins` | `text[]` | `allowedOrigins` | по умолчанию пустой массив |
| `settings` | `jsonb` | `settings` | по умолчанию `{}` |
| `created_at` | `timestamptz` | `createdAt` | по умолчанию `now()` |

## Где

- `apps/server/src/domain/projects/` — сущность и репозиторий.
- `apps/server/src/infra/database/migrations/` — миграция.

## Требования из плана

- `project_id` во всех таблицах: одна установка обслуживает несколько сайтов и админок.
- В БД имена в snake_case, везде остальное — camelCase. Стратегия именования TypeORM стандартная: у полей из нескольких слов имя колонки задаётся явно — `@Column({ name: "allowed_origins" }) allowedOrigins`. В коде, включая QueryBuilder, используются только имена свойств.
- Колонка в camelCase в сгенерированной миграции означает забытый `name`.
- `synchronize: false`, схема только миграциями.

## Документация

- https://typeorm.io/docs/entity/entities
- https://www.postgresql.org/docs/18/functions-uuid.html

## Критерии приёмки

- `migrate` на чистой БД создаёт таблицу `projects` с колонками в snake_case.
- Второй проект с тем же `name` не создаётся (нарушение уникальности).
- Новый проект получает `id`, `allowed_origins = {}`, `settings = {}` и `created_at` без явной передачи.

## Чего не делать

- Не делать API и команды для проектов — это эпик CLI.

## История доработок

—
