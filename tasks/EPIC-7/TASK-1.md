# EPIC-7 / TASK-1. Глобальная проверка запросов через zod-схемы

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-7

## Что сделать

1. Подключить `ZodValidationPipe` из `nestjs-zod` глобально через провайдер `APP_PIPE` (не через `app.useGlobalPipes`, чтобы pipe работал в e2e-тестах с тем же модулем).
2. DTO описываются через `createZodDto` поверх схем из `protocol`.
3. Проверяются тело, параметры пути и query.

## Где

- `apps/server/src/infra/http/` (или похожее место для общих настроек HTTP) — провайдер.

## Требования из плана

```ts
// packages/protocol
export const SendMessageSchema = z.object({ ... });

// apps/server
export class SendMessageDto extends createZodDto(SendMessageSchema) {}
```

- REST: глобальный `ZodValidationPipe` через `APP_PIPE`, DTO через `createZodDto`, OpenAPI из тех же схем.
- Контракты API — zod-схемы в `protocol`; сущности TypeORM в `protocol` не попадают.
- Версия `nestjs-zod` должна поддерживать Zod 4 (проверено при установке библиотек).

## Документация

- https://docs.nestjs.com/pipes
- https://docs.nestjs.com/techniques/validation
- https://github.com/BenLorantfy/nestjs-zod

## Критерии приёмки

- Тестовый маршрут с DTO: неверное тело — 400, верное — проходит в обработчик уже разобранным.
- Неверный query-параметр — 400.

## Чего не делать

- Не менять формат тела ошибки — это TASK-2.

## История доработок

—
