# EPIC-9 / TASK-6. Выпуск, проверка по хешу и отзыв ключей server и bot

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2, TASK-3
Владеет: apps/server/src/domain/keys/key-hash.ts, apps/server/src/domain/keys/api-keys.repository.ts, apps/server/src/domain/keys/api-keys.service.ts, apps/server/src/domain/keys/keys.module.ts, apps/server/src/domain/keys/api-keys.service.spec.ts, apps/server/test/api-keys.e2e-spec.ts
Ветка: feature/EPIC-9

## Что сделать

Сервис ключей `server` и `bot` на формате из TASK-1 (`apps/server/src/domain/keys/key-format.ts`), таблице из TASK-2 (`apps/server/src/domain/keys/api-key.entity.ts`) и событиях из TASK-3 (`apps/server/src/telemetry/events/domain-events.ts`).

1. `key-hash.ts`: `export function hashKey(key: string): Buffer` — `createHash("sha256").update(key).digest()`. Функцию потом использует EPIC-11 для ключа из `SOWA_INIT_SERVER_KEY`.

2. `api-keys.repository.ts` — `ApiKeysRepository`, только через `TransactionHost` (образец — `apps/server/src/domain/projects/projects.repository.ts`):
   - `create(input: NewApiKey): Promise<ApiKey>`, где `NewApiKey { projectId: string; kind: ApiKeyKind; prefix: string; keyHash: Buffer; botId: string | null }`;
   - `findByPrefix(prefix: string): Promise<ApiKey | null>`;
   - `touchLastUsedAt(id: string): Promise<void>` — один `UPDATE` через QueryBuilder: `SET last_used_at = now() WHERE id = :id AND (last_used_at IS NULL OR last_used_at < now() - interval '1 minute')`. Условие в самом запросе, поэтому правило «не чаще раза в минуту» держится и при нескольких репликах, без памяти процесса;
   - `revokeByPrefix(prefix: string): Promise<ApiKey | undefined>` — `UPDATE ... SET revoked_at = now() WHERE prefix = :prefix AND revoked_at IS NULL`; если `affected` равно 0 — `undefined`, иначе строка, прочитанная `findByPrefix`.

3. `api-keys.service.ts` — `ApiKeysService` и типы:

   ```ts
   export type KeyActorKind = Extract<ActorKind, "cli" | "system">;
   export interface IssueApiKeyInput { projectId: string; kind: ApiKeyKind; botId?: string; actorKind: KeyActorKind }
   export interface IssuedApiKey { apiKeyId: string; prefix: string; key: string }
   export interface VerifiedApiKey { apiKeyId: string; projectId: string; botId: string | null }
   export interface RevokeApiKeyInput { prefix: string; actorKind: KeyActorKind }
   ```

   `ActorKind` — из `apps/server/src/domain/audit/actor-kind.ts`. Вид ключа и тип формата: `server` → `serverKey`, `bot` → `botKey`.

   - `@Transactional() issue(input): Promise<IssuedApiKey>` — `generateKey`, `parseKey` того же ключа ради `lookupPrefix`, `create` с `hashKey(key)` и `botId ?? null`, затем `await bus.publish("apiKey.issued", ...)`. Возвращает открытый ключ один раз; ключ нигде не сохраняется и не логируется. Выпуск нового ключа старые не отзывает.
   - `verify(key: string, kind: ApiKeyKind): Promise<VerifiedApiKey | undefined>`, по шагам:
     1. `parseKey(key, тип)`; `undefined` — сразу `undefined`, без запроса к БД;
     2. `findByPrefix(lookupPrefix)`; нет строки — `undefined`;
     3. `row.kind !== kind` — `undefined`;
     4. хеш `hashKey(key)` сравнивается с `row.keyHash` через `crypto.timingSafeEqual`; если длины разные — `undefined` без вызова `timingSafeEqual`; не совпал — `undefined`;
     5. `row.revokedAt` не пустой — `undefined`;
     6. `await touchLastUsedAt(row.id)`, результат — `{ apiKeyId, projectId, botId }`.
   - `@Transactional() revoke(input): Promise<boolean>` — `revokeByPrefix`; `undefined` (нет ключа или уже отозван) — `false` без события; иначе `await bus.publish("apiKey.revoked", ...)` и `true`.
   - Данные событий — `ApiKeyEvent`: `apiKeyId`, `projectId`, `kind`, `prefix` (публичный `lookupPrefix`), `botId`, `actorKind` из входа. Открытого ключа и хеша в событии нет.
   - В одной транзакции события публикуются строго по очереди через `await`. `Promise.all` с `publish` или с записью в БД запрещён: журнал аудита пишет точкой сохранения, и параллельные точки в одной транзакции перемешаются (решение EPIC-8).

4. `keys.module.ts` — `KeysModule`: `providers: [ApiKeysRepository, ApiKeysService]`, `exports: [ApiKeysService]`. В модули режимов (`api.module.ts`, `worker.module.ts`, `cli.module.ts`) не подключать: его подключат эпики, которые им пользуются (CLI, доступ бекенда). `DomainEventBus` глобальный (`TelemetryModule`).

## Где

- `apps/server/src/domain/keys/` — новые файлы из списка «Владеет».
- Читать: `apps/server/src/domain/keys/key-format.ts`, `apps/server/src/domain/keys/api-key.entity.ts`, `apps/server/src/telemetry/events/domain-event-bus.ts`, `apps/server/src/domain/projects/projects.repository.ts`.
- Тесты: `apps/server/src/domain/keys/api-keys.service.spec.ts` (unit, репозиторий и шина — заглушки) и `apps/server/test/api-keys.e2e-spec.ts` (e2e: `Test.createTestingModule({ imports: [WorkerModule, KeysModule] })`, база — `useTestDatabase`, проект — `createProject`, как в `apps/server/test/audit-log.e2e-spec.ts`).

## Требования из плана

- Ключи `server` и `bot` хранятся как SHA-256-хеш: это случайные строки высокой энтропии, медленный bcrypt им не нужен. Ключ показывается один раз при создании.
- HMAC и ключи сравниваются через `crypto.timingSafeEqual`.
- Контрольная сумма отсекает опечатки до запроса к БД.
- У всех ключей есть `last_used_at`, создание и отзыв пишутся в журнал аудита.
- На время замены активны два ключа: выпуск нового не отзывает старый.

## Документация

- https://docs.nestjs.com/security/encryption-and-hashing
- https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional

## Критерии приёмки

- `verify` ключа с изменённым символом, ключа другого типа (`bk_` при `kind: "server"`) и мусорной строки возвращает `undefined` и не вызывает `findByPrefix` (unit).
- После `issue` в строке `api_keys` нет открытого ключа ни в одной колонке, `key_hash` равен SHA-256 ключа, `prefix` — `lookupPrefix`; выданный ключ проходит `verify` и возвращает проект (и `botId` у `bot`); два выпущенных ключа проекта проходят оба (e2e).
- После `revoke` ключ не проходит `verify`, повторный `revoke` возвращает `false`; ключ с верным `prefix`, но другим хешем не проходит (e2e).
- Две `verify` подряд меняют `last_used_at` один раз; если `last_used_at` сдвинуть на 2 минуты назад, следующая `verify` его обновляет (e2e).
- `issue` и `revoke` создают по одной записи `audit_log` с `action` `apiKey.issued` и `apiKey.revoked`, `target_id` — ID ключа; в записи нет открытого ключа; `issue` для несуществующего проекта падает и не оставляет ни строки ключа, ни записи журнала (e2e).

## Чего не делать

- Не делать guard для HTTP — это эпик доступа бекенда и операторов.
- Не кэшировать результат проверки — это эпик кэша.
- Не делать команды CLI и выпуск ключа из готовой строки (`SOWA_INIT_SERVER_KEY`) — это EPIC-10 и EPIC-11.
- Не подключать `KeysModule` в модули режимов.

## История доработок

—
