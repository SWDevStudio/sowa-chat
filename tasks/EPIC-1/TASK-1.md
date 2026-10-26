# EPIC-1 / TASK-1. Настроить TypeScript и проверку типов во всех пакетах

Исполнитель: haiku
Зависит от: —
Ветка: feature/EPIC-1

## Что сделать

У пакетов `protocol`, `sdk`, `bot-sdk` и `server-sdk` нет своих настроек TypeScript. Нужно:

1. Создать в корне общий `tsconfig.base.json` со строгими настройками.
2. В каждом из четырёх пакетов создать `tsconfig.json`, который наследует базовый.
3. В каждом пакете добавить скрипт `check-types`: `tsc --noEmit`.
4. Убедиться, что `pnpm check-types` в корне (через turbo) проверяет все пять workspace-пакетов, включая `apps/server`.

## Где

- `tsconfig.base.json` в корне — новый.
- `packages/protocol/tsconfig.json`, `packages/sdk/tsconfig.json`, `packages/bot-sdk/tsconfig.json`, `packages/server-sdk/tsconfig.json` — новые.
- `package.json` каждого из четырёх пакетов — скрипт `check-types`.

## Требования из плана

- Все пакеты в ESM (`"type": "module"` уже стоит), TypeScript из pnpm catalog.
- `strict: true`, `target` не ниже ES2023, `skipLibCheck: true`.
- `sdk` работает в браузере, ему нужна библиотека типов `DOM`. Обращаться к `window` при импорте SDK нельзя (это проверяется в другом эпике), типы DOM нужны только для компиляции.
- `bot-sdk` и `server-sdk` работают в Node.js, им нужны типы `node`.
- `protocol` используется и в браузере, и в Node.js: в нём не должно быть ни DOM-, ни Node-специфичного кода, поэтому без `DOM` в `lib` и без `node` в `types`.
- Точки входа пакетов указывают на исходники (`./src/index.ts`) — так и остаётся.

## Документация

- https://www.typescriptlang.org/tsconfig

## Критерии приёмки

- `pnpm check-types` в корне проходит и запускает проверку во всех пяти пакетах.
- Намеренная ошибка типов в любом из четырёх пакетов роняет `pnpm check-types`.
- В `protocol` использование `window` или `process` даёт ошибку типов.

## Чего не делать

- Не настраивать сборку пакетов (tsdown) — это TASK-2.
- Не менять `apps/server/tsconfig.json`, кроме случая, когда без этого не работает общая проверка; тогда описать причину в отчёте.
- Не трогать `exports` в `package.json` пакетов.

## История доработок

—
