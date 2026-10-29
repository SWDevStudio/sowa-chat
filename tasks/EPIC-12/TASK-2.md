# EPIC-12 / TASK-2. Роли оператора и схемы выдачи токена оператора в protocol

Исполнитель: haiku
Зависит от: —
Владеет: packages/protocol/src/operator-role.ts, packages/protocol/src/operator-token.ts, packages/protocol/src/operator-token.spec.ts, packages/protocol/src/index.ts
Коммит: [PROTOCOL]: add operator roles and operator token schemas
Ветка: feature/EPIC-12

## Что сделать

Публичный контракт `POST /v1/server/operator-token` и список ролей оператора. Схемами пользуются сервер (TASK-8, TASK-9, TASK-10), позже `server-sdk` и SDK оператора. Имена выбраны в `decisions.md` эпика. Образец стиля — `packages/protocol/src/page-query.ts` и `packages/protocol/src/page-query.spec.ts`.

1. `operator-role.ts`:

   ```ts
   export const operatorRoles = ["operator", "supervisor"] as const;
   export type OperatorRole = (typeof operatorRoles)[number];
   ```

2. `operator-token.ts`:

   ```ts
   import { z } from "zod";
   import { operatorRoles } from "./operator-role.js";

   export const operatorTokenRequestSchema = z.object({
     externalId: z.string().trim().min(1).max(255),
     name: z.string().trim().min(1).max(255),
     avatarUrl: z.url({ protocol: /^https?$/ }).max(2048).optional(),
     role: z.enum(operatorRoles),
   });

   export type OperatorTokenRequest = z.infer<typeof operatorTokenRequestSchema>;

   export const operatorTokenResponseSchema = z.object({
     token: z.string(),
     expiresAt: z.iso.datetime(),
   });

   export type OperatorTokenResponse = z.infer<typeof operatorTokenResponseSchema>;
   ```

   Неизвестные поля тела отбрасываются (поведение `z.object` по умолчанию), не ошибка.

3. `index.ts`: добавить реэкспорты в том же стиле, что остальные строки:

   ```ts
   export { operatorRoles } from "./operator-role.js";
   export type { OperatorRole } from "./operator-role.js";
   export { operatorTokenRequestSchema, operatorTokenResponseSchema } from "./operator-token.js";
   export type { OperatorTokenRequest, OperatorTokenResponse } from "./operator-token.js";
   ```

## Где

- `packages/protocol/src/operator-role.ts`, `packages/protocol/src/operator-token.ts` — новые файлы.
- `packages/protocol/src/index.ts`.
- Тест: `packages/protocol/src/operator-token.spec.ts` (vitest, `pnpm --filter @sowa-chat/protocol test`), импорт из `./index.js`, как в `page-query.spec.ts`.

## Требования из плана

- `POST /v1/server/operator-token` — serverKey → токен оператора.
- Роли (`operator`, `supervisor`) передаёт бекенд админки, мы их не придумываем.
- `operators`: `external_id, name, avatar_url, role (operator|supervisor)`.
- Токен оператора: JWT на 15 минут.
- `protocol` — zod-схемы, типы, общие интерфейсы SDK; camelCase в JSON API.

## Документация

- https://zod.dev/api#urls
- https://zod.dev/api#iso-datetimes

## Критерии приёмки

- `{ externalId: "u-1", name: "Анна", role: "operator" }` и то же с `avatarUrl: "https://example.com/a.png"` и `role: "supervisor"` проходят `operatorTokenRequestSchema`; пробелы по краям `externalId` и `name` обрезаются; лишнее поле исчезает из результата.
- Не проходят: `role: "admin"`, нет `role`, пустой или из пробелов `externalId` и `name`, `externalId` длиннее 255 символов, `avatarUrl: "ftp://example.com/a.png"` и `avatarUrl: "not a url"`.
- `operatorTokenResponseSchema` принимает `{ token: "x", expiresAt: "2026-10-29T12:15:00.000Z" }` и отклоняет `expiresAt: "tomorrow"`.
- `operatorRoles` — `["operator", "supervisor"]`; `expectTypeOf<OperatorTokenRequest["role"]>()` равен `OperatorRole`.

## Чего не делать

- Не добавлять `maxChats` и другие поля оператора в запрос: их нет в контракте этого эпика.
- Не трогать сервер — схемы подключают TASK-5, TASK-6, TASK-9.

## История доработок

—
