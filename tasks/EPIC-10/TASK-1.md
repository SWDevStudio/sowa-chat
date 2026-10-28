# EPIC-10 / TASK-1. Логи режима cli в stderr, вывод команд в stdout

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/logging/log-destination.ts, apps/server/src/infra/logging/logger.module.ts, apps/server/src/infra/logging/log-file-descriptor.spec.ts, apps/server/test/support/e2e-server.ts, apps/server/test/logging.e2e-spec.ts
Коммит: [SERVER]: write cli mode logs to stderr
Ветка: feature/EPIC-10

## Что сделать

Команды CLI печатают результат (ключи, списки) в stdout. Чтобы ключ из `sowa-chat key:generate` можно было забрать в переменную или файл без JSON-строк логов, в режиме `cli` логи идут в stderr. В режимах `api`, `worker`, `migrate` всё остаётся как есть — stdout.

1. `apps/server/src/infra/logging/log-destination.ts`: вместо `createStdoutDestination()` — две функции:

   ```ts
   const stdoutFileDescriptor = 1;
   const stderrFileDescriptor = 2;

   export function logFileDescriptor(mode: ServerMode): number {
     return mode === "cli" ? stderrFileDescriptor : stdoutFileDescriptor;
   }

   export function createLogDestination(mode: ServerMode): DestinationStream {
     return pino.destination({ fd: logFileDescriptor(mode), sync: false, maxLength: maxBufferedBytes });
   }
   ```

   `ServerMode` — `import type { ServerMode } from "../../server-mode.js"`. `maxBufferedBytes` остаётся как есть. `createStdoutDestination` удалить.

2. `apps/server/src/infra/logging/logger.module.ts`:
   - `jsonOptions(options, mode)` возвращает `[options, createLogDestination(mode)]`;
   - `prettyOptions(options, mode)` возвращает `{ ...options, transport: { target: "pino-pretty", options: { destination: logFileDescriptor(mode) } } }`;
   - `createLoggerModule(mode)` передаёт `mode` в обе функции.

3. `apps/server/test/support/e2e-server.ts`:
   - в `RunningServer` добавить `stdout: () => string` и `stderr: () => string` — то, что процесс написал в каждый поток по отдельности; `output()` остаётся и возвращает оба потока вместе, как сейчас;
   - `spawnServer(mode: string, env: Env, args: string[] = [])` запускает `["dist/main.js", mode, ...args]`. Остальные вызовы `spawnServer` не меняются.

4. `apps/server/test/logging.e2e-spec.ts`: проверку `it.each(["migrate", "cli"])("%s пишет логи в том же формате", …)` разделить:
   - `migrate` — как сейчас;
   - `cli` (запуск без аргументов): каждая непустая строка stderr — JSON с `service.name` `sowa-chat-server` и `mode` `cli`, среди них есть строка запуска Nest (`Starting Nest application`); в stdout нет ни одной строки, которая разбирается `parseLogLine` и содержит `service.name`.

## Где

- `apps/server/src/infra/logging/log-destination.ts`, `apps/server/src/infra/logging/logger.module.ts` — правка.
- `apps/server/src/infra/logging/log-file-descriptor.spec.ts` — новый unit-тест.
- `apps/server/test/support/e2e-server.ts`, `apps/server/test/logging.e2e-spec.ts` — правка e2e.
- Образец доступа к потоку pino в тесте — `apps/server/src/infra/logging/log-destination.spec.ts` (`Reflect.get(PinoLogger.root, pino.symbols.streamSym)`).

## Требования из плана

- Логи — JSON в stdout, одна строка — одно событие; их собирает сборщик логов контейнеров. Режим `cli` — исключение (`tasks/EPIC-10/decisions.md`): его запускают вручную (`docker compose exec api sowa-chat …`), сборщик логов его вывод не видит, а stdout занят результатом команды.
- Первый проект и ключи создаются через `SOWA_INIT_*` или командой CLI; ключи никогда не печатаются в лог.

## Документация

- https://getpino.io/#/docs/api?id=destination
- https://github.com/pinojs/pino-pretty#options

## Критерии приёмки

- `logFileDescriptor("cli")` — 2, `logFileDescriptor` для `api`, `worker`, `migrate` — 1.
- Логгер, собранный `createLoggerModule("cli")` в формате `json`, пишет в поток с `fd` 2; `createLoggerModule("api")` — с `fd` 1 (`log-destination.spec.ts` по-прежнему проходит).
- E2e: `node dist/main.js cli` пишет JSON-логи только в stderr, `migrate` и `api` — в stdout, как раньше.

## Чего не делать

- Не менять уровень логов, формат строк и `redact`.
- Не подключать nest-commander — это TASK-2.

## История доработок

—
