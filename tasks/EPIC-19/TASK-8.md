# EPIC-19 / TASK-8. Ручная миграция индексов диалогов: GIN по context и список диалогов

Исполнитель: haiku
Зависит от: TASK-7
Владеет: apps/server/src/infra/database/migrations/, apps/server/src/infra/database/database-migrations.ts, apps/server/test/conversation-indexes.e2e-spec.ts
Ветка: feature/EPIC-19

## Что сделать

Два индекса `conversations`, которые TypeORM не умеет описать в сущности: класс операторов `jsonb_path_ops` и порядок `DESC`. Сущность `Conversation` уже объявляет их с `synchronize: false` (TASK-3), поэтому `migration:generate` их не создаёт и не удаляет. Имена индексов должны совпасть с объявлением буква в букву.

1. `pnpm --filter @sowa-chat/server migration:create src/infra/database/migrations/AddConversationIndexes`.
2. В созданном классе:

   ```ts
   public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.query(
       `CREATE INDEX "IDX_conversations_context" ON "conversations" USING GIN ("context" jsonb_path_ops)`,
     );
     await queryRunner.query(
       `CREATE INDEX "IDX_conversations_project_status_last_message_at" ON "conversations" ("project_id", "status", "last_message_at" DESC)`,
     );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.query(`DROP INDEX "IDX_conversations_project_status_last_message_at"`);
     await queryRunner.query(`DROP INDEX "IDX_conversations_context"`);
   }
   ```

   Без `CONCURRENTLY` и без `transaction = false`: таблица создана предыдущей миграцией и пуста, блокировка при создании индекса ничему не мешает.
3. `pnpm exec prettier --write <файл>`, замечания `oxlint`.
4. Добавить класс в `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`) после `CreateChatTables…`.

## Где

- `apps/server/src/infra/database/migrations/` — новая миграция, `apps/server/src/infra/database/database-migrations.ts`.
- Тест: `apps/server/test/conversation-indexes.e2e-spec.ts` (`pnpm --filter @sowa-chat/server test:e2e -- test/conversation-indexes.e2e-spec.ts`, нужен Docker). База и очистка — `useTestDatabase()`, проект — `createProject()`. План запроса тест берёт так: в транзакции `SET LOCAL enable_seqscan = off`, затем `EXPLAIN` запроса; без этого на пустой таблице PostgreSQL выбирает последовательный просмотр.

## Требования из плана

- Индекс `conversations (project_id, status, last_message_at DESC)` для списка диалогов, GIN (`jsonb_path_ops`) на `context` для фильтров.
- GIN-индексы и `CREATE INDEX CONCURRENTLY` пишем руками.

## Документация

- https://www.postgresql.org/docs/18/gin.html#GIN-BUILTIN-OPCLASSES
- https://www.postgresql.org/docs/18/datatype-json.html#JSON-INDEXING
- https://typeorm.io/docs/migrations/creating

## Критерии приёмки

- `pg_indexes` у `conversations` содержит `IDX_conversations_context` с `USING gin (context jsonb_path_ops)` и `IDX_conversations_project_status_last_message_at` с `(project_id, status, last_message_at DESC)`.
- `EXPLAIN SELECT id FROM conversations WHERE context @> '{"orderId":"A-123"}'` при `enable_seqscan = off` использует `IDX_conversations_context`.
- `EXPLAIN SELECT id FROM conversations WHERE project_id = $1 AND status = 'queued' ORDER BY last_message_at DESC LIMIT 20` при `enable_seqscan = off` использует `IDX_conversations_project_status_last_message_at`.
- Ручная проверка: после `start:migrate` повторный `migration:generate` сообщает, что изменений в схеме нет.

## Чего не делать

- Не менять сгенерированную миграцию TASK-7 и сущности.
- Не делать фильтр по `context` в репозитории — это эпик списка диалогов оператора.
- Не добавлять другие индексы.

## История доработок

—
