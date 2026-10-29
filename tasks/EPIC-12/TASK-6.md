# EPIC-12 / TASK-6. Контекст запроса: проект и оператор в nestjs-cls

Исполнитель: haiku
Зависит от: TASK-2
Владеет: apps/server/src/infra/request-context/request-context.ts, apps/server/src/infra/request-context/request-context.module.ts, apps/server/src/infra/request-context/request-context.spec.ts, apps/server/src/api.module.ts
Коммит: [SERVER]: add request context for project and operator
Ветка: feature/EPIC-12

## Что сделать

Одно место, где guards записывают, а guards, контроллеры и доменные сервисы читают проект и оператора текущего запроса. По проекту из контекста позже работает изоляция проектов (EPIC-20). Хранилище — `ClsService` из `nestjs-cls`: глобальный `ClsModule` уже подключён (`AppClsModule` в `apps/server/src/infra/cls/app-cls.module.ts`), контекст на каждый запрос открывает `ClsMiddleware` (`apps/server/src/infra/cls/cls-middleware.ts`). Папки `apps/server/src/infra/request-context/` ещё нет — создать.

1. `request-context.ts`:

   ```ts
   import type { OperatorRole } from "@sowa-chat/protocol";

   export interface RequestOperator {
     operatorId: string;
     role: OperatorRole;
   }

   @Injectable()
   export class RequestContext {
     constructor(@Inject(ClsService) private readonly cls: ClsService) {}

     setProjectId(projectId: string): void
     projectId(): string
     setOperator(operator: RequestOperator): void
     operator(): RequestOperator
   }
   ```

   - ключи CLS — константы в этом файле: `const projectIdKey = "requestProjectId"` и `const operatorKey = "requestOperator"`; снаружи они не нужны и не экспортируются;
   - `setProjectId` и `setOperator` — `this.cls.set(ключ, значение)`;
   - `projectId()` — значение по ключу; если его нет — `throw new Error("Request project is not set")`;
   - `operator()` — значение по ключу; если его нет — `throw new Error("Request operator is not set")`.

   Ошибка — обычный `Error`, а не 401: если её видно, guard не поставили на маршрут, и это ошибка кода (500), а не клиента.

2. `request-context.module.ts` — `RequestContextModule` с `@Global()`: `providers: [RequestContext]`, `exports: [RequestContext]`. Глобальный, потому что `RequestContext` нужен guards (TASK-7, TASK-10), контроллерам и доменным сервисам из разных модулей, как `ClsService`.

3. `apps/server/src/api.module.ts`: добавить `RequestContextModule` в `imports` сразу после `AppClsModule`.

## Где

- `apps/server/src/infra/request-context/request-context.ts`, `apps/server/src/infra/request-context/request-context.module.ts` — новые файлы.
- `apps/server/src/api.module.ts`.
- Читать: `apps/server/src/telemetry/operation-steps/operation-steps.ts` — образец сервиса поверх `ClsService`.
- Тест: `apps/server/src/infra/request-context/request-context.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`), модуль — `Test.createTestingModule({ imports: [ClsModule.forRoot({ global: true }), RequestContextModule] })`, контекст — `cls.run(...)`, как в `apps/server/src/telemetry/operation-steps/operation-steps.spec.ts`.

## Требования из плана

- После проверки ключа ID проекта кладётся в контекст запроса (`nestjs-cls`): по нему позже работает изоляция проектов. Способ получить текущий проект из контекста — в одном месте.
- После проверки токена оператора ID оператора, его роль и ID проекта кладутся в контекст запроса.
- `nestjs-cls` — принятая библиотека для контекста запроса (CLAUDE.md, раздел «Библиотеки»).

## Документация

- https://docs.nestjs.com/recipes/async-local-storage
- https://papooch.github.io/nestjs-cls/

## Критерии приёмки

- В `cls.run` после `setProjectId("p-1")` `projectId()` возвращает `p-1`; после `setOperator({ operatorId: "o-1", role: "supervisor" })` `operator()` возвращает этот объект.
- В `cls.run` без записи `projectId()` бросает `Request project is not set`, `operator()` — `Request operator is not set`.
- Два параллельных `cls.run` с разными проектами не видят проект друг друга.
- `ApiModule` компилируется с `RequestContextModule`: существующие тесты `apps/server` проходят.

## Чего не делать

- Не делать guards — это TASK-7 и TASK-10.
- Не добавлять сюда проверку доступа к данным проекта — это EPIC-20.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
