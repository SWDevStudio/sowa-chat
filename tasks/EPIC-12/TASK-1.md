# EPIC-12 / TASK-1. Переменные SOWA_TOKEN_SIGNING_KEYS и SOWA_TOKEN_SIGNING_KEY_ID: разбор ключей Ed25519 и конфиг

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/config/token-signing-keys.schema.ts, apps/server/src/infra/config/token-signing-keys.schema.spec.ts, apps/server/src/infra/config/token-signing.config.ts, apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/config.module.ts, apps/server/.env.example
Коммит: [SERVER]: add token signing keys variables and config
Ветка: feature/EPIC-12

## Что сделать

Ключи подписи наших JWT (токены операторов и посетителей) в конфиге. Подпись и проверку делает TASK-4. В этой задаче обе переменные необязательны в обоих режимах; обязательными в production их делает TASK-3. Генерацию ключа в development здесь не делать: механизма секретов development ещё нет, его делает EPIC-11 TASK-1 (решение в `decisions.md`).

Образец — `SOWA_ENCRYPTION_KEYS` из EPIC-9: `apps/server/src/infra/config/encryption-keys.schema.ts`, `apps/server/src/infra/config/encryption.config.ts`, `apps/server/src/infra/config/encryption-keys.schema.spec.ts`.

1. `token-signing-keys.schema.ts`:

   ```ts
   import type { KeyObject } from "node:crypto";

   export interface TokenSigningKey {
     kid: string;
     privateKey: KeyObject;
     publicKey: KeyObject;
   }
   export const tokenSigningKeysSchema
   ```

   Схема zod для значения `SOWA_TOKEN_SIGNING_KEYS`, устроена как `encryptionKeysSchema`:
   - пустая строка — как отсутствующая переменная (`z.preprocess`), результат `undefined`;
   - иначе строка — список `kid:ключ` через запятую без пробелов, например `test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f`;
   - `kid` — `/^[A-Za-z0-9_-]{1,64}$/`;
   - ключ — стандартный base64 (с `=`), который при обратном кодировании `toString("base64")` даёт ту же строку; байты — приватный ключ в PKCS8 DER. Ключ создаётся `createPrivateKey({ key: der, format: "der", type: "pkcs8" })` из `node:crypto` внутри `try`/`catch`; ошибка разбора или `asymmetricKeyType !== "ed25519"` — ключ отклоняется;
   - `publicKey` — `createPublicKey(privateKey)`;
   - `kid` не повторяются;
   - результат — `TokenSigningKey[]` в порядке из строки, без сортировки.

   Объекты `KeyObject` создаются здесь, при разборе конфига на старте. На запросах ключи из PEM или base64 больше не разбираются.

   Тексты ошибок (значение ключа в них не попадает никогда):
   - элемент не вида `kid:ключ` — `must be a comma-separated list of kid:key`;
   - неверный `kid` — `kid must be 1-64 characters: letters, digits, _ or -`;
   - неверный ключ — `key of kid K must be an Ed25519 private key in PKCS8 DER base64`, где `K` — `kid`;
   - повтор — `kid K is repeated`.

2. `env.schema.ts`:
   - в `envObjectSchema` после `SOWA_ENCRYPTION_KEYS` добавить `SOWA_TOKEN_SIGNING_KEYS: tokenSigningKeysSchema` и `SOWA_TOKEN_SIGNING_KEY_ID: z.preprocess((value) => (value === "" ? undefined : value), z.string().optional())`;
   - функция `checkTokenSigningKeyId(env, context)` по образцу `checkPrettyLogFormat` и её вызов в `superRefine` после `checkEncryptionKeysInProduction`. Правила, issue всегда с `path: ["SOWA_TOKEN_SIGNING_KEY_ID"]`:
     - обе переменные `undefined` — без ошибки;
     - ключи заданы, `SOWA_TOKEN_SIGNING_KEY_ID` — `undefined`: `is required when SOWA_TOKEN_SIGNING_KEYS is set`;
     - `SOWA_TOKEN_SIGNING_KEY_ID` задан, но такого `kid` нет среди ключей (или ключей нет): `must be one of the kids in SOWA_TOKEN_SIGNING_KEYS`.

3. `token-signing.config.ts` — по образцу `encryption.config.ts`:

   ```ts
   export const tokenSigningConfig = registerAs("tokenSigning", () => {
     const env = parseEnv(process.env);
     return {
       keys: env.SOWA_TOKEN_SIGNING_KEYS ?? [],
       currentKeyId: env.SOWA_TOKEN_SIGNING_KEY_ID,
     };
   });
   ```

4. `config.module.ts`: добавить `tokenSigningConfig` в `load` после `encryptionConfig`.

5. `apps/server/.env.example`: сразу после строки `# SOWA_ENCRYPTION_KEYS=1:<32 bytes in base64>` две выключенные строки:

   ```
   # SOWA_TOKEN_SIGNING_KEYS=<kid>:<Ed25519 private key, PKCS8 DER in base64>
   # SOWA_TOKEN_SIGNING_KEY_ID=<kid>
   ```

   Заглушка нарочно не проходит проверку: готовый ключ из примера не должен попасть в production.

## Где

- `apps/server/src/infra/config/token-signing-keys.schema.ts`, `apps/server/src/infra/config/token-signing.config.ts` — новые файлы.
- `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/config.module.ts`, `apps/server/.env.example`.
- Тест: `apps/server/src/infra/config/token-signing-keys.schema.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`): проверяет `tokenSigningKeysSchema`, `envSchema` с обязательными переменными из `env.schema.spec.ts` и `SOWA_ENV: "development"`, и `tokenSigningConfig()` после `stubTestEnv` из `apps/server/test/support/unit-probe.ts`.
- Тестовые ключи (из `decisions.md`, их же используют TASK-3 и TASK-4):
  - `test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f` (Ed25519, seed — байты 0–31);
  - `test-2:MC4CAQAwBQYDK2VwBCIEICAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/` (Ed25519, seed — байты 32–63);
  - ключ не Ed25519 — X25519 `MC4CAQAwBQYDK2VuBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f`.

## Требования из плана

- Наши секреты в env: ключ подписи токенов — пара Ed25519 с `kid`; при ротации старые токены проверяются старым ключом до истечения.
- Объекты ключей создаются один раз при старте, а не разбираются из PEM на каждом запросе.
- Конфиг: `.env` проверяется через Zod при старте, с ошибкой в конфиге сервис не запустится. Остальной код получает типизированные объекты через `registerAs` и `ConfigType`.
- Переменные окружения в UPPER_SNAKE_CASE с префиксом `SOWA_`.

## Документация

- https://docs.nestjs.com/techniques/configuration#configuration-namespaces
- https://zod.dev/api#transforms
- https://nodejs.org/api/crypto.html#cryptocreateprivatekeykey

## Критерии приёмки

- Список `test-1:…,test-2:…` разбирается в два `TokenSigningKey` в том же порядке, `privateKey.asymmetricKeyType` и `publicKey.asymmetricKeyType` — `ed25519`, `publicKey.type` — `public`; пустая строка и отсутствие переменной дают `undefined`.
- Отклоняются `envSchema`: элемент без `:`, `kid` с пробелом или длиннее 64 символов, ключ не base64, ключ X25519, повтор `kid`; ошибка называет `SOWA_TOKEN_SIGNING_KEYS` и не содержит значения ключа.
- `envSchema` отклоняет ключи без `SOWA_TOKEN_SIGNING_KEY_ID` и `SOWA_TOKEN_SIGNING_KEY_ID`, которого нет среди ключей; ошибка называет `SOWA_TOKEN_SIGNING_KEY_ID`. Без обеих переменных в development ошибки нет.
- После `stubTestEnv({ SOWA_TOKEN_SIGNING_KEYS: "test-1:<ключ>", SOWA_TOKEN_SIGNING_KEY_ID: "test-1" })` `tokenSigningConfig()` возвращает один ключ с `kid` `test-1` и `currentKeyId` `test-1`; после `stubTestEnv({ SOWA_TOKEN_SIGNING_KEYS: "", SOWA_TOKEN_SIGNING_KEY_ID: "" })` — `{ keys: [], currentKeyId: undefined }`.

## Чего не делать

- Не делать переменные обязательными в production и не менять тестовые окружения (`unit-probe.ts`, `env.schema*.spec.ts`, `config-startup.e2e-spec.ts`, `.env.test`) — это TASK-3 и TASK-4.
- Не делать подпись и проверку токенов — это TASK-4.
- Не генерировать ключ в development — это EPIC-11 TASK-1.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
