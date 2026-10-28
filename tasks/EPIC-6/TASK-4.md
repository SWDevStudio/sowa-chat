# EPIC-6 / TASK-4. Проверки /health/live, /health/ready и сводка /status

Исполнитель: sonnet
Зависит от: TASK-3
Владеет: apps/server/src/infra/health/, apps/server/src/api.module.ts, apps/server/test/health.e2e-spec.ts
Ветка: feature/EPIC-6

## Что сделать

Папки `apps/server/src/infra/health/` ещё нет — создать. Проверки на `@nestjs/terminus` (установлен 12.1.0) в служебной зоне. Все контроллеры — `@Zone("management")` и `@Controller({ path: ..., version: VERSION_NEUTRAL })`. Проверки PostgreSQL и Redis общие для `/health/ready` и `/status`.

1. `dependency-checks.ts` — `DependencyChecks`, общие проверки зависимостей:
   - `postgres()` — `this.typeOrm.pingCheck("postgres", { timeout: 1000 })` (`TypeOrmHealthIndicator`).
   - `redis()` — `this.indicators.check("redis").attempt(...).withTimeout(1000)` (`HealthIndicatorService`). Внутри `attempt`: если `this.redis.status !== "ready"`, бросить `new Error(`Redis connection is ${this.redis.status}`)`; иначе `await this.redis.ping()`. Клиент — `@Inject(Redis)` из `RedisModule` (TASK-3). Команда при разорванном соединении встала бы в очередь `ioredis`, поэтому статус проверяется до `PING`.
   - Оба метода возвращают `HealthIndicatorResult` Terminus: при отказе — `{ <ключ>: { status: "down", message } }`, исключений не бросают.
   - Результат `redis()` не пересобирать вручную: `withTimeout` Terminus 12.1.0 добавляет поле `responseTime` (мс), оно остаётся в ответе `/health/ready`. Тесты сверяют `error.redis` через `toMatchObject({ status: "down", message })`, а не `toEqual`. В `/status` `responseTime` не попадает: `StatusService` собирает `DependencyStatus` только из `status` и `message`, без копирования остальных полей результата.

2. `replica-readiness.ts` — `ReplicaReadiness`, ручной перевод реплики в «не готова»:
   - `markNotReady(): void`;
   - `isHealthy(key: string)` — `this.indicators.check(key).up()`, после `markNotReady()` — `.down({ message: "replica is not ready" })`.
   Сейчас никто `markNotReady()` не вызывает: возможность нужна эпику нескольких реплик (SIGTERM → readiness = false).

3. `health.controller.ts` — `HealthController`, путь `health`:
   - `GET /health/live` — `this.health.check([])` (`HealthCheckService`), всегда 200, пока процесс отвечает. Зависимости не проверяет.
   - `GET /health/ready` — `this.health.check([() => this.readiness.isHealthy("replica"), () => this.checks.postgres(), () => this.checks.redis()])`.
   - Обработка 503. Terminus при отказе бросает `ServiceUnavailableException` с результатом проверки, а глобальный `HttpErrorFilter` (EPIC-7) заменил бы тело на `{ code: "internalError", message: "Internal server error", requestId }` и потерял бы, что именно недоступно. Поэтому `ready` принимает `@Res({ passthrough: true }) response: Response` (express), ловит только `ServiceUnavailableException`, ставит `response.status(503)` и возвращает `error.getResponse()`. Остальные ошибки бросает дальше.
   - Оба метода с `@HealthCheck()`.

4. `status.service.ts` — `StatusService.read(): Promise<ServerStatus>`, `status.controller.ts` — `StatusController`, путь `status`, `@Get()` возвращает `read()`. Ответ всегда 200:

   ```json
   {
     "version": "0.0.1",
     "mode": "api",
     "uptimeSeconds": 1234,
     "postgres": { "status": "up" },
     "redis": { "status": "down", "reason": "Redis connection is reconnecting" }
   }
   ```

   - `version` — `readServerVersion()` из `server-version.ts`: читает `package.json` сервера через `readFileSync(new URL("../../../package.json", import.meta.url), "utf8")` и `JSON.parse`, отдаёт поле `version`. Путь одинаковый для `src/infra/health/` и `dist/infra/health/` (`rootDir` сборки — `src`). Читается один раз, в конструкторе `StatusService`.
   - `mode` — всегда `"api"`: служебный порт есть только в режиме `api`.
   - `uptimeSeconds` — `Math.floor(process.uptime())`.
   - `postgres` и `redis` — из `DependencyChecks` (обе проверки параллельно, `Promise.all`). `up` → `{ status: "up" }`; `down` → `{ status: "down", reason: <message из результата Terminus> }`. Текст — сообщение ошибки драйвера или `timeout of 1000ms exceeded`. Тексты ошибок соединения `pg` и `ioredis` не содержат пароль и строку подключения, отдельной чистки нет.
   - Типы: `type DependencyStatus = { status: "up" } | { status: "down"; reason: string }`, `interface ServerStatus { version; mode; uptimeSeconds; postgres: DependencyStatus; redis: DependencyStatus }`. Новые поля (S3, сокеты, очереди, outbox) добавляются в `ServerStatus` и `read()`.

5. `health.module.ts` — `HealthModule`: `imports: [TerminusModule, RedisModule]`, `controllers: [HealthController, StatusController]`, `providers: [DependencyChecks, ReplicaReadiness, StatusService]`, `exports: [ReplicaReadiness]`. Добавить `HealthModule` в `imports` `ApiModule` (`apps/server/src/api.module.ts`) последним. В `WorkerModule` не добавлять.

## Где

- `apps/server/src/infra/health/` — новые файлы: `dependency-checks.ts`, `replica-readiness.ts`, `health.controller.ts`, `status.service.ts`, `status.controller.ts`, `server-version.ts`, `health.module.ts`; unit-тесты `*.spec.ts` рядом.
- `apps/server/src/api.module.ts` — правка.
- Unit-тесты: `startZoneProbeApp([])` (`apps/server/test/support/zone-probe.ts`) — PostgreSQL и Redis в нём заглушки (`withOfflineDatabase`, `withOfflineRedis`), обе проверки `down`. Для «Redis работает, PostgreSQL нет» тест собирает `ApiModule` сам, по образцу `apps/server/src/infra/zones/zone-servers.spec.ts`, с `overrideProvider(Redis).useValue({ status: "ready", ping: () => Promise.resolve("PONG"), quit: () => Promise.resolve("OK"), disconnect: () => undefined })`.
- E2e: `apps/server/test/health.e2e-spec.ts` — `api` из `dist/main.js` на контейнерах PostgreSQL и Valkey, по образцу `apps/server/test/database-connection.e2e-spec.ts`. Запуск: `pnpm --filter @sowa-chat/server test:e2e -- test/health.e2e-spec.ts`, нужен Docker.

## Требования из плана

- Readiness проверяет Postgres и Redis, liveness — только сам процесс. Если проверять БД в liveness, её падение перезапустит все поды.
- Обновление (rolling update): SIGTERM → readiness = false → пауза → сокеты закрываются → клиенты уходят на другие поды. Сейчас нужна только возможность перевести readiness в «не готов».
- Служебная зона (порт 9090), наружу не публикуется: `/health/live`, `/health/ready`, `/metrics`, `/status`.
- Сводка состояния: JSON на `/status` для человека через `curl` — версия, аптайм, открытые сокеты, длина очередей, отставание outbox, состояние PostgreSQL, Redis и S3, боты со сработавшим предохранителем. Сейчас — только версия, аптайм, PostgreSQL и Redis; S3 добавится в эпике хранилища файлов.

## Документация

- https://docs.nestjs.com/recipes/terminus
- https://docs.nestjs.com/controllers

## Критерии приёмки

- E2e: при работающих PostgreSQL и Valkey `/health/live` и `/health/ready` на служебном порту отвечают 200, `/status` — 200 с `postgres.status` и `redis.status` = `up`, `version` = `version` из `apps/server/package.json`, `uptimeSeconds` — целое число не меньше 0. В теле `/status` нет значений `DATABASE_URL` и `REDIS_URL` и пароля базы.
- Unit: при недоступном PostgreSQL и работающем Redis `/health/ready` отвечает 503, в теле `error.postgres.status` = `down`, а `redis` — в `info`; `/health/live` — 200; `/status` — 200 с `postgres.status` = `down`, непустым `reason` и `redis.status` = `up`.
- Unit: после `app.get(ReplicaReadiness).markNotReady()` `/health/ready` отвечает 503 и в теле есть `error.replica`; при оборванном Redis (заглушка `withOfflineRedis`) `redis.reason` = `Redis connection is end`.
- Unit: `/health/live`, `/health/ready` и `/status` на публичном порту отвечают 404, `/v1/status` на служебном — 404.

## Чего не делать

- Не вызывать `markNotReady()` по SIGTERM — это эпик нескольких реплик, а обработка SIGTERM отклонена (EPIC-2 TASK-4).
- Не добавлять S3, сокеты, очереди и outbox в `/status`.
- Не менять `HttpErrorFilter`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
