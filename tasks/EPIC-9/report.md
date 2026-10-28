# Отчёт по EPIC-9. Ключи и шифрование секретов

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Формат ключа: префикс типа, тело base62, контрольная сумма CRC32 | haiku | sonnet | нет |
| 2 | Сущность и миграция `api_keys` | haiku | sonnet | нет |
| 3 | События аудита `apiKey.issued` и `apiKey.revoked` | haiku | sonnet | нет |
| 4 | `SOWA_ENCRYPTION_KEYS`: разбор списка ключей и конфиг | haiku | sonnet | нет |
| 5 | Сущность и миграция `identity_keys` | haiku | sonnet | нет |
| 6 | Выпуск, проверка по хешу и отзыв ключей `server` и `bot` | sonnet | opus | нет |
| 7 | Шифрование секретов AES-256-GCM с версией ключа | sonnet | opus | нет |
| 8 | `SOWA_ENCRYPTION_KEYS` обязателен в production | haiku | sonnet | нет |
| 9 | Колонка `projects.public_key` | haiku | sonnet | нет |

План эпика переписан планировщиком по результатам проверки черновиков: вместо четырёх задач сделано девять, задачи 1–4 идут параллельно, затем 5 после 2, 9 после 5. Решения и внутренние имена: [decisions.md](decisions.md).

## Задача review

Правки по пяти замечаниям «стоит поправить» (sonnet), коммит `920bc41`:

- `IssueApiKeyInput` стал дискриминированным типом `{ kind: "server" } | { kind: "bot"; botId: string }`: ключ `bot` без `botId` больше не доходит до `CHK_api_keys_bot_id` в БД.
- `issue` берёт `lookupPrefix` через `toLookupPrefix` и не разбирает свежий ключ.
- В `EncryptionService` двойные проверки `undefined` заменены ранними `throw`.
- Длины IV и тега объявлены один раз и экспортируются из `encrypted-secret.ts`.
- Константы переименованы в camelCase.

## Итоговый прогон

Первый и второй прогоны падали на нагрузке: e2e шёл 798 с, `server-modes` 173 с, а `import` в unit-тестах 232 с. Падения: таймауты запуска в `audit-log`, `request-id`, `migrate-mode`, `server-modes`; во втором прогоне `afterAll` в `migrate-mode.e2e-spec.ts` не уложился в 10 с (в `vitest.config.e2e.ts` нет `hookTimeout` и `testTimeout`, в `vitest.config.ts` стоят 30 с). Тестировщик проверил: задачи не виноваты, `apps/server/.env.test` задаёт `SOWA_ENV=development`, правило задачи 8 в этих e2e не срабатывает. Третий и четвёртый прогоны (последний после правок ревью), когда других тяжёлых прогонов не было, прошли (PASS).

## Ревью (opus)

Блокирующих замечаний нет. Исправлены пять пунктов «стоит поправить». Остались мелочи:

- `key-format.ts`: слово `prefix` значит и тип ключа (`sk`), и публичный идентификатор (`lookupPrefix`), а в сервисе, репозитории и событии снова `prefix`; имена колонки и события закреплены в `decisions.md`.
- `key-format.ts:15-19`: поля `type` и `text` в `ParsedKey` повторяют входные аргументы.
- `key-format.ts:55-56`: `isBase62` можно заменить регулярным выражением с длиной.
- `api-keys.repository.ts:51`: `findByPrefix` возвращает `null`, `revokeByPrefix` приводит его к `undefined`.
- `api-keys.service.ts:70`: `issue` и `revoke` принимают один объект, а `verify(key, kind)` позиционные аргументы.
- `encryption-keys.schema.ts:11`: хелпер `reject` одновременно добавляет issue и возвращает `undefined`.
- Хелпер `replaceChar` скопирован в `api-keys.service.spec.ts` и `key-format.spec.ts`.
- `lookupPrefixOf` в `test/support/api-keys-service-probe.ts` остался с разбором ключа: его вызывает `api-keys.service.spec.ts`.

## Для следующих эпиков

- `KeysModule` и `CryptoModule` в модули режимов не подключены: их подключают эпики-потребители (EPIC-10, 11, доступ бекенда, боты).
- Тестовый ключ шифрования для всех окружений: `1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=`.
- В development без `SOWA_ENCRYPTION_KEYS` `encrypt` бросает ошибку: ключ сгенерирует EPIC-11 TASK-1.

## Ручные проверки

- В `.env.example` лежит строка `# SOWA_ENCRYPTION_KEYS=1:<32 bytes in base64>`, `encryptionConfig` подключён в `load` модуля `config.module.ts`.

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-9`.
