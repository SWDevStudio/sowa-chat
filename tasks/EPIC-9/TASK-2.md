# EPIC-9 / TASK-2. Сущность и миграция api_keys

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/keys/api-key.entity.ts, apps/server/src/infra/database/migrations/1793300000000-CreateApiKeys.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/api-keys-table.e2e-spec.ts
Ветка: feature/EPIC-9

## Что сделать

Таблица `api_keys` для ключей `server` и `bot`. Образец — `audit_log` из EPIC-8: `apps/server/src/domain/audit/audit-log-entry.entity.ts` и `apps/server/src/infra/database/migrations/1793200000000-CreateAuditLog.ts`. Репозиторий делает TASK-6.

1. `api-key.entity.ts` — список видов и сущность `ApiKey`:

   ```ts
   export const apiKeyKinds = ["server", "bot"] as const;
   export type ApiKeyKind = (typeof apiKeyKinds)[number];
   ```

   | Колонка | Тип | Свойство | Примечание |
   |---|---|---|---|
   | `id` | `uuid` | `id: string` | по умолчанию `uuidv7()`, ограничение `PK_api_keys` |
   | `project_id` | `uuid` | `projectId: string` | NOT NULL, `@ManyToOne(() => Project, { onDelete: "CASCADE" })`, ограничение `FK_api_keys_project_id` |
   | `kind` | `text` | `kind: ApiKeyKind` | NOT NULL, `CHECK` `CHK_api_keys_kind` |
   | `prefix` | `text` | `prefix: string` | NOT NULL, уникальный, ограничение `UQ_api_keys_prefix` |
   | `key_hash` | `bytea` | `keyHash: Buffer` | NOT NULL, SHA-256 ключа |
   | `bot_id` | `uuid` | `botId: string \| null` | может быть пустым; внешний ключ на `bots` добавит эпик ботов |
   | `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn`, по умолчанию `now()` |
   | `last_used_at` | `timestamptz` | `lastUsedAt: Date \| null` | может быть пустым |
   | `revoked_at` | `timestamptz` | `revokedAt: Date \| null` | может быть пустым |

   Ограничения на классе: `@Unique("UQ_api_keys_prefix", ["prefix"])`, `@Index("IDX_api_keys_project_id", ["projectId"])`, `@Check("CHK_api_keys_kind", ...)`, `@Check("CHK_api_keys_bot_id", ...)`.

2. Миграция `1793300000000-CreateApiKeys.ts`, класс `CreateApiKeys1793300000000`, пишется вручную:

   ```sql
   CREATE TABLE "api_keys" (
       "id" uuid NOT NULL DEFAULT uuidv7(),
       "project_id" uuid NOT NULL,
       "kind" text NOT NULL,
       "prefix" text NOT NULL,
       "key_hash" bytea NOT NULL,
       "bot_id" uuid,
       "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
       "last_used_at" TIMESTAMP WITH TIME ZONE,
       "revoked_at" TIMESTAMP WITH TIME ZONE,
       CONSTRAINT "UQ_api_keys_prefix" UNIQUE ("prefix"),
       CONSTRAINT "CHK_api_keys_kind" CHECK ("kind" IN ('server', 'bot')),
       CONSTRAINT "CHK_api_keys_bot_id" CHECK (("kind" = 'bot') = ("bot_id" IS NOT NULL)),
       CONSTRAINT "PK_api_keys" PRIMARY KEY ("id")
   )
   CREATE INDEX "IDX_api_keys_project_id" ON "api_keys" ("project_id")
   ALTER TABLE "api_keys" ADD CONSTRAINT "FK_api_keys_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
   ```

   Три запроса — три вызова `queryRunner.query`, как в `CreateAuditLog`. `down` — `DROP TABLE "api_keys"`.

3. Регистрация: `ApiKey` — в `databaseEntities` (`apps/server/src/database-entities.ts`), `CreateApiKeys1793300000000` — в конец `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`).

## Где

- `apps/server/src/domain/keys/api-key.entity.ts` — новый файл.
- `apps/server/src/infra/database/migrations/1793300000000-CreateApiKeys.ts` — новый файл.
- `apps/server/src/database-entities.ts`, `apps/server/src/infra/database/database-migrations.ts` — регистрация.
- Тест: `apps/server/test/api-keys-table.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`), образец — `apps/server/test/audit-log-table.e2e-spec.ts`, проект создаётся фикстурой `createProject` из `apps/server/test/support/fixtures.ts`.

## Требования из плана

- `api_keys`: `id, project_id, kind (server|bot), prefix, key_hash, bot_id?, created_at, last_used_at?, revoked_at?`.
- Ключи `server` и `bot` хранятся только как SHA-256-хеш.
- Имена колонок в snake_case через `name`, `synchronize: false`, схема только миграциями.
- Имена ограничений и индекса заданы явно и повторены в сущности, чтобы `migration:generate` не находил расхождений (как в EPIC-8 TASK-2).

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/migrations/creating

## Критерии приёмки

- После миграций в `api_keys` ровно колонки из таблицы выше с типами и `is_nullable` из неё, есть индекс `IDX_api_keys_project_id`.
- Вторая строка с тем же `prefix` не сохраняется (код `23505`).
- `kind` вне `server` и `bot`, ключ `bot` без `bot_id` и ключ `server` с `bot_id` не сохраняются (код `23514`).
- Удаление проекта удаляет его строки из `api_keys`.

## Чего не делать

- Не делать репозиторий, выпуск и проверку ключей — это TASK-6.
- Не трогать `identity_keys` и `projects` — это TASK-5 и TASK-9.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
