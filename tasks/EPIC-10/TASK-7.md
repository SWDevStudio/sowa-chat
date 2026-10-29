# EPIC-10 / TASK-7. Перешифровка секретов: реестр зашифрованных полей и перешифровка пачками

Исполнитель: sonnet
Зависит от: —
Владеет: apps/server/src/infra/crypto/encrypted-field.ts, apps/server/src/infra/crypto/registered-encrypted-fields.ts, apps/server/src/infra/crypto/secrets-reencryption.service.ts, apps/server/src/infra/crypto/secrets-reencryption.module.ts, apps/server/src/infra/crypto/encryption.service.ts, apps/server/src/infra/crypto/encryption.service.spec.ts, apps/server/test/secrets-reencryption.e2e-spec.ts
Коммит: [SERVER]: add encrypted fields registry and batched secrets reencryption
Ветка: feature/EPIC-10

## Что сделать

Логика будущей команды `secrets:reencrypt` (команда — TASK-14). Шифрование уже есть: `EncryptionService` (`apps/server/src/infra/crypto/encryption.service.ts`) с `encrypt`, `decrypt` и `SecretDecryptionError`, формат строки `v<версия>.<iv>.<шифротекст>.<тег>` (`encrypted-secret.ts`, `parseEncryptedSecret`). Текущая версия — самая большая версия в `SOWA_ENCRYPTION_KEYS`, ею шифрует `encrypt`.

1. `EncryptionService`: геттер `get currentVersion(): number | undefined` — версия `currentKey`, `undefined`, если ключей нет.

2. Реестр — `apps/server/src/infra/crypto/encrypted-field.ts`:

   ```ts
   export interface EncryptedField {
     table: string;
     column: string;
   }

   export const encryptedFields = Symbol("encryptedFields");
   ```

   и `apps/server/src/infra/crypto/registered-encrypted-fields.ts`:

   ```ts
   export const registeredEncryptedFields: EncryptedField[] = [];
   ```

   Сейчас список пуст; позже в него добавят `bots.transport_config` (эпик ботов) и `webhook_subscriptions.secret` (эпик исходящих событий). У таблицы каждого поля первичный ключ — колонка `id`. Сервис о таблицах не знает и работает только по токену `encryptedFields`.

3. `apps/server/src/infra/crypto/secrets-reencryption.service.ts`:

   ```ts
   export const reencryptionBatchSize = 500;

   export interface UndecryptableValue { table: string; column: string; id: string }
   export interface FieldReencryption { table: string; column: string; reencrypted: number }
   export interface ReencryptionReport { fields: FieldReencryption[]; undecryptable: UndecryptableValue[] }
   export interface FieldVersionCount { table: string; column: string; version: number | null; count: number }

   @Injectable()
   export class SecretsReencryptionService {
     reencrypt(): Promise<ReencryptionReport>
     countVersions(): Promise<FieldVersionCount[]>
   }
   ```

   Зависимости: `@Inject(encryptedFields) fields: EncryptedField[]`, `EncryptionService`, `TransactionHost<TransactionalAdapterTypeOrm>`.

   `reencrypt()`:
   - `currentVersion` — `undefined` → `Error("SOWA_ENCRYPTION_KEYS is not set")`.
   - Для каждого поля по очереди — пачки по `reencryptionBatchSize` с курсором по `id`:

     ```sql
     SELECT "id", "<column>" AS "value" FROM "<table>"
     WHERE "<column>" IS NOT NULL AND "<column>" NOT LIKE $1 [AND "id" > $2]
     ORDER BY "id" LIMIT 500
     ```

     `$1` — `v<currentVersion>.%`. Имена таблицы и колонки — через `driver.escape(...)` у `txHost.tx.connection`, значения — только параметрами.
   - Каждая пачка — своя транзакция `txHost.withTransaction(...)`. Для каждой строки: `decrypt(value)` → `encrypt(plaintext)` → `UPDATE "<table>" SET "<column>" = $1 WHERE "id" = $2 AND "<column>" = $3` (новое значение, `id`, старое значение). Счётчик `reencrypted` растёт, только если `UPDATE` изменил строку.
   - `SecretDecryptionError` при `decrypt` — строка не меняется, `{ table, column, id }` добавляется в `undecryptable`, обработка продолжается. Любая другая ошибка прерывает работу: текущая пачка откатывается, уже записанные пачки остаются.
   - Курсор — `id` последней строки пачки; пустая пачка — поле готово.
   - Повторный запуск продолжает с того, что осталось: уже перешифрованные значения не подходят под отбор.

   `countVersions()` — для каждого поля:

   ```sql
   SELECT substring("<column>" from '^v([0-9]+)\.') AS "version", count(*)::int AS "count"
   FROM "<table>" WHERE "<column>" IS NOT NULL GROUP BY 1 ORDER BY 1
   ```

   `version` — число или `null` для значений не в формате `v<версия>.`; ничего не меняет.

4. `apps/server/src/infra/crypto/secrets-reencryption.module.ts`:

   ```ts
   @Module({
     imports: [CryptoModule],
     providers: [SecretsReencryptionService, { provide: encryptedFields, useValue: registeredEncryptedFields }],
     exports: [SecretsReencryptionService],
   })
   export class SecretsReencryptionModule {}
   ```

   В `CliModule` модуль подключит TASK-14.

## Где

- `apps/server/src/infra/crypto/` — новые `encrypted-field.ts`, `registered-encrypted-fields.ts`, `secrets-reencryption.service.ts`, `secrets-reencryption.module.ts`; правка `encryption.service.ts`.
- Образец токена и списка — `auditRules` и `auditedEvents` (`apps/server/src/domain/audit/audit-rule.ts`, `audited-events.ts`, `audit.module.ts`).
- Тесты: `apps/server/src/infra/crypto/encryption.service.spec.ts` (`currentVersion`), `apps/server/test/secrets-reencryption.e2e-spec.ts`. В e2e тест сам создаёт таблицу `test_secrets ("id" uuid PRIMARY KEY DEFAULT uuidv7(), "secret" text)` и удаляет её в `afterAll`. Модуль собирается как `Test.createTestingModule({ imports: [WorkerModule, SecretsReencryptionModule] })` с `.overrideProvider(encryptedFields).useValue([{ table: "test_secrets", column: "secret" }])` и `.overrideProvider(encryptionConfig.KEY).useValue({ keys: [...] })`. Значения версии 1 тест шифрует отдельным `new EncryptionService({ keys: [ключ 1] })`.

## Требования из плана

- Ключ шифрования: в каждой зашифрованной записи хранится версия ключа; при ротации записи перешифровывает команда CLI `secrets:reencrypt`. Ротация — редкая ручная операция, и фоновая задача для неё не нужна.
- Утекли ключ шифрования вместе с дампом БД — ротация ключа и перевыпуск секретов вебхуков.
- Порядок ротации: новый ключ в `SOWA_ENCRYPTION_KEYS` и перезапуск сервиса → `secrets:reencrypt` → `--dry-run` показывает, что старой версии не осталось → старый ключ убирается из env.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://typeorm.io/docs/query-runner
- https://www.postgresql.org/docs/current/functions-matching.html

## Критерии приёмки

- 1201 значение версии 1 в `test_secrets`, ключи 1 и 2: после `reencrypt()` все значения начинаются с `v2.`, расшифровываются в исходный текст, `fields` — `[{ table: "test_secrets", column: "secret", reencrypted: 1201 }]`; повторный `reencrypt()` — `reencrypted: 0` и ничего не меняет.
- `encrypt` бросает обычную ошибку на 600-м вызове: `reencrypt()` отклоняется, перешифрованы ровно первые 500 строк; следующий `reencrypt()` перешифровывает остальные 701.
- Значения `v1.мусор` и значение с подменённым тегом не меняются, их `id` — в `undecryptable`, остальные перешифрованы; `NULL` пропускается.
- `countVersions()` до перешифровки — `[{ version: 1, count: N }]`, после — `[{ version: 2, count: N }]`, строки в БД не меняются; без ключей `reencrypt()` — ошибка `SOWA_ENCRYPTION_KEYS is not set`; `currentVersion` — самая большая версия.

## Чего не делать

- Не делать команду CLI, вывод и запись в журнал аудита — это TASK-14.
- Не делать фоновую задачу в `worker`.
- Не регистрировать поля других эпиков.

## История доработок

—
