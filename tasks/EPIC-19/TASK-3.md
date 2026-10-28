# EPIC-19 / TASK-3. Сущность диалога Conversation

Исполнитель: haiku
Зависит от: TASK-1, TASK-2
Владеет: apps/server/src/domain/conversations/conversation.entity.ts, apps/server/src/domain/conversations/conversation.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `conversations` по образцу `Project` (`apps/server/src/domain/projects/project.entity.ts`) и `Visitor` (TASK-1). Папки `apps/server/src/domain/conversations/` ещё нет — создать.

`apps/server/src/domain/conversations/conversation.entity.ts`:

```ts
export type ConversationStatus = "bot" | "queued" | "assigned" | "resolved";
export type ConversationCloseReason = "operator" | "inactivity" | "bot";
```

Класс `Conversation`, `@Entity({ name: "conversations" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name` в snake_case.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` |
| `project_id` | `uuid` | `projectId: string` | `@Column({ name: "project_id", type: "uuid" })` |
| `visitor_id` | `uuid` | `visitorId: string` | `@Column({ name: "visitor_id", type: "uuid" })` |
| `channel_id` | `uuid` | `channelId: string` | `@Column({ name: "channel_id", type: "uuid" })` |
| `status` | `text` | `status: ConversationStatus` | `@Column({ type: "text" })` |
| `assignee_id` | `uuid`, NULL | `assigneeId: string \| null` | `@Column({ name: "assignee_id", type: "uuid", nullable: true })` |
| `active_bot_id` | `uuid`, NULL | `activeBotId: string \| null` | `@Column({ name: "active_bot_id", type: "uuid", nullable: true })` |
| `context` | `jsonb` | `context: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })` |
| `handoff` | `jsonb`, NULL | `handoff: JsonObject \| null` | `@Column({ type: "jsonb", nullable: true })` |
| `last_seq` | `integer` | `lastSeq: number` | `@Column({ name: "last_seq", type: "integer", default: 0 })` |
| `last_message_at` | `timestamptz` | `lastMessageAt: Date` | `@Column({ name: "last_message_at", type: "timestamptz", default: () => "now()" })` |
| `routing_cycle` | `jsonb`, NULL | `routingCycle: JsonObject \| null` | `@Column({ name: "routing_cycle", type: "jsonb", nullable: true })` |
| `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn({ name: "created_at", type: "timestamptz" })` |
| `closed_at` | `timestamptz`, NULL | `closedAt: Date \| null` | `@Column({ name: "closed_at", type: "timestamptz", nullable: true })` |
| `close_reason` | `text`, NULL | `closeReason: ConversationCloseReason \| null` | `@Column({ name: "close_reason", type: "text", nullable: true })` |

Колонки без пометки NULL — `NOT NULL`. `JsonObject` — тип из `@sowa-chat/protocol` (`import type`).

Связи, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратных сторон нет:

```ts
@ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "project_id" })
project?: Relation<Project>;

@ManyToOne(() => Visitor, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "visitor_id" })
visitor?: Relation<Visitor>;

@ManyToOne(() => Channel, { nullable: false })
@JoinColumn({ name: "channel_id" })
channel?: Relation<Channel>;
```

У `channel` нет `onDelete`: в базе это `NO ACTION`, канал с диалогами удалить нельзя, а при удалении проекта каскад удаляет и каналы, и диалоги одной командой. `assignee_id` и `active_bot_id` — без связей: таблиц `operators` и `bots` в этом эпике ещё нет.

Два индекса, которые TypeORM описать не умеет, — объявить на классе с `synchronize: false`. Их создаёт ручная миграция TASK-8, а объявление нужно, чтобы `migration:generate` не предлагал удалить их как лишние:

```ts
@Index("IDX_conversations_context", { synchronize: false })
@Index("IDX_conversations_project_status_last_message_at", { synchronize: false })
```

## Где

- `apps/server/src/domain/conversations/conversation.entity.ts` — новый файл. Импорт `Visitor` из `../visitors/visitor.entity.js`, `Channel` из `../channels/channel.entity.js`, `Project` из `../projects/project.entity.js`.
- Тест: `apps/server/src/domain/conversations/conversation.entity.spec.ts` (vitest). Тест без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`.

## Требования из плана

- `conversations`: `id, project_id, visitor_id, channel_id, status (bot|queued|assigned|resolved), assignee_id?, active_bot_id?, context jsonb, handoff jsonb (причина, summary), last_seq, last_message_at, routing_cycle jsonb (начало цикла, боты цикла, число смен), created_at, closed_at?, close_reason? (operator|inactivity|bot)`.
- `seq` выдаётся через `UPDATE conversations SET last_seq = last_seq + 1 … RETURNING` — поэтому `last_seq` начинается с 0.
- Индекс `conversations (project_id, status, last_message_at DESC)` для списка диалогов, GIN (`jsonb_path_ops`) на `context` для фильтров. GIN-индексы пишутся руками.
- camelCase в значениях enum: `inactivity`, `assigned` и т. д. `context` — сырые данные интегратора, тип `JsonObject`.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
- https://typeorm.io/docs/indexes/indices (раздел «Disabling synchronization»)

## Критерии приёмки

- У `Conversation` ровно 15 колонок: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше; `nullable: true` ровно у `assignee_id`, `active_bot_id`, `handoff`, `routing_cycle`, `closed_at`, `close_reason`.
- Связи `project` и `visitor` — `many-to-one` с `onDelete: "CASCADE"`, `channel` — `many-to-one` без `onDelete`; join-колонки `project_id`, `visitor_id`, `channel_id`.
- На классе два индекса с `synchronize: false` и именами `IDX_conversations_context` и `IDX_conversations_project_status_last_message_at`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграции — это TASK-7 и TASK-8.
- Не делать участников, сообщения и историю — это TASK-4, TASK-5, TASK-6.
- Не описывать форму `handoff` и `routing_cycle` своими типами: их наполняют эпики ботов.
- Не добавлять связи на `operators` и `bots`.
- Не создавать `index.ts`.

## История доработок

—
