# EPIC-13 / TASK-7. `POST /v1/visitor/session/refresh`: обновление токена и отзыв цепочки при повторе

Исполнитель: sonnet
Зависит от: TASK-5
Владеет: apps/server/src/domain/visitors/visitor-sessions.service.ts, apps/server/src/domain/visitors/visitor-sessions.repository.ts, apps/server/src/domain/visitors/visitors.repository.ts, apps/server/src/api/visitor/visitor-session.controller.ts, apps/server/test/visitor-session-refresh.e2e-spec.ts, apps/server/test/visitor-session-refresh-race.e2e-spec.ts
Коммит: [SERVER]: rotate visitor refresh tokens and revoke reused chains
Ветка: feature/EPIC-13

## Что сделать

Посетитель меняет refresh-токен на новую пару токенов. Каждый refresh-токен одноразовый; повтор уже использованного — признак кражи, и вся цепочка (`family_id`) отзывается. Опора: `VisitorSessionsService.issueTokens`, репозитории и контроллер из TASK-5; транзакции — `@Transactional()` из `@nestjs-cls/transactional` (EPIC-5, образец — `apps/server/test/transactions.e2e-spec.ts`, `apps/server/src/domain/projects/projects.service.ts`).

1. `VisitorSessionsRepository` — три метода через `this.txHost.tx`:

   ```ts
   async findByRefreshHashForUpdate(refreshHash: Buffer): Promise<VisitorSession | null>
   async markUsed(sessionId: string): Promise<void>
   async revokeFamily(familyId: string): Promise<void>
   ```

   - `findByRefreshHashForUpdate` — `getRepository(VisitorSession).findOne({ where: { refreshHash }, lock: { mode: "pessimistic_write" } })`, то есть `SELECT … FOR UPDATE`. Без связей (`relations` не указывать): `FOR UPDATE` не применяется к nullable-стороне внешнего соединения.
   - `markUsed` — `update({ id: sessionId }, { usedAt: () => "now()" })`.
   - `revokeFamily` — `update({ familyId, revokedAt: IsNull() }, { revokedAt: () => "now()" })`.

2. `VisitorsRepository`: `async findByIdOrFail(visitorId: string): Promise<Visitor>` — `findOneByOrFail({ id: visitorId })`. Посетитель с сессией есть всегда: удаление посетителя каскадом удаляет сессии.

3. `VisitorSessionsService`: `@Transactional()` `async refresh(refreshToken: string): Promise<VisitorSessionTokens | undefined>`. Отказ — значение `undefined`, а не исключение: исключение внутри `@Transactional()` откатило бы отзыв цепочки, а отзыв должен сохраниться. Шаги:
   1. `session = findByRefreshHashForUpdate(hashKey(refreshToken))`; нет строки — `undefined`;
   2. `session.revokedAt !== null` — `undefined`;
   3. `session.usedAt !== null` — `revokeFamily(session.familyId)`, затем `undefined`;
   4. `session.expiresAt <= new Date()` — `undefined`;
   5. `markUsed(session.id)`; `visitor = findByIdOrFail(session.visitorId)`; `return this.issueTokens(visitor, session.familyId)` — новая строка с тем же `family_id` и полным сроком `SOWA_VISITOR_REFRESH_TTL_DAYS` от текущего момента.

   Порядок проверок именно такой: отозванный токен не отзывает цепочку повторно; использованный отзывает её, даже если истёк.

   Два одновременных обмена одного токена: второй ждёт блокировку строки, после коммита первого PostgreSQL (READ COMMITTED) отдаёт ему уже обновлённую строку с `used_at`, и второй обмен идёт по шагу 3 — отзывает цепочку вместе с только что выданным токеном. Итог: один 200, один 401, цепочка отозвана.

4. `VisitorSessionController`: метод

   ```ts
   @Post("refresh")
   @HttpCode(200)
   @ZodResponse({ status: 200, type: VisitorSessionResponseDto })
   async refresh(@Body() body: VisitorSessionRefreshRequestDto): Promise<VisitorSessionResponse>
   ```

   `undefined` из сервиса — `throw new ApiException({ code: "unauthorized", message: "Refresh token is invalid" })` уже после выхода из транзакции сервиса (контроллер не транзакционный). Один текст на все причины отказа. Ответ — через `toVisitorSessionResponse`.

## Где

- `apps/server/src/domain/visitors/visitor-sessions.service.ts`, `visitor-sessions.repository.ts`, `visitors.repository.ts`.
- `apps/server/src/api/visitor/visitor-session.controller.ts`.
- Тесты (e2e, `useTestDatabase()`, `startZoneE2eApp()`, порт `public`, каждый файл не длиннее 300 строк):
  - `apps/server/test/visitor-session-refresh.e2e-spec.ts` — обмен, повтор, отозванный и истёкший токен, валидация тела;
  - `apps/server/test/visitor-session-refresh-race.e2e-spec.ts` — параллельные обмены.
  Истёкший токен готовится правкой `expires_at` в БД (`UPDATE visitor_sessions SET expires_at = now() - interval '1 minute'`).

## Требования из плана

- При каждом обновлении выдаётся новый refresh-токен; повторное предъявление уже использованного означает кражу, и вся цепочка сессии отзывается.
- Если сессию отозвали или браузер очистили, у анонима история пропадает.
- Обмен — одна транзакция под блокировкой строки сессии.
- Refresh-токены хранятся только хешем SHA-256.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://typeorm.io/docs/working-with-entity-manager/find-options (`lock`)
- https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE

## Критерии приёмки

- Обмен — 200, тело проходит `visitorSessionResponseSchema`, новый `refreshToken` отличается от старого; новый access-токен проверяется с тем же `sub` и `projectId`; у старой строки `used_at` не NULL, новая строка с тем же `family_id`; новый refresh снова обменивается.
- Повтор старого refresh — 401 `unauthorized` `Refresh token is invalid`, после него последний выданный refresh этой цепочки тоже 401, у всех строк цепочки `revoked_at` не NULL; строки другой цепочки того же проекта не тронуты.
- Неизвестный, отозванный и истёкший refresh — 401 без изменений в `visitor_sessions`; тело без `refreshToken` — 400 `validationFailed`.
- Два параллельных обмена одного токена (`Promise.all`, 5 повторов с новыми сессиями): каждый раз ровно один 200 и один 401, цепочка отозвана, refresh из ответа 200 — 401.

## Чего не делать

- Не удалять истёкшие и отозванные строки — это эпик сроков хранения (EPIC-33).
- Не проверять отзыв в guard посетителя: access-токен живёт до своего срока.
- Не менять `protocol` и DTO: схемы и `VisitorSessionRefreshRequestDto` уже есть (TASK-2, TASK-5).

## История доработок

—
