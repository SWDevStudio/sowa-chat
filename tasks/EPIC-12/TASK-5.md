# EPIC-12 / TASK-5. Сущность и миграция operators

Исполнитель: haiku
Зависит от: TASK-2
Владеет: apps/server/src/domain/operators/operator.entity.ts, apps/server/src/infra/database/migrations/1793300003000-CreateOperators.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/operators-table.e2e-spec.ts
Коммит: [SERVER]: add operators table with entity and migration
Ветка: feature/EPIC-12

## Что сделать

Таблица `operators`. Образец — `api_keys` из EPIC-9: `apps/server/src/domain/keys/api-key.entity.ts` и `apps/server/src/infra/database/migrations/1793300000000-CreateApiKeys.ts`. Папки `apps/server/src/domain/operators/` ещё нет — создать. Репозиторий и сервис делает TASK-8.

1. `operator.entity.ts` — сущность `Operator`. Тип роли — `OperatorRole` из `@sowa-chat/protocol` (TASK-2), свой список ролей не заводить.

   | Колонка | Тип | Свойство | Примечание |
   |---|---|---|---|
   | `id` | `uuid` | `id: string` | по умолчанию `uuidv7()`, ограничение `PK_operators` |
   | `project_id` | `uuid` | `projectId: string` | NOT NULL, `@ManyToOne(() => Project, { onDelete: "CASCADE" })`, ограничение `FK_operators_project_id` |
   | `external_id` | `text` | `externalId: string` | NOT NULL, ID оператора в админке |
   | `name` | `text` | `name: string` | NOT NULL |
   | `avatar_url` | `text` | `avatarUrl: string \| null` | может быть пустым |
   | `role` | `text` | `role: OperatorRole` | NOT NULL, `CHECK` `CHK_operators_role` |
   | `max_chats` | `integer` | `maxChats: number \| null` | может быть пустым |
   | `disabled_at` | `timestamptz` | `disabledAt: Date \| null` | может быть пустым |

   Ограничения на классе: `@Unique("UQ_operators_project_id_external_id", ["projectId", "externalId"])`, ``@Check("CHK_operators_role", `"role" IN ('operator', 'supervisor')`)``. Колонок `created_at` и `updated_at` нет: состав колонок — строго PLAN.md, раздел 11.

2. Миграция `1793300003000-CreateOperators.ts`, класс `CreateOperators1793300003000`, пишется вручную:

   ```sql
   CREATE TABLE "operators" (
       "id" uuid NOT NULL DEFAULT uuidv7(),
       "project_id" uuid NOT NULL,
       "external_id" text NOT NULL,
       "name" text NOT NULL,
       "avatar_url" text,
       "role" text NOT NULL,
       "max_chats" integer,
       "disabled_at" TIMESTAMP WITH TIME ZONE,
       CONSTRAINT "UQ_operators_project_id_external_id" UNIQUE ("project_id", "external_id"),
       CONSTRAINT "CHK_operators_role" CHECK ("role" IN ('operator', 'supervisor')),
       CONSTRAINT "PK_operators" PRIMARY KEY ("id")
   )
   ALTER TABLE "operators" ADD CONSTRAINT "FK_operators_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
   ```

   Два запроса — два вызова `queryRunner.query`, как в `CreateApiKeys`. `down` — `DROP TABLE "operators"`. Отдельного индекса по `project_id` нет: его покрывает уникальное ограничение `(project_id, external_id)`.

3. Регистрация: `Operator` — в конец `databaseEntities` (`apps/server/src/database-entities.ts`), `CreateOperators1793300003000` — в конец `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`), после `AddProjectsPublicKey1793300002000`.

## Где

- `apps/server/src/domain/operators/operator.entity.ts` — новый файл.
- `apps/server/src/infra/database/migrations/1793300003000-CreateOperators.ts` — новый файл.
- `apps/server/src/database-entities.ts`, `apps/server/src/infra/database/database-migrations.ts` — регистрация.
- Тест: `apps/server/test/operators-table.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`), образец — `apps/server/test/api-keys-table.e2e-spec.ts`, проект — фикстура `createProject` из `apps/server/test/support/fixtures.ts`.
- `apps/server/test/chat-tables.e2e-spec.ts` не меняется: он проверяет только таблицы чата, а внешних ключей из таблиц чата на `operators` эта задача не добавляет.

## Требования из плана

- `operators`: `id, project_id, external_id, name, avatar_url, role (operator|supervisor), max_chats, disabled_at?`.
- Имена колонок в snake_case через `name`, `synchronize: false`, схема только миграциями.
- Имена ограничений заданы явно и повторены в сущности, как в EPIC-8 и EPIC-9: `PK_`, `FK_`, `UQ_`, `CHK_`. Перечисления — `text` с `CHECK`, а не enum PostgreSQL.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/migrations/creating

## Критерии приёмки

- После миграций в `operators` ровно колонки из таблицы выше с типами и `is_nullable` из неё.
- Вторая строка с теми же `project_id` и `external_id` не сохраняется (код `23505`), с тем же `external_id` в другом проекте — сохраняется.
- `role` вне `operator` и `supervisor` не сохраняется (код `23514`).
- Удаление проекта удаляет его строки из `operators`.

## Чего не делать

- Не делать репозиторий, сервис и выдачу токена — это TASK-8.
- Не добавлять внешние ключи на `operators` из таблиц чата (`conversations.assignee_id` и др.) — решение в `decisions.md`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
