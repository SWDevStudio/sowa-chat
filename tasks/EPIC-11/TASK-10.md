# EPIC-11 / TASK-10. Сводка в логе при старте api и worker

Исполнитель: sonnet
Зависит от: TASK-4, TASK-5, TASK-7
Владеет: apps/server/src/infra/config/startup-summary.config.ts, apps/server/src/infra/config/startup-summary.config.spec.ts, apps/server/src/infra/config/config.module.ts, apps/server/src/domain/startup/startup-summary.service.ts, apps/server/src/domain/startup/startup-summary.service.spec.ts, apps/server/src/domain/startup/startup.module.ts, apps/server/src/worker.module.ts, apps/server/src/main.ts, apps/server/test/startup-summary.e2e-spec.ts
Коммит: [SERVER]: log startup summary for api and worker
Ветка: feature/EPIC-11

## Что сделать

При старте сервис пишет в лог сводку: режим, зоны и порты, проекты и их домены, какие секреты заданы — без значений секретов. Предупреждения проверок окружения пишет `EnvironmentChecksService` (TASK-3) строками `warn` перед сводкой; сводка их не повторяет.

1. `apps/server/src/infra/config/startup-summary.config.ts` — статусы секретов читаются из сырых строк `process.env` (это можно только в `infra/config`):

   ```ts
   export type SecretStatus = "set" | "notSet" | "generatedForDevelopment";
   export const summarizedSecrets = ["SOWA_ENCRYPTION_KEYS", "SOWA_TOKEN_SIGNING_KEYS", "SOWA_INIT_SERVER_KEY"] as const;

   export const startupSummaryConfig = registerAs("startupSummary", () => {
     const env = parseEnv(process.env);
     return { env: env.SOWA_ENV, secrets: [...] };
   });
   ```

   `secrets` — `{ name, status }` для каждого имени из `summarizedSecrets`, по порядку. Статус: значение `process.env[name]` не задано или `""` → `notSet`; в development значение равно значению этой переменной в `readDevelopmentSecrets(env.SOWA_DEV_SECRETS_DIR)?.env` (TASK-1) → `generatedForDevelopment`; иначе `set`. В production файл не читается. Зарегистрировать в `load` у `AppConfigModule` (`config.module.ts`).

2. `apps/server/src/domain/startup/startup-summary.service.ts` — `StartupSummaryService`:
   - конструктор: `@Inject(startupSummaryConfig.KEY)`, `@Inject(portsConfig.KEY)`, `@Inject(ProjectsService)`;
   - `async log(mode: "api" | "worker"): Promise<void>` — строки `logger.log(...)` (`new Logger("StartupSummary")`), по порядку:
     - `Startup summary: mode ${mode}, SOWA_ENV ${env}`;
     - только для `api`: для каждой зоны из `apiZones` (`apps/server/src/infra/zones/zone.ts`) — `Zone ${zone}: port ${ports[zone]}`;
     - `Projects: ${число}` (`projects.list()`);
     - для каждого проекта — `Project ${name}: allowedOrigins ${список}, operatorAllowedOrigins ${список}`, список — через `, `, пустой — `-`;
     - для каждого секрета — `Secret ${name}: ${status}`.
   Всё — в тексте сообщения, а не полями объекта: поле `name` скрывает `redact-paths.ts`. Значений секретов и ключей проектов в сводке нет.

3. `StartupModule` (`apps/server/src/domain/startup/startup.module.ts`): `StartupSummaryService` в `providers` и `exports`. Подключить `StartupModule` в `imports` `WorkerModule` (`apps/server/src/worker.module.ts`); в `ApiModule` он уже есть (TASK-7).

4. `apps/server/src/main.ts`:
   - `runApi`: после `InitialProjectService.setUp()` и до `ZoneServers.listen` — `await app.get(StartupSummaryService).log("api");`
   - `runWorker`: после `verifyAtStartup()` — `await app.get(StartupSummaryService).log("worker");`

## Где

- Новые файлы: `apps/server/src/infra/config/startup-summary.config.ts`, `apps/server/src/domain/startup/startup-summary.service.ts`.
- Правки: `apps/server/src/infra/config/config.module.ts`, `apps/server/src/domain/startup/startup.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/main.ts`.
- Тесты: `apps/server/src/infra/config/startup-summary.config.spec.ts` (`stubTestEnv` из `test/support/unit-probe.ts`, `vi.resetModules()`, вызов `startupSummaryConfig()`, временная `SOWA_DEV_SECRETS_DIR` с файлом из `writeDevelopmentSecrets`); `apps/server/src/domain/startup/startup-summary.service.spec.ts` (`new StartupSummaryService(...)` с объектами конфига и заглушкой `ProjectsService.list`, `vi.spyOn(Logger.prototype, "log")`).
- e2e: `apps/server/test/startup-summary.e2e-spec.ts` — `spawnServer("api" | "worker", env)`, `zonePortsEnv`, `waitForOutput` из `test/support/startup-server.ts` (TASK-7), `buildServer` из `test/support/project-cli.ts`.

## Требования из плана

- При старте сервис пишет в лог сводку: какие зоны на каких портах, какие домены разрешены, какие секреты заданы.
- Режим запуска выбирает набор модулей: зоны слушает только `api`.

## Документация

- https://docs.nestjs.com/techniques/logger

## Критерии приёмки

- Модульно: `startupSummaryConfig` даёт `set` для заданной переменной, `notSet` для `""`, `generatedForDevelopment` в development для значения, равного значению в файле секретов, и `set` для того же значения в production.
- Модульно: `log("api")` пишет строки режима, четырёх зон с портами, числа проектов, проекта с доменами (`-` для пустого списка) и трёх секретов; `log("worker")` — без строк `Zone`.
- e2e: вывод `api` в development содержит `Zone public: port <порт>` для всех четырёх зон, `Project main: allowedOrigins http://localhost:5173` и `Secret SOWA_ENCRYPTION_KEYS: set`; вывод `worker` содержит `Startup summary: mode worker` и не содержит `Zone`.
- e2e: в выводе нет значений `SOWA_ENCRYPTION_KEYS` и `SOWA_TOKEN_SIGNING_KEYS` из `.env.test`.

## Чего не делать

- Не повторять в сводке предупреждения проверок окружения и не запускать проверки — это TASK-3.
- Не печатать `pk_` проектов: в production ключи в лог не попадают.

## История доработок

—
