# EPIC-9. Решения

## 28.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 4, стало 9: формат ключа (1), `api_keys` (2), события аудита ключей (3), разбор `SOWA_ENCRYPTION_KEYS` (4), `identity_keys` (5), сервис ключей (6), шифрование (7), обязательность ключа шифрования в production (8), `projects.public_key` (9).
- Параллельно сразу: 1, 2, 3, 4. После 2 — 5, после 5 — 9: у трёх табличных задач общие `database-migrations.ts` и `database-entities.ts`, поэтому они идут цепочкой. После 4 — 7 и 8 параллельно. 6 ждёт 1, 2, 3.
- Формат ключа вынесен в `apps/server/src/domain/keys/`, в `apps/server/src/infra/crypto/` остаётся только шифрование (TASK-7): задачи не пересекаются по файлам.
- Старая TASK-2 (три таблицы) разбита на три задачи: `projects.public_key` требует ещё правки `test/projects-table.e2e-spec.ts`, который проверяет точный список колонок, и одной задаче было бы 8 файлов.
- События аудита вынесены в отдельную задачу до сервиса ключей, а не после: реестр `DomainEvents` и правила не зависят от сервиса, задача идёт параллельно с остальными, а сервис сразу публикует события и проверяет журнал своими e2e. Так у сервиса окончательная сигнатура с `actorKind` с первого раза.
- Репозиторий `api_keys` делает сервис ключей (TASK-6): его методы (`touchLastUsedAt`, `revokeByPrefix`) задаёт логика проверки и отзыва. Репозиторий `identity_keys` делает EPIC-10 вместе с командами `identity-key:*`.
- `KeysModule` и `CryptoModule` в модули режимов не подключаются: их подключат эпики-потребители (CLI, доступ бекенда, боты). Так эпик не трогает `api.module.ts`, `worker.module.ts`, `cli.module.ts`.
- Тесты: opus у TASK-6 (проверка ключей, timing-safe сравнение, отзыв, журнал в транзакции) и TASK-7 (шифрование, подмена, ротация) — 2 из 9. Остальным — sonnet.
- Сложность у всех обычная: табличные задачи проверяются только e2e, которые `check-task` не запускает; TASK-3 и TASK-8 касаются аудита и секретов.
- Ревью: opus — ключи, хеши, timing-safe сравнение, AES-GCM, транзакции с журналом аудита.
- Исполнители: haiku — 1, 2, 3, 4, 5, 8, 9; sonnet — 6, 7. TASK-1 ушла на haiku: все параметры формата теперь записаны в задаче.

## 28.10.2026, TASK-1. Формат ключа

Формат публичный: его видят сканеры секретов, печатают `key:generate` (EPIC-10) и режимы запуска (EPIC-11). План задаёт только «префикс + 32 случайных байта + контрольная сумма», пример `sk_7Hc2…_1a2b3c`.

- Вид: `<префикс>_<тело>_<контрольная сумма>`. Префиксы из плана: `pk` (publicKey), `sk` (serverKey), `bk` (botKey), `whsec` (секрет вебхука).
- Тело — base62 (`0-9A-Za-z`), ровно 43 символа с дополнением `0` слева. Base62, а не base64url: в base64url есть `_` и `-`, `_` совпал бы с разделителем, а двойной щелчок не выделял бы ключ целиком. 43 символа base62 вмещают 256 бит.
- Контрольная сумма — CRC32 (`zlib.crc32` из Node 24) от строки `<префикс>_<тело>`, base62, ровно 6 символов (62^6 > 2^32). Шесть символов совпадают с примером из плана. CRC32 ловит любую замену одного символа.
- Длина: 53 символа у `pk_`, `sk_`, `bk_`, 56 у `whsec_`.
- Публичный идентификатор (`lookupPrefix`, колонка `api_keys.prefix`) — `<префикс>_` и первые 12 символов тела, например `sk_7Hc2kQ9xLmPa`. 12 символов (около 71 бита) делают совпадение `prefix` у двух ключей практически невозможным; секретными остаются 31 символ, около 184 бит. Идентификатор не секрет: он в списках ключей и журнале аудита.
- Внутренние имена: `keyTypes`, `KeyType` (`publicKey`, `serverKey`, `botKey`, `webhookSecret`), `keyPrefixes`, `generateKey`, `parseKey`, `ParsedKey`, `encodeBase62`, `base62Alphabet`.

## 28.10.2026, TASK-2, TASK-5, TASK-9. Таблицы ключей

- Миграции: `1793300000000-CreateApiKeys.ts`, `1793300001000-CreateIdentityKeys.ts`, `1793300002000-AddProjectsPublicKey.ts`, пишутся вручную, имена ограничений заданы явно и повторены в сущностях, как в EPIC-8.
- `api_keys.project_id` и `identity_keys.project_id` — `ON DELETE CASCADE`, как `audit_log` в EPIC-8.
- `kind` и `alg` — `text` с `CHECK`, а не enum PostgreSQL (как `actor_kind` в EPIC-8). Значения `EdDSA` и `ES256` — имена алгоритмов JOSE, поэтому не в camelCase.
- `CHK_api_keys_bot_id`: `bot_id` заполнен ровно у ключей `bot`. Внешний ключ на `bots` добавит эпик ботов.
- Индекс `IDX_api_keys_project_id` — для списка ключей проекта (`key:list`). Поиск ключа идёт по уникальному `prefix`.
- `identity_keys.public_key` — тип `JWK` из `jose` (принятое исключение для JWT).
- `projects.public_key` — `text NULL` с уникальным ограничением `UQ_projects_public_key`. Не `NOT NULL`: существующие тесты и фикстуры создают проекты без ключа, а генерировать `pk_` при создании проекта будет EPIC-10. Сделать колонку обязательной можно миграцией в EPIC-10.
- Внутренние имена: `ApiKey`, `apiKeyKinds`, `ApiKeyKind`, `IdentityKey`, `identityKeyAlgorithms`, `IdentityKeyAlgorithm`.

## 28.10.2026, TASK-3 и TASK-6. События и сервис ключей

- События: `apiKey.issued` и `apiKey.revoked` (camelCase с точкой, по решению EPIC-8), данные — `ApiKeyEvent { apiKeyId, projectId, kind, prefix, botId, actorKind }`. Тип объявлен литералами в `domain-events.ts`: `telemetry` не импортирует `domain`.
- `actorKind` события — только `cli` или `system`: ключи создают команды CLI (EPIC-10) и старт сервиса (EPIC-11); мастер-ключа и API управления ключами в плане нет. Новые значения добавит эпик, у которого появится другой автор.
- Запись журнала: `actorId` — `null`, `targetKind` — `apiKey`, `targetId` — ID ключа, `data` — `{ kind, prefix, botId }`. Ключа и хеша в журнале нет.
- `last_used_at` обновляется условным `UPDATE` с `now() - interval '1 minute'` в самом запросе: правило держится при нескольких репликах без памяти процесса.
- Отзыв — по `prefix` (`key:revoke --prefix` в EPIC-10), условным `UPDATE ... WHERE revoked_at IS NULL`: повторный или одновременный отзыв не публикует второе событие.
- `issue` и `revoke` — `@Transactional()`, публикация строго через `await` по очереди, без `Promise.all` (решение EPIC-8 о точках сохранения).
- Внутренние имена: `ApiKeysRepository`, `ApiKeysService` (`issue`, `verify`, `revoke`), `KeysModule`, `hashKey`, `KeyActorKind`, `IssueApiKeyInput`, `IssuedApiKey`, `VerifiedApiKey`, `RevokeApiKeyInput`, `ApiKeyEvent`.

## 28.10.2026, TASK-4, TASK-7, TASK-8. Шифрование секретов

- Имя `SOWA_ENCRYPTION_KEYS` в PLAN.md не закреплено; оставлено из черновиков EPIC-9 и EPIC-11 (TASK-1, TASK-5): собственная переменная с префиксом `SOWA_`, во множественном числе, потому что это список версий.
- `SOWA_ENCRYPTION_KEYS` обязателен в production, в development необязателен: в development его сгенерирует EPIC-11 TASK-1. Без ключей в development `encrypt` бросает `SOWA_ENCRYPTION_KEYS is not set`; до EPIC-11 шифрованием никто не пользуется.
- Обязательность вынесена в TASK-8: она требует ключа во всех тестовых окружениях с production (`unit-probe.ts`, `env.schema.spec.ts`, `env.schema.logging.spec.ts`, `config-startup.e2e-spec.ts`), и вместе с разбором вышло бы больше 5 файлов.
- Значение переменной: `версия:ключ` через запятую, версия 1–999999 без ведущих нулей, ключ — стандартный base64 ровно 32 байт, версии не повторяются. Текст ошибок не содержит значения ключа. Пустая строка — как отсутствие переменной.
- В `.env.example` — выключенная строка `# SOWA_ENCRYPTION_KEYS=1:<32 bytes in base64>`: заглушка не проходит проверку, поэтому ключ из примера не попадёт в production.
- Тестовый ключ во всех окружениях: `1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=` (байты 0–31).
- Формат зашифрованной строки: `v<версия>.<iv>.<шифротекст>.<тег>`, `iv` 12 байт, тег 16 байт, двоичные части в base64url без `=`. `authTagLength: 16` задаётся и при расшифровке: иначе GCM принял бы укороченный тег. Дополнительных данных (AAD) нет.
- Ошибка расшифровки одна на все причины — `SecretDecryptionError` с текстом `Encrypted secret cannot be decrypted`.
- Внутренние имена: `EncryptionKey`, `encryptionKeysSchema`, `encryptionConfig` (пространство `encryption`), `EncryptedSecret`, `formatEncryptedSecret`, `parseEncryptedSecret`, `EncryptionService` (`encrypt`, `decrypt`), `SecretDecryptionError`, `CryptoModule`.
