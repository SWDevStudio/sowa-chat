import { Test } from "@nestjs/testing";
import type { Mock } from "vitest";
import { runWithoutTransaction } from "../../../test/support/without-transaction.js";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { Operator } from "./operator.entity.js";
import { OperatorsRepository } from "./operators.repository.js";
import {
  OperatorDisabledError,
  OperatorNotFoundError,
  OperatorsService,
  operatorTokenTtlSeconds,
} from "./operators.service.js";

interface Probe {
  service: OperatorsService;
  upsert: Mock;
  sign: Mock;
}

interface BlockProbe {
  service: OperatorsService;
  markDisabled: Mock;
  markEnabled: Mock;
  findByExternalId: Mock;
  publish: Mock;
}

const signedToken = { token: "signed.jwt.token", expiresAt: new Date("2026-10-29T12:15:00Z") };

function operatorRow(overrides: Partial<Operator> = {}): Operator {
  return {
    id: "operator-1",
    projectId: "project-1",
    externalId: "ext-1",
    name: "Alice",
    avatarUrl: null,
    role: "operator",
    maxChats: null,
    disabledAt: null,
    ...overrides,
  };
}

async function createProbe(row: Operator): Promise<Probe> {
  const upsert = vi.fn().mockResolvedValue(row);
  const sign = vi.fn().mockResolvedValue(signedToken);
  const moduleRef = await Test.createTestingModule({
    providers: [
      OperatorsService,
      { provide: OperatorsRepository, useValue: { upsert } },
      { provide: TokensService, useValue: { sign } },
      { provide: DomainEventBus, useValue: { publish: vi.fn() } },
    ],
  }).compile();
  return { service: moduleRef.get(OperatorsService), upsert, sign };
}

async function createBlockProbe(): Promise<BlockProbe> {
  runWithoutTransaction();
  const markDisabled = vi.fn().mockResolvedValue(undefined);
  const markEnabled = vi.fn().mockResolvedValue(undefined);
  const findByExternalId = vi.fn().mockResolvedValue(null);
  const publish = vi.fn().mockResolvedValue(undefined);
  const moduleRef = await Test.createTestingModule({
    providers: [
      OperatorsService,
      { provide: OperatorsRepository, useValue: { markDisabled, markEnabled, findByExternalId } },
      { provide: TokensService, useValue: { sign: vi.fn() } },
      { provide: DomainEventBus, useValue: { publish } },
    ],
  }).compile();
  return {
    service: moduleRef.get(OperatorsService),
    markDisabled,
    markEnabled,
    findByExternalId,
    publish,
  };
}

const blockInput = { projectId: "project-1", externalId: "ext-1", actorKind: "cli" } as const;

const input = {
  projectId: "project-1",
  externalId: "ext-1",
  name: "Alice",
  avatarUrl: "https://example.com/alice.png",
  role: "supervisor" as const,
};

describe("operatorTokenTtlSeconds", () => {
  it("is 15 minutes", () => {
    expect(operatorTokenTtlSeconds).toBe(900);
  });
});

describe("OperatorDisabledError", () => {
  it("is an Error with a fixed message", () => {
    const error = new OperatorDisabledError();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Operator is disabled");
  });
});

describe("OperatorsService.issueToken", () => {
  it("signs an operator token for an active operator and returns it", async () => {
    const { service, sign } = await createProbe(
      operatorRow({ id: "operator-9", projectId: "project-3", role: "supervisor" }),
    );

    const issued = await service.issueToken(input);

    expect(issued).toEqual(signedToken);
    expect(sign).toHaveBeenCalledTimes(1);
    expect(sign).toHaveBeenCalledWith({
      audience: "operator",
      subject: "operator-9",
      claims: { projectId: "project-3", role: "supervisor" },
      ttlSeconds: 900,
    });
  });

  it("takes claims from the stored row, not from the input", async () => {
    const { service, sign } = await createProbe(
      operatorRow({ id: "operator-2", projectId: "project-1", role: "operator" }),
    );

    await service.issueToken({ ...input, role: "supervisor" });

    expect(sign).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "operator-2",
        claims: { projectId: "project-1", role: "operator" },
      }),
    );
  });

  it("passes the profile with avatarUrl to upsert", async () => {
    const { service, upsert } = await createProbe(operatorRow());

    await service.issueToken(input);

    expect(upsert).toHaveBeenCalledWith({
      projectId: "project-1",
      externalId: "ext-1",
      name: "Alice",
      avatarUrl: "https://example.com/alice.png",
      role: "supervisor",
    });
  });

  it("sends avatarUrl null to upsert when the input has none", async () => {
    const { service, upsert } = await createProbe(operatorRow());

    await service.issueToken({
      projectId: "project-1",
      externalId: "ext-1",
      name: "Alice",
      role: "supervisor",
    });

    expect(upsert).toHaveBeenCalledWith({
      projectId: "project-1",
      externalId: "ext-1",
      name: "Alice",
      avatarUrl: null,
      role: "supervisor",
    });
  });

  it("throws OperatorDisabledError and does not sign for a disabled operator", async () => {
    const { service, sign } = await createProbe(
      operatorRow({ disabledAt: new Date("2026-10-01T00:00:00Z") }),
    );

    await expect(service.issueToken(input)).rejects.toBeInstanceOf(OperatorDisabledError);
    expect(sign).not.toHaveBeenCalled();
  });

  it("does not sign when upsert fails", async () => {
    const { service, upsert, sign } = await createProbe(operatorRow());
    upsert.mockRejectedValue(new Error("db down"));

    await expect(service.issueToken(input)).rejects.toThrow("db down");
    expect(sign).not.toHaveBeenCalled();
  });

  it("passes a signing error through", async () => {
    const { service, sign } = await createProbe(operatorRow());
    sign.mockRejectedValue(new Error("SOWA_TOKEN_SIGNING_KEYS is not set"));

    await expect(service.issueToken(input)).rejects.toThrow("SOWA_TOKEN_SIGNING_KEYS is not set");
  });
});

describe("OperatorNotFoundError", () => {
  it("is an Error with the externalId in the message", () => {
    const error = new OperatorNotFoundError("ext-7");

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Operator "ext-7" not found');
  });
});

describe.each([
  { method: "disable", mark: "markDisabled", other: "markEnabled", changed: "disabled" },
  { method: "enable", mark: "markEnabled", other: "markDisabled", changed: "enabled" },
] as const)("OperatorsService.$method", ({ method, mark, other, changed }) => {
  const eventName = `operator.${changed}`;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it(`calls ${mark} with project and externalId, publishes ${eventName} and returns ${changed}`, async () => {
    const probe = await createBlockProbe();
    probe[mark].mockResolvedValue("operator-5");

    const change = await probe.service[method](blockInput);

    expect(change).toBe(changed);
    expect(probe[mark]).toHaveBeenCalledWith("project-1", "ext-1");
    expect(probe[other]).not.toHaveBeenCalled();
    expect(probe.publish).toHaveBeenCalledTimes(1);
    expect(probe.publish).toHaveBeenCalledWith(eventName, {
      operatorId: "operator-5",
      projectId: "project-1",
      externalId: "ext-1",
      actorKind: "cli",
    });
    expect(probe.findByExternalId).not.toHaveBeenCalled();
  });

  it("passes system actorKind to the event", async () => {
    const probe = await createBlockProbe();
    probe[mark].mockResolvedValue("operator-5");

    await probe.service[method]({ ...blockInput, actorKind: "system" });

    expect(probe.publish).toHaveBeenCalledWith(
      eventName,
      expect.objectContaining({ actorKind: "system" }),
    );
  });

  it("returns unchanged without event when the operator exists but the row did not change", async () => {
    const probe = await createBlockProbe();
    probe.findByExternalId.mockResolvedValue(operatorRow());

    const change = await probe.service[method](blockInput);

    expect(change).toBe("unchanged");
    expect(probe.findByExternalId).toHaveBeenCalledWith("project-1", "ext-1");
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("throws OperatorNotFoundError without event when there is no such operator", async () => {
    const probe = await createBlockProbe();

    await expect(probe.service[method](blockInput)).rejects.toThrow(
      new OperatorNotFoundError("ext-1"),
    );
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("passes a repository error through without event", async () => {
    const probe = await createBlockProbe();
    probe[mark].mockRejectedValue(new Error("db down"));

    await expect(probe.service[method](blockInput)).rejects.toThrow("db down");
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("passes an event bus error through", async () => {
    const probe = await createBlockProbe();
    probe[mark].mockResolvedValue("operator-5");
    probe.publish.mockRejectedValue(new Error("bus down"));

    await expect(probe.service[method](blockInput)).rejects.toThrow("bus down");
  });
});
