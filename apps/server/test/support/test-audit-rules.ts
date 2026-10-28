import type { AuditRules } from "../../src/domain/audit/audit-rule.js";

export const testAuditRules: AuditRules = {
  "test.happened": (event) => ({
    projectId: event.projectId,
    actorKind: "operator",
    actorId: event.operatorId,
    targetKind: "conversation",
    targetId: event.conversationId,
    data: { deletedMessages: event.deletedMessages },
  }),
};
