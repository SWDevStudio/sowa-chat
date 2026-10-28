# EPIC-19. Решения

## 28.10.2026, разбивка эпика (режим plan)

- Было 4 задачи без файлов, стало 8. Сущности разнесены по одной на задачу, чтобы как можно больше шло параллельно: TASK-1 (`Visitor`) и TASK-2 (`Channel`) — сразу; TASK-3 (`Conversation`) — после них, потому что ссылается на обе; TASK-4 (`Participant`), TASK-5 (`Message`) и TASK-6 (`ConversationEvent`) — параллельно после TASK-3. Затем TASK-7 (сгенерированная миграция) и TASK-8 (ручные индексы) по очереди.
- Задачи 1–6 не трогают `apps/server/src/database-entities.ts` и `database-migrations.ts`: все сущности в список добавляет TASK-7. Поэтому «Владеет» у задач 1–6 не пересекается. Миграция генерируется только из готовых сущностей, раньше её сделать нельзя.
- Задачи 1–6 проверяются unit-тестами без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`. Таблицы, уникальность и каскады проверяет e2e-тест TASK-7 на реальном PostgreSQL.
- Ручная миграция индексов (TASK-8) не склеена с TASK-7: параллельности это не даёт, зато обе задачи маленькие и на haiku.
- Тесты на opus — нет: в эпике нет безопасности, конкурентности и публичного контракта. Ревью: sonnet.
- Эпик 8 (`audit_log`) правит те же `database-entities.ts` и `database-migrations.ts`; при слиянии оба списка только дополняются.

## 28.10.2026, имена в базе и в коде

- Таблицы и колонки — строго PLAN.md, раздел 11. У колонок из нескольких слов явный `name` в snake_case, тип колонки всегда явный.
- `context` (`conversations`), `data` и `tech` (`visitors`), `data` (`conversation_events`), `payload` (`messages`) — тип `JsonObject` из `@sowa-chat/protocol`, как `settings` у `projects` (EPIC-5 TASK-6). `handoff` и `routing_cycle` — тоже `JsonObject | null`: форму этих данных задают эпики ботов.
- Внутренние имена типов (не публичный API): `ConversationStatus`, `ConversationCloseReason` — в `conversation.entity.ts`; `ParticipantKind` — в `participant.entity.ts`; `MessageSenderKind`, `MessageType` — в `message.entity.ts`; `ConversationEventActorKind` — в `conversation-event.entity.ts`. У каждой сущности свой тип, чтобы задачи 4–6 не зависели друг от друга.
- Перечисления хранятся в `text`, а не в `enum` PostgreSQL: новое значение не требует миграции типа. `channels.kind` и `conversation_events.type` — просто `string`: каналы подключаются без правок домена (EPIC-21), список событий задаёт EPIC-30.
- Имена ручных индексов: `IDX_conversations_context` (GIN `jsonb_path_ops` по `context`) и `IDX_conversations_project_status_last_message_at` (`project_id, status, last_message_at DESC`). Префикс `IDX_` — как у индексов, которые называет TypeORM. Оба объявлены в `Conversation` с `synchronize: false`: иначе `migration:generate` предложил бы удалить их как отсутствующие в сущности (`RdbmsSchemaBuilder.dropOldIndices`). Создаются без `CONCURRENTLY`: таблица новая и пустая.

## 28.10.2026, колонки, которых план не уточняет

- `visitors.display_code` — `integer`, допускает NULL. Номер гостя выдаёт EPIC-22 TASK-1; до него посетителей создаёт сессия посетителя (EPIC-13) без номера. EPIC-22 может сделать колонку `NOT NULL` своей миграцией.
- `messages.sender_id`, `messages.client_msg_id` — NULL у системных сообщений; `messages.body` и `payload` — NULL, когда их нет. Уникальный индекс по `(conversation_id, client_msg_id)` NULL не сравнивает.
- `participants`: составной первичный ключ `(conversation_id, kind, participant_id)`, `left_at` — NULL, пока участник в диалоге; `last_delivered_seq`, `last_read_seq`, `conversations.last_seq` — `integer` с 0 по умолчанию.
- `conversations.last_message_at` — `NOT NULL`, по умолчанию `now()`: диалог создаётся вместе с первым сообщением, и сортировке списка не нужны NULL.
- Внешние ключи: `ON DELETE CASCADE` от проекта к посетителям, каналам и диалогам, от посетителя к его диалогам, от диалога к участникам, сообщениям и событиям; `SET NULL` у `visitors.merged_into_id`; `NO ACTION` у `conversations.channel_id` — не `RESTRICT`, иначе каскадное удаление проекта упало бы на проверке, которая идёт сразу, а не в конце команды.
- Без внешних ключей: `conversations.assignee_id`, `conversations.active_bot_id` (таблиц `operators` и `bots` ещё нет), а также `participants.participant_id`, `messages.sender_id`, `conversation_events.actor_id` — они ссылаются на разные таблицы по `kind`.

## 28.10.2026, связь с EPIC-13

Черновик EPIC-13 TASK-1 создаёт «минимальную» таблицу `visitors` в `apps/server/src/domain/visitors/` и ждёт, что остальные колонки добавит этот эпик. Таблица `visitors` целиком создаётся здесь (TASK-1, TASK-7). EPIC-13 TASK-1 при подготовке надо сократить до `visitor_sessions` со ссылкой на готовую сущность `Visitor`.
