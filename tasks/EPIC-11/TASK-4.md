# EPIC-11 / TASK-4. Секреты development подставляются в конфиг при старте

Исполнитель: sonnet
Зависит от: TASK-1, TASK-3
Владеет: apps/server/src/infra/config/development-secrets.ts, apps/server/src/infra/config/load-env.ts, apps/server/src/infra/config/development-secrets.config.ts, apps/server/src/infra/config/config.module.ts, apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/config.module.spec.ts, apps/server/src/infra/config/development-secrets.spec.ts, apps/server/src/infra/config/config.module.development-secrets.spec.ts, apps/server/.env.example, apps/server/.env.test, .gitignore
Коммит: [SERVER][CORE]: load generated development secrets into config
Ветка: feature/EPIC-11

## Что сделать

В development сервис стартует без ручной настройки секретов: недостающие секреты из реестра `generatedSecrets` (TASK-1) берутся из файла секретов или генерируются и записываются в него, и при следующем старте те же. В production механизм выключен полностью.

Как сейчас грузится конфиг: `AppConfigModule` (`config.module.ts`) вызывает `ConfigModule.forRoot({ validate: parseEnv, load: [...] })`. `validate` вызывается один раз, при импорте `config.module.ts`, с объектом `source` = значения файла `.env` из рабочей папки плюс `process.env`. Каждая фабрика `registerAs` (`encryption.config.ts`, `token-signing.config.ts` и др.) потом сама читает `parseEnv(process.env)`. Значит, сгенерированные значения нужно положить в `process.env` внутри `validate`, до первой фабрики. Читать и писать `process.env` можно только в `apps/server/src/infra/config/` (тест `process-env.spec.ts`).

1. `env.schema.ts`: переменная `SOWA_DEV_SECRETS_DIR` — `z.preprocess((value) => (value === "" ? undefined : value), z.string().default(defaultDevelopmentSecretsDirectory))`, константа из `development-secrets-file.ts` (TASK-1). В production она ни на что не влияет.

2. `development-secrets.ts`:

   ```ts
   export function provideDevelopmentSecrets(source: Record<string, unknown>): Record<string, string>
   ```

   - `source.SOWA_ENV !== "development"` (в том числе переменная не задана: по умолчанию production) → `{}`. Файл не читается и не создаётся.
   - Недостающая запись реестра — та, у которой все `variables` в `source` отсутствуют или равны `""`. Если задана хотя бы одна переменная записи (например, `SOWA_TOKEN_SIGNING_KEYS` без `SOWA_TOKEN_SIGNING_KEY_ID`), запись не трогается: ошибку назовёт схема. Недостающих нет → `{}`, файл не читается и не создаётся.
   - Папка — `source.SOWA_DEV_SECRETS_DIR`, если это непустая строка, иначе `defaultDevelopmentSecretsDirectory`.
   - Файла нет (`readDevelopmentSecrets` → `undefined`): сгенерировать все недостающие записи (`generate("development")`) и создать файл `createDevelopmentSecrets(directory, { env: значения })`. Вернул `false` (файл в это время создал другой процесс) — прочитать файл заново и продолжить как в следующем пункте.
   - Файл есть: для каждой недостающей записи взять значения из `secrets.env`, если там есть все её `variables`; иначе сгенерировать. Если хоть что-то сгенерировано — `writeDevelopmentSecrets(directory, { ...secrets, env: { ...secrets.env, ...сгенерированное } })`; `mainProject` сохраняется.
   - Возвращает значения только недостающих переменных.

3. `load-env.ts`:

   ```ts
   export function loadEnv(source: Record<string, unknown>): Env
   ```

   - `const secrets = provideDevelopmentSecrets(source)`;
   - в `process.env` записываются строки из `source`, которых нет в `process.env` (значения из файла `.env`), и все значения `secrets`. Строки — потому что `ConfigModule` сам переносит в `process.env` только строковые результаты `validate`, а `SOWA_ENCRYPTION_KEYS` после схемы уже массив, и фабрика `encryptionConfig` иначе его не увидела бы;
   - возвращает `parseEnv({ ...source, ...secrets })`.

   В `config.module.ts` — `validate: loadEnv` вместо `validate: parseEnv`.

4. `development-secrets.config.ts` — пространство конфига для TASK-7:

   ```ts
   export const developmentSecretsConfig = registerAs("developmentSecrets", () => {
     const env = parseEnv(process.env);
     return { directory: env.SOWA_DEV_SECRETS_DIR };
   });
   ```

   Зарегистрировать в `load` у `AppConfigModule`.

5. Тестовые окружения не должны создавать файл в рабочей папке:
   - `apps/server/.env.test` (development, e2e): добавить `SOWA_ENCRYPTION_KEYS=1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=` — тестовый ключ EPIC-9. Ключ подписи там уже есть. Так ни одна запись реестра в e2e не «недостающая».
   - `apps/server/src/infra/config/config.module.spec.ts`: в его `testEnv` добавить те же `SOWA_ENCRYPTION_KEYS`, `SOWA_TOKEN_SIGNING_KEYS`, `SOWA_TOKEN_SIGNING_KEY_ID`, что в `apps/server/test/support/unit-probe.ts`. В `unit-probe.ts` они уже есть.
   - Модульные тесты `EncryptionService`, `TokensService`, `SecretsReencryptionService`, которые ждут `SOWA_ENCRYPTION_KEYS is not set` / `SOWA_TOKEN_SIGNING_KEYS is not set`, создают сервисы с пустым списком ключей напрямую или через `overrideProvider` — `loadEnv` их не касается, они не меняются.
   - Тесты этой задачи задают `SOWA_DEV_SECRETS_DIR` временной папкой (`mkdtempSync(join(tmpdir(), "sowa-dev-secrets-"))`), а недостающие переменные — `vi.stubEnv(name, "")`, и после теста `vi.unstubAllEnvs()` и удаление папки.

6. `.gitignore` (корень): строка `.sowa-dev` в разделе `# Local env files`. `apps/server/.env.example`: строка `# SOWA_DEV_SECRETS_DIR=.sowa-dev` после строк ключей.

## Где

- Новые файлы: `apps/server/src/infra/config/development-secrets.ts`, `load-env.ts`, `development-secrets.config.ts`.
- Правки: `apps/server/src/infra/config/config.module.ts`, `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/config.module.spec.ts`, `apps/server/.env.example`, `apps/server/.env.test`, `.gitignore`.
- Тесты: `apps/server/src/infra/config/development-secrets.spec.ts` (функции `provideDevelopmentSecrets` и `loadEnv`), `apps/server/src/infra/config/config.module.development-secrets.spec.ts` (`AppConfigModule` целиком, по образцу `config.module.spec.ts`: `vi.resetModules()` и импорт `./config.module.js` после `vi.stubEnv`).
- Реестр и файл — TASK-1: `generated-secrets.ts`, `development-secrets-file.ts`.

## Требования из плана

| | development | production |
|---|---|---|
| Секреты (подпись JWT, ключ шифрования) | генерируются при первом старте и сохраняются в volume | обязательны в env; без них сервис не стартует и пишет, чего не хватает |

- Значение из env всегда важнее файла.
- Ключ подписи в development — `kid` `dev-1` (решение EPIC-12), он проходит `checkTokenSigningKeyId` в `env.schema.ts`.

## Документация

- https://docs.nestjs.com/techniques/configuration#custom-validate-function
- https://nodejs.org/api/fs.html

## Критерии приёмки

- Первый `loadEnv` в development без `SOWA_ENCRYPTION_KEYS`, `SOWA_TOKEN_SIGNING_KEYS`, `SOWA_TOKEN_SIGNING_KEY_ID` создаёт `secrets.json` во временной `SOWA_DEV_SECRETS_DIR` и кладёт значения в `process.env`; второй `loadEnv` (после возврата переменных к `""`) даёт те же значения: строка, зашифрованная `new EncryptionService({ keys })` из первого результата, расшифровывается сервисом из второго, а `kid` — `dev-1`.
- `SOWA_ENCRYPTION_KEYS`, заданный в env, остаётся как есть и в файл не попадает; если в env заданы все секреты реестра, файл не создаётся.
- `loadEnv` в production без `SOWA_ENCRYPTION_KEYS` бросает ошибку с `SOWA_ENCRYPTION_KEYS`, временная папка остаётся пустой.
- `AppConfigModule` в development без ключей во временной папке отдаёт `encryptionConfig.keys` из одного ключа версии 1 и `tokenSigningConfig.currentKeyId` `dev-1`, а `developmentSecretsConfig.directory` — эту папку.

## Чего не делать

- Не делать volume в docker-compose — это EPIC-17 TASK-3 (`docker-compose.yml` ещё нет).
- Не создавать проект и его ключи — это TASK-7.
- Не трогать модульные тесты сервисов шифрования и токенов.

## История доработок

—
