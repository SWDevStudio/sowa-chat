# EPIC-17 / TASK-1. Docker-образ сервера

Исполнитель: sonnet
Зависит от: —
Ветка: feature/EPIC-17

## Что сделать

1. Многоступенчатый `Dockerfile` для `apps/server`, сборка из корня монорепо:
   - ступень сборки: `pnpm install --frozen-lockfile`, сборка `protocol` и сервера;
   - итоговая ступень: только то, что нужно для запуска (production-зависимости через `pnpm deploy` или аналог), без исходников и devDependencies.
2. Базовый образ — минимальный образ Node 24 с фиксированным тегом.
3. В образе есть `ffmpeg` (его использует `worker` для медиа).
4. Процесс работает не от root.
5. Точка входа выбирает режим по аргументу: `docker run image api`, `… worker`, `… migrate`, `… cli <команда>`.
6. Команда `sowa-chat` в `PATH`: `docker compose exec api sowa-chat project:create …` запускает режим `cli`.
7. `.dockerignore` в корне: `node_modules`, `dist`, `.git`, `.env`, `.sowa-dev`, `graphify-out` и т. п.
8. SIGTERM доходит до процесса Node (Node — PID 1 или используется `init`).

## Где

- `apps/server/Dockerfile`, `.dockerignore`.

## Требования из плана

- Один образ работает в режимах `api`, `worker`, `migrate` и `cli`.
- Минимальный базовый образ, процесс не от root.
- `worker` — тот же образ (BullMQ, ffmpeg, sharp).
- Мастер-ключа нет: проекты и ключи создаются через CLI внутри контейнера.

## Документация

- https://docs.nestjs.com/deployment
- https://pnpm.io/docker
- https://docs.docker.com/build/building/multi-stage/

## Критерии приёмки

- `docker build -f apps/server/Dockerfile .` собирает образ.
- `docker run --rm image cli --help` выводит команды.
- `docker run --rm image whoami` (или аналог) показывает не root.
- `ffmpeg -version` внутри образа работает.
- `docker stop` останавливает контейнер `api` без ожидания `SIGKILL`.

## Чего не делать

- Не писать docker-compose — это TASK-2.

## История доработок

—
