# EPIC-10 / TASK-5. Разбор публичного PEM identity-ключа: алгоритм и JWK

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/keys/identity-key-pem.ts, apps/server/src/domain/keys/identity-key-pem.spec.ts
Коммит: [SERVER]: parse identity public key pem into jwk with algorithm
Ветка: feature/EPIC-10

## Что сделать

Чистая функция без БД: из текста PEM-файла получить алгоритм и публичный ключ в JWK для таблицы `identity_keys` (сущность `IdentityKey` в `apps/server/src/domain/keys/identity-key.entity.ts`, тип `IdentityKeyAlgorithm`). Её вызывает сервис identity-ключей (TASK-10).

`apps/server/src/domain/keys/identity-key-pem.ts`:

```ts
export interface ParsedIdentityKey {
  alg: IdentityKeyAlgorithm;
  publicKey: JWK;
}

export class InvalidIdentityKeyError extends Error {}

export async function parseIdentityPublicKey(pem: string): Promise<ParsedIdentityKey>
```

Шаги:

1. Если в тексте нет `-----BEGIN PUBLIC KEY-----` или есть `PRIVATE KEY` — `InvalidIdentityKeyError` с текстом `Identity key file must contain a public key in PEM format (BEGIN PUBLIC KEY)`. Проверка на `PRIVATE KEY` обязательна: `createPublicKey` из Node молча выводит публичный ключ из приватного, и приватный ключ иначе прошёл бы.
2. `createPublicKey({ key: pem, format: "pem" })` из `node:crypto`; если бросает — та же ошибка, что в шаге 1.
3. Алгоритм по `KeyObject`:
   - `asymmetricKeyType === "ed25519"` → `EdDSA`;
   - `asymmetricKeyType === "ec"` и `asymmetricKeyDetails?.namedCurve === "prime256v1"` → `ES256`;
   - всё остальное (RSA, P-384, secp256k1, X25519, Ed448) — `InvalidIdentityKeyError` с текстом `Unsupported identity key: use Ed25519 or ECDSA P-256`.
4. `publicKey = await exportJWK(keyObject)` из `jose`. В JWK не добавлять `kid`, `alg`, `use`.

## Где

- `apps/server/src/domain/keys/identity-key-pem.ts` — новый файл.
- Тест: `apps/server/src/domain/keys/identity-key-pem.spec.ts` (vitest). Пары ключей тест создаёт `generateKeyPairSync` из `node:crypto` и выгружает в PEM (`publicKey.export({ type: "spki", format: "pem" })`, приватный — `{ type: "pkcs8", format: "pem" }`): это тот же формат, что у `openssl pkey -pubout`.

## Требования из плана

- Принимаем два алгоритма: EdDSA (Ed25519, рекомендуем) и ES256 (ECDSA P-256 — для сред и облачных KMS, где нет Ed25519).
- Интегратор сам генерирует пару (`openssl genpkey -algorithm ed25519` или `openssl ecparam -name prime256v1 -genkey`) и регистрирует у нас только публичную половину.
- Алгоритм хранится вместе с ключом, и в заголовке JWT разрешается только он, поэтому подменить алгоритм нельзя.
- Приватный ключ у нас не появляется.

## Документация

- https://nodejs.org/api/crypto.html#cryptocreatepublickeykey
- https://nodejs.org/api/crypto.html#keyobjectasymmetrickeydetails
- https://github.com/panva/jose/blob/main/docs/key/export/functions/exportJWK.md

## Критерии приёмки

- Публичный PEM Ed25519 — `alg` `EdDSA`, JWK `{ kty: "OKP", crv: "Ed25519", x }`; публичный PEM P-256 — `alg` `ES256`, JWK `{ kty: "EC", crv: "P-256", x, y }`; в JWK нет `d`.
- RSA, P-384, X25519 — `InvalidIdentityKeyError` с текстом про Ed25519 или P-256.
- Приватный PEM Ed25519 и P-256 (`BEGIN PRIVATE KEY`, `BEGIN EC PRIVATE KEY`), публичный PEM с дописанным приватным блоком, пустая строка и мусор — `InvalidIdentityKeyError` с текстом про `BEGIN PUBLIC KEY`.

## Чего не делать

- Не сохранять ключ и не делать команды — это TASK-10 и TASK-11.
- Не проверять identity-JWT — это эпик идентификации посетителя.

## История доработок

—
