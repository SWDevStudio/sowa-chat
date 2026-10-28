# EPIC-10 / TASK-9. Команды key:create, key:list и key:revoke

Исполнитель: sonnet
Зависит от: TASK-8
Владеет: apps/server/src/domain/keys/api-keys.repository.ts, apps/server/src/domain/keys/api-keys.service.ts, apps/server/src/cli/keys/key-create.command.ts, apps/server/src/cli/keys/key-list.command.ts, apps/server/src/cli/keys/key-revoke.command.ts, apps/server/src/cli.module.ts, apps/server/test/key-commands.e2e-spec.ts
Коммит: [SERVER]: add key:create, key:list and key:revoke cli commands
Ветка: feature/EPIC-10

## Что сделать

Команды для serverKey над `ApiKeysService` (`apps/server/src/domain/keys/api-keys.service.ts`): выпуск и отзыв уже есть, события аудита `apiKey.issued` и `apiKey.revoked` публикует сервис. Проект по имени — `ProjectsService.getByName` (TASK-6). Образцы команд — `apps/server/src/cli/projects/` (TASK-8).

1. Список ключей в домене:
   - `ApiKeysRepository.findByProject(projectId: string, kind: ApiKeyKind): Promise<ApiKey[]>` — `order: { createdAt: "ASC" }`;
   - `ApiKeysService.list(projectId: string, kind: ApiKeyKind): Promise<ApiKeySummary[]>`:

     ```ts
     export interface ApiKeySummary {
       prefix: string;
       createdAt: Date;
       lastUsedAt: Date | null;
       revokedAt: Date | null;
     }
     ```

     Без `keyHash` и `id`.

2. `key-create.command.ts` — `KeyCreateCommand`, `key:create --project <name>` (`required: true`), description `Issue a new serverKey for a project`:
   - `getByName(project)` → `apiKeys.issue({ projectId, kind: "server", actorKind: "cli" })`;
   - stdout: `prefix: <prefix>` и `serverKey: sk_…`; stderr — `serverKey is shown only once: store it in your secret storage now`;
   - старые ключи проекта не трогаются.

3. `key-list.command.ts` — `KeyListCommand`, `key:list --project <name>` (`required: true`), description `List serverKeys of a project`:
   - `writeTable(["prefix", "createdAt", "lastUsedAt", "status"], rows)`, `status` — `revoked`, если `revokedAt` есть, иначе `active`; даты — `formatDate`;
   - только ключи `server`.

4. `key-revoke.command.ts` — `KeyRevokeCommand`, `key:revoke --prefix <prefix>` (`required: true`), description `Revoke a serverKey by its prefix`:
   - `prefix` не начинается с `sk_` → `Error("Prefix must start with sk_")`;
   - `apiKeys.revoke({ prefix, actorKind: "cli" })` вернул `false` → `Error(`No active server key with prefix "${prefix}"`)`;
   - успех — stdout `revoked: <prefix>`.

5. `CliModule`: `imports` — добавить `KeysModule`; `providers` — три команды.

`key:revoke` сбрасывает кэш реплик только через событие `apiKey.revoked`; доставку по Redis делает EPIC-14 (`tasks/EPIC-10/decisions.md`, раздел про Redis).

## Где

- `apps/server/src/domain/keys/api-keys.repository.ts`, `apps/server/src/domain/keys/api-keys.service.ts` — правка.
- `apps/server/src/cli/keys/` — новые файлы команд; `apps/server/src/cli.module.ts` — правка.
- Тест: `apps/server/test/key-commands.e2e-spec.ts` (e2e через `runCliInProcess`, проект создаётся командой `project:create` или `ProjectsService`). Заглушка репозитория в `apps/server/test/support/api-keys-service-probe.ts` не меняется: новый метод в ней не нужен.

## Требования из плана

- Ротация serverKey: на время замены активны два ключа. Порядок: `key:create` → новый ключ в секреты админки и деплой → `last_used_at` старого ключа перестал расти → `key:revoke`.
- У всех ключей есть `last_used_at`, создание и отзыв пишутся в журнал аудита.
- Ключ показывается один раз при создании.

## Документация

- https://docs.nestjs.com/recipes/nest-commander

## Критерии приёмки

- После `key:create --project main` оба ключа проекта (из `project:create` и новый) проходят `ApiKeysService.verify(…, "server")`; в `audit_log` есть `apiKey.issued` для нового ключа.
- `key:list --project main` показывает оба ключа со `status` `active`, без открытых ключей и хешей; после `key:revoke` у отозванного — `revoked`.
- После `key:revoke --prefix <prefix>` отозванный ключ не проходит `verify`, второй проходит; в `audit_log` есть `apiKey.revoked`; повторный `key:revoke` того же `prefix` и `prefix` с `bk_` — код 1 с сообщением.
- `key:create --project unknown` — код 1, `error: Project "unknown" not found`.

## Чего не делать

- Не делать команды для ключей ботов — это эпик ботов.
- Не подключать Redis и не рассылать сброс кэша — это EPIC-14.
- Не печатать ключи в лог.

## История доработок

—
