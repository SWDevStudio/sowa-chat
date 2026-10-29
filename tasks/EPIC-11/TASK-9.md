# EPIC-11 / TASK-9. Первый проект из SOWA_INIT_* при старте api в production

Исполнитель: sonnet
Зависит от: TASK-7, TASK-8
Владеет: apps/server/src/domain/startup/initial-project.service.ts, apps/server/src/domain/startup/initial-project.production.spec.ts, apps/server/src/infra/logging/redact-paths.ts, apps/server/src/infra/logging/log-redaction.spec.ts, apps/server/test/initial-project-production.e2e-spec.ts
Коммит: [SERVER]: create first production project from SOWA_INIT_*
Ветка: feature/EPIC-11

## Что сделать

В production первый проект создаётся из `SOWA_INIT_*` (TASK-5) только при первом запуске; ключи никогда не попадают в лог. Ветку production добавить в `InitialProjectService.setUp()` (TASK-7, `apps/server/src/domain/startup/initial-project.service.ts`); ветку development не менять.

1. В конструктор `InitialProjectService` добавить `@Inject(ApiKeysService) apiKeys: ApiKeysService` (`StartupModule` уже импортирует `KeysModule`). Параметров станет 5 — предел oxlint для `*.service.ts`.

2. Шаги в production:
   1. `initialProject.projectName === undefined` → ничего не делать.
   2. `serverKey === undefined` → бросить `Error("SOWA_INIT_SERVER_KEY is required when SOWA_INIT_PROJECT is set")` (схема TASK-5 до этого не допустит, ветка нужна для типов).
   3. `parseKey(serverKey, "serverKey")` (`apps/server/src/domain/keys/key-format.ts`) вернул `undefined` → бросить `Error("SOWA_INIT_SERVER_KEY must be a serverKey (sk_...) with a valid checksum: generate one with sowa-chat key:generate")`. Ключ проверяется всегда, даже если проект уже есть. Ошибка выходит из `main.ts`, процесс завершается с кодом 1.
   4. `projects.createInitial({ name: projectName, allowedOrigins, operatorAllowedOrigins, serverKey, actorKind: "system" })` (TASK-2): хеш переданного ключа, новый `pk_`, оба списка доменов.
   5. Проект создан → `logger.log(`Initial project ${projectName} created from SOWA_INIT_PROJECT`)`. Ни `pk_`, ни `sk_` не печатать: `pk_` можно узнать командой `project:list`.
   6. Проект уже был → ничего не менять, даже если домены в env другие. `projects.getByName(projectName)`, `apiKeys.list(project.id, "server")`; если нет ни одного ключа с `prefix === toLookupPrefix(serverKey)` и `revokedAt === null` — `logger.warn(`SOWA_INIT_SERVER_KEY does not match any active serverKey of project ${projectName}`)`. Ключа и его префикса в тексте нет.

3. `apps/server/src/infra/logging/redact-paths.ts`: `"SOWA_INIT_SERVER_KEY"` в конец `sensitiveFields` — поле с этим именем в объекте лога скрывается (`[Redacted]`), как `serverKey`. В `apps/server/src/infra/logging/log-redaction.spec.ts` добавить имя в массив `tokenAndKeyFields`.

## Где

- `apps/server/src/domain/startup/initial-project.service.ts` (TASK-7), `apps/server/src/infra/logging/redact-paths.ts`, `apps/server/src/infra/logging/log-redaction.spec.ts`.
- Модульный тест: `apps/server/src/domain/startup/initial-project.production.spec.ts` — по образцу `initial-project.development.spec.ts` (TASK-7), заглушки `ProjectsService` (`createInitial`, `getByName`) и `ApiKeysService` (`list`), `vi.spyOn(Logger.prototype, "log")` и `"warn"`.
- e2e: `apps/server/test/initial-project-production.e2e-spec.ts` — `spawnServer("api", env)`, `env = { ...process.env, ...(await zonePortsEnv()), ...productionOverrides, SOWA_INIT_* }` (`test/support/production-env.ts` из TASK-8, `test/support/startup-server.ts` из TASK-7), `useTestDatabase`, `projectRows` и `sha256` из `test/support/project-rows.ts`; ключ для теста — `generateKey("serverKey")`.

## Требования из плана

- Первый проект в production — через `SOWA_INIT_PROJECT`, `SOWA_INIT_SERVER_KEY`, `SOWA_INIT_ALLOWED_ORIGINS`, `SOWA_INIT_OPERATOR_ALLOWED_ORIGINS`. DevOps генерируют ключ командой `sowa-chat key:generate`.
- `SOWA_INIT_*` применяются только при первом запуске: сервис создаёт проект, если его ещё нет, и сохраняет хеш ключа, а при последующих запусках ничего не меняет. Та же схема, что у `POSTGRES_PASSWORD`.
- В production ключи никогда не печатаются в лог.
- Контрольная сумма ключа отсекает опечатки до запроса к БД.

## Документация

- https://docs.nestjs.com/fundamentals/lifecycle-events

## Критерии приёмки

- e2e: старт `api` в production с `SOWA_INIT_PROJECT=shop`, ключом `sk_` и обоими списками доменов на чистой БД создаёт проект `shop` с нормализованными доменами и одним ключом `server`, `key_hash` которого — `sha256` переданного ключа; сервис стартует (`waitForLive`).
- e2e: повторный старт с другими доменами и другим верным `sk_` не меняет строки `projects` и `api_keys`, в выводе есть `SOWA_INIT_SERVER_KEY does not match any active serverKey of project shop`.
- e2e: ключ с испорченной последней буквой контрольной суммы — процесс завершается с ненулевым кодом, в выводе есть `SOWA_INIT_SERVER_KEY must be a serverKey`, самого ключа в выводе нет, проект не создан.
- Во всём выводе этих стартов нет ни одного ключа по шаблону `/(pk|sk)_[0-9A-Za-z]{43}_[0-9A-Za-z]{6}/`; модульно: поле `SOWA_INIT_SERVER_KEY` в объекте лога выводится как `[Redacted]`.

## Чего не делать

- Не менять ветку development из TASK-7.
- Не обновлять домены и ключи существующего проекта.
- Не перехватывать ошибку уникальности: одновременный старт решён advisory lock в `createInitial` (TASK-2).

## История доработок

—
