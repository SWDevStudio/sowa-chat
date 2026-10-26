# EPIC-2 / TASK-5. Правила слоёв в dependency-cruiser

Исполнитель: sonnet
Зависит от: TASK-2
Ветка: feature/EPIC-2

## Что сделать

dependency-cruiser уже инициализирован (`apps/server/.dependency-cruiser.cjs`). Нужно добавить в него правила слоёв и запуск проверки.

1. Правила по таблице слоёв ниже: импорт против направления — ошибка.
2. `no-circular` — уровень `error` (сейчас `warn`).
3. Конфиг видит тестовые файлы (`*.spec.ts`, `*.e2e-spec.ts`) и проверяет их по тем же правилам.
4. Скрипт `check-layers` в `apps/server/package.json`, задача `check-layers` в `turbo.json` и скрипт в корневом `package.json`.

## Где

- `apps/server/.dependency-cruiser.cjs`.
- `apps/server/package.json`, `turbo.json`, `package.json`.

## Требования из плана

| Слой | Папки | Может зависеть от |
|---|---|---|
| Вход | `api/*` | `domain`, `telemetry` |
| Логика | `domain/*` | `infra`, `telemetry` |
| Подписчики событий | `realtime`, `bot-hub`, `builtin-bots`, `events`, `jobs`, `abuse` | `domain`, `infra`, `telemetry` |
| Инфраструктура | `infra/*` | — |
| Сквозной | `telemetry` | `infra` |

- Внутри своего слоя зависимости допустимы (например, `domain/messages` → `domain/conversations`), если нет циклов.
- `channels` — адаптеры каналов; по плану их зовёт домен через интерфейс, поэтому `channels` может зависеть от `domain` и `infra`, а `domain` от `channels` — нет.
- Корневые модули режимов и `main.ts` собирают приложение и могут импортировать любой слой.
- Импорт из пакетов монорепо (`@sowa-chat/protocol`) разрешён всем слоям.
- `domain` не вызывает напрямую сокеты, ботов и вебхуки: он публикует событие во внутреннюю шину, а подписчики на него реагируют.

## Документация

- https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md
- https://docs.nestjs.com/fundamentals/circular-dependency

## Критерии приёмки

- Временный импорт из `api` в `domain` роняет `pnpm check-layers`; после удаления импорта проверка проходит.
- Временный цикл между двумя файлами роняет проверку.
- Нарушение в тестовом файле тоже роняет проверку.

## Чего не делать

- Не подключать проверку в хуки Husky и CI — CI появится в отдельном эпике.

## История доработок

—
