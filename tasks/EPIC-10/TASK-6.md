# EPIC-10 / TASK-6. Сервис проектов: создание с pk_ и sk_ одной транзакцией, поиск по имени и список

Исполнитель: sonnet
Зависит от: TASK-3, TASK-4
Владеет: apps/server/src/domain/projects/projects.service.ts, apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/projects/projects.module.ts, apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts, apps/server/src/domain/projects/projects.service.spec.ts, apps/server/test/projects-service.e2e-spec.ts
Коммит: [SERVER]: add projects service creating project with public and server keys
Ветка: feature/EPIC-10

## Что сделать

Доменный сервис проектов. Команды CLI (TASK-8) — тонкая обёртка над ним, а позже тот же сервис вызовет старт в режимах development и production (EPIC-11, `SOWA_INIT_*`). Сейчас `ProjectsRepository` умеет только `create({ name })` и `findByName`, а `ProjectsModule` экспортирует только репозиторий.

1. `ProjectsRepository` (`apps/server/src/domain/projects/projects.repository.ts`):

   ```ts
   export interface NewProject {
     name: string;
     publicKey?: string;
     allowedOrigins?: string[];
     operatorAllowedOrigins?: string[];
   }

   create(input: NewProject): Promise<Project>   // вместо create(input: { name: string }); вызов create({ name }) в test/audit-log.e2e-spec.ts продолжает работать
   findByName(name: string): Promise<Project | null>  // без изменений
   findAll(): Promise<Project[]>   // order: { name: "ASC" }
   ```

2. Событие в `apps/server/src/telemetry/events/domain-events.ts` (литералы, `telemetry` не импортирует `domain`):

   ```ts
   export interface ProjectCreatedEvent {
     projectId: string;
     name: string;
     actorKind: "cli" | "system";
   }
   ```

   В `DomainEvents` — `"project.created": ProjectCreatedEvent`.

3. Правило журнала в `apps/server/src/domain/audit/audited-events.ts`: `"project.created"` → `{ projectId: event.projectId, actorKind: event.actorKind, actorId: null, targetKind: "project", targetId: event.projectId, data: { name: event.name } }`.

4. `apps/server/src/domain/projects/projects.service.ts`:

   ```ts
   export type ProjectActorKind = Extract<ActorKind, "cli" | "system">;

   export interface CreateProjectInput {
     name: string;
     allowedOrigins: string[];
     operatorAllowedOrigins: string[];
     actorKind: ProjectActorKind;
   }

   export interface CreatedProject {
     projectId: string;
     name: string;
     publicKey: string;
     serverKey: string;
     serverKeyPrefix: string;
   }

   export class InvalidProjectNameError extends Error      // `Invalid project name "${name}": use 1-63 lowercase letters, digits and "-", starting with a letter or digit`
   export class ProjectAlreadyExistsError extends Error    // `Project "${name}" already exists`
   export class ProjectNotFoundError extends Error         // `Project "${name}" not found`

   @Injectable()
   export class ProjectsService {
     @Transactional() create(input: CreateProjectInput): Promise<CreatedProject>
     getByName(name: string): Promise<Project>   // нет проекта — ProjectNotFoundError
     list(): Promise<Project[]>                   // repository.findAll()
   }
   ```

   Зависимости: `ProjectsRepository`, `ApiKeysService`, `DomainEventBus` (через `@Inject(...)`, как в `ApiKeysService`).

   `create` по шагам:
   1. Имя проверяется регуляркой `^[a-z0-9][a-z0-9-]{0,62}$`, иначе `InvalidProjectNameError`.
   2. Оба списка — `normalizeOrigins` из `apps/server/src/domain/projects/origin.ts` (TASK-3); неверный origin — `InvalidOriginError`, ничего не создаётся.
   3. `findByName(name)` нашёл проект — `ProjectAlreadyExistsError`. Одновременное создание с тем же именем остановит уникальное ограничение БД — отдельно не обрабатывать (`tasks/EPIC-10/decisions.md`).
   4. `publicKey = generateKey("publicKey")` из `apps/server/src/domain/keys/key-format.ts`.
   5. `repository.create({ name, publicKey, allowedOrigins, operatorAllowedOrigins })`.
   6. `await bus.publish("project.created", { projectId, name, actorKind })`.
   7. `await apiKeys.issue({ projectId, kind: "server", actorKind })` — в той же транзакции (`@Transactional()` у `issue` присоединяется к внешней).
   8. Вернуть `CreatedProject` с `serverKey: issued.key`, `serverKeyPrefix: issued.prefix`.

   Публикации и выпуск — строго по очереди через `await`, без `Promise.all` (решение EPIC-8 о точках сохранения).

5. `ProjectsModule`: `imports: [KeysModule]`, `providers: [ProjectsRepository, ProjectsService]`, `exports: [ProjectsRepository, ProjectsService]`.

## Где

- `apps/server/src/domain/projects/projects.service.ts` — новый файл.
- `apps/server/src/domain/projects/projects.repository.ts`, `apps/server/src/domain/projects/projects.module.ts` — правка.
- `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts` — событие и правило.
- Образцы: `apps/server/src/domain/keys/api-keys.service.ts` (транзакция, события, `actorKind`), `apps/server/test/api-keys.e2e-spec.ts` (e2e на `WorkerModule` с модулем домена).
- Тесты: `apps/server/src/domain/projects/projects.service.spec.ts` (unit), `apps/server/src/domain/audit/audited-events.spec.ts` (правило), `apps/server/test/projects-service.e2e-spec.ts` (e2e: `Test.createTestingModule({ imports: [WorkerModule, ProjectsModule] })`).

## Требования из плана

- `docker compose exec api sowa-chat project:create` выводит ключи один раз в терминал. Ключ показывается один раз при создании.
- Создание проекта — одна транзакция: если ключ не выпустился, проекта тоже нет.
- publicKey хранится в проекте открыто (`projects.public_key`), serverKey — только хешем в `api_keys`.
- Проект ищется по имени: `--project main`.
- События уровня проекта (ключи, удаления, блокировки) пишутся в `audit_log`.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://docs.nestjs.com/modules#module-re-exporting

## Критерии приёмки

- `create({ name: "main", allowedOrigins: ["https://Shop.Example.com/"], operatorAllowedOrigins: [], actorKind: "cli" })`: `publicKey` проходит `parseKey(…, "publicKey")` и записан в `projects.public_key`, `allowed_origins` — `{https://shop.example.com}`; `ApiKeysService.verify(serverKey, "server")` возвращает ID этого проекта; открытого `sk_` в БД нет.
- Повторный `create` с именем `main` — `ProjectAlreadyExistsError`, в БД один проект и один ключ; неверное имя (`Main`, `-a`, пустое, 64 символа) — `InvalidProjectNameError`; неверный origin — `InvalidOriginError`; в обоих случаях проекта нет.
- Если `ApiKeysService.issue` бросает ошибку, в `projects`, `api_keys` и `audit_log` нет строк.
- В `audit_log` после создания — записи `project.created` (`targetKind` `project`, `data` `{ name: "main" }`, `actorKind` `cli`) и `apiKey.issued`; `getByName` неизвестного имени — `ProjectNotFoundError`; `list()` возвращает проекты по имени.

## Чего не делать

- Не делать команды CLI — это TASK-8.
- Не создавать канал `web` и офлайн-бота — это эпики каналов и ботов.
- Не делать `public_key` обязательным (`tasks/EPIC-10/decisions.md`).
- Не добавлять и не удалять домены у существующего проекта — это TASK-12.

## История доработок

—
