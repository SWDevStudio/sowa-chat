# EPIC-18 / TASK-3. pnpm audit, сборка образа и сканирование Trivy

Исполнитель: haiku
Зависит от: TASK-1
Ветка: feature/EPIC-18

## Что сделать

1. Шаг `pnpm audit --audit-level high` (падает на уязвимостях уровня high и critical).
2. Job сборки Docker-образа сервера (`apps/server/Dockerfile`) без публикации.
3. Сканирование собранного образа Trivy (`aquasecurity/trivy-action` с фиксированной версией): падает на уязвимостях HIGH и CRITICAL, у которых есть исправление.

## Где

- `.github/workflows/ci.yml`.

## Требования из плана

- Цепочка поставок: в CI `pnpm audit` и сканирование образа (Trivy); минимальный базовый образ, процесс не от root.

## Документация

- https://pnpm.io/cli/audit
- https://github.com/aquasecurity/trivy-action

## Критерии приёмки

- Pull request, который добавляет зависимость с известной уязвимостью уровня high, падает на `pnpm audit`.
- Образ собирается и сканируется в каждом pull request.

## Чего не делать

- Не публиковать образ — это эпик релиза.

## История доработок

—
