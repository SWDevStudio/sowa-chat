# Отчёт по EPIC-7. Обработка HTTP-запросов

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Глобальная проверка запросов через zod | haiku | sonnet | нет (простая, без приёмки) |
| 2 | Схема `limit` страниц в `protocol` | haiku | sonnet | нет |
| 3 | Фильтр ошибок | haiku | sonnet | нет |
| 4 | `ApiException`, коды и статусы, лог 5xx | haiku | opus | нет |
| 5 | Сериализация ответов по zod-схемам | haiku | opus | нет |
| 6 | Заголовки безопасности (helmet, no-store) | haiku | sonnet | нет |
| 7 | Лимит тела 64 КБ | haiku | sonnet | вопросы планировщику: `max-params` (вынос обработчика в `*.middleware.ts`) и сигнатура `configureApiApp` |
| 8 | OpenAPI по зонам, Swagger UI только в development | haiku | sonnet | тест ждал литерал `name` в `requestBody`, исправлен на разрешение `$ref` |
| 9 | Проверить Swagger UI в браузере со строгой CSP | разработчик | — | не начата, на разработчике |

Решения и внутренние имена: [decisions.md](decisions.md).

## Задачи review

- Таймауты vitest 30 с (`testTimeout`, `hookTimeout` в `apps/server/vitest.config.ts`): холодный импорт Nest при параллельной нагрузке ронял тесты в нескольких задачах.
- Правка старых тестов зон: в тело 404 добавился `requestId`, `capture()` теперь шлёт один `X-Request-Id`; убраны явные таймауты 20 с у describe.
- Правки по ревью: `errorCodeOfStatus` выводится из `errorCodeStatuses`, две почти одинаковые функции ответа об ошибке объединены.

## Итоговый прогон

Первый прогон упал не по вине задач: окружение (нет `node_modules` у `bot-sdk` и `server-sdk` в копии), нагрузка (два тяжёлых прогона на одном Docker) и старый тест зон. После исправлений и повторов прогон прошёл (PASS), после правок ревью прошёл ещё раз.

## Ревью (opus)

Блокирующих замечаний нет. Исправлены два пункта «стоит поправить» (дублирование таблицы «код — статус», дублирование функций ответа). Остались «мелочи»:

- `http-error.filter.ts:25` нет проверки `response.headersSent`.
- `api-app.ts:23` магическая строка `"development"`, есть enum в `env.schema.ts:30`.
- `packages/protocol/src/page-query.ts:4` числа `1`, `100`, `50` без имён (`maxPageLimit`, `defaultPageLimit`).
- `api-docs.ts:23` приведение `as DocumentedZone[]`.
- `body-parser-error.middleware.ts:22-29` `isBodyParserError` пропускает любую ошибку с полями `status` и `type`, надёжнее проверять `error.expose` или префикс `type`.

## Вопросы разработчику

1. `errorResponseSchema` (EPIC-1) требует `requestId` в виде UUID, а `resolveRequestId` (EPIC-3) принимает любой `X-Request-Id`. С собственным заголовком клиента тело ошибки не пройдёт схему.
2. «Try it out» в Swagger UI на служебном порту получит 404 от `ZoneGuard`: нужны `servers` в документе и CORS для localhost (EPIC-16).

## Ручные проверки

- TASK-9: Swagger UI в браузере со строгой CSP (на разработчике).

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-7`.
