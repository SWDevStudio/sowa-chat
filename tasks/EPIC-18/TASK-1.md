# EPIC-18 / TASK-1. GitHub Actions: формат, линтер, типы, unit-тесты

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-18

## Что сделать

Workflow `.github/workflows/ci.yml`, который запускается на каждый pull request и push в `master`:

1. Node 24 и pnpm версии из `packageManager`, кэш pnpm.
2. `pnpm install --frozen-lockfile`.
3. `pnpm format:check`, `pnpm lint`, `pnpm check-types`, `pnpm build`, `pnpm test`.
4. Каждая проверка — отдельный шаг, чтобы по логу было видно, что упало.
5. Права workflow — минимальные (`permissions: contents: read`).

## Где

- `.github/workflows/ci.yml`.

## Требования из плана

- CI: формат, линтер, типы, тесты.
- Перед push Husky уже гоняет формат, линтер, типы и тесты; CI повторяет это на сервере, чтобы проверка не зависела от локальных хуков.

## Документация

- https://docs.github.com/en/actions
- https://pnpm.io/continuous-integration#github-actions

## Критерии приёмки

- Pull request с ошибкой форматирования, линтера или типов падает на соответствующем шаге.
- Чистый pull request проходит.

## Чего не делать

- Не добавлять e2e, проверку слоёв, audit и сборку образа — это TASK-2 и TASK-3.

## История доработок

—
