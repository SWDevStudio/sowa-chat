# EPIC-50. Решения

## 28.10.2026, TASK-1. Интерфейс bot-sdk по схеме 11

Согласовано с разработчиком. Полный список — PLAN.md, раздел 14, блок «Согласованные правки к схемам». Где схема и блок расходятся, верен блок.

- `ctx.transfer(target)` принимает `TransferTarget = { operatorId: string } | { bot: string }` из `protocol` и реализует интерфейс `Transferer`. Бот может передать диалог конкретному оператору.
- `ctx.history({ beforeSeq?, limit? }): Promise<Message[]>`, `limit` по умолчанию `50`.
- `ctx.updateVisitorContacts({ name?, email?, phone? })` вместо `updateVisitor(contacts)`, тип `VisitorContacts` из `protocol`.
