# EPIC-11 / TASK-6. Переменные SOWA_PUBLIC_URL и SOWA_S3_PUBLIC_URL, адрес сервиса обязателен в production

Исполнитель: sonnet
Зависит от: TASK-5
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/.env.example, apps/server/src/infra/config/env.schema.spec.ts, apps/server/src/infra/config/env.schema.logging.spec.ts, apps/server/src/infra/config/env.schema.slow-operations.spec.ts, apps/server/src/infra/config/env.schema.initial-project.spec.ts, apps/server/src/infra/config/env.schema.public-urls.spec.ts, apps/server/test/support/unit-probe.ts, apps/server/test/config-startup.e2e-spec.ts
Коммит: [SERVER]: add public url variables required in production
Ветка: feature/EPIC-11

## Что сделать

Публичные адреса сервиса и хранилища. Проверку `https` и предупреждение о незаданном `SOWA_S3_PUBLIC_URL` делает TASK-8; здесь только переменные и обязательность `SOWA_PUBLIC_URL` в production. Образец — правило для `SOWA_ENCRYPTION_KEYS` и `SOWA_TOKEN_SIGNING_KEYS` (EPIC-9 TASK-8, EPIC-12 TASK-3): функция `checkTokenSigningKeysInProduction` в `env.schema.ts` и её тесты.

1. `env.schema.ts`, в `envObjectSchema`: `SOWA_PUBLIC_URL: optionalUrl()` и `SOWA_S3_PUBLIC_URL: optionalUrl()` (функция уже есть: `""` → не задана, иначе `z.url()`).
2. Функция `checkPublicUrlInProduction(env, context)` по образцу `checkTokenSigningKeysInProduction` и её вызов в `superRefine` сразу после `checkTokenSigningKeysInProduction`: в production без `SOWA_PUBLIC_URL` — issue `{ code: "custom", path: ["SOWA_PUBLIC_URL"], message: "is required when SOWA_ENV is production" }`. `SOWA_S3_PUBLIC_URL` пока необязательна везде: обязательной её сделает эпик хранилища файлов.
3. `apps/server/.env.example` — выключенные строки после `SOWA_S3_BUCKET=sowa-chat`:

   ```
   # SOWA_PUBLIC_URL=https://chat.example.com
   # SOWA_S3_PUBLIC_URL=https://chat.example.com/storage
   ```

4. Тестовые окружения, где бывает production (по умолчанию `SOWA_ENV` — `production`), получают адрес. Значение во всех файлах одно: `SOWA_PUBLIC_URL: "https://chat.example.com"`.
   - `requiredEnv` в `env.schema.spec.ts`, `env.schema.logging.spec.ts`, `env.schema.slow-operations.spec.ts`, `env.schema.initial-project.spec.ts` (TASK-5) — у них нет `SOWA_ENV`, значит production;
   - `testEnv` в `apps/server/test/support/unit-probe.ts`: `api-docs.spec.ts` и `server-errors.spec.ts` поднимают `ApiModule` с `SOWA_ENV: "production"`;
   - `validEnv` в `apps/server/test/config-startup.e2e-spec.ts`: без адреса каждый случай падал бы ещё и на `SOWA_PUBLIC_URL`.
   В файлах с `SOWA_ENV=development` (`.env.test`, `encryption-keys.schema.spec.ts`, `token-signing-keys.schema.spec.ts`, `config.module.spec.ts`) адрес не нужен.

## Где

- `apps/server/src/infra/config/env.schema.ts`, `apps/server/.env.example`.
- Тестовые окружения из пункта 4.
- Новый тест `apps/server/src/infra/config/env.schema.public-urls.spec.ts`: `env.schema.spec.ts` уже около 300 строк (лимит oxlint).

## Требования из плана

- Перехват трафика: в production только `https` и `wss`; сервис не стартует, если `SOWA_PUBLIC_URL` или `SOWA_S3_PUBLIC_URL` начинаются с `http://` (проверку делает TASK-8).
- Presigned-ссылки подписываются с учётом хоста, поэтому нужен отдельный `SOWA_S3_PUBLIC_URL` вида `https://chat.company.ru/storage`.

## Документация

- https://zod.dev/api#refinements

## Критерии приёмки

- В production без `SOWA_PUBLIC_URL` и при `SOWA_PUBLIC_URL=""` схема не проходит с ошибкой `SOWA_PUBLIC_URL: is required when SOWA_ENV is production`; с `https://chat.example.com` проходит; в development без адреса проходит.
- `SOWA_PUBLIC_URL=not-a-url` и `SOWA_S3_PUBLIC_URL=not-a-url` не проходят с именем переменной; без `SOWA_S3_PUBLIC_URL` схема проходит и в production.
- Все модульные тесты пакета проходят (`pnpm --filter @sowa-chat/server test`), в том числе `api-docs.spec.ts` и `server-errors.spec.ts` в production.

## Чего не делать

- Не проверять схему `http://` / `https://` — это TASK-8.
- Не заводить пространство конфига для адресов: адреса читает конфиг проверок в TASK-8.

## История доработок

—
