# EPIC-7 / TASK-1. Глобальная проверка тела, query и параметров пути через zod-схемы

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/http/api-http.module.ts, apps/server/src/infra/http/zod-validation.spec.ts, apps/server/src/api.module.ts
Ветка: feature/EPIC-7

## Что сделать

Папки `apps/server/src/infra/http/` ещё нет — создать. В ней будут общие настройки обработки HTTP-запросов режима `api`: pipe, фильтр ошибок, interceptor ответов, лимит тела, заголовки, OpenAPI.

1. `api-http.module.ts` — модуль `ApiHttpModule` с одним провайдером:

   ```ts
   @Module({
     providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
   })
   export class ApiHttpModule {}
   ```

   `APP_PIPE` — из `@nestjs/core`, `ZodValidationPipe` — из `nestjs-zod`. Не через `app.useGlobalPipes`: так pipe работает в любом приложении, собранном из `ApiModule`, в том числе в тестовых.

2. В `apps/server/src/api.module.ts` добавить `ApiHttpModule` последним элементом `imports`.

Как этим пользуются контроллеры (в задаче писать не нужно, только в тесте): DTO — класс `createZodDto(схема)` из `nestjs-zod`, схема — из `@sowa-chat/protocol`. Pipe проверяет и преобразует тело (`@Body()`), query (`@Query()`) и параметры пути (`@Param()`), если их тип — такой DTO. Параметры обычных типов (`string`) pipe пропускает без изменений.

## Где

- `apps/server/src/infra/http/api-http.module.ts` — новый файл.
- `apps/server/src/api.module.ts` — строка в `imports`.
- Тест: `apps/server/src/infra/http/zod-validation.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`). Приложение — `startZoneProbeApp` из `apps/server/test/support/zone-probe.ts`, образец — `apps/server/src/api-versioning.spec.ts`. Тестовый контроллер: `@Zone("public")`, `@Controller("visitor/validation-probe")`, маршруты с DTO тела `z.object({ name: z.string().min(1) })` и DTO query `z.object({ count: z.coerce.number().int().min(1) })`. Запросы — на публичный порт, путь `/v1/visitor/validation-probe`.

## Требования из плана

```ts
// packages/protocol
export const SendMessageSchema = z.object({ ... });

// apps/server
export class SendMessageDto extends createZodDto(SendMessageSchema) {}
```

- REST: глобальный `ZodValidationPipe` через `APP_PIPE`, DTO через `createZodDto`, OpenAPI из тех же схем.
- Контракты API — zod-схемы в `protocol`; сущности TypeORM в `protocol` не попадают.

## Документация

- https://docs.nestjs.com/pipes
- https://github.com/BenLorantfy/nestjs-zod

## Критерии приёмки

- POST с неверным телом (`{}`, `{ "name": 1 }`) — 400; с верным — 2xx, и обработчик получает разобранный объект.
- GET с `?count=abc` — 400; с `?count=5` обработчик получает число `5`, а не строку.
- Маршрут с параметром пути типа `string` без DTO получает значение без изменений.

## Чего не делать

- Не менять формат тела ошибки и не проверять его в тестах — это TASK-3.
- Не создавать `index.ts` в папке: barrel-файлы в `apps/server` не используем.

## История доработок

—
