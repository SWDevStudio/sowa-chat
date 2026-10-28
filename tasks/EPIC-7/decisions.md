# EPIC-7. Решения

## 28.10.2026, разбивка эпика

- Было 7 задач, стало 9. Предложение по разбивке давало 11. Фильтр ошибок разделён на две задачи: TASK-3 (тело ответа, таблица статусов, `requestId`) и TASK-4 (исключение с кодом и запись 500 в лог). Предложенные отдельно «исключение с кодом» и «500 без стека» объединены в TASK-4: обе правят один фильтр. `helmet` и `no-store` — одна задача TASK-6: это две строки в одном файле. Лимит тела и схема `limit` разделены (TASK-7 и TASK-2): у них нет общих файлов.
- Заголовки (TASK-6) идут раньше лимита тела (TASK-7): `useSecurityHeaders` стоит перед `useBodyLimit`, чтобы заголовки были и у ответа 413.
- Все задачи с кодом — на haiku: решения записаны в задачах. Тесты на opus — TASK-4 (утечка стека и текста ошибки) и TASK-5 (утечка лишних полей ответа), 2 из 8.
- Ревью: opus. Предложение ставило sonnet. В эпике защита от утечек через ошибки и ответы, заголовки безопасности и публичная схема в `protocol`. Правило ставит opus эпикам с безопасностью и публичным контрактом.

## 28.10.2026, TASK-1–8. Код в `apps/server/src/infra/http/`

- Pipe, фильтр и interceptor — провайдеры `APP_PIPE`, `APP_FILTER`, `APP_INTERCEPTOR` в `ApiHttpModule`, который подключён в `ApiModule`. Они действуют и в тестовых приложениях `createProbeApp`: тестам логов это не мешает, они проверяют только статусы.
- Express-middleware (заголовки, лимит тела, Swagger UI) — функции `useSecurityHeaders`, `useBodyLimit`, `setupApiDocs`, их вызывает `configureApiApp`. Порядок: `useClsMiddleware`, `useSecurityHeaders`, `useBodyLimit`, логгер, версии, guard, `setupApiDocs`.
- Внутренние имена сервера, в публичный API не входят: `ApiHttpModule`, `HttpErrorFilter`, `errorCodeOfStatus`, `toErrorResponse`, `internalErrorMessage`, `ApiException`, `errorCodeStatuses`, `useSecurityHeaders`, `useBodyLimit`, `bodyLimit`, `setupApiDocs`.

## 28.10.2026, TASK-2. Публичные имена `pageQuerySchema` и `PageQuery`

План задаёт правило `limit`, но не имя схемы. Имена в стиле `protocol`: схемы — camelCase с суффиксом `Schema` (`errorResponseSchema`, `eventEnvelopeSchema`), тип — PascalCase от `z.infer`. Одна схема на все списки, курсоры добавляются через `.extend()`. Входной тип `limit` — `number` (`z.coerce.number<number>()`), чтобы SDK видели число, а не `unknown`.

## 28.10.2026, TASK-3. `requestId` из заголовка ответа

Фильтр берёт `requestId` из заголовка `X-Request-Id`, который `ClsMiddleware` ставит на каждый ответ первым делом, а не из `ClsService.getId()`. Ошибки `body-parser` (битый JSON, 413) возникают в обратных вызовах потока запроса, и контекст AsyncLocalStorage там может потеряться. Значение то же, что в логах.

Расхождение контрактов, на разработчике: `errorResponseSchema` (EPIC-1) требует `requestId` в формате UUID, а `resolveRequestId` (EPIC-3) принимает от клиента любой `X-Request-Id` по шаблону `[A-Za-z0-9._-]{1,128}`. С таким заголовком тело ошибки не пройдёт `errorResponseSchema` (например, в SDK с `debug: true`). Эпик схему не меняет: это согласованный контракт `protocol`. Варианты: ослабить схему до строки по тому же шаблону или принимать от клиента только UUID.

## 28.10.2026, TASK-3, TASK-4. Статусы и коды

- Статус не из таблицы: 500 и выше — `internalError`, остальные 4xx — `validationFailed` с исходным статусом.
- `HttpException` с 5xx (например, 503) сохраняет свой статус, но `message` — общий `Internal server error`, текст исключения только в логе.
- `errorCodeStatuses.contextInvalid = 400`: HTTP-ответом этот код не приходит, значение нужно для полной таблицы `Record<ErrorCode, number>`.
- `ApiException` принимает один объект `{ code, message, details? }` по правилу CLAUDE.md о методах, похожих на сообщение.
- Ошибки не HTTP-контекста фильтр бросает дальше; как совмещать с сокетами, решит эпик WebSocket.

## 28.10.2026, TASK-4. Тело 500 одинаковое в обоих режимах

План требует убрать стек в production, а в development разрешает, но не требует. Стек и текст исходной ошибки не попадают в ответ ни в одном режиме: фильтру не нужна проверка режима, и ошибка в `SOWA_ENV` ничего не раскроет. Стек есть в логе.

## 28.10.2026, TASK-6. `no-store` на всех ответах

`Cache-Control: no-store` ставится на все ответы, а не только на `/v1`. Почти все ответы API содержат персональные данные, а служебным маршрутам и Swagger UI кэш не нужен. Префикс не придётся дополнять при появлении `/v2`.

## 28.10.2026, TASK-7. Лимит тела

- `useBodyParser` для `json` и `urlencoded` с `limit: "64kb"`, чтобы обходного парсера со старым лимитом 100 КБ не осталось.
- Ошибки `body-parser` переводятся в `HttpException` со своим статусом отдельным Express-обработчиком ошибок. Без него Nest передал бы их фильтру как неизвестную ошибку, и 413 стал бы 500.
- `configureApiApp` принимает `NestExpressApplication`: `useBodyParser` есть только у него.

## 28.10.2026, TASK-8. Документы OpenAPI по префиксам путей

- Документ зоны отбирается по префиксам путей из раздела 12 плана: `public` — `/v1/visitor`, `operator` — `/v1/operator`, `internal` — `/v1/server` и `/v1/bot`. `SwaggerModule.createDocument` отбирает только по модулям (`include`), а контроллеры зон не разложены по отдельным модулям.
- Swagger UI закрыт на всех портах, кроме служебного, middleware `onlyOnManagementPort` (по решению EPIC-4 TASK-4: маршруты мимо контроллеров эпик ограничивает сам).
- JSON документа — путь Nest по умолчанию `/docs/<зона>-json`.
- Для TASK-9: «Try it out» в Swagger UI на служебном порту отправит запрос на тот же порт, и `ZoneGuard` ответит 404. Чтобы запросы шли на порт зоны, нужен `servers` в документе и CORS для `localhost` (EPIC-16). Это решается вместе с проверкой CSP в браузере.

## 28.10.2026, пересечение с параллельным EPIC-5

EPIC-5 меняет те же файлы. При слиянии эпиков в `pipeline`:
- `apps/server/src/api.module.ts`: в `imports` остаются и `DatabaseModule.forRoot(databaseEntities)` (EPIC-5 TASK-3), и `ApiHttpModule` (TASK-1).
- `apps/server/test/support/zone-probe.ts`: EPIC-5 оборачивает `startZoneProbeApp` в `withOfflineDatabase`; EPIC-7 добавляет параметр `env` (TASK-4) и `createNestApplication<NestExpressApplication>` (TASK-7). Нужны все три правки.
- `apps/server/src/main.ts`: EPIC-7 меняет только `runApi` (TASK-7), EPIC-5 — только `runMigrate`.
- `apps/server/test/support/e2e-app.ts` (EPIC-5 TASK-8): если `createE2eApp` будет вызывать `configureApiApp`, приложение нужно создавать как `NestExpressApplication`.
- `apps/server/test/support/unit-probe.ts` EPIC-7 не меняет.

## 28.10.2026, TASK-7. Вопрос исполнителя: `max-params` и тип приложения в `zone-servers.spec.ts`

- Express-обработчик ошибок `body-parser` с четырьмя параметрами вынесен в `apps/server/src/infra/http/body-parser-error.middleware.ts`. Для `*.middleware.ts` в `.oxlintrc.json` уже есть override `max-params: 5`, так что конфиг не меняется и правило не отключается комментарием.
- `configureApiApp` остаётся с `NestExpressApplication`. В `zone-servers.spec.ts` приложение создаётся через `createNestApplication<NestExpressApplication>`. Ослабить сигнатуру до `INestApplication` и привести тип через `as` хуже: компилятор перестал бы ловить вызов с не-Express-приложением. Файл добавлен во «Владеет» TASK-7, другие задачи эпика его не владеют.
