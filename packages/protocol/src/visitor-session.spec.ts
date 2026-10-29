import { describe, expect, expectTypeOf, it } from "vitest";
import {
  visitorSessionRefreshRequestSchema,
  visitorSessionRequestSchema,
  visitorSessionResponseSchema,
} from "./index.js";
import type {
  VisitorSessionRefreshRequest,
  VisitorSessionRequest,
  VisitorSessionResponse,
} from "./index.js";

const publicKey = `pk_${"a1B2c3D4e5".repeat(5)}`;
const refreshToken = "Qw-Er_Ty12".repeat(4).concat("Zx9");

const requestCases = [
  {
    name: "visitorSessionRequestSchema",
    schema: visitorSessionRequestSchema,
    field: "publicKey",
    value: publicKey,
  },
  {
    name: "visitorSessionRefreshRequestSchema",
    schema: visitorSessionRefreshRequestSchema,
    field: "refreshToken",
    value: refreshToken,
  },
] as const;

describe.each(requestCases)("$name", ({ schema, field, value }) => {
  it(`accepts ${field}`, () => {
    expect(schema.parse({ [field]: value })).toEqual({ [field]: value });
  });

  it("drops unknown fields", () => {
    const parsed = schema.parse({ [field]: value, projectId: "p-1", visitorId: "v-1" });

    expect(parsed).toEqual({ [field]: value });
    expect(parsed).not.toHaveProperty("projectId");
    expect(parsed).not.toHaveProperty("visitorId");
  });

  it(`rejects missing ${field}`, () => {
    expect(schema.safeParse({}).success).toBe(false);
  });

  it(`rejects empty ${field}`, () => {
    expect(schema.safeParse({ [field]: "" }).success).toBe(false);
  });

  it.each([1, null, true, ["x"], { value: "x" }])(`rejects non-string ${field} %j`, (input) => {
    expect(schema.safeParse({ [field]: input }).success).toBe(false);
  });

  it(`accepts ${field} of 1 character`, () => {
    expect(schema.parse({ [field]: "a" })).toEqual({ [field]: "a" });
  });

  it(`accepts ${field} of 128 characters`, () => {
    const longValue = "a".repeat(128);

    expect(schema.parse({ [field]: longValue })).toEqual({ [field]: longValue });
  });

  it(`rejects ${field} of 129 characters`, () => {
    expect(schema.safeParse({ [field]: "a".repeat(129) }).success).toBe(false);
  });

  it(`keeps whitespace around ${field}`, () => {
    const padded = `  ${value}\t\n`;

    expect(schema.parse({ [field]: padded })).toEqual({ [field]: padded });
  });

  it(`counts whitespace around ${field} in its length`, () => {
    const padded = ` ${"a".repeat(127)} `;

    expect(padded).toHaveLength(129);
    expect(schema.safeParse({ [field]: padded }).success).toBe(false);
  });

  it("rejects non-object body", () => {
    expect(schema.safeParse(null).success).toBe(false);
    expect(schema.safeParse(value).success).toBe(false);
  });
});

describe("visitorSessionRequestSchema", () => {
  it("does not check the pk_ format", () => {
    expect(visitorSessionRequestSchema.parse({ publicKey: "sk_not-a-public-key" })).toEqual({
      publicKey: "sk_not-a-public-key",
    });
  });

  it("does not accept refreshToken instead of publicKey", () => {
    expect(visitorSessionRequestSchema.safeParse({ refreshToken }).success).toBe(false);
  });

  it("types", () => {
    expectTypeOf<VisitorSessionRequest>().toEqualTypeOf<{ publicKey: string }>();
  });
});

describe("visitorSessionRefreshRequestSchema", () => {
  it("does not accept publicKey instead of refreshToken", () => {
    expect(visitorSessionRefreshRequestSchema.safeParse({ publicKey }).success).toBe(false);
  });

  it("types", () => {
    expectTypeOf<VisitorSessionRefreshRequest>().toEqualTypeOf<{ refreshToken: string }>();
  });
});

describe("visitorSessionResponseSchema", () => {
  const validResponse = {
    accessToken: "header.payload.signature",
    accessTokenExpiresAt: new Date().toISOString(),
    refreshToken,
  };

  it("accepts tokens and ISO accessTokenExpiresAt", () => {
    expect(visitorSessionResponseSchema.parse(validResponse)).toEqual(validResponse);
  });

  it("accepts a fixed ISO 8601 accessTokenExpiresAt", () => {
    const response = { ...validResponse, accessTokenExpiresAt: "2026-10-29T13:00:00.000Z" };

    expect(visitorSessionResponseSchema.parse(response)).toEqual(response);
  });

  it.each(["tomorrow", "", "2026-10-29", "1793365200000", "29.10.2026 13:00"])(
    "rejects accessTokenExpiresAt %j",
    (accessTokenExpiresAt) => {
      expect(
        visitorSessionResponseSchema.safeParse({ ...validResponse, accessTokenExpiresAt }).success,
      ).toBe(false);
    },
  );

  it("rejects numeric accessTokenExpiresAt", () => {
    expect(
      visitorSessionResponseSchema.safeParse({
        ...validResponse,
        accessTokenExpiresAt: 1793365200000,
      }).success,
    ).toBe(false);
  });

  it("rejects Date accessTokenExpiresAt", () => {
    expect(
      visitorSessionResponseSchema.safeParse({ ...validResponse, accessTokenExpiresAt: new Date() })
        .success,
    ).toBe(false);
  });

  it.each(["accessToken", "accessTokenExpiresAt", "refreshToken"] as const)(
    "rejects response without %s",
    (field) => {
      const response: Record<string, string> = { ...validResponse };
      delete response[field];

      expect(visitorSessionResponseSchema.safeParse(response).success).toBe(false);
    },
  );

  it.each(["accessToken", "refreshToken"] as const)("rejects non-string %s", (field) => {
    expect(visitorSessionResponseSchema.safeParse({ ...validResponse, [field]: 1 }).success).toBe(
      false,
    );
  });

  it("rejects non-object body", () => {
    expect(visitorSessionResponseSchema.safeParse(null).success).toBe(false);
    expect(visitorSessionResponseSchema.safeParse("token").success).toBe(false);
  });

  it("types", () => {
    expectTypeOf<VisitorSessionResponse>().toEqualTypeOf<{
      accessToken: string;
      accessTokenExpiresAt: string;
      refreshToken: string;
    }>();
  });
});
