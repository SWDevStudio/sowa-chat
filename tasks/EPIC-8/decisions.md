# EPIC-8. Решения

## 28.10.2026, разбивка эпика (режим plan по расхождениям check)

- Задач было 3, осталось 3. TASK-1 (шина) и TASK-2 (таблица) не пересекаются по файлам и идут параллельно. TASK-3 зависит от обеих по-настоящему: правило аудита использует `DomainEvents` из TASK-1 и `ActorKind` из TASK-2. Отдельная задача на правила аудита рассматривалась и отклонена: ей нужны те же TASK-1 и TASK-2, и путь эпика она не сокращает.
- Нужны эпики 3 и 5: TASK-3 логирует ошибку записи логгером EPIC-3, таблица и транзакции — EPIC-5. Эпик 7 не нужен.
- Критерий «Проверка слоёв проходит» снят в TASK-1 и TASK-3: EPIC-2 TASK-5 (правила слоёв в dependency-cruiser) отклонена, правил слоёв в `apps/server/.dependency-cruiser.cjs` нет. Свой тест на импорты не пишем: это была бы замена dependency-cruiser. Запрет импортов из `domain` и `api` в `telemetry` записан в «Чего не делать» и проверяется на ревью.
- Тесты: opus только у TASK-3 (персональные данные в журнале и точка сохранения в чужой транзакции), у TASK-1 и TASK-2 — sonnet.
- Сложность у всех задач обычная. TASK-1 не по готовому образцу. Критерии TASK-2 проверяются только e2e, а `check-task` e2e не запускает, поэтому приёмку свежим тестировщиком не пропускаем.
- Ревью: opus, а не sonnet, как в предложении по разбивке. Запись журнала идёт точкой сохранения внутри транзакции того, кто опубликовал событие, а правило ставит opus эпикам с транзакциями. Ещё в эпике запрет персональных данных в журнале.

## 28.10.2026, TASK-1. Шина событий

- Внутренние имена, в публичный API не входят: `TelemetryModule` (`apps/server/src/telemetry/telemetry.module.ts`), `DomainEventBus` с методами `publish` и `subscribe`, декоратор `OnDomainEvent`, типы `DomainEvents`, `DomainEventName`, `DomainEventHandler` (`apps/server/src/telemetry/events/`).
- Реестр событий — интерфейс `DomainEvents` (имя события → тип данных) в `apps/server/src/telemetry/events/domain-events.ts`. Типы данных событий объявляются там же: `telemetry` не импортирует `domain`. Настоящие события добавляют задачи, которые их создают.
- Тестовые события `test.happened` и `test.ignored` живут в `apps/server/test/support/test-domain-events.ts` и добавляются в `DomainEvents` расширением модуля, как `ProvidedContext` в `provided-context.d.ts`. В сборку (`tsconfig.build.json` исключает `test`) они не попадают.
- `publish` ждёт всех подписчиков через `emitAsync`. Подписчики выполняются в контексте CLS и в транзакции того, кто опубликовал событие. Долгую работу (вебхуки, рассылки) подписчики должны отдавать в outbox и очереди — это эпики событий.
- `EventEmitterModule.forRoot()` без опций: без wildcard.
- `TelemetryModule` подключён в режимах `api`, `worker` и `cli`. В `migrate` его нет: доменных действий там нет.
- `action` журнала аудита равно имени события, поэтому имена событий — camelCase с точкой (`apiKey.revoked`) — сразу попадают в `audit_log`.

## 28.10.2026, TASK-2. Таблица `audit_log`

- Сущность `AuditLogEntry`, репозиторий `AuditLogRepository.create(entry)`, тип входа `NewAuditLogEntry`, `actorKinds` и `ActorKind` в `apps/server/src/domain/audit/`.
- Миграция `1793200000000-CreateAuditLog.ts`, класс `CreateAuditLog1793200000000`, пишется вручную. Имена ограничений и индекса заданы явно (`PK_audit_log`, `CHK_audit_log_actor_kind`, `FK_audit_log_project_id`, `IDX_audit_log_project_id_created_at`) и повторены в сущности, чтобы `migration:generate` не находил расхождений.
- `actor_kind` — `text` с `CHECK` по списку `system, cli, server, operator, bot, visitor`, а не тип enum PostgreSQL: новое значение добавляется заменой `CHECK` в миграции.
- `project_id` ссылается на `projects` с `ON DELETE CASCADE` и может быть `NULL` для событий уровня установки. Удаления проекта в плане нет; если оно появится, журнал проекта удаляется вместе с ним, как и остальные данные проекта. `NO ACTION` не выбран: он сломал бы e2e-тесты, которые удаляют проекты, как только в журнале появятся записи о них.
- `data` — `JsonObject` из `@sowa-chat/protocol`, по умолчанию `{}`. `target_kind` обязателен, `actor_id` и `target_id` могут быть пустыми.

## 28.10.2026, TASK-3. Подписчик журнала аудита

- Внутренние имена: `AuditModule`, `AuditLogListener`, `AuditRecord`, `AuditRule`, `AuditRules`, токен `auditRules`, функция `auditedEventNames`, список `auditedEvents` (`apps/server/src/domain/audit/`), тестовый список `testAuditRules` (`apps/server/test/support/test-audit-rules.ts`).
- Список аудита — объект «имя события → правило». Правило получает данные события и само собирает `projectId`, `actorKind`, `actorId`, `targetKind`, `targetId` и `data`. Данные события целиком в журнал не копируются, поэтому в `data` попадает только то, что правило выбрало явно. Список передаётся через токен `auditRules`, тесты подменяют его через `overrideProvider`.
- Подписка — `DomainEventBus.subscribe` для каждого имени из списка в `onModuleInit`, а не `@OnEvent`: имена берутся из списка, декоратору их не передать. Единственное приведение типа — `Object.keys(rules) as DomainEventName[]` в `auditedEventNames`.
- Запись идёт через `txHost.withTransaction(Propagation.Nested, ...)`: внутри чужой транзакции это точка сохранения. Ошибка записи откатывает только её, ловится и пишется в лог `Audit log write failed` с полями `err` и `action`, без данных события. Откат транзакции действия убирает и запись журнала.
- `AuditModule` подключён в режимах `api`, `worker` и `cli` после `TelemetryModule`.

## 28.10.2026, TASK-1, вопрос исполнителя. Переменные окружения в `domain-event-bus.spec.ts`

- Вопрос: статический импорт `ApiModule`, `WorkerModule`, `CliModule` в тесте падает с `Invalid environment variables`: `ConfigModule.forRoot` с `parseEnv` срабатывает при загрузке, а в `apps/server/vitest.config.ts` переменных нет.
- Решение: `vitest.config.ts` не менять, правится тест. Модули режимов загружаются через `await import(...)` после `stubTestEnv()` в `beforeAll`, как в `zone-servers.spec.ts`. `vi.resetModules()` не вызывается, иначе `TelemetryModule` в `imports` будет другим экземпляром класса. Общий `setupFiles` со стабом окружения отклонён: он скрыл бы ошибки конфигурации в остальных unit-тестах и меняет файл вне задачи.

## Ошибки и параллельность подписчиков

- Ошибка подписчика пробрасывается в `publish` и откатывает действие, как у `subscribe`, так и у `OnDomainEvent`: декоратор вызывает `OnEvent(name, { suppressErrors: false })`.
- `emitAsync` запускает подписчиков параллельно на одном `QueryRunner`, а TypeORM нумерует точки сохранения по `transactionDepth`. Поэтому подписчики одного события не пишут в БД параллельно в общей транзакции, а публикации через `Promise.all` в одной транзакции запрещены: `withTransaction(Propagation.Nested)` в них перемешал бы точки сохранения.
