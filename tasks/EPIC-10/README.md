# EPIC-10. CLI

Этап 0. Фундамент

Управление проектами и ключами из командной строки.

Нужны эпики: 9.

Ревью: opus

| № | Задача | Исполнитель | Тесты | Сложность | Зависит от | Статус |
|---|---|---|---|---|---|---|
| 1 | [Логи режима `cli` в stderr, вывод команд в stdout](TASK-1.md) | haiku | sonnet | обычная | — | готова |
| 2 | [Запуск команд nest-commander в режиме `cli`, программа `sowa-chat` и команда `key:generate`](TASK-2.md) | sonnet | sonnet | обычная | 1 | готова |
| 3 | [Проверка и нормализация origin](TASK-3.md) | haiku | sonnet | обычная | — | готова |
| 4 | [Колонка `projects.operator_allowed_origins`](TASK-4.md) | haiku | sonnet | обычная | — | готова |
| 5 | [Разбор публичного PEM identity-ключа: алгоритм и JWK](TASK-5.md) | haiku | opus | обычная | — | готова |
| 6 | [Сервис проектов: создание с `pk_` и `sk_` одной транзакцией, поиск по имени и список](TASK-6.md) | sonnet | opus | обычная | 3, 4 | готова |
| 7 | [Перешифровка секретов: реестр зашифрованных полей и перешифровка пачками](TASK-7.md) | sonnet | opus | обычная | — | готова |
| 8 | [Команды `project:create` и `project:list`](TASK-8.md) | haiku | sonnet | обычная | 2, 6 | готова |
| 9 | [Команды `key:create`, `key:list` и `key:revoke`](TASK-9.md) | sonnet | sonnet | обычная | 8 | готова |
| 10 | [Сервис identity-ключей: добавление, список, отзыв и журнал аудита](TASK-10.md) | sonnet | sonnet | обычная | 5, 6 | готова |
| 11 | [Команды `identity-key:add`, `identity-key:list` и `identity-key:revoke`](TASK-11.md) | haiku | sonnet | обычная | 9, 10 | готова |
| 12 | [Добавление и удаление разрешённых доменов в сервисе проектов](TASK-12.md) | sonnet | sonnet | обычная | 6, 10 | готова |
| 13 | [Команды `origin:*` и `operator-origin:*`](TASK-13.md) | haiku | sonnet | обычная | 11, 12 | готова |
| 14 | [Команда `secrets:reencrypt`: `--dry-run`, итог и журнал аудита](TASK-14.md) | sonnet | sonnet | обычная | 7, 12, 13 | не начата |
