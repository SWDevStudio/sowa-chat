# EPIC-12 / TASK-4. Подпись и проверка токенов через jose: только EdDSA, kid, aud, срок

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/infra/tokens/tokens.service.ts, apps/server/src/infra/tokens/tokens.module.ts, apps/server/src/infra/tokens/tokens.service.spec.ts, apps/server/.env.test
Коммит: [SERVER]: sign and verify EdDSA tokens with key rotation
Ветка: feature/EPIC-12

## Что сделать

Сервис, который подписывает и проверяет наши JWT (токены операторов, позже посетителей) библиотекой `jose` ключами из `tokenSigningConfig` (TASK-1, `apps/server/src/infra/config/token-signing.config.ts`). Папки `apps/server/src/infra/tokens/` ещё нет — создать. В `apps/server/src/infra/crypto/` не класть: там шифрование секретов EPIC-9.

1. `tokens.service.ts`:

   ```ts
   export const tokenAudiences = ["operator", "visitor"] as const;
   export type TokenAudience = (typeof tokenAudiences)[number];

   export interface SignTokenInput {
     audience: TokenAudience;
     subject: string;
     claims: Record<string, string>;
     ttlSeconds: number;
   }

   export interface SignedToken {
     token: string;
     expiresAt: Date;
   }

   export interface VerifiedToken {
     subject: string;
     claims: JWTPayload;
   }
   ```

   `JWTPayload` — тип из `jose`.

   `@Injectable() TokensService`, в конструкторе `@Inject(tokenSigningConfig.KEY) config: ConfigType<typeof tokenSigningConfig>`. В конструкторе один раз строятся `Map` `kid` → `publicKey` и текущий ключ — элемент `config.keys` с `kid === config.currentKeyId` или `undefined`.

   - `async sign(input: SignTokenInput): Promise<SignedToken>`:
     1. текущего ключа нет — `throw new Error("SOWA_TOKEN_SIGNING_KEYS is not set")` (так же ведёт себя `EncryptionService` без ключей);
     2. `issuedAt = Math.floor(Date.now() / 1000)`, `expiresAt = issuedAt + input.ttlSeconds`;
     3. `new SignJWT({ ...input.claims })`, `.setProtectedHeader({ alg: "EdDSA", kid, typ: "JWT" })`, `.setSubject(input.subject)`, `.setAudience(input.audience)`, `.setIssuedAt(issuedAt)`, `.setExpirationTime(expiresAt)`, `.sign(privateKey)` — стандартные поля ставятся после `claims` и перекрывают одноимённые;
     4. результат — `{ token, expiresAt: new Date(expiresAt * 1000) }`.
   - `async verify(token: string, audience: TokenAudience): Promise<VerifiedToken | undefined>`:
     1. `jwtVerify(token, getKey, { algorithms: ["EdDSA"], audience, requiredClaims: ["sub", "exp", "iat"] })`;
     2. `getKey(header)` возвращает публичный ключ по `header.kid`; `kid` нет или он не в `Map` — бросает ошибку;
     3. любая ошибка `jwtVerify` (подпись, `alg`, `kid`, срок, `aud`, формат) — `undefined`, без логирования токена;
     4. успех — `{ subject: payload.sub, claims: payload }`.
   - Ротация: проверка принимает токен с любым `kid` из `config.keys`, подпись — только текущим ключом.
   - Ключей нет (development без EPIC-11) — `verify` возвращает `undefined`.

2. `tokens.module.ts` — `TokensModule`: `providers: [TokensService]`, `exports: [TokensService]`. В `api.module.ts` не подключать: его импортируют модули, которым он нужен (`OperatorsModule` в TASK-8, `OperatorAuthModule` в TASK-10).

3. `apps/server/.env.test`: после блока `SOWA_S3_*` пустая строка и тестовый ключ — его используют e2e TASK-8, TASK-9, TASK-10, TASK-12:

   ```
   SOWA_TOKEN_SIGNING_KEYS=test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f
   SOWA_TOKEN_SIGNING_KEY_ID=test-1
   ```

## Где

- `apps/server/src/infra/tokens/tokens.service.ts`, `apps/server/src/infra/tokens/tokens.module.ts` — новые файлы.
- `apps/server/.env.test`.
- Читать: `apps/server/src/infra/config/token-signing.config.ts`, `apps/server/src/infra/config/token-signing-keys.schema.ts`, `apps/server/src/infra/crypto/encryption.service.ts` (образец сервиса на конфиге).
- Тест: `apps/server/src/infra/tokens/tokens.service.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`). Сервис создаётся напрямую: `new TokensService({ keys, currentKeyId })`, ключи — через `tokenSigningKeysSchema.parse("test-1:…,test-2:…")`. Тестовые ключи `test-1` и `test-2` — в `decisions.md` и TASK-1. Время — `vi.useFakeTimers({ toFake: ["Date"] })` и `vi.setSystemTime`.

## Требования из плана

- Токены посетителей и операторов (JWT) не хранятся у нас: проверяются по подписи без обращения к БД.
- Ключ подписи токенов — пара Ed25519 с `kid`; при ротации старые токены проверяются старым ключом до истечения.
- Проверка токена Ed25519 — около 150 мкс; объекты ключей создаются один раз при старте (TASK-1), а не разбираются из PEM на каждом запросе.
- Утёк ключ подписи — ротация, посетители и операторы незаметно переподключаются.
- `jose` вместо `@nestjs/jwt` — принятое исключение (CLAUDE.md, раздел «Библиотеки»): jsonwebtoken не умеет EdDSA.

## Документация

- https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md
- https://github.com/panva/jose/blob/main/docs/jwt/verify/functions/jwtVerify.md

## Критерии приёмки

- Токен, подписанный текущим ключом `test-1` с `audience: "operator"`, проходит `verify(token, "operator")`: `subject` и `claims` совпадают с переданными, в заголовке `alg` `EdDSA` и `kid` `test-1`, `expiresAt` равен `iat + ttlSeconds`.
- Ротация: токен сервиса с ключами `[test-1]` и текущим `test-1` проходит проверку сервиса с ключами `[test-1, test-2]` и текущим `test-2`, а новый токен второго сервиса подписан `kid` `test-2`; сервис только с `[test-1]` токен с `kid` `test-2` отклоняет.
- `verify` возвращает `undefined` для: токена с заголовком `alg: "none"`, токена HS256, подписанного байтами публичного ключа, токена с `alg: "Ed25519"`, токена с изменённым payload, токена без `kid`.
- `verify` возвращает `undefined` для просроченного токена (время сдвинуто на `ttlSeconds + 1` секунду) и для токена `operator` при проверке с `"visitor"`.
- Без ключей `sign` бросает `SOWA_TOKEN_SIGNING_KEYS is not set`, `verify` возвращает `undefined`.

## Чего не делать

- Не делать выдачу токенов операторам и посетителям — это TASK-8 и эпик сессии посетителя.
- Не регистрировать ключ в механизме секретов development — это EPIC-11 TASK-1.
- Не кэшировать результаты проверки токенов.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
