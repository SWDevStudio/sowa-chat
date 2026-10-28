import { describe, expect, it } from "vitest";
import { base62Alphabet } from "./base62.js";
import { generateKey, keyPrefixes, keyTypes, parseKey } from "./key-format.js";
import type { KeyType } from "./key-format.js";

const bodyLength = 43;
const checksumLength = 6;

function replaceChar(text: string, index: number): string {
  const current = text[index];
  const replacement = base62Alphabet.split("").find((char) => char !== current) ?? "0";
  return text.slice(0, index) + replacement + text.slice(index + 1);
}

describe("key constants", () => {
  it("defines types and prefixes", () => {
    expect(keyTypes).toEqual(["publicKey", "serverKey", "botKey", "webhookSecret"]);
    expect(keyPrefixes).toEqual({
      publicKey: "pk",
      serverKey: "sk",
      botKey: "bk",
      webhookSecret: "whsec",
    });
  });
});

describe.each(keyTypes)("generateKey %s", (type: KeyType) => {
  const prefix = keyPrefixes[type];

  it("has prefix, body, checksum and expected length", () => {
    const key = generateKey(type);
    const parts = key.split("_");
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe(prefix);
    expect(parts[1]).toHaveLength(bodyLength);
    expect(parts[2]).toHaveLength(checksumLength);
    expect(key).toHaveLength(prefix.length + 1 + bodyLength + 1 + checksumLength);
    expect(key).toHaveLength(type === "webhookSecret" ? 56 : 53);
    expect(key).toMatch(/^[A-Za-z]+_[0-9A-Za-z]+_[0-9A-Za-z]+$/);
  });

  it("parses with its own type and builds lookupPrefix", () => {
    const key = generateKey(type);
    const parsed = parseKey(key, type);
    expect(parsed).toEqual({
      type,
      text: key,
      lookupPrefix: `${prefix}_${key.split("_")[1]?.slice(0, 12)}`,
    });
    expect(parsed?.lookupPrefix).toHaveLength(prefix.length + 1 + 12);
  });

  it("generates different keys", () => {
    expect(generateKey(type)).not.toBe(generateKey(type));
  });

  it("rejects any single changed character of body or checksum", () => {
    const key = generateKey(type);
    const start = prefix.length + 1;
    for (let index = start; index < key.length; index += 1) {
      if (key[index] === "_") continue;
      expect(parseKey(replaceChar(key, index), type)).toBeUndefined();
    }
  });

  it("rejects wrong length, extra separator and foreign characters", () => {
    const key = generateKey(type);
    expect(parseKey(key.slice(0, -1), type)).toBeUndefined();
    expect(parseKey(`${key}A`, type)).toBeUndefined();
    expect(parseKey(`${key}_`, type)).toBeUndefined();
    expect(
      parseKey(`${prefix}_${key.slice(prefix.length + 1).replace("_", "__")}`, type),
    ).toBeUndefined();
    expect(
      parseKey(`${key.slice(0, prefix.length + 1)}-${key.slice(prefix.length + 2)}`, type),
    ).toBeUndefined();
    expect(parseKey(`${key.slice(0, -1)}!`, type)).toBeUndefined();
    expect(parseKey("", type)).toBeUndefined();
    expect(parseKey(prefix, type)).toBeUndefined();
    expect(parseKey(`${prefix}_`, type)).toBeUndefined();
  });

  it("rejects the key as another type", () => {
    const key = generateKey(type);
    for (const other of keyTypes) {
      if (other === type) continue;
      expect(parseKey(key, other)).toBeUndefined();
    }
  });
});
