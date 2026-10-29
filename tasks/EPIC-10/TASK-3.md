# EPIC-10 / TASK-3. Проверка и нормализация origin

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/domain/projects/origin.ts, apps/server/src/domain/projects/origin.spec.ts
Коммит: [SERVER]: add origin normalization for project allowed origins
Ветка: feature/EPIC-10

## Что сделать

Чистые функции без БД: из текста, который ввёл администратор, получить origin для списков разрешённых доменов. Их используют создание проекта (TASK-6) и команды `origin:*` (TASK-12, TASK-13).

`apps/server/src/domain/projects/origin.ts`:

```ts
export class InvalidOriginError extends Error {
  constructor(text: string) {
    super(`Invalid origin "${text}": expected scheme://host[:port] without path, query or wildcard`);
  }
}

export function normalizeOrigin(text: string): string
export function normalizeOrigins(texts: string[]): string[]
```

`normalizeOrigin(text)`:

1. `trimmed = text.trim()`.
2. Если `trimmed` содержит `*`, `?` или `#` — `InvalidOriginError(text)`.
3. `new URL(trimmed)`; если бросает — `InvalidOriginError(text)`.
4. Ошибка, если `url.protocol` не `http:` и не `https:`, если `url.username` или `url.password` не пустые, если `url.pathname` не `/`.
5. Вернуть `url.origin`: хост в нижнем регистре, без порта по умолчанию (`https://a.com:443` → `https://a.com`), без завершающего `/`.

`normalizeOrigins(texts)` — `normalizeOrigin` для каждого и удаление повторов с сохранением порядка первого появления. Первый неверный origin — `InvalidOriginError`.

## Где

- `apps/server/src/domain/projects/origin.ts` — новый файл.
- Тест: `apps/server/src/domain/projects/origin.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`).

## Требования из плана

- Allowed origins на проект, два отдельных списка: `allowed_origins` — домены сайта для публичной зоны, `operator_allowed_origins` — домены админки для операторской зоны. Домен сайта не получает CORS-доступа к операторскому API, а домен админки — к публичному.
- Origin — это схема, хост и необязательный порт без пути: `https://shop.example.com`, `http://localhost:5173`. Путь, query и `*` отклоняются (решение эпика, `tasks/EPIC-10/decisions.md`).

## Документация

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
- https://nodejs.org/api/url.html#the-whatwg-url-api

## Критерии приёмки

- `normalizeOrigin("https://Shop.Example.com/")` — `https://shop.example.com`; `http://localhost:5173` и `https://a.com:8443` не меняются; `https://a.com:443` — `https://a.com`; `" https://a.com "` — `https://a.com`.
- `InvalidOriginError` для `https://a.com/path`, `https://a.com/?x=1`, `https://a.com#x`, `*`, `https://*.a.com`, `ftp://a.com`, `https://user:pass@a.com`, `a.com`, пустой строки.
- `normalizeOrigins(["https://A.com", "https://a.com/", "http://b.com"])` — `["https://a.com", "http://b.com"]`.

## Чего не делать

- Не трогать сущность `Project`, репозиторий и CORS.
- Не создавать `index.ts`.

## История доработок

—
