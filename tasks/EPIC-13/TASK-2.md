# EPIC-13 / TASK-2. Схемы сессии посетителя в `protocol`

Исполнитель: haiku
Зависит от: —
Владеет: packages/protocol/src/visitor-session.ts, packages/protocol/src/visitor-session.spec.ts, packages/protocol/src/index.ts
Коммит: [PROTOCOL]: add visitor session request and response schemas
Ветка: feature/EPIC-13

## Что сделать

Схемы тел `POST /v1/visitor/session` и `POST /v1/visitor/session/refresh` — публичный контракт: их используют сервер (TASK-5, TASK-7) и SDK посетителя. Образец — `packages/protocol/src/operator-token.ts` и его тест `operator-token.spec.ts`.

1. `packages/protocol/src/visitor-session.ts`:

   ```ts
   import { z } from "zod";

   export const visitorSessionRequestSchema = z.object({
     publicKey: z.string().min(1).max(128),
   });

   export type VisitorSessionRequest = z.infer<typeof visitorSessionRequestSchema>;

   export const visitorSessionRefreshRequestSchema = z.object({
     refreshToken: z.string().min(1).max(128),
   });

   export type VisitorSessionRefreshRequest = z.infer<typeof visitorSessionRefreshRequestSchema>;

   export const visitorSessionResponseSchema = z.object({
     accessToken: z.string(),
     accessTokenExpiresAt: z.iso.datetime(),
     refreshToken: z.string(),
   });

   export type VisitorSessionResponse = z.infer<typeof visitorSessionResponseSchema>;
   ```

   `publicKey` и `refreshToken` не обрезаются (`trim` нет): ключ и токен сравниваются точно. Формат `pk_` схема не проверяет — это делает сервер (`parseKey`), чтобы правило формата ключей было в одном месте. Неизвестные поля отбрасываются (поведение `z.object` по умолчанию).

2. `packages/protocol/src/index.ts`: добавить в конец

   ```ts
   export {
     visitorSessionRefreshRequestSchema,
     visitorSessionRequestSchema,
     visitorSessionResponseSchema,
   } from "./visitor-session.js";
   export type {
     VisitorSessionRefreshRequest,
     VisitorSessionRequest,
     VisitorSessionResponse,
   } from "./visitor-session.js";
   ```

## Где

- `packages/protocol/src/visitor-session.ts` — новый файл.
- `packages/protocol/src/index.ts` — экспорты.
- Тест: `packages/protocol/src/visitor-session.spec.ts` (vitest, импорт из `./index.js`, как `operator-token.spec.ts`; `pnpm --filter @sowa-chat/protocol test`).

## Требования из плана

- `POST /v1/visitor/session`: `publicKey` → токен посетителя.
- Токены посетителя: access-токен (JWT, 1 час) и одноразовый refresh-токен.
- camelCase в JSON API; даты в ответах — строки ISO 8601, как `expiresAt` в `operatorTokenResponseSchema`.

## Документация

- https://zod.dev/api#iso-datetimes

## Критерии приёмки

- `visitorSessionRequestSchema` принимает `{ publicKey: "pk_…" }`, отбрасывает неизвестные поля и не принимает отсутствующий, пустой, не строковый `publicKey` и строку длиннее 128 символов; пробелы вокруг ключа не обрезаются.
- `visitorSessionRefreshRequestSchema` — те же проверки для `refreshToken`.
- `visitorSessionResponseSchema` принимает `{ accessToken, accessTokenExpiresAt: new Date().toISOString(), refreshToken }` и не принимает `accessTokenExpiresAt` не в ISO 8601 (например `"tomorrow"`) и ответ без любого из трёх полей.
- Схемы и типы доступны из точки входа `@sowa-chat/protocol` (`expectTypeOf` для трёх типов).

## Чего не делать

- Не проверять в схеме формат `pk_` и контрольную сумму.
- Не трогать другие схемы `protocol`.

## История доработок

—
