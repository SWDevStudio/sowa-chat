import type { ApiKeyEvent } from "../../telemetry/events/domain-events.js";
import type { AuditRecord, AuditRules } from "./audit-rule.js";

function apiKeyAuditRecord(event: ApiKeyEvent): AuditRecord {
  return {
    projectId: event.projectId,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "apiKey",
    targetId: event.apiKeyId,
    data: { kind: event.kind, prefix: event.prefix, botId: event.botId },
  };
}

export const auditedEvents: AuditRules = {
  "apiKey.issued": apiKeyAuditRecord,
  "apiKey.revoked": apiKeyAuditRecord,
};
