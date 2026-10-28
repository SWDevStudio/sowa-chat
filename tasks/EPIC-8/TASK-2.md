# EPIC-8 / TASK-2. Сущность и миграция audit_log

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/audit/actor-kind.ts, apps/server/src/domain/audit/audit-log-entry.entity.ts, apps/server/src/domain/audit/audit-log.repository.ts, apps/server/src/database-entities.ts, apps/server/src/infra/database/migrations/1793200000000-CreateAuditLog.ts, apps/server/src/infra/database/database-migrations.ts, apps/server/test/audit-log-table.e2e-spec.ts
Ветка: feature/EPIC-8

## Что сделать

Сущность журнала аудита, репозиторий через `TransactionHost` и миграция. Образцы: `apps/server/src/domain/projects/project.entity.ts`, `projects.repository.ts`, `apps/server/src/infra/database/migrations/1793193549883-CreateProjects.ts`. Папки `apps/server/src/domain/audit/` ещё нет — создать.

1. `actor-kind.ts`:

   ```ts
   export const actorKinds = ["system", "cli", "server", "operator", "bot", "visitor"] as const;
   export type ActorKind = (typeof actorKinds)[number];
   ```

2. `audit-log-entry.entity.ts` — класс `AuditLogEntry`, `@Entity({ name: "audit_log" })`:

   | Колонка | Тип | Свойство | Декоратор и свойства |
   |---|---|---|---|
   | `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()", primaryKeyConstraintName: "PK_audit_log" })` |
   | `project_id` | `uuid`, может быть `NULL` | `projectId: string \| null` | `@Column({ name: "project_id", type: "uuid", nullable: true })` |
   | `actor_kind` | `text` | `actorKind: ActorKind` | `@Column({ name: "actor_kind", type: "text" })` |
   | `actor_id` | `text`, может быть `NULL` | `actorId: string \| null` | `@Column({ name: "actor_id", type: "text", nullable: true })` |
   | `action` | `text` | `action: string` | `@Column({ type: "text" })` |
   | `target_kind` | `text` | `targetKind: string` | `@Column({ name: "target_kind", type: "text" })` |
   | `target_id` | `text`, может быть `NULL` | `targetId: string \| null` | `@Column({ name: "target_id", type: "text", nullable: true })` |
   | `data` | `jsonb` | `data: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })`, `JsonObject` из `@sowa-chat/protocol` |
   | `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn({ name: "created_at", type: "timestamptz" })` |

   Ещё на сущности:
   - связь с проектом: `@ManyToOne(() => Project, { nullable: true, onDelete: "CASCADE" })` и `@JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_audit_log_project_id" })` на свойстве `project?: Project | null`; `Project` — из `../projects/project.entity.js`;
   - индекс `@Index("IDX_audit_log_project_id_created_at", ["projectId", "createdAt"])` на классе;
   - ограничение `@Check("CHK_audit_log_actor_kind", "\"actor_kind\" IN ('system', 'cli', 'server', 'operator', 'bot', 'visitor')")` на классе.

   `project_id` пустой у событий уровня установки, у которых нет проекта.

3. `audit-log.repository.ts` — по образцу `ProjectsRepository`:

   ```ts
   export interface NewAuditLogEntry {
     projectId: string | null;
     actorKind: ActorKind;
     actorId: string | null;
     action: string;
     targetKind: string;
     targetId: string | null;
     data?: JsonObject;
   }

   @Injectable()
   export class AuditLogRepository {
     constructor(
       @Inject(TransactionHost)
       private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
     ) {}

     async create(entry: NewAuditLogEntry): Promise<AuditLogEntry> {
       const repository = this.txHost.tx.getRepository(AuditLogEntry);
       return repository.save(repository.create(entry));
     }
   }
   ```

   Модуль для репозитория не создавать: его подключает `AuditModule` в TASK-3.

4. Миграция `apps/server/src/infra/database/migrations/1793200000000-CreateAuditLog.ts`, класс `CreateAuditLog1793200000000`, `name = "CreateAuditLog1793200000000"`. Пишется вручную по образцу `CreateProjects`:
   - `up`: `CREATE TABLE "audit_log"` с колонками из таблицы выше (`id` — `DEFAULT uuidv7()`, `data` — `NOT NULL DEFAULT '{}'`, `created_at` — `TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, колонки без «может быть `NULL`» — `NOT NULL`), `CONSTRAINT "CHK_audit_log_actor_kind" CHECK ("actor_kind" IN ('system', 'cli', 'server', 'operator', 'bot', 'visitor'))`, `CONSTRAINT "PK_audit_log" PRIMARY KEY ("id")`; затем `CREATE INDEX "IDX_audit_log_project_id_created_at" ON "audit_log" ("project_id", "created_at")`; затем `ALTER TABLE "audit_log" ADD CONSTRAINT "FK_audit_log_project_id" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE`;
   - `down`: `DROP TABLE "audit_log"`.

5. Добавить `CreateAuditLog1793200000000` в конец списка `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`) и `AuditLogEntry` в конец `databaseEntities` (`apps/server/src/database-entities.ts`).

6. E2e-тест `apps/server/test/audit-log-table.e2e-spec.ts`. Таблицу создаёт глобальная подготовка e2e миграциями. Очистка и подключение — `useTestDatabase()` из `apps/server/test/support/test-database.ts`, проект — `createProject(dataSource)` из `apps/server/test/support/fixtures.ts`. Репозиторий проверяется в модуле `Test.createTestingModule({ imports: [WorkerModule], providers: [AuditLogRepository] })`, как в `apps/server/test/transactions.e2e-spec.ts`.

## Где

- `apps/server/src/domain/audit/actor-kind.ts`, `audit-log-entry.entity.ts`, `audit-log.repository.ts` — новые файлы.
- `apps/server/src/infra/database/migrations/1793200000000-CreateAuditLog.ts` — новый файл.
- `apps/server/src/infra/database/database-migrations.ts`, `apps/server/src/database-entities.ts` — по одной строке.
- Тест: `apps/server/test/audit-log-table.e2e-spec.ts`. Запуск: `pnpm --filter @sowa-chat/server test:e2e -- audit-log-table`, нужен Docker. `check-task` e2e не запускает, тестировщик запускает его сам. Список миграций сверяет уже готовый `database-migrations.spec.ts`.

## Требования из плана

- `audit_log`: `id, project_id, actor_kind, actor_id, action, target_kind, target_id, data jsonb (без персональных данных), created_at`.
- События уровня проекта (ключи, удаления, блокировки) пишутся в `audit_log`.
- Записи журнала хранятся `SOWA_RETENTION_AUDIT_DAYS` (по умолчанию 365); удаление по сроку — эпик сроков хранения.
- Имена колонок в snake_case задаются через `name`. `id` — `uuidv7()`.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations

## Критерии приёмки

- После миграций в `information_schema.columns` у `audit_log` ровно колонки из таблицы, с этими типами и `is_nullable`; в `pg_indexes` есть `IDX_audit_log_project_id_created_at`.
- `AuditLogRepository.create` без `data` и с `projectId: null` сохраняет запись: `data` равно `{}`, `id` — UUID версии 7, `createdAt` — `Date`.
- Запись с `actorKind` не из `actorKinds` (через `dataSource.query` с SQL `INSERT`) отклоняется с кодом `23514`; запись с `projectId` несуществующего проекта — с кодом `23503`.
- Удаление проекта удаляет его записи журнала.

## Чего не делать

- Не писать подписчика и `AuditModule` — это TASK-3.
- Не генерировать миграцию через `migration:generate`: имена ограничений и индекса заданы выше.
- Не менять `Project` и другие миграции.

## История доработок

—
