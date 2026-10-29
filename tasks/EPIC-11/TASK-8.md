# EPIC-11 / TASK-8. Остановка в production на http-адресах и секретах из .env.example

Исполнитель: sonnet
Зависит от: TASK-3, TASK-6, TASK-7
Владеет: apps/server/src/infra/environment-checks/config-checks.ts, apps/server/src/infra/environment-checks/config-checks.spec.ts, apps/server/src/infra/environment-checks/registered-environment-checks.ts, apps/server/src/infra/config/environment-checks.config.ts, apps/server/test/support/production-env.ts, apps/server/test/support/postgres-container.ts, apps/server/test/production-settings.e2e-spec.ts
Коммит: [SERVER]: stop production start on http urls and example secrets
Ветка: feature/EPIC-11

## Что сделать

Первые проверки в реестре TASK-3: критичные настройки production останавливают запуск, опасные дают предупреждение. Все три проверки идут и при старте, и в `doctor` (`onlyInDoctor: false`), и в development ничего не находят: там `http://localhost` и значения из `.env.example` — нормальная настройка.

1. `apps/server/src/infra/config/environment-checks.config.ts` — дополнить возвращаемый объект полями:

   ```ts
   publicUrl: env.SOWA_PUBLIC_URL,
   s3PublicUrl: env.SOWA_S3_PUBLIC_URL,
   databaseUrl: env.DATABASE_URL,
   migrationDatabaseUrl: env.SOWA_MIGRATION_DATABASE_URL,
   s3SecretKey: env.SOWA_S3_SECRET_KEY,
   ```

2. `apps/server/src/infra/environment-checks/config-checks.ts` — три проверки `EnvironmentCheck` и константа значений из `.env.example`:

   ```ts
   export const exampleSecretValues = { s3SecretKey: "sowa-dev-secret", databasePassword: "sowa" } as const;
   export const publicUrlsHttpsCheck: EnvironmentCheck = { name: "publicUrlsHttps", ... };
   export const exampleSecretsCheck: EnvironmentCheck = { name: "exampleSecrets", ... };
   export const s3PublicUrlCheck: EnvironmentCheck = { name: "s3PublicUrl", ... };
   ```

   У каждой: `settings.env === "development"` → `[]`.
   - `publicUrlsHttps`: для `SOWA_PUBLIC_URL` (`publicUrl`) и `SOWA_S3_PUBLIC_URL` (`s3PublicUrl`), если значение задано и `new URL(value).protocol !== "https:"`, — находка `stop` с текстом `<ИМЯ> must use https in production: set an https:// address`.
   - `exampleSecrets` — значения, с которыми сервис из `.env.example` уйдёт в production:
     - `s3SecretKey === exampleSecretValues.s3SecretKey` → `stop`, `SOWA_S3_SECRET_KEY has the example value from .env.example: set your own secret`;
     - пароль `DATABASE_URL` (`decodeURIComponent(new URL(url).password)`) равен `exampleSecretValues.databasePassword` → `stop`, `DATABASE_URL uses the example password from .env.example: set your own database password`;
     - то же для `SOWA_MIGRATION_DATABASE_URL`, если задана, с её именем в тексте.
     Пустые секреты здесь не проверяются: `SOWA_S3_SECRET_KEY` и `SOWA_S3_ACCESS_KEY` уже `nonEmptyString`, а `SOWA_ENCRYPTION_KEYS` и `SOWA_TOKEN_SIGNING_KEYS` в production обязательны, и `""` для них — «не задана» (схема). `SOWA_S3_ACCESS_KEY=sowa-dev` не секрет и не проверяется. `SOWA_ENCRYPTION_KEYS` и ключ подписи в `.env.example` выключены и заглушками, поэтому совпасть не могут.
   - `s3PublicUrl`: `s3PublicUrl === undefined` → `warn`, `SOWA_S3_PUBLIC_URL is not set: browsers cannot open file links until it is the public https address of the storage`.
   Значения из `.env.example` — константы в коде, а не чтение файла: в Docker-образе `.env.example` нет.

3. `registered-environment-checks.ts`: `registeredEnvironmentChecks = [publicUrlsHttpsCheck, exampleSecretsCheck, s3PublicUrlCheck]`.

4. Тестовые окружения production для e2e — `apps/server/test/support/production-env.ts`:

   ```ts
   export const productionOverrides = {
     SOWA_ENV: "production",
     SOWA_LOG_FORMAT: "json",
     SOWA_PUBLIC_URL: "https://chat.example.com",
     SOWA_S3_SECRET_KEY: "test-s3-secret",
     SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
     SOWA_TOKEN_SIGNING_KEYS: "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
     SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
   };
   ```

   Его используют TASK-9, TASK-11, TASK-12, TASK-15: `{ ...process.env, ...(await zonePortsEnv()), ...productionOverrides }`.

5. Пароль тестового PostgreSQL — `sowa-test` вместо `sowa` (`apps/server/test/support/postgres-container.ts`, `.withPassword("sowa-test")`): иначе `DATABASE_URL` e2e совпадает с примером, и ни один старт production в e2e не прошёл бы. Пользователь и база остаются `sowa` (`test/postgres-container.e2e-spec.ts` проверяет их, но не пароль).

## Где

- Новые файлы: `apps/server/src/infra/environment-checks/config-checks.ts`, `apps/server/test/support/production-env.ts`.
- Правки: `apps/server/src/infra/environment-checks/registered-environment-checks.ts`, `apps/server/src/infra/config/environment-checks.config.ts`, `apps/server/test/support/postgres-container.ts`.
- Модульный тест: `apps/server/src/infra/environment-checks/config-checks.spec.ts` — проверки вызываются с объектом `CheckContext`, у которого `dataSource` и `redis` — пустые заглушки; отдельный случай читает `apps/server/.env.example` (`parseEnv` из `node:util`) и сверяет `exampleSecretValues` со значением `SOWA_S3_SECRET_KEY` и паролем `DATABASE_URL`.
- e2e: `apps/server/test/production-settings.e2e-spec.ts` — `buildServer` из `test/support/project-cli.ts`, `spawnServer("api", env)` из `test/support/e2e-server.ts`, `zonePortsEnv`, `waitForExit`, `waitForLive`, `waitForOutput` из `test/support/startup-server.ts` (TASK-7).

## Требования из плана

- Опасные настройки в production выделяются предупреждением, а критичные (секрет по умолчанию, пустой ключ шифрования) останавливают запуск.
- `SOWA_PUBLIC_URL` и `SOWA_S3_PUBLIC_URL` — `https`: в production — остановка.
- Presigned-ссылки подписываются с учётом хоста, поэтому нужен `SOWA_S3_PUBLIC_URL` вида `https://chat.company.ru/storage`.

## Документация

- https://nodejs.org/api/url.html#urlpassword
- https://nodejs.org/api/util.html#utilparseenvcontent

## Критерии приёмки

- Модульно: в production `SOWA_PUBLIC_URL=http://chat.example.com` и `SOWA_S3_PUBLIC_URL=http://chat.example.com/storage` дают две находки `stop` с именами переменных; `https` — ни одной; в development `http` — ни одной. `exampleSecretValues` совпадают с `apps/server/.env.example`.
- Модульно: `SOWA_S3_SECRET_KEY=sowa-dev-secret` и `DATABASE_URL` с паролем `sowa` в production — две находки `stop`, тексты без значений секретов; без `SOWA_S3_PUBLIC_URL` в production — находка `warn`.
- e2e: `api` в production с `SOWA_PUBLIC_URL=http://chat.example.com` и `SOWA_S3_SECRET_KEY=sowa-dev-secret` завершается с ненулевым кодом, в выводе обе проблемы (`SOWA_PUBLIC_URL must use https`, `SOWA_S3_SECRET_KEY has the example value`); `api` в production с `productionOverrides` стартует (`waitForLive`) и пишет предупреждение `SOWA_S3_PUBLIC_URL is not set`.
- e2e: `api` в development (`.env.test`) с `SOWA_PUBLIC_URL=http://localhost:8080` стартует.

## Чего не делать

- Не проверять Redis и PostgreSQL — это TASK-11 и TASK-12.
- Не проверять срок хранения диалогов и S3 — это эпики сроков хранения и хранилища файлов.
- Не читать `.env.example` в коде сервиса.

## История доработок

—
