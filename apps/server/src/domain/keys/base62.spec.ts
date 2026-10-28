import { describe, expect, it } from "vitest";
import { base62Alphabet, encodeBase62 } from "./base62.js";

describe("encodeBase62", () => {
  it("exposes the base62 alphabet", () => {
    expect(base62Alphabet).toBe("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  });

  it("pads zero to the requested length", () => {
    expect(encodeBase62(0n, 6)).toBe("000000");
  });

  it("encodes the last digit", () => {
    expect(encodeBase62(61n, 2)).toBe("0z");
  });

  it("carries into the next digit", () => {
    expect(encodeBase62(62n, 2)).toBe("10");
  });

  it("encodes the largest value that fits", () => {
    expect(encodeBase62(62n ** 2n - 1n, 2)).toBe("zz");
  });

  it("encodes 32 bytes of 0xff into 43 characters", () => {
    const max = (1n << 256n) - 1n;
    expect(encodeBase62(max, 43)).toHaveLength(43);
  });

  it("throws when the value does not fit", () => {
    expect(() => encodeBase62(62n ** 2n, 2)).toThrow("Value does not fit into base62 length");
    expect(() => encodeBase62(62n, 1)).toThrow("Value does not fit into base62 length");
  });
});
