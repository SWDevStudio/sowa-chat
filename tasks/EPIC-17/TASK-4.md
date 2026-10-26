# EPIC-17 / TASK-4. Healthcheck, порядок запуска и ротация логов

Исполнитель: haiku
Зависит от: TASK-2
Ветка: feature/EPIC-17

## Что сделать

В `docker-compose.yml`:

1. Healthcheck у `postgres`, `redis`, `s3`, `api` (`/health/ready` на служебном порту) и `edge`.
2. Порядок запуска через `depends_on`:
   - `migrate` ждёт `postgres` в состоянии `service_healthy`;
   - `api` и `worker` ждут `migrate` в состоянии `service_completed_successfully`, а также `redis` и `s3` в состоянии `service_healthy`;
   - `edge` ждёт `api` в состоянии `service_healthy`.
3. Ротация логов у всех сервисов: драйвер `json-file`, `max-size: 10m`, `max-file: 5` (через общий блок `x-logging`).
4. `stop_grace_period` у `api` и `worker` — 60 секунд, чтобы успела пройти корректная остановка.

## Где

- `deploy/compose/docker-compose.yml`.

## Требования из плана

- Порядок запуска задаётся через healthcheck и `depends_on` с `service_healthy` / `service_completed_successfully`.
- Чтобы логи не заполнили диск, в docker-compose включена ротация логов контейнеров (`max-size: 10m`, `max-file: 5`).
- Рекомендуемый `terminationGracePeriodSeconds: 60`.

## Документация

- https://docs.docker.com/compose/how-tos/startup-order/
- https://docs.docker.com/engine/logging/drivers/json-file/

## Критерии приёмки

- При запуске с нуля `api` стартует только после успешного `migrate`.
- Если `migrate` упал, `api` не стартует.
- `docker inspect` контейнеров показывает ротацию логов.

## Чего не делать

- Не менять состав сервисов.

## История доработок

—
