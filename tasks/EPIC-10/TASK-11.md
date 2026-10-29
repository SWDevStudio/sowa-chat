# EPIC-10 / TASK-11. Команды identity-key:add, identity-key:list и identity-key:revoke

Исполнитель: haiku
Зависит от: TASK-9, TASK-10
Владеет: apps/server/src/cli/identity-keys/identity-key-add.command.ts, apps/server/src/cli/identity-keys/identity-key-list.command.ts, apps/server/src/cli/identity-keys/identity-key-revoke.command.ts, apps/server/src/cli.module.ts, apps/server/test/identity-key-commands.e2e-spec.ts
Коммит: [SERVER]: add identity-key cli commands
Ветка: feature/EPIC-10

## Что сделать

Тонкие команды над `IdentityKeysService` (`apps/server/src/domain/keys/identity-keys.service.ts`, TASK-10). Проект по имени — `ProjectsService.getByName`. Образцы — `apps/server/src/cli/keys/` (TASK-9). `KeysModule` и `ProjectsModule` уже подключены в `CliModule`. Ошибку команда не ловит: её печатает `runCliCommand`.

1. `identity-key-add.command.ts` — `IdentityKeyAddCommand`, `identity-key:add --project <name> --kid <kid> --file <path>` (все три `required: true`), description `Register a public identity key of the site backend`:
   - файл читается `readFile(path, "utf8")` из `node:fs/promises`; ошибка чтения → `Error(`Cannot read file "${path}"`)`;
   - `identityKeys.add({ projectId, kid, pem, actorKind: "cli" })`;
   - stdout: `kid: <kid>` и `alg: <alg>`.

2. `identity-key-list.command.ts` — `IdentityKeyListCommand`, `identity-key:list --project <name>` (`required: true`), description `List identity keys of a project`: `writeTable(["kid", "alg", "createdAt", "status"], rows)`, `status` — `revoked` или `active`, дата — `formatDate`. Сам ключ (JWK) не выводится.

3. `identity-key-revoke.command.ts` — `IdentityKeyRevokeCommand`, `identity-key:revoke --project <name> --kid <kid>` (оба `required: true`), description `Revoke an identity key`: `revoke` вернул `false` → `Error(`No active identity key "${kid}" in project "${project}"`)`; успех — stdout `revoked: <kid>`.

4. `CliModule`: `providers` — три команды.

## Где

- `apps/server/src/cli/identity-keys/` — новые файлы команд.
- `apps/server/src/cli.module.ts` — правка.
- Тест: `apps/server/test/identity-key-commands.e2e-spec.ts` (e2e через `runCliInProcess` из `apps/server/test/support/cli-run.ts`). PEM-файлы тест пишет во временную папку (`mkdtempSync` из `node:fs`, `tmpdir()`): публичные Ed25519 и P-256, приватный Ed25519, RSA — через `generateKeyPairSync` из `node:crypto`.

## Требования из плана

- Интегратор сам генерирует пару (`openssl genpkey -algorithm ed25519` или `openssl ecparam -name prime256v1 -genkey`) и регистрирует у нас только публичную половину: `sowa-chat identity-key:add --project main --kid … --file identity-public.pem`.
- Утёк приватный identity-ключ — новый ключ с новым `kid`, отзыв старого.

## Документация

- https://docs.nestjs.com/recipes/nest-commander
- https://nodejs.org/api/fs.html#fspromisesreadfilepath-options

## Критерии приёмки

- `identity-key:add` с публичными PEM Ed25519 и P-256 — код 0, в stdout `alg: EdDSA` и `alg: ES256`, в `identity_keys` две строки, в `audit_log` — `identityKey.added`.
- RSA-ключ, приватный ключ, несуществующий файл и повторный `kid` — код 1 с сообщением в stderr, новых строк в `identity_keys` нет.
- `identity-key:list` показывает `kid`, `alg`, дату и `active`; после `identity-key:revoke` — `revoked`, в `audit_log` — `identityKey.revoked`; повторный `identity-key:revoke` — код 1.

## Чего не делать

- Не разбирать PEM и не проверять `kid` в командах — это делает сервис.
- Не проверять identity-JWT — это эпик идентификации посетителя.

## История доработок

—
