# EPIC-18 / TASK-4. Renovate для обновления зависимостей

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-18

## Что сделать

Конфиг Renovate `renovate.json` в корне:

1. Обновляет зависимости в pnpm catalog (`pnpm-workspace.yaml`) и в `package.json` пакетов.
2. Обновляет образы в `Dockerfile` и compose-файлах, включая фиксированные теги PostgreSQL, Valkey, SeaweedFS.
3. Обновляет версии actions в `.github/workflows`.
4. Группирует связанные пакеты, чтобы не было десятков pull request'ов: `@nestjs/*`, `@aws-sdk/*`, `vitest` с `@vitest/*`, `typeorm` с `@nestjs/typeorm`.
5. Расписание — раз в неделю.

## Где

- `renovate.json` в корне.

## Требования из плана

- Цепочка поставок: обновления зависимостей через Renovate.
- Версии зависимостей закреплены через pnpm catalog.
- `ffmpeg` и `sharp` обновляются вместе с зависимостями.

## Документация

- https://docs.renovatebot.com/
- https://docs.renovatebot.com/modules/manager/npm/#pnpm-catalogs

## Критерии приёмки

- `npx --yes --package renovate -- renovate-config-validator` проходит.
- Конфиг описывает группы и расписание из списка выше.

## Чего не делать

- Не включать автослияние обновлений.

## История доработок

—
