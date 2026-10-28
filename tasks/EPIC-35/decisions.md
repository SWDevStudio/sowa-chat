# EPIC-35. Решения

## 28.10.2026, TASK-1. Интерфейсы SDK по схемам 10 и 13

Согласовано с разработчиком. Полный список — PLAN.md, раздел 14, блок «Согласованные правки к схемам». Где схема и блок расходятся, верен блок.

- Заметки по клиенту: `addVisitorNote(visitorId, { text })`, `updateVisitorNote(noteId, { text })`, `deleteVisitorNote(noteId)`.
- `TransferTarget = { operatorId: string } | { bot: string }` и интерфейс `Transferer` в `protocol`. Оператор: `conversation.transfer({ operatorId })` или `conversation.transfer({ bot })`.
- Интерфейс `HistoryLoader` (`loadOlder(options?: { limit?: number })`) в `protocol`. Реализуют `VisitorClient` и `OperatorConversation`. В снимке диалога оператора есть `hasOlder` и `loadingOlder`.
- `VisitorContacts` (`name?`, `email?`, `phone?`) и `VisitorRef = { externalId: string } | { visitorId: string }` — тоже типы `protocol`, их используют bot-sdk и server-sdk.
