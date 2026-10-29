# Отчёт по EPIC-14. Кэш и синхронизация реплик

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Модуль кэша на 60 секунд, ключи кэша, сброс на своей реплике | haiku | sonnet | нет |
| 2 | Кэш ключей `sk_` по `lookupPrefix` с проверкой хеша | sonnet | opus | нет |
| 3 | Снимок проекта в кэше по ID и по `publicKey` | haiku | sonnet | нет |
| 4 | Приём событий реплик через транспорт Redis в `api` и `worker` | sonnet | sonnet | в тесте импорт `PatternHandler` из корня `@nestjs/microservices` не существует (TS2305): тестировщик заменил на `@nestjs/microservices/enums/pattern-handler.enum.js` |
| 5 | Публикация сброса кэша из CLI на все реплики | sonnet | opus | нет |
| 6 | `OperatorsService.disable/enable`, события и аудит | haiku | sonnet | нет |
| 7 | Команды `operator:disable/enable`, `DisabledOperatorsModule` | haiku | sonnet | приёмка: `prettier` на импорте в `cli.module.ts` (поправлено) |
| 8 | Блокировка оператора сразу действует на всех репликах | sonnet | opus | в тесте `OperatorsService.disable` брал `TransactionHost` закрытого приложения CLI (`Driver not Connected`): тестировщик вынес тест в группу со своим экземпляром |

План эпика переписан планировщиком: вместо трёх задач сделаны восемь. Решения и внутренние имена: [decisions.md](decisions.md).

Принятые решения в `decisions.md`: изменения ключей, доменов и блокировок делает только CLI (отдельный процесс), поэтому «сброс на той же реплике» проверяется через сервис в одном процессе, а путь CLI → Redis → реплики проверяют e2e; CLI публикует события только в `beforeApplicationShutdown` (после коммита), при недоступном Redis команда выходит с кодом 0 и пишет `Replica events not sent: …`; в Redis уходят только `apiKey:<lookupPrefix>`, `project:<id>` и `operatorId`; `lastUsedAt` обновляется только при промахе кэша (не чаще раза в 60 секунд на реплике).

## Задача review

Правки по замечаниям «стоит поправить» (sonnet):

- `DisabledOperators` читает заблокированных через `OperatorsService.findDisabledIds()`, `OperatorsRepository` убран из `exports` `OperatorsModule` (два unit-спека обновил тестировщик);
- правила `cache.invalidate` для реплик строятся из `cacheInvalidationRules`, а не перечисляются второй раз;
- `disable` и `enable` делают ранний `return "unchanged"`, а не передают пары «имя события, изменение» во вспомогательный метод.

## Слияние с pipeline

Эпик 13 влит в `pipeline` раньше, поэтому `pipeline` влит в `feature/EPIC-14`. Конфликты только в `graphify-out` (взят из ветки эпика) и в статусах `tasks/README.md`.

## Итоговый прогон

`final-check.mjs` на этой машине не работает: порт 5432 занят контейнером другого проекта (`idodom-db`), `docker compose up` для dev-инфраструктуры не поднимается. Шаги выполнены вручную в том же порядке без `infra:up` (тесты поднимают PostgreSQL и Valkey сами): format, lint, types, unit, e2e. Первый прогон после слияния: e2e 64 файла, 844 теста прошли; unit упал в `audit-log.listener.spec.ts` (3 теста): они требовали, чтобы `AuditModule` стоял в `imports` сразу после `TelemetryModule`, а эпик 14 вставил между ними `AppCacheModule`; проверка заменена на относительный порядок. После правок ревью прогон повторён и прошёл: unit 1449 тестов, e2e 844 теста в 64 файлах, format, lint, types.

## Ревью (opus)

Блокирующих замечаний нет. Проверены: в кэше `sk_` только SHA-256 в hex, `timingSafeEqual` на попадании и на промахе, в Redis нет секретов, данные событий реплик проверяются Zod, `inheritAppConfig` не используется (глобальный `ZoneGuard` отклонял бы все события реплик), CLI публикует после коммита. Исправлены пункты 2, 5, 6. Остались:

- **Потеря события `operator.enabled`.** Если событие потеряется (pub/sub не хранит сообщения при переподключении реплики), оператор останется заблокированным на этой реплике до её перезапуска, даже со свежим токеном: граница в 15 минут из `decisions.md` обоснована только для `disabled`. Есть и окно при старте: `load()` выполняется в `app.init()`, а подписка включается в `startAllMicroservices()`. Событие из Redis снимает блокировку по данным события без сверки с БД. Предложение: по событию оператора и по `ready` после переподключения вызывать `DisabledOperators.load()`, источником правды остаётся БД.
- **Локальные подписчики срабатывают до коммита.** `LocalCacheInvalidation` и `DisabledOperators` реагируют на доменные события внутри `@Transactional()`: сброс кэша до коммита позволяет параллельному запросу закэшировать старую строку на 60 секунд, а при откате `onOperatorEnabled` разблокирует оператора, оставшегося заблокированным в БД. Сейчас изменения идут только из CLI, поэтому проблема скрытая; нужно записать в `decisions.md` или перевести подписчики на работу после коммита.
- **Кэш снимка проекта не используется.** `findSnapshotById` и `findSnapshotByPublicKey` никто не вызывает: `VisitorSessionsService.create` (EPIC-13) ходит в `ProjectsRepository.findByPublicKey` напрямую, самый нагруженный путь идёт мимо кэша, и сервис одного домена внедряет репозиторий другого.
- `OperatorsRepository`: сырой SQL с приведением `as [OperatorIdRow[], number]`, которое держится на формате ответа драйвера; соседний `ApiKeysRepository.revokeByPrefix` делает то же условное обновление через QueryBuilder с `.returning("id")`.
- Мелочи: `@Global()` на `AppCacheModule` ничего не даёт (`CacheModule.register({ isGlobal: true })` уже делает `CACHE_MANAGER` глобальным); `cache.set` стоит после `await touchLastUsedAt` и расширяет окно устаревания; `OperatorReplicaEventsController` лежит в `domain/`, а `CacheInvalidateController` в `infra/`; числа `256` и `100` без констант, каналы Redis без префикса; `redisTransportOptions`: `Number(...)` для `db` и `port` без проверки, query-параметры URL игнорируются; обобщённые хелперы `cacheInvalidatedEventNames` и `replicaEventNames` с единственным вызовом; два класса команд оператора дублируют конструктор и опции; `OperatorActorKind` повторяет `KeyActorKind`, `actorKind` литералом в `OperatorBlockEvent`.

## Для следующих эпиков

- EPIC-16 и EPIC-13/20: читать проект через `ProjectsService.findSnapshotById` и `findSnapshotByPublicKey`, чтобы использовать кэш.
- Новое правило сброса кэша добавляется в `cacheInvalidationRules`, правило для реплик строится из него; новые события для реплик (кроме `cache.invalidate`) добавляются в `replicaEventRules`.
- `startZoneE2eApp(controllers, imports)` принимает второй параметр: модули, нужные пробам.

## Ручные проверки

Нет.

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-14`.
