import type { Request } from "express";
import { bearerToken } from "./bearer-token.js";

interface FakeRequestInput {
  authorization?: string;
  cookies?: Record<string, string>;
  query?: Record<string, string>;
}

function fakeRequest(input: FakeRequestInput = {}): Request {
  const headers: Record<string, string> = {};
  if (input.authorization !== undefined) {
    headers.authorization = input.authorization;
  }
  const readHeader = (name: string) => headers[name.toLowerCase()];
  const request = {
    headers,
    cookies: input.cookies ?? {},
    query: input.query ?? {},
    get: readHeader,
    header: readHeader,
  };
  return request as unknown as Request;
}

describe("bearerToken", () => {
  it("Bearer abc даёт abc", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearer abc" }))).toBe("abc");
  });

  it("bearer abc в нижнем регистре даёт abc", () => {
    expect(bearerToken(fakeRequest({ authorization: "bearer abc" }))).toBe("abc");
  });

  it("BEARER abc в верхнем регистре даёт abc", () => {
    expect(bearerToken(fakeRequest({ authorization: "BEARER abc" }))).toBe("abc");
  });

  it("несколько пробелов после Bearer допустимы", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearer   abc" }))).toBe("abc");
  });

  it("ключ sk_ возвращается без изменений", () => {
    const key = "sk_0123456789abcdefABCDEF0123456789abcdefABCDE_a1B2c3";

    expect(bearerToken(fakeRequest({ authorization: `Bearer ${key}` }))).toBe(key);
  });

  it("нет заголовка authorization — undefined", () => {
    expect(bearerToken(fakeRequest())).toBeUndefined();
  });

  it("пустой заголовок — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "" }))).toBeUndefined();
  });

  it("Basic abc — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "Basic abc" }))).toBeUndefined();
  });

  it("Bearer без значения — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearer" }))).toBeUndefined();
  });

  it("Bearer с пробелом и без значения — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearer " }))).toBeUndefined();
  });

  it("Bearer a b — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearer a b" }))).toBeUndefined();
  });

  it("значение без схемы — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "abc" }))).toBeUndefined();
  });

  it("схема, склеенная со значением, — undefined", () => {
    expect(bearerToken(fakeRequest({ authorization: "Bearerabc" }))).toBeUndefined();
  });

  it("токен в cookie без заголовка не читается", () => {
    const request = fakeRequest({
      cookies: { authorization: "Bearer abc", token: "abc", access_token: "abc" },
    });

    expect(bearerToken(request)).toBeUndefined();
  });

  it("токен в query-параметрах без заголовка не читается", () => {
    const request = fakeRequest({
      query: { authorization: "Bearer abc", token: "abc", access_token: "abc" },
    });

    expect(bearerToken(request)).toBeUndefined();
  });
});
