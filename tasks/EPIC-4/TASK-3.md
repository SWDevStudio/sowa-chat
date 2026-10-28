# EPIC-4 / TASK-3. Версия /v1 в путях, служебные маршруты без версии

Исполнитель: haiku
Зависит от: TASK-1, TASK-2
Владеет: apps/server/src/api-app.ts, apps/server/src/api-versioning.spec.ts
Ветка: feature/EPIC-4

## Что сделать

Включить версионирование Nest по URI: маршруты контроллеров получают префикс `/v1`, служебные маршруты остаются без версии.

1. В `configureApiApp` (`apps/server/src/api-app.ts`, создан в TASK-2) добавить:

   ```ts
   app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
   ```

   `VersioningType` — из `@nestjs/common`. Вызов стоит в `configureApiApp`, потому что версионирование включается до `app.init()`, а `configureApiApp` вызывается до него и в `main.ts`, и в тестах.
2. Служебные контроллеры (`/health/*`, `/metrics`, `/status`) будут объявляться с `version: VERSION_NEUTRAL` — сами контроллеры делает эпик Redis и служебной зоны, здесь проверяется только, что такой контроллер отвечает без префикса.
3. Тесты — через `startZoneProbeApp` из `apps/server/test/support/zone-probe.ts` (TASK-2), запросы на порт зоны контроллера. Тестовые контроллеры помечены `@Zone`: тогда тесты не сломаются, когда TASK-4 включит guard зон.

## Где

- `apps/server/src/api-app.ts`.
- Тест: `apps/server/src/api-versioning.spec.ts`.

## Требования из плана

- Версия входит в путь у всего, что составляет контракт с клиентами: REST (`/v1/...`) и WebSocket (`/v1/ws`).
- При несовместимых изменениях рядом поднимаются `/v2/...`, и старые клиенты продолжают работать на `v1`.
- Без версии остаются только служебные `/health/*`, `/metrics` и `/status`: их пути зафиксированы соглашениями Kubernetes и Prometheus.

## Документация

- https://docs.nestjs.com/techniques/versioning

## Критерии приёмки

- Тестовый контроллер `@Zone('public')` с путём `visitor/ping` на публичном порту отвечает 200 по `/v1/visitor/ping` и 404 по `/visitor/ping`.
- Тестовый контроллер `@Zone('management')` с `version: VERSION_NEUTRAL` и путём `health-probe` на служебном порту отвечает 200 по `/health-probe` и 404 по `/v1/health-probe`.

## Чего не делать

- Не создавать служебные контроллеры — это эпик Redis и служебной зоны.
- Не задавать версию WebSocket — это эпик WebSocket.

## История доработок

—
