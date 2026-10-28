# EPIC-15 / TASK-3. Переменная `SOWA_SLOW_OPERATION_MS` и конфиг порога медленных операций

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/config/env.schema.ts, apps/server/src/infra/config/slow-operations.config.ts, apps/server/src/infra/config/config.module.ts, apps/server/src/infra/config/env.schema.slow-operations.spec.ts, apps/server/.env.example
Ветка: feature/EPIC-15

## Что сделать

1. `infra/config/env.schema.ts`: в `envObjectSchema` после `SOWA_LOG_FORMAT` добавить `SOWA_SLOW_OPERATION_MS: integerInRange(1, 600000, 500)`. Целое число миллисекунд, по умолчанию 500, от 1 до 600000 (10 минут).
2. `infra/config/slow-operations.config.ts` — по образцу `redis.config.ts`:

   ```ts
   export const slowOperationsConfig = registerAs("slowOperations", () => {
     const env = parseEnv(process.env);
     return { thresholdMs: env.SOWA_SLOW_OPERATION_MS };
   });
   ```

3. `infra/config/config.module.ts`: добавить `slowOperationsConfig` в конец массива `load`.
4. `apps/server/.env.example`: строка `# SOWA_SLOW_OPERATION_MS=500` сразу после `SOWA_LOG_FORMAT=pretty` — закомментирована, как другие необязательные переменные с умолчанием.

## Где

- `apps/server/src/infra/config/env.schema.ts`, `config.module.ts`, `apps/server/.env.example` — правка.
- `apps/server/src/infra/config/slow-operations.config.ts` — новый.
- Тесты: `apps/server/src/infra/config/env.schema.slow-operations.spec.ts`, образец — `env.schema.logging.spec.ts` (тот же набор `requiredEnv`).

## Требования из плана

- Медленные операции: если запрос или задача выполнялись дольше `SOWA_SLOW_OPERATION_MS` (по умолчанию 500 мс), пишется одна строка уровня `warn`.
- Переменные окружения — UPPER_SNAKE, поля конфига — camelCase.

## Документация

- https://docs.nestjs.com/techniques/configuration#configuration-namespaces

## Критерии приёмки

- Без `SOWA_SLOW_OPERATION_MS` `envSchema` даёт `500`; со значением `"200"` — число `200`.
- Значения `"0"`, `"600001"`, `"abc"`, `"1.5"` отклоняются ошибкой с путём `SOWA_SLOW_OPERATION_MS`.
- `slowOperationsConfig()` при `SOWA_SLOW_OPERATION_MS=200` и обязательных переменных возвращает `{ thresholdMs: 200 }`.

## Чего не делать

- Не писать interceptor и строку `warn` — это TASK-4.
- Не менять другие переменные и их умолчания.

## История доработок

—
