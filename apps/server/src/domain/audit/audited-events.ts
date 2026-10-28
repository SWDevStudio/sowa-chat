import type {
  ApiKeyEvent,
  IdentityKeyEvent,
  ProjectCreatedEvent,
} from "../../telemetry/events/domain-events.js";
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

function identityKeyAuditRecord(event: IdentityKeyEvent): AuditRecord {
  return {
    projectId: event.projectId,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "identityKey",
    targetId: event.identityKeyId,
    data: { kid: event.kid, alg: event.alg },
  };
}

function projectCreatedAuditRecord(event: ProjectCreatedEvent): AuditRecord {
  return {
    projectId: event.projectId,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "project",
    targetId: event.projectId,
    data: { name: event.name },
  };
}

export const auditedEvents: AuditRules = {
  "apiKey.issued": apiKeyAuditRecord,
  "apiKey.revoked": apiKeyAuditRecord,
  "identityKey.added": identityKeyAuditRecord,
  "identityKey.revoked": identityKeyAuditRecord,
  "project.created": projectCreatedAuditRecord,
};
