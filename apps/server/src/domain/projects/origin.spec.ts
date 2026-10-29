import { describe, expect, it } from "vitest";

import { InvalidOriginError, normalizeOrigin, normalizeOrigins } from "./origin.js";

describe("normalizeOrigin", () => {
  it.each([
    ["https://Shop.Example.com/", "https://shop.example.com"],
    ["HTTPS://SHOP.EXAMPLE.COM", "https://shop.example.com"],
    ["https://a.com", "https://a.com"],
    ["http://localhost:5173", "http://localhost:5173"],
    ["https://a.com:8443", "https://a.com:8443"],
    ["https://a.com:443", "https://a.com"],
    ["http://a.com:80", "http://a.com"],
    ["http://a.com:443", "http://a.com:443"],
    ["https://a.com:80", "https://a.com:80"],
    ["  https://a.com  ", "https://a.com"],
    ["\thttps://a.com/\n", "https://a.com"],
    ["http://127.0.0.1:3000", "http://127.0.0.1:3000"],
  ])("normalizes %j to %j", (text, expected) => {
    expect(normalizeOrigin(text)).toBe(expected);
  });

  it.each([
    ["https://a.com/path"],
    ["https://a.com/path/"],
    ["https://a.com/?x=1"],
    ["https://a.com?x=1"],
    ["https://a.com?"],
    ["https://a.com#x"],
    ["https://a.com/#"],
    ["*"],
    ["https://*.a.com"],
    ["https://a.com:*"],
    ["ftp://a.com"],
    ["ws://a.com"],
    ["file:///etc/passwd"],
    ["javascript:alert(1)"],
    ["https://user:pass@a.com"],
    ["https://user@a.com"],
    ["https://:pass@a.com"],
    ["a.com"],
    ["localhost:5173"],
    ["//a.com"],
    ["https://"],
    [""],
    ["   "],
  ])("rejects %j", (text) => {
    expect(() => normalizeOrigin(text)).toThrow(InvalidOriginError);
  });

  it("puts the original text in the error message", () => {
    const text = "https://a.com/path";

    expect(() => normalizeOrigin(text)).toThrow(
      `Invalid origin "${text}": expected scheme://host[:port] without path, query or wildcard`,
    );
  });

  it("keeps untrimmed text in the error message", () => {
    expect(() => normalizeOrigin("  a.com  ")).toThrow('Invalid origin "  a.com  "');
  });

  it("throws an Error subclass", () => {
    expect(new InvalidOriginError("x")).toBeInstanceOf(Error);
  });
});

describe("normalizeOrigins", () => {
  it("normalizes each origin and removes repeats", () => {
    expect(normalizeOrigins(["https://A.com", "https://a.com/", "http://b.com"])).toEqual([
      "https://a.com",
      "http://b.com",
    ]);
  });

  it("keeps the order of first appearance", () => {
    expect(
      normalizeOrigins(["http://b.com", "https://a.com", "http://B.com/", "https://a.com:443"]),
    ).toEqual(["http://b.com", "https://a.com"]);
  });

  it("treats scheme and port as part of the origin", () => {
    expect(normalizeOrigins(["http://a.com", "https://a.com", "https://a.com:8443"])).toEqual([
      "http://a.com",
      "https://a.com",
      "https://a.com:8443",
    ]);
  });

  it("returns an empty list for an empty list", () => {
    expect(normalizeOrigins([])).toEqual([]);
  });

  it("does not change the input list", () => {
    const texts = ["https://A.com", "https://a.com/"];

    normalizeOrigins(texts);

    expect(texts).toEqual(["https://A.com", "https://a.com/"]);
  });

  it("throws InvalidOriginError for the first invalid origin", () => {
    expect(() => normalizeOrigins(["https://a.com", "b.com", "https://c.com/path"])).toThrow(
      'Invalid origin "b.com"',
    );
    expect(() => normalizeOrigins(["https://a.com", "b.com"])).toThrow(InvalidOriginError);
  });
});
