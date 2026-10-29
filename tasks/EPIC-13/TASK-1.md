# EPIC-13 / TASK-1. Таблица `visitor_sessions`: сущность и миграция

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/visitors/visitor-session.entity.ts, apps/server/src/domain/visitors/visitor-session.entity.spec.ts, apps/server/src/infra/database/migrations/1793300004000-CreateVisitorSessions.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/visitor-sessions-table.e2e-spec.ts
Коммит: [SERVER]: add visitor sessions table with entity and migration
Ветка: feature/EPIC-13

## Что сделать

Таблица `visitors` и сущность `Visitor` уже есть (EPIC-19: `apps/server/src/domain/visitors/visitor.entity.ts`, миграция `1793215389271-CreateChatTables.ts`). Здесь — только `visitor_sessions`. Образец сущности с явными именами ограничений — `apps/server/src/domain/operators/operator.entity.ts` и `visitor.entity.ts`, образец миграции — `apps/server/src/infra/database/migrations/1793300003000-CreateOperators.ts`, образец e2e-теста таблицы — `apps/server/test/operators-table.e2e-spec.ts`.

1. `visitor-session.entity.ts` — класс `VisitorSession`, `@Entity({ name: "visitor_sessions" })`:

   | Колонка | Тип | Свойство (тип TS) | NULL | Примечание |
   |---|---|---|---|---|
   | `id` | `uuid` | `id` (`string`) | нет | `@PrimaryColumn`, `default: () => "uuidv7()"`, `primaryKeyConstraintName: "PK_visitor_sessions"` |
   | `visitor_id` | `uuid` | `visitorId` (`string`) | нет | |
   | `family_id` | `uuid` | `familyId` (`string`) | нет | цепочка обновлений одной сессии, значение задаёт сервис |
   | `refresh_hash` | `bytea` | `refreshHash` (`Buffer`) | нет | SHA-256 refresh-токена |
   | `expires_at` | `timestamptz` | `expiresAt` (`Date`) | нет | |
   | `used_at` | `timestamptz` | `usedAt` (`Date \| null`) | да | когда токен обменяли на новый |
   | `revoked_at` | `timestamptz` | `revokedAt` (`Date \| null`) | да | когда цепочку отозвали |

   Связь: `@ManyToOne(() => Visitor, { nullable: false, onDelete: "CASCADE" })` и `@JoinColumn({ name: "visitor_id", foreignKeyConstraintName: "FK_visitor_sessions_visitor_id" })`, свойство `visitor?: Relation<Visitor>`. `Visitor` импортировать из `./visitor.entity.js`.

   На классе: `@Unique("UQ_visitor_sessions_refresh_hash", ["refreshHash"])`, `@Index("IDX_visitor_sessions_family_id", ["familyId"])`, `@Index("IDX_visitor_sessions_visitor_id", ["visitorId"])`. Колонок `created_at` и `updated_at` нет.

2. Миграция `1793300004000-CreateVisitorSessions.ts`, класс `CreateVisitorSessions1793300004000`, `name = "CreateVisitorSessions1793300004000"`. Пишется вручную, не генерируется. `up`:

   ```sql
   CREATE TABLE "visitor_sessions" (
       "id" uuid NOT NULL DEFAULT uuidv7(),
       "visitor_id" uuid NOT NULL,
       "family_id" uuid NOT NULL,
       "refresh_hash" bytea NOT NULL,
       "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
       "used_at" TIMESTAMP WITH TIME ZONE,
       "revoked_at" TIMESTAMP WITH TIME ZONE,
       CONSTRAINT "UQ_visitor_sessions_refresh_hash" UNIQUE ("refresh_hash"),
       CONSTRAINT "PK_visitor_sessions" PRIMARY KEY ("id")
   )
   ```

   затем отдельными запросами:

   ```sql
   CREATE INDEX "IDX_visitor_sessions_family_id" ON "visitor_sessions" ("family_id")
   CREATE INDEX "IDX_visitor_sessions_visitor_id" ON "visitor_sessions" ("visitor_id")
   ALTER TABLE "visitor_sessions" ADD CONSTRAINT "FK_visitor_sessions_visitor_id" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE
   ```

   `down` — `DROP TABLE "visitor_sessions"`.

3. `database-entities.ts`: добавить `VisitorSession` в конец списка `databaseEntities` (после `Operator`).

4. `database-migrations.ts`: добавить `CreateVisitorSessions1793300004000` в конец списка `databaseMigrations` (после `AddProjectsOperatorAllowedOrigins1793300003000`).

## Где

- `apps/server/src/domain/visitors/visitor-session.entity.ts` — новый файл.
- `apps/server/src/infra/database/migrations/1793300004000-CreateVisitorSessions.ts` — новый файл.
- `apps/server/src/database-entities.ts`, `apps/server/src/infra/database/database-migrations.ts` — общие списки.
- Тесты: `apps/server/src/domain/visitors/visitor-session.entity.spec.ts` (unit, по образцу `visitor.entity.spec.ts`: `getMetadataArgsStorage()`), `apps/server/test/visitor-sessions-table.e2e-spec.ts` (e2e, `useTestDatabase()`, по образцу `operators-table.e2e-spec.ts`; посетителя создавать вставкой в `visitors` с `project_id` проекта из `createProject`).

## Требования из плана

- `visitor_sessions`: `id, visitor_id, family_id, refresh_hash, expires_at, used_at?, revoked_at?`.
- Refresh-токены посетителей хранятся только хешем SHA-256.
- Имена колонок в snake_case через `name`, свойства в camelCase.
- Имена ограничений явные и одинаковые в сущности и миграции (как EPIC-8, 9, 12, 19).

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/migrations/creating

## Критерии приёмки

- Unit: метаданные `VisitorSession` — ровно колонки из таблицы с типами, `nullable` и именами в snake_case; связь `visitor` с `onDelete: "CASCADE"` и именем ключа `FK_visitor_sessions_visitor_id`; уникальное ограничение `UQ_visitor_sessions_refresh_hash`, индексы `IDX_visitor_sessions_family_id` и `IDX_visitor_sessions_visitor_id`.
- Unit: `CreateVisitorSessions1793300004000` стоит в `databaseMigrations` последней, `VisitorSession` есть в `databaseEntities`.
- E2e: после миграций в `visitor_sessions` ровно эти колонки с типами и `is_nullable`; есть ограничения `PK_visitor_sessions`, `UQ_visitor_sessions_refresh_hash`, `FK_visitor_sessions_visitor_id` (CASCADE) и оба индекса.
- E2e: удаление посетителя удаляет его сессии; вторая строка с тем же `refresh_hash` падает с кодом `23505`.

## Чего не делать

- Не создавать и не менять `visitors` и `Visitor` — это EPIC-19.
- Не делать репозитории и сервис сессий — это TASK-5.
- Не создавать `index.ts` в папке: barrel-файлы в `apps/server` не используем.

## История доработок

—
