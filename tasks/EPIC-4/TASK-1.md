# EPIC-4 / TASK-1. Список зон, декоратор @Zone и зона по номеру порта

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/infra/zones/zone.ts, apps/server/src/infra/zones/zone.decorator.ts, apps/server/src/infra/zones/zone-of-port.ts, apps/server/src/infra/zones/zone.decorator.spec.ts, apps/server/src/infra/zones/zone-of-port.spec.ts
Ветка: feature/EPIC-4

## Что сделать

Общие кирпичики зон, на которые опираются серверы (TASK-2) и guard (TASK-4). Папки `apps/server/src/infra/zones/` ещё нет — создать.

1. `zone.ts` — список зон и типы:

   ```ts
   export const apiZones = ["public", "operator", "internal", "management"] as const;
   export type ApiZone = (typeof apiZones)[number];
   export type ZonePorts = Record<ApiZone, number>;
   ```

   Ключи `ZonePorts` совпадают с ключами объекта `portsConfig` (`apps/server/src/infra/config/ports.config.ts`), поэтому значение `portsConfig` подходит как `ZonePorts` без преобразований. `portsConfig` не менять.

2. `zone.decorator.ts` — декоратор зоны на `SetMetadata` с постоянным ключом:

   ```ts
   export const zoneMetadataKey = "zone";
   export function Zone(zone: ApiZone) {
     return SetMetadata(zoneMetadataKey, zone);
   }
   ```

   Декоратор ставится и на класс контроллера, и на отдельный метод. `Reflector.createDecorator` не использовать: его ключ случаен для каждой загрузки модуля, а тесты загружают модули сервера заново через `vi.resetModules()`, и guard не увидел бы зону контроллера из теста.

3. `zone-of-port.ts` — зона по номеру порта:

   ```ts
   export function zoneOfPort(ports: ZonePorts, port: number | undefined): ApiZone | undefined
   ```

   Возвращает зону, у которой в `ports` этот порт (`apiZones.find(...)`), иначе `undefined`. Порты зон всегда разные — это уже проверяет схема конфига.

## Где

- `apps/server/src/infra/zones/zone.ts`, `apps/server/src/infra/zones/zone.decorator.ts`, `apps/server/src/infra/zones/zone-of-port.ts` — новые файлы.
- Тесты: `apps/server/src/infra/zones/zone-of-port.spec.ts`, `apps/server/src/infra/zones/zone.decorator.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`).

## Требования из плана

| Порт по умолчанию | Зона | Что на нём доступно |
|---|---|---|
| 8080 | публичная (`public`) | `/v1/visitor/*`, WS `/v1/ws` → `/visitor` |
| 8081 | операторская (`operator`) | `/v1/operator/*`, WS `/v1/ws` → `/operator` |
| 8082 | внутренняя (`internal`) | `/v1/server/*`, `/v1/bot/*` |
| 9090 | служебная (`management`) | `/health/*`, `/metrics`, `/status` |

- Контроллеры и WS-namespace помечены зоной (`@Zone('operator')`).
- Порты задаются переменными `SOWA_PUBLIC_PORT`, `SOWA_OPERATOR_PORT`, `SOWA_INTERNAL_PORT` и `SOWA_MANAGEMENT_PORT` — уже есть в `portsConfig`.

## Документация

- https://docs.nestjs.com/custom-decorators
- https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

## Критерии приёмки

- `zoneOfPort({ public: 8080, operator: 8081, internal: 8082, management: 9090 }, порт)` возвращает `public`, `operator`, `internal`, `management` для 8080, 8081, 8082, 9090.
- `zoneOfPort` возвращает `undefined` для порта, которого нет среди портов зон, и для `undefined`.
- `Reflector.get(zoneMetadataKey, Класс)` у класса с `@Zone('operator')` — `operator`; `reflector.getAllAndOverride(zoneMetadataKey, [метод, класс])` у метода с `@Zone('management')` в таком классе — `management`, у метода без декоратора — `operator`.

## Чего не делать

- Не делать серверы, guard и регистрацию в модулях — это TASK-2 и TASK-4.
- Не создавать `index.ts` в папке: barrel-файлы в `apps/server` не используем.

## История доработок

—
