# EPIC-10 / TASK-8. Команды project:create и project:list

Исполнитель: haiku
Зависит от: TASK-2, TASK-6
Владеет: apps/server/src/cli/projects/project-create.command.ts, apps/server/src/cli/projects/project-list.command.ts, apps/server/src/cli.module.ts, apps/server/test/project-commands.e2e-spec.ts
Коммит: [SERVER]: add project:create and project:list cli commands
Ветка: feature/EPIC-10

## Что сделать

Тонкие команды над `ProjectsService` (`apps/server/src/domain/projects/projects.service.ts`, TASK-6). Образец команды — `apps/server/src/cli/keys/key-generate.command.ts`, вывод — `apps/server/src/cli/cli-output.ts` (TASK-2). Ошибку команда не ловит: её печатает `runCliCommand` (`error: <сообщение>`, код 1).

1. `apps/server/src/cli/projects/project-create.command.ts` — `ProjectCreateCommand`:
   - `@Command({ name: "project:create", description: "Create a project and print its publicKey and serverKey" })`;
   - параметры: `--name <name>` (`required: true`), `--origin <origin>` и `--operator-origin <origin>` — можно несколько раз. Для повторяемого параметра метод `@Option` накапливает значения: `return [...(previous ?? []), value]`;
   - вызывает `projects.create({ name, allowedOrigins: origin ?? [], operatorAllowedOrigins: operatorOrigin ?? [], actorKind: "cli" })`;
   - stdout — четыре строки через `writeLine`:

     ```
     projectId: <uuid>
     name: <name>
     publicKey: pk_…
     serverKey: sk_…
     ```

   - stderr — `process.stderr.write("serverKey is shown only once: store it in your secret storage now\n")`.

2. `apps/server/src/cli/projects/project-list.command.ts` — `ProjectListCommand`:
   - `@Command({ name: "project:list", description: "List projects" })`, без параметров;
   - `writeTable(["name", "id", "publicKey", "allowedOrigins", "operatorAllowedOrigins"], rows)`; списки доменов — через `,`; пустой список и пустой `publicKey` — `emptyCell`;
   - `sk_`, хешей и `settings` в выводе нет.

3. `CliModule`: `imports` — добавить `ProjectsModule`; `providers` — добавить `ProjectCreateCommand`, `ProjectListCommand`.

## Где

- `apps/server/src/cli/projects/` — новые файлы команд.
- `apps/server/src/cli.module.ts` — правка.
- Тест: `apps/server/test/project-commands.e2e-spec.ts` (e2e): команды запускаются через `runCliInProcess` из `apps/server/test/support/cli-run.ts`, БД — `useTestDatabase()` из `apps/server/test/support/test-database.ts`. Пропуск `--name` проверяется только запуском `node dist/main.js cli project:create` (commander вызывает `process.exit`), по образцу `apps/server/test/cli-mode.e2e-spec.ts`.

## Требования из плана

- `docker compose exec api sowa-chat project:create` выводит ключи один раз в терминал; `sk_` больше нигде не показывается.
- В production ключи никогда не печатаются в лог; терминал при ручном запуске команды — не лог.
- Проект ищется по имени: `--project main`.

## Документация

- https://docs.nestjs.com/recipes/nest-commander
- https://github.com/jmcdo29/nest-commander

## Критерии приёмки

- `project:create --name main --origin https://Shop.Example.com/ --origin http://localhost:5173 --operator-origin https://admin.example.com` — код 0, в stdout `publicKey: pk_…` и `serverKey: sk_…`, в БД проект с `allowed_origins` `{https://shop.example.com,http://localhost:5173}` и `operator_allowed_origins` `{https://admin.example.com}`, в `audit_log` есть `project.created`.
- Повторный `project:create --name main` — код 1, в stderr `error: Project "main" already exists`; `--origin https://a.com/path` — код 1, проекта нет.
- `project:list` — код 0, строка заголовка и строка проекта с именем, ID, `pk_` и обоими списками; `sk_` в выводе нет.
- `node dist/main.js cli project:create` без `--name` — код 1.

## Чего не делать

- Не писать логику в командах: проверка имени, домены и транзакция — в `ProjectsService`.
- Не печатать ключи в лог.

## История доработок

—
