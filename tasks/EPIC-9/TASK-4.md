# EPIC-9 / TASK-4. Переменная SOWA_ENCRYPTION_KEYS: разбор и конфиг

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/config/encryption-keys.schema.ts, apps/server/src/infra/config/encryption-keys.schema.spec.ts, apps/server/src/infra/config/encryption.config.ts, apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/config.module.ts, apps/server/.env.example
Ветка: feature/EPIC-9

## Что сделать

Ключи шифрования секретов в конфиге. Переменная в этой задаче необязательна в обоих режимах; обязательной в production её делает TASK-8.

1. `encryption-keys.schema.ts`:

   ```ts
   export interface EncryptionKey {
     version: number;
     key: Buffer;
   }
   export const encryptionKeysSchema
   ```

   Схема zod для значения переменной:
   - пустая строка — как отсутствующая переменная (`z.preprocess`, как `optionalUrl` в `env.schema.ts`), результат `undefined`;
   - иначе строка — список `версия:ключ` через запятую без пробелов, например `1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=,2:ICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj8=`;
   - версия — `/^[1-9]\d{0,5}$/` (целое от 1 до 999999);
   - ключ — base64 (стандартный, с `=`), который декодируется ровно в 32 байта и при обратном кодировании `toString("base64")` даёт ту же строку;
   - версии не повторяются;
   - результат — `EncryptionKey[]`, отсортированный по возрастанию версии.

   Разбор — `z.string().transform((value, context) => ...)`; на ошибке `context.addIssue({ code: "custom", message })` и `return z.NEVER`. Тексты ошибок (значение ключа в них не попадает никогда):
   - элемент не вида `версия:ключ` — `must be a comma-separated list of version:key`;
   - неверная версия — `version must be an integer from 1 to 999999`;
   - неверный ключ — `key of version N must be 32 bytes in base64`, где `N` — версия;
   - повтор — `version N is repeated`.

2. `env.schema.ts`: в `envObjectSchema` добавить `SOWA_ENCRYPTION_KEYS: encryptionKeysSchema`. Ошибка разбора называет переменную через путь issue, как остальные переменные.

3. `encryption.config.ts` — по образцу `redis.config.ts`:

   ```ts
   export const encryptionConfig = registerAs("encryption", () => {
     const env = parseEnv(process.env);
     return { keys: env.SOWA_ENCRYPTION_KEYS ?? [] };
   });
   ```

4. `config.module.ts`: добавить `encryptionConfig` в `load`.

5. `apps/server/.env.example`: после блока `SOWA_S3_*` пустая строка и выключенная переменная `# SOWA_ENCRYPTION_KEYS=1:<32 bytes in base64>`, как `# SOWA_DB_POOL_SIZE=10`. Значение-заглушка нарочно не проходит проверку: готовый ключ из примера не должен попасть в production.

## Где

- `apps/server/src/infra/config/encryption-keys.schema.ts`, `apps/server/src/infra/config/encryption.config.ts` — новые файлы.
- `apps/server/src/infra/config/env.schema.ts`, `apps/server/src/infra/config/config.module.ts`, `apps/server/.env.example`.
- Тест: `apps/server/src/infra/config/encryption-keys.schema.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`): проверяет `encryptionKeysSchema` и `envSchema` с обязательными переменными из `env.schema.spec.ts`, `SOWA_ENV: "development"`.

## Требования из плана

- Секреты, которые нужны нам в открытом виде, шифруются AES-256-GCM ключом из env, отдельно от БД.
- В каждой зашифрованной записи хранится версия ключа; при ротации добавляется ключ следующей версии, записи перешифровывает команда CLI `secrets:reencrypt`.
- Переменные окружения в UPPER_SNAKE_CASE с префиксом `SOWA_`.

## Документация

- https://docs.nestjs.com/techniques/configuration#configuration-namespaces
- https://zod.dev/api#transforms

## Критерии приёмки

- Список из двух ключей разбирается в `[{ version: 1, key }, { version: 2, key }]` с 32-байтными `Buffer`, в том числе если в строке версия 2 идёт раньше версии 1; пустая строка и отсутствие переменной дают `undefined`.
- Ключ не 32 байта, не base64, версия `0`, `01` или `abc`, повтор версии и строка без `:` отклоняются `envSchema`, ошибка называет `SOWA_ENCRYPTION_KEYS` и не содержит значения ключа.
- После `stubTestEnv({ SOWA_ENCRYPTION_KEYS: "1:<ключ>" })` (`apps/server/test/support/unit-probe.ts`) `encryptionConfig()` возвращает этот ключ, после `stubTestEnv({ SOWA_ENCRYPTION_KEYS: "" })` — `{ keys: [] }`. Пустая строка, а не отсутствие переменной: TASK-8 добавит ключ в окружение `stubTestEnv` по умолчанию.

## Чего не делать

- Не делать переменную обязательной в production и не менять тестовые окружения — это TASK-8.
- Не делать шифрование — это TASK-7.
- Не генерировать ключи в development — это EPIC-11.

## История доработок

—
