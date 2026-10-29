# EPIC-11 / TASK-3. Реестр проверок окружения и запуск проверок при старте api и worker

Исполнитель: sonnet
Зависит от: —
Владеет: apps/server/src/infra/environment-checks/, apps/server/src/infra/config/environment-checks.config.ts, apps/server/src/infra/config/config.module.ts, apps/server/src/api.module.ts, apps/server/src/worker.module.ts, apps/server/src/main.ts
Коммит: [SERVER]: add environment checks registry run at startup
Ветка: feature/EPIC-11

## Что сделать

Одно место для всех проверок окружения: и критичных настроек production (TASK-8), и проверок Redis и PostgreSQL (TASK-11, TASK-12), и будущих (S3 — эпик хранилища файлов). Здесь — устройство реестра, запуск всех проверок со сбором всех проблем сразу и вызов при старте `api` и `worker`. Сами проверки добавят следующие задачи; список в этой задаче пустой. Папки `apps/server/src/infra/environment-checks/` нет — создать. Barrel-файлов не делать.

1. `environment-check.ts` — типы и ошибка:

   ```ts
   import type { ConfigType } from "@nestjs/config";
   import type { Redis } from "ioredis";
   import type { DataSource } from "typeorm";
   import type { environmentChecksConfig } from "../config/environment-checks.config.js";

   export type CheckLevel = "stop" | "warn";

   export interface CheckFinding {
     level: CheckLevel;
     message: string;
   }

   export interface CheckContext {
     settings: ConfigType<typeof environmentChecksConfig>;
     dataSource: DataSource;
     redis: Redis;
   }

   export interface EnvironmentCheck {
     name: string;
     onlyInDoctor: boolean;
     run: (context: CheckContext) => Promise<CheckFinding[]>;
   }

   export interface CheckResult extends CheckFinding {
     check: string;
   }

   export class EnvironmentCheckError extends Error {}
   ```

   - `name` — camelCase, например `redisEvictionPolicy`; `onlyInDoctor` — проверка не выполняется при старте, только в `sowa-chat doctor`.
   - `run` возвращает найденные проблемы: пустой список — всё в порядке. `level` — уровень в production: `stop` останавливает запуск, `warn` — предупреждение. `message` — «что не так и как исправить», по-английски, без значений секретов.

2. `registered-environment-checks.ts` — реестр по образцу `apps/server/src/infra/crypto/registered-encrypted-fields.ts`:

   ```ts
   export const environmentChecks = Symbol("environmentChecks");
   export const registeredEnvironmentChecks: EnvironmentCheck[] = [];
   ```

   Следующие задачи и эпики дописывают проверки в этот массив.

3. `run-environment-checks.ts`:

   ```ts
   export type CheckPlace = "startup" | "doctor";

   export async function runEnvironmentChecks(
     checks: readonly EnvironmentCheck[],
     context: CheckContext,
     place: CheckPlace,
   ): Promise<CheckResult[]>
   ```

   - `startup` — только проверки с `onlyInDoctor: false`; `doctor` — все.
   - Проверки идут по очереди, в порядке списка; результат — все находки всех проверок, `check` — `name` проверки. На первой проблеме не останавливаться.
   - Если `context.settings.env === "development"`, у каждой находки `stop` становится `warn`: в development ничего не останавливает.
   - Если `run` бросил ошибку — находка `{ check: name, level: "warn", message: `check could not run: ${error.message}` }`, остальные проверки выполняются.

4. `environment-checks.service.ts` — `EnvironmentChecksService`:
   - конструктор: `@Inject(environmentChecksConfig.KEY) settings`, `@InjectDataSource() dataSource: DataSource`, `@Inject(Redis) redis: Redis`, `@Inject(environmentChecks) checks: EnvironmentCheck[]`;
   - `async verifyAtStartup(): Promise<void>` — `runEnvironmentChecks(checks, { settings, dataSource, redis }, "startup")`; каждая находка `warn` — отдельная строка `logger.warn(`${check}: ${message}`)` (`new Logger("EnvironmentChecks")` из `@nestjs/common`); если есть находки `stop` — бросить `EnvironmentCheckError` с текстом `Environment checks failed:` и затем каждая находка `stop` с новой строки в виде `${check}: ${message}`.

5. `environment-checks.module.ts` — `EnvironmentChecksModule`: `imports: [RedisModule]` (как `HealthModule`), `providers: [{ provide: environmentChecks, useValue: registeredEnvironmentChecks }, EnvironmentChecksService]`, `exports: [EnvironmentChecksService]`.

6. `apps/server/src/infra/config/environment-checks.config.ts` — пространство конфига для проверок, по образцу `app.config.ts`:

   ```ts
   export const environmentChecksConfig = registerAs("environmentChecks", () => {
     const env = parseEnv(process.env);
     return { env: env.SOWA_ENV };
   });
   ```

   Зарегистрировать в `load` у `AppConfigModule` (`config.module.ts`). Поля для своих проверок добавят TASK-8 и TASK-12.

7. Подключить `EnvironmentChecksModule` в `imports` `ApiModule` (`apps/server/src/api.module.ts`) и `WorkerModule` (`apps/server/src/worker.module.ts`).

8. `apps/server/src/main.ts` — вызов проверок явно, а не в `OnApplicationBootstrap`: так `Test.createTestingModule` в тестах (с заглушками базы и Redis в `test/support/unit-probe.ts`) проверки не запускает.
   - `runApi`: после `await app.init()` и до `ZoneServers.listen` — `await app.get(EnvironmentChecksService).verifyAtStartup();`
   - `runWorker`: `const app = await createContext(WorkerModule);` затем `await app.get(EnvironmentChecksService).verifyAtStartup();`
   Подключение к БД и Redis к этому моменту уже есть: их провайдеры ждут соединения при создании приложения. Ошибка проверки выходит из `main.ts` как необработанная, процесс завершается с кодом 1 и печатает текст `EnvironmentCheckError` — так же, как сейчас при неверном конфиге.

## Где

- Новые файлы: `apps/server/src/infra/environment-checks/environment-check.ts`, `registered-environment-checks.ts`, `run-environment-checks.ts`, `environment-checks.service.ts`, `environment-checks.module.ts`; `apps/server/src/infra/config/environment-checks.config.ts`.
- Правки: `apps/server/src/infra/config/config.module.ts`, `apps/server/src/api.module.ts`, `apps/server/src/worker.module.ts`, `apps/server/src/main.ts`.
- Тесты: `apps/server/src/infra/environment-checks/run-environment-checks.spec.ts`, `apps/server/src/infra/environment-checks/environment-checks.service.spec.ts` (проверки-заглушки в тесте, `Test.createTestingModule` с провайдерами-заглушками `DataSource` и `Redis` или `new EnvironmentChecksService(...)`).

## Требования из плана

- Окружение сервис проверяет сам, чтобы ошибка DevOps была видна сообщением, а не симптомами. Проверки идут при старте `api` и `worker`, а команда `sowa-chat doctor` выполняет их отдельно и печатает отчёт «что не так и как исправить».
- Опасные настройки в production выделяются предупреждением, а критичные останавливают запуск.
- Проверка описывается так: что проверить, уровень в production (остановка или предупреждение), текст «что не так и как исправить», где выполнять (при старте и в `doctor` или только в `doctor`).

## Документация

- https://docs.nestjs.com/fundamentals/custom-providers
- https://docs.nestjs.com/techniques/database

## Критерии приёмки

- `runEnvironmentChecks` с двумя проверками, каждая из которых находит по проблеме `stop`, возвращает обе находки с именами проверок; при `env: "development"` обе находки — `warn`.
- Проверка с `onlyInDoctor: true` не выполняется для `startup` и выполняется для `doctor`; проверка, которая бросает ошибку, даёт находку `warn` с текстом `check could not run: …`, а следующая проверка выполняется.
- `verifyAtStartup` с одной находкой `warn` пишет её через `Logger.warn` и не бросает; с двумя находками `stop` бросает `EnvironmentCheckError`, в тексте которой есть обе.

## Чего не делать

- Не писать сами проверки — это TASK-8, TASK-11, TASK-12.
- Не делать команду `doctor` — это TASK-15.
- Не запускать проверки в `OnApplicationBootstrap` или `onModuleInit`.

## История доработок

—
