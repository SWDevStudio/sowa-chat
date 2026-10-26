# EPIC-8 / TASK-2. Сущность и миграция audit_log

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-8

## Что сделать

Сущность журнала аудита, репозиторий через `TransactionHost` и миграция.

| Колонка | Тип | Свойство | Примечание |
|---|---|---|---|
| `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
| `project_id` | `uuid` | `projectId` | ссылка на `projects`, может быть пустой для событий уровня установки |
| `actor_kind` | `text` | `actorKind` | `system`, `cli`, `server`, `operator`, `bot`, `visitor` |
| `actor_id` | `text` | `actorId` | может быть пустым |
| `action` | `text` | `action` | например `apiKey.revoked` |
| `target_kind` | `text` | `targetKind` | например `apiKey` |
| `target_id` | `text` | `targetId` | может быть пустым |
| `data` | `jsonb` | `data` | по умолчанию `{}`, без персональных данных |
| `created_at` | `timestamptz` | `createdAt` | по умолчанию `now()` |

Индекс `(project_id, created_at)` для просмотра журнала проекта.

## Где

- `apps/server/src/domain/audit/` — сущность и репозиторий.
- `apps/server/src/infra/database/migrations/`.

## Требования из плана

- `audit_log`: `id, project_id, actor_kind, actor_id, action, target_kind, target_id, data jsonb (без персональных данных), created_at`.
- События уровня проекта (ключи, удаления, блокировки) пишутся в `audit_log`.
- Записи журнала хранятся `SOWA_RETENTION_AUDIT_DAYS` (по умолчанию 365); удаление по сроку — эпик сроков хранения.
- Имена колонок в snake_case задаются через `name`.

## Документация

- https://typeorm.io/docs/entity/entities

## Критерии приёмки

- `migrate` на чистой БД создаёт таблицу с колонками в snake_case и индексом.
- Запись без `data` получает `{}`.

## Чего не делать

- Не писать подписчика — это TASK-3.

## История доработок

—
