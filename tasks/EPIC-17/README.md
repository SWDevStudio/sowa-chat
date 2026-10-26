# EPIC-17. Docker и docker-compose

Этап 0. Фундамент

Образ и compose-файлы для продакшена и разработки.

Нужны эпики: 11, 6.

| № | Задача | Исполнитель | Зависит от | Статус |
|---|---|---|---|---|
| 1 | [Docker-образ с четырьмя режимами, не от root, с ffmpeg](TASK-1.md) | sonnet | — | не начата |
| 2 | [Продовый `docker-compose.yml`](TASK-2.md) | sonnet | 1 | не начата |
| 3 | [`docker-compose.dev.yml` и `pnpm dev:up`](TASK-3.md) | haiku | 2 | не начата |
| 4 | [Healthcheck, порядок запуска, ротация логов](TASK-4.md) | haiku | 2 | не начата |
| 5 | [Наружу только публичный порт, `--scale api=3` работает](TASK-5.md) | sonnet | 2 | не начата |
