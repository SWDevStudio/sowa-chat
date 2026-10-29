# EPIC-10 / TASK-2. Запуск команд nest-commander в режиме cli, программа sowa-chat и команда key:generate

Исполнитель: sonnet
Зависит от: TASK-1
Владеет: apps/server/src/cli/cli-runner.ts, apps/server/src/cli/cli-output.ts, apps/server/src/cli/cli-output.spec.ts, apps/server/src/cli/keys/key-generate.command.ts, apps/server/src/sowa-chat.ts, apps/server/src/main.ts, apps/server/src/cli.module.ts, apps/server/package.json, apps/server/test/support/cli-run.ts, apps/server/test/cli-mode.e2e-spec.ts, apps/server/test/logging.e2e-spec.ts
Коммит: [SERVER]: run cli commands with nest-commander and add key:generate
Ветка: feature/EPIC-10

## Что сделать

Сейчас режим `cli` в `apps/server/src/main.ts` — `runCli()` через `runToCompletion(CliModule)`: приложение поднимается и закрывается, команд нет. `nest-commander` 3.21 уже в `dependencies`. `CliModule` (`apps/server/src/cli.module.ts`) подключает `AppConfigModule`, `AppClsModule`, `DatabaseModule`, логгер, `TelemetryModule` и `AuditModule`; Redis в нём нет и не добавляется (`tasks/EPIC-10/decisions.md`).

1. `apps/server/src/cli/cli-runner.ts`:

   ```ts
   export const cliName = "sowa-chat";

   export async function runCliCommand(commandArguments: string[]): Promise<number> {
     let exitCode = 0;
     const app = await CommandFactory.createWithoutRunning(CliModule, {
       bufferLogs: true,
       logger: true,
       serviceErrorHandler: (error) => {
         process.stderr.write(`error: ${error.message}\n`);
         exitCode = 1;
       },
     });
     app.useLogger(app.get(Logger));
     try {
       await app.get(CommandRunnerService).run(commanderArgv(commandArguments));
     } finally {
       await app.close();
     }
     return exitCode;
   }
   ```

   - `CommandFactory`, `CommandRunnerService` — из `nest-commander`, `Logger` — из `nestjs-pino`.
   - `logger: true` обязателен: nest-commander по умолчанию ставит `logger: false`, и ошибка запуска (нет БД) не попала бы в вывод. `test/database-connection.e2e-spec.ts` ждёт у `cli` без базы код 1 и `ECONNREFUSED` — этот тест должен проходить без правок.
   - `commanderArgv(commandArguments)` — `[process.execPath, cliName, ...аргументы]`, где аргументы — `["--help"]`, если `commandArguments` пуст, иначе `commandArguments`. Commander разбирает argv в формате node (первые два элемента — node и имя программы), а имя программы `sowa-chat` попадает в справку: `Usage: sowa-chat [options] [command]`.
   - Неизвестную команду, нехватку обязательного параметра и `--help` обрабатывает сам commander: пишет сообщение и завершает процесс через `process.exit` (1 или 0). Это поведение не перехватывать.

2. `apps/server/src/main.ts`: `runCli` — `process.exitCode = await runCliCommand(process.argv.slice(3))` (`process.argv[2]` — сам режим `cli`). `runToCompletion` и импорт `CliModule` из `main.ts` удалить: они больше не нужны.

3. `apps/server/src/sowa-chat.ts` — точка входа программы `sowa-chat`:

   ```ts
   #!/usr/bin/env node
   import { runCliCommand } from "./cli/cli-runner.js";

   process.exitCode = await runCliCommand(process.argv.slice(2));
   ```

   Первая строка `#!/usr/bin/env node` обязательна, tsc сохраняет её в `dist/sowa-chat.js`.

4. `apps/server/package.json`: `"bin": { "sowa-chat": "dist/sowa-chat.js" }` рядом с `scripts`. Остальное не менять.

5. `apps/server/src/cli/cli-output.ts` — вывод для всех команд:

   ```ts
   export const emptyCell = "-";
   export function writeLine(text: string): void          // process.stdout.write(`${text}\n`)
   export function writeTable(header: string[], rows: string[][]): void  // заголовок и строки, ячейки через "\t"
   export function formatDate(date: Date | null): string  // null → emptyCell, иначе date.toISOString()
   ```

6. `apps/server/src/cli/keys/key-generate.command.ts` — первая команда:

   ```ts
   @Command({ name: "key:generate", description: "Print a new serverKey without saving it" })
   export class KeyGenerateCommand extends CommandRunner {
     async run(): Promise<void> {
       writeLine(generateKey("serverKey"));
     }
   }
   ```

   `generateKey` — из `apps/server/src/domain/keys/key-format.ts`. Команда не обращается к БД. В `CliModule` — `providers: [KeyGenerateCommand]`.

7. `apps/server/test/support/cli-run.ts` — помощник для e2e следующих задач:

   ```ts
   export interface CliRunResult { exitCode: number; stdout: string; stderr: string }
   export async function runCliInProcess(commandArguments: string[]): Promise<CliRunResult>
   ```

   Подменяет `process.stdout.write` и `process.stderr.write` через `vi.spyOn` (собирает текст, ничего не печатает), вызывает `runCliCommand`, в `finally` возвращает оригиналы. Логи pino сюда не попадают: они пишут прямо в дескриптор 2. Через этот помощник нельзя проверять `--help`, пустой запуск, неизвестную команду и нехватку параметров: commander вызовет `process.exit` и убьёт процесс тестов. Такие случаи проверяются запуском `node dist/main.js cli …`.

8. `apps/server/test/logging.e2e-spec.ts`: проверку режима `cli` из TASK-1 перевести на `cli key:generate` (через `spawnServer("cli", env, ["key:generate"])`): stderr — только JSON-строки с `mode` `cli` и строкой запуска Nest, stdout — ровно одна непустая строка, и это `sk_`-ключ.

## Где

- `apps/server/src/cli/` — новая папка: `cli-runner.ts`, `cli-output.ts`, `keys/key-generate.command.ts`.
- `apps/server/src/sowa-chat.ts` — новый файл; `apps/server/src/main.ts`, `apps/server/src/cli.module.ts`, `apps/server/package.json` — правка.
- Тесты: `apps/server/src/cli/cli-output.spec.ts` (unit), `apps/server/test/cli-mode.e2e-spec.ts` (e2e: сборка как в `test/server-modes.e2e-spec.ts`, запуск `dist/main.js` и `dist/sowa-chat.js`, плюс `runCliInProcess`), `apps/server/test/support/cli-run.ts`, `apps/server/test/logging.e2e-spec.ts`.
- `apps/server/test/server-modes.e2e-spec.ts` и `apps/server/test/database-connection.e2e-spec.ts` не меняются и должны проходить: `cli` без аргументов выводит справку и выходит с кодом 0, `cli` без базы — код 1 и `ECONNREFUSED`.

## Требования из плана

- Один образ работает в режимах `api`, `worker`, `migrate` и `cli`.
- Проекты и ключи создаются только через CLI внутри контейнера (`docker compose exec api sowa-chat …`): кто может выполнять там команды, тот и так владеет сервером, а по сети утечь нечему. Мастер-ключа нет.
- DevOps заранее генерируют ключ командой `sowa-chat key:generate`: она ничего не меняет в базе, только печатает новый ключ. Ключ кладут в хранилище секретов и передают через `SOWA_INIT_SERVER_KEY`.
- Формат ключа — `tasks/EPIC-9/decisions.md` (TASK-1): `sk_<43 символа base62>_<6 символов CRC32>`.

## Документация

- https://docs.nestjs.com/recipes/nest-commander
- https://github.com/jmcdo29/nest-commander
- https://github.com/tj/commander.js#parse-and-parseasync

## Критерии приёмки

- `node dist/main.js cli --help` и `node dist/main.js cli` без команды выходят с кодом 0, в stdout есть `Usage: sowa-chat` и `key:generate`.
- `node dist/main.js cli no-such-command` выходит с кодом 1, в выводе есть `unknown command`.
- `node dist/main.js cli key:generate` и `node dist/sowa-chat.js key:generate` выходят с кодом 0, stdout — одна строка, которую `parseKey(…, "serverKey")` разбирает; число строк в `projects` и `api_keys` не меняется.
- В `apps/server/package.json` `bin.sowa-chat` — `dist/sowa-chat.js`, первая строка `dist/sowa-chat.js` — `#!/usr/bin/env node`; `writeTable` выводит заголовок и строки через табуляцию, `formatDate(null)` — `-`.

## Чего не делать

- Не подключать Redis, `KeysModule`, `ProjectsModule`, `CryptoModule` в `CliModule` — их подключают задачи команд.
- Не писать остальные команды.
- Не перехватывать `process.exit` commander (`exitOverride`, `errorHandler`).

## История доработок

—
