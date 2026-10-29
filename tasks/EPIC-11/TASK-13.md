# EPIC-11 / TASK-13. Ротация ключа шифрования и ключа подписи из текущего env

Исполнитель: haiku
Зависит от: TASK-1
Владеет: apps/server/src/infra/config/secret-rotation.ts, apps/server/src/infra/config/secret-rotation.spec.ts
Коммит: [SERVER]: rotate encryption and token signing keys from env
Ветка: feature/EPIC-11

## Что сделать

Расчёт новых значений для `sowa-chat secrets:generate --rotate` (команда — TASK-14): старые ключи остаются на месте, добавляется ключ следующей версии. Файл в `apps/server/src/infra/config/`, потому что читает `process.env` (это разрешено только там, тест `process-env.spec.ts`).

1. `apps/server/src/infra/config/secret-rotation.ts`:

   ```ts
   export function rotateSecrets(source: Record<string, string | undefined>): Record<string, string>
   export function rotateConfiguredSecrets(): Record<string, string>
   export function nextTokenSigningKeyId(kids: readonly string[]): string
   ```

   - `rotateConfiguredSecrets()` — `rotateSecrets(process.env)`.
   - `rotateSecrets` возвращает три переменные в этом порядке: `SOWA_ENCRYPTION_KEYS`, `SOWA_TOKEN_SIGNING_KEYS`, `SOWA_TOKEN_SIGNING_KEY_ID`. Ротируются оба ключа сразу; DevOps берут нужные строки.
   - `SOWA_ENCRYPTION_KEYS`:
     - не задана или `""` → `Error("SOWA_ENCRYPTION_KEYS is not set: nothing to rotate")`;
     - разбор `encryptionKeysSchema.safeParse(text)` (`encryption-keys.schema.ts`) не прошёл → `Error(`SOWA_ENCRYPTION_KEYS: ${первое сообщение issue}`)` — сообщения схемы ключ не содержат;
     - новая версия — наибольшая версия + 1; значение — исходный текст без изменений, затем `,` и `generateEncryptionKeyEntry(новая версия)` (TASK-1). Новая версия становится текущей сама: `EncryptionService` шифрует наибольшей версией.
   - `SOWA_TOKEN_SIGNING_KEYS`:
     - не задана или `""` → `Error("SOWA_TOKEN_SIGNING_KEYS is not set: nothing to rotate")`;
     - разбор `tokenSigningKeysSchema.safeParse(text)` не прошёл → `Error(`SOWA_TOKEN_SIGNING_KEYS: ${первое сообщение issue}`)`;
     - новый `kid` — `nextTokenSigningKeyId(kid всех ключей)`; значение — исходный текст, `,` и `generateTokenSigningKeyEntry(kid)`; `SOWA_TOKEN_SIGNING_KEY_ID` — новый `kid`: новые токены подписываются новым ключом, старые проверяются старыми до истечения.
   - Исходный текст ключей печатается как есть, а не собирается заново из разобранных ключей: DER приватного ключа после `export` может отличаться от исходного.
   - `nextTokenSigningKeyId(kids)` — `key-<n>`, где `n` начинается с `kids.length + 1` и увеличивается на 1, пока `key-<n>` есть среди `kids`. Так `kid` выбирает команда, а не человек, и правило работает для любых строковых `kid` (`dev-1`, `test-1`, свои): `["key-1"]` → `key-2`, `["test-1"]` → `key-2`, `["key-2"]` → `key-3`.

## Где

- Новые файлы: `apps/server/src/infra/config/secret-rotation.ts`, `apps/server/src/infra/config/secret-rotation.spec.ts`.
- Готовый код: `encryptionKeysSchema`, `tokenSigningKeysSchema`, `generateEncryptionKeyEntry`, `generateTokenSigningKeyEntry` (TASK-1).
- Тестовые ключи — из решений EPIC-9 и EPIC-12: `1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=`, `test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f`.

## Требования из плана

- `secrets:generate` с флагом ротации печатает новый ключ следующей версии.
- Ключ подписи токенов — пара Ed25519 с `kid`, при ротации старые токены проверяются старым ключом до истечения. Ключ шифрования — в каждой зашифрованной записи хранится версия ключа, при ротации записи перешифровывает `secrets:reencrypt`.

## Документация

- https://zod.dev/basics#handling-errors

## Критерии приёмки

- `rotateSecrets` с тестовыми ключами возвращает `SOWA_ENCRYPTION_KEYS`, который начинается с `1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=,2:` и проходит `encryptionKeysSchema` с версиями `[1, 2]`; `SOWA_TOKEN_SIGNING_KEYS`, который начинается с исходного `test-1:…,key-2:` и проходит `tokenSigningKeysSchema`; `SOWA_TOKEN_SIGNING_KEY_ID` — `key-2`. Результат вместе с минимальным env проходит `envSchema`.
- Без `SOWA_ENCRYPTION_KEYS` — ошибка с именем переменной; с `SOWA_ENCRYPTION_KEYS=1:AAAA` — ошибка с именем переменной и без `AAAA` в тексте.
- `nextTokenSigningKeyId`: `[]` → `key-1`, `["test-1"]` → `key-2`, `["key-1", "key-2"]` → `key-3`, `["key-2"]` → `key-3`.

## Чего не делать

- Не печатать ничего и не делать команду — это TASK-14.
- Не перешифровывать данные — это `secrets:reencrypt` из EPIC-10.

## История доработок

—
