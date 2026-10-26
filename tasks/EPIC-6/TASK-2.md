# EPIC-6 / TASK-2. Valkey в e2e-окружении

Исполнитель: haiku
Зависит от: TASK-1
Ветка: feature/EPIC-6

## Что сделать

Добавить в e2e-окружение контейнер Valkey рядом с PostgreSQL.

1. В глобальной подготовке e2e поднимается `valkey/valkey:9.2` (тот же образ, что в `deploy/compose/docker-compose.dev.yml`) через `GenericContainer` из `testcontainers`, с ожиданием готовности.
2. Тестовое приложение получает `REDIS_URL` контейнера.
3. Между тестами Redis очищается (`FLUSHALL`).

## Где

- `apps/server/test/support/` — рядом с контейнером PostgreSQL.

## Требования из плана

- Тесты: e2e на testcontainers из того же образа, что в compose.

## Документация

- https://node.testcontainers.org/features/containers/
- https://node.testcontainers.org/features/wait-strategies/

## Критерии приёмки

- E2e-тест выполняет `SET` и `GET` через клиент приложения на Valkey из контейнера.
- После прогона контейнер остановлен.

## Чего не делать

- Не менять подготовку PostgreSQL сверх того, что нужно для общего запуска.

## История доработок

—
