# EPIC-19 / TASK-2. Сущность канала Channel

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/channels/channel.entity.ts, apps/server/src/domain/channels/channel.entity.spec.ts
Ветка: feature/EPIC-19

## Что сделать

Сущность таблицы `channels` по образцу `Project` (`apps/server/src/domain/projects/project.entity.ts`). Папки `apps/server/src/domain/channels/` ещё нет — создать.

`apps/server/src/domain/channels/channel.entity.ts` — класс `Channel`, `@Entity({ name: "channels" })`. У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name` в snake_case.

| Колонка | Тип | Свойство и тип в коде | Декоратор |
|---|---|---|---|
| `id` | `uuid` | `id: string` | `@PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })` |
| `project_id` | `uuid` | `projectId: string` | `@Column({ name: "project_id", type: "uuid" })` |
| `kind` | `text` | `kind: string` | `@Column({ type: "text" })` |
| `is_active` | `boolean` | `isActive: boolean` | `@Column({ name: "is_active", type: "boolean", default: true })` |

Все колонки `NOT NULL`. `kind` — строка, а не union: сейчас канал только `web`, но архитектура каналов (EPIC-21) подключает новый адаптер без правок домена.

Связь с проектом, тип обёрнут в `Relation<...>` из `typeorm` (`import type`), обратной стороны нет:

```ts
@ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
@JoinColumn({ name: "project_id" })
project?: Relation<Project>;
```

## Где

- `apps/server/src/domain/channels/channel.entity.ts` — новый файл. Образец — `apps/server/src/domain/projects/project.entity.ts`.
- Тест: `apps/server/src/domain/channels/channel.entity.spec.ts` (vitest). Тест без базы: метаданные декораторов через `getMetadataArgsStorage()` из `typeorm`.

## Требования из плана

- `channels`: `id, project_id, kind (только web), is_active`.
- В БД имена в snake_case, в коде — camelCase; у полей из нескольких слов имя колонки задаётся явно. Только Data Mapper.

## Документация

- https://typeorm.io/docs/entity/entities
- https://typeorm.io/docs/relations/many-to-one-one-to-many-relations

## Критерии приёмки

- У `Channel` ровно 4 колонки: имена в базе (`options.name ?? propertyName`) и `options.type` совпадают с таблицей выше, `is_active` с `default: true`, ни одна не `nullable`.
- Связь `project` — `many-to-one` на `Project` с `onDelete: "CASCADE"` и join-колонкой `project_id`.

## Чего не делать

- Не добавлять сущность в `apps/server/src/database-entities.ts` и не делать миграцию — это TASK-7.
- Не делать адаптеры каналов и создание веб-канала с проектом — это эпик каналов.
- Не создавать `index.ts`.

## История доработок

—
