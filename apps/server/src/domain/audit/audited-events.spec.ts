import { describe, expect, it } from "vitest";
import type { ApiKeyEvent } from "../../telemetry/events/domain-events.js";
import { auditedEventNames } from "./audit-rule.js";
import { auditedEvents } from "./audited-events.js";

const serverKeyEvent: ApiKeyEvent = {
  apiKeyId: "key-1",
  projectId: "project-1",
  kind: "server",
  prefix: "abc123",
  botId: null,
  actorKind: "cli",
};

const botKeyEvent: ApiKeyEvent = {
  apiKeyId: "key-2",
  projectId: "project-2",
  kind: "bot",
  prefix: "def456",
  botId: "bot-1",
  actorKind: "system",
};

describe("auditedEvents apiKey rules", () => {
  it("lists apiKey.issued and apiKey.revoked", () => {
    const names = auditedEventNames(auditedEvents);

    expect(names).toContain("apiKey.issued");
    expect(names).toContain("apiKey.revoked");
  });

  it.each(["apiKey.issued", "apiKey.revoked"] as const)(
    "%s maps server key event to record",
    (name) => {
      const rule = auditedEvents[name];

      expect(rule).toBeDefined();
      expect(rule?.(serverKeyEvent)).toEqual({
        projectId: "project-1",
        actorKind: "cli",
        actorId: null,
        targetKind: "apiKey",
        targetId: "key-1",
        data: { kind: "server", prefix: "abc123", botId: null },
      });
    },
  );

  it.each(["apiKey.issued", "apiKey.revoked"] as const)(
    "%s maps bot key event to record",
    (name) => {
      expect(auditedEvents[name]?.(botKeyEvent)).toEqual({
        projectId: "project-2",
        actorKind: "system",
        actorId: null,
        targetKind: "apiKey",
        targetId: "key-2",
        data: { kind: "bot", prefix: "def456", botId: "bot-1" },
      });
    },
  );

  it.each(["apiKey.issued", "apiKey.revoked"] as const)(
    "%s data has only kind, prefix, botId",
    (name) => {
      const record = auditedEvents[name]?.({ ...botKeyEvent, secret: "sk-leak" } as ApiKeyEvent);

      expect(Object.keys(record?.data ?? {}).sort()).toEqual(["botId", "kind", "prefix"]);
      expect(JSON.stringify(record)).not.toContain("sk-leak");
    },
  );
});
