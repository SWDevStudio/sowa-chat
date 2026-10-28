# EPIC-9 / TASK-5. Сущность и миграция identity_keys

Исполнитель: haiku
Зависит от: TASK-2
Владеет: apps/server/src/domain/keys/identity-key.entity.ts, apps/server/src/infra/database/migrations/1793300001000-CreateIdentityKeys.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/identity-keys-table.e2e-spec.ts
Ветка: feature/EPIC-9

## Что сделать

Таблица публичных identity-ключей сайта. Образец — сущность и миграция `api_keys` из TASK-2 (`apps/server/src/domain/keys/api-key.entity.ts`, `apps/server/src/infra/database/migrations/1793300000000-CreateApiKeys.ts`). Зависимость от TASK-2 — только из-за общих файлов регистрации.

1. `identity-key.entity.ts` — список алгоритмов и сущность `IdentityKey`:

   ```ts
   export const identityKeyAlgorithms = ["EdDSA", "ES256"] as const;
   export type IdentityKeyAlgorithm = (typeof identityKeyAlgorithms)[number];
   ```

   | Колонка | Тип | Свойство | Примечание |
   |---|---|---|---|
   | `id` | `uuid` | `id: string` | по умолчанию `uuidv7()`, ограничение `PK_identity_keys` |
   | `project_id` | `uuid` | `projectId: string` | NOT NULL, `@ManyToOne(() => Project, { onDelete: "CASCADE" })`, ограничение `FK_identity_keys_project_id` |
   | `kid` | `text` | `kid: string` | NOT NULL |
   | `alg` | `text` | `alg: IdentityKeyAlgorithm` | NOT NULL, `CHECK` `CHK_identity_keys_alg` |
   | `public_key` | `jsonb` | `publicKey: JWK` | NOT NULL, тип `JWK` — `import type { JWK } from "jose"` |
   | `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn`, по умолчанию `now()` |
   | `revoked_at` | `timestamptz` | `revokedAt: Date \| null` | может быть пустым |

   Ограничения на классе: `@Unique("UQ_identity_keys_project_id_kid", ["projectId", "kid"])`, `@Check("CHK_identity_keys_alg", ...)`. Отдельный индекс по `project_id` не нужен: его покрывает уникальный индекс.

2. Миграция `1793300001000-CreateIdentityKeys.ts`, класс `CreateIdentityKeys1793300001000`, пишется вручную:

   ```sql
   CREATE TABLE "identity_keys" (
       "id" uuid NOT NULL DEFAULT uuidv7(),
       "project_id" uuid NOT NULL,
       "kid" text NOT NULL,
       "alg" text NOT NULL,
       "public_key" jsonb NOT NULL,
       "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
       "revoked_at" TIMESTAMP WITH TIME ZONE,
       CONSTRAINT "UQ_identity_keys_project_id_kid" UNIQUE ("project_id", "kid"),
       CONSTRAINT "CHK_identity_keys_alg" CHECK ("alg" IN ('EdDSA', 'ES256')),
       CONSTRAINT "PK_identity_keys" PRIMARY KEY ("id")
   )
   ALTER TABLE "identity_keys" ADD CONSTRAINT "FK_identity_keys_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
   ```

   `down` — `DROP TABLE "identity_keys"`.

3. Регистрация: `IdentityKey` — в `databaseEntities`, `CreateIdentityKeys1793300001000` — в `databaseMigrations` сразу после `CreateApiKeys1793300000000`.

## Где

- `apps/server/src/domain/keys/identity-key.entity.ts` — новый файл.
- `apps/server/src/infra/database/migrations/1793300001000-CreateIdentityKeys.ts` — новый файл.
- `apps/server/src/database-entities.ts`, `apps/server/src/infra/database/database-migrations.ts` — регистрация.
- Тест: `apps/server/test/identity-keys-table.e2e-spec.ts` (e2e), образец — `apps/server/test/api-keys-table.e2e-spec.ts` из TASK-2.

## Требования из плана

- `identity_keys`: `id, project_id, kid, alg (EdDSA|ES256), public_key (JWK), created_at, revoked_at?`.
- Приватный ключ у нас не появляется: хранится только публичная половина.
- Алгоритм хранится вместе с ключом, и в заголовке JWT разрешается только он.
- Имена колонок в snake_case через `name`, имена ограничений повторены в сущности.

## Документация

- https://typeorm.io/docs/entity/entities
- https://github.com/panva/jose/blob/main/docs/types/interfaces/JWK.md

## Критерии приёмки

- После миграций в `identity_keys` ровно колонки из таблицы выше с типами и `is_nullable` из неё.
- Два ключа с одинаковым `kid` в одном проекте не сохраняются (код `23505`), с одинаковым `kid` в разных проектах — сохраняются.
- `alg` вне `EdDSA` и `ES256` не сохраняется (код `23514`); JWK сохраняется и читается обратно тем же объектом.

## Чего не делать

- Не делать репозиторий, разбор PEM и команды `identity-key:*` — это EPIC-10.
- Не создавать `index.ts`.

## История доработок

—
