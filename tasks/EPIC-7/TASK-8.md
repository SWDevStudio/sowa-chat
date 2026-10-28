# EPIC-7 / TASK-8. OpenAPI по зонам из zod-схем, Swagger UI только в development на служебном порту

Исполнитель: haiku
Зависит от: TASK-4, TASK-6
Владеет: apps/server/src/infra/http/api-docs.ts, apps/server/src/infra/http/api-docs.spec.ts, apps/server/src/api-app.ts
Ветка: feature/EPIC-7

## Что сделать

1. `apps/server/src/infra/http/api-docs.ts`:

   ```ts
   type DocumentedZone = Exclude<ApiZone, "management">;

   const zonePathPrefixes: Record<DocumentedZone, string[]> = {
     public: ["/v1/visitor"],
     operator: ["/v1/operator"],
     internal: ["/v1/server", "/v1/bot"],
   };

   export function setupApiDocs(app: INestApplication, ports: ZonePorts): void
   ```

   `setupApiDocs` по шагам:
   - `const config = new DocumentBuilder().setTitle("sowa-chat API").setVersion("1").build();`
   - `const document = cleanupOpenApiDoc(SwaggerModule.createDocument(app, config));` (`cleanupOpenApiDoc` из `nestjs-zod`, остальное из `@nestjs/swagger`). Документ строится из тех же DTO `createZodDto` и `@ZodResponse`, что проверяют запросы и ответы.
   - `app.use("/docs", onlyOnManagementPort(ports));`
   - для каждой зоны `public`, `operator`, `internal`: `SwaggerModule.setup(\`docs/${zone}\`, app, documentForZone(document, zonePathPrefixes[zone]))`. UI — `/docs/<зона>`, JSON документа — `/docs/<зона>-json` (путь Nest по умолчанию, не менять).

   Вспомогательные функции в том же файле:
   - `documentForZone(document, prefixes)` — копия документа (`{ ...document, paths }`), где в `paths` остались только пути, которые равны префиксу или начинаются с `префикс + "/"`. Остальные поля документа не меняются.
   - `onlyOnManagementPort(ports)` — middleware: если `zoneOfPort(ports, request.socket.localPort) === "management"`, `next()`; иначе `next(new NotFoundException(\`Cannot ${request.method} ${request.originalUrl}\`))` — тот же ответ, что у `ZoneGuard`.

   Маршруты Swagger UI регистрируются в Express мимо контроллеров, поэтому `ZoneGuard` их не видит. Без `onlyOnManagementPort` они были бы на всех четырёх портах.

2. В конце `configureApiApp` (`apps/server/src/api-app.ts`), после `enableVersioning` и guard:

   ```ts
   const settings = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
   if (settings.env === "development") {
     setupApiDocs(app, ports);
   }
   ```

   `appConfig` — из `apps/server/src/infra/config/app.config.ts`, `ports` — уже есть в функции. В `production` маршрутов `/docs` нет, и Nest отвечает 404.

## Где

- `apps/server/src/infra/http/api-docs.ts` — новый файл; `apps/server/src/api-app.ts` — вызов в конце.
- Тест: `apps/server/src/infra/http/api-docs.spec.ts` на `startZoneProbeApp(controllers, env)` (параметр `env` добавлен в TASK-4; для production — `{ SOWA_ENV: "production" }`). Тестовые контроллеры: `@Zone("public") @Controller("visitor/docs-probe")`, `@Zone("operator") @Controller("operator/docs-probe")`, `@Zone("internal") @Controller("server/docs-probe")` с `@Post()` и телом-DTO `createZodDto(z.object({ name: z.string() }))`.

## Требования из плана

- OpenAPI из zod-схем (`cleanupOpenApiDoc`), Swagger UI только в development.
- OpenAPI нужен и авторам ботов на других языках.
- Swagger UI, playground, `pretty`-логи в production выключены.
- Служебная зона (порт 9090 по умолчанию) наружу не публикуется.

## Документация

- https://docs.nestjs.com/openapi/introduction
- https://github.com/BenLorantfy/nestjs-zod

## Критерии приёмки

- В development `GET /docs/internal` на служебном порту — 200 с HTML Swagger UI; JSON `/docs/internal-json` содержит путь `/v1/server/docs-probe` и не содержит `/v1/visitor/docs-probe` и `/v1/operator/docs-probe`. JSON `/docs/public-json` содержит только `/v1/visitor/docs-probe`.
- В JSON внутренней зоны у `POST /v1/server/docs-probe` есть тело запроса со свойством `name` из zod-схемы DTO.
- В development `/docs/public` и `/docs/public-json` на публичном порту — 404.
- В production `/docs/public` и `/docs/internal-json` на служебном порту — 404.

## Чего не делать

- Не настраивать CSP для Swagger UI — проверка в браузере в TASK-9.
- Не делать документ служебной зоны.

## История доработок

—
