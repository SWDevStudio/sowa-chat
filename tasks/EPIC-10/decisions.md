# EPIC-10. Решения

## 29.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 6, стало 14. Старая TASK-1 → 1 (логи в stderr) и 2 (запуск команд и `key:generate`). Старая TASK-2 → 6 (сервис проектов) и 8 (команды). Старая TASK-3 → 9 (`key:create`, `key:list`, `key:revoke`); `key:generate` ушла в 2. Старая TASK-4 → 5 (разбор PEM), 10 (сервис identity-ключей), 11 (команды). Старая TASK-5 → 3 (нормализация origin), 4 (колонка), 12 (сервис списков), 13 (команды). Старая TASK-6 → 7 (реестр и перешифровка), 14 (команда, `--dry-run`, аудит).
- Отличия от `tasks/planning/split-EPIC-4-14.md`:
  - `key:generate` идёт вместе с запуском команд (TASK-2): без единой команды commander не отличает неизвестную команду от пустого запуска и выходит с кодом 0, поэтому критерии «неизвестная команда — код 1» и «`--help` выводит список команд» проверить было бы нечем.
  - Отдельной задачи «`--operator-origin` в `project:create` и оба списка в `project:list`» нет: колонка `operator_allowed_origins` (TASK-4) и нормализация (TASK-3) идут раньше сервиса проектов (TASK-6), и `project:create` сразу принимает оба списка. Так `project:create` не переделывается дважды.
  - Добавлена TASK-1 «логи режима `cli` в stderr» (обоснование ниже).
  - Сервисы (проекты, identity-ключи, списки origins) отделены от команд: у команд другие файлы и другая проверка.
- Общие файлы и порядок:
  - `apps/server/src/cli.module.ts` меняют 2, 8, 9, 11, 13, 14 — они идут цепочкой 2 → 8 → 9 → 11 → 13 → 14.
  - `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts`, `apps/server/src/domain/audit/audited-events.spec.ts` меняют 6, 10, 12, 14 — цепочка 6 → 10 → 12 → 14.
  - `projects.service.ts`, `projects.repository.ts` меняют 6 и 12; `secrets-reencryption.service.ts` — 7 и 14; `test/logging.e2e-spec.ts` — 1 и 2.
  - Сразу параллельно идут 1, 3, 4, 5, 7.
- Модули в `CliModule` подключают задачи команд, которым они нужны: `ProjectsModule` (с `KeysModule` внутри) — TASK-8, `KeysModule` — TASK-9, `SecretsReencryptionModule` (с `CryptoModule` внутри) — TASK-14. Так выполнено решение EPIC-9 «подключают эпики-потребители».
- Тесты на opus: TASK-5 (выбор алгоритма identity-ключа: подмена алгоритма, приватный ключ), TASK-6 (выпуск ключей и проекта одной транзакцией, ключ показывается один раз), TASK-7 (перешифровка секретов пачками в транзакциях, продолжение после обрыва) — 3 из 14. Остальным — sonnet.
- Сложность у всех обычная: у каждой задачи есть e2e, которые `check-task` не запускает, или правила безопасности (CORS, ключи).
- Ревью: opus — выпуск и вывод ключей, разбор identity-ключей для JWT, перешифровка секретов в транзакциях. Предложение по разбивке ставило sonnet, но правило разбивки требует opus для эпиков с безопасностью и транзакциями.
- Исполнители: haiku — 1, 3, 4, 5, 8, 11, 13; sonnet — 2, 6, 7, 9, 10, 12, 14.

## 29.10.2026, Redis в режиме cli и сброс кэша на репликах

Вопрос: EPIC-14 ждёт, что `key:revoke`, изменение доменов и `operator:disable` из CLI сразу действуют на всех репликах через Redis, а режим `cli` Redis не подключает (решение EPIC-6).

Решение:

- В EPIC-10 режим `cli` Redis не подключает, `RedisModule` в `cli.module.ts` не добавляется.
- Команды, которые меняют кэшируемые данные, публикуют доменные события во внутреннюю шину: `key:revoke` — `apiKey.revoked` (уже есть в `ApiKeysService`), `origin:*` — `project.allowedOriginsChanged`, `operator-origin:*` — `project.operatorAllowedOriginsChanged`. В EPIC-10 на них подписан только журнал аудита.
- Доставку до реплик делает EPIC-14. Он подписывается на эти события и в режиме `cli` и отправляет `cache.invalidate` (и событие блокировки оператора) через клиент Redis из `@nestjs/microservices` (`ClientsModule`, `Transport.REDIS`), который EPIC-14 подключает в `cli.module.ts` только для публикации, без `RedisModule` и `waitForRedis`.
- Если Redis недоступен, команда CLI всё равно успешна: изменение уже записано в БД, а запись кэша на репликах истечёт через 60 секунд. Это прямо допускает PLAN.md (раздел о кэше реплик: «если событие потеряется, запись всё равно истечёт через 60 секунд»).

Почему так:

- План делает Redis единственным каналом сброса кэша, а ключи и домены меняются только из CLI. Значит, без публикации из `cli` сброс на репликах не случился бы никогда, и EPIC-14 должен публиковать из `cli`.
- В EPIC-10 у Redis в `cli` нет потребителя. `RedisModule` при старте ждёт Redis (`waitForRedis`): все команды, включая `key:generate` и `project:list`, перестали бы работать без Redis, а в EPIC-6 это решено иначе.
- Клиент только для публикации не мешает командам, которым Redis не нужен, и не меняет решение EPIC-6 о `RedisModule`.

Что это значит для EPIC-14: задачи сброса кэша и блокировки оператора добавляют в `cli.module.ts` клиент публикации; e2e «блокировка через CLI сразу действует на обоих экземплярах» запускают команду CLI с доступным Redis; при недоступном Redis команда CLI выходит с кодом 0 и пишет предупреждение в лог.

## 29.10.2026, TASK-1 и TASK-2. Запуск команд

- Логи в режиме `cli` идут в stderr (дескриптор 2), в остальных режимах — в stdout, как раньше. Вывод команд — в stdout. Так ключ из `key:generate` можно забрать в переменную (`$(sowa-chat key:generate)`) или в файл без JSON-строк логов. В формате `pretty` то же: `pino-pretty` с `destination: 2`. PLAN.md пишет «JSON-логи в stdout» для сборщика логов контейнеров; команду CLI запускают через `docker compose exec`, и её вывод сборщик не видит, поэтому отступление не мешает плану.
- Внутренние имена: `logFileDescriptor`, `createLogDestination` (вместо `createStdoutDestination`).
- Команды лежат в `apps/server/src/cli/`: запуск — `cli-runner.ts`, вывод — `cli-output.ts`, команды по папкам `projects/`, `keys/`, `identity-keys/`, `origins/`, `secrets/`. Файл команды — `*.command.ts` или `*.commands.ts`, если в нём несколько маленьких команд одной группы.
- `runCliCommand(commandArguments)` создаёт приложение через `CommandFactory.createWithoutRunning(CliModule, …)` и запускает `CommandRunnerService.run(argv)`. `process.argv[2]` у `node dist/main.js cli …` — режим `cli`, поэтому команде передаются аргументы с `process.argv[3]`, а `sowa-chat` (`dist/sowa-chat.js`) — с `process.argv[2]`. Commander разбирает argv в формате node: первые два элемента — путь к node и имя программы, им передаётся `"sowa-chat"`, чтобы справка писала `Usage: sowa-chat`.
- `logger: true` в параметрах `CommandFactory`: nest-commander по умолчанию ставит `logger: false`, и ошибка запуска (нет БД) не попала бы в вывод, а `test/database-connection.e2e-spec.ts` ждёт `ECONNREFUSED` у `cli`.
- `cli` без команды выводит справку и выходит с кодом 0 (как `--help`). Так `test/server-modes.e2e-spec.ts` («`cli` завершается с кодом 0») остаётся верным без правок.
- Ошибка команды: в stderr строка `error: <сообщение>`, код выхода 1. Её ловит `serviceErrorHandler` nest-commander. Неизвестная команда, нехватка обязательного параметра и `--help` обрабатывает сам commander: он завершает процесс через `process.exit` с кодом 1 или 0.
- `bin`: `"sowa-chat": "dist/sowa-chat.js"`, файл `apps/server/src/sowa-chat.ts` с первой строкой `#!/usr/bin/env node`; tsc сохраняет её в `dist`. В Docker-образе (EPIC-17) `sowa-chat` попадает в `PATH` ссылкой на `dist/sowa-chat.js` с правом на выполнение.
- Вывод: значения через `name: value` по строке, списки — таблица через табуляцию с заголовком, пустое значение `-`, даты — ISO 8601. Предупреждение «ключ показывается один раз» — в stderr, чтобы stdout оставался машиночитаемым.
- Внутренние имена: `runCliCommand`, `cliName`, `writeLine`, `writeTable`, `formatDate`, `emptyCell`, `KeyGenerateCommand`, тестовый помощник `runCliInProcess`.

## 29.10.2026, TASK-3, TASK-4, TASK-12. Разрешённые домены

- Origin нормализуется через WHATWG `URL`: результат — `url.origin` (нижний регистр хоста, без порта по умолчанию, без `/` в конце). Отклоняются: `*`, `?`, `#` в тексте, схема не `http:`/`https:`, логин или пароль, путь не `/`. Повтор в списке схлопывается с сохранением порядка.
- Колонка `operator_allowed_origins` — `text array NOT NULL DEFAULT '{}'`, как `allowed_origins`; миграция `1793300003000-AddProjectsOperatorAllowedOrigins.ts`.
- Добавление и удаление — одним условным `UPDATE … array_append/array_remove … RETURNING`: два одновременных вызова не теряют изменения друг друга, а повтор ничего не меняет и не публикует событие.
- Повторное добавление и удаление отсутствующего домена — не ошибка: код 0 и сообщение `already allowed` / `not in list`.
- События: `project.allowedOriginsChanged` и `project.operatorAllowedOriginsChanged`, данные `ProjectOriginsEvent { projectId, origins, actorKind }`, `origins` — полный новый список. Два события, а не одно с полем списка: обновление CORS бакета (EPIC-54) подписывается только на домены сайта. Изменение доменов пишется в журнал аудита: это правило доступа к API. Запись: `targetKind: "project"`, `targetId` — ID проекта, `data: { origins }`.
- Внутренние имена: `normalizeOrigin`, `normalizeOrigins`, `InvalidOriginError`, `originLists`, `OriginList`, `OriginChange`, `ProjectOriginsEvent`.

## 29.10.2026, TASK-5, TASK-6, TASK-10. Проекты и identity-ключи

- Имя проекта: 1–63 символа `a-z`, `0-9`, `-`, первый символ — буква или цифра (`^[a-z0-9][a-z0-9-]{0,62}$`). По имени проект ищут все команды (`--project main`) и `SOWA_INIT_PROJECT` (EPIC-11), поэтому имя должно печататься и набираться без кавычек.
- Повтор имени ловится проверкой `findByName` внутри транзакции создания: ошибка `ProjectAlreadyExistsError` с понятным текстом. Одновременное создание двух проектов с одним именем остановит уникальное ограничение БД, и команда выйдет с кодом 1 и ошибкой БД: CLI запускают вручную, отдельная обработка этой гонки не нужна.
- `projects.public_key` остаётся `NULL`-able: фикстуры и тесты создают проекты без ключа, а все проекты из `ProjectsService.create` получают `pk_`.
- Создание проекта — одна транзакция: строка проекта, событие `project.created`, выпуск `sk_` через `ApiKeysService.issue`. Событие `ProjectCreatedEvent { projectId, name, actorKind }`, запись журнала: `targetKind: "project"`, `targetId` — ID проекта, `data: { name }`.
- PEM identity-ключа: принимается только блок `-----BEGIN PUBLIC KEY-----` (SPKI). Текст с `PRIVATE KEY` отклоняется сразу: Node `createPublicKey` молча выводит публичный ключ из приватного, и приватный ключ иначе прошёл бы. Алгоритм — по `KeyObject`: `ed25519` → `EdDSA`, `ec` с кривой `prime256v1` → `ES256`, остальное — ошибка. JWK — `exportJWK` из `jose`, без `kid`, `alg` и `d`.
- `kid`: 1–128 символов `A-Za-z0-9._-`. Повтор `kid` в проекте — ошибка и для отозванного ключа (уникальное ограничение `UQ_identity_keys_project_id_kid`): план велит новый ключ выпускать с новым `kid`.
- События `identityKey.added` и `identityKey.revoked`, данные `IdentityKeyEvent { identityKeyId, projectId, kid, alg, actorKind }`, запись журнала: `targetKind: "identityKey"`, `targetId` — ID ключа, `data: { kid, alg }`.
- Внутренние имена: `ProjectsService` (`create`, `getByName`, `list`, позже `addOrigin`, `removeOrigin`), `ProjectActorKind`, `CreateProjectInput`, `CreatedProject`, `NewProject`, `InvalidProjectNameError`, `ProjectAlreadyExistsError`, `ProjectNotFoundError`, `ProjectCreatedEvent`, `parseIdentityPublicKey`, `ParsedIdentityKey`, `InvalidIdentityKeyError`, `IdentityKeysRepository`, `IdentityKeysService` (`add`, `list`, `revoke`), `NewIdentityKey`, `AddIdentityKeyInput`, `AddedIdentityKey`, `RevokeIdentityKeyInput`, `IdentityKeyKidTakenError`, `InvalidIdentityKeyIdError`, `IdentityKeyEvent`, `ChangeOriginInput`.
- Классы команд: `ProjectCreateCommand`, `ProjectListCommand`, `KeyCreateCommand`, `KeyListCommand`, `KeyRevokeCommand`, `IdentityKeyAddCommand`, `IdentityKeyListCommand`, `IdentityKeyRevokeCommand`, `OriginAddCommand`, `OriginRemoveCommand`, `OriginListCommand`, `OperatorOriginAddCommand`, `OperatorOriginRemoveCommand`, `OperatorOriginListCommand`.
- Имена команд и параметров — из PLAN.md и черновиков эпика: `project:create --name [--origin] [--operator-origin]`, `project:list`, `key:create --project`, `key:list --project`, `key:revoke --prefix`, `key:generate`, `identity-key:add --project --kid --file`, `identity-key:list --project`, `identity-key:revoke --project --kid`, `origin:add|remove --project --origin`, `origin:list --project`, `operator-origin:add|remove --project --origin`, `operator-origin:list --project`, `secrets:reencrypt [--dry-run]`.

## 29.10.2026, TASK-9. Команды serverKey

- `key:list` показывает только ключи `server`, `key:revoke` принимает только `prefix`, начинающийся с `sk_`: команды ключей ботов делает эпик ботов.
- `key:revoke` неизвестного или уже отозванного ключа — ошибка `No active server key with prefix "…"`, код 1.
- Внутренние имена: `ApiKeysService.list`, `ApiKeysRepository.findByProject`, `ApiKeySummary`.

## 29.10.2026, TASK-7 и TASK-14. Перешифровка секретов

- Реестр — DI-токен `encryptedFields` (символ) и список `registeredEncryptedFields` в `apps/server/src/infra/crypto/registered-encrypted-fields.ts`, по образцу `auditRules` и `auditedEvents`. Эпики ботов и исходящих событий дописывают в список свои поля. У таблицы поля первичный ключ — колонка `id`.
- Текущая версия ключа — самая большая версия в `SOWA_ENCRYPTION_KEYS` (так уже выбирает `EncryptionService`), геттер `EncryptionService.currentVersion`.
- Пачки по 500 строк (`reencryptionBatchSize`) по возрастанию `id`, каждая пачка — своя транзакция. Отбор — значения не текущей версии (`NOT LIKE 'v<текущая>.%'`), поэтому повторный запуск продолжает с того, что осталось. Запись — `UPDATE … WHERE id = $1 AND <колонка> = $2`: значение, которое за это время поменял сервис, не перезаписывается.
- Значение, которое не расшифровывается, остаётся как было и попадает в отчёт (таблица, колонка, `id`); команда выходит с кодом 1.
- Событие `secrets.reencrypted`, данные `SecretsReencryptedEvent { reencrypted, undecryptable, actorKind: "cli" }`, публикуется после каждого запуска без `--dry-run`. Запись журнала: `projectId: null`, `targetKind: "encryptedSecrets"`, `targetId: null`, `data: { reencrypted, undecryptable }`. Значений и ID записей в журнале нет.
- Внутренние имена: `EncryptedField`, `encryptedFields`, `registeredEncryptedFields`, `SecretsReencryptionService` (`reencrypt`, `countVersions`), `SecretsReencryptionModule`, `reencryptionBatchSize`, `ReencryptionReport`, `FieldReencryption`, `UndecryptableValue`, `FieldVersionCount`, `ReencryptInput`, `SecretsReencryptedEvent`, `SecretsReencryptCommand`.
- `reencrypt` в TASK-7 без параметров, параметр `{ actorKind: "cli" }` добавляет TASK-14 вместе с событием: в TASK-7 он был бы неиспользуемым. TASK-14 поэтому правит и вызовы в `test/secrets-reencryption.e2e-spec.ts`.
