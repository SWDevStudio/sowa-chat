# EPIC-7 / TASK-7. Лимит тела запроса 64 КБ до разбора JSON

Исполнитель: haiku
Зависит от: TASK-3, TASK-6
Владеет: apps/server/src/infra/http/body-limit.ts, apps/server/src/infra/http/body-parser-error.middleware.ts, apps/server/src/infra/http/body-limit.spec.ts, apps/server/src/api-app.ts, apps/server/src/main.ts, apps/server/test/support/zone-probe.ts, apps/server/src/infra/zones/zone-servers.spec.ts
Ветка: feature/EPIC-7

## Что сделать

1. `apps/server/src/infra/http/body-limit.ts`:

   ```ts
   export const bodyLimit = "64kb";

   export function useBodyLimit(app: NestExpressApplication): void {
     app.useBodyParser("json", { limit: bodyLimit });
     app.useBodyParser("urlencoded", { limit: bodyLimit, extended: true });
     app.use(bodyParserErrorToHttpException);
   }
   ```

   - `NestExpressApplication` — `import type` из `@nestjs/platform-express`. Свои парсеры, зарегистрированные до `app.init()`, Nest не дублирует своими по умолчанию.
   - `body-parser` проверяет размер по `Content-Length` и по мере чтения, до разбора JSON, и отдаёт ошибку со свойствами `status` и `type` (`entity.too.large` — 413). Без перевода Nest считает её неизвестной ошибкой и фильтр ответил бы 500.
   - `bodyParserErrorToHttpException(error: unknown, _request: Request, _response: Response, next: NextFunction): void` — Express-обработчик ошибок (ровно четыре параметра). Лежит в отдельном файле `apps/server/src/infra/http/body-parser-error.middleware.ts`, `body-limit.ts` импортирует его оттуда: для `*.middleware.ts` в `.oxlintrc.json` уже есть override `max-params: 5`. `.oxlintrc.json` не менять, правило комментарием не отключать. Если `error` — `Error` и у него есть числовое `status` и свойство `type` (так выглядят ошибки `body-parser`), вызвать `next(new HttpException(error.message, status))`. Иначе `next(error)`. Дальше ошибку обрабатывает фильтр из TASK-3: 413 → `payloadTooLarge`.

2. `configureApiApp` в `apps/server/src/api-app.ts` принимает `NestExpressApplication` вместо `INestApplication` и вызывает `useBodyLimit(app)` сразу после `useSecurityHeaders(app)`.

3. Создание приложения с типом Express:
   - `apps/server/src/main.ts`, `runApi`: `NestFactory.create<NestExpressApplication>(ApiModule, { bufferLogs: true })`. Остальной `main.ts` не трогать.
   - `apps/server/test/support/zone-probe.ts`: `moduleRef.createNestApplication<NestExpressApplication>({ bufferLogs: true })`, тип поля `app` в `ZoneProbeApp` не менять.
   - `apps/server/src/infra/zones/zone-servers.spec.ts`, тест про `EADDRINUSE`: `moduleRef.createNestApplication<NestExpressApplication>({ bufferLogs: true })`. Больше в файле ничего не менять. Сигнатуру `configureApiApp` не ослаблять до `INestApplication` и не приводить тип внутри через `as`.

## Где

- `apps/server/src/infra/http/body-limit.ts`, `apps/server/src/infra/http/body-parser-error.middleware.ts` — новые файлы; `apps/server/src/infra/zones/zone-servers.spec.ts` — одна правка; `apps/server/src/api-app.ts`, `apps/server/src/main.ts`, `apps/server/test/support/zone-probe.ts` — правки.
- Тест: `apps/server/src/infra/http/body-limit.spec.ts` на `startZoneProbeApp`. Тестовый контроллер `@Zone("public")`, `@Controller("visitor/body-probe")`, `@Post()` с `@Body() body: unknown`, возвращает `{ received: true }`.

## Требования из плана

- Проверка в два слоя: лимит тела запроса 64 КБ ещё до разбора JSON, затем zod-схема.
- Файлы идут мимо api (прямо в S3), поэтому большой лимит тела не нужен.
- Отказ в обслуживании: тело запроса до 64 КБ.

## Документация

- https://docs.nestjs.com/faq/raw-body
- https://github.com/expressjs/body-parser#limit
- https://expressjs.com/en/guide/error-handling.html

## Критерии приёмки

- JSON-тело 65 КБ (`65 * 1024` байт) — 413, `code: "payloadTooLarge"`; JSON-тело 63 КБ доходит до обработчика.
- Битый JSON размером 65 КБ — 413, а не 400: лимит срабатывает до разбора.
- Тело `application/x-www-form-urlencoded` 65 КБ — 413 `payloadTooLarge`.

## Чего не делать

- Не подключать `express` напрямую и не добавлять зависимости в `package.json`.
- Не менять `runMigrate`, `runWorker`, `runCli` в `main.ts`: параллельно `main.ts` меняет EPIC-5.

## История доработок

- 28.10.2026, вопрос исполнителя: `max-params` на обработчике ошибок и TS2345 в `zone-servers.spec.ts`. Ответ записан в «Что сделать» и «Где».
