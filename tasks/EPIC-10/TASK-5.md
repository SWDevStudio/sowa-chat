# EPIC-10 / TASK-5. Разрешённые домены проекта

Исполнитель: haiku
Зависит от: TASK-2
Ветка: feature/EPIC-10

## Что сделать

У проекта два списка разрешённых доменов:
- `allowed_origins` — домены сайта, откуда виджет посетителя ходит в публичную зону (колонка уже есть);
- `operator_allowed_origins` — домены админки, откуда операторы ходят в операторскую зону. Добавить колонку `operator_allowed_origins` (`text[]`, по умолчанию пустой массив, свойство `operatorAllowedOrigins`) миграцией.

Команды:
- `origin:add`, `origin:remove`, `origin:list` с `--project <имя>` и `--origin <origin>` — домены сайта;
- `operator-origin:add`, `operator-origin:remove`, `operator-origin:list` с теми же параметрами — домены админки.

Origin — это схема, хост и необязательный порт без пути: `https://shop.example.com`, `http://localhost:5173`. Значение нормализуется (нижний регистр, без завершающего `/`); путь, query и `*` отклоняются. Повторное добавление того же origin ничего не меняет.

Изменение любого списка публикует событие во внутреннюю шину: позже на него подпишутся сброс кэша и обновление CORS-правил бакета S3.

Добавить в `project:create` необязательный параметр `--operator-origin` (можно несколько), а в `project:list` — вывод обоих списков.

## Где

- `apps/server/src/domain/projects/` — сущность и логика.
- `apps/server/src/infra/database/migrations/`.
- Модуль режима `cli` — команды.

## Требования из плана

- Allowed origins на проект, два отдельных списка: `allowed_origins` — домены сайта для публичной зоны, `operator_allowed_origins` — домены админки для операторской зоны. Домен сайта не получает CORS-доступа к операторскому API, а домен админки — к публичному.
- В development по умолчанию `localhost`, в production — пусто: браузеры не пустят, пока домен не указан явно.
- При изменении доменов сайта через CLI обновляются CORS-правила бакета (эпик хранилища файлов).

## Документация

- https://docs.nestjs.com/recipes/nest-commander
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin

## Критерии приёмки

- `origin:add` с `https://Shop.Example.com/` сохраняет `https://shop.example.com` в `allowed_origins`.
- `operator-origin:add` пишет в `operator_allowed_origins` и не трогает `allowed_origins`.
- `https://a.com/path` и `*` отклоняются обеими командами.
- `remove` удаляет домен, `list` показывает текущий список.

## Чего не делать

- Не реализовывать CORS и обновление бакета.

## История доработок

—
