import { describe, expect, it } from "vitest";
import type { ApiKeyEvent, ProjectOriginsEvent } from "../../telemetry/events/domain-events.js";
import {
  apiKeyCacheKeys,
  cacheInvalidatedEventNames,
  cacheInvalidationRules,
  projectCacheKeys,
} from "./cache-invalidation-rules.js";
import { cacheKeys } from "./cache-keys.js";

const apiKeyEvent: ApiKeyEvent = {
  apiKeyId: "key-1",
  projectId: "project-1",
  kind: "server",
  prefix: "sk_AbCdEfGhIjKl",
  botId: null,
  actorKind: "cli",
};

const projectEvent: ProjectOriginsEvent = {
  projectId: "p-1",
  origins: ["https://example.com"],
  actorKind: "cli",
};

describe("cacheInvalidationRules", () => {
  it("lists exactly the three invalidating events", () => {
    expect(cacheInvalidatedEventNames(cacheInvalidationRules).sort()).toEqual([
      "apiKey.revoked",
      "project.allowedOriginsChanged",
      "project.operatorAllowedOriginsChanged",
    ]);
  });

  it("does not invalidate on events outside the table", () => {
    const names = cacheInvalidatedEventNames(cacheInvalidationRules);

    expect(names).not.toContain("apiKey.issued");
    expect(names).not.toContain("project.created");
    expect(names).not.toContain("identityKey.revoked");
    expect(names).not.toContain("secrets.reencrypted");
  });

  it("returns an empty list for an empty table", () => {
    expect(cacheInvalidatedEventNames({})).toEqual([]);
  });

  it("drops the api key entry by prefix on apiKey.revoked", () => {
    const rule = cacheInvalidationRules["apiKey.revoked"];

    expect(rule?.(apiKeyEvent)).toEqual([cacheKeys.apiKey("sk_AbCdEfGhIjKl")]);
  });

  it("drops the project entry on both origin events", () => {
    const changed = cacheInvalidationRules["project.allowedOriginsChanged"];
    const operatorChanged = cacheInvalidationRules["project.operatorAllowedOriginsChanged"];

    expect(changed?.(projectEvent)).toEqual([cacheKeys.project("p-1")]);
    expect(operatorChanged?.(projectEvent)).toEqual([cacheKeys.project("p-1")]);
  });
});

describe("apiKeyCacheKeys", () => {
  it("returns only the key of the event prefix", () => {
    expect(apiKeyCacheKeys(apiKeyEvent)).toEqual(["apiKey:sk_AbCdEfGhIjKl"]);
  });

  it("does not use the project id of the event", () => {
    expect(apiKeyCacheKeys(apiKeyEvent).join()).not.toContain(apiKeyEvent.projectId);
  });
});

describe("projectCacheKeys", () => {
  it("returns only the key of the event project", () => {
    expect(projectCacheKeys(projectEvent)).toEqual(["project:p-1"]);
  });

  it("does not return the public key entry", () => {
    expect(projectCacheKeys(projectEvent).join()).not.toContain("projectIdByPublicKey");
  });
});
