# EPIC-7 / TASK-5. Ответы через zod-схемы: лишние поля не уходят наружу

Исполнитель: haiku
Зависит от: TASK-4
Владеет: apps/server/src/infra/http/api-http.module.ts, apps/server/src/infra/http/http-error.filter.ts, apps/server/src/infra/http/zod-serialization.spec.ts
Ветка: feature/EPIC-7

## Что сделать

1. В `ApiHttpModule` добавить провайдер `{ provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor }` (`APP_INTERCEPTOR` из `@nestjs/core`, `ZodSerializerInterceptor` из `nestjs-zod`).

2. Схема ответа задаётся у обработчика декоратором `@ZodResponse({ type: SomeDto })` из `nestjs-zod` (для массива — `type: [SomeDto]`), DTO — `createZodDto(схема)`. Этот же декоратор кладёт схему в OpenAPI. Interceptor прогоняет ответ через схему: поля, которых нет в `z.object`, удаляются. Обработчик без `@ZodResponse` interceptor не трогает.

3. Ответ не прошёл схему — `nestjs-zod` бросает `ZodSerializationException` (это `InternalServerErrorException`, 500). Фильтр уже отвечает на него 500 `internalError` и пишет в лог (TASK-4). В `http-error.filter.ts` добавить: для `ZodSerializationException`, у которой `getZodError()` — `ZodError`, запись в лог такая:

   ```ts
   this.logger.error({ err: exception, responseIssues: zodError.issues }, "Response does not match schema");
   ```

   Для остальных ошибок 500 и выше запись прежняя. Значения полей ответа в лог не попадают: в `issues` их нет, пока у interceptor выключен `reportInput` (по умолчанию выключен — не включать).

## Где

- `apps/server/src/infra/http/api-http.module.ts`, `apps/server/src/infra/http/http-error.filter.ts`.
- Тест: `apps/server/src/infra/http/zod-serialization.spec.ts` на `startZoneProbeApp`, строки лога — через `redirectLogsTo` из `apps/server/test/support/unit-probe.ts`. Тестовый контроллер `@Zone("public")`, `@Controller("visitor/response-probe")`, DTO ответа `createZodDto(z.object({ id: z.string() }))`. Лишнее поле возвращать из переменной, а не литералом (`const entity = { id: "1", secret: "s" }; return entity;`), иначе TypeScript отклонит литерал с лишним полем; ответ без `id` — через `as`.

## Требования из плана

- Ответы: interceptor прогоняет их через схемы ответов, чтобы наружу не ушли лишние поля. Например, сущность с `key_hash` не должна попасть в ответ целиком.

## Документация

- https://docs.nestjs.com/interceptors
- https://github.com/BenLorantfy/nestjs-zod

## Критерии приёмки

- Обработчик с `@ZodResponse({ type: ProbeResponseDto })` возвращает `{ id: "1", secret: "s" }` — в ответе `{ id: "1" }`, поля `secret` нет. С `type: [ProbeResponseDto]` и массивом таких объектов — `secret` нет ни в одном элементе.
- Обработчик возвращает объект без `id` — 500, `code: "internalError"`, `message: "Internal server error"`; в логе запись `error` с `responseIssues`, где у ошибки `path` равен `["id"]`.
- Обработчик без `@ZodResponse` возвращает объект как есть, вместе с лишними полями.

## Чего не делать

- Не описывать схемы ответов реальных эндпоинтов — их ещё нет.
- Не включать `reportInput`.

## История доработок

—
