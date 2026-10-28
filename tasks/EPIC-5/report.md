# Отчёт по EPIC-5. База данных и миграции

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Переменные окружения базы | haiku | sonnet | нет |
| 2 | PostgreSQL 18.6 в контейнере для e2e | haiku | sonnet | тест не проходил check-types (`string | undefined`), исправлен |
| 3 | Подключение TypeORM в api, worker, cli | sonnet | sonnet | приёмка просила убрать кэш `WeakMap` в `DatabaseModule.forRoot`, исполнитель показал, что без него `DataSourceNameRegistry` ломает JSON-логи (`logging.e2e-spec`), кэш оставлен |
| 4 | Список миграций, DataSource для CLI, скрипты `migration:*` | haiku | sonnet | нет |
| 5 | Режим `migrate` | sonnet | sonnet | вопрос планировщику про `@types/pg`: добавлен |
| 6 | Сущность `Project` и миграция `projects` | haiku | sonnet | нет |
| 7 | `@Transactional()` и `ProjectsRepository` | sonnet | opus | старый unit-тест `database.module.spec.ts` ждал один импорт, исправлен |
| 8 | E2e-помощники: `useTestDatabase`, `createProject`, `createE2eApp` | haiku | sonnet | нет |

Решения и внутренние имена: [decisions.md](decisions.md).

## Задачи review

- Тест задачи 2 ждал пустую схему, а миграции создают таблицы `migrations` и `projects`: тест ждёт именно их.
- Правки по ревью: убран лишний запрос после `save` в `ProjectsRepository.create`, `createTwo` в e2e-тесте транзакций разделён на `createTwo` и `createTwoThenFail`.

## Слияние с pipeline

Ветка эпика создана до слияния эпиков 4 и 7, поэтому `pipeline` влит в `feature/EPIC-5`. Конфликты в `api.module.ts` (оставлены все импорты: ZonesModule, ApiHttpModule, `DatabaseModule.forRoot(databaseEntities)`) и `main.ts` (`runApi` от эпика 7, `runMigrate` от эпика 5). `startZoneProbeApp` и тест `EADDRINUSE` в `zone-servers.spec.ts` обёрнуты в `withOfflineDatabase`. Файлы `graphify-out` взяты из ветки эпика.

## Итоговый прогон

Дважды падал на нагрузке (два прогона на одном Docker, импорты по 80–175 с) и на старом тесте задачи 2. После исправлений, ревью и слияния с `pipeline` прошёл (PASS).

## Ревью (opus)

Блокирующих замечаний нет. Исправлены два пункта «стоит поправить». Остались «мелочи»:

- `data-source.ts:6` `databaseConfig()` разбирает всё окружение, поэтому `migration:generate` требует переменные Redis и S3 (без `.env` ошибка непонятная).
- `database-migrations.spec.ts:21` тест требует `migrations/.gitkeep`, хотя в папке уже есть миграция; тест «is an array» проверяет то, что гарантирует тип.
- `package-scripts.spec.ts:8-24` сверяет подстроки скриптов, ломается от любой переформулировки.
- `test/support/test-database.ts:7` строка `'migrations'` повторяет имя таблицы миграций TypeORM по умолчанию (лучше `migrationsTableName`).
- `main.ts:8` порядок импортов `infra/*`.

## Ручные проверки

- `pnpm --filter @sowa-chat/server migration:create src/infra/database/migrations/Probe` создаёт файл `<время>-Probe.ts`; файл после проверки удалить.
- `pnpm --filter @sowa-chat/server start:migrate` запускается.
- После `start:migrate` повторный `migration:generate` сообщает об отсутствии изменений, в SQL миграции нет camelCase колонок.

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-5`.
