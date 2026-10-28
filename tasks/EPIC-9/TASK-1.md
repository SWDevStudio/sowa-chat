# EPIC-9 / TASK-1. Формат ключа

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/keys/base62.ts, apps/server/src/domain/keys/base62.spec.ts, apps/server/src/domain/keys/key-format.ts, apps/server/src/domain/keys/key-format.spec.ts
Ветка: feature/EPIC-9

## Что сделать

Создание и разбор ключей вида `<префикс типа>_<тело>_<контрольная сумма>` без обращения к БД. Папки `apps/server/src/domain/keys/` ещё нет — создать. Формат публичный: по нему ключи находят сканеры секретов, его печатают `key:generate` (EPIC-10) и режимы запуска (EPIC-11), поэтому все параметры ниже менять нельзя.

1. `base62.ts` — кодирование числа в base62 фиксированной длины:

   ```ts
   export const base62Alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   export function encodeBase62(value: bigint, length: number): string
   ```

   Цифры идут от старшей к младшей, результат дополняется слева символом `0` до `length`. Если число не помещается в `length` символов — `throw new Error("Value does not fit into base62 length")`.

2. `key-format.ts` — типы ключей и их префиксы:

   ```ts
   export const keyTypes = ["publicKey", "serverKey", "botKey", "webhookSecret"] as const;
   export type KeyType = (typeof keyTypes)[number];
   export const keyPrefixes: Record<KeyType, string> = {
     publicKey: "pk",
     serverKey: "sk",
     botKey: "bk",
     webhookSecret: "whsec",
   };
   export interface ParsedKey {
     type: KeyType;
     text: string;
     lookupPrefix: string;
   }
   export function generateKey(type: KeyType): string
   export function parseKey(text: string, type: KeyType): ParsedKey | undefined
   ```

3. Устройство ключа `generateKey(type)`:
   - тело — 32 байта из `randomBytes(32)` (`node:crypto`), переведённые в `bigint` (`BigInt("0x" + bytes.toString("hex"))`) и закодированные `encodeBase62(value, 43)`. 43 символа base62 вмещают любые 32 байта;
   - контрольная сумма — `crc32` из `node:zlib` от строки `<префикс>_<тело>`, закодированная `encodeBase62(BigInt(crc), 6)`;
   - ключ — `<префикс>_<тело>_<контрольная сумма>`, например `sk_` + 43 символа + `_` + 6 символов: 53 символа у `sk_`, `pk_`, `bk_` и 56 у `whsec_`.

4. `parseKey(text, type)` возвращает `undefined`, если:
   - строка не начинается с `<префикс ожидаемого типа>_`;
   - остаток после префикса не делится по `_` ровно на две части;
   - тело не 43 символа или контрольная сумма не 6 символов, или в них есть символы не из `base62Alphabet`;
   - контрольная сумма не совпадает с пересчитанной (обычное сравнение строк: контрольная сумма не секрет).

   Иначе возвращает `{ type, text, lookupPrefix }`, где `lookupPrefix` — `<префикс>_` и первые 12 символов тела, например `sk_7Hc2kQ9xLmPa`. Это публичный идентификатор ключа для колонки `api_keys.prefix`, списков ключей и журнала аудита.

## Где

- `apps/server/src/domain/keys/base62.ts`, `apps/server/src/domain/keys/key-format.ts` — новые файлы.
- Тесты: `apps/server/src/domain/keys/base62.spec.ts`, `apps/server/src/domain/keys/key-format.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`).

## Требования из плана

- Формат ключа: префикс типа + 32 случайных байта + контрольная сумма, например `sk_7Hc2…_1a2b3c`. По префиксу (`pk_`, `sk_`, `bk_`, `whsec_`) ключ находят сканеры секретов в Git и логах, а контрольная сумма отсекает опечатки до запроса к БД.
- Ключ показывается один раз при создании.
- Решения по кодировке, контрольной сумме, длине и `lookupPrefix` — `tasks/EPIC-9/decisions.md`.

## Документация

- https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
- https://nodejs.org/api/zlib.html#zlibcrc32data-value

## Критерии приёмки

- `encodeBase62(0n, 6)` — `000000`, `encodeBase62(61n, 2)` — `0z`, `encodeBase62(62n, 2)` — `10`; число, которое не помещается в длину, даёт ошибку.
- Ключ каждого из четырёх типов имеет свой префикс и длину (53 или 56 символов), проходит `parseKey` со своим типом, а `lookupPrefix` равен префиксу с первыми 12 символами тела; два ключа подряд различаются.
- Ключ с любым одним изменённым символом тела или контрольной суммы (замена на другой символ base62) отклоняется `parseKey`.
- Ключ одного типа отклоняется при разборе как другой тип (`sk_` как `botKey`), строки неверной длины, с лишним `_` и с символами вне base62 отклоняются.

## Чего не делать

- Не хешировать и не сохранять ключи — это TASK-6.
- Не создавать `index.ts` в папке: barrel-файлы в `apps/server` не используем.

## История доработок

—
