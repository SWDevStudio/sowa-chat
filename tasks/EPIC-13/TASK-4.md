# EPIC-13 / TASK-4. Посетитель в контексте запроса

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/request-context/request-context.ts, apps/server/src/infra/request-context/request-context.spec.ts
Коммит: [SERVER]: store request visitor in request context
Ветка: feature/EPIC-13

## Что сделать

`RequestContext` (`apps/server/src/infra/request-context/request-context.ts`) хранит проект и оператора запроса в `nestjs-cls`. Добавить посетителя по тому же образцу, что `setOperator` и `operator()`: guard посетителя (TASK-6) записывает его, контроллеры посетителя читают.

1. Ключ CLS: `const visitorKey = "requestVisitor";` рядом с `operatorKey`.
2. Тип:

   ```ts
   export interface RequestVisitor {
     visitorId: string;
   }
   ```

3. Методы:

   ```ts
   setVisitor(visitor: RequestVisitor): void {
     this.cls.set(visitorKey, visitor);
   }

   visitor(): RequestVisitor {
     return this.valueOrThrow<RequestVisitor>(visitorKey, "Request visitor is not set");
   }
   ```

Нет значения — обычный `Error` (500), как у `projectId()` и `operator()`: это пропущенный guard, а не ошибка клиента.

## Где

- `apps/server/src/infra/request-context/request-context.ts`.
- Тест: `apps/server/src/infra/request-context/request-context.spec.ts` — дописать случаи по образцу случаев оператора (файл сейчас 154 строки, после правки должен остаться не длиннее 300).

## Требования из плана

- Посетитель с токеном посетителя может только свои диалоги: контроллеры посетителя берут ID посетителя только из контекста, который заполнил guard по токену.
- Доверять можно только identity из токена.

## Документация

- https://papooch.github.io/nestjs-cls/introduction/quick-start

## Критерии приёмки

- `visitor()` внутри `cls.run` возвращает то, что записал `setVisitor`; повторный `setVisitor` заменяет значение.
- `visitor()` без записи бросает `Request visitor is not set`.
- Проект, оператор и посетитель хранятся независимо: запись посетителя не задаёт оператора и проект, и наоборот; значения не переходят между двумя параллельными `cls.run`.

## Чего не делать

- Не менять `setProjectId`, `projectId`, `setOperator`, `operator` и `RequestContextModule`.

## История доработок

—
