# EPIC-13 / TASK-3. Переменная `SOWA_VISITOR_REFRESH_TTL_DAYS`: срок refresh-токена посетителя

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/visitor-sessions.config.ts, apps/server/src/infra/config/config.module.ts, apps/server/src/infra/config/env.schema.visitor-sessions.spec.ts, apps/server/.env.test, apps/server/.env.example
Коммит: [SERVER]: add visitor refresh token ttl setting
Ветка: feature/EPIC-13

## Что сделать

Срок жизни refresh-токена посетителя в днях задаётся переменной окружения. Образец переменной — `SOWA_SLOW_OPERATION_MS` (`env.schema.ts`, `slow-operations.config.ts`, тест `env.schema.slow-operations.spec.ts`).

1. `env.schema.ts`: в `envObjectSchema` сразу после `SOWA_TOKEN_SIGNING_KEY_ID` добавить

   ```ts
   SOWA_VISITOR_REFRESH_TTL_DAYS: integerInRange(1, 365, 30),
   ```

   Целое от 1 до 365, по умолчанию 30. `superRefine` не менять.

2. `visitor-sessions.config.ts` — новый файл:

   ```ts
   export const visitorSessionsConfig = registerAs("visitorSessions", () => {
     const env = parseEnv(process.env);
     return { refreshTtlDays: env.SOWA_VISITOR_REFRESH_TTL_DAYS };
   });
   ```

3. `config.module.ts`: добавить `visitorSessionsConfig` в `load` сразу после `tokenSigningConfig`.

4. `apps/server/.env.test`: строка `SOWA_VISITOR_REFRESH_TTL_DAYS=30` в конце файла, после `SOWA_TOKEN_SIGNING_KEY_ID`, через пустую строку.

5. `apps/server/.env.example`: строка `# SOWA_VISITOR_REFRESH_TTL_DAYS=30` в конце файла, после `# SOWA_TOKEN_SIGNING_KEY_ID=<kid>`.

## Где

- `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/config.module.ts`.
- `apps/server/src/infra/config/visitor-sessions.config.ts` — новый файл.
- `apps/server/.env.test`, `apps/server/.env.example`.
- Тест: `apps/server/src/infra/config/env.schema.visitor-sessions.spec.ts` (vitest, копия структуры `env.schema.slow-operations.spec.ts` с тем же `requiredEnv`).

## Требования из плана

- Refresh-токен посетителя одноразовый, хранится хешем; срок жизни задаётся настройкой, по умолчанию 30 дней.
- Переменные окружения — UPPER_SNAKE с префиксом `SOWA_`.

## Документация

- https://docs.nestjs.com/techniques/configuration#configuration-namespaces

## Критерии приёмки

- Без переменной `envSchema.parse` даёт `SOWA_VISITOR_REFRESH_TTL_DAYS: 30`; строка `"7"` становится числом 7; границы `"1"` и `"365"` принимаются.
- `"0"`, `"366"`, `"abc"`, `"1.5"` не проходят, текст ошибки называет `SOWA_VISITOR_REFRESH_TTL_DAYS`.
- `visitorSessionsConfig()` при `SOWA_VISITOR_REFRESH_TTL_DAYS=7` (через `vi.stubEnv`) возвращает `{ refreshTtlDays: 7 }`.

## Чего не делать

- Не делать переменную обязательной в production: у неё есть значение по умолчанию.
- Не использовать срок в сервисе — это TASK-5.

## История доработок

—
