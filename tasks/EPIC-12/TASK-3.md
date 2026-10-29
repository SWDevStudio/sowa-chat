# EPIC-12 / TASK-3. Ключ подписи токенов обязателен в production

Исполнитель: haiku
Зависит от: TASK-1
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/env.schema.spec.ts, apps/server/src/infra/config/env.schema.logging.spec.ts, apps/server/test/support/unit-probe.ts, apps/server/test/config-startup.e2e-spec.ts
Коммит: [SERVER]: require token signing keys in production
Ветка: feature/EPIC-12

## Что сделать

В production сервис без ключа подписи токенов не стартует и называет переменную. В development переменная по-прежнему необязательна: генерировать её будет EPIC-11 TASK-1. Образец — то же правило для `SOWA_ENCRYPTION_KEYS` (EPIC-9 TASK-8): функция `checkEncryptionKeysInProduction` в `env.schema.ts` и её тесты.

1. `env.schema.ts`: функция `checkTokenSigningKeysInProduction(env, context)` по образцу `checkEncryptionKeysInProduction` и её вызов в `superRefine` сразу после `checkEncryptionKeysInProduction`. Если `SOWA_ENV` — `production`, а `SOWA_TOKEN_SIGNING_KEYS` — `undefined`, добавить issue `{ code: "custom", path: ["SOWA_TOKEN_SIGNING_KEYS"], message: "is required when SOWA_ENV is production" }`. Требование к `SOWA_TOKEN_SIGNING_KEY_ID` уже есть (TASK-1): без него ключи не проходят.

2. Тестовые окружения, где бывает `SOWA_ENV=production`, получают тестовый ключ. Значения во всех файлах одинаковые:

   ```
   SOWA_TOKEN_SIGNING_KEYS: "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
   SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
   ```

   Добавить сразу после `SOWA_ENCRYPTION_KEYS` в:
   - `requiredEnv` в `apps/server/src/infra/config/env.schema.spec.ts` и `apps/server/src/infra/config/env.schema.logging.spec.ts`;
   - `testEnv` в `apps/server/test/support/unit-probe.ts` (им пользуются `startZoneProbeApp` и тесты с `SOWA_ENV: "production"`, например `api-docs.spec.ts`, `server-errors.spec.ts`);
   - `validEnv` в `apps/server/test/config-startup.e2e-spec.ts`.

3. `env.schema.spec.ts`: блок `describe("SOWA_TOKEN_SIGNING_KEYS", …)` по образцу блока `SOWA_ENCRYPTION_KEYS`.

4. `config-startup.e2e-spec.ts`: в таблицу случаев «не стартует и называет переменную» после случая `в production без SOWA_ENCRYPTION_KEYS` добавить:

   ```ts
   {
     reason: "в production без SOWA_TOKEN_SIGNING_KEYS",
     overrides: {
       SOWA_ENV: "production",
       SOWA_TOKEN_SIGNING_KEYS: undefined,
       SOWA_TOKEN_SIGNING_KEY_ID: undefined,
     },
     named: /SOWA_TOKEN_SIGNING_KEYS/,
   },
   ```

## Где

- `apps/server/src/infra/config/env.schema.ts`.
- Тесты: `apps/server/src/infra/config/env.schema.spec.ts`, `apps/server/src/infra/config/env.schema.logging.spec.ts`, `apps/server/test/support/unit-probe.ts` (vitest, `pnpm --filter @sowa-chat/server test`), `apps/server/test/config-startup.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`).
- `apps/server/src/infra/config/env.schema.slow-operations.spec.ts` не трогать: production там не проверяется.

## Требования из плана

| | development | production |
|---|---|---|
| Секреты (подпись JWT, ключ шифрования) | генерируются при первом старте и сохраняются в volume | обязательны в env; без них сервис не стартует и пишет, чего не хватает |

## Документация

- https://zod.dev/api#superrefine

## Критерии приёмки

- `envSchema` с `SOWA_ENV: "production"` без `SOWA_TOKEN_SIGNING_KEYS` не проходит, ошибка `SOWA_TOKEN_SIGNING_KEYS: is required when SOWA_ENV is production`; с `SOWA_ENV: "development"` без обеих переменных проходит.
- `envSchema` с `SOWA_ENV: "production"` и тестовым ключом `test-1` проходит.
- Все существующие unit-тесты `apps/server` с `SOWA_ENV: "production"` проходят (`pnpm --filter @sowa-chat/server test`).
- Сервис в production без `SOWA_TOKEN_SIGNING_KEYS` завершается с ненулевым кодом и называет переменную (e2e `config-startup.e2e-spec.ts`).

## Чего не делать

- Не менять разбор ключей и `checkTokenSigningKeyId` — это TASK-1.
- Не трогать `apps/server/.env.test`: там development, ключ в него добавляет TASK-4.
- Не генерировать ключ в development — это EPIC-11 TASK-1.

## История доработок

—
