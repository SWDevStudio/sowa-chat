# EPIC-17 / TASK-2. Продовый docker-compose.yml

Исполнитель: sonnet
Зависит от: TASK-1
Ветка: feature/EPIC-17

## Что сделать

`deploy/compose/docker-compose.yml` для production и `deploy/compose/.env.example` к нему.

Сервисы:

```
edge         nginx: наружу только публичный порт; операторский и внутренний — внутри сети compose
api          sowa-chat-server (REST + WS), можно --scale api=3
worker       тот же образ, режим worker
migrate      тот же образ, режим migrate: миграции, бакет и его CORS; отрабатывает и завершается до старта api
postgres     POSTGRES_USER / POSTGRES_DB, пароль из SOWA_DB_PASSWORD, volume pgdata
redis        Redis, volume redisdata, AOF, maxmemory-policy noeviction
s3           SeaweedFS из SOWA_S3_IMAGE с фиксированным тегом, volume s3data
```

1. Образ сервера — опубликованный, тег из переменной.
2. `SOWA_ENV=production`.
3. `deploy/compose/nginx.conf`: проксирование публичного порта в `api` с заголовками для WebSocket (`Upgrade`, `Connection`), передачей `X-Forwarded-For` и `X-Request-Id`, таймаутами для долгих соединений. Путь `/storage` проксируется в S3 без изменения заголовков CORS.
4. Postgres, Redis и S3 сидят во внутренней сети без проброшенных портов.
5. Любой компонент можно заменить внешним через compose profiles: если `DATABASE_URL`, `REDIS_URL` или `SOWA_S3_*` указывают на корпоративные сервисы, контейнер не поднимается.
6. PostgreSQL с одним пользователем из `POSTGRES_USER`, без init-скриптов. `api`, `worker` и `migrate` подключаются под ним.

## Где

- `deploy/compose/docker-compose.yml`, `deploy/compose/nginx.conf`, `deploy/compose/.env.example`.

## Требования из плана

- Наружу открыт только `edge`.
- BullMQ требует в Redis `noeviction`, иначе при нехватке памяти Redis может выкинуть ключи очередей.
- Presigned-ссылки подписываются с учётом хоста, поэтому нужен отдельный `SOWA_S3_PUBLIC_URL` вида `https://chat.company.ru/storage`, который проксирует `edge`.
- TLS завершается на `edge` или на корпоративном прокси перед ним. Заголовки для WebSocket в `nginx.conf` прописаны заранее.
- Long-polling как запасной транспорт требует cookie affinity на ingress; SDK начинает сразу с websocket.
- `SOWA_TRUSTED_PROXIES` в compose указывает на адрес `edge`.

## Документация

- https://docs.docker.com/compose/compose-file/
- https://docs.docker.com/compose/how-tos/profiles/
- https://nginx.org/en/docs/http/websocket.html

## Критерии приёмки

- `docker compose -f deploy/compose/docker-compose.yml config` проходит без ошибок.
- С заполненным `.env` стек поднимается, `migrate` завершается с кодом 0 до старта `api`.
- `docker compose ps` показывает опубликованным только порт `edge`.

## Чего не делать

- Не делать `docker-compose.dev.yml` — это TASK-3.
- Не добавлять отдельный сервис для бакета: его готовит `migrate`, шаг добавит эпик хранилища файлов.
- Не добавлять второго пользователя PostgreSQL: готовый SQL для него — в `docs/devops.md`.

## История доработок

—
