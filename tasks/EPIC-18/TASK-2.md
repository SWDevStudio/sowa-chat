# EPIC-18 / TASK-2. E2e на testcontainers и проверка слоёв в CI

Исполнитель: sonnet
Зависит от: TASK-1
Ветка: feature/EPIC-18

## Что сделать

1. Отдельная задача (job) в CI для e2e-тестов сервера: `pnpm --filter @sowa-chat/server test:e2e`. Docker на раннерах GitHub есть, testcontainers поднимают PostgreSQL и Valkey сами.
2. Шаг проверки слоёв: `pnpm check-layers`.
3. Job e2e запускается параллельно с job из TASK-1.

## Где

- `.github/workflows/ci.yml`.

## Требования из плана

- CI: тесты с testcontainers, проверка слоёв.
- Правило слоёв проверяется автоматически: dependency-cruiser в CI роняет сборку, если импорт идёт против направления слоёв.

## Документация

- https://node.testcontainers.org/supported-container-runtimes/
- https://docs.github.com/en/actions

## Критерии приёмки

- Pull request с импортом из `api` в `domain` падает на шаге проверки слоёв.
- Pull request с упавшим e2e-тестом падает на job e2e.
- Чистый pull request проходит обе проверки.

## Чего не делать

- Не менять сами тесты.

## История доработок

—
