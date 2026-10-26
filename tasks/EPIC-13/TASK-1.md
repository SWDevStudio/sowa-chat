# EPIC-13 / TASK-1. Минимальная запись посетителя и таблица сессий

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-13

## Что сделать

Сущности, репозитории через `TransactionHost` и миграция.

`visitors` (минимальный состав; остальные колонки добавит эпик модели данных чата):

| Колонка | Тип | Свойство | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
| `project_id` | `uuid` | `projectId` | ссылка на `projects` |
| `first_seen_at` | `timestamptz` | `firstSeenAt` | по умолчанию `now()` |
| `last_seen_at` | `timestamptz` | `lastSeenAt` | по умолчанию `now()` |

`visitor_sessions`:

| Колонка | Тип | Свойство | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
| `visitor_id` | `uuid` | `visitorId` | ссылка на `visitors` |
| `family_id` | `uuid` | `familyId` | цепочка обновлений одной сессии |
| `refresh_hash` | `bytea` | `refreshHash` | SHA-256 refresh-токена, уникальный |
| `expires_at` | `timestamptz` | `expiresAt` | |
| `used_at` | `timestamptz` | `usedAt` | когда токен обменяли на новый |
| `revoked_at` | `timestamptz` | `revokedAt` | |

Индекс по `family_id`.

## Где

- `apps/server/src/domain/visitors/`.
- `apps/server/src/infra/database/migrations/`.

## Требования из плана

- `visitor_sessions`: `id, visitor_id, family_id, refresh_hash, expires_at, used_at?, revoked_at?`.
- Refresh-токены посетителей хранятся только хешем SHA-256.
- Имена колонок в snake_case через `name`.

## Документация

- https://typeorm.io/docs/entity/entities

## Критерии приёмки

- `migrate` на чистой БД создаёт обе таблицы с колонками в snake_case.

## Чего не делать

- Не делать номер гостя и данные посетителя — это эпик данных посетителя.

## История доработок

—
