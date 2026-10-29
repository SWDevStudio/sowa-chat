# EPIC-10 / TASK-14. Команда secrets:reencrypt: --dry-run, итог и журнал аудита

Исполнитель: sonnet
Зависит от: TASK-7, TASK-12, TASK-13
Владеет: apps/server/src/cli/secrets/secrets-reencrypt.command.ts, apps/server/src/cli.module.ts, apps/server/src/infra/crypto/secrets-reencryption.service.ts, apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts, apps/server/test/secrets-reencryption.e2e-spec.ts, apps/server/test/secrets-reencrypt-command.e2e-spec.ts
Коммит: [SERVER]: add secrets:reencrypt cli command with dry run and audit
Ветка: feature/EPIC-10

## Что сделать

Команда над `SecretsReencryptionService` (`apps/server/src/infra/crypto/secrets-reencryption.service.ts`, TASK-7) и `SecretsReencryptionModule`.

1. Событие в `apps/server/src/telemetry/events/domain-events.ts`:

   ```ts
   export interface SecretsReencryptedEvent {
     reencrypted: number;
     undecryptable: number;
     actorKind: "cli";
   }
   ```

   В `DomainEvents` — `"secrets.reencrypted": SecretsReencryptedEvent`.

2. Правило журнала в `apps/server/src/domain/audit/audited-events.ts`: `{ projectId: null, actorKind: event.actorKind, actorId: null, targetKind: "encryptedSecrets", targetId: null, data: { reencrypted, undecryptable } }`. Значений, таблиц и ID записей в журнале нет.

3. `SecretsReencryptionService.reencrypt` получает параметр `input: ReencryptInput` (`export interface ReencryptInput { actorKind: "cli" }`) и в конце, после всех полей, публикует `secrets.reencrypted` через `DomainEventBus` (`await`, `@Inject(DomainEventBus)` в конструкторе): `reencrypted` — сумма по полям, `undecryptable` — длина списка. Если `reencrypt` прервался ошибкой, событие не публикуется. `countVersions` событий не публикует. Вызовы `reencrypt()` в `apps/server/test/secrets-reencryption.e2e-spec.ts` (TASK-7) поменять на `reencrypt({ actorKind: "cli" })`, остальное в этом тесте не трогать.

4. `apps/server/src/cli/secrets/secrets-reencrypt.command.ts` — `SecretsReencryptCommand`, `secrets:reencrypt [--dry-run]`, description `Re-encrypt stored secrets with the current encryption key`:
   - с `--dry-run` — `countVersions()` и `writeTable(["field", "version", "count"], rows)`, `field` — `<table>.<column>`, `version` — `v<число>` или `unknown`; ничего не меняется, журнал не пишется;
   - без `--dry-run` — `reencrypt({ actorKind: "cli" })` и `writeTable(["field", "reencrypted"], rows)`; затем для каждого нерасшифрованного значения строка `undecryptable: <table>.<column> <id>`;
   - если нерасшифрованные значения есть — после вывода `Error(`${count} values cannot be decrypted`)` (код 1);
   - реестр пуст — одна строка `no encrypted fields registered`, код 0 (журнал без `--dry-run` всё равно пишется с нулями).

5. `CliModule`: `imports` — добавить `SecretsReencryptionModule`; `providers` — `SecretsReencryptCommand`.

## Где

- `apps/server/src/cli/secrets/secrets-reencrypt.command.ts` — новый файл.
- `apps/server/src/cli.module.ts`, `apps/server/src/infra/crypto/secrets-reencryption.service.ts` — правка.
- `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts` — событие и правило.
- Тесты: `apps/server/src/domain/audit/audited-events.spec.ts`, `apps/server/test/secrets-reencrypt-command.e2e-spec.ts` (e2e через `runCliInProcess`). Тестовое поле: тест создаёт таблицу `test_secrets` как в `apps/server/test/secrets-reencryption.e2e-spec.ts` (TASK-7) и на время теста добавляет `{ table: "test_secrets", column: "secret" }` в `registeredEncryptedFields`, потом убирает. Ключи шифрования — `vi.stubEnv("SOWA_ENCRYPTION_KEYS", …)` до запуска команды; если конфиг к этому моменту уже прочитан — `vi.resetModules()` и динамический импорт `cli-runner.js` и `registered-encrypted-fields.js`, как в `apps/server/test/support/unit-probe.ts`.

## Требования из плана

- При ротации записи перешифровывает команда CLI `secrets:reencrypt`. Ротация — редкая ручная операция, и фоновая задача для неё не нужна.
- Порядок ротации: добавить новый ключ в `SOWA_ENCRYPTION_KEYS` и перезапустить сервис → `secrets:reencrypt` → `--dry-run` показывает, что старой версии не осталось → убрать старый ключ из env.
- Запуск пишется в журнал аудита: кто запустил (`cli`) и сколько перешифровано, без значений.

## Документация

- https://docs.nestjs.com/recipes/nest-commander

## Критерии приёмки

- `secrets:reencrypt --dry-run` при значениях версии 1 и ключах 1 и 2 — строка `test_secrets.secret	v1	<N>`, данные в БД и `audit_log` не меняются.
- `secrets:reencrypt` — код 0, строка `test_secrets.secret	<N>`, все значения версии 2; в `audit_log` одна запись `secrets.reencrypted` с `actorKind` `cli`, `projectId` `null`, `data` `{ reencrypted: N, undecryptable: 0 }`; затем `--dry-run` показывает только `v2`.
- Нерасшифровываемое значение: код 1, строка `undecryptable: test_secrets.secret <id>`, значение в БД не изменилось, в журнале `undecryptable: 1`; ни в выводе, ни в `audit_log` нет открытых значений секретов.

## Чего не делать

- Не менять логику пачек и отбора из TASK-7.
- Не делать фоновую задачу в `worker`.

## История доработок

—
