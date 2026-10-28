import type { JsonObject } from "@sowa-chat/protocol";
import type { DomainEventName, DomainEvents } from "../../telemetry/events/domain-events.js";
import type { ActorKind } from "./actor-kind.js";

export interface AuditRecord {
  projectId: string | null;
  actorKind: ActorKind;
  actorId: string | null;
  targetKind: string;
  targetId: string | null;
  data: JsonObject;
}

export type AuditRule<Name extends DomainEventName> = (event: DomainEvents[Name]) => AuditRecord;

export type AuditRules = { [Name in DomainEventName]?: AuditRule<Name> };

export const auditRules = Symbol("auditRules");

export function auditedEventNames(rules: AuditRules): DomainEventName[] {
  return Object.keys(rules) as DomainEventName[];
}
