# EPIC-13 / TASK-5. `POST /v1/visitor/session`: создание сессии по `publicKey`

Исполнитель: sonnet
Зависит от: TASK-1, TASK-2, TASK-3
Владеет: apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/visitors/visitor-token-claims.ts, apps/server/src/domain/visitors/refresh-token.ts, apps/server/src/domain/visitors/visitors.repository.ts, apps/server/src/domain/visitors/visitor-sessions.repository.ts, apps/server/src/domain/visitors/visitor-sessions.service.ts, apps/server/src/domain/visitors/visitors.module.ts, apps/server/src/api/visitor/visitor-session.dto.ts, apps/server/src/api/visitor/visitor-session.controller.ts, apps/server/src/api/visitor/visitor-api.module.ts, apps/server/src/api.module.ts, apps/server/src/infra/http/api-docs.spec.ts, apps/server/test/support/fixtures.ts, apps/server/test/visitor-session.e2e-spec.ts
Коммит: [SERVER]: create visitor session by public key
Ветка: feature/EPIC-13

## Что сделать

Сайт по `publicKey` проекта получает для анонимного посетителя пару токенов: access-токен (JWT на 1 час) и одноразовый refresh-токен. Опора: `TokensService` (`apps/server/src/infra/tokens/tokens.service.ts`), образец связки домен → контроллер — `OperatorsService` и `OperatorTokenController` (`apps/server/src/domain/operators/`, `apps/server/src/api/server/`).

1. `ProjectsRepository` (`apps/server/src/domain/projects/projects.repository.ts`): метод

   ```ts
   async findByPublicKey(publicKey: string): Promise<Project | null> {
     return this.txHost.tx.getRepository(Project).findOneBy({ publicKey });
   }
   ```

2. `domain/visitors/visitor-token-claims.ts` — по образцу `domain/operators/operator-token-claims.ts`:

   ```ts
   export const visitorTokenClaimsSchema = z.object({ projectId: z.string().min(1) });
   export type VisitorTokenClaims = z.infer<typeof visitorTokenClaimsSchema>;
   ```

3. `domain/visitors/refresh-token.ts`:

   ```ts
   export function generateRefreshToken(): string {
     return randomBytes(32).toString("base64url");
   }
   ```

   Токен — 43 символа base64url. Хеш — `hashKey` из `domain/keys/key-hash.ts` (SHA-256, `Buffer`); своей функции хеша не писать.

4. `domain/visitors/visitors.repository.ts` — `VisitorsRepository` через `TransactionHost<TransactionalAdapterTypeOrm>` (образец `ProjectsRepository`):

   ```ts
   async createAnonymous(projectId: string): Promise<Visitor>
   ```

   `repository.save(repository.create({ projectId }))`: остальные колонки берут значения по умолчанию, `display_code` и `external_id` — NULL.

5. `domain/visitors/visitor-sessions.repository.ts` — `VisitorSessionsRepository` через `TransactionHost`:

   ```ts
   export interface NewVisitorSession {
     visitorId: string;
     familyId: string;
     refreshHash: Buffer;
     expiresAt: Date;
   }

   async create(session: NewVisitorSession): Promise<void>
   ```

   `getRepository(VisitorSession).insert(session)`.

6. `domain/visitors/visitor-sessions.service.ts`:

   ```ts
   export const visitorAccessTokenTtlSeconds = 3600;

   export interface VisitorSessionTokens {
     accessToken: string;
     accessTokenExpiresAt: Date;
     refreshToken: string;
   }
   ```

   `VisitorSessionsService`, зависимости через `@Inject(...)`: `ProjectsRepository`, `VisitorsRepository`, `VisitorSessionsRepository`, `TokensService`, `visitorSessionsConfig.KEY` (`ConfigType<typeof visitorSessionsConfig>`, TASK-3).

   - `@Transactional()` `async create(publicKey: string): Promise<VisitorSessionTokens | undefined>`:
     1. `parseKey(publicKey, "publicKey")` (`domain/keys/key-format.ts`) вернул `undefined` — `return undefined` без запроса к БД;
     2. `findByPublicKey` не нашёл проект — `return undefined`;
     3. `createAnonymous(project.id)`;
     4. `return this.issueTokens(visitor, randomUUID())` — новая цепочка, `randomUUID` из `node:crypto`.
   - `private async issueTokens(visitor: Visitor, familyId: string): Promise<VisitorSessionTokens>` (его же вызовет обновление в TASK-7):
     1. `refreshToken = generateRefreshToken()`;
     2. `sessions.create({ visitorId: visitor.id, familyId, refreshHash: hashKey(refreshToken), expiresAt })`, где `expiresAt = new Date(Date.now() + config.refreshTtlDays * 86_400_000)` — отдельный приватный метод `refreshExpiresAt()`;
     3. `tokens.sign({ audience: "visitor", subject: visitor.id, claims, ttlSeconds: visitorAccessTokenTtlSeconds })`, где `const claims: VisitorTokenClaims = { projectId: visitor.projectId }`;
     4. вернуть `{ accessToken: signed.token, accessTokenExpiresAt: signed.expiresAt, refreshToken }`.

   Открытый refresh-токен не пишется ни в БД, ни в логи.

7. `domain/visitors/visitors.module.ts` — `VisitorsModule`: `imports: [ProjectsModule, TokensModule]`, `providers: [VisitorsRepository, VisitorSessionsRepository, VisitorSessionsService]`, `exports: [VisitorSessionsService]`.

8. `api/visitor/visitor-session.dto.ts` — по образцу `api/server/operator-token.dto.ts`, все три DTO сразу (запрос обновления понадобится TASK-7):

   ```ts
   export class VisitorSessionRequestDto extends createZodDto(visitorSessionRequestSchema) {}
   export class VisitorSessionRefreshRequestDto extends createZodDto(visitorSessionRefreshRequestSchema) {}
   export class VisitorSessionResponseDto extends createZodDto(visitorSessionResponseSchema) {}
   ```

9. `api/visitor/visitor-session.controller.ts` — `VisitorSessionController` без guard посетителя (сессии у посетителя ещё нет):

   ```ts
   @Controller("visitor/session")
   @Zone("public")
   export class VisitorSessionController {
     @Post()
     @ZodResponse({ status: 201, type: VisitorSessionResponseDto })
     async create(@Body() body: VisitorSessionRequestDto): Promise<VisitorSessionResponse>
   }
   ```

   `sessions.create(body.publicKey)` вернул `undefined` — `throw new ApiException({ code: "unauthorized", message: "Public key is invalid" })` (один текст на неверный формат, неизвестный ключ и ключ без проекта). Иначе ответ через функцию модуля `toVisitorSessionResponse(tokens)`: `{ accessToken, accessTokenExpiresAt: tokens.accessTokenExpiresAt.toISOString(), refreshToken }`.

10. `api/visitor/visitor-api.module.ts` — `VisitorApiModule`: `imports: [VisitorsModule]`, `controllers: [VisitorSessionController]`.

11. `apps/server/src/api.module.ts`: `VisitorApiModule` в `imports` сразу после `ServerApiModule`.

12. `apps/server/src/infra/http/api-docs.spec.ts`: случай «JSON публичной зоны содержит только /v1/visitor/docs-probe» сейчас сравнивает список путей целиком (`toEqual`) и сломается от `/v1/visitor/session`. Заменить на `toContain("/v1/visitor/docs-probe")`, `toContain("/v1/visitor/session")`, `not.toContain("/v1/operator/docs-probe")` и `not.toContain("/v1/server/docs-probe")`, название — «JSON публичной зоны содержит пути visitor и не содержит других зон».

13. `apps/server/test/support/fixtures.ts`: в `ProjectFixture` поле `publicKey?: string`, передаётся в `repository.create`.

## Где

- `apps/server/src/domain/projects/projects.repository.ts`.
- `apps/server/src/domain/visitors/` — новые файлы `visitor-token-claims.ts`, `refresh-token.ts`, `visitors.repository.ts`, `visitor-sessions.repository.ts`, `visitor-sessions.service.ts`, `visitors.module.ts`.
- `apps/server/src/api/visitor/` — новая папка: `visitor-session.dto.ts`, `visitor-session.controller.ts`, `visitor-api.module.ts`.
- `apps/server/src/api.module.ts` — общий файл.
- `apps/server/src/infra/http/api-docs.spec.ts`, `apps/server/test/support/fixtures.ts`.
- Тест: `apps/server/test/visitor-session.e2e-spec.ts` (e2e, `useTestDatabase()` и `startZoneE2eApp()` из `test/support/zone-e2e-app.ts`, запросы `supertest` на порт `public`; ключ проекта — `generateKey("publicKey")` из `src/domain/keys/key-format.ts` и `createProject(dataSource, { publicKey })`; не длиннее 300 строк).

## Требования из плана

| Кто | Чем авторизуется | Где хранится секрет | Что может |
|---|---|---|---|
| Сайт (браузер) | publicKey `pk_…` | не секрет, виден всем | только создать сессию посетителя; защищён allowed origins и rate limit |
| Посетитель | токен посетителя (короткий access + refresh) | localStorage браузера | только свои диалоги |

- `POST /v1/visitor/session` — публичная зона, `publicKey` → токен посетителя.
- Access-токен — JWT на 1 час, `aud` `visitor`; claims: `sub` — ID посетителя, `projectId` — ID проекта.
- Refresh-токен — 32 случайных байта; у нас только SHA-256. Срок — `SOWA_VISITOR_REFRESH_TTL_DAYS` (по умолчанию 30 дней).
- Контрольная сумма ключа отсекает опечатки до запроса к БД.

## Документация

- https://docs.nestjs.com/controllers
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional

## Критерии приёмки

- Верный `publicKey` — 201, тело проходит `visitorSessionResponseSchema`; `TokensService.verify(accessToken, "visitor")` даёт `subject` — ID новой строки `visitors` этого проекта (`display_code` NULL) и claim `projectId` — ID проекта; `exp - iat` = 3600; `accessTokenExpiresAt` совпадает с `exp`.
- В `visitor_sessions` одна строка посетителя: `refresh_hash` равен SHA-256 выданного `refreshToken`, ни одна колонка не содержит открытый токен, `used_at` и `revoked_at` NULL, `expires_at` — через 30 дней (допуск — минута); `refreshToken` — 43 символа base64url.
- Неверный формат ключа, ключ с неверной контрольной суммой, верный по формату, но неизвестный `pk_`, ключ `sk_` — 401 `unauthorized` `Public key is invalid`, строк в `visitors` и `visitor_sessions` не прибавилось. Тело без `publicKey` — 400 `validationFailed`.
- Тот же путь на портах `operator` и `internal` — 404. Unit `api-docs.spec.ts` проходит.

## Чего не делать

- Не делать обновление токена — это TASK-7; guard посетителя — TASK-6.
- Не делать лимиты по IP и проверку origin — это эпик лимитов (EPIC-16).
- Не выдавать номер гостя (`display_code`) — это EPIC-22.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
