# EPIC-10 / TASK-10. Сервис identity-ключей: добавление, список, отзыв и журнал аудита

Исполнитель: sonnet
Зависит от: TASK-5, TASK-6
Владеет: apps/server/src/domain/keys/identity-keys.repository.ts, apps/server/src/domain/keys/identity-keys.service.ts, apps/server/src/domain/keys/keys.module.ts, apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts, apps/server/test/identity-keys.e2e-spec.ts
Коммит: [SERVER]: add identity keys service with audit events
Ветка: feature/EPIC-10

## Что сделать

Хранение публичных identity-ключей сайта. Таблица и сущность уже есть (`apps/server/src/domain/keys/identity-key.entity.ts`, `IdentityKey`, уникальность `UQ_identity_keys_project_id_kid`), разбор PEM — `parseIdentityPublicKey` из `apps/server/src/domain/keys/identity-key-pem.ts` (TASK-5). Репозитория и сервиса нет. Образец — `ApiKeysRepository` и `ApiKeysService` в той же папке.

1. `identity-keys.repository.ts` — `IdentityKeysRepository` на `TransactionHost`:

   ```ts
   export interface NewIdentityKey { projectId: string; kid: string; alg: IdentityKeyAlgorithm; publicKey: JWK }

   create(input: NewIdentityKey): Promise<IdentityKey>
   findByKid(projectId: string, kid: string): Promise<IdentityKey | null>
   findByProject(projectId: string): Promise<IdentityKey[]>          // order: { createdAt: "ASC" }
   revokeByKid(projectId: string, kid: string): Promise<IdentityKey | undefined>
   ```

   `revokeByKid` — условный `UPDATE … SET revoked_at = now() WHERE project_id = :projectId AND kid = :kid AND revoked_at IS NULL`; ничего не изменилось — `undefined`, иначе строка после обновления (как `revokeByPrefix`).

2. Событие в `apps/server/src/telemetry/events/domain-events.ts` (литералы):

   ```ts
   export interface IdentityKeyEvent {
     identityKeyId: string;
     projectId: string;
     kid: string;
     alg: "EdDSA" | "ES256";
     actorKind: "cli" | "system";
   }
   ```

   В `DomainEvents` — `"identityKey.added": IdentityKeyEvent` и `"identityKey.revoked": IdentityKeyEvent`.

3. Правило журнала в `apps/server/src/domain/audit/audited-events.ts` для обоих событий: `{ projectId, actorKind, actorId: null, targetKind: "identityKey", targetId: identityKeyId, data: { kid, alg } }`. Самого ключа в журнале нет.

4. `identity-keys.service.ts` — `IdentityKeysService`:

   ```ts
   export interface AddIdentityKeyInput { projectId: string; kid: string; pem: string; actorKind: KeyActorKind }
   export interface AddedIdentityKey { identityKeyId: string; kid: string; alg: IdentityKeyAlgorithm }
   export interface RevokeIdentityKeyInput { projectId: string; kid: string; actorKind: KeyActorKind }
   export class IdentityKeyKidTakenError extends Error   // `Identity key "${kid}" already exists in this project`
   export class InvalidIdentityKeyIdError extends Error  // `Invalid kid "${kid}": use 1-128 characters A-Z, a-z, 0-9, ".", "_", "-"`

   @Transactional() add(input: AddIdentityKeyInput): Promise<AddedIdentityKey>
   list(projectId: string): Promise<IdentityKey[]>
   @Transactional() revoke(input: RevokeIdentityKeyInput): Promise<boolean>
   ```

   `KeyActorKind` — из `api-keys.service.ts`. `add`: `kid` проверяется регуляркой `^[A-Za-z0-9._-]{1,128}$` → `parseIdentityPublicKey(pem)` → `findByKid` нашёл ключ (в том числе отозванный) — `IdentityKeyKidTakenError` → `create` → `publish("identityKey.added", …)`. `revoke`: `revokeByKid` вернул `undefined` — `false`; иначе `publish("identityKey.revoked", …)` и `true`. Публикация — через `await`, без `Promise.all`.

5. `KeysModule`: `providers` — добавить `IdentityKeysRepository`, `IdentityKeysService`; `exports` — `[ApiKeysService, IdentityKeysService]`.

## Где

- `apps/server/src/domain/keys/` — новые `identity-keys.repository.ts`, `identity-keys.service.ts`; правка `keys.module.ts`.
- `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts` — событие и правило.
- Тесты: `apps/server/src/domain/audit/audited-events.spec.ts` (правила), `apps/server/test/identity-keys.e2e-spec.ts` (e2e на `WorkerModule` с `KeysModule`, как `apps/server/test/api-keys.e2e-spec.ts`; проект — `createProject` из `test/support/fixtures.ts`; PEM — `generateKeyPairSync` из `node:crypto`).

## Требования из плана

- `identity_keys`: `id, project_id, kid, alg (EdDSA|ES256), public_key (JWK), created_at, revoked_at?`.
- Алгоритм хранится вместе с ключом, и в заголовке JWT разрешается только он.
- Приватный ключ у нас не появляется.
- Утёк приватный identity-ключ — новый ключ с новым `kid`, отзыв старого.
- События уровня проекта (ключи, удаления, блокировки) пишутся в `audit_log`.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://github.com/panva/jose/blob/main/docs/types/interfaces/JWK.md

## Критерии приёмки

- `add` с публичным PEM Ed25519 и P-256 сохраняет строку с `alg` `EdDSA` и `ES256` и JWK без `d`; в `audit_log` — `identityKey.added` с `data` `{ kid, alg }`.
- Повторный `kid` в том же проекте (и после отзыва) — `IdentityKeyKidTakenError`, тот же `kid` в другом проекте сохраняется; неверный `kid` и приватный PEM — ошибка, строк нет.
- `revoke` ставит `revoked_at` и пишет `identityKey.revoked`; повторный `revoke` и неизвестный `kid` — `false` без новой записи журнала.
- `list` возвращает ключи проекта по дате создания, ключи других проектов в список не попадают.

## Чего не делать

- Не делать команды CLI — это TASK-11.
- Не проверять identity-JWT — это эпик идентификации посетителя.

## История доработок

—
