# EPIC-11 / TASK-15. Команда doctor: все проверки окружения и отчёт

Исполнитель: haiku
Зависит от: TASK-12, TASK-14
Владеет: apps/server/src/cli/doctor/doctor.command.ts, apps/server/src/cli.module.ts, apps/server/test/doctor-command.e2e-spec.ts
Коммит: [SERVER]: add doctor command for environment checks
Ветка: feature/EPIC-11

## Что сделать

`sowa-chat doctor` выполняет все проверки из реестра окружения (TASK-3, в том числе только для `doctor`), печатает отчёт «что не так и как исправить» и завершается с кодом 0 или 1. Её запускают до выкатки или в CI/CD.

Режим `cli` не подключает `RedisModule` (решения EPIC-6 и EPIC-10: команды без Redis должны работать без Redis). Поэтому `doctor` создаёт клиент Redis сам, внутри команды, и закрывает его в конце. БД в `cli` уже подключена (`DatabaseModule` в `CliModule`); если БД недоступна, `cli` не стартует с ошибкой подключения, как и сейчас.

1. `apps/server/src/cli/doctor/doctor.command.ts` — `DoctorCommand`, образец — `apps/server/src/cli/keys/key-list.command.ts`:
   - `@Command({ name: "doctor", description: "Check the environment and print what is wrong and how to fix it" })`;
   - конструктор (3 параметра, предел oxlint для команд): `@InjectDataSource() dataSource: DataSource`, `@Inject(redisConfig.KEY) redis: ConfigType<typeof redisConfig>`, `@Inject(environmentChecksConfig.KEY) settings: ConfigType<typeof environmentChecksConfig>`;
   - `run()`:
     1. `const client = createRedisClient(redis.url)` (`apps/server/src/infra/redis/redis-client.ts`);
     2. `await waitForRedis(client, redisStartupTimeoutMs)`; ошибка → в начало отчёта результат `{ check: "redisConnection", level, message: <текст ошибки> }`, где `level` — `stop` в production и `warn` в development (как у остальных проверок); текст `Redis is unavailable: …` уже без адреса и пароля. Проверки всё равно выполняются: проверки Redis дадут `check could not run`;
     3. `runEnvironmentChecks(registeredEnvironmentChecks, { settings, dataSource, redis: client }, "doctor")` (`apps/server/src/infra/environment-checks/run-environment-checks.ts`);
     4. в `finally` — `closeRedis(client)`;
     5. отчёт в stdout через `writeLine` (`cli-output.ts`): без результатов — одна строка `no problems found`; иначе по строке на результат: `${level}\t${check}\t${message}`, в порядке результатов;
     6. есть хотя бы один `stop` → бросить `Error(`doctor found problems that stop the service: ${число stop}`)`: `serviceErrorHandler` из `cli-runner.ts` напишет `error: …` в stderr и выставит код 1. Только предупреждения или ничего — код 0.
   - В development находки `stop` уже стали `warn` (`runEnvironmentChecks`), поэтому там код всегда 0.

2. `apps/server/src/cli.module.ts`: `DoctorCommand` в `providers`. `RedisModule` и `EnvironmentChecksModule` не подключать.

## Где

- Новый файл `apps/server/src/cli/doctor/doctor.command.ts`, правка `apps/server/src/cli.module.ts`.
- e2e `apps/server/test/doctor-command.e2e-spec.ts` — в процессе через `runCliInProcess(["doctor"])` (`test/support/cli-run.ts`), env production — `vi.stubEnv` для каждого значения `productionOverrides` (`test/support/production-env.ts`), после теста `vi.unstubAllEnvs()`. Тестовые PostgreSQL 18.6 (суперпользователь) и Valkey (`noeviction`, AOF выключен) дают только предупреждения.

## Требования из плана

- Команда `sowa-chat doctor` выполняет проверки отдельно и печатает отчёт «что не так и как исправить» — её можно запустить до выкатки или в CI/CD.
- Код 0 — нет остановок, код 1 — есть хотя бы одна.
- Вывод команд — в stdout, логи `cli` и сообщение об ошибке — в stderr (решение EPIC-10).

## Документация

- https://docs.nestjs.com/recipes/nest-commander

## Критерии приёмки

- e2e: в production с `productionOverrides` `doctor` выходит с кодом 0, stdout содержит строки `warn` проверок `redisAppendOnly`, `postgresSuperuser`, `s3PublicUrl`, строк `stop` нет.
- e2e: в production с `SOWA_PUBLIC_URL=http://chat.example.com` и `SOWA_S3_SECRET_KEY=sowa-dev-secret` stdout содержит обе строки `stop` (`publicUrlsHttps`, `exampleSecrets`), код выхода 1, stderr содержит `error: doctor found problems that stop the service: 2`.
- e2e: в development (`.env.test`) с теми же двумя настройками `doctor` выходит с кодом 0 и строк `stop` нет.
- e2e: в production с `REDIS_URL` на свободный порт (`findFreePort` из `test/support/e2e-server.ts`) `doctor` выходит с кодом 1, в stdout строка `stop\tredisConnection\tRedis is unavailable: …`.

## Чего не делать

- Не подключать `RedisModule` в `cli.module.ts`.
- Не исправлять настройки за DevOps: команда только сообщает.
- Не добавлять проверок S3 и доверенных прокси — это эпик хранилища файлов и EPIC-16.

## История доработок

—
