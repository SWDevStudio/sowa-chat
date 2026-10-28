# EPIC-12 / TASK-8. Операторы: создание или обновление по externalId и выпуск токена

Исполнитель: haiku
Зависит от: TASK-4, TASK-5
Владеет: apps/server/src/domain/operators/operators.repository.ts, apps/server/src/domain/operators/operators.service.ts, apps/server/src/domain/operators/operators.module.ts, apps/server/src/domain/operators/operators.service.spec.ts, apps/server/test/operators.e2e-spec.ts
Коммит: [SERVER]: upsert operators and issue operator tokens
Ветка: feature/EPIC-12

## Что сделать

Доменная логика выдачи токена оператора: бекенд админки присылает профиль оператора, мы создаём или обновляем строку `operators` (TASK-5, `apps/server/src/domain/operators/operator.entity.ts`) и подписываем JWT сервисом токенов (TASK-4, `apps/server/src/infra/tokens/tokens.service.ts`). HTTP здесь нет: контроллер делает TASK-9.

1. `operators.repository.ts` — `OperatorsRepository`, только через `TransactionHost` (образец — `apps/server/src/domain/keys/api-keys.repository.ts`):

   ```ts
   export interface OperatorProfile {
     projectId: string;
     externalId: string;
     name: string;
     avatarUrl: string | null;
     role: OperatorRole;
   }
   ```

   - `async upsert(profile: OperatorProfile): Promise<Operator>`:
     1. `await this.txHost.tx.getRepository(Operator).upsert(profile, { conflictPaths: ["projectId", "externalId"] })` — один запрос `INSERT … ON CONFLICT ("project_id", "external_id") DO UPDATE`: два одновременных запроса одного оператора не создают двух строк и не падают на уникальности;
     2. `return repository.findOneByOrFail({ projectId: profile.projectId, externalId: profile.externalId })`.
     `maxChats` и `disabledAt` не передаются и при обновлении не меняются.
   - `async findDisabledIds(): Promise<string[]>` — ID всех операторов с `disabled_at IS NOT NULL` во всех проектах: `find({ select: { id: true }, where: { disabledAt: Not(IsNull()) } })` и `map` по `id`. Им пользуется список блокировок (TASK-12).

2. `operators.service.ts`:

   ```ts
   export const operatorTokenTtlSeconds = 900;

   export interface IssueOperatorTokenInput {
     projectId: string;
     externalId: string;
     name: string;
     avatarUrl?: string;
     role: OperatorRole;
   }

   export interface IssuedOperatorToken {
     token: string;
     expiresAt: Date;
   }

   export class OperatorDisabledError extends Error {
     constructor() {
       super("Operator is disabled");
     }
   }
   ```

   `@Injectable() OperatorsService`, зависимости через `@Inject`: `OperatorsRepository`, `TokensService`.

   `async issueToken(input: IssueOperatorTokenInput): Promise<IssuedOperatorToken>`:
   1. `const operator = await this.operators.upsert({ ...input, avatarUrl: input.avatarUrl ?? null })` — имя, аватар и роль всегда берутся из запроса: если `avatarUrl` не прислали, аватар стирается;
   2. `operator.disabledAt !== null` — `throw new OperatorDisabledError()`;
   3. `return this.tokens.sign({ audience: "operator", subject: operator.id, claims: { projectId: operator.projectId, role: operator.role }, ttlSeconds: operatorTokenTtlSeconds })`.

   Домен не знает про HTTP: перевод `OperatorDisabledError` в 403 делает контроллер (TASK-9).

3. `operators.module.ts` — `OperatorsModule`: `imports: [TokensModule]`, `providers: [OperatorsRepository, OperatorsService]`, `exports: [OperatorsService, OperatorsRepository]`. В `api.module.ts` не подключать: его импортируют `ServerApiModule` (TASK-9) и `OperatorAuthModule` (TASK-10).

## Где

- `apps/server/src/domain/operators/operators.repository.ts`, `apps/server/src/domain/operators/operators.service.ts`, `apps/server/src/domain/operators/operators.module.ts` — новые файлы.
- Читать: `apps/server/src/domain/operators/operator.entity.ts`, `apps/server/src/infra/tokens/tokens.service.ts`, `apps/server/src/domain/keys/api-keys.repository.ts`.
- Тесты:
  - `apps/server/src/domain/operators/operators.service.spec.ts` (unit, `pnpm --filter @sowa-chat/server test`): репозиторий и `TokensService` — заглушки через `Test.createTestingModule` с `useValue`, как в `apps/server/test/support/api-keys-service-probe.ts`;
  - `apps/server/test/operators.e2e-spec.ts` (e2e, `pnpm --filter @sowa-chat/server test:e2e`): `Test.createTestingModule({ imports: [WorkerModule, OperatorsModule] })`, база — `useTestDatabase`, проект — `createProject`, как в `apps/server/test/api-keys.e2e-spec.ts`. Ключ подписи берётся из `apps/server/.env.test` (TASK-4).

## Требования из плана

- Токен оператора: JWT на 15 минут без refresh-токена, новый выдаёт бекенд админки.
- Роли (`operator`, `supervisor`) передаёт бекенд админки, мы их не придумываем.
- Оператор создаётся или обновляется по `(project_id, external_id)`: имя, аватар и роль берутся из запроса.
- Заблокированный оператор (`disabled_at`) токен не получает.
- `domain` ничего не знает про HTTP, сокеты и очереди.

## Документация

- https://typeorm.io/docs/working-with-entity-manager/repository-api
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional

## Критерии приёмки

- `issueToken` для заблокированного оператора бросает `OperatorDisabledError` и не вызывает `TokensService.sign`; для активного вызывает `sign` с `audience: "operator"`, `subject` — ID оператора, `claims` `{ projectId, role }` и `ttlSeconds: 900`; без `avatarUrl` в `upsert` уходит `avatarUrl: null` (unit).
- Первый `issueToken` создаёт строку `operators`, повторный с другими `name`, `role` и без `avatarUrl` обновляет ту же строку (тот же `id`, `avatar_url` — NULL); выданный токен проходит `TokensService.verify(token, "operator")` с `sub` — ID оператора, `projectId` и новой ролью (e2e).
- Два одновременных `issueToken` одного `externalId` (`Promise.all`) оба успешны и оставляют одну строку; тот же `externalId` в другом проекте — отдельная строка (e2e).
- Оператор с `disabled_at`, выставленным в базе, получает `OperatorDisabledError`; `findDisabledIds` возвращает ровно ID заблокированных операторов из всех проектов (e2e).

## Чего не делать

- Не делать контроллер и схемы HTTP — это TASK-9.
- Не делать блокировку и разблокировку операторов — это эпик кэша (EPIC-14, команды `operator:disable` и `operator:enable`).
- Не менять `maxChats`.
- Не создавать `index.ts`: barrel-файлы в `apps/server` не используем.

## История доработок

—
