# EPIC-5. Решения

## 28.10.2026, разбивка эпика

- Было 5 задач, стало 8. Конфиг (`SOWA_DB_POOL_SIZE`, `SOWA_MIGRATION_DATABASE_URL`) вынесен в TASK-1 на haiku. Старая задача migrate разделена на инструменты миграций (TASK-4, haiku) и сам режим (TASK-5, sonnet). Старая задача e2e-окружения разделена на контейнер (TASK-2) и фикстуры с очисткой (TASK-8).
- Контейнер PostgreSQL для e2e (TASK-2) идёт первым, а не последним, как в предложении по разбивке. После подключения TypeORM (TASK-3) режимы `api`, `worker` и `cli` при старте ходят в базу, и без контейнера все e2e-тесты сервера зависели бы от `pnpm infra:up`. Проверки следующих задач эпика идут на этом контейнере.
- Сущность `projects` (TASK-6) идёт раньше транзакций (TASK-7): тесту транзакций нужна таблица, а таблицы создаются только миграциями. Репозиторий `ProjectsRepository` перенесён в TASK-7: ему нужен `TransactionHost`, и он становится образцом репозитория.
- Ревью: opus. Предложение ставило sonnet. В эпике транзакции, а правило ставит opus эпикам с конкурентностью. Ещё в эпике отдельный пользователь для миграций — это граница прав.
- Тесты на opus — только TASK-7 (транзакции).
- Скрипт `check-task.mjs` не запускает `*.e2e-spec.ts`. Проверки с настоящей базой в задачах — это e2e-тесты. Тестировщик запускает их сам: `pnpm --filter @sowa-chat/server test:e2e -- <файл>`, нужен Docker.

## 28.10.2026, TASK-1. `SOWA_DB_POOL_SIZE`

План закрепляет пул в 10 соединений, но не задаёт переменную. Имя взято из прежней редакции задачи и следует правилу: собственные переменные — с префиксом `SOWA_`, UPPER_SNAKE. Допустимые значения — 1–100, по умолчанию 10: так DevOps может уменьшить пул под лимит управляемого PostgreSQL. В конфиге поле `database.poolSize`.

## 28.10.2026, TASK-1. Пустая `SOWA_MIGRATION_DATABASE_URL`

Пустая строка считается незаданной переменной. Compose передаёт пустую строку, если переменная есть в шаблоне, но не заполнена, и `migrate` не должен падать из-за этого. Адрес для миграций выбирается в конфиге: поле `database.migrationUrl` = `SOWA_MIGRATION_DATABASE_URL ?? DATABASE_URL`.

## 28.10.2026, TASK-2. Адрес контейнера в e2e через `provide`/`inject` и `setupFiles`

Глобальная подготовка vitest работает в другом процессе, и `env` из конфига перезаписал бы `process.env`. Поэтому адрес контейнера передаётся через `project.provide("databaseUrl")`, а `setupFiles` записывает его в `process.env.DATABASE_URL` каждого процесса тестов. Существующие e2e-тесты, которые запускают `dist/main.js` с `{ ...process.env }`, получают базу контейнера без правок. Порт контейнера случайный: фиксированный порт столкнулся бы при параллельных прогонах из разных копий репозитория.

## 28.10.2026, TASK-3. Подключение к базе

- Список сущностей `databaseEntities` лежит в `apps/server/src/database-entities.ts`, в корне `src`, рядом с модулями режимов. Сущности живут в `domain`, а `infra` не импортирует `domain` (правило слоёв). Его передают в `DatabaseModule.forRoot(entities)` и в DataSource для CLI TypeORM — один список на обоих. Вариант с `autoLoadEntities` отклонён: у CLI TypeORM был бы другой список.
- `retryAttempts: 3`, `retryDelay: 1000` вместо 10 попыток по 3 секунды по умолчанию. С недоступной базой процесс завершается с кодом 1 за несколько секунд. Перезапуск — забота compose и Kubernetes. `connectTimeoutMS: 5000`: без таймаута подключение к недоступному хосту зависает.
- `applicationName: "sowa-chat-server"`: соединения сервиса видны в `pg_stat_activity`. По этому имени тест проверяет подключение.
- Код 1 при недоступной базе даёт сам Nest: ошибка при создании провайдеров завершает процесс через `process.exit(1)`. `main.ts` в TASK-3 не меняется.
- Критерий «после SIGTERM соединений не остаётся» снят: обработка SIGTERM — это отклонённая EPIC-2 TASK-4. Соединения закрывает `@nestjs/typeorm` при любом `app.close()`, это проверяет тест.
- Unit-тесты, которые собирают `ApiModule` (`createProbeApp`), подменяют DataSource заглушкой `{ isInitialized: false }` через `withOfflineDatabase` (`apps/server/test/support/offline-database.ts`).

## 28.10.2026, TASK-3. Пересечение с параллельным EPIC-4

EPIC-4 меняет `api.module.ts`, `main.ts`, `test/server-modes.e2e-spec.ts` и добавляет `test/support/zone-probe.ts`. Его `startZoneProbeApp` тоже собирает `ApiModule`. При слиянии эпиков в `pipeline`:
- в `ApiModule` должны остаться и `ZonesModule`, и `DatabaseModule.forRoot(databaseEntities)`;
- `startZoneProbeApp` нужно обернуть `withOfflineDatabase` так же, как `createProbeApp`, иначе unit-тесты зон пойдут в базу `127.0.0.1:5432/test` и упадут;
- `createE2eApp` (TASK-8) после слияния лучше настраивать через `configureApiApp` из `api-app.ts` EPIC-4 вместо прямых вызовов `useClsMiddleware` и `useLogger`.
EPIC-5 меняет в `main.ts` только `runMigrate`.

## 28.10.2026, TASK-4. Миграции явным списком, CLI TypeORM на сборке

- Миграции перечислены в `databaseMigrations` (`apps/server/src/infra/database/database-migrations.ts`), а не glob по папке. TypeORM загружал бы файлы по glob своим `import()`. Из тестов на TypeScript и из глобальной подготовки vitest это ненадёжно. Явный список работает одинаково в `dist` и в тестах. Забытую в списке миграцию ловит unit-тест, который сверяет папку со списком.
- `migrationsTransactionMode: "each"`: каждая миграция в своей транзакции. Миграция с `CREATE INDEX CONCURRENTLY` отключает транзакцию у себя (`transaction = false`), а в режиме `all` так нельзя.
- DataSource для CLI — `apps/server/src/data-source.ts`. Его использует `migration:generate` после `nest build` (`dist/data-source.js`), переменные — из `.env` через `node --env-file-if-exists=.env`. `ts-node` не нужен.
- Таблица миграций — по умолчанию TypeORM, `migrations`.

## 28.10.2026, TASK-5. Шаги подготовки режима `migrate`

- Внутренние имена: интерфейс `PreparationStep { name; run() }`, токен `preparationSteps`, `PreparationRunner`, шаг `DatabaseMigrationStep` (`name = "databaseMigrations"`), функция `runDatabaseMigrations(url, migrations?)`. Порядок шагов задаёт фабрика провайдера `preparationSteps` в `MigrateModule`. Эпик хранилища файлов добавит туда шаг бакета и CORS после миграций.
- Режим `migrate` не подключает `DatabaseModule` приложения: он открывает свой DataSource по `migrationUrl` с пулом 1 и закрывает его после миграций.
- Ошибка шага не перехватывается. Промис верхнего уровня в `main.ts` отклоняется, Node печатает ошибку и выходит с кодом 1. `app.close()` выполняется в `finally`.
- Скрипт `start:migrate` (`nest start -- migrate`) — по образцу `start:api`, чтобы применить миграции к базе разработки перед `migration:generate`.
- Глобальная подготовка e2e применяет миграции тем же `runDatabaseMigrations`.

## 28.10.2026, TASK-6. Колонки `projects`

- `operator_allowed_origins` из схемы плана не входит в эпик: её добавляет EPIC-10 TASK-5 своей миграцией.
- `settings` в коде имеет тип `JsonObject` из `@sowa-chat/protocol`.
- У каждой колонки тип задан явно, у колонок из нескольких слов — явный `name`.

## 28.10.2026, TASK-7. Плагин транзакций и образец репозитория

- Плагин транзакций регистрируется через `ClsModule.registerPlugins` в `DatabaseModule`, а не в `AppClsModule`. `AppClsModule` подключён и в режиме `migrate`, где базы приложения нет.
- Образец репозитория — `ProjectsRepository` в `apps/server/src/domain/projects/`, модуль `ProjectsModule`. Внутренние методы: `create({ name })`, `findByName(name)`. Следующие репозитории пишутся по нему: `TransactionHost<TransactionalAdapterTypeOrm>`, доступ только через `txHost.tx.getRepository(...)`.

## 28.10.2026, TASK-8. Помощники e2e

Внутренние имена тестовых помощников: `useTestDatabase()`, `truncateAllTables(dataSource)`, `createProject(dataSource, fixture?)`, `createE2eApp()`. Очистка подключается явно в файле теста через `useTestDatabase()`, а не глобально: многим e2e-тестам база не нужна.

## 28.10.2026, TASK-5. Вопрос исполнителя: `@types/pg`

- Вопрос: добавить `@types/pg` в `devDependencies` `apps/server`? Без него `types server` падает (TS7016, TS7006 в `test/migrate-mode.e2e-spec.ts`).
- Решение: добавить `"@types/pg": "^8.23.1"`. У `pg` 8.23.1 своих деклараций нет, `@types/pg` в workspace нет, версия `8.23.1` на npm есть и совпадает с `pg`.
