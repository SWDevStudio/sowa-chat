# EPIC-14 / TASK-7. Команды `operator:disable` и `operator:enable`, список блокировок — отдельным модулем

Исполнитель: haiku
Зависит от: TASK-6
Владеет: apps/server/src/cli/operators/operator.commands.ts, apps/server/src/cli.module.ts, apps/server/src/domain/operators/operators.module.ts, apps/server/src/domain/operators/disabled-operators.module.ts, apps/server/src/api/operator/operator-auth.module.ts, apps/server/test/operator-commands.e2e-spec.ts
Коммит: [SERVER]: add operator disable and enable cli commands
Ветка: feature/EPIC-14

## Что сделать

Команды CLI поверх `OperatorsService.disable` и `enable` из TASK-6. Образец команд — `apps/server/src/cli/origins/origin.commands.ts`.

1. `apps/server/src/cli/operators/operator.commands.ts` — два класса:
   - `OperatorDisableCommand`: `@Command({ name: "operator:disable", description: "Disable an operator: their tokens stop working at once" })`;
   - `OperatorEnableCommand`: `@Command({ name: "operator:enable", description: "Enable a disabled operator" })`.

   Обе команды принимают обязательные `--project <name>` и `--external-id <id>` (`@Option({ ..., required: true })`, поле опций — `externalId`). Порядок: `projects.getByName(options.project)` (нет проекта — `ProjectNotFoundError`, код 1), затем `operators.disable` или `operators.enable` с `{ projectId: project.id, externalId, actorKind: "cli" }`. Вывод через `writeLine` (`apps/server/src/cli/cli-output.ts`):

   | Результат | Вывод |
   |---|---|
   | `disabled` | `disabled: <externalId>` |
   | `enabled` | `enabled: <externalId>` |
   | `unchanged` у `operator:disable` | `already disabled: <externalId>` |
   | `unchanged` у `operator:enable` | `already enabled: <externalId>` |

   `OperatorNotFoundError` не ловить: `serviceErrorHandler` выводит `error: Operator "<externalId>" not found` и код 1.

2. `DisabledOperators` выносится из `OperatorsModule` в свой модуль, чтобы CLI получил `OperatorsService` без списка блокировок: список нужен только репликам `api`, а в CLI он лишь читал бы БД при каждом запуске команды.
   - `apps/server/src/domain/operators/operators.module.ts`: `providers: [OperatorsRepository, OperatorsService]`, `exports: [OperatorsService, OperatorsRepository]`.
   - `apps/server/src/domain/operators/disabled-operators.module.ts` — новый `DisabledOperatorsModule`: `imports: [OperatorsModule]`, `providers: [DisabledOperators]`, `exports: [DisabledOperators]`.
   - `apps/server/src/api/operator/operator-auth.module.ts`: `DisabledOperatorsModule` в `imports` и в `exports` рядом с `OperatorsModule`.

3. `apps/server/src/cli.module.ts`: `OperatorsModule` в `imports`, `OperatorDisableCommand` и `OperatorEnableCommand` в `providers`.

## Где

- `apps/server/src/cli/operators/operator.commands.ts` — новый.
- `apps/server/src/domain/operators/disabled-operators.module.ts` — новый.
- `apps/server/src/domain/operators/operators.module.ts`, `apps/server/src/api/operator/operator-auth.module.ts`, `apps/server/src/cli.module.ts`.
- Тест: `apps/server/test/operator-commands.e2e-spec.ts` — команды через `runCliInProcess` (`apps/server/test/support/cli-run.ts`), проект — `setupMainProject` (`apps/server/test/support/key-cli.ts`, проект `main`), оператор — `OperatorsService.issueToken` в модуле `Test.createTestingModule({ imports: [WorkerModule, OperatorsModule] })`. Не длиннее 300 строк.

## Требования из плана

- Заблокированный оператор (`disabled_at`) сразу попадает в список блокировок: запросы отклоняются (до реплик доводит TASK-8).
- Команды CLI запускаются внутри контейнера: `docker compose exec api sowa-chat …`.

## Документация

- https://docs.nestjs.com/recipes/nest-commander

## Критерии приёмки

- `operator:disable --project main --external-id ext-1` — код 0, stdout `disabled: ext-1`, `disabled_at` в БД заполнен, в `audit_log` есть `operator.disabled` с `actor_kind` `cli`; повтор — код 0, `already disabled: ext-1`.
- `operator:enable` — код 0, `enabled: ext-1`, `disabled_at` пуст; повтор — `already enabled: ext-1`.
- Неизвестный `--external-id` и неизвестный `--project` — код 1 и `error: …` в stderr; без `--external-id` — код 1.
- `Test.createTestingModule({ imports: [CliModule] })` не содержит `DisabledOperators` (`moduleRef.get(DisabledOperators, { strict: false })` бросает), а приложение `ApiModule` содержит; `apps/server/test/disabled-operators.e2e-spec.ts` проходит без правок.

## Чего не делать

- Не синхронизировать список блокировок между репликами — это TASK-8.
- Не менять `operators.service.ts` и `disabled-operators.ts`.

## История доработок

—
