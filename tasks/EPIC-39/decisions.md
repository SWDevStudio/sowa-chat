# EPIC-39. Решения

## 28.10.2026, TASK-1. Интерфейс server-sdk по схеме 12

Согласовано с разработчиком. Полный список — PLAN.md, раздел 14, блок «Согласованные правки к схемам». Где схема и блок расходятся, верен блок.

- Посетителя указывает `VisitorRef = { externalId: string } | { visitorId: string }` из `protocol`: `updateVisitorData(ref, patch)`, `deleteVisitor(ref)`, `unblockVisitor(ref)`. Server API принимает оба вида id, анонима тоже можно удалить и разблокировать.
- `signIdentity(user, { privateKey, kid, alg })` и `verifyWebhook(request, { secret })` — отдельные функции из точки входа пакета, а не статические методы `ServerClient`. Их можно вызвать без `createServerClient()`.
