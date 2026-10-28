# EPIC-19 / TASK-4. Сущность участника диалога Participant

Исполнитель: haiku
Зависит от: TASK-3
Владеет: apps/server/src/domain/conversations/participant.entity.ts, apps/server/src/domain/conversations/participant.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `participants` по образцу `Conversation` (TASK-3).

`apps/server/src/domain/conversations/participant.entity.ts`:

```ts
export type ParticipantKind = "visitor" | "operator" | "bot";
```

Класс `Participant`, `@Entity({ name: "participants" })`. Отдельного `id` нет: первичный ключ составной — `conversation_id`, `kind`, `participant_id`, в этом порядке объявления свойств.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `conversation_id` | `uuid` | `conversationId: string` | `@PrimaryColumn({ name: "conversation_id", type: "uuid" })` |
| `kind` | `text` | `kind: ParticipantKind` | `@PrimaryColumn({ type: "text" })` |
| `participant_id` | `uuid` | `participantId: string` | `@PrimaryColumn({ name: "participant_id", type: "uuid" })` |
| `last_delivered_seq` | `integer` | `lastDeliveredSeq: number` | `@Column({ name: "last_delivered_seq", type: "integer", default: 0 })` |
| `last_read_seq` | `integer` | `lastReadSeq: number` | `@Column({ name: "last_read_seq", type: "integer", default: 0 })` |
| `joined_at` | `timestamptz` | `joinedAt: Date` | `@Column({ name: "joined_at", type: "timestamptz", default: () => "now()" })` |
| `left_at` | `timestamptz`, NULL | `leftAt: Date \| null` | `@Column({ name: "left_at", type: "timestamptz", nullable: true })` |

Колонки без пометки NULL — `NOT NULL`. `participant_id` — id посетителя, оператора или бота в зависимости от `kind`, поэтому внешнего ключа на него нет.

Связь с диалогом, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратной стороны нет:

```ts
@ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "conversation_id" })
conversation?: Relation<Conversation>;
```

## Где

- `apps/server/src/domain/conversations/participant.entity.ts` — новый файл, `Conversation` из `./conversation.entity.js`.
- Тест: `apps/server/src/domain/conversations/participant.entity.spec.ts` (vitest). Тест без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`.

## Требования из плана

- `participants`: `conversation_id, kind (visitor|operator|bot), participant_id, last_delivered_seq, last_read_seq, joined_at, left_at`.
- В БД имена в snake_case, в коде — camelCase; у полей из нескольких слов имя колонки задаётся явно.

## Документация

- https://typeorm.io/docs/entity/entities (раздел «Primary columns»)
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations

## Критерии приёмки

- У `Participant` ровно 7 колонок: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше; первичные (`mode: "regular"` с `options.primary: true`) — ровно `conversation_id`, `kind`, `participant_id`; `nullable: true` только у `left_at`.
- Связь `conversation` — `many-to-one` на `Conversation` с `onDelete: "CASCADE"` и join-колонкой `conversation_id`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграцию — это TASK-7.
- Не менять `conversation.entity.ts`.
- Не создавать `index.ts`.

## История доработок

—
