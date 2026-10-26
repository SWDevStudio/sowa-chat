# EPIC-12 / TASK-3. Операторы и выдача токена оператора

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2
Ветка: feature/EPIC-12

## Что сделать

1. Сущность и миграция `operators`:

   | Колонка | Тип | Свойство | Примечание |
   |---|---|---|---|
   | `id` | `uuid` | `id` | по умолчанию `uuidv7()` |
   | `project_id` | `uuid` | `projectId` | ссылка на `projects` |
   | `external_id` | `text` | `externalId` | ID оператора в админке; уникален в проекте |
   | `name` | `text` | `name` | |
   | `avatar_url` | `text` | `avatarUrl` | может быть пустым |
   | `role` | `text` | `role` | `operator` или `supervisor` |
   | `max_chats` | `integer` | `maxChats` | может быть пустым |
   | `disabled_at` | `timestamptz` | `disabledAt` | может быть пустым |

2. `POST /v1/server/operator-token` (внутренняя зона, guard `sk_`):
   - тело: `{ externalId, name, avatarUrl?, role }`, схема в `protocol`;
   - оператор создаётся или обновляется по `(project_id, external_id)`: имя, аватар и роль берутся из запроса;
   - заблокированный оператор (`disabled_at`) получает 403 `forbidden`;
   - ответ: `{ token, expiresAt }` — JWT на 15 минут, `aud` `operator`, в claims — ID оператора, ID проекта и роль.

## Где

- `apps/server/src/domain/operators/` — сущность, репозиторий, сервис.
- `apps/server/src/api/server/` — контроллер.
- `packages/protocol/src/` — схемы запроса и ответа.

## Требования из плана

- Токен оператора: JWT на 15 минут без refresh-токена, новый выдаёт бекенд админки через `getToken()` в SDK.
- Роли (`operator`, `supervisor`) передаёт бекенд админки, мы их не придумываем.
- serverKey не попадает в браузер: браузер оператора получает только короткий токен.
- Уволенный оператор теряет доступ не позже чем через 15 минут, а после `disabled_at` — сразу.

## Документация

- https://docs.nestjs.com/security/authentication
- https://docs.nestjs.com/controllers

## Критерии приёмки

- С верным `sk_` выдаётся токен, который проходит проверку сервисом токенов с `aud` `operator` и правильной ролью.
- Повторный запрос с другой ролью обновляет роль оператора.
- Заблокированный оператор получает 403.
- Неверная роль в теле — 400.

## Чего не делать

- Не делать guard оператора — это TASK-4.

## История доработок

—
