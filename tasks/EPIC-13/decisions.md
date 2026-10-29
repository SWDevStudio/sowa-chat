# EPIC-13. Решения

## 29.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 3, стало 7: таблица `visitor_sessions` (1), схемы `protocol` (2), переменная срока refresh-токена (3), посетитель в `RequestContext` (4), создание сессии (5), guard посетителя (6), обновление токена (7). Основа — предложение `tasks/planning/split-EPIC-4-14.md`, проверенное по коду; конфиг и контекст запроса вынесены в отдельные задачи, потому что их не было в черновике и они не связаны друг с другом.
- Волны: 1, 2, 3, 4 сразу (файлы не пересекаются); после 1, 2, 3 — 5; после 5 — 6 и 7 параллельно (у них нет общих файлов: 6 — guard, модуль, декоратор и `zone-e2e-app.ts`, 7 — сервис, репозитории и контроллер сессии).
- Общие файлы и владельцы: `database-entities.ts` и `database-migrations.ts` — 1; `packages/protocol/src/index.ts` — 2; `env.schema.ts`, `config.module.ts`, `.env.test`, `.env.example` — 3; `request-context.ts` — 4; `projects.repository.ts`, `api.module.ts`, `api-docs.spec.ts`, `test/support/fixtures.ts` — 5; `test/support/zone-e2e-app.ts` — 6; `visitor-sessions.service.ts`, `visitor-sessions.repository.ts`, `visitors.repository.ts`, `visitor-session.controller.ts` — 5, затем 7.
- Исполнители: haiku — 1, 2, 3, 4, 6; sonnet — 5, 7. Guard (6) на haiku: есть точный образец guard оператора, все решения записаны.
- Тесты opus — 2 (публичный контракт `protocol`), 5 (выпуск токенов, хранение refresh только хешем), 6 (доступ по токену посетителя), 7 (одноразовый refresh, гонка, отзыв цепочки): 4 из 7, больше четверти. Эпик целиком про токены доступа: все четыре задачи попадают в категории opus, а остальные три (таблица, конфиг, контекст) — на sonnet.
- Сложность «простая» — 3 и 4: правка по готовому образцу (`SOWA_SLOW_OPERATION_MS`, `setOperator`), критерии целиком в unit-тестах. Остальные обычные: e2e, безопасность или контракт.
- Ревью: opus — токены посетителя, одноразовый refresh и гонка при обмене.
- Нужны эпики: 9 (`projects.public_key`, формат и `parseKey` для `pk_`, `hashKey`), 12 (`TokensService`, `RequestContext`, `bearerToken`, образец guard, `startZoneE2eApp`), 15 (`OperationSteps` для шага `auth`), 19 (`visitors` и сущность `Visitor`).

## 29.10.2026, TASK-1. Таблица `visitor_sessions`

- По решению EPIC-19 («связь с EPIC-13») `visitors` и `Visitor` уже созданы в EPIC-19; черновик TASK-1 сокращён до `visitor_sessions` со ссылкой на `Visitor` из `domain/visitors/visitor.entity.js`.
- Миграция `1793300004000-CreateVisitorSessions.ts`: в `database-migrations.ts` уже две миграции с меткой `1793300003000` (`CreateOperators`, `AddProjectsOperatorAllowedOrigins`), новая метка больше обеих.
- Ограничения вручную с явными именами, как в EPIC-8, 9, 12, 19: `PK_visitor_sessions`, `FK_visitor_sessions_visitor_id` (`ON DELETE CASCADE`), `UQ_visitor_sessions_refresh_hash`, `IDX_visitor_sessions_family_id`.
- Добавлен индекс `IDX_visitor_sessions_visitor_id`: план его не называет, но каскадное удаление посетителя (удаление по запросу EPIC-32, сроки хранения EPIC-33) без него просматривало бы всю таблицу сессий.
- `created_at` и `updated_at` нет: колонки строго по PLAN.md, раздел 11.
- `apps/server/test/chat-tables.e2e-spec.ts` новая таблица не ломает: он фильтрует внешние ключи по таблицам чата как источнику.

## 29.10.2026, TASK-2. Публичные имена `protocol`

PLAN.md закрепляет только путь `POST /v1/visitor/session` и «publicKey → токен посетителя». Имена выбраны по разделу «Дизайн публичного API» CLAUDE.md и по образцу `operatorTokenRequestSchema` / `operatorTokenResponseSchema` (EPIC-12):

- `visitorSessionRequestSchema` / `VisitorSessionRequest`: `{ publicKey }`.
- `visitorSessionRefreshRequestSchema` / `VisitorSessionRefreshRequest`: `{ refreshToken }`.
- `visitorSessionResponseSchema` / `VisitorSessionResponse`: `{ accessToken, accessTokenExpiresAt, refreshToken }` — общий ответ создания и обновления; `accessTokenExpiresAt` — строка ISO 8601 (`z.iso.datetime()`), как `expiresAt` у токена оператора. Поля из черновика эпика.
- Ограничения: `publicKey` и `refreshToken` — строка от 1 до 128 символов без `trim` (`pk_` — 53 символа, refresh — 43). Формат `pk_` проверяет сервер через `parseKey`: правило формата ключей живёт в одном месте (`domain/keys/key-format.ts`).
- Путь обновления `POST /v1/visitor/session/refresh` — из черновика эпика; PLAN.md путь не закрепляет. Код ответа: создание — 201 (создаётся сессия), обновление — 200 (как выдача токена оператора).

## 29.10.2026, TASK-3. Переменная срока refresh-токена

- Имя `SOWA_VISITOR_REFRESH_TTL_DAYS` — из черновика эпика; PLAN.md его не закрепляет. Префикс `SOWA_`, UPPER_SNAKE, единица в имени — как `SOWA_SLOW_OPERATION_MS`.
- Целое от 1 до 365, по умолчанию 30. Верхняя граница нужна `integerInRange`; год — разумный предел для анонимной сессии.
- Конфиг `visitorSessionsConfig` (пространство `visitorSessions`, поле `refreshTtlDays`), файл `infra/config/visitor-sessions.config.ts`.

## 29.10.2026, TASK-4. Посетитель в `RequestContext`

- `RequestVisitor { visitorId }`, `setVisitor(visitor)`, `visitor()`, ключ CLS `requestVisitor`, текст ошибки `Request visitor is not set` — по образцу `RequestOperator` / `setOperator` / `operator()` (EPIC-12). Объект, а не строка: так же, как у оператора, и поля посетителя можно добавлять без смены сигнатуры.

## 29.10.2026, TASK-5, TASK-6. Токены и guard посетителя

- Access-токен: `TokensService.sign({ audience: "visitor", subject: visitor.id, claims: { projectId }, ttlSeconds: 3600 })`; `sub` — ID посетителя, claim `projectId` (camelCase), как у токена оператора. Константа `visitorAccessTokenTtlSeconds = 3600`.
- Refresh-токен — `randomBytes(32).toString("base64url")` (43 символа), в БД только `hashKey(token)` из `domain/keys/key-hash.ts` (SHA-256): своя функция хеша не пишется. Префикса у refresh-токена нет: план задаёт префиксы только ключам `pk_`, `sk_`, `bk_`, `whsec_`.
- Новая сессия — новая цепочка: `family_id = randomUUID()`.
- Неверный `publicKey` — `parseKey` отсекает формат и контрольную сумму до запроса к БД; один ответ 401 `unauthorized` `Public key is invalid` на все причины.
- Создание посетителя и строки сессии — одна транзакция `@Transactional()` в `VisitorSessionsService.create`.
- Guard посетителя: 401 одним текстом `Visitor token is missing or invalid`; claims проверяет `visitorTokenClaimsSchema` (zod); проверка токена внутри `OperationSteps.measure("auth", …)`. Отзыв сессии guard не проверяет: JWT проверяются по подписи без БД (PLAN.md «Не храним токены посетителей и операторов»), access-токен отозванной цепочки живёт до своего часа.
- `VisitorAuthModule` — **без** `@Global()`: ревью EPIC-12 (`tasks/EPIC-12/report.md`) указало, что глобальные модули доступа открывают всему api-слою `TokensService.sign` и противоречат решению EPIC-9 «модули подключают потребители». Модуль контроллеров с `@VisitorController` импортирует `VisitorAuthModule` сам; в `api.module.ts` он не подключается, потому что контроллеров с guard в эпике нет. `ServerAuthModule` и `OperatorAuthModule` остаются глобальными — их перевод не входит в эпик.
- Для e2e с guard `startZoneE2eApp` получает второй необязательный параметр `imports`: тестовый контроллер в корневом модуле видит зависимости guard только через импортированный `VisitorAuthModule`.
- Контроллер создания и обновления — `VisitorSessionController` с `@Controller("visitor/session")` и `@Zone("public")`, без guard посетителя.
- `api-docs.spec.ts` сравнивал пути публичной зоны целиком и сломался бы от `/v1/visitor/session`: проверка переведена на `toContain` / `not.toContain` в TASK-5.
- Внутренние имена: `visitorTokenClaimsSchema`, `VisitorTokenClaims`, `generateRefreshToken`, `VisitorsRepository` (`createAnonymous`, `findByIdOrFail`), `VisitorSessionsRepository` (`create`, `findByRefreshHashForUpdate`, `markUsed`, `revokeFamily`), `NewVisitorSession`, `VisitorSessionsService` (`create`, `refresh`), `VisitorSessionTokens`, `visitorAccessTokenTtlSeconds`, `VisitorsModule`, `VisitorSessionRequestDto`, `VisitorSessionRefreshRequestDto`, `VisitorSessionResponseDto`, `VisitorSessionController`, `VisitorApiModule`, `VisitorAuthGuard`, `VisitorController`, `VisitorAuthModule`, `ProjectsRepository.findByPublicKey`.

## 29.10.2026, TASK-7. Обновление и отзыв цепочки

- Обмен — `@Transactional()` в `VisitorSessionsService.refresh`, строка сессии блокируется `SELECT … FOR UPDATE` (`findOne` с `lock: { mode: "pessimistic_write" }`, метод `findByRefreshHashForUpdate`). Второй параллельный обмен ждёт блокировку и после коммита первого видит `used_at` (READ COMMITTED), поэтому считается повтором.
- Отзыв цепочки должен сохраниться и при ответе 401. Исключение внутри `@Transactional()` откатило бы `revokeFamily`, поэтому сервис возвращает `undefined` вместо исключения, транзакция коммитится, а 401 `Refresh token is invalid` бросает контроллер уже после неё.
- Порядок проверок: нет строки → отказ; `revoked_at` → отказ без изменений; `used_at` → отзыв цепочки и отказ (даже если токен истёк); истёк → отказ; иначе `used_at = now()` и новая строка той же цепочки.
- Новая строка получает полный срок `SOWA_VISITOR_REFRESH_TTL_DAYS` от момента обмена (скользящий срок): анонимная история живёт, пока посетитель заходит.
- Отзыв — `revoked_at = now()` у всех строк цепочки, где он ещё NULL; строки не удаляются (удаление — EPIC-33).
