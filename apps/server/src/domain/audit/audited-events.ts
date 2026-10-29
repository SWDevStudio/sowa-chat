import type {
  ApiKeyEvent,
  IdentityKeyEvent,
  OperatorBlockEvent,
  ProjectCreatedEvent,
  ProjectOriginsEvent,
  SecretsReencryptedEvent,
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

function projectOriginsAuditRecord(event: ProjectOriginsEvent): AuditRecord {
  return {
    projectId: event.projectId,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "project",
    targetId: event.projectId,
    data: { origins: event.origins },
  };
}

function operatorBlockAuditRecord(event: OperatorBlockEvent): AuditRecord {
  return {
    projectId: event.projectId,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "operator",
    targetId: event.operatorId,
    data: { externalId: event.externalId },
  };
}

function secretsReencryptedAuditRecord(event: SecretsReencryptedEvent): AuditRecord {
  return {
    projectId: null,
    actorKind: event.actorKind,
    actorId: null,
    targetKind: "encryptedSecrets",
    targetId: null,
    data: { reencrypted: event.reencrypted, undecryptable: event.undecryptable },
  };
}

export const auditedEvents: AuditRules = {
  "apiKey.issued": apiKeyAuditRecord,
  "apiKey.revoked": apiKeyAuditRecord,
  "identityKey.added": identityKeyAuditRecord,
  "identityKey.revoked": identityKeyAuditRecord,
  "project.created": projectCreatedAuditRecord,
  "project.allowedOriginsChanged": projectOriginsAuditRecord,
  "project.operatorAllowedOriginsChanged": projectOriginsAuditRecord,
  "operator.disabled": operatorBlockAuditRecord,
  "operator.enabled": operatorBlockAuditRecord,
  "secrets.reencrypted": secretsReencryptedAuditRecord,
};
