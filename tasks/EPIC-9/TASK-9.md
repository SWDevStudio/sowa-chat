# EPIC-9 / TASK-9. Колонка projects.public_key для publicKey сайта

Исполнитель: haiku
Зависит от: TASK-5
Владеет: apps/server/src/domain/projects/project.entity.ts, apps/server/src/infra/database/migrations/1793300002000-AddProjectsPublicKey.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/projects-table.e2e-spec.ts
Ветка: feature/EPIC-9

## Что сделать

Колонка для publicKey сайта `pk_…` в `projects`. Ключ не секрет и хранится открыто: по нему сайт создаёт сессию посетителя. Заполнять колонку будет создание проекта в EPIC-10. Зависимость от TASK-5 — только из-за общего файла `database-migrations.ts`.

1. `project.entity.ts`: свойство

   ```ts
   @Column({ name: "public_key", type: "text", nullable: true })
   publicKey!: string | null;
   ```

   и на классе `@Unique("UQ_projects_public_key", ["publicKey"])`.

2. Миграция `1793300002000-AddProjectsPublicKey.ts`, класс `AddProjectsPublicKey1793300002000`, пишется вручную:

   ```sql
   ALTER TABLE "projects" ADD "public_key" text
   ALTER TABLE "projects" ADD CONSTRAINT "UQ_projects_public_key" UNIQUE ("public_key")
   ```

   `down`: `ALTER TABLE "projects" DROP CONSTRAINT "UQ_projects_public_key"`, затем `ALTER TABLE "projects" DROP COLUMN "public_key"`.

3. Регистрация: `AddProjectsPublicKey1793300002000` — в конец `databaseMigrations`. Сущность `Project` уже в `databaseEntities`.

4. `apps/server/test/projects-table.e2e-spec.ts`: тест «имеет колонки нужных типов, все NOT NULL» проверяет точный список колонок — добавить `public_key` в список и проверку `{ data_type: "text", is_nullable: "YES" }`, название теста поменять на «имеет колонки нужных типов».

## Где

- `apps/server/src/domain/projects/project.entity.ts`.
- `apps/server/src/infra/database/migrations/1793300002000-AddProjectsPublicKey.ts` — новый файл.
- `apps/server/src/infra/database/database-migrations.ts`.
- Тест: `apps/server/test/projects-table.e2e-spec.ts` (e2e).

## Требования из плана

- `projects`: `id, name, allowed_origins[], operator_allowed_origins[], settings jsonb`; publicKey хранится в проекте.
- publicKey `pk_…` не секрет, виден всем; он только создаёт сессию посетителя.
- Колонка может быть пустой: проекты, созданные до EPIC-10, и тестовые фикстуры ключа не имеют (`tasks/EPIC-9/decisions.md`).

## Документация

- https://typeorm.io/docs/entity/entities

## Критерии приёмки

- После миграций в `projects` есть колонка `public_key` типа `text`, допускающая `NULL`.
- Два проекта с одинаковым `public_key` не сохраняются (код `23505`), два проекта без `public_key` сохраняются.
- Проект с `publicKey` сохраняется и читается обратно с тем же значением.

## Чего не делать

- Не генерировать `pk_` и не менять `ProjectsRepository` и фикстуры — это EPIC-10.
- Не добавлять `operator_allowed_origins` — это EPIC-10.

## История доработок

—
