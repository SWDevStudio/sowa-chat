# EPIC-5 / TASK-7. Транзакции @Transactional() и образцовый репозиторий проектов

Исполнитель: sonnet
Зависит от: TASK-6
Владеет: apps/server/src/infra/database/database.module.ts, apps/server/src/domain/projects/projects.repository.ts, apps/server/src/domain/projects/projects.module.ts, apps/server/test/support/offline-database.ts, apps/server/test/transactions.e2e-spec.ts
Ветка: feature/EPIC-5

## Что сделать

Подключить `@nestjs-cls/transactional` с адаптером `@nestjs-cls/transactional-adapter-typeorm`. Оба пакета уже в зависимостях.

1. В `DatabaseModule.forRoot` (`apps/server/src/infra/database/database.module.ts`) добавить в `imports` регистрацию плагина:

   ```ts
   ClsModule.registerPlugins([
     new ClsPluginTransactional({
       adapter: new TransactionalAdapterTypeOrm({ dataSourceToken: getDataSourceToken() }),
     }),
   ])
   ```

   Если документация адаптера требует `imports` с модулем, где объявлен DataSource, — добавить по документации. `ClsModule.forRoot` уже подключён глобально в `apps/server/src/infra/cls/app-cls.module.ts`; этот файл не менять. Плагин регистрируется в `DatabaseModule`, а не в `AppClsModule`: режим `migrate` подключает `AppClsModule`, но не базу приложения.
2. Сервис помечается `@Transactional()` из `@nestjs-cls/transactional`, и все репозитории внутри работают в одной транзакции без ручной передачи `EntityManager`. Вложенный вызов метода с `@Transactional()` присоединяется к внешней транзакции (поведение по умолчанию).
3. `apps/server/src/domain/projects/projects.repository.ts` — `ProjectsRepository` (`@Injectable()`), образец для всех следующих репозиториев:
   - в конструктор внедряется `TransactionHost<TransactionalAdapterTypeOrm>`;
   - к базе обращается только через `this.txHost.tx.getRepository(Project)`;
   - `create(input: { name: string }): Promise<Project>` — сохраняет проект и возвращает его с `id`, `allowedOrigins`, `settings`, `createdAt` из базы;
   - `findByName(name: string): Promise<Project | null>`.
4. `apps/server/src/domain/projects/projects.module.ts` — `ProjectsModule`: `providers: [ProjectsRepository]`, `exports: [ProjectsRepository]`. Модули режимов его пока не подключают: подключит эпик CLI.
5. Транзакции работают и вне HTTP-запроса: в режимах `worker` и `cli` нет `ClsMiddleware`, и `@Transactional()` сам открывает контекст.
6. Если unit-тесты с `createProbeApp` падают из-за заглушки DataSource (`withOfflineDatabase` в `apps/server/test/support/offline-database.ts`), дополнить заглушку минимально нужными полями. Подключаться к базе в unit-тестах по-прежнему нельзя.

## Где

- `apps/server/src/infra/database/database.module.ts`.
- `apps/server/src/domain/projects/` — новые `projects.repository.ts`, `projects.module.ts`.
- При необходимости `apps/server/test/support/offline-database.ts`.
- Тест: `apps/server/test/transactions.e2e-spec.ts` — на PostgreSQL из контейнера с применёнными миграциями. Тестовое приложение: `Test.createTestingModule({ imports: [WorkerModule, ProjectsModule], providers: [<тестовый сервис>, <второй тестовый репозиторий>] })` — без HTTP и `ClsMiddleware`, как в режиме `worker`. Второй тестовый репозиторий тоже пишет в `projects` через `TransactionHost`. Тест удаляет созданные им строки.

## Требования из плана

- Транзакции через `nestjs-cls` с плагином `@nestjs-cls/transactional` и адаптером для TypeORM (AsyncLocalStorage).
- Репозитории обращаются к БД только через `TransactionHost` (`txHost.tx`): запрос через обычный `@InjectRepository` молча пройдёт мимо транзакции.
- Только Data Mapper: сущности и репозитории, без Active Record.

## Документация

- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional
- https://papooch.github.io/nestjs-cls/plugins/available-plugins/transactional/typeorm-adapter
- https://docs.nestjs.com/recipes/async-local-storage

## Критерии приёмки

- Метод с `@Transactional()` пишет проект через `ProjectsRepository.create` и второй проект через второй тестовый репозиторий, затем бросает ошибку: в базе нет ни одного из двух проектов.
- Тот же метод без ошибки: оба проекта есть в базе.
- Без `@Transactional()` первая запись сохраняется, даже если после неё брошена ошибка.
- Внешний метод с `@Transactional()` вызывает внутренний метод с `@Transactional()`, который пишет проект, и после возврата из него бросает ошибку: запись внутреннего метода откатывается.
- `ProjectsRepository.findByName` возвращает созданный проект и `null` для неизвестного имени.

## Чего не делать

- Не использовать `@InjectRepository` и `dataSource.getRepository` в репозиториях.
- Не делать базовый репозиторий с подстановкой `project_id` — это эпик изоляции проектов.
- Не менять `apps/server/src/infra/cls/app-cls.module.ts` и `main.ts`.

## История доработок

—
