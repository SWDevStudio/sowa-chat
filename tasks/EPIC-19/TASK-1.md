# EPIC-19 / TASK-1. Сущность посетителя Visitor

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/visitors/visitor.entity.ts, apps/server/src/domain/visitors/visitor.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `visitors` по образцу `Project` (`apps/server/src/domain/projects/project.entity.ts`). Папки `apps/server/src/domain/visitors/` ещё нет — создать.

`apps/server/src/domain/visitors/visitor.entity.ts` — класс `Visitor`, `@Entity({ name: "visitors" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name` в snake_case.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` |
| `project_id` | `uuid` | `projectId: string` | `@Column({ name: "project_id", type: "uuid" })` |
| `display_code` | `integer`, NULL | `displayCode: number \| null` | `@Column({ name: "display_code", type: "integer", nullable: true })` |
| `external_id` | `text`, NULL | `externalId: string \| null` | `@Column({ name: "external_id", type: "text", nullable: true })` |
| `name` | `text`, NULL | `name: string \| null` | `@Column({ type: "text", nullable: true })` |
| `email` | `text`, NULL | `email: string \| null` | `@Column({ type: "text", nullable: true })` |
| `phone` | `text`, NULL | `phone: string \| null` | `@Column({ type: "text", nullable: true })` |
| `data` | `jsonb` | `data: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })` |
| `tech` | `jsonb` | `tech: JsonObject` | `@Column({ type: "jsonb", default: () => "'{}'" })` |
| `merged_into_id` | `uuid`, NULL | `mergedIntoId: string \| null` | `@Column({ name: "merged_into_id", type: "uuid", nullable: true })` |
| `first_seen_at` | `timestamptz` | `firstSeenAt: Date` | `@Column({ name: "first_seen_at", type: "timestamptz", default: () => "now()" })` |
| `last_seen_at` | `timestamptz` | `lastSeenAt: Date` | `@Column({ name: "last_seen_at", type: "timestamptz", default: () => "now()" })` |

Колонки без пометки NULL — `NOT NULL`. `JsonObject` — тип из `@sowa-chat/protocol` (`import type`).

Связи — свойства рядом с колонкой внешнего ключа, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратных сторон нет:

```ts
@ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "project_id" })
project?: Relation<Project>;

@ManyToOne(() => Visitor, { nullable: true, onDelete: "SET NULL" })
@JoinColumn({ name: "merged_into_id" })
mergedInto?: Relation<Visitor> | null;
```

Уникальные индексы — декораторы на классе, поля по именам свойств:

```ts
@Index(["projectId", "displayCode"], { unique: true })
@Index(["projectId", "externalId"], { unique: true })
```

## Где

- `apps/server/src/domain/visitors/visitor.entity.ts` — новый файл. Образец — `apps/server/src/domain/projects/project.entity.ts`.
- Тест: `apps/server/src/domain/visitors/visitor.entity.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`). Тест без базы: читает метаданные декораторов через `getMetadataArgsStorage()` из `typeorm` (`filterColumns`, `filterRelations`, `filterJoinColumns`, `filterIndices`).

## Требования из плана

- `visitors`: `id, project_id, display_code, external_id?, name?, email?, phone?, data jsonb, tech jsonb, merged_into_id?, first_seen_at, last_seen_at`.
- Уникальные индексы `(project_id, display_code)` и `(project_id, external_id)`. Несколько анонимов без `external_id` в одном проекте допустимы: PostgreSQL не сравнивает NULL в уникальном индексе.
- `identify(jwt)` помечает анонимную запись как склеенную через `merged_into_id`.
- В БД имена в snake_case, в коде — camelCase; у полей из нескольких слов имя колонки задаётся явно. Только Data Mapper, без Active Record.
- `data` (это `visitorData`) и `tech` — сырые данные без схем на сервере, тип `JsonObject`.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
- https://typeorm.io/docs/indexes/indices

## Критерии приёмки

- У `Visitor` ровно 12 колонок: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше; `nullable: true` ровно у `display_code`, `external_id`, `name`, `email`, `phone`, `merged_into_id`.
- Связь `project` — `many-to-one` на `Project` с `onDelete: "CASCADE"` и join-колонкой `project_id`; связь `mergedInto` — `many-to-one` на `Visitor` с `onDelete: "SET NULL"` и join-колонкой `merged_into_id`.
- У `Visitor` два уникальных индекса: по `["projectId", "displayCode"]` и по `["projectId", "externalId"]`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграцию — это TASK-7.
- Не делать репозиторий, модуль и выдачу номера гостя — это эпики изоляции проектов и данных посетителя.
- Не делать `visitor_sessions` — это эпик сессии посетителя.
- Не добавлять обратные связи (`@OneToMany`) в `Project`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
