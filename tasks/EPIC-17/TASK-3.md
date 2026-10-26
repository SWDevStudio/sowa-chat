# EPIC-17 / TASK-3. docker-compose.dev.yml и pnpm dev:up

Исполнитель: haiku
Зависит от: TASK-2
Ветка: feature/EPIC-17

## Что сделать

Сейчас `deploy/compose/docker-compose.dev.yml` поднимает только инфраструктуру (PostgreSQL, Valkey, SeaweedFS) для `pnpm infra:up`. Его нужно переделать в файл, который дополняет продовый:

1. `docker compose -f docker-compose.yml -f docker-compose.dev.yml up` поднимает весь стек для разработки.
2. Отличия от продового:
   - `SOWA_ENV=development`: проект `main` и ключи создаются сами;
   - образ сервера собирается из исходников монорепо;
   - операторский и внутренний порты открыты на `127.0.0.1`;
   - `redis` — Valkey (как сейчас);
   - volume для файла секретов development (`SOWA_DEV_SECRETS_DIR`).
3. Скрипт `pnpm dev:up` (и `dev:down`) в корневом `package.json`.
4. `pnpm infra:up` продолжает поднимать только PostgreSQL, Valkey и SeaweedFS с портами на `127.0.0.1` — для запуска сервера локально без Docker.

## Где

- `deploy/compose/docker-compose.dev.yml`.
- `package.json` в корне.

## Требования из плана

- `docker-compose.dev.yml` — для разработки и демо, дополняет продовый: `SOWA_ENV=development` (проект и ключи создаются сами), образы собираются из исходников монорепо, операторский и внутренний порты открыты на `127.0.0.1`. Запуск обёрнут в `pnpm dev:up`.
- Playground и демо-бот добавятся в этот файл в своих эпиках.

## Документация

- https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/

## Критерии приёмки

- `pnpm dev:up` на чистой машине поднимает стек, в логах `api` есть ключи проекта `main`.
- Операторский порт доступен на `127.0.0.1` и недоступен снаружи.
- `pnpm infra:up` поднимает только три сервиса инфраструктуры.

## Чего не делать

- Не добавлять playground и демо-ботов.

## История доработок

—
