# EPIC-1 / TASK-6. Подключить protocol к серверу

Исполнитель: haiku
Зависит от: TASK-2
Ветка: feature/EPIC-1

## Что сделать

Подключить `@sowa-chat/protocol` к `apps/server` и проверить, что сервер с ним собирается и запускается.

1. Добавить в `apps/server/package.json` зависимость `"@sowa-chat/protocol": "workspace:*"`.
2. Импортировать в сервере схему `JsonObject` из `protocol` в минимальном месте, которое проверяет подключение.
3. Проверить три сценария: `pnpm check-types`, `nest build` с запуском `node dist/main.js`, запуск тестов vitest.

Если собранный сервер не может загрузить `protocol` из исходников (`.ts` в `exports`), выбрать способ решения и описать его в отчёте. Варианты: условие экспорта для разработки или сборка `protocol` до сервера через turbo `^build`. Ограничение одно: при разработке типы берутся из исходников `protocol`.

## Где

- `apps/server/package.json`, `pnpm-lock.yaml`.
- При необходимости — `packages/protocol/package.json` (`exports`) и `turbo.json`.

## Требования из плана

- Другие пакеты импортируются только через точки входа (`@sowa-chat/protocol`), не вглубь: Node такой импорт не пропустит (`ERR_PACKAGE_PATH_NOT_EXPORTED`).
- Сервер берёт `protocol` из исходников монорепо: несовместимое изменение формата видно при сборке.

## Документация

- https://pnpm.io/workspaces
- https://nodejs.org/api/packages.html#conditional-exports

## Критерии приёмки

- `pnpm check-types` и `pnpm build` проходят.
- `node apps/server/dist/main.js` стартует без ошибок загрузки модулей.
- Изменение типа в `protocol`, несовместимое с его использованием в сервере, роняет `pnpm check-types`.

## Чего не делать

- Не импортировать из `protocol` вглубь (`@sowa-chat/protocol/src/...`).

## История доработок

—
