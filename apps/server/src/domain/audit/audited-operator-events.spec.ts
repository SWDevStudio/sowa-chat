import { describe, expect, it } from "vitest";
import type { OperatorBlockEvent } from "../../telemetry/events/domain-events.js";
import { auditedEventNames } from "./audit-rule.js";
import { auditedEvents } from "./audited-events.js";

const operatorEventNames = ["operator.disabled", "operator.enabled"] as const;

const operatorBlockEvent: OperatorBlockEvent = {
  operatorId: "operator-1",
  projectId: "project-1",
  externalId: "ext-1",
  actorKind: "cli",
};

describe("auditedEvents operator block rules", () => {
  it("lists operator.disabled and operator.enabled", () => {
    const names = auditedEventNames(auditedEvents);

    expect(names).toContain("operator.disabled");
    expect(names).toContain("operator.enabled");
  });

  it.each(operatorEventNames)(
    "%s maps cli event to record with operator target and externalId in data",
    (name) => {
      const rule = auditedEvents[name];

      expect(rule).toBeDefined();
      expect(rule?.(operatorBlockEvent)).toEqual({
        projectId: "project-1",
        actorKind: "cli",
        actorId: null,
        targetKind: "operator",
        targetId: "operator-1",
        data: { externalId: "ext-1" },
      });
    },
  );

  it.each(operatorEventNames)("%s keeps system actorKind", (name) => {
    const record = auditedEvents[name]?.({ ...operatorBlockEvent, actorKind: "system" });

    expect(record).toMatchObject({ actorKind: "system", actorId: null });
  });

  it.each(operatorEventNames)("%s data has only externalId", (name) => {
    const record = auditedEvents[name]?.({
      ...operatorBlockEvent,
      name: "name-leak",
      avatarUrl: "avatar-leak",
    } as OperatorBlockEvent);

    expect(Object.keys(record?.data ?? {})).toEqual(["externalId"]);
    expect(JSON.stringify(record)).not.toContain("name-leak");
    expect(JSON.stringify(record)).not.toContain("avatar-leak");
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
        "secrets.reencrypted",
      ]),
    );
  });
});
