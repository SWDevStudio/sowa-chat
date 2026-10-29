# EPIC-12 / TASK-9. POST /v1/server/operator-token: выдача токена оператора

Исполнитель: haiku
Зависит от: TASK-2, TASK-7, TASK-8
Владеет: apps/server/src/api/server/operator-token.dto.ts, apps/server/src/api/server/operator-token.controller.ts, apps/server/src/api/server/server-api.module.ts, apps/server/src/api.module.ts, apps/server/test/operator-token.e2e-spec.ts
Коммит: [SERVER]: add operator token endpoint for server api
Ветка: feature/EPIC-12

## Что сделать

Тонкий контроллер поверх `OperatorsService.issueToken` (TASK-8, `apps/server/src/domain/operators/operators.service.ts`). Бизнес-логики в контроллере нет.

1. `operator-token.dto.ts`:

   ```ts
   export class OperatorTokenRequestDto extends createZodDto(operatorTokenRequestSchema) {}
   export class OperatorTokenResponseDto extends createZodDto(operatorTokenResponseSchema) {}
   ```

   `createZodDto` — из `nestjs-zod`, схемы — из `@sowa-chat/protocol` (TASK-2).

2. `operator-token.controller.ts` — `OperatorTokenController`:

   ```ts
   @ServerController("operator-token")
   export class OperatorTokenController {
     @Post()
     @HttpCode(200)
     @ZodResponse({ status: 200, type: OperatorTokenResponseDto })
     async issue(@Body() body: OperatorTokenRequestDto): Promise<OperatorTokenResponse>
   }
   ```

   Зависимости через `@Inject`: `OperatorsService`, `RequestContext` (`apps/server/src/infra/request-context/request-context.ts`). `ServerController` — из `apps/server/src/api/server/server-controller.decorator.ts` (TASK-7): зона `internal` и `ServerKeyGuard`.

   `issue`:
   1. `projectId` — `this.requestContext.projectId()`: проект берётся только из ключа `sk_`, в теле его нет;
   2. `const issued = await this.operators.issueToken({ projectId, ...body })`;
   3. `OperatorDisabledError` — `throw new ApiException({ code: "forbidden", message: "Operator is disabled" })` (403); другие ошибки пробрасываются как есть;
   4. ответ — `{ token: issued.token, expiresAt: issued.expiresAt.toISOString() }`.

   Код ответа 200, а не 201: запрос выдаёт токен, а не создаёт ресурс (решение в `decisions.md`). Неверное тело отсекает глобальный `ZodValidationPipe` (`apps/server/src/infra/http/api-http.module.ts`) — 400 `validationFailed`.

3. `server-api.module.ts` — `ServerApiModule`: `imports: [OperatorsModule]`, `controllers: [OperatorTokenController]`. Контроллеры внутренней зоны следующих эпиков добавляются сюда или в свои модули.

4. `apps/server/src/api.module.ts`: добавить `ServerApiModule` в конец `imports`.

## Где

- `apps/server/src/api/server/operator-token.dto.ts`, `apps/server/src/api/server/operator-token.controller.ts`, `apps/server/src/api/server/server-api.module.ts` — новые файлы.
- `apps/server/src/api.module.ts`.
- Читать: `apps/server/src/domain/operators/operators.service.ts`, `apps/server/src/api/server/server-controller.decorator.ts`, `apps/server/src/infra/http/zod-serialization.spec.ts` (образец `ZodResponse`).
- Тест: `apps/server/test/operator-token.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`): приложение — `startZoneE2eApp()` из `apps/server/test/support/zone-e2e-app.ts` (TASK-7), база — `useTestDatabase`, проект — `createProject`, ключ — `app.get(ApiKeysService).issue({ projectId, kind: "server", actorKind: "cli" })`, токен проверяется `app.get(TokensService).verify(token, "operator")`. Запросы — `supertest` на `http://127.0.0.1:${ports.internal}`.

## Требования из плана

- `POST /v1/server/operator-token` — serverKey → токен оператора, внутренняя зона.
- Токен оператора: JWT на 15 минут без refresh-токена.
- serverKey не попадает в браузер: браузер оператора получает только короткий токен.
- Утечка одного ключа не открывает всё остальное: бекенд сайта не может выпустить токен оператора.
- Ответы проходят через схемы ответов, чтобы наружу не ушли лишние поля.

## Документация

- https://docs.nestjs.com/controllers
- https://github.com/BenLorantfy/nestjs-zod#readme

## Критерии приёмки

- С верным `sk_` и телом `{ externalId, name, role: "supervisor" }` — 200, в теле ровно `token` и `expiresAt`; токен проходит `verify(token, "operator")` с `projectId` проекта ключа и ролью `supervisor`; `expiresAt` — примерно через 15 минут (от 890 до 900 секунд от момента запроса).
- Повторный запрос того же `externalId` с `role: "operator"` возвращает токен с ролью `operator`, в `operators` одна строка с ролью `operator`.
- Оператор с `disabled_at` в базе получает 403 с `code` `forbidden`.
- `role: "admin"` и тело без `externalId` — 400 `validationFailed`; без ключа и с `bk_` — 401.

## Чего не делать

- Не принимать `projectId` из тела или query: проект только из ключа.
- Не делать guard оператора — это TASK-10.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
