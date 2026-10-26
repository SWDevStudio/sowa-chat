# EPIC-7 / TASK-5. OpenAPI из zod-схем, Swagger UI только в development

Исполнитель: haiku
Зависит от: TASK-1
Ветка: feature/EPIC-7

## Что сделать

1. OpenAPI-документ строится через `@nestjs/swagger` из тех же zod-схем, что проверяют запросы и ответы. Документ проходит `cleanupOpenApiDoc` из `nestjs-zod`.
2. Отдельный документ на каждую зону с API: публичная, операторская, внутренняя. В документ зоны попадают только её контроллеры.
3. Swagger UI — только при `SOWA_ENV=development`, на служебном порту: `/docs/public`, `/docs/operator`, `/docs/internal`. В `production` этих путей нет.
4. JSON документов отдаётся рядом с UI, чтобы его можно было скачать.

## Где

- `apps/server/src/infra/http/` или отдельный модуль OpenAPI.

## Требования из плана

- OpenAPI из zod-схем (`cleanupOpenApiDoc`), Swagger UI только в development.
- OpenAPI нужен и авторам ботов на других языках.
- Swagger UI, playground, `pretty`-логи в production выключены.

## Документация

- https://docs.nestjs.com/openapi/introduction
- https://github.com/BenLorantfy/nestjs-zod

## Критерии приёмки

- В development `/docs/internal` на порту 9090 открывает Swagger UI, JSON документа содержит тестовый маршрут внутренней зоны и не содержит маршрутов других зон.
- В production `/docs/*` отвечает 404.

## Чего не делать

- Не настраивать CSP для Swagger UI — заголовки безопасности в TASK-6, проверка в браузере в TASK-7.

## История доработок

—
