import type { JsonObject } from "@sowa-chat/protocol";
import type { DomainEventName, DomainEvents } from "../../telemetry/events/domain-events.js";
import { apiKeyCacheKeys, projectCacheKeys } from "../cache/cache-invalidation-rules.js";
import { replicaEventPatterns } from "./replica-events.js";

export interface ReplicaEventMessage {
  pattern: string;
  data: JsonObject;
}

export type ReplicaEventRule<Name extends DomainEventName> = (
  event: DomainEvents[Name],
) => ReplicaEventMessage;

export type ReplicaEventRules = { [Name in DomainEventName]?: ReplicaEventRule<Name> };

function cacheInvalidate(keys: string[]): ReplicaEventMessage {
  return { pattern: replicaEventPatterns.cacheInvalidate, data: { keys } };
}

function operatorBlock(pattern: string, operatorId: string): ReplicaEventMessage {
  return { pattern, data: { operatorId } };
}

export const replicaEventRules: ReplicaEventRules = {
  "apiKey.revoked": (event) => cacheInvalidate(apiKeyCacheKeys(event)),
  "project.allowedOriginsChanged": (event) => cacheInvalidate(projectCacheKeys(event)),
  "project.operatorAllowedOriginsChanged": (event) => cacheInvalidate(projectCacheKeys(event)),
  "operator.disabled": (event) =>
    operatorBlock(replicaEventPatterns.operatorDisabled, event.operatorId),
  "operator.enabled": (event) =>
    operatorBlock(replicaEventPatterns.operatorEnabled, event.operatorId),
};

export function replicaEventNames(rules: ReplicaEventRules): DomainEventName[] {
  return Object.keys(rules) as DomainEventName[];
}
