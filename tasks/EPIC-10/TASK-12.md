# EPIC-10 / TASK-12. Добавление и удаление разрешённых доменов в сервисе проектов

Исполнитель: sonnet
Зависит от: TASK-6, TASK-10
Владеет: apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/projects/projects.service.ts, apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts, apps/server/test/project-origins.e2e-spec.ts
Коммит: [SERVER]: add and remove project allowed origins with change events
Ветка: feature/EPIC-10

## Что сделать

У проекта два списка доменов: `allowedOrigins` (`allowed_origins`, сайт, публичная зона) и `operatorAllowedOrigins` (`operator_allowed_origins`, админка, операторская зона, TASK-4). Нормализация — `normalizeOrigin` из `apps/server/src/domain/projects/origin.ts` (TASK-3). Здесь — изменение списков у существующего проекта; команды — TASK-13.

1. В `apps/server/src/domain/projects/projects.service.ts`:

   ```ts
   export const originLists = ["allowedOrigins", "operatorAllowedOrigins"] as const;
   export type OriginList = (typeof originLists)[number];
   export type OriginChange = "added" | "removed" | "unchanged";

   export interface ChangeOriginInput {
     projectId: string;
     list: OriginList;
     origin: string;
     actorKind: ProjectActorKind;
   }

   @Transactional() addOrigin(input: ChangeOriginInput): Promise<OriginChange>     // "added" или "unchanged"
   @Transactional() removeOrigin(input: ChangeOriginInput): Promise<OriginChange>  // "removed" или "unchanged"
   ```

   Оба метода сначала нормализуют `origin` (`InvalidOriginError` при ошибке — и для удаления, чтобы `https://Shop.example.com/` удалял `https://shop.example.com`). Если список изменился — публикуют событие списка с полным новым списком; если нет — ничего не публикуют.

2. В `ProjectsRepository` — два метода, каждый одним условным `UPDATE … RETURNING`, без чтения списка в память (два одновременных вызова не теряют изменения друг друга):

   ```ts
   appendOrigin(projectId: string, list: OriginList, origin: string): Promise<string[] | undefined>
   removeOrigin(projectId: string, list: OriginList, origin: string): Promise<string[] | undefined>
   ```

   SQL (колонка — из постоянной таблицы `{ allowedOrigins: "allowed_origins", operatorAllowedOrigins: "operator_allowed_origins" }`, значения — параметрами):

   ```sql
   UPDATE "projects" SET "<column>" = array_append("<column>", $1) WHERE "id" = $2 AND NOT ($1 = ANY("<column>")) RETURNING "<column>" AS "origins"
   UPDATE "projects" SET "<column>" = array_remove("<column>", $1) WHERE "id" = $2 AND $1 = ANY("<column>") RETURNING "<column>" AS "origins"
   ```

   Строка не изменилась — `undefined`, иначе новый список. Можно через `txHost.tx.createQueryBuilder().update(Project).set({ [свойство]: () => "array_append(…, :origin)" })…returning(…)` или `txHost.tx.query(...)` — результат одинаковый.

3. События в `apps/server/src/telemetry/events/domain-events.ts`:

   ```ts
   export interface ProjectOriginsEvent {
     projectId: string;
     origins: string[];
     actorKind: "cli" | "system";
   }
   ```

   В `DomainEvents` — `"project.allowedOriginsChanged": ProjectOriginsEvent` и `"project.operatorAllowedOriginsChanged": ProjectOriginsEvent`. Список `allowedOrigins` публикует первое, `operatorAllowedOrigins` — второе. На события позже подпишутся сброс кэша (EPIC-14) и обновление CORS бакета (эпик хранилища файлов, только на домены сайта).

4. Правило журнала в `apps/server/src/domain/audit/audited-events.ts` для обоих событий: `{ projectId, actorKind, actorId: null, targetKind: "project", targetId: projectId, data: { origins } }`.

## Где

- `apps/server/src/domain/projects/projects.service.ts`, `apps/server/src/domain/projects/projects.repository.ts` — правка.
- `apps/server/src/telemetry/events/domain-events.ts`, `apps/server/src/domain/audit/audited-events.ts` — события и правила.
- Тесты: `apps/server/src/domain/audit/audited-events.spec.ts`, `apps/server/test/project-origins.e2e-spec.ts` (e2e на `WorkerModule` с `ProjectsModule`, проект — через `ProjectsService.create`).

## Требования из плана

- Allowed origins на проект, два отдельных списка: `allowed_origins` — домены сайта для публичной зоны, `operator_allowed_origins` — домены админки для операторской зоны. Домен сайта не получает CORS-доступа к операторскому API, а домен админки — к публичному.
- При изменении доменов сайта через CLI обновляются CORS-правила бакета (эпик хранилища файлов).
- При изменении настроек кэш сбрасывается на всех репликах через Redis (EPIC-14; в EPIC-10 — только событие, `tasks/EPIC-10/decisions.md`).

## Документация

- https://www.postgresql.org/docs/current/functions-array.html
- https://typeorm.io/docs/query-builder/update-query-builder

## Критерии приёмки

- `addOrigin` с `https://Shop.Example.com/` в `allowedOrigins` — `"added"`, в БД `https://shop.example.com`, `operator_allowed_origins` не меняется; событие `project.allowedOriginsChanged` с полным списком и запись журнала с `data.origins`.
- `addOrigin` того же origin — `"unchanged"`, нового события и записи журнала нет; `removeOrigin` — `"removed"` и событие, повторный `removeOrigin` — `"unchanged"`.
- `operatorAllowedOrigins` меняет только `operator_allowed_origins` и публикует `project.operatorAllowedOriginsChanged`; `https://a.com/path` и `*` — `InvalidOriginError` для обоих списков.
- 20 одновременных `addOrigin` разных origin в один проект — в списке все 20.

## Чего не делать

- Не делать команды CLI — это TASK-13.
- Не реализовывать CORS, сброс кэша и обновление бакета.

## История доработок

—
