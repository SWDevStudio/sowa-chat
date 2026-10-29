import { describe, expect, expectTypeOf, it } from "vitest";
import { operatorRoles, operatorTokenRequestSchema, operatorTokenResponseSchema } from "./index.js";
import type { OperatorRole, OperatorTokenRequest, OperatorTokenResponse } from "./index.js";

const validRequest = { externalId: "u-1", name: "Анна", role: "operator" };

describe("operatorRoles", () => {
  it("lists operator and supervisor", () => {
    expect([...operatorRoles]).toEqual(["operator", "supervisor"]);
  });
});

describe("operatorTokenRequestSchema", () => {
  it("accepts request without avatarUrl", () => {
    expect(operatorTokenRequestSchema.parse(validRequest)).toEqual(validRequest);
  });

  it("accepts request with avatarUrl and supervisor role", () => {
    const request = {
      externalId: "u-1",
      name: "Анна",
      avatarUrl: "https://example.com/a.png",
      role: "supervisor",
    };

    expect(operatorTokenRequestSchema.parse(request)).toEqual(request);
  });

  it("accepts http avatarUrl", () => {
    const request = { ...validRequest, avatarUrl: "http://example.com/a.png" };

    expect(operatorTokenRequestSchema.parse(request)).toEqual(request);
  });

  it("trims externalId and name", () => {
    const parsed = operatorTokenRequestSchema.parse({
      ...validRequest,
      externalId: "  u-1  ",
      name: "\t Анна \n",
    });

    expect(parsed).toEqual(validRequest);
  });

  it("drops unknown fields", () => {
    const parsed = operatorTokenRequestSchema.parse({
      ...validRequest,
      maxChats: 5,
      projectId: "p-1",
    });

    expect(parsed).toEqual(validRequest);
    expect(parsed).not.toHaveProperty("maxChats");
    expect(parsed).not.toHaveProperty("projectId");
  });

  it.each(operatorRoles)("accepts role %s", (role) => {
    expect(operatorTokenRequestSchema.parse({ ...validRequest, role }).role).toBe(role);
  });

  it.each(["admin", "Operator", "", "supervisor ", 1, null])("rejects role %j", (role) => {
    expect(operatorTokenRequestSchema.safeParse({ ...validRequest, role }).success).toBe(false);
  });

  it("rejects missing role", () => {
    expect(operatorTokenRequestSchema.safeParse({ externalId: "u-1", name: "Анна" }).success).toBe(
      false,
    );
  });

  it("rejects missing externalId", () => {
    expect(operatorTokenRequestSchema.safeParse({ name: "Анна", role: "operator" }).success).toBe(
      false,
    );
  });

  it("rejects missing name", () => {
    expect(
      operatorTokenRequestSchema.safeParse({ externalId: "u-1", role: "operator" }).success,
    ).toBe(false);
  });

  it.each(["externalId", "name"] as const)("rejects empty %s", (field) => {
    expect(operatorTokenRequestSchema.safeParse({ ...validRequest, [field]: "" }).success).toBe(
      false,
    );
  });

  it.each(["externalId", "name"] as const)("rejects whitespace-only %s", (field) => {
    expect(
      operatorTokenRequestSchema.safeParse({ ...validRequest, [field]: " \t\n " }).success,
    ).toBe(false);
  });

  it.each(["externalId", "name"] as const)("rejects non-string %s", (field) => {
    expect(operatorTokenRequestSchema.safeParse({ ...validRequest, [field]: 1 }).success).toBe(
      false,
    );
  });

  it.each(["externalId", "name"] as const)("accepts %s of 255 characters", (field) => {
    const value = "a".repeat(255);

    expect(operatorTokenRequestSchema.parse({ ...validRequest, [field]: value })[field]).toBe(
      value,
    );
  });

  it.each(["externalId", "name"] as const)("rejects %s of 256 characters", (field) => {
    expect(
      operatorTokenRequestSchema.safeParse({ ...validRequest, [field]: "a".repeat(256) }).success,
    ).toBe(false);
  });

  it.each(["externalId", "name"] as const)("measures %s length after trim", (field) => {
    const value = "a".repeat(255);

    expect(
      operatorTokenRequestSchema.parse({ ...validRequest, [field]: `  ${value}  ` })[field],
    ).toBe(value);
  });

  it.each(["ftp://example.com/a.png", "not a url", "", "javascript:alert(1)", "file:///a.png"])(
    "rejects avatarUrl %j",
    (avatarUrl) => {
      expect(operatorTokenRequestSchema.safeParse({ ...validRequest, avatarUrl }).success).toBe(
        false,
      );
    },
  );

  it("rejects non-string avatarUrl", () => {
    expect(operatorTokenRequestSchema.safeParse({ ...validRequest, avatarUrl: 1 }).success).toBe(
      false,
    );
  });

  it("accepts avatarUrl of 2048 characters", () => {
    const prefix = "https://example.com/";
    const avatarUrl = prefix + "a".repeat(2048 - prefix.length);

    expect(avatarUrl).toHaveLength(2048);
    expect(operatorTokenRequestSchema.parse({ ...validRequest, avatarUrl }).avatarUrl).toBe(
      avatarUrl,
    );
  });

  it("rejects avatarUrl of 2049 characters", () => {
    const prefix = "https://example.com/";
    const avatarUrl = prefix + "a".repeat(2049 - prefix.length);

    expect(avatarUrl).toHaveLength(2049);
    expect(operatorTokenRequestSchema.safeParse({ ...validRequest, avatarUrl }).success).toBe(
      false,
    );
  });

  it("rejects non-object body", () => {
    expect(operatorTokenRequestSchema.safeParse(null).success).toBe(false);
    expect(operatorTokenRequestSchema.safeParse("operator").success).toBe(false);
  });

  it("types", () => {
    expectTypeOf<OperatorTokenRequest["role"]>().toEqualTypeOf<OperatorRole>();
    expectTypeOf<OperatorRole>().toEqualTypeOf<"operator" | "supervisor">();
    expectTypeOf<OperatorTokenRequest["externalId"]>().toEqualTypeOf<string>();
    expectTypeOf<OperatorTokenRequest["name"]>().toEqualTypeOf<string>();
    expectTypeOf<OperatorTokenRequest["avatarUrl"]>().toEqualTypeOf<string | undefined>();
  });
});

describe("operatorTokenResponseSchema", () => {
  const validResponse = { token: "x", expiresAt: "2026-10-29T12:15:00.000Z" };

  it("accepts token and ISO expiresAt", () => {
    expect(operatorTokenResponseSchema.parse(validResponse)).toEqual(validResponse);
  });

  it.each(["tomorrow", "", "2026-10-29", "1793362500000"])("rejects expiresAt %j", (expiresAt) => {
    expect(operatorTokenResponseSchema.safeParse({ ...validResponse, expiresAt }).success).toBe(
      false,
    );
  });

  it("rejects numeric expiresAt", () => {
    expect(
      operatorTokenResponseSchema.safeParse({ ...validResponse, expiresAt: 1793362500000 }).success,
    ).toBe(false);
  });

  it("rejects missing token", () => {
    expect(
      operatorTokenResponseSchema.safeParse({ expiresAt: validResponse.expiresAt }).success,
    ).toBe(false);
  });

  it("rejects missing expiresAt", () => {
    expect(operatorTokenResponseSchema.safeParse({ token: "x" }).success).toBe(false);
  });

  it("rejects non-string token", () => {
    expect(operatorTokenResponseSchema.safeParse({ ...validResponse, token: 1 }).success).toBe(
      false,
    );
  });

  it("types", () => {
    expectTypeOf<OperatorTokenResponse["token"]>().toEqualTypeOf<string>();
    expectTypeOf<OperatorTokenResponse["expiresAt"]>().toEqualTypeOf<string>();
  });
});
