# EPIC-11 / TASK-7. Проект main и его ключи при старте api в development

Исполнитель: sonnet
Зависит от: TASK-2, TASK-3, TASK-4, TASK-5
Владеет: apps/server/src/domain/startup/, apps/server/src/api.module.ts, apps/server/src/main.ts, apps/server/test/support/startup-server.ts, apps/server/test/support/dev-secrets-dir.setup.ts, apps/server/vitest.config.e2e.ts, apps/server/test/development-project.e2e-spec.ts
Коммит: [SERVER]: create main project with keys on development start
Ветка: feature/EPIC-11

## Что сделать

При старте `api` в development сервис сам создаёт проект `main` с ключами и печатает `pk_` и `sk_` в лог при каждом старте. `sk_` хранится в БД только хешем, поэтому на повторных стартах он берётся из файла секретов development (TASK-1, поле `mainProject`). Папки `apps/server/src/domain/startup/` нет — создать: старт сервиса читает проекты (`domain`) и конфиг (`infra`), а `infra` не может зависеть от `domain`.

1. `apps/server/src/domain/startup/initial-project.service.ts` — `InitialProjectService`:
   - конструктор: `@Inject(appConfig.KEY)`, `@Inject(initialProjectConfig.KEY)` (TASK-5), `@Inject(developmentSecretsConfig.KEY)` (TASK-4), `@Inject(ProjectsService)`;
   - `async setUp(): Promise<void>` — в development выполняет шаги ниже, в production ничего не делает (production добавит TASK-9);
   - константы `developmentProjectName = "main"`, `developmentAllowedOrigins = ["http://localhost:5173"]` (порт Vite: демо-сайт playground), `developmentOperatorAllowedOrigins = ["http://localhost:5174"]` (демо-админка playground).
   Шаги в development:
   1. `projects.createInitial({ name: "main", allowedOrigins, operatorAllowedOrigins, actorKind: "system" })` (TASK-2). Домены сайта — `initialProject.allowedOrigins`, если список не пустой, иначе `developmentAllowedOrigins`; домены админки — так же из `initialProject.operatorAllowedOrigins` или `developmentOperatorAllowedOrigins`. `SOWA_INIT_PROJECT` и `SOWA_INIT_SERVER_KEY` в development не читаются.
   2. Проект создан → записать ключи в файл: `const secrets = readDevelopmentSecrets(directory) ?? { env: {} }`, затем `writeDevelopmentSecrets(directory, { ...secrets, mainProject: { publicKey, serverKey } })`; затем строка лога с ключами (ниже).
   3. Проект уже был (`createInitial` вернул `undefined`) → `projects.getByName("main")`; `readDevelopmentSecrets(directory)?.mainProject`; если он есть и его `publicKey` равен `project.publicKey` — та же строка лога с ключами из файла. Иначе (файла нет, или проект создан не этим механизмом, или база пересоздана при старом файле) — `logger.warn` с текстом `Development project main: publicKey <publicKey проекта или ->, serverKey is not in <developmentSecretsPath(directory)>: create a new one with sowa-chat key:create --project main`. Новых ключей не выпускать.
   Строка лога с ключами — `logger.log(`Development project main: publicKey ${publicKey}, serverKey ${serverKey}`)` (`new Logger("InitialProject")`). Ключи только в тексте сообщения, а не полями объекта: поля `publicKey` и `serverKey` скрывает `redact-paths.ts`.

2. `apps/server/src/domain/startup/startup.module.ts` — `StartupModule`: `imports: [ProjectsModule, KeysModule]`, `providers: [InitialProjectService]`, `exports: [InitialProjectService]`. `KeysModule` нужен TASK-9 (`ApiKeysService`). Подключить `StartupModule` в `imports` `ApiModule`.

3. `apps/server/src/main.ts`, `runApi`: после `verifyAtStartup()` (TASK-3) и до `ZoneServers.listen` — `await app.get(InitialProjectService).setUp();`. Явный вызов, а не `OnApplicationBootstrap`: `Test.createTestingModule({ imports: [ApiModule] })` в модульных тестах и e2e (`createProbeApp`, `createE2eApp`, `startZoneE2eApp`) проект не создаёт, и тесты `projects-service`, `project-commands` и другие, которые сами создают `main` через CLI или сервис, не ломаются.

4. Помощники e2e — `apps/server/test/support/startup-server.ts` (их используют TASK-8, TASK-9, TASK-10, TASK-11, TASK-12):

   ```ts
   export async function zonePortsEnv(): Promise<Env>
   export async function waitForOutput(server: RunningServer, pattern: RegExp, timeoutMs?: number): Promise<boolean>
   export async function waitForExit(server: RunningServer, timeoutMs?: number): Promise<number | null>
   export async function waitForLive(server: RunningServer, env: Env, timeoutMs?: number): Promise<boolean>
   ```

   - `zonePortsEnv` — четыре `SOWA_*_PORT` со свободными портами (`findFreePort` из `test/support/e2e-server.ts`);
   - `waitForLive` — каждые 250 мс запрашивает `http://127.0.0.1:${env.SOWA_MANAGEMENT_PORT}/health/live`, `true` при ответе 200, `false`, если процесс завершился или прошло `timeoutMs` (по умолчанию 30 000). Служебный порт слушает только после проверок и начальной настройки, поэтому 200 значит «сервис стартовал»;
   - `waitForOutput` — каждые 100 мс проверяет `server.output()`, `true` при совпадении, `false`, если процесс завершился или прошло `timeoutMs` (по умолчанию 30 000);
   - `waitForExit` — ждёт завершения процесса до `timeoutMs` (по умолчанию 30 000), по истечении вызывает `server.stop()`; возвращает `server.process.exitCode`.

5. Процессы `dist/main.js api` в e2e работают в development (`.env.test`) и теперь создают проект `main` в общей тестовой БД и пишут файл секретов. Чтобы файл не попадал в `apps/server/.sowa-dev`, новый файл `apps/server/test/support/dev-secrets-dir.setup.ts` ставит `process.env.SOWA_DEV_SECRETS_DIR = mkdtempSync(join(tmpdir(), "sowa-dev-e2e-"))` и в `afterAll` удаляет папку; подключить его в `setupFiles` в `apps/server/vitest.config.e2e.ts`. Проект `main` в БД после таких тестов убирает `useTestDatabase` (`TRUNCATE` перед каждым тестом).

## Где

- Новые файлы: `apps/server/src/domain/startup/initial-project.service.ts`, `apps/server/src/domain/startup/startup.module.ts`, `apps/server/test/support/startup-server.ts`, `apps/server/test/support/dev-secrets-dir.setup.ts`.
- Правки: `apps/server/src/api.module.ts`, `apps/server/src/main.ts`, `apps/server/vitest.config.e2e.ts`.
- Модульный тест: `apps/server/src/domain/startup/initial-project.development.spec.ts` — `new InitialProjectService(...)` с объектами конфига и заглушкой `ProjectsService` (`createInitial`, `getByName` — `vi.fn()`), временная папка секретов, `vi.spyOn(Logger.prototype, "log")` и `"warn"`.
- e2e: `apps/server/test/development-project.e2e-spec.ts` — сборка как в `test/support/project-cli.ts` (`buildServer`), `spawnServer("api", env)` из `test/support/e2e-server.ts`, `useTestDatabase`, `projectRows` из `test/support/project-rows.ts`; env — `{ ...process.env, ...(await zonePortsEnv()), SOWA_DEV_SECRETS_DIR: <своя временная папка> }`.
- Готовый код: `ProjectsService.createInitial` (TASK-2), `readDevelopmentSecrets`, `writeDevelopmentSecrets`, `developmentSecretsPath` (TASK-1), `developmentSecretsConfig` (TASK-4), `initialProjectConfig` (TASK-5).

## Требования из плана

- В development проект `main` и ключи создаются автоматически при старте и печатаются в лог.
- Разрешённые домены сайта и админки (CORS) в development — `localhost`.
- В production ключи никогда не печатаются в лог.

## Документация

- https://docs.nestjs.com/fundamentals/lifecycle-events
- https://docs.nestjs.com/modules

## Критерии приёмки

- Модульно: при созданном проекте ключи записаны в `mainProject` файла (секции `env` файла сохранены) и есть строка лога `Development project main: publicKey pk_…, serverKey sk_…`; при существующем проекте и совпадающем `publicKey` в файле — та же строка с ключами из файла, файл не перезаписывается; без файла — `warn` без `sk_`; в production `createInitial` не вызывается.
- e2e: первый старт `api` в development на чистой БД создаёт проект `main` с доменами `http://localhost:5173` и `http://localhost:5174` и одним ключом `server` и печатает строку с `pk_` и `sk_`; второй старт с той же папкой секретов печатает те же ключи, новых строк в `projects` и `api_keys` нет.
- e2e: с `SOWA_INIT_ALLOWED_ORIGINS=https://shop.example.com` на чистой БД у `main` домены сайта — `https://shop.example.com`.
- Одновременный старт двух реплик создаёт один проект — проверено e2e TASK-2 на `createInitial`.

## Чего не делать

- Не делать `SOWA_INIT_*` для production — это TASK-9.
- Не печатать ключи полями объекта лога и не менять `redact-paths.ts`.
- Не выпускать новый `sk_`, если старого нет в файле.

## История доработок

—
