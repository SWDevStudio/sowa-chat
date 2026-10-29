import { describe, expect, it } from "vitest";
import type {
  ApiKeyEvent,
  IdentityKeyEvent,
  ProjectCreatedEvent,
  ProjectOriginsEvent,
  SecretsReencryptedEvent,
} from "../../telemetry/events/domain-events.js";
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

const identityKeyEvent: IdentityKeyEvent = {
  identityKeyId: "identity-key-1",
  projectId: "project-1",
  kid: "main-1",
  alg: "EdDSA",
  actorKind: "cli",
};

describe("auditedEvents identityKey rules", () => {
  it("lists identityKey.added and identityKey.revoked", () => {
    const names = auditedEventNames(auditedEvents);

    expect(names).toContain("identityKey.added");
    expect(names).toContain("identityKey.revoked");
  });

  it.each(["identityKey.added", "identityKey.revoked"] as const)(
    "%s maps cli event to record with identityKey target and kid, alg in data",
    (name) => {
      const rule = auditedEvents[name];

      expect(rule).toBeDefined();
      expect(rule?.(identityKeyEvent)).toEqual({
        projectId: "project-1",
        actorKind: "cli",
        actorId: null,
        targetKind: "identityKey",
        targetId: "identity-key-1",
        data: { kid: "main-1", alg: "EdDSA" },
      });
    },
  );

  it.each(["identityKey.added", "identityKey.revoked"] as const)(
    "%s keeps system actorKind and ES256",
    (name) => {
      const record = auditedEvents[name]?.({
        ...identityKeyEvent,
        alg: "ES256",
        actorKind: "system",
      });

      expect(record).toMatchObject({ actorKind: "system", data: { kid: "main-1", alg: "ES256" } });
    },
  );

  it.each(["identityKey.added", "identityKey.revoked"] as const)(
    "%s data has only kid and alg",
    (name) => {
      const record = auditedEvents[name]?.({
        ...identityKeyEvent,
        publicKey: { kty: "OKP", x: "key-leak" },
      } as IdentityKeyEvent);

      expect(Object.keys(record?.data ?? {}).sort()).toEqual(["alg", "kid"]);
      expect(JSON.stringify(record)).not.toContain("key-leak");
    },
  );

  it("keeps apiKey and project.created rules", () => {
    expect(auditedEventNames(auditedEvents)).toEqual(
      expect.arrayContaining(["apiKey.issued", "apiKey.revoked", "project.created"]),
    );
  });
});

const projectOriginsEvent: ProjectOriginsEvent = {
  projectId: "project-1",
  origins: ["https://shop.example.com", "http://localhost:5173"],
  actorKind: "cli",
};

const originEventNames = [
  "project.allowedOriginsChanged",
  "project.operatorAllowedOriginsChanged",
] as const;

describe("auditedEvents project origins rules", () => {
  it("lists both origin events", () => {
    const names = auditedEventNames(auditedEvents);

    expect(names).toContain("project.allowedOriginsChanged");
    expect(names).toContain("project.operatorAllowedOriginsChanged");
  });

  it.each(originEventNames)(
    "%s maps cli event to record with project target and origins in data",
    (name) => {
      const rule = auditedEvents[name];

      expect(rule).toBeDefined();
      expect(rule?.(projectOriginsEvent)).toEqual({
        projectId: "project-1",
        actorKind: "cli",
        actorId: null,
        targetKind: "project",
        targetId: "project-1",
        data: { origins: ["https://shop.example.com", "http://localhost:5173"] },
      });
    },
  );

  it.each(originEventNames)("%s keeps system actorKind and empty list", (name) => {
    const record = auditedEvents[name]?.({
      projectId: "project-2",
      origins: [],
      actorKind: "system",
    });

    expect(record).toEqual({
      projectId: "project-2",
      actorKind: "system",
      actorId: null,
      targetKind: "project",
      targetId: "project-2",
      data: { origins: [] },
    });
  });

  it.each(originEventNames)("%s data has only origins", (name) => {
    const record = auditedEvents[name]?.({
      ...projectOriginsEvent,
      serverKey: "sk-leak",
    } as ProjectOriginsEvent);

    expect(Object.keys(record?.data ?? {})).toEqual(["origins"]);
    expect(JSON.stringify(record)).not.toContain("sk-leak");
  });

  it("keeps earlier rules", () => {
    expect(auditedEventNames(auditedEvents)).toEqual(
      expect.arrayContaining([
        "apiKey.issued",
        "apiKey.revoked",
        "identityKey.added",
        "identityKey.revoked",
        "project.created",
      ]),
    );
  });
});

const secretsReencryptedEvent: SecretsReencryptedEvent = {
  reencrypted: 12,
  undecryptable: 1,
  actorKind: "cli",
};

describe("auditedEvents secrets.reencrypted rule", () => {
  it("lists secrets.reencrypted", () => {
    expect(auditedEventNames(auditedEvents)).toContain("secrets.reencrypted");
  });

  it("maps cli event to record without project and target id, counts in data", () => {
    const rule = auditedEvents["secrets.reencrypted"];

    expect(rule).toBeDefined();
    expect(rule?.(secretsReencryptedEvent)).toEqual({
      projectId: null,
      actorKind: "cli",
      actorId: null,
      targetKind: "encryptedSecrets",
      targetId: null,
      data: { reencrypted: 12, undecryptable: 1 },
    });
  });

  it("maps zero counts", () => {
    const record = auditedEvents["secrets.reencrypted"]?.({
      ...secretsReencryptedEvent,
      reencrypted: 0,
      undecryptable: 0,
    });

    expect(record?.data).toEqual({ reencrypted: 0, undecryptable: 0 });
  });

  it("data has only reencrypted and undecryptable", () => {
    const record = auditedEvents["secrets.reencrypted"]?.({
      ...secretsReencryptedEvent,
      value: "secret-leak",
      id: "row-leak",
      table: "table-leak",
    } as SecretsReencryptedEvent);

    expect(Object.keys(record?.data ?? {}).sort()).toEqual(["reencrypted", "undecryptable"]);
    expect(JSON.stringify(record)).not.toContain("secret-leak");
    expect(JSON.stringify(record)).not.toContain("row-leak");
    expect(JSON.stringify(record)).not.toContain("table-leak");
  });

  it("keeps earlier rules", () => {
    expect(auditedEventNames(auditedEvents)).toEqual(
      expect.arrayContaining([
        "apiKey.issued",
        "apiKey.revoked",
        "identityKey.added",
        "identityKey.revoked",
        "project.created",
        "project.allowedOriginsChanged",
        "project.operatorAllowedOriginsChanged",
      ]),
    );
  });
});
