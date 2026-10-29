# EPIC-10 / TASK-13. Команды origin:* и operator-origin:*

Исполнитель: haiku
Зависит от: TASK-11, TASK-12
Владеет: apps/server/src/cli/origins/origin.commands.ts, apps/server/src/cli.module.ts, apps/server/test/origin-commands.e2e-spec.ts
Коммит: [SERVER]: add origin and operator-origin cli commands
Ветка: feature/EPIC-10

## Что сделать

Шесть тонких команд над `ProjectsService.addOrigin`, `removeOrigin` (TASK-12) и `getByName`. Все — в одном файле `apps/server/src/cli/origins/origin.commands.ts`: шесть маленьких классов и общие функции. Образцы — `apps/server/src/cli/identity-keys/` (TASK-11). Ошибку команда не ловит: её печатает `runCliCommand`.

| Команда | Класс | Список | Параметры |
|---|---|---|---|
| `origin:add` | `OriginAddCommand` | `allowedOrigins` | `--project <name>`, `--origin <origin>` |
| `origin:remove` | `OriginRemoveCommand` | `allowedOrigins` | `--project <name>`, `--origin <origin>` |
| `origin:list` | `OriginListCommand` | `allowedOrigins` | `--project <name>` |
| `operator-origin:add` | `OperatorOriginAddCommand` | `operatorAllowedOrigins` | `--project <name>`, `--origin <origin>` |
| `operator-origin:remove` | `OperatorOriginRemoveCommand` | `operatorAllowedOrigins` | `--project <name>`, `--origin <origin>` |
| `operator-origin:list` | `OperatorOriginListCommand` | `operatorAllowedOrigins` | `--project <name>` |

Все параметры `required: true`. Descriptions: `Allow a site origin for the public zone`, `Remove a site origin`, `List site origins`, `Allow an admin panel origin for the operator zone`, `Remove an admin panel origin`, `List admin panel origins`.

Вывод (stdout, `writeLine`), origin — уже нормализованный (`normalizeOrigin` из `apps/server/src/domain/projects/origin.ts`):

- `add`: `"added"` → `added: <origin>`, `"unchanged"` → `already allowed: <origin>`;
- `remove`: `"removed"` → `removed: <origin>`, `"unchanged"` → `not in list: <origin>`;
- `list`: по одной строке на origin из `project.allowedOrigins` или `project.operatorAllowedOrigins`, без заголовка; пустой список — ничего.

Повторное добавление и удаление отсутствующего — код 0. Неверный origin — `InvalidOriginError` из сервиса, код 1.

`CliModule`: `providers` — шесть классов.

## Где

- `apps/server/src/cli/origins/origin.commands.ts` — новый файл.
- `apps/server/src/cli.module.ts` — правка.
- Тест: `apps/server/test/origin-commands.e2e-spec.ts` (e2e через `runCliInProcess` из `apps/server/test/support/cli-run.ts`).

## Требования из плана

- Два отдельных списка: `allowed_origins` — домены сайта для публичной зоны, `operator_allowed_origins` — домены админки для операторской зоны.
- Origin — схема, хост и необязательный порт без пути; значение нормализуется (нижний регистр, без завершающего `/`); путь, query и `*` отклоняются.

## Документация

- https://docs.nestjs.com/recipes/nest-commander

## Критерии приёмки

- `origin:add --project main --origin https://Shop.Example.com/` — код 0, `added: https://shop.example.com`, в БД значение только в `allowed_origins`; повтор — `already allowed: …`, код 0.
- `operator-origin:add` пишет только в `operator_allowed_origins`; `origin:list` и `operator-origin:list` показывают каждый свой список.
- `origin:remove` и `operator-origin:remove` удаляют домен, повтор — `not in list: …`, код 0; `https://a.com/path` и `*` — код 1 у обеих групп команд; неизвестный проект — код 1.

## Чего не делать

- Не писать логику изменения списков в командах.
- Не реализовывать CORS и обновление бакета.

## История доработок

—
