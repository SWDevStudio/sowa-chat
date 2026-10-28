# EPIC-7 / TASK-6. Заголовки безопасности helmet и Cache-Control: no-store

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/http/security-headers.ts, apps/server/src/infra/http/security-headers.spec.ts, apps/server/src/api-app.ts
Ветка: feature/EPIC-7

## Что сделать

1. `apps/server/src/infra/http/security-headers.ts`:

   ```ts
   export function useSecurityHeaders(app: INestApplication): void {
     app.use(helmet());
     app.use(noStore);
   }
   ```

   - `helmet()` (`import helmet from "helmet"`) с настройками по умолчанию: строгая CSP, HSTS, `X-Content-Type-Options: nosniff`, без `X-Powered-By`. Настройки не менять.
   - `noStore` — функция-middleware в том же файле: `response.setHeader("Cache-Control", "no-store")`, затем `next()`. Типы `Request`, `Response`, `NextFunction` — `import type` из `express`.
   - `no-store` ставится на все ответы всех портов, а не только на `/v1` (решение в `decisions.md`).

2. В `configureApiApp` (`apps/server/src/api-app.ts`) вызвать `useSecurityHeaders(app)` сразу после `useClsMiddleware(app)`, до всех остальных вызовов. Так заголовки есть и у ответов с ошибками из следующих middleware (лимит тела в TASK-7).

## Где

- `apps/server/src/infra/http/security-headers.ts` — новый файл; `apps/server/src/api-app.ts` — одна строка и импорт.
- Тест: `apps/server/src/infra/http/security-headers.spec.ts` на `startZoneProbeApp`, по одному тестовому контроллеру на каждую из четырёх зон (образец — `apps/server/src/infra/zones/zone-servers.spec.ts`).

## Требования из плана

- Заголовки безопасности через `helmet`, HSTS, `Cache-Control: no-store` на ответах с персональными данными.
- `X-Content-Type-Options: nosniff` на всех ответах.
- В production только `https` и `wss`; HSTS — часть защиты от перехвата трафика.

## Документация

- https://docs.nestjs.com/security/helmet
- https://helmetjs.github.io/

## Критерии приёмки

- На каждом из четырёх портов ответ содержит `Strict-Transport-Security` с `max-age=`, `X-Content-Type-Options: nosniff` и `Content-Security-Policy` с `default-src 'self'`; заголовка `X-Powered-By` нет.
- `Cache-Control: no-store` есть у ответа 200 на `/v1/visitor/...` и у ответа 404 на неизвестный маршрут.

## Чего не делать

- Не ослаблять CSP ради Swagger UI: это решается в TASK-9 после проверки в браузере.

## История доработок

—
