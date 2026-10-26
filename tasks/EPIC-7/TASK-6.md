# EPIC-7 / TASK-6. Заголовки безопасности

Исполнитель: sonnet
Зависит от: —
Ветка: feature/EPIC-7

## Что сделать

1. `helmet` на всех портах со строгой CSP по умолчанию.
2. HSTS (входит в `helmet`).
3. `X-Content-Type-Options: nosniff` на всех ответах (входит в `helmet`).
4. `Cache-Control: no-store` на всех ответах API с префиксом `/v1`: почти все они содержат персональные данные.

## Где

- `apps/server/src/main.ts` или модуль запуска режима `api`.

## Требования из плана

- Заголовки безопасности через `helmet`, HSTS, `Cache-Control: no-store` на ответах с персональными данными.
- `X-Content-Type-Options: nosniff` на всех ответах.
- В production только `https` и `wss`; HSTS — часть защиты от перехвата трафика.

## Документация

- https://docs.nestjs.com/security/helmet
- https://helmetjs.github.io/

## Критерии приёмки

- На каждом из четырёх портов ответ содержит `Strict-Transport-Security`, `X-Content-Type-Options: nosniff` и `Content-Security-Policy`.
- Ответы `/v1/...` содержат `Cache-Control: no-store`.

## Чего не делать

- Не ослаблять CSP ради Swagger UI вслепую: если Swagger UI не работает под CSP, это решается в TASK-7 после проверки в браузере.

## История доработок

—
