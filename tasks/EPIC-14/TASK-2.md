# EPIC-14 / TASK-2. Кэш проверенных ключей `sk_` по `lookupPrefix` с проверкой хеша

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/domain/keys/api-keys.service.ts, apps/server/src/domain/keys/api-keys.service.spec.ts, apps/server/test/support/api-keys-service-probe.ts, apps/server/test/api-keys.e2e-spec.ts, apps/server/test/api-keys-cache.e2e-spec.ts
Коммит: [SERVER]: cache verified server keys for 60 seconds
Ветка: feature/EPIC-14

## Что сделать

`ApiKeysService.verify` (`apps/server/src/domain/keys/api-keys.service.ts`) читает строку ключа из кэша реплики (`AppCacheModule` из TASK-1) и ходит в БД только при промахе. Сброс записи при отзыве уже сделан в TASK-1: `LocalCacheInvalidation` удаляет `cacheKeys.apiKey(prefix)` по событию `apiKey.revoked`. Метод `revoke` не менять.

1. Ключ кэша — `cacheKeys.apiKey(parsed.lookupPrefix)` из `apps/server/src/infra/cache/cache-keys.ts`. Не хеш ключа: в событии `apiKey.revoked` есть только `prefix`, и сброс по хешу был бы невозможен.

2. Значение в кэше — только для действующего ключа (строка найдена, не отозвана), JSON-совместимое:

   ```ts
   interface CachedApiKey {
     apiKeyId: string;
     projectId: string;
     botId: string | null;
     kind: ApiKeyKind;
     keyHash: string;
   }
   ```

   `keyHash` — `row.keyHash.toString("hex")` (SHA-256 ключа, не открытый ключ). Открытого ключа в значении и в ключе кэша нет.

3. Порядок `verify(key, kind)`:
   1. `parseKey` не прошёл — `undefined`, без кэша и БД (как сейчас).
   2. Запись в кэше есть: проверить `cached.kind === kind` и хеш (`timingSafeEqual` хеша присланного ключа с `Buffer.from(cached.keyHash, "hex")`, тот же `hashMatches`). Совпало — вернуть `{ apiKeyId, projectId, botId }` из записи; не совпало — `undefined`. В БД не ходить, `touchLastUsedAt` не вызывать.
   3. Записи нет: как сейчас `findByPrefix`, проверки `kind`, хеша, `revokedAt`. Неудача — `undefined`, в кэш ничего не класть. Успех — `touchLastUsedAt(row.id)`, затем `cache.set(cacheKey, cachedApiKey)` без своего срока (действует общий `cacheTtlMs`), вернуть результат.

   Разбить на маленькие методы (`verifyCached`, `verifyStored` или похожие), чтобы `verify` читался сразу и укладывался в `complexity` 10.

4. `lastUsedAt` обновляется только при промахе кэша. Запись живёт 60 секунд, поэтому на одной реплике `last_used_at` обновляется не чаще раза в 60 секунд; условие в SQL `touchLastUsedAt` (не чаще раза в минуту) оставить как есть.

5. Конструктор `ApiKeysService` получает третий параметр `@Inject(CACHE_MANAGER) private readonly cache: Cache` (`Cache` — тип из `cache-manager`).

6. Тесты, которые сломает кэш, поправить:
   - `apps/server/test/support/api-keys-service-probe.ts`: в `Test.createTestingModule` добавить `imports: [CacheModule.register()]` (из `@nestjs/cache-manager`), чтобы `ApiKeysService` получил `CACHE_MANAGER`.
   - `apps/server/test/api-keys.e2e-spec.ts`, тест «last_used_at старше минуты обновляется следующей verify»: перед второй `verify` очистить кэш — `await moduleRef.get<Cache>(CACHE_MANAGER).clear()`. Остальные тесты `last_used_at` проходят без правок; если какой-то падает из-за кэша — та же очистка перед повторной `verify`. Смысл тестов не менять.
   - `apps/server/src/domain/keys/api-keys.service.spec.ts` — поправить ожидания, если какие-то из них сломались из-за кэша (например, второй вызов `verify` в одном тесте теперь не ходит в репозиторий).

## Где

- `apps/server/src/domain/keys/api-keys.service.ts` — кэш в `verify`.
- `apps/server/test/support/api-keys-service-probe.ts`, `apps/server/src/domain/keys/api-keys.service.spec.ts`, `apps/server/test/api-keys.e2e-spec.ts` — правки под кэш.
- `apps/server/test/api-keys-cache.e2e-spec.ts` — новый e2e: модуль `Test.createTestingModule({ imports: [WorkerModule, KeysModule] })`, как в `api-keys.e2e-spec.ts`; шпион `vi.spyOn(moduleRef.get(ApiKeysRepository, { strict: false }), "findByPrefix")`; кэш — `moduleRef.get<Cache>(CACHE_MANAGER)`. Не длиннее 300 строк.

## Требования из плана

- Проверенные ключи кэшируются в памяти реплики на 60 секунд, а отзыв ключа сбрасывает кэш на всех репликах через Redis (на других репликах — TASK-5).
- Неудачные проверки не кэшируются.
- В кэше нет открытых ключей.
- У всех ключей есть `last_used_at`; по нему видно, что старый ключ перестал использоваться перед `key:revoke`.

## Документация

- https://docs.nestjs.com/techniques/caching

## Критерии приёмки

- Две `verify` одного `sk_` подряд возвращают одинаковый результат, а `findByPrefix` вызван один раз.
- После `keys.revoke({ prefix, actorKind: "cli" })` в том же модуле следующая `verify` этого ключа — `undefined`, и она снова вызвала `findByPrefix`.
- Ключ, которого нет в БД, и ключ с тем же `lookupPrefix`, но другим телом (подделка, как `forgeKeyWithSameLookupPrefix` в `api-keys.e2e-spec.ts`), при каждой повторной `verify` снова вызывают `findByPrefix`, если настоящий ключ ещё не проверялся; если настоящий ключ уже в кэше, подделка — `undefined` без `findByPrefix`.
- Значение `cache.get(cacheKeys.apiKey(prefix))` после `verify` в `JSON.stringify` не содержит открытого ключа и содержит `keyHash` в hex; `verify` ключа `bot` с записью `server` в кэше — `undefined`.
- Тесты `last_used_at` в `apps/server/test/api-keys.e2e-spec.ts` проходят; при попадании в кэш `last_used_at` не меняется.

## Чего не делать

- Не кэшировать неудачные проверки и отозванные ключи.
- Не класть в кэш открытый ключ и `Buffer`.
- Не менять `revoke`, `touchLastUsedAt` и `cache-invalidation-rules.ts`.
- Не делать сброс на других репликах — это TASK-4 и TASK-5.

## История доработок

—
