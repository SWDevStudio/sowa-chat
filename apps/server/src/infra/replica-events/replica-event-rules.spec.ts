import type { ApiKeyEvent, ProjectOriginsEvent } from "../../telemetry/events/domain-events.js";
import { apiKeyCacheKeys, projectCacheKeys } from "../cache/cache-invalidation-rules.js";
import { cacheKeys } from "../cache/cache-keys.js";
import type { ReplicaEventRule, ReplicaEventRules } from "./replica-event-rules.js";
import { replicaEventNames, replicaEventRules } from "./replica-event-rules.js";
import { cacheInvalidateEventSchema, replicaEventPatterns } from "./replica-events.js";

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

const projectOriginEvents = [
  "project.allowedOriginsChanged",
  "project.operatorAllowedOriginsChanged",
] as const;

describe("replicaEventNames", () => {
  it("содержит три события, которые сбрасывают кэш", () => {
    const names = replicaEventNames(replicaEventRules);

    expect(names).toContain("apiKey.revoked");
    expect(names).toContain("project.allowedOriginsChanged");
    expect(names).toContain("project.operatorAllowedOriginsChanged");
  });

  it("не содержит событий вне таблицы", () => {
    const names = replicaEventNames(replicaEventRules);

    expect(names).not.toContain("apiKey.issued");
    expect(names).not.toContain("project.created");
    expect(names).not.toContain("identityKey.added");
    expect(names).not.toContain("identityKey.revoked");
    expect(names).not.toContain("secrets.reencrypted");
  });

  it("пустая таблица — пустой список", () => {
    expect(replicaEventNames({})).toEqual([]);
  });

  it("возвращает события переданной таблицы, а не общей", () => {
    const rules: ReplicaEventRules = {
      "apiKey.issued": () => ({ pattern: "test.pattern", data: {} }),
    };

    expect(replicaEventNames(rules)).toEqual(["apiKey.issued"]);
  });
});

describe("replicaEventRules", () => {
  it("apiKey.revoked — cache.invalidate с ключом записи по prefix", () => {
    const message = replicaEventRules["apiKey.revoked"]?.(apiKeyEvent);

    expect(message).toEqual({
      pattern: "cache.invalidate",
      data: { keys: [cacheKeys.apiKey("sk_AbCdEfGhIjKl")] },
    });
  });

  it("ключи apiKey.revoked совпадают с apiKeyCacheKeys", () => {
    const message = replicaEventRules["apiKey.revoked"]?.(apiKeyEvent);

    expect(message?.data).toEqual({ keys: apiKeyCacheKeys(apiKeyEvent) });
  });

  it.each(projectOriginEvents)("%s — cache.invalidate с ключом снимка проекта", (name) => {
    const message = replicaEventRules[name]?.(projectEvent);

    expect(message).toEqual({
      pattern: "cache.invalidate",
      data: { keys: [cacheKeys.project("p-1")] },
    });
    expect(message?.data).toEqual({ keys: projectCacheKeys(projectEvent) });
  });

  it.each(projectOriginEvents)("%s не сбрасывает запись по publicKey", (name) => {
    const message = replicaEventRules[name]?.(projectEvent);

    expect(JSON.stringify(message)).not.toContain("projectIdByPublicKey");
  });

  it("имя события берётся из replicaEventPatterns", () => {
    const message = replicaEventRules["apiKey.revoked"]?.(apiKeyEvent);

    expect(message?.pattern).toBe(replicaEventPatterns.cacheInvalidate);
  });

  it("данные проходят схему приёма cache.invalidate на репликах", () => {
    const messages = [
      replicaEventRules["apiKey.revoked"]?.(apiKeyEvent),
      replicaEventRules["project.allowedOriginsChanged"]?.(projectEvent),
      replicaEventRules["project.operatorAllowedOriginsChanged"]?.(projectEvent),
    ];

    for (const message of messages) {
      expect(cacheInvalidateEventSchema.safeParse(message?.data).success).toBe(true);
    }
  });

  it("в данных только keys, без полей доменного события", () => {
    const apiKeyMessage = replicaEventRules["apiKey.revoked"]?.(apiKeyEvent);
    const projectMessage = replicaEventRules["project.allowedOriginsChanged"]?.(projectEvent);

    expect(Object.keys(apiKeyMessage?.data ?? {})).toEqual(["keys"]);
    expect(Object.keys(projectMessage?.data ?? {})).toEqual(["keys"]);
    expect(JSON.stringify(apiKeyMessage)).not.toContain(apiKeyEvent.apiKeyId);
    expect(JSON.stringify(projectMessage)).not.toContain("https://example.com");
  });

  it("правило типизировано данными своего доменного события", () => {
    expectTypeOf<Parameters<ReplicaEventRule<"apiKey.revoked">>[0]>().toEqualTypeOf<ApiKeyEvent>();
    expectTypeOf<
      Parameters<ReplicaEventRule<"project.allowedOriginsChanged">>[0]
    >().toEqualTypeOf<ProjectOriginsEvent>();
  });
});
