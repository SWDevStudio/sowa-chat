# EPIC-14 / TASK-3. Снимок проекта в кэше: по ID и по `publicKey`

Исполнитель: haiku
Зависит от: TASK-1
Владеет: apps/server/src/domain/projects/project-snapshot.ts, apps/server/src/domain/projects/projects.service.ts, apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/projects/projects.service.spec.ts, apps/server/test/support/projects-service-probe.ts, apps/server/test/project-snapshot-cache.e2e-spec.ts
Коммит: [SERVER]: cache project snapshots by id and public key
Ветка: feature/EPIC-14

## Что сделать

Сейчас проекты читаются только по имени (`getByName`, `findByName`) и списком. Читатели по `publicKey` и по ID нужны следующим эпикам: создание сессии посетителя (EPIC-13) ищет проект по `publicKey`, CORS (EPIC-16) проверяет домены проекта. Эта задача добавляет эти два метода сразу с кэшем. Потребителей в коде пока нет, поэтому всё проверяется через `ProjectsService`.

1. `apps/server/src/domain/projects/project-snapshot.ts` — новый:

   ```ts
   export interface ProjectSnapshot {
     id: string;
     name: string;
     publicKey: string | null;
     allowedOrigins: string[];
     operatorAllowedOrigins: string[];
     settings: JsonObject;
   }

   export function toProjectSnapshot(project: Project): ProjectSnapshot
   ```

   Без `createdAt`: значение кэша должно быть JSON-совместимым, без `Date`. `JsonObject` — из `@sowa-chat/protocol`.

2. `ProjectsRepository` (`projects.repository.ts`): `findById(id: string): Promise<Project | null>` и `findByPublicKey(publicKey: string): Promise<Project | null>` — `findOneBy`, как `findByName`.

3. `ProjectsService` (`projects.service.ts`): конструктор получает `@Inject(CACHE_MANAGER) private readonly cache: Cache` последним параметром. Методы:

   ```ts
   async findSnapshotById(projectId: string): Promise<ProjectSnapshot | undefined>
   async findSnapshotByPublicKey(publicKey: string): Promise<ProjectSnapshot | undefined>
   ```

   - `findSnapshotById`: запись `cacheKeys.project(projectId)` есть — вернуть её; нет — `repository.findById`; не найден — `undefined` без записи в кэш; найден — `toProjectSnapshot`, `cache.set(cacheKeys.project(id), snapshot)`, вернуть.
   - `findSnapshotByPublicKey`: запись `cacheKeys.projectIdByPublicKey(publicKey)` (строка — ID проекта) есть — вернуть `findSnapshotById(id)`; нет — `repository.findByPublicKey`; не найден — `undefined` без записи в кэш; найден — положить в кэш и ID по `publicKey`, и снимок по `cacheKeys.project(id)`, вернуть снимок.
   - Срок записей — общий `cacheTtlMs` из TASK-1, свой срок не задавать.

4. Сброс уже сделан в TASK-1: `project.allowedOriginsChanged` и `project.operatorAllowedOriginsChanged` удаляют `cacheKeys.project(projectId)`. Запись `projectIdByPublicKey` не сбрасывается: `publicKey` проекта не меняется (команды смены нет), запись истечёт через 60 секунд.

5. Настройки (`settings`) входят в снимок. Команды и события изменения настроек пока нет, поэтому правила сброса для них нет; эпик, который добавит изменение настроек, добавит своё событие в `cache-invalidation-rules.ts`.

6. `apps/server/test/support/projects-service-probe.ts`: добавить `imports: [CacheModule.register()]` (из `@nestjs/cache-manager`) в `Test.createTestingModule`, чтобы `ProjectsService` получил `CACHE_MANAGER`. Если `projects.service.spec.ts` от этого падает — поправить только настройку, не смысл тестов.

## Где

- `apps/server/src/domain/projects/project-snapshot.ts` — новый.
- `apps/server/src/domain/projects/projects.repository.ts`, `apps/server/src/domain/projects/projects.service.ts` — новые методы.
- `apps/server/test/support/projects-service-probe.ts` — кэш в тестовом модуле.
- `apps/server/test/project-snapshot-cache.e2e-spec.ts` — новый e2e. Модуль — `Test.createTestingModule({ imports: [WorkerModule, ProjectsModule] })`, как в `apps/server/test/projects-service.e2e-spec.ts`; проект создаётся через `ProjectsService.create`; шпионы — `vi.spyOn(moduleRef.get(ProjectsRepository), "findById")` и `"findByPublicKey"`.

## Требования из плана

- В памяти реплики на 60 секунд держим настройки проекта.
- При изменении кэш сбрасывается; если событие потеряется, запись истечёт через 60 секунд.

## Документация

- https://docs.nestjs.com/techniques/caching

## Критерии приёмки

- Два вызова `findSnapshotById` одного проекта: результат с полями `ProjectSnapshot` (без `createdAt`), `findById` вызван один раз. Два вызова `findSnapshotByPublicKey`: `findByPublicKey` вызван один раз, а `findSnapshotById` того же проекта после этого не вызывает `findById`.
- Неизвестный ID и неизвестный `publicKey` — `undefined`, и повторный вызов снова идёт в репозиторий.
- После `addOrigin` для `allowedOrigins` и для `operatorAllowedOrigins` следующий `findSnapshotById` возвращает новый список доменов.

## Чего не делать

- Не делать объединённый список доменов всех проектов для preflight — это EPIC-16.
- Не делать команду изменения `settings`.
- Не менять `cache-keys.ts` и `cache-invalidation-rules.ts`.

## История доработок

—
