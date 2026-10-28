# EPIC-9 / TASK-3. События аудита apiKey.issued и apiKey.revoked

Исполнитель: haiku
Зависит от: —
Владеет: apps/server/src/telemetry/events/domain-events.ts, apps/server/src/domain/audit/audited-events.ts, apps/server/src/domain/audit/audited-events.spec.ts
Ветка: feature/EPIC-9

## Что сделать

Два доменных события ключей и правила журнала аудита для них. Публиковать события будет сервис ключей (TASK-6), здесь только реестр и правила. Образец правила — `apps/server/test/support/test-audit-rules.ts`.

1. В `apps/server/src/telemetry/events/domain-events.ts` добавить тип данных и два события в интерфейс `DomainEvents`:

   ```ts
   export interface ApiKeyEvent {
     apiKeyId: string;
     projectId: string;
     kind: "server" | "bot";
     prefix: string;
     botId: string | null;
     actorKind: "cli" | "system";
   }

   export interface DomainEvents {
     "apiKey.issued": ApiKeyEvent;
     "apiKey.revoked": ApiKeyEvent;
   }
   ```

   Типы объявляются литералами здесь же: `telemetry` не импортирует `domain` (решение EPIC-8). `prefix` — публичный идентификатор ключа (`lookupPrefix` из TASK-1), не сам ключ.

2. В `apps/server/src/domain/audit/audited-events.ts` добавить в `auditedEvents` правила для обоих событий. Оба правила одинаковые — общая функция `apiKeyAuditRecord(event: ApiKeyEvent): AuditRecord` в том же файле:

   | Поле `AuditRecord` | Значение |
   |---|---|
   | `projectId` | `event.projectId` |
   | `actorKind` | `event.actorKind` |
   | `actorId` | `null` |
   | `targetKind` | `"apiKey"` |
   | `targetId` | `event.apiKeyId` |
   | `data` | `{ kind: event.kind, prefix: event.prefix, botId: event.botId }` |

## Где

- `apps/server/src/telemetry/events/domain-events.ts` — реестр `DomainEvents`.
- `apps/server/src/domain/audit/audited-events.ts` — список `auditedEvents` (`AuditRules` из `apps/server/src/domain/audit/audit-rule.ts`).
- Тест: `apps/server/src/domain/audit/audited-events.spec.ts` (vitest, `pnpm --filter @sowa-chat/server test`).

## Требования из плана

- У всех ключей есть `last_used_at`, создание и отзыв пишутся в журнал аудита.
- `audit_log.data` — без персональных данных; ключ в журнал не попадает, только его публичный `prefix`.
- `action` журнала равно имени события, имена событий — camelCase с точкой (решение EPIC-8).

## Документация

- https://docs.nestjs.com/techniques/events

## Критерии приёмки

- `auditedEventNames(auditedEvents)` содержит `apiKey.issued` и `apiKey.revoked`.
- Правило каждого из двух событий для примера события возвращает запись ровно с полями из таблицы выше.
- В `data` записи нет ключей, кроме `kind`, `prefix` и `botId`.

## Чего не делать

- Не публиковать события и не делать сервис ключей — это TASK-6.
- Не импортировать в `apps/server/src/telemetry/` ничего из `domain` и `api`.
- Не менять `AuditLogListener` и `AuditModule`.

## История доработок

—
