# EPIC-13. Сессия посетителя

Этап 0. Фундамент

Анонимный посетитель получает access- и refresh-токены.

Нужны эпики: 9, 12, 15, 19.

Ревью: opus

| № | Задача | Исполнитель | Тесты | Сложность | Зависит от | Статус |
|---|---|---|---|---|---|---|
| 1 | [Таблица `visitor_sessions`: сущность и миграция](TASK-1.md) | haiku | sonnet | обычная | — | готова |
| 2 | [Схемы сессии посетителя в `protocol`](TASK-2.md) | haiku | opus | обычная | — | готова |
| 3 | [Переменная `SOWA_VISITOR_REFRESH_TTL_DAYS`: срок refresh-токена посетителя](TASK-3.md) | haiku | sonnet | простая | — | готова |
| 4 | [Посетитель в контексте запроса](TASK-4.md) | haiku | sonnet | простая | — | готова |
| 5 | [`POST /v1/visitor/session`: создание сессии по `publicKey`](TASK-5.md) | sonnet | opus | обычная | 1, 2, 3 | готова |
| 6 | [Guard посетителя и декоратор `VisitorController`](TASK-6.md) | haiku | opus | обычная | 4, 5 | не начата |
| 7 | [`POST /v1/visitor/session/refresh`: обновление токена и отзыв цепочки при повторе](TASK-7.md) | sonnet | opus | обычная | 5 | не начата |
