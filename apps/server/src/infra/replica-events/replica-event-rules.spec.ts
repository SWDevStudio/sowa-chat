import type {
  ApiKeyEvent,
  OperatorBlockEvent,
  ProjectOriginsEvent,
} from "../../telemetry/events/domain-events.js";
import { apiKeyCacheKeys, projectCacheKeys } from "../cache/cache-invalidation-rules.js";
import { cacheKeys } from "../cache/cache-keys.js";
import type { ReplicaEventRule, ReplicaEventRules } from "./replica-event-rules.js";
import { replicaEventNames, replicaEventRules } from "./replica-event-rules.js";
import {
  cacheInvalidateEventSchema,
  operatorReplicaEventSchema,
  replicaEventPatterns,
} from "./replica-events.js";

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

const operatorBlockEvent: OperatorBlockEvent = {
  operatorId: "0b9c7f4e-3a51-4f7e-9d2c-6a8e1b2c3d4e",
  projectId: "5f1e2d3c-4b5a-4c6d-8e7f-9a0b1c2d3e4f",
  externalId: "ext-secret-7f3a",
  actorKind: "cli",
};

const operatorRules = [
  ["operator.disabled", "operatorDisabled"],
  ["operator.enabled", "operatorEnabled"],
] as const;

describe("правила событий реплик для блокировки оператора", () => {
  it("имена событий реплик совпадают с доменными", () => {
    expect(replicaEventPatterns.operatorDisabled).toBe("operator.disabled");
    expect(replicaEventPatterns.operatorEnabled).toBe("operator.enabled");
  });

  it("replicaEventNames содержит operator.disabled и operator.enabled", () => {
    const names = replicaEventNames(replicaEventRules);

    expect(names).toContain("operator.disabled");
    expect(names).toContain("operator.enabled");
    expect(names).toContain("apiKey.revoked");
  });

  it.each(operatorRules)("%s — событие реплик с одним operatorId", (name, patternKey) => {
    const message = replicaEventRules[name]?.(operatorBlockEvent);

    expect(message).toEqual({
      pattern: replicaEventPatterns[patternKey],
      data: { operatorId: operatorBlockEvent.operatorId },
    });
  });

  it.each(operatorRules)("%s — в данных нет externalId, проекта и автора", (name) => {
    const message = replicaEventRules[name]?.(operatorBlockEvent);

    expect(Object.keys(message?.data ?? {})).toEqual(["operatorId"]);
    expect(JSON.stringify(message)).not.toContain(operatorBlockEvent.externalId);
    expect(JSON.stringify(message)).not.toContain(operatorBlockEvent.projectId);
  });

  it.each(operatorRules)("%s — данные проходят схему приёма на репликах", (name) => {
    const message = replicaEventRules[name]?.(operatorBlockEvent);

    expect(operatorReplicaEventSchema.safeParse(message?.data).success).toBe(true);
  });

  it("правила операторов не шлют cache.invalidate и различаются", () => {
    const disabled = replicaEventRules["operator.disabled"]?.(operatorBlockEvent);
    const enabled = replicaEventRules["operator.enabled"]?.(operatorBlockEvent);

    expect(disabled?.pattern).not.toBe(replicaEventPatterns.cacheInvalidate);
    expect(enabled?.pattern).not.toBe(replicaEventPatterns.cacheInvalidate);
    expect(disabled?.pattern).not.toBe(enabled?.pattern);
  });

  it("правило типизировано данными OperatorBlockEvent", () => {
    expectTypeOf<
      Parameters<ReplicaEventRule<"operator.disabled">>[0]
    >().toEqualTypeOf<OperatorBlockEvent>();
    expectTypeOf<
      Parameters<ReplicaEventRule<"operator.enabled">>[0]
    >().toEqualTypeOf<OperatorBlockEvent>();
  });
});

describe("operatorReplicaEventSchema", () => {
  it("принимает UUID и отбрасывает лишние поля", () => {
    const parsed = operatorReplicaEventSchema.safeParse({
      operatorId: operatorBlockEvent.operatorId,
      externalId: "ext-1",
    });

    expect(parsed.success).toBe(true);
    expect(parsed.data).toEqual({ operatorId: operatorBlockEvent.operatorId });
  });

  it.each([
    ["operatorId не UUID", { operatorId: "operator-1" }],
    ["пустой operatorId", { operatorId: "" }],
    ["UUID без дефисов", { operatorId: "0b9c7f4e3a514f7e9d2c6a8e1b2c3d4e" }],
    ["operatorId число", { operatorId: 42 }],
    ["нет operatorId", {}],
    ["null", null],
    ["строка вместо объекта", operatorBlockEvent.operatorId],
  ])("отклоняет: %s", (_name, payload) => {
    expect(operatorReplicaEventSchema.safeParse(payload).success).toBe(false);
  });
});
