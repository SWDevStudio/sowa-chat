# EPIC-5 / TASK-6. Сущность Project и миграция таблицы projects

Исполнитель: haiku
Зависит от: TASK-5
Владеет: apps/server/src/domain/projects/project.entity.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/migrations/, apps/server/src/infra/database/database-migrations.ts, apps/server/test/projects-table.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

1. `apps/server/src/domain/projects/project.entity.ts` — сущность `Project`, `@Entity({ name: "projects" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явное имя `name`:

   | Колонка | Тип | Свойство и тип в коде | Декоратор и default |
   |---|---|---|---|
   | `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` — `uuidv7()` встроена в PostgreSQL 18 |
   | `name` | `text` | `name: string` | `@Column({ type: "text", unique: true })` — по имени проект находят команды CLI (`--project main`) |
   | `allowed_origins` | `text[]` | `allowedOrigins: string[]` | `@Column({ name: "allowed_origins", type: "text", array: true, default: () => "'{}'" })` |
   | `settings` | `jsonb` | `settings: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })` |
   | `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn({ name: "created_at", type: "timestamptz" })` |

   Все колонки `NOT NULL`. `JsonObject` — тип из `@sowa-chat/protocol`.
2. Добавить `Project` в `databaseEntities` (`apps/server/src/database-entities.ts`).
3. Миграция генерируется из сущности:
   1. `pnpm infra:up`; если нет `apps/server/.env`, скопировать его из `apps/server/.env.example`.
   2. `pnpm --filter @sowa-chat/server start:migrate` — применить уже имеющиеся миграции к базе разработки.
   3. `pnpm --filter @sowa-chat/server migration:generate src/infra/database/migrations/CreateProjects`.
   4. Проверить SQL руками: таблица `projects`, все колонки в snake_case, уникальное ограничение на `name`, default-значения из таблицы выше. Колонка в camelCase означает забытый `name` в декораторе.
   5. Привести файл к правилам репозитория: `pnpm exec prettier --write <файл>`, замечания `oxlint`.
   6. Добавить класс миграции в `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`).
   7. `pnpm infra:down`.

## Где

- `apps/server/src/domain/projects/project.entity.ts` — новый файл.
- `apps/server/src/database-entities.ts`.
- `apps/server/src/infra/database/migrations/` — новая миграция, `apps/server/src/infra/database/database-migrations.ts`.
- Тест: `apps/server/test/projects-table.e2e-spec.ts`. Глобальная подготовка e2e уже применяет миграции к контейнеру (TASK-5).

## Требования из плана

- `projects`: `id`, `name`, `allowed_origins[]`, `settings jsonb`. Колонку `operator_allowed_origins` добавит эпик CLI (EPIC-10 TASK-5) своей миграцией.
- В БД имена в snake_case, везде остальное — camelCase. Стратегия именования TypeORM стандартная: у полей из нескольких слов имя колонки задаётся явно — `@Column({ name: "allowed_origins" }) allowedOrigins`. В коде, включая QueryBuilder, используются только имена свойств.
- Только Data Mapper: сущности и репозитории, без Active Record. Сущности живут в `apps/server`, в `protocol` их нет.
- Миграции генерируются из сущностей, но каждая проверяется на ревью. `synchronize: false`, схема только миграциями.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/migrations/generating
- https://www.postgresql.org/docs/18/functions-uuid.html

## Критерии приёмки

- В базе e2e есть таблица `projects` с колонками `id` (`uuid`), `name` (`text`), `allowed_origins` (`ARRAY`, `udt_name` `_text`), `settings` (`jsonb`), `created_at` (`timestamp with time zone`), все `is_nullable = 'NO'` (запрос к `information_schema.columns`).
- Проект, сохранённый через `dataSource.getRepository(Project)` только с `name`, получает `id` версии 7 (символ версии в UUID — `7`), `allowedOrigins` `[]`, `settings` `{}` и `createdAt` типа `Date`.
- Второй проект с тем же `name` не сохраняется: ошибка PostgreSQL с кодом `23505`.
- Ручная проверка: после `start:migrate` повторный `migration:generate` сообщает, что изменений в схеме нет.

## Чего не делать

- Не делать репозиторий и модуль проектов — это TASK-7.
- Не делать API и команды CLI для проектов — это эпик CLI.
- Не добавлять `operator_allowed_origins`.

## История доработок

—
