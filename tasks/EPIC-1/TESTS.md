# EPIC-1. Приёмочные тесты

| Файл | Задача | Критерии |
|---|---|---|
| `apps/server/test/workspace-check-types.e2e-spec.ts` | TASK-1 | `pnpm check-types` проходит и запускает `tsc --noEmit` в пяти пакетах; ошибка типов в `protocol`, `sdk`, `bot-sdk`, `server-sdk` роняет `pnpm check-types`; `window` и `process` в `protocol` дают ошибку типов; требования: в `sdk` есть типы DOM, в `bot-sdk` и `server-sdk` — типы Node.js |
| `apps/server/test/packages-build.e2e-spec.ts` | TASK-2 | `pnpm build` проходит, у каждой точки входа есть `.js`, `.cjs`, `.d.ts` в `dist/`; `zod` в собранном `protocol` подключается через `import` и `require` (нужен код TASK-3–5); повторная сборка пакетов берётся из кэша turbo |
| `packages/protocol/src/json-object.spec.ts` | TASK-3 | форма: на верхнем уровне массив, строка, `null`, число отклоняются, значения не из JSON отклоняются; ключ: 64 символа проходит, 65 и недопустимые символы отклоняются; `__proto__` из `JSON.parse`, `constructor`, `prototype` отклоняются; глубина 10 000 отклоняется без падения; ошибка содержит путь к ключу; типы `JsonValue` и `JsonObject` |
| `packages/protocol/src/json-object-limits.spec.ts` | TASK-3 | границы правил: размер 16 КБ в байтах UTF-8, глубина 5, 100 ключей на всех уровнях, строка 2 КБ в байтах UTF-8, массив 100 элементов; схема со своими лимитами применяет их |
| `packages/protocol/src/event-envelope.spec.ts` | TASK-4 | корректный конверт проходит; без `eventId`, с неверным UUID, с `occurredAt` не в ISO 8601 (и не в UTC) отклоняется; без `conversationId` проходит; конверт конкретного события отклоняет неверный `payload` |
| `packages/protocol/src/errors.spec.ts` | TASK-5 | коды доступны как константы и как тип-объединение строк; схема тела ошибки `{ statusCode, message, code, requestId, details? }` принимает корректное тело и отклоняет неизвестный код; тело без `statusCode`, `message` или `code` отклоняется |
| `apps/server/test/server-protocol.e2e-spec.ts` | TASK-6 | `pnpm check-types` и `pnpm build` проходят; `node apps/server/dist/main.js` стартует и отвечает по HTTP без ошибок загрузки модулей; несовместимое изменение `protocol` роняет `pnpm check-types` на сервере; зависимость `workspace:*` и импорт только через `@sowa-chat/protocol` |

## Проверяется вручную

- TASK-1: `apps/server/tsconfig.json` не менялся, а если менялся — причина описана в отчёте.
- TASK-2: `exports` пакетов по-прежнему указывают на `./src/...`, `publishConfig` не добавлен.
- TASK-2: код оператора не попадает в бандл `@sowa-chat/sdk/visitor` (точки входа собираются раздельно).
- TASK-6: в отчёте описан выбранный способ загрузки `protocol` собранным сервером (условие экспорта или сборка через `^build`).
- Проверки типов в `expectTypeOf` (TASK-3–5) срабатывают только в `pnpm check-types`: при запуске vitest они проходят всегда.
