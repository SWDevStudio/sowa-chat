# EPIC-6. Решения

## 28.10.2026, разбивка эпика (режим plan)

- Было 5 задач, стало 4. Проверки здоровья и `/status` объединены в TASK-4: обе работают в `infra/health/` и используют одни проверки PostgreSQL и Redis.
- Порядок ради параллельности. Волна 1: TASK-1 (Valkey в e2e, только `test/support/*` и `vitest.config.e2e.ts`) и TASK-2 (`/metrics`, `telemetry/metrics/` и `api.module.ts`) — без общих файлов. Волна 2: TASK-3 (Redis). Волна 3: TASK-4. TASK-2, 3 и 4 меняют `api.module.ts` и идут по очереди.
- Valkey в e2e (TASK-1) идёт раньше клиента Redis и не зависит от него: проверка `SET`/`GET` идёт клиентом `ioredis` прямо в тесте. Клиент (TASK-3) зависит от TASK-1: после него `api` и `worker` при старте ходят в Redis, и e2e-тестам нужен контейнер. По той же причине в EPIC-5 контейнер шёл первым.
- Исполнители: TASK-1 и TASK-2 — haiku. TASK-3 — sonnet: связка конфига, жизненного цикла, двух режимов и заглушек unit-тестов. TASK-4 — sonnet: обработка 503 в обход глобального фильтра ошибок и общие проверки для двух контроллеров.
- Тесты на opus — только TASK-4: в `/status` уходят тексты ошибок драйверов, тест проверяет отсутствие строк подключения и паролей.
- Ревью: opus. Предложение по разбивке ставило sonnet. В эпике клиент Redis с таймаутами, переподключением и закрытием соединений и служебная зона — граница доступа.
- Сложность у всех задач «обычная»: в каждой несколько новых файлов, а e2e-критерии `check-task` не запускает.

## 28.10.2026, TASK-3. Клиент Redis

- Токен провайдера — класс `Redis` из `ioredis`, инъекция `@Inject(Redis)`. Отдельный строковый токен не нужен: класс клиента один, а заглушка подменяется `overrideProvider(Redis)`. Внутренние имена: `RedisModule`, `createRedisClient`, `waitForRedis`, `closeRedis`, `redisStartupTimeoutMs`, `withOfflineRedis`.
- Недоступный Redis при старте: фабрика ждёт `ready` не больше 5 секунд (`redisStartupTimeoutMs`), затем `disconnect()` и ошибка `Redis is unavailable: <последняя ошибка>`. Nest завершает процесс с кодом 1, как с базой в EPIC-5. Число попыток при старте не ограничивается через `retryStrategy`: он остался бы и после старта, и клиент перестал бы переподключаться после сбоя Redis. По умолчанию `ioredis` переподключается бесконечно — после старта это и нужно, а старт ограничен временем.
- `connectionName: "sowa-chat-server"`: соединения сервиса видны в `CLIENT LIST`, по нему e2e-тест проверяет подключение и закрытие. То же имя, что `applicationName` в PostgreSQL.
- `connectTimeout: 5000` — подключение к недоступному хосту не висит. `maxRetriesPerRequest: 3` вместо 20 по умолчанию: команда при обрыве ждёт не больше трёх переподключений. Модулям BullMQ нужен `maxRetriesPerRequest: null`, они зададут его в своём `duplicate()`.
- Подписчик `error` пишет `warn` через `Logger` Nest: без него `ioredis` печатает ошибки в обход логгера.
- Закрытие — `onApplicationShutdown` класса `RedisModule`: `quit()` при `ready`, иначе `disconnect()`. Критерий «после SIGTERM соединений не остаётся» снят: обработка SIGTERM — отклонённая EPIC-2 TASK-4, в `main.ts` нет `enableShutdownHooks`. Закрытие проверяет e2e-тест через `app.close()`.
- `RedisModule` подключён в `api` и `worker`, не в `cli` и `migrate`.
- Unit-тесты, которые собирают `ApiModule` (`createProbeApp`, `startZoneProbeApp`, `zone-servers.spec.ts`), подменяют клиент заглушкой `withOfflineRedis` (`test/support/offline-redis.ts`) со `status: "end"`, как `withOfflineDatabase` в EPIC-5.

## 28.10.2026, TASK-1. Valkey в e2e

- Адрес передаётся как у PostgreSQL: `project.provide("redisUrl")` в глобальной подготовке, `test/support/redis-url.setup.ts` пишет его в `process.env.REDIS_URL`. Порт случайный.
- `GenericContainer` из `testcontainers` (уже в зависимостях), а не отдельный пакет модуля Valkey.
- Очистка — помощник `useTestRedis()` с `FLUSHALL` перед каждым тестом, подключается явно в файле теста, как `useTestDatabase()`.

## 28.10.2026, TASK-2. Реестр метрик

- Токен — класс `Registry` из `prom-client`, свой экземпляр на приложение, глобальный `register` не используется: тесты собирают `ApiModule` много раз в одном процессе, и глобальный реестр ругался бы на повторную регистрацию метрик.
- Модуль в `apps/server/src/telemetry/metrics/`, как в прежней редакции задачи. `Content-Type` — `Registry.PROMETHEUS_CONTENT_TYPE`.
- Внутренние имена: `MetricsModule`, `MetricsController`.

## 28.10.2026, TASK-4. Проверки здоровья и `/status`

- Ответ 503 `/health/ready` формирует контроллер: ловит `ServiceUnavailableException` Terminus и возвращает его тело со статусом 503. Иначе глобальный `HttpErrorFilter` (EPIC-7) заменил бы тело на общее `internalError` без списка недоступных зависимостей.
- Проверка Redis: при `status !== "ready"` — сразу `down` с `Redis connection is <status>`, иначе `PING` с таймаутом 1000 мс. Команда при оборванном соединении встала бы в очередь `ioredis` до переподключения.
- PostgreSQL — `TypeOrmHealthIndicator.pingCheck("postgres", { timeout: 1000 })`.
- Ручной перевод в «не готов» — `ReplicaReadiness.markNotReady()`, ключ в ответе `replica`. Вызывать его будет эпик нескольких реплик.
- `/status`: `reason` — текст `message` из результата Terminus (ошибка драйвера или таймаут). Тексты ошибок соединения `pg` и `ioredis` не содержат пароль и строку подключения. `mode` всегда `"api"`. Версия — из `apps/server/package.json` по пути относительно `import.meta.url`.
- Поля ответа `/status` (`version`, `mode`, `uptimeSeconds`, `postgres`, `redis`, `status`, `reason`) взяты из прежней редакции задачи, camelCase по правилам CLAUDE.md. Значения `up` и `down` — значения Terminus.
- Внутренние имена: `HealthModule`, `HealthController`, `StatusController`, `StatusService`, `DependencyChecks`, `ReplicaReadiness`, `readServerVersion`, `ServerStatus`, `DependencyStatus`.

## 28.10.2026, TASK-2. Вопрос о `Content-Type` `/metrics`

- Вопрос: Express для строкового ответа отдаёт `text/plain; charset=utf-8; version=0.0.4`, тест ждал начало `text/plain; version=0.0.4`.
- Решение: оставить `@Header("Content-Type", Registry.PROMETHEUS_CONTENT_TYPE)` и возврат строки, поправить тест. `Registry.PROMETHEUS_CONTENT_TYPE` в prom-client — `text/plain; version=0.0.4; charset=utf-8`, Express только переставляет параметры по алфавиту. Prometheus разбирает MIME-тип с параметрами, порядок параметров для него не важен. `@Res()` с ручным `setHeader` и `end` хуже читается и отключает обычную обработку ответа Nest.
- Тест проверяет `Content-Type` по `^text/plain;` и наличию `version=0.0.4`.
