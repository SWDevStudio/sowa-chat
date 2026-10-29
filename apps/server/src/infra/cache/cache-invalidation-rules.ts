import type {
  ApiKeyEvent,
  DomainEventName,
  DomainEvents,
  ProjectOriginsEvent,
} from "../../telemetry/events/domain-events.js";
import { cacheKeys } from "./cache-keys.js";

export function apiKeyCacheKeys(event: ApiKeyEvent): string[] {
  return [cacheKeys.apiKey(event.prefix)];
}

export function projectCacheKeys(event: ProjectOriginsEvent): string[] {
  return [cacheKeys.project(event.projectId)];
}

export type CacheInvalidationRule<Name extends DomainEventName> = (
  event: DomainEvents[Name],
) => string[];

export type CacheInvalidationRules = {
  [Name in DomainEventName]?: CacheInvalidationRule<Name>;
};

export const cacheInvalidationRules: CacheInvalidationRules = {
  "apiKey.revoked": apiKeyCacheKeys,
  "project.allowedOriginsChanged": projectCacheKeys,
  "project.operatorAllowedOriginsChanged": projectCacheKeys,
};

export function cacheInvalidatedEventNames(rules: CacheInvalidationRules): DomainEventName[] {
  return Object.keys(rules) as DomainEventName[];
}
