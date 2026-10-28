# EPIC-9 / TASK-8. SOWA_ENCRYPTION_KEYS обязателен в production

Исполнитель: haiku
Зависит от: TASK-4
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/env.schema.spec.ts, apps/server/src/infra/config/env.schema.logging.spec.ts, apps/server/test/support/unit-probe.ts, apps/server/test/config-startup.e2e-spec.ts
Ветка: feature/EPIC-9

## Что сделать

В production сервис без ключа шифрования не стартует и называет переменную. В development переменная по-прежнему необязательна: её сгенерирует EPIC-11.

1. `env.schema.ts`: функция `checkEncryptionKeysInProduction(env, context)` по образцу `checkPrettyLogFormat` и её вызов в `superRefine` после `checkPrettyLogFormat`. Если `SOWA_ENV` — `production`, а `SOWA_ENCRYPTION_KEYS` — `undefined`, добавить issue `{ code: "custom", path: ["SOWA_ENCRYPTION_KEYS"], message: "is required when SOWA_ENV is production" }`.

2. Тестовые окружения, которые идут в production (по умолчанию `SOWA_ENV` — `production`), получают ключ. Значение во всех местах одно:

   ```
   SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8="
   ```

   - `apps/server/test/support/unit-probe.ts` — в объект `testEnv`: через `stubTestEnv` его получают `startZoneProbeApp` в `api-docs.spec.ts` и `server-errors.spec.ts` с `SOWA_ENV: "production"`;
   - `apps/server/src/infra/config/env.schema.spec.ts` и `apps/server/src/infra/config/env.schema.logging.spec.ts` — в `requiredEnv`;
   - `apps/server/test/config-startup.e2e-spec.ts` — в `validEnv`, и новый случай в таблицу `it.each`: `{ reason: "в production без SOWA_ENCRYPTION_KEYS", overrides: { SOWA_ENV: "production", SOWA_ENCRYPTION_KEYS: undefined }, named: /SOWA_ENCRYPTION_KEYS/ }`.

3. Новые проверки — в `env.schema.spec.ts`, отдельный `describe("SOWA_ENCRYPTION_KEYS")`.

`apps/server/.env.test` не менять: в нём `SOWA_ENV=development`.

## Где

- `apps/server/src/infra/config/env.schema.ts`.
- `apps/server/src/infra/config/env.schema.spec.ts`, `apps/server/src/infra/config/env.schema.logging.spec.ts`, `apps/server/test/support/unit-probe.ts`, `apps/server/test/config-startup.e2e-spec.ts`.
- Тесты: `pnpm --filter @sowa-chat/server test` (весь unit-набор: правка `unit-probe.ts` и схемы затрагивает многие спецификации), `config-startup.e2e-spec.ts` — e2e.

## Требования из плана

| | development | production |
|---|---|---|
| Секреты (подпись JWT, ключ шифрования) | генерируются при первом старте и сохраняются в volume | обязательны в env; без них сервис не стартует и пишет, чего не хватает |

## Документация

- https://zod.dev/api#superrefine

## Критерии приёмки

- `envSchema` без `SOWA_ENCRYPTION_KEYS` при `SOWA_ENV: "production"` и без `SOWA_ENV` отклоняет окружение и называет `SOWA_ENCRYPTION_KEYS`; при `SOWA_ENV: "development"` принимает.
- `envSchema` с ключом в production принимает окружение.
- Весь unit-набор `@sowa-chat/server` проходит, в том числе `api-docs.spec.ts` и `server-errors.spec.ts` в режиме production.
- e2e: сервер в production без `SOWA_ENCRYPTION_KEYS` не стартует и называет переменную.

## Чего не делать

- Не генерировать ключ в development и не писать файл секретов — это EPIC-11.
- Не менять разбор значения переменной — это TASK-4.

## История доработок

—
