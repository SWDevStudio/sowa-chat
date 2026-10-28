# EPIC-12. Решения

## 29.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 4, стало 12: переменные ключей подписи (1), схемы `protocol` (2), обязательность ключа в production (3), сервис токенов (4), таблица `operators` (5), контекст запроса (6), guard серверного ключа (7), домен операторов (8), `POST /v1/server/operator-token` (9), guard оператора (10), роль `supervisor` (11), список блокировок (12). Основа — предложение `tasks/planning/split-EPIC-4-14.md`, проверенное по коду.
- Волны: 1 и 2 сразу; после 1 — 3 и 4; после 2 — 5 и 6; после 6 — 7; после 4 и 5 — 8; затем 9 и 10 (по очереди: общий `api.module.ts`); после 10 — 11 и 12 параллельно (у них нет общих файлов).
- Общие файлы и владельцы: `env.schema.ts` — 1, затем 3; `apps/server/test/support/unit-probe.ts` — 3; `apps/server/.env.test` — 4; `database-entities.ts` и `database-migrations.ts` — 5; `packages/protocol/src/index.ts` — 2; `api.module.ts` — 6, 7, 9, 10 по очереди (каждая добавляет модуль в `imports`); `operators.module.ts` — 8, затем 12; `operator-auth.guard.ts` — 10, затем 12; `operator-controller.decorator.ts` — 10, затем 11; `apps/server/test/support/offline-database.ts` — 12.
- Исполнители: haiku — 1, 2, 3, 5, 6, 8, 9, 11; sonnet — 4, 7, 10, 12. Тесты opus — 4 (JWT: `alg`, `kid`, ротация, срок, `aud`), 7 (доступ по `sk_`), 10 (доступ по токену оператора): 3 из 12. Схемы `protocol` (2) — публичный контракт, но все поля и ограничения записаны в задаче, тесты sonnet, чтобы opus остался у четверти задач. Сложность у всех обычная: секреты, доступ, контракт или критерии только в e2e. Ревью: opus.
- Нужны эпики: 9 (ключи `sk_`, `KeysModule`) и 15 (`OperationSteps` для шага `auth`).

## 29.10.2026, ключ подписи в development (расхождение 1)

- Регистрация ключа в механизме секретов development убрана из эпика: механизм делает EPIC-11 TASK-1, а EPIC-11 ещё не сделан. Ждать его эпик 12 не может: от эпика 12 зависят следующие эпики, а EPIC-11 стоит в очереди после EPIC-10.
- EPIC-11 TASK-1 при подготовке должен сам зарегистрировать `SOWA_TOKEN_SIGNING_KEYS` и `SOWA_TOKEN_SIGNING_KEY_ID`: пара Ed25519, `kid` `dev-1`, значение — `dev-1:<PKCS8 DER base64>` в формате TASK-1 этого эпика. Сейчас в EPIC-11 TASK-1 написано обратное («ключ подписи зарегистрирует эпик доступа бекенда») — менеджеру конвейера передать это планировщику EPIC-11.
- До EPIC-11 в development без переменных сервис стартует, `TokensService.sign` бросает `SOWA_TOKEN_SIGNING_KEYS is not set`, `verify` возвращает `undefined` — так же, как `EncryptionService` без `SOWA_ENCRYPTION_KEYS` (решение EPIC-9).
- В production переменные обязательны (TASK-3): требование плана «обязательны в env; без них сервис не стартует» выполняется в этом эпике, как для `SOWA_ENCRYPTION_KEYS` в EPIC-9 TASK-8.

## 29.10.2026, TASK-1, TASK-3, TASK-4. Ключи и токены

- Имена `SOWA_TOKEN_SIGNING_KEYS` и `SOWA_TOKEN_SIGNING_KEY_ID` — из черновика эпика и предложения разбивки; PLAN.md их не закрепляет. Префикс `SOWA_`, UPPER_SNAKE, множественное число у списка — как `SOWA_ENCRYPTION_KEYS`.
- Значение: `kid:ключ` через запятую, `kid` — `/^[A-Za-z0-9_-]{1,64}$/` (без `:` и `,`, которые служат разделителями), ключ — приватный Ed25519 в PKCS8 DER, стандартный base64. Тексты ошибок не содержат значения ключа.
- `SOWA_TOKEN_SIGNING_KEY_ID` обязателен, если заданы ключи, и должен быть одним из `kid`.
- Объекты `KeyObject` (приватный и публичный) создаются при разборе конфига на старте.
- Тестовые ключи: `test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f` (seed — байты 0–31), `test-2:MC4CAQAwBQYDK2VwBCIEICAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/` (seed — байты 32–63); ключ не Ed25519 — X25519 `MC4CAQAwBQYDK2VuBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f`. Во всех тестовых окружениях текущий ключ — `test-1`.
- Сервис токенов — `apps/server/src/infra/tokens/`, а не `infra/crypto/`: там шифрование секретов EPIC-9, задачи не пересекаются по файлам.
- Заголовок токена: `alg` `EdDSA`, `kid`, `typ` `JWT`. Проверка: `algorithms: ["EdDSA"]`, `kid` из списка, `aud`, обязательные `sub`, `exp`, `iat`. Поле `iss` не ставится: назначение задаёт `aud`, ключ — наш собственный.
- `verify` возвращает `undefined` на любую ошибку, а не бросает: guards отвечают 401 одной веткой, как с `ApiKeysService.verify`.
- `aud` — `operator` или `visitor` (`tokenAudiences`).
- Внутренние имена: `TokenSigningKey`, `tokenSigningKeysSchema`, `tokenSigningConfig` (пространство `tokenSigning`, поля `keys`, `currentKeyId`), `checkTokenSigningKeyId`, `checkTokenSigningKeysInProduction`, `TokensService` (`sign`, `verify`), `TokensModule`, `tokenAudiences`, `TokenAudience`, `SignTokenInput`, `SignedToken`, `VerifiedToken`.

## 29.10.2026, TASK-2. Публичные имена `protocol`

PLAN.md закрепляет только путь `POST /v1/server/operator-token`, роли `operator` и `supervisor` и поля оператора. Имена выбраны по разделу «Дизайн публичного API» CLAUDE.md и стилю `protocol` (`pageQuerySchema`, `errorResponseSchema`):

- `operatorRoles = ["operator", "supervisor"]`, тип `OperatorRole` — отдельный файл `operator-role.ts`: роли нужны и серверу, и SDK оператора, не только выдаче токена.
- `operatorTokenRequestSchema` / `OperatorTokenRequest`: `{ externalId, name, avatarUrl?, role }` — camelCase, имена полей по колонкам `operators` (`external_id`, `name`, `avatar_url`, `role`).
- `operatorTokenResponseSchema` / `OperatorTokenResponse`: `{ token, expiresAt }`, `expiresAt` — строка ISO 8601 (`z.iso.datetime()`): JSON не передаёт `Date`.
- Ограничения: `externalId` и `name` — после `trim` от 1 до 255 символов; `avatarUrl` — `http` или `https`, до 2048 символов. Неизвестные поля отбрасываются.
- Поля `role` в claims и ответе — то же значение `OperatorRole`.

## 29.10.2026, TASK-5. Таблица `operators`

- Миграция `1793300003000-CreateOperators.ts` — после `1793300002000-AddProjectsPublicKey.ts`, пишется вручную, имена ограничений явные и повторены в сущности (как EPIC-8, EPIC-9, EPIC-19): `PK_operators`, `FK_operators_project_id`, `UQ_operators_project_id_external_id`, `CHK_operators_role`.
- `role` — `text` с `CHECK`, не enum PostgreSQL. `project_id` — `ON DELETE CASCADE`, как у `api_keys`.
- `avatar_url`, `max_chats`, `disabled_at` — NULL. `created_at` и `updated_at` нет: колонки строго по PLAN.md, раздел 11.
- Отдельного индекса по `project_id` нет: его покрывает уникальное ограничение `(project_id, external_id)`.
- Внешние ключи на `operators` из таблиц чата (`conversations.assignee_id`) в этом эпике не заводятся (EPIC-19 их не завёл, потому что таблицы не было). `apps/server/test/chat-tables.e2e-spec.ts` проверяет точный список внешних ключей таблиц чата; новый ключ добавит эпик, который назначает операторов на диалоги, вместе с правкой этого теста. Новая таблица тест не ломает: он фильтрует по именам таблиц чата.

## 29.10.2026, TASK-6, TASK-7, TASK-10, TASK-11. Контекст и guards

- `RequestContext` (`setProjectId`, `projectId`, `setOperator`, `operator`) и глобальный `RequestContextModule` — в `apps/server/src/infra/request-context/`; доступен слоям `api` и `domain`. Нет значения — обычный `Error` (500): это пропущенный guard, а не ошибка клиента.
- Разбор `Authorization: Bearer …` — один helper `bearerToken` в `apps/server/src/infra/http/bearer-token.ts`: схема без учёта регистра, cookie и query не читаются.
- `ServerAuthModule` и `OperatorAuthModule` — `@Global()` с реэкспортом зависимостей guard (`KeysModule`, `TokensModule`, `OperatorsModule`, `OperationStepsModule`): guard из `@UseGuards` создаётся в модуле контроллера, а контроллеры зон будут в разных модулях следующих эпиков. Так `KeysModule` подключается в `api` через `ServerAuthModule` (решение EPIC-9: модули ключей подключают потребители), `TokensModule` — через `OperatorAuthModule` и `OperatorsModule`.
- Декораторы `ServerController(path)` и `OperatorController(path)` ставят путь `server/…` или `operator/…`, зону и guards.
- Шаг `auth` (решение EPIC-15): guards оборачивают проверку ключа или токена в `OperationSteps.measure("auth", ...)`.
- 401 одним текстом на все причины: `Server key is missing or invalid`, `Operator token is missing or invalid` (в том числе для заблокированного оператора). 403 роли — `Supervisor role is required`.
- Claims токена оператора: `sub` — ID оператора, `projectId`, `role` (camelCase, CLAUDE.md). Guard проверяет их схемой zod, неверные claims — 401.
- Роль проверяет отдельный `OperatorRoleGuard` после `OperatorAuthGuard`; маршрут для одной роли помечается `@SupervisorOnly()` (ключ `supervisorOnly`, `SetMetadata`). Ролей две, и `supervisor` может всё, что `operator`, поэтому общий декоратор со списком ролей не нужен.
- Внутренние имена: `RequestContext`, `RequestOperator`, `RequestContextModule`, `bearerToken`, `ServerKeyGuard`, `ServerController`, `ServerAuthModule`, `OperatorAuthGuard`, `OperatorController`, `OperatorAuthModule`, `OperatorRoleGuard`, `SupervisorOnly`, `supervisorOnlyMetadataKey`.
- e2e с портами зон и настоящей базой — новый helper `startZoneE2eApp` в `apps/server/test/support/zone-e2e-app.ts` (TASK-7): статические импорты без `vi.resetModules`, чтобы `app.get(Класс)` находил провайдеры.

## 29.10.2026, TASK-8, TASK-9. Выдача токена оператора

- Создание или обновление — `Repository.upsert` с `conflictPaths: ["projectId", "externalId"]` (`INSERT … ON CONFLICT DO UPDATE`): одновременные запросы одного оператора не дают дубля и ошибки уникальности. Затем строка читается `findOneByOrFail`.
- Имя, аватар и роль всегда из запроса: без `avatarUrl` аватар стирается (NULL). `maxChats` и `disabled_at` выдача токена не меняет.
- Заблокированный оператор — доменная ошибка `OperatorDisabledError`, контроллер переводит её в 403 `forbidden` `Operator is disabled`.
- Срок токена — `operatorTokenTtlSeconds = 900` (15 минут из плана).
- Код ответа `POST /v1/server/operator-token` — 200, а не 201: ресурс не создаётся, выдаётся токен.
- Проект — только из ключа `sk_` через `RequestContext`, в теле `projectId` нет.
- Внутренние имена: `OperatorsRepository` (`upsert`, `findDisabledIds`), `OperatorProfile`, `OperatorsService` (`issueToken`), `IssueOperatorTokenInput`, `IssuedOperatorToken`, `OperatorDisabledError`, `operatorTokenTtlSeconds`, `OperatorsModule`, `OperatorTokenRequestDto`, `OperatorTokenResponseDto`, `OperatorTokenController`, `ServerApiModule`.

## 29.10.2026, TASK-12. Список блокировок

- `DisabledOperators` (`load`, `add`, `remove`, `has`) загружает ID при `onApplicationBootstrap`; `add` и `remove` вызывать будет EPIC-14 (команды `operator:disable` и `operator:enable`, рассылка между репликами). Загрузка при старте нужна уже здесь: иначе оператор, заблокированный до старта реплики, проходил бы до истечения токена.
- Unit-тесты с `ApiModule` работают на заглушке базы, поэтому `withOfflineDatabase` подменяет `OperatorsRepository` заглушкой `findDisabledIds: async () => []`.
