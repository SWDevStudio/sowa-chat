# EPIC-19 / TASK-6. Сущность истории действий в диалоге ConversationEvent

Исполнитель: haiku
Зависит от: TASK-3
Владеет: apps/server/src/domain/conversations/conversation-event.entity.ts, apps/server/src/domain/conversations/conversation-event.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `conversation_events` по образцу `Conversation` (TASK-3).

`apps/server/src/domain/conversations/conversation-event.entity.ts`:

```ts
export type ConversationEventActorKind = "visitor" | "operator" | "bot" | "system";
```

Класс `ConversationEvent`, `@Entity({ name: "conversation_events" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name` в snake_case.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` |
| `conversation_id` | `uuid` | `conversationId: string` | `@Column({ name: "conversation_id", type: "uuid" })` |
| `type` | `text` | `type: string` | `@Column({ type: "text" })` |
| `actor_kind` | `text` | `actorKind: ConversationEventActorKind` | `@Column({ name: "actor_kind", type: "text" })` |
| `actor_id` | `uuid`, NULL | `actorId: string \| null` | `@Column({ name: "actor_id", type: "uuid", nullable: true })` |
| `data` | `jsonb` | `data: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })` |
| `created_at` | `timestamptz` | `createdAt: Date` | `@CreateDateColumn({ name: "created_at", type: "timestamptz" })` |

Колонки без пометки NULL — `NOT NULL`. `JsonObject` — тип из `@sowa-chat/protocol` (`import type`). `type` — строка: список событий задаёт эпик работы оператора с диалогом. `actor_id` пуст у действий системы (автозакрытие).

Связь с диалогом, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратной стороны нет:

```ts
@ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "conversation_id" })
conversation?: Relation<Conversation>;
```

## Где

- `apps/server/src/domain/conversations/conversation-event.entity.ts` — новый файл, `Conversation` из `./conversation.entity.js`.
- Тест: `apps/server/src/domain/conversations/conversation-event.entity.spec.ts` (vitest). Тест без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`.

## Требования из плана

- `conversation_events`: `id, conversation_id, type, actor_kind, actor_id, data jsonb, created_at`.
- `conversation_events` — история действий внутри диалога: кто взял, передал, закрыл диалог, какой бот его вёл. Удаляется вместе с диалогом.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations

## Критерии приёмки

- У `ConversationEvent` ровно 7 колонок: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше; `nullable: true` только у `actor_id`.
- Связь `conversation` — `many-to-one` на `Conversation` с `onDelete: "CASCADE"` и join-колонкой `conversation_id`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграцию — это TASK-7.
- Не задавать список типов событий.
- Не менять `conversation.entity.ts`.
- Не создавать `index.ts`.

## История доработок

—
