# EPIC-7 / TASK-2. Общая схема параметра limit для списков в protocol

Исполнитель: haiku
Зависит от: —
Владеет: packages/protocol/src/page-query.ts, packages/protocol/src/page-query.spec.ts, packages/protocol/src/index.ts
Ветка: feature/EPIC-7

## Что сделать

1. `packages/protocol/src/page-query.ts`:

   ```ts
   import { z } from "zod";

   export const pageQuerySchema = z.object({
     limit: z.coerce.number<number>().int().min(1).max(100).default(50),
   });

   export type PageQuery = z.infer<typeof pageQuerySchema>;
   ```

   `z.coerce` — потому что query приходит строками. `<number>` задаёт входной тип `number`: SDK, которые импортируют тип, передают число.

2. В `packages/protocol/src/index.ts` добавить реэкспорт:

   ```ts
   export { pageQuerySchema } from "./page-query.js";
   export type { PageQuery } from "./page-query.js";
   ```

Эндпоинты со списками в своих эпиках расширяют схему своими курсорами: `pageQuerySchema.extend({ ... })`.

## Где

- `packages/protocol/src/page-query.ts` — новый файл, `packages/protocol/src/index.ts`.
- Тест: `packages/protocol/src/page-query.spec.ts`, импорт из `./index.js` (как в `errors.spec.ts`). Запуск: `pnpm --filter @sowa-chat/protocol test`.

## Требования из плана

- Все списки отдаются страницами. `limit` — от 1 до 100, по умолчанию 50; значение вне диапазона даёт `400`, его отсекает схема запроса на Zod. Ограничение держит сервер: запрос с огромным `limit` можно отправить в обход SDK.
- Имена `pageQuerySchema` и `PageQuery` — решение в `decisions.md`.

## Документация

- https://zod.dev/api?id=coercion

## Критерии приёмки

- `pageQuerySchema.parse({})` даёт `{ limit: 50 }`; `{ limit: "20" }` даёт `{ limit: 20 }`; `"1"` и `"100"` проходят.
- `"0"`, `"101"`, `"abc"`, `"1.5"` не проходят (`safeParse(...).success === false`).
- `PageQuery["limit"]` — `number`; `z.input<typeof pageQuerySchema>["limit"]` — `number | undefined` (`expectTypeOf`).

## Чего не делать

- Не делать курсоры страниц — у каждого списка они свои.
- Не писать комментарии в файле.

## История доработок

—
