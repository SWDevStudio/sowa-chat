# EPIC-9 / TASK-2. Сущности api_keys и identity_keys

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-9

## Что сделать

Сущности, репозитории через `TransactionHost` и миграция.

Таблица `api_keys`:

| Колонка | Тип | Свойство | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
| `project_id` | `uuid` | `projectId` | ссылка на `projects` |
| `kind` | `text` | `kind` | `server` или `bot` |
| `prefix` | `text` | `prefix` | публичный идентификатор ключа, уникальный |
| `key_hash` | `bytea` | `keyHash` | SHA-256 ключа |
| `bot_id` | `uuid` | `botId` | пустой у ключей `server`; внешний ключ на `bots` добавит эпик ботов |
| `created_at` | `timestamptz` | `createdAt` | по умолчанию `now()` |
| `last_used_at` | `timestamptz` | `lastUsedAt` | может быть пустым |
| `revoked_at` | `timestamptz` | `revokedAt` | может быть пустым |

Таблица `identity_keys`:

| Колонка | Тип | Свойство | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
| `project_id` | `uuid` | `projectId` | ссылка на `projects` |
| `kid` | `text` | `kid` | уникален в проекте |
| `alg` | `text` | `alg` | `EdDSA` или `ES256` |
| `public_key` | `jsonb` | `publicKey` | публичный ключ в формате JWK |
| `created_at` | `timestamptz` | `createdAt` | по умолчанию `now()` |
| `revoked_at` | `timestamptz` | `revokedAt` | может быть пустым |

В `projects` добавить колонку `public_key` (`text`, уникальная) — publicKey сайта `pk_…`. Он не секрет и хранится открыто: по нему сайт создаёт сессию посетителя.

## Где

- `apps/server/src/domain/keys/` — сущности и репозитории.
- `apps/server/src/domain/projects/` — новое поле проекта.
- `apps/server/src/infra/database/migrations/`.

## Требования из плана

- `api_keys`: `id, project_id, kind (server|bot), prefix, key_hash, bot_id?, created_at, last_used_at?, revoked_at?`.
- `identity_keys`: `id, project_id, kid, alg (EdDSA|ES256), public_key (JWK), created_at, revoked_at?`.
- Ключи `server` и `bot` хранятся только как SHA-256-хеш.
- publicKey `pk_…` не секрет, виден всем; он только создаёт сессию посетителя.
- Имена колонок в snake_case через `name`.

## Документация

- https://typeorm.io/docs/entity/entities

## Критерии приёмки

- `migrate` на чистой БД создаёт обе таблицы и колонку `projects.public_key`.
- Два ключа с одинаковым `prefix` и два identity-ключа с одинаковым `kid` в одном проекте не сохраняются.

## Чего не делать

- Не делать проверку ключей — это TASK-3.

## История доработок

—
