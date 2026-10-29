import { Test } from "@nestjs/testing";
import type { Mock } from "vitest";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import type { Operator } from "./operator.entity.js";
import { OperatorsRepository } from "./operators.repository.js";
import {
  OperatorDisabledError,
  OperatorsService,
  operatorTokenTtlSeconds,
} from "./operators.service.js";

interface Probe {
  service: OperatorsService;
  upsert: Mock;
  sign: Mock;
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
    ],
  }).compile();
  return { service: moduleRef.get(OperatorsService), upsert, sign };
}

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
