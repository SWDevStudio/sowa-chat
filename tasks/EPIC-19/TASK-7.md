# EPIC-19 / TASK-7. Регистрация сущностей чата и миграция таблиц, сгенерированная из них

Исполнитель: haiku
Зависит от: TASK-4, TASK-5, TASK-6
Владеет: apps/server/src/database-entities.ts, apps/server/src/infra/database/migrations/, apps/server/src/infra/database/database-migrations.ts, apps/server/test/chat-tables.e2e-spec.ts, apps/server/src/domain/visitors/, apps/server/src/domain/channels/, apps/server/src/domain/conversations/
Ветка: feature/EPIC-19

## Что сделать

1. Добавить сущности чата в `databaseEntities` (`apps/server/src/database-entities.ts`) в таком порядке: `[Project, Visitor, Channel, Conversation, Participant, Message, ConversationEvent]`. Сущности уже готовы (TASK-1 … TASK-6):
   - `Visitor` — `./domain/visitors/visitor.entity.js`;
   - `Channel` — `./domain/channels/channel.entity.js`;
   - `Conversation`, `Participant`, `Message`, `ConversationEvent` — `./domain/conversations/conversation.entity.js`, `participant.entity.js`, `message.entity.js`, `conversation-event.entity.js`.
2. Миграция генерируется из сущностей, по образцу `CreateProjects` (EPIC-5 TASK-6):
   1. `pnpm infra:up`; если нет `apps/server/.env`, скопировать его из `apps/server/.env.example`.
   2. `pnpm --filter @sowa-chat/server start:migrate` — применить имеющиеся миграции к базе разработки.
   3. `pnpm --filter @sowa-chat/server migration:generate src/infra/database/migrations/CreateChatTables`.
   4. Проверить SQL руками:
      - шесть таблиц `visitors`, `channels`, `conversations`, `participants`, `messages`, `conversation_events`, все колонки в snake_case — колонка в camelCase означает забытый `name` в сущности, исправить сущность и сгенерировать заново;
      - четыре уникальных индекса: `visitors (project_id, display_code)`, `visitors (project_id, external_id)`, `messages (conversation_id, seq)`, `messages (conversation_id, client_msg_id)`;
      - внешние ключи: `ON DELETE CASCADE` у `visitors.project_id`, `channels.project_id`, `conversations.project_id`, `conversations.visitor_id`, `participants.conversation_id`, `messages.conversation_id`, `conversation_events.conversation_id`; `ON DELETE SET NULL` у `visitors.merged_into_id`; `ON DELETE NO ACTION` у `conversations.channel_id`;
      - в миграции нет `IDX_conversations_context` и `IDX_conversations_project_status_last_message_at` (их создаёт TASK-8) и нет изменений таблицы `projects`.
   5. Привести файл к правилам репозитория: `pnpm exec prettier --write <файл>`, замечания `oxlint`.
   6. Добавить класс миграции в `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`) после `CreateProjects…`.
   7. `pnpm infra:down`.

## Где

- `apps/server/src/database-entities.ts`.
- `apps/server/src/infra/database/migrations/` — новая миграция, `apps/server/src/infra/database/database-migrations.ts`. Образец — `migrations/1793193549883-CreateProjects.ts`. Unit-тест `database-migrations.spec.ts` уже сверяет папку со списком.
- Тест: `apps/server/test/chat-tables.e2e-spec.ts` (`pnpm --filter @sowa-chat/server test:e2e -- test/chat-tables.e2e-spec.ts`, нужен Docker). Глобальная подготовка e2e применяет миграции к контейнеру. База и очистка — `useTestDatabase()` из `test/support/test-database.ts`, проект — `createProject()` из `test/support/fixtures.ts`; остальные строки тест сохраняет через `dataSource.getRepository(...)`.

## Требования из плана

- Таблицы и колонки — PLAN.md, раздел 11; состав колонок и их типы записаны в TASK-1 … TASK-6.
- Уникальные индексы: `(conversation_id, seq)` и `(conversation_id, client_msg_id)`; `(project_id, display_code)`; `(project_id, external_id)` у посетителей.
- `conversation_events` удаляется вместе с диалогом.
- Миграции генерируются из сущностей, но каждую проверяем на ревью. `synchronize: false`, схема только миграциями.

## Документация

- https://typeorm.io/docs/migrations/generating
- https://www.postgresql.org/docs/18/ddl-constraints.html#DDL-CONSTRAINTS-FK

## Критерии приёмки

- В базе e2e есть шесть таблиц; имена колонок, `data_type` и `is_nullable` из `information_schema.columns` совпадают с таблицами колонок TASK-1 … TASK-6.
- Повтор строки нарушает уникальность с кодом PostgreSQL `23505`: тот же `seq` в одном диалоге, тот же `clientMsgId` в одном диалоге, тот же `displayCode` в одном проекте, тот же `externalId` в одном проекте. Сохраняются без ошибки: два сообщения диалога с `clientMsgId` `null`, два посетителя проекта с `externalId` `null`, одинаковый `seq` в разных диалогах.
- Удаление диалога удаляет его сообщения, участников и события; удаление проекта удаляет его посетителей, каналы и диалоги; удаление посетителя B ставит `mergedIntoId` `null` у посетителя A, склеенного с B.
- Ручная проверка: после `start:migrate` повторный `migration:generate` сообщает, что изменений в схеме нет.

## Чего не делать

- Не создавать GIN-индекс и индекс списка диалогов — это TASK-8.
- Не править сгенерированный SQL руками: если SQL не тот, исправить сущность и сгенерировать заново.
- Не менять файлы сущностей, кроме исправления забытого `name` по шагу 2.4.
- Не добавлять фикстуры чата в `test/support/fixtures.ts`.

## История доработок

—
