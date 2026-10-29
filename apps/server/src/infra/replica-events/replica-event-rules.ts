import type { JsonObject } from "@sowa-chat/protocol";
import type { DomainEventName, DomainEvents } from "../../telemetry/events/domain-events.js";
import {
  cacheInvalidatedEventNames,
  cacheInvalidationRules,
  type CacheInvalidationRule,
} from "../cache/cache-invalidation-rules.js";
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

function cacheInvalidateRule<Name extends DomainEventName>(name: Name): ReplicaEventRule<Name> {
  const rule = cacheInvalidationRules[name] as CacheInvalidationRule<Name>;
  return (event) => cacheInvalidate(rule(event));
}

function cacheInvalidateRules(): ReplicaEventRules {
  const entries = cacheInvalidatedEventNames(cacheInvalidationRules).map((name) => [
    name,
    cacheInvalidateRule(name),
  ]);
  return Object.fromEntries(entries);
}

export const replicaEventRules: ReplicaEventRules = {
  ...cacheInvalidateRules(),
  "operator.disabled": (event) =>
    operatorBlock(replicaEventPatterns.operatorDisabled, event.operatorId),
  "operator.enabled": (event) =>
    operatorBlock(replicaEventPatterns.operatorEnabled, event.operatorId),
};

export function replicaEventNames(rules: ReplicaEventRules): DomainEventName[] {
  return Object.keys(rules) as DomainEventName[];
}
