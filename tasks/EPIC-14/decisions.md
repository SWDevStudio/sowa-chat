# EPIC-14. Решения

## 29.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 3, стало 8: модуль кэша (1), кэш ключей (2), снимок проекта (3), приём событий реплик (4), публикация из CLI (5), блокировка в сервисе (6), команды оператора (7), блокировка на всех репликах (8). Основа — `tasks/planning/split-EPIC-4-14.md`, проверенное по коду. Отличие: команды оператора (в предложении — одна задача 6) разбиты на сервис с событиями и аудитом (6) и команды с выносом модуля списка блокировок (7), чтобы у задач на haiku было не больше 5 файлов кода.
- Волны: сразу 1 и 6; после 1 — 2, 3, 4 параллельно (общих файлов нет); после 6 — 7; 5 после 2, 3, 4; 8 последней. Общие файлы: `api.module.ts` и `worker.module.ts` — 1, затем 4; `cli.module.ts` — 1, 5, 7 (идут по очереди по «Владеет»); `main.ts` и `test/support/zone-e2e-app.ts` — 4; `domain-events.ts` и `audited-events.ts` — 6; `replica-events.ts` — 4, затем 8; `replica-event-rules.ts` — 5, затем 8; `disabled-operators.module.ts` — 7, затем 8; `operators.module.ts` — 7.
- Исполнители: haiku — 1, 3, 6, 7; sonnet — 2, 4, 5, 8. Тесты opus — 2 (кэш авторизации: подделка с тем же `lookupPrefix`, открытый ключ в кэше, отозванный ключ), 5 (отзыв ключа на всех репликах, публикация после коммита, недоступный Redis), 8 (блокировка оператора на всех репликах): 3 из 8. Это больше четверти внутри эпика: весь эпик о свежести авторизации между репликами; TASK-4 (приём событий) отдан sonnet, чтобы не брать четвёртую. Сложность у всех обычная: у каждой задачи e2e или правила безопасности.
- Ревью: opus — согласованность кэша авторизации между репликами, Redis pub/sub, блокировка операторов.
- Нужны эпики: 6 (Redis, `REDIS_URL`, `RedisModule`), 8 (`DomainEventBus`, журнал аудита), 9 (`ApiKeysService`, `lookupPrefix`), 10 (CLI, команды ключей и доменов, решение о публикации из `cli`), 12 (операторы, `DisabledOperators`). Все влиты в `pipeline`.

## 29.10.2026, расхождения check 1, 2. Изменения идут из CLI

- Ключи, домены и блокировки меняет только CLI — отдельный процесс без кэша реплик. Критерии «на той же реплике» переписаны: в TASK-1 и TASK-2 сброс проверяется через сервис в одном процессе (`LocalCacheInvalidation` по доменному событию), путь CLI → Redis → реплики — в e2e TASK-5 и TASK-8.
- Публикация из `cli` — по решению EPIC-10: `ClientsModule` с `Transport.REDIS` только для публикации, без `RedisModule` и `waitForRedis`, клиент подключается при первой отправке. При недоступном Redis команда выходит с кодом 0 и предупреждением `Replica events not sent: …`.
- CLI отправляет события реплик в `beforeApplicationShutdown`, а не в обработчике доменного события. Доменные события публикуются внутри транзакции (`@Transactional()`), а у `@nestjs-cls/transactional` нет хука после коммита: реплика, получив сброс до коммита, перечитала бы старую строку и держала её 60 секунд. `runCliCommand` закрывает приложение после завершения команды, то есть после коммита; `ClientsModule` закрывает клиент позже, в `onApplicationShutdown`. Событие команды, которая упала и откатила транзакцию, тоже уйдёт — это лишний сброс, он безвреден.
- Подписка на события реплик — только в `api` и `worker`, в `cli` её нет.
- Оставшееся окно: запрос на реплике прочитал строку из БД до коммита CLI, а положил её в кэш после пришедшего сброса — старая запись проживёт до 60 секунд. Окно — время одного запроса к БД; последствия те же, что у потерянного события, которое план допускает («если событие потеряется, запись всё равно истечёт через 60 секунд»). Версии записей ради этого окна не вводим.

## 29.10.2026, расхождение 3. Запуск транспорта в режимах

- `api`: гибридное приложение — `connectReplicaEvents(app)` (`app.connectMicroservice`) после `configureApiApp`, затем `app.init()`, `app.startAllMicroservices()`, `ZoneServers.listen`. Без `inheritAppConfig`: глобальный `ZoneGuard` не должен действовать на обработчики событий.
- `worker`: `NestFactory.createMicroservice(WorkerModule, { bufferLogs: true, ...replicaEventsMicroservice })` с `AsyncMicroserviceOptions` (`inject: [redisConfig.KEY]`): `REDIS_URL` берётся из конфига, а не из `process.env` до старта. HTTP у `worker` по-прежнему нет. Кэш в `worker` сейчас пуст, но подписка нужна будущим кэшам `worker` (настройки ботов) по плану «каждая реплика».
- Транспорт Nest принимает объект параметров ioredis, а не URL: `REDIS_URL` разбирает `redisTransportOptions` (`new URL`, схема `rediss:` → `tls: {}`). Реплики переподключаются без ограничения попыток (`retryAttempts: Number.MAX_SAFE_INTEGER`, `retryDelay: 1000`), имя соединения `sowa-chat-replica-events`. Клиент CLI — без `retryAttempts`, `connectTimeout` 2000 мс, отправка ограничена 3000 мс.
- `startZoneE2eApp` подключает транспорт так же, как `runApi`, чтобы e2e на двух экземплярах в одном процессе получали события.

## 29.10.2026, расхождение 4. Читатели проекта и настройки

- Читателей проекта по `publicKey` и по ID в коде нет, потребители появятся в EPIC-13 (сессия посетителя по `publicKey`) и EPIC-16 (CORS по доменам проекта). TASK-3 добавляет `ProjectsService.findSnapshotById` и `findSnapshotByPublicKey` сразу с кэшем; тесты идут через сервис. Планировщикам EPIC-13 и EPIC-16 брать эти методы, а не писать свои.
- Снимок `ProjectSnapshot { id, name, publicKey, allowedOrigins, operatorAllowedOrigins, settings }` без `createdAt`: значения кэша JSON-совместимые, хранилище может их сериализовать.
- Ключи: `project:<id>` — снимок, `projectIdByPublicKey:<publicKey>` — ID проекта. Сброс по `project.allowedOriginsChanged` и `project.operatorAllowedOriginsChanged` удаляет `project:<id>`; запись по `publicKey` не сбрасывается — `publicKey` не меняется, команды смены нет.
- Команды и события изменения `settings` нет, поэтому в этом эпике нет правила сброса для настроек. Эпик, который добавит изменение настроек, добавит событие и правило в `cache-invalidation-rules.ts` и `replica-event-rules.ts`.
- Объединённый список доменов всех проектов для preflight — EPIC-16.

## 29.10.2026, расхождения 5, 6. Ключ кэша `sk_` и `lastUsedAt`

- Ключ кэша — `apiKey:<lookupPrefix>` (колонка `api_keys.prefix`), значение `CachedApiKey { apiKeyId, projectId, botId, kind, keyHash }`, `keyHash` — SHA-256 в hex. На попадании хеш присланного ключа сравнивается с `keyHash` через `timingSafeEqual`. Так сброс идёт по `prefix` из события `apiKey.revoked`, а в кэше нет открытых ключей. Кэшируются только действующие ключи; неудачи не кэшируются.
- `touchLastUsedAt` вызывается только при промахе кэша: на одной реплике `last_used_at` обновляется не чаще раза в 60 секунд. Этого хватает для сценария плана «`last_used_at` старого ключа перестал расти → `key:revoke`». Тест «`last_used_at` старше минуты обновляется следующей verify» в `api-keys.e2e-spec.ts` очищает кэш перед второй `verify` — правка в TASK-2.

## 29.10.2026, расхождение 7. Блокировка оператора

- `DisabledOperators.onApplicationBootstrap` уже вызывает `load()` — пункт «загрузка при старте» не делается заново.
- `DisabledOperators` выносится в `DisabledOperatorsModule` (TASK-7), который подключён только в `api` через `OperatorAuthModule`. CLI получает `OperatorsModule` без списка блокировок.
- Реплика обновляет список по событию реплик (контроллер `OperatorReplicaEventsController`) и по доменному событию в своём процессе (`@OnDomainEvent` в `DisabledOperators`).
- Потерянное событие блокировки (Redis недоступен у CLI или у реплики) не исправляется само до перезапуска реплики: токен оператора действует до своего истечения, не дольше 15 минут — граница из плана. Периодическую перезагрузку списка не делаем: план её не требует.

## 29.10.2026, имена

PLAN.md закрепляет только `cache.invalidate` и `@nestjs/cache-manager`. Остальные имена внутренние, выбраны по разделу «Дизайн публичного API» CLAUDE.md (camelCase, имена событий `объект.действие` как у существующих доменных событий):

- Доменные события `operator.disabled` и `operator.enabled` с данными `OperatorBlockEvent { operatorId, projectId, externalId, actorKind }` — как `apiKey.revoked` и `identityKey.revoked`: два события, а не одно с флагом, потому что подписчики (WebSocket разрывает сокеты только на `disabled`) различаются. Запись журнала: `targetKind: "operator"`, `targetId` — ID оператора, `data: { externalId }`.
- События реплик (Redis): `cache.invalidate` с `{ keys }` (1–100 ключей до 256 символов), `operator.disabled` и `operator.enabled` с `{ operatorId }`. Имена событий операторов совпадают с доменными: это то же изменение, доставленное другим путём.
- Команды `operator:disable` и `operator:enable` с `--project` и `--external-id` — из черновика эпика; вывод `disabled: …`, `already disabled: …`, `enabled: …`, `already enabled: …` — по образцу `origin:add`.
- Внутренние имена: `AppCacheModule`, `cacheTtlMs`, `cacheKeys` (`apiKey`, `project`, `projectIdByPublicKey`), `apiKeyCacheKeys`, `projectCacheKeys`, `CacheInvalidationRule`, `CacheInvalidationRules`, `cacheInvalidationRules`, `cacheInvalidatedEventNames`, `LocalCacheInvalidation`, `CachedApiKey`, `ProjectSnapshot`, `toProjectSnapshot`, `ProjectsService.findSnapshotById`, `findSnapshotByPublicKey`, `ProjectsRepository.findById`, `findByPublicKey`, `RedisConnectionOptions`, `redisTransportOptions`, `replicaEventPatterns` (`cacheInvalidate`, `operatorDisabled`, `operatorEnabled`), `cacheInvalidateEventSchema`, `CacheInvalidateEvent`, `operatorReplicaEventSchema`, `OperatorReplicaEvent`, `unlimitedRetryAttempts`, `replicaEventsRetryDelayMs`, `replicaEventsTransport`, `replicaEventsMicroservice`, `connectReplicaEvents`, `CacheInvalidateController`, `ReplicaEventsModule`, `ReplicaEventMessage`, `ReplicaEventRule`, `ReplicaEventRules`, `replicaEventRules`, `replicaEventNames`, `ReplicaEventsPublisher`, `ReplicaEventsPublisherModule`, `replicaEventsClient`, `replicaPublishTimeoutMs`, `replicaPublishConnectTimeoutMs`, `OperatorActorKind`, `OperatorBlockChange`, `ChangeOperatorBlockInput`, `OperatorNotFoundError`, `OperatorsService.disable`, `enable`, `OperatorsRepository.markDisabled`, `markEnabled`, `findByExternalId`, `OperatorBlockEvent`, `OperatorDisableCommand`, `OperatorEnableCommand`, `DisabledOperatorsModule`, `OperatorReplicaEventsController`.
