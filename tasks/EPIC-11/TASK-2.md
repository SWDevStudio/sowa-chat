# EPIC-11 / TASK-2. Начальный проект создаётся один раз при одновременном старте реплик

Исполнитель: sonnet
Зависит от: —
Владеет: apps/server/src/domain/projects/projects.service.ts, apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/keys/api-keys.service.ts, apps/server/test/support/projects-service-probe.ts, apps/server/src/domain/projects/projects.service.initial.spec.ts, apps/server/src/domain/keys/api-keys.service.given-key.spec.ts, apps/server/test/initial-project.e2e-spec.ts
Коммит: [SERVER]: create initial project once across replicas
Ветка: feature/EPIC-11

## Что сделать

Доменная операция «создать проект, если его ещё нет» для старта сервиса: проект `main` в development (TASK-7) и проект из `SOWA_INIT_*` в production (TASK-9). Несколько реплик `api` стартуют одновременно, поэтому операция должна создавать проект ровно один раз. Сейчас `ProjectsService.create` проверяет имя через `findByName` и бросает `ProjectAlreadyExistsError`, а гонка двух транзакций даёт ошибку уникального ограничения PostgreSQL (`projects.name`) — для старта это падение реплики.

Решение одно: advisory lock PostgreSQL на время транзакции. Перехват кода `23505` не используется.

1. `ProjectsRepository` (`apps/server/src/domain/projects/projects.repository.ts`) — новый метод:

   ```ts
   async lockInitialProject(): Promise<void>
   ```

   Выполняет `SELECT pg_advisory_xact_lock(hashtext($1))` с параметром `"sowa-chat:initial-project"` (константа `initialProjectLockName` в том же файле) через `this.txHost.tx.query`. Блокировка держится до конца транзакции; вне транзакции она бесполезна, поэтому метод вызывается только из метода с `@Transactional()`.

2. `ApiKeysService.issue` (`apps/server/src/domain/keys/api-keys.service.ts`) принимает готовый ключ:
   - в `IssueApiKeyBaseInput` — необязательное поле `key?: string`;
   - если `key` передан: `parseKey(input.key, keyType)` вернул `undefined` → бросить `InvalidApiKeyError` (новый класс в том же файле, текст `Key is not a valid ${keyType}: check its prefix, length and checksum`, самого ключа в тексте нет), иначе сохранить его хеш (`hashKey`) и `toLookupPrefix(key)` вместо сгенерированного;
   - без `key` — как сейчас, `generateKey(keyType)`.
   Возвращаемый `IssuedApiKey.key` — тот же переданный ключ.

3. `ProjectsService` (`apps/server/src/domain/projects/projects.service.ts`):
   - в `CreateProjectInput` — необязательное поле `serverKey?: string`, оно передаётся в `apiKeys.issue({ ..., key: input.serverKey })`;
   - новый метод:

     ```ts
     @Transactional()
     async createInitial(input: CreateProjectInput): Promise<CreatedProject | undefined>
     ```

     Порядок: проверка имени (`InvalidProjectNameError`) и нормализация доменов, как в `create` → `repository.lockInitialProject()` → `repository.findByName(name)`; проект есть → `undefined`, ничего не создаётся и не публикуется → иначе создание точно как в `create` (строка проекта с `pk_`, событие `project.created`, выпуск `sk_`) и возврат `CreatedProject`.
   - Общую часть `create` и `createInitial` (вставка проекта, событие, выпуск ключа) вынести в приватный метод, чтобы не дублировать код. Поведение `create` не меняется.

4. `test/support/projects-service-probe.ts`: в мок репозитория добавить `lockInitialProject: vi.fn().mockResolvedValue(undefined)` и вернуть его в `ProjectsServiceProbe`. Существующие тесты не меняются.

## Где

- `apps/server/src/domain/projects/projects.repository.ts`, `apps/server/src/domain/projects/projects.service.ts`, `apps/server/src/domain/keys/api-keys.service.ts`, `apps/server/test/support/projects-service-probe.ts`.
- Модульные тесты — новые файлы (существующие `projects.service.spec.ts` и `api-keys.service*.spec.ts` близки к лимиту 300 строк): `apps/server/src/domain/projects/projects.service.initial.spec.ts`, `apps/server/src/domain/keys/api-keys.service.given-key.spec.ts` (`pnpm --filter @sowa-chat/server test`).
- e2e на настоящей базе: `apps/server/test/initial-project.e2e-spec.ts` (образец — `apps/server/test/projects-service.e2e-spec.ts`, `useTestDatabase`, `mainProjectInput` и `sha256` из `test/support/project-rows.ts`).

## Требования из плана

- `SOWA_INIT_*` применяются только при первом запуске: сервис создаёт проект, если его ещё нет, и сохраняет хеш ключа, а при последующих запусках ничего не меняет.
- `serverKey` хранится только хешем SHA-256.
- Несколько реплик `api`, стартующих одновременно, не создают проект дважды.

## Документация

- https://www.postgresql.org/docs/18/explicit-locking.html#ADVISORY-LOCKS
- https://www.postgresql.org/docs/18/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional

## Критерии приёмки

- Модульно: `createInitial` вызывает `lockInitialProject` до `findByName`; при существующем проекте возвращает `undefined` и не вызывает `create` репозитория, `issue` и `publish`; `serverKey` из входа передаётся в `issue` как `key`.
- Модульно: `issue` с верным готовым `sk_` сохраняет `hashKey` этого ключа и его `toLookupPrefix`, возвращает тот же ключ; ключ с испорченной контрольной суммой — `InvalidApiKeyError`, `repository.create` не вызывается, в тексте ошибки нет ключа.
- e2e: две «реплики» — два отдельных `Test.createTestingModule({ imports: [WorkerModule, ProjectsModule] })` со своими пулами соединений — одновременно (`Promise.all`) вызывают `createInitial` с одним именем: ровно один вызов возвращает `CreatedProject`, второй — `undefined`; в БД один проект, один ключ `server`, одна запись `project.created` в `audit_log`.
- e2e: `createInitial` с `serverKey: generateKey("serverKey")` сохраняет в `api_keys.key_hash` `sha256` этого ключа, и `ApiKeysService.verify(serverKey, "server")` возвращает этот проект.

## Чего не делать

- Не перехватывать ошибку уникальности `23505` и не менять поведение `create`: ручное создание из CLI по-прежнему падает на гонке (решение EPIC-10).
- Не вызывать `createInitial` при старте — это TASK-7 и TASK-9.

## История доработок

—
