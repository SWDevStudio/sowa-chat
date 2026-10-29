# Отчёт по EPIC-12. Доступ бекенда и операторов

## Задачи

| № | Задача | Исполнитель | Тесты | Доработки |
|---|---|---|---|---|
| 1 | Переменные `SOWA_TOKEN_SIGNING_KEYS`, `SOWA_TOKEN_SIGNING_KEY_ID` и конфиг | haiku | sonnet | нет |
| 2 | Схемы `operatorRoles`, запрос и ответ токена оператора в `protocol` | haiku | sonnet | нет |
| 3 | Ключ подписи обязателен в production | haiku | sonnet | нет |
| 4 | `TokensService`: подпись и проверка JWT (EdDSA, `kid`, ротация) | sonnet | opus | спек на 318 строк превышал лимит 300: тестировщик разделил на два файла |
| 5 | Таблица `operators`, сущность и миграция | haiku | sonnet | запрос к `pg_constraint` в тесте не учитывал `contype = 'n'` (PostgreSQL 18): тестировщик исправил тест; приёмка: `prettier` на импорте сущности |
| 6 | `RequestContext` | haiku | sonnet | нет |
| 7 | `ServerKeyGuard`, `ServerController`, `ServerAuthModule` | sonnet | opus | нет |
| 8 | `OperatorsRepository`, `OperatorsService`, выдача токена оператора | haiku | sonnet | нет |
| 9 | `POST /v1/server/operator-token` | haiku | sonnet | нет |
| 10 | `OperatorAuthGuard`, `OperatorController`, `OperatorAuthModule` | sonnet | opus | нет |
| 11 | `OperatorRoleGuard`, `@SupervisorOnly()` | haiku | sonnet | нет |
| 12 | Список блокировок `DisabledOperators` | sonnet | sonnet | подмена `OperatorsRepository` в `withOfflineDatabase` не срабатывала после `vi.resetModules()` и роняла 22 файла unit-тестов: тестировщик заменил её заглушкой DataSource (`manager.getRepository`); в тестах эпика 15 `env.schema.slow-operations.spec.ts` добавлен ключ подписи |

План эпика переписан планировщиком по результатам проверки черновиков: вместо четырёх задач сделаны двенадцать. Регистрацию ключа подписи для development планировщик убрал из эпика: до EPIC-11 без переменных сервис в development стартует, `TokensService.sign` бросает `SOWA_TOKEN_SIGNING_KEYS is not set`, а `verify` возвращает `undefined`. Решения и внутренние имена: [decisions.md](decisions.md).

## Задача review

Правки по замечаниям «стоит поправить» (sonnet):

- `OperatorDisabledError` переводится 403 в отдельном фильтре `OperatorDisabledFilter`, а не в try/catch контроллера.
- В `upsert` таблицы `operators` поля перечислены явно, без spread тела запроса.
- Claims токена оператора описаны одной схемой `operatorTokenClaimsSchema` для подписи и проверки.
- `OperatorsRepository` убран из `exports` модуля.

## Итоговый прогон

Первый прогон упал на e2e: в копии эпика не было собранного `packages/protocol/dist` (его собирали только в worktree задач). После `pnpm --filter @sowa-chat/protocol build` прогон прошёл (PASS). После правок ревью первый повторный прогон упал в unit-тесте `zone.guard.spec.ts` (`EADDRINUSE`: случайно выбранные порты зон совпали с портами параллельного e2e, известный флак `zone-probe`), второй повторный прогон без параллельных нагрузок прошёл (PASS).

## Ревью (opus)

Блокирующих замечаний нет. Проверены: подмена `alg`, claims и срок, одинаковый 401 на все причины отказа, `projectId` из ключа или токена, секреты в ошибках конфига, порядок guards. Исправлены пункты 2–5. Остались:

- **Модули доступа глобальные.** `ServerAuthModule` и `OperatorAuthModule` помечены `@Global()` и реэкспортируют `TokensModule`, `OperatorsModule`, `KeysModule`: всему api-слою доступны `ApiKeysService.issue/revoke`, `TokensService.sign`, `OperatorsService.issueToken`. Это противоречит решению EPIC-9 «модули ключей подключают потребители» и правилу `arch-module-sharing`. Предложение: убрать `@Global()` и импортировать модули доступа явно в модулях контроллеров; не сделано, потому что решение записано в `decisions.md` и от него зависят тестовые контроллеры.
- `operators.service.ts`: `upsert` идёт раньше проверки `disabledAt`, профиль заблокированного оператора перезаписывается, и только потом выдаётся 403.
- `operators.repository.ts`: `upsert` и `findOneByOrFail` без транзакции (два запроса).
- `env.schema.ts`: лямбда `value === "" ? undefined : value` повторяется трижды; `checkTokenSigningKeysInProduction` почти копирует `checkEncryptionKeysInProduction`; во вложенных `if` в `checkTokenSigningKeyId`.
- Guards в `providers` и `exports` модулей доступа: `@UseGuards(Class)` создаёт свой экземпляр в модуле контроллера, экспорт не нужен.
- `operatorTokenClaimsSchema.projectId`: `z.string().min(1)`, точнее `z.uuid()`.
- К сведению: `ApiKeysService.verify` пишет `touchLastUsedAt` на каждый запрос `/v1/server`; кэш на 60 секунд и синхронизация `DisabledOperators` через Redis запланированы в EPIC-14.

Дополнительно для разработчика: ключ в query-параметре попадает в лог `request completed` (поля `url` и `query`) открытым текстом, маскируется только заголовок `authorization`; маскировку query нужно добавить в логирование (найдено тестировщиком задачи 7).

## Для следующих эпиков

- EPIC-11 TASK-1 должен сам зарегистрировать `SOWA_TOKEN_SIGNING_KEYS` и `SOWA_TOKEN_SIGNING_KEY_ID` в development (пара Ed25519, `kid` `dev-1`): в черновике EPIC-11 написано, что их регистрирует эпик 12.
- В тестах `withOfflineDatabase` отдаёт заглушку DataSource с `manager.getRepository`; новые репозитории, которые читают БД при старте, должны это учитывать.

## Ручные проверки

Нет.

## Журнал коммитов

См. `git log --oneline pipeline..feature/EPIC-12`.
