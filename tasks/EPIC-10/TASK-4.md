# EPIC-10 / TASK-4. Колонка projects.operator_allowed_origins

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/projects/project.entity.ts, apps/server/src/infra/database/migrations/1793300003000-AddProjectsOperatorAllowedOrigins.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/projects-table.e2e-spec.ts
Коммит: [SERVER]: add operator allowed origins column to projects
Ветка: feature/EPIC-10

## Что сделать

Второй список доменов проекта — домены админки для операторской зоны. Образец — колонка `allowed_origins` в `apps/server/src/domain/projects/project.entity.ts` и миграция `apps/server/src/infra/database/migrations/1793300002000-AddProjectsPublicKey.ts`.

1. Сущность `Project` — новое свойство сразу после `allowedOrigins`:

   ```ts
   @Column({ name: "operator_allowed_origins", type: "text", array: true, default: () => "'{}'" })
   operatorAllowedOrigins!: string[];
   ```

2. Миграция `1793300003000-AddProjectsOperatorAllowedOrigins.ts`, класс `AddProjectsOperatorAllowedOrigins1793300003000`, `name = "AddProjectsOperatorAllowedOrigins1793300003000"`, пишется вручную:
   - `up`: `ALTER TABLE "projects" ADD "operator_allowed_origins" text array NOT NULL DEFAULT '{}'`;
   - `down`: `ALTER TABLE "projects" DROP COLUMN "operator_allowed_origins"`.

3. `apps/server/src/infra/database/database-migrations.ts` — `AddProjectsOperatorAllowedOrigins1793300003000` в конец `databaseMigrations`, после `AddProjectsPublicKey1793300002000`.

4. `apps/server/test/projects-table.e2e-spec.ts` проверяет точный список колонок: добавить `operator_allowed_origins` в отсортированный список и проверку типа (`data_type` `ARRAY`, `udt_name` `_text`, `is_nullable` `NO`) по образцу `allowed_origins`; в тесте «сохраняет проект только с name» — `operatorAllowedOrigins` равен `[]`.

## Где

- `apps/server/src/domain/projects/project.entity.ts` — правка.
- `apps/server/src/infra/database/migrations/1793300003000-AddProjectsOperatorAllowedOrigins.ts` — новый файл.
- `apps/server/src/infra/database/database-migrations.ts` — регистрация.
- Тест: `apps/server/test/projects-table.e2e-spec.ts` (e2e).

## Требования из плана

- `projects`: `id, name, allowed_origins[], operator_allowed_origins[], settings jsonb`.
- `operator_allowed_origins` — домены админки для операторской зоны. Домен сайта не получает CORS-доступа к операторскому API, а домен админки — к публичному.
- В production по умолчанию список пуст: браузеры не пустят, пока домен не указан явно.
- Имена колонок в snake_case через `name`.

## Документация

- https://typeorm.io/docs/entity/entities#column-types-for-postgres
- https://www.postgresql.org/docs/current/arrays.html

## Критерии приёмки

- После миграций у `projects` ровно колонки `allowed_origins`, `created_at`, `id`, `name`, `operator_allowed_origins`, `public_key`, `settings`; `operator_allowed_origins` — `text[]`, `NOT NULL`.
- Проект, сохранённый только с `name`, читается с `operatorAllowedOrigins` `[]`; сохранённый с `operatorAllowedOrigins: ["https://admin.example"]` читается с тем же списком, а `allowedOrigins` остаётся `[]`.
- `down` миграции удаляет колонку.

## Чего не делать

- Не менять `allowed_origins`, `public_key` и фикстуру `test/support/fixtures.ts`.
- Не делать нормализацию и команды — это TASK-3 и TASK-13.

## История доработок

—
