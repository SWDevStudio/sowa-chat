# EPIC-19 / TASK-5. Сущность сообщения Message с уникальными индексами seq и clientMsgId

Исполнитель: haiku
Зависит от: TASK-3
Владеет: apps/server/src/domain/conversations/message.entity.ts, apps/server/src/domain/conversations/message.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `messages` по образцу `Conversation` (TASK-3).

`apps/server/src/domain/conversations/message.entity.ts`:

```ts
export type MessageSenderKind = "visitor" | "operator" | "bot" | "system";
export type MessageType = "text" | "media" | "system" | "custom";
```

Класс `Message`, `@Entity({ name: "messages" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name` в snake_case.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` |
| `conversation_id` | `uuid` | `conversationId: string` | `@Column({ name: "conversation_id", type: "uuid" })` |
| `seq` | `integer` | `seq: number` | `@Column({ type: "integer" })` |
| `sender_kind` | `text` | `senderKind: MessageSenderKind` | `@Column({ name: "sender_kind", type: "text" })` |
| `sender_id` | `uuid`, NULL | `senderId: string \| null` | `@Column({ name: "sender_id", type: "uuid", nullable: true })` |
| `type` | `text` | `type: MessageType` | `@Column({ type: "text" })` |
| `custom_type` | `text`, NULL | `customType: string \| null` | `@Column({ name: "custom_type", type: "text", nullable: true })` |
| `body` | `text`, NULL | `body: string \| null` | `@Column({ type: "text", nullable: true })` |
| `payload` | `jsonb`, NULL | `payload: JsonObject \| null` | `@Column({ type: "jsonb", nullable: true })` |
| `is_internal` | `boolean` | `isInternal: boolean` | `@Column({ name: "is_internal", type: "boolean", default: false })` |
| `client_msg_id` | `uuid`, NULL | `clientMsgId: string \| null` | `@Column({ name: "client_msg_id", type: "uuid", nullable: true })` |
| `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn({ name: "created_at", type: "timestamptz" })` |

Колонки без пометки NULL — `NOT NULL`. `JsonObject` — тип из `@sowa-chat/protocol` (`import type`).

- `sender_id` пуст у системных сообщений; это id посетителя, оператора или бота по `sender_kind`, поэтому внешнего ключа нет.
- `body` — текст сообщения, пуст у сообщений только с файлами или только с `custom`.
- `client_msg_id` пуст у системных сообщений: их создаёт сервер. Уникальный индекс не сравнивает NULL, поэтому системных сообщений в диалоге может быть сколько угодно.

Связь с диалогом, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратной стороны нет:

```ts
@ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "conversation_id" })
conversation?: Relation<Conversation>;
```

Уникальные индексы — декораторы на классе, поля по именам свойств:

```ts
@Index(["conversationId", "seq"], { unique: true })
@Index(["conversationId", "clientMsgId"], { unique: true })
```

## Где

- `apps/server/src/domain/conversations/message.entity.ts` — новый файл, `Conversation` из `./conversation.entity.js`.
- Тест: `apps/server/src/domain/conversations/message.entity.spec.ts` (vitest). Тест без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`.

## Требования из плана

- `messages`: `id (uuidv7), conversation_id, seq, sender_kind (visitor|operator|bot|system), sender_id, type (text|media|system|custom), custom_type?, body, payload jsonb, is_internal, client_msg_id, created_at`.
- Уникальные индексы `(conversation_id, seq)` и `(conversation_id, client_msg_id)` для порядка и защиты от дублей (боты тоже передают `clientMsgId`). `clientMsgId` в API — `z.uuid()`.
- Внутренние заметки в ленте диалога — `isInternal`, посетитель и боты их не получают.
- `payload` кастомного сообщения — сырые данные интегратора, тип `JsonObject`.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
- https://typeorm.io/docs/indexes/indices

## Критерии приёмки

- У `Message` ровно 12 колонок: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше; `nullable: true` ровно у `sender_id`, `custom_type`, `body`, `payload`, `client_msg_id`; `is_internal` с `default: false`.
- Связь `conversation` — `many-to-one` на `Conversation` с `onDelete: "CASCADE"` и join-колонкой `conversation_id`.
- У `Message` два уникальных индекса: по `["conversationId", "seq"]` и по `["conversationId", "clientMsgId"]`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграцию — это TASK-7.
- Не делать выдачу `seq` и защиту от дублей в коде — это эпик отправки сообщений.
- Не делать таблицу `attachments` — это эпик файлов.
- Не менять `conversation.entity.ts`.
- Не создавать `index.ts`.

## История доработок

—
