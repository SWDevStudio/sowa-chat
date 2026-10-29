# EPIC-11 / TASK-14. Команда secrets:generate без конфига, БД и Redis

Исполнитель: sonnet
Зависит от: TASK-1, TASK-6, TASK-10, TASK-13
Владеет: apps/server/src/cli/secrets/secrets-generate.command.ts, apps/server/src/cli/secrets/secrets-generate.module.ts, apps/server/src/cli/secrets/secrets-generate.command.spec.ts, apps/server/src/cli/cli-runner.ts, apps/server/src/cli.module.ts, apps/server/src/main.ts, apps/server/test/secrets-generate-command.e2e-spec.ts
Коммит: [SERVER]: add secrets:generate command without config or database
Ветка: feature/EPIC-11

## Что сделать

`sowa-chat secrets:generate` печатает в stdout готовый блок `ИМЯ=значение` для хранилища секретов или `.env` production. Команда работает с пустым env и без БД, Redis и S3.

Почему нельзя просто добавить команду в `CliModule`: `CliModule` импортирует `AppConfigModule` (схема требует `DATABASE_URL`, `REDIS_URL`, `SOWA_S3_*`) и `DatabaseModule.forRoot` (подключение к БД при создании контекста). Хуже того, `ConfigModule.forRoot` вызывается при импорте `config.module.ts`: при неверном env он возвращает отклонённый промис, и без Nest, который его ждёт, процесс падает на необработанном отклонении. Поэтому `config.module.ts` не должен импортироваться вовсе, пока выполняется `secrets:generate`.

1. `apps/server/src/cli/secrets/secrets-generate.command.ts` — `SecretsGenerateCommand`, по образцу `apps/server/src/cli/keys/key-generate.command.ts`, без зависимостей в конструкторе:
   - `@Command({ name: "secrets:generate", description: "Print new production secrets as NAME=value lines" })`;
   - `@Option({ flags: "--rotate", description: "Add a new key version to SOWA_ENCRYPTION_KEYS and SOWA_TOKEN_SIGNING_KEYS from the environment" })` — метод `parseRotate(): boolean` возвращает `true`;
   - без `--rotate`: для каждой записи `generatedSecrets` (TASK-1) по порядку — значения `secret.generate("production")`, затем `SOWA_INIT_SERVER_KEY` — `generateKey("serverKey")` из `domain/keys/key-format.ts` (тот же код, что у `key:generate`);
   - с `--rotate`: значения `rotateConfiguredSecrets()` (TASK-13); `SOWA_INIT_SERVER_KEY` и секреты без версий не печатаются;
   - каждая переменная — строка `${name}=${value}` через `writeLine` (`cli-output.ts`), только в stdout. В лог значения не пишутся. Ошибка `rotateConfiguredSecrets` выходит из `run`, `serviceErrorHandler` печатает `error: <текст>` в stderr, код выхода 1.

2. `apps/server/src/cli/secrets/secrets-generate.module.ts` — `SecretsGenerateModule`: `@Module({ providers: [SecretsGenerateCommand] })`, без конфига, БД и логгера.

3. `apps/server/src/cli/cli-runner.ts`:
   - константа `secretsGenerateCommandName = "secrets:generate"`;
   - `runCliCommand(commandArguments)`: если `commandArguments[0] === secretsGenerateCommandName` — запуск с `SecretsGenerateModule`, `logger: ["error", "fatal"]` (сообщения Nest уровня `log` ушли бы в stdout вместе со значениями) и без `app.useLogger`; иначе — как сейчас с `CliModule`, но `CliModule` подключается динамически: `const { CliModule } = await import("../cli.module.js")`. Статического импорта `cli.module.ts` в файле нет.
   - Общую часть (создание контекста, `serviceErrorHandler`, `run`, `close`, код выхода) — одной функцией для обоих модулей, без дублирования.

4. `apps/server/src/cli.module.ts`: `SecretsGenerateCommand` в `providers`, чтобы `sowa-chat --help` показывал команду. Выполняется она всегда через `SecretsGenerateModule`.

5. `apps/server/src/main.ts`: модули режимов импортируются динамически внутри своих функций — `runApi`: `const { ApiModule } = await import("./api.module.js")`, так же `WorkerModule` в `runWorker` и `MigrateModule` в `runMigrate`. Статических импортов `api.module.ts`, `worker.module.ts`, `migrate.module.ts`, `cli.module.ts` и `infra/config/config.module.ts` в `main.ts` нет. Импорты классов `EnvironmentChecksService`, `InitialProjectService`, `StartupSummaryService`, `ZoneServers`, `PreparationRunner` остаются: они `config.module.ts` не импортируют.

## Где

- Новые файлы: `apps/server/src/cli/secrets/secrets-generate.command.ts`, `apps/server/src/cli/secrets/secrets-generate.module.ts` (рядом с `secrets-reencrypt.command.ts`).
- Правки: `apps/server/src/cli/cli-runner.ts`, `apps/server/src/cli.module.ts`, `apps/server/src/main.ts`.
- Модульный тест `apps/server/src/cli/secrets/secrets-generate.command.spec.ts` — `runCliInProcess` из `test/support/cli-run.ts`.
- e2e `apps/server/test/secrets-generate-command.e2e-spec.ts` — `buildServer` из `test/support/project-cli.ts`, `spawnSync(process.execPath, ["dist/main.js", "cli", "secrets:generate"], { cwd: apps/server, env })` и то же для `dist/sowa-chat.js`; env без переменных `SOWA_*`, `DATABASE_URL`, `REDIS_URL` (как `systemEnvironment` в `test/config-startup.e2e-spec.ts`).

## Требования из плана

- Секреты для production печатает команда `sowa-chat secrets:generate` готовым блоком переменных; она не обращается к БД и ничего не меняет. С флагом ротации — новый ключ следующей версии.
- Вывод команд — в stdout, логи режима `cli` — в stderr (решение EPIC-10).

## Документация

- https://docs.nestjs.com/recipes/nest-commander
- https://nodejs.org/api/esm.html#import-expressions

## Критерии приёмки

- Модульно: вывод без `--rotate` — четыре строки `SOWA_ENCRYPTION_KEYS=…`, `SOWA_TOKEN_SIGNING_KEYS=…`, `SOWA_TOKEN_SIGNING_KEY_ID=key-1`, `SOWA_INIT_SERVER_KEY=sk_…`, stderr пустой; эти значения вместе с остальным минимальным env production (`DATABASE_URL`, `REDIS_URL`, `SOWA_S3_*`, `SOWA_PUBLIC_URL=https://chat.example.com`, `SOWA_ENV=production`) проходят `parseEnv`; два запуска дают разные значения.
- Модульно: `--rotate` с `SOWA_ENCRYPTION_KEYS=1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=` и тестовым ключом подписи печатает три строки, `SOWA_ENCRYPTION_KEYS` начинается с ключа `1` без изменений, затем `,2:`; без `SOWA_ENCRYPTION_KEYS` — код 1 и `error: SOWA_ENCRYPTION_KEYS is not set` в stderr.
- e2e: `node dist/main.js cli secrets:generate` и `node dist/sowa-chat.js secrets:generate` без `SOWA_*`, `DATABASE_URL`, `REDIS_URL` выходят с кодом 0 и печатают четыре строки `ИМЯ=значение`; `node dist/main.js cli --help` перечисляет `secrets:generate`.
- Остальные e2e команд CLI (`project-commands`, `key-commands`, `secrets-reencrypt-command`, `cli-mode`) проходят без правок.

## Чего не делать

- Не записывать секреты в файлы и не менять БД.
- Не регистрировать новые секреты здесь: список — реестр `generatedSecrets` (TASK-1).

## История доработок

—
