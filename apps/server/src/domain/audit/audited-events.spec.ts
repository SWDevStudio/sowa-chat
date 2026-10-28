import { describe, expect, it } from "vitest";
import type { ApiKeyEvent, ProjectCreatedEvent } from "../../telemetry/events/domain-events.js";
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

const projectCreatedEvent: ProjectCreatedEvent = {
  projectId: "project-1",
  name: "main",
  actorKind: "cli",
};

describe("auditedEvents project.created rule", () => {
  it("lists project.created", () => {
    expect(auditedEventNames(auditedEvents)).toContain("project.created");
  });

  it("maps cli event to record with project target and name in data", () => {
    const rule = auditedEvents["project.created"];

    expect(rule).toBeDefined();
    expect(rule?.(projectCreatedEvent)).toEqual({
      projectId: "project-1",
      actorKind: "cli",
      actorId: null,
      targetKind: "project",
      targetId: "project-1",
      data: { name: "main" },
    });
  });

  it("keeps system actorKind", () => {
    const record = auditedEvents["project.created"]?.({
      projectId: "project-2",
      name: "shop",
      actorKind: "system",
    });

    expect(record).toEqual({
      projectId: "project-2",
      actorKind: "system",
      actorId: null,
      targetKind: "project",
      targetId: "project-2",
      data: { name: "shop" },
    });
  });

  it("data has only name", () => {
    const record = auditedEvents["project.created"]?.({
      ...projectCreatedEvent,
      serverKey: "sk-leak",
      publicKey: "pk-leak",
    } as ProjectCreatedEvent);

    expect(Object.keys(record?.data ?? {})).toEqual(["name"]);
    expect(JSON.stringify(record)).not.toContain("sk-leak");
    expect(JSON.stringify(record)).not.toContain("pk-leak");
  });

  it("keeps apiKey rules", () => {
    const names = auditedEventNames(auditedEvents);

    expect(names).toEqual(
      expect.arrayContaining(["apiKey.issued", "apiKey.revoked", "project.created"]),
    );
  });
});
