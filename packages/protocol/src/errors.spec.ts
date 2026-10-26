import { describe, expect, expectTypeOf, it } from "vitest";
import { errorCodes, errorResponseSchema } from "./index.js";
import type { ErrorCode, ErrorResponse } from "./index.js";

const initialCodes = [
  "validationFailed",
  "unauthorized",
  "forbidden",
  "notFound",
  "conflict",
  "payloadTooLarge",
  "rateLimited",
  "internalError",
  "contextInvalid",
] as const;

const validBody = {
  statusCode: 404,
  code: "notFound",
  message: "Conversation not found",
  requestId: "3f2a1b0c-9d8e-4f7a-8b6c-5d4e3f2a1b0c",
};

function isAccepted(value: unknown): boolean {
  return errorResponseSchema.safeParse(value).success;
}

describe("errorCodes", () => {
  it.each(initialCodes)("содержит константу %s", (code) => {
    expect(errorCodes[code]).toBe(code);
  });

  it("все коды в camelCase", () => {
    for (const code of Object.values(errorCodes)) {
      expect(code).toMatch(/^[a-z][a-zA-Z0-9]*$/);
    }
  });

  it("ErrorCode — объединение строк кодов", () => {
    expectTypeOf<(typeof initialCodes)[number]>().toExtend<ErrorCode>();
    expectTypeOf<ErrorCode>().toExtend<string>();
    expectTypeOf<string>().not.toExtend<ErrorCode>();
    expectTypeOf(errorCodes.notFound).toEqualTypeOf<"notFound">();
  });
});

describe("errorResponseSchema", () => {
  it("принимает корректное тело", () => {
    expect(errorResponseSchema.parse(validBody)).toEqual(validBody);
  });

  it("принимает тело с details", () => {
    const body = {
      ...validBody,
      code: "validationFailed",
      details: [{ path: "context.plan", message: "Too long" }],
    };

    expect(errorResponseSchema.parse(body)).toEqual(body);
  });

  it.each(initialCodes)("принимает код %s", (code) => {
    expect(isAccepted({ ...validBody, code })).toBe(true);
  });

  it.each(["somethingElse", "not_found", "NOT_FOUND", ""])(
    "отклоняет неизвестный код %s",
    (code) => {
      expect(isAccepted({ ...validBody, code })).toBe(false);
    },
  );

  it.each(["statusCode", "message", "code"] as const)("отклоняет тело без %s", (field) => {
    const body: Record<string, unknown> = { ...validBody };
    delete body[field];

    expect(isAccepted(body)).toBe(false);
  });

  it("тип ErrorResponse использует ErrorCode", () => {
    expectTypeOf<ErrorResponse["statusCode"]>().toEqualTypeOf<number>();
    expectTypeOf<ErrorResponse["message"]>().toEqualTypeOf<string>();
    expectTypeOf<ErrorResponse["code"]>().toEqualTypeOf<ErrorCode>();
  });
});
