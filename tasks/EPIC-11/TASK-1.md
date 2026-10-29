# EPIC-11 / TASK-1. Генераторы секретов, реестр секретов и файл секретов development

Исполнитель: sonnet
Зависит от: —
Владеет: apps/server/src/infra/config/secret-generators.ts, apps/server/src/infra/config/generated-secrets.ts, apps/server/src/infra/config/development-secrets-file.ts, apps/server/src/infra/config/secret-generators.spec.ts, apps/server/src/infra/config/development-secrets-file.spec.ts
Коммит: [SERVER]: add secret generators and development secrets file
Ветка: feature/EPIC-11

## Что сделать

Кирпичики для секретов: генераторы значений, общий реестр «какие секреты генерирует сервис» и чтение и запись файла секретов development. Подключение к загрузке конфига — TASK-4, команда `secrets:generate` — TASK-14, проект `main` — TASK-7. Все файлы новые, в папке `apps/server/src/infra/config/`. Из `domain` и других слоёв не импортировать: `infra` ни от кого не зависит (PLAN.md, раздел 3, правило слоёв).

1. `secret-generators.ts`:

   ```ts
   export function generateEncryptionKeyEntry(version: number): string
   export function generateTokenSigningKeyEntry(kid: string): string
   ```

   - `generateEncryptionKeyEntry(version)` — `${version}:${randomBytes(32).toString("base64")}`: формат `SOWA_ENCRYPTION_KEYS` (решение EPIC-9: версия, двоеточие, стандартный base64 ровно 32 байт).
   - `generateTokenSigningKeyEntry(kid)` — `${kid}:${der}`, где `der` — приватный ключ новой пары `generateKeyPairSync("ed25519")`, `privateKey.export({ format: "der", type: "pkcs8" }).toString("base64")`: формат `SOWA_TOKEN_SIGNING_KEYS` (решение EPIC-12, `token-signing-keys.schema.ts`).

2. `generated-secrets.ts` — реестр секретов, которые сервис умеет сгенерировать. Его читают и development (TASK-4), и `secrets:generate` (TASK-14). Новых списков секретов нигде не заводить: следующий эпик добавляет секрет строкой в этот реестр.

   ```ts
   import type { Env } from "./env.schema.js";

   export type SecretsMode = Env["SOWA_ENV"];

   export interface GeneratedSecret {
     variables: readonly string[];
     generate: (mode: SecretsMode) => Record<string, string>;
   }

   export const firstTokenSigningKeyIds: Record<SecretsMode, string> = {
     development: "dev-1",
     production: "key-1",
   };

   export const generatedSecrets: readonly GeneratedSecret[] = [ ... ];
   ```

   Две записи, по порядку:
   - `variables: ["SOWA_ENCRYPTION_KEYS"]`, `generate` → `{ SOWA_ENCRYPTION_KEYS: generateEncryptionKeyEntry(1) }`;
   - `variables: ["SOWA_TOKEN_SIGNING_KEYS", "SOWA_TOKEN_SIGNING_KEY_ID"]`, `generate(mode)` → `{ SOWA_TOKEN_SIGNING_KEYS: generateTokenSigningKeyEntry(kid), SOWA_TOKEN_SIGNING_KEY_ID: kid }`, где `kid = firstTokenSigningKeyIds[mode]`.

   `variables` — все переменные записи, `generate` возвращает значения ровно для них. Ключ подписи — две переменные одной записью: ключи и текущий `kid` создаются и пропадают вместе.

3. `development-secrets-file.ts` — файл секретов development:

   ```ts
   export const defaultDevelopmentSecretsDirectory = ".sowa-dev";
   export const developmentSecretsFileName = "secrets.json";

   export interface DevelopmentMainProject {
     publicKey: string;
     serverKey: string;
   }

   export interface DevelopmentSecrets {
     env: Record<string, string>;
     mainProject?: DevelopmentMainProject;
   }

   export function developmentSecretsPath(directory: string): string
   export function readDevelopmentSecrets(directory: string): DevelopmentSecrets | undefined
   export function createDevelopmentSecrets(directory: string, secrets: DevelopmentSecrets): boolean
   export function writeDevelopmentSecrets(directory: string, secrets: DevelopmentSecrets): void
   export class InvalidDevelopmentSecretsError extends Error {}
   ```

   - `env` — значения переменных окружения (`SOWA_ENCRYPTION_KEYS` и т. д.), `mainProject` — ключи проекта `main` (пишет TASK-7).
   - `developmentSecretsPath` — `join(directory, developmentSecretsFileName)`. Относительная папка считается от текущей рабочей папки процесса.
   - `readDevelopmentSecrets` — файла нет (`ENOENT`) → `undefined`. Файл есть, но не JSON или не проходит схему zod `z.object({ env: z.record(z.string(), z.string()), mainProject: z.object({ publicKey: z.string(), serverKey: z.string() }).optional() })` → `InvalidDevelopmentSecretsError` с текстом `Development secrets file <путь> is not valid: fix or delete it`. Значений файла в тексте нет.
   - `createDevelopmentSecrets` — создаёт папку (`mkdirSync(directory, { recursive: true, mode: 0o700 })`) и файл только если его ещё нет: `writeFileSync(path, text, { flag: "wx", mode: 0o600 })`. Файл уже есть (`EEXIST`) → `false`, файл не меняется; создан → `true`. Так из двух процессов, стартующих одновременно (`api` и `worker` на общем volume), файл создаёт только один, а второй читает его значения (TASK-4).
   - `writeDevelopmentSecrets` — перезапись: создать папку как выше, записать во временный файл `${path}.${process.pid}.tmp` с `mode: 0o600`, затем `renameSync` на место файла. Читатель никогда не видит наполовину записанный файл.
   - Текст файла — `JSON.stringify(secrets, null, 2)` и перевод строки в конце.

## Где

- Новые файлы: `apps/server/src/infra/config/secret-generators.ts`, `apps/server/src/infra/config/generated-secrets.ts`, `apps/server/src/infra/config/development-secrets-file.ts`.
- Тесты: `apps/server/src/infra/config/secret-generators.spec.ts` (генераторы и реестр), `apps/server/src/infra/config/development-secrets-file.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`). Файлы — во временной папке `mkdtempSync(join(tmpdir(), "sowa-dev-secrets-"))`, после теста удалить.
- Образцы форматов: `apps/server/src/infra/config/encryption-keys.schema.ts`, `apps/server/src/infra/config/token-signing-keys.schema.ts`.

## Требования из плана

| | development | production |
|---|---|---|
| Секреты (подпись JWT, ключ шифрования) | генерируются при первом старте и сохраняются в volume | обязательны в env; без них сервис не стартует и пишет, чего не хватает |

- Ключ подписи в development: пара Ed25519, `kid` `dev-1`, значение `dev-1:<PKCS8 DER base64>` (решение EPIC-12 от 29.10.2026 «ключ подписи в development»).
- Секреты для production печатает `sowa-chat secrets:generate` (TASK-14) из того же реестра.

## Документация

- https://nodejs.org/api/crypto.html#cryptogeneratekeypairsynctype-options
- https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
- https://nodejs.org/api/fs.html#file-system-flags

## Критерии приёмки

- `generateEncryptionKeyEntry(3)` начинается с `3:` и проходит `encryptionKeysSchema` (версия 3, ключ 32 байта); `generateTokenSigningKeyEntry("key-7")` проходит `tokenSigningKeysSchema` (`kid` `key-7`, тип ключа `ed25519`); два вызова дают разные значения.
- Объединение `generate("development")` всех записей `generatedSecrets` с минимальным env (`DATABASE_URL`, `REDIS_URL`, `SOWA_S3_*`, `SOWA_ENV=development`) проходит `envSchema`, `SOWA_TOKEN_SIGNING_KEY_ID` — `dev-1`; для `generate("production")` — `key-1`. Ключи результата каждой записи совпадают с её `variables`.
- `createDevelopmentSecrets` создаёт файл и возвращает `true`, второй вызов возвращает `false` и не меняет файл; `readDevelopmentSecrets` возвращает записанное, без файла — `undefined`, для файла с текстом `not json` — `InvalidDevelopmentSecretsError` с путём файла; `writeDevelopmentSecrets` перезаписывает существующий файл.
- Права: файл `0o600`, папка `0o700` (`statSync(...).mode & 0o777`), и после `writeDevelopmentSecrets` тоже. Тест прав пропускается на Windows (`it.skipIf(process.platform === "win32")`).

## Чего не делать

- Не подключать к конфигу и не трогать `config.module.ts`, `env.schema.ts` — это TASK-4.
- Не писать ротацию ключей — это TASK-13.

## История доработок

—
