# EPIC-9 / TASK-7. Шифрование секретов AES-256-GCM с версией ключа

Исполнитель: sonnet
Зависит от: TASK-4
Владеет: apps/server/src/infra/crypto/encrypted-secret.ts, apps/server/src/infra/crypto/encrypted-secret.spec.ts, apps/server/src/infra/crypto/encryption.service.ts, apps/server/src/infra/crypto/encryption.service.spec.ts, apps/server/src/infra/crypto/crypto.module.ts
Ветка: feature/EPIC-9

## Что сделать

Сервис шифрования секретов, которые нужны нам в открытом виде (подпись вебхуков ботам и подписчикам). Ключи — `encryptionConfig` из TASK-4 (`apps/server/src/infra/config/encryption.config.ts`): `{ keys: EncryptionKey[] }`, отсортированы по версии, пустой список в development без переменной. Папки `apps/server/src/infra/crypto/` ещё нет — создать.

1. Формат зашифрованной строки — `v<версия>.<iv>.<шифротекст>.<тег>`:
   - версия — десятичное число без ведущих нулей, например `v2`;
   - `iv` — 12 случайных байт (`randomBytes(12)`) на каждое шифрование;
   - шифротекст — байты UTF-8 значения после AES-256-GCM, может быть пустым;
   - тег аутентификации — 16 байт;
   - три двоичные части — base64url без `=` (`Buffer.toString("base64url")`).

2. `encrypted-secret.ts`:

   ```ts
   export interface EncryptedSecret { version: number; iv: Buffer; ciphertext: Buffer; tag: Buffer }
   export function formatEncryptedSecret(secret: EncryptedSecret): string
   export function parseEncryptedSecret(value: string): EncryptedSecret | undefined
   ```

   `parseEncryptedSecret` возвращает `undefined`, если строка не делится по `.` ровно на 4 части, версия не `/^v[1-9]\d*$/`, какая-то из трёх частей содержит символы вне `/^[A-Za-z0-9_-]*$/`, `iv` после декодирования не 12 байт или тег не 16 байт. Функцию потом использует `secrets:reencrypt` (EPIC-10), чтобы узнать версию записи.

3. `encryption.service.ts` — `EncryptionService` и ошибка:

   ```ts
   export class SecretDecryptionError extends Error {}
   ```

   - Конструктор получает `@Inject(encryptionConfig.KEY) config: ConfigType<typeof encryptionConfig>` и один раз строит `Map<number, KeyObject>` через `createSecretKey(key)`; текущая версия — наибольшая.
   - `encrypt(plaintext: string): string` — если ключей нет, `throw new Error("SOWA_ENCRYPTION_KEYS is not set")`. Иначе `createCipheriv("aes-256-gcm", ключ, iv, { authTagLength: 16 })`, шифрование ключом наибольшей версии, результат через `formatEncryptedSecret`.
   - `decrypt(value: string): string` — `parseEncryptedSecret`; если `undefined` или ключа этой версии нет — `SecretDecryptionError`. Иначе `createDecipheriv("aes-256-gcm", ключ, iv, { authTagLength: 16 })`, `setAuthTag(tag)`, `update` + `final`; ошибку `final` (подмена) перехватить и бросить `SecretDecryptionError`.
   - Сообщение `SecretDecryptionError` — всегда `Encrypted secret cannot be decrypted`: без значения, версии и причины.

4. `crypto.module.ts` — `CryptoModule`: `providers: [EncryptionService]`, `exports: [EncryptionService]`. В модули режимов не подключать: его подключат эпики ботов, исходящих событий и CLI.

## Где

- `apps/server/src/infra/crypto/` — новые файлы из списка «Владеет».
- Читать: `apps/server/src/infra/config/encryption.config.ts`, `apps/server/src/infra/config/encryption-keys.schema.ts`.
- Тесты: `apps/server/src/infra/crypto/encrypted-secret.spec.ts`, `apps/server/src/infra/crypto/encryption.service.spec.ts` (vitest; сервис создаётся напрямую `new EncryptionService({ keys: [...] })` или через `Test.createTestingModule` с подменой `encryptionConfig.KEY`).

## Требования из плана

- Секреты, которые нужны нам в открытом виде, шифруются AES-256-GCM ключом из env, отдельно от БД.
- В каждой зашифрованной записи хранится версия ключа; при ротации записи перешифровывает команда CLI `secrets:reencrypt`.
- Утечка ключа шифрования вместе с дампом БД — ротация ключа и перевыпуск секретов вебхуков.

## Документация

- https://docs.nestjs.com/security/encryption-and-hashing
- https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options
- https://nodejs.org/api/crypto.html#deciphersetauthtagbuffer-encoding

## Критерии приёмки

- Зашифрованная строка имеет вид `v1.<iv>.<шифротекст>.<тег>` и расшифровывается обратно, в том числе пустая строка и текст не латиницей; два шифрования одного значения дают разные строки.
- Подмена любого байта `iv`, шифротекста или тега, укороченный тег, неизвестная версия и строка неверного формата дают `SecretDecryptionError` с сообщением без значения.
- Значение, зашифрованное при ключах `[1]`, расшифровывается сервисом с ключами `[1, 2]`, а новое значение этого сервиса начинается с `v2.` и сервисом с ключом только `[1]` не расшифровывается.
- `encrypt` без ключей бросает ошибку `SOWA_ENCRYPTION_KEYS is not set`.

## Чего не делать

- Не делать перешифровку записей — это команда `secrets:reencrypt` в EPIC-10.
- Не менять конфиг и `env.schema.ts` — это TASK-4 и TASK-8.
- Не подключать `CryptoModule` в модули режимов.

## История доработок

—
