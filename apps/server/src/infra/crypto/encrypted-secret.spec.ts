import {
  formatEncryptedSecret,
  parseEncryptedSecret,
  type EncryptedSecret,
} from "./encrypted-secret.js";

const iv = Buffer.alloc(12, 0xa1);
const ciphertext = Buffer.from("some ciphertext bytes");
const tag = Buffer.alloc(16, 0xfb);

function encode(bytes: Buffer): string {
  return bytes.toString("base64url");
}

function joinParts(...parts: string[]): string {
  return parts.join(".");
}

const validIv = encode(iv);
const validCiphertext = encode(ciphertext);
const validTag = encode(tag);

describe("formatEncryptedSecret", () => {
  it("formats version and base64url parts separated by dots", () => {
    const secret: EncryptedSecret = { version: 1, iv, ciphertext, tag };

    expect(formatEncryptedSecret(secret)).toBe(`v1.${validIv}.${validCiphertext}.${validTag}`);
  });

  it("writes the version as a decimal number without leading zeros", () => {
    expect(formatEncryptedSecret({ version: 2, iv, ciphertext, tag }).startsWith("v2.")).toBe(true);
    expect(formatEncryptedSecret({ version: 10, iv, ciphertext, tag }).startsWith("v10.")).toBe(
      true,
    );
  });

  it("uses base64url without padding", () => {
    const binaryWithSpecialChars = Buffer.from([0xfb, 0xff, 0xfe, 0x3e, 0x3f]);
    const formatted = formatEncryptedSecret({
      version: 1,
      iv,
      ciphertext: binaryWithSpecialChars,
      tag,
    });

    expect(formatted).not.toContain("=");
    expect(formatted).not.toContain("+");
    expect(formatted).not.toContain("/");
    expect(formatted.split(".")[2]).toBe(encode(binaryWithSpecialChars));
  });

  it("keeps an empty ciphertext as an empty part", () => {
    const formatted = formatEncryptedSecret({ version: 1, iv, ciphertext: Buffer.alloc(0), tag });

    expect(formatted).toBe(`v1.${validIv}..${validTag}`);
  });
});

describe("parseEncryptedSecret", () => {
  it("parses a formatted string back", () => {
    const parsed = parseEncryptedSecret(joinParts("v7", validIv, validCiphertext, validTag));

    expect(parsed).toBeDefined();
    expect(parsed?.version).toBe(7);
    expect(parsed?.iv.equals(iv)).toBe(true);
    expect(parsed?.ciphertext.equals(ciphertext)).toBe(true);
    expect(parsed?.tag.equals(tag)).toBe(true);
  });

  it("round-trips with formatEncryptedSecret", () => {
    const secret: EncryptedSecret = { version: 123, iv, ciphertext, tag };
    const parsed = parseEncryptedSecret(formatEncryptedSecret(secret));

    expect(parsed?.version).toBe(123);
    expect(parsed?.iv.equals(iv)).toBe(true);
    expect(parsed?.ciphertext.equals(ciphertext)).toBe(true);
    expect(parsed?.tag.equals(tag)).toBe(true);
  });

  it("accepts an empty ciphertext", () => {
    const parsed = parseEncryptedSecret(joinParts("v1", validIv, "", validTag));

    expect(parsed?.ciphertext.length).toBe(0);
  });

  it.each([
    ["empty string", ""],
    ["no dots", "v1"],
    ["three parts", ["v1", validIv, validTag].join(".")],
    ["five parts", ["v1", validIv, validCiphertext, validTag, validTag].join(".")],
  ])("returns undefined for %s", (_name, value) => {
    expect(parseEncryptedSecret(value)).toBeUndefined();
  });

  it.each(["v0", "v01", "1", "V1", "v", "vx", "v-1", "v1.5", "v 1", "x1"])(
    "returns undefined for version %s",
    (version) => {
      expect(
        parseEncryptedSecret(joinParts(version, validIv, validCiphertext, validTag)),
      ).toBeUndefined();
    },
  );

  it.each([
    ["iv", (part: string) => joinParts("v1", part, validCiphertext, validTag)],
    ["ciphertext", (part: string) => joinParts("v1", validIv, part, validTag)],
    ["tag", (part: string) => joinParts("v1", validIv, validCiphertext, part)],
  ])("returns undefined when %s has characters outside base64url", (_name, build) => {
    const ciphertextInStandardBase64 = Buffer.from([0xfb, 0xff, 0xfe, 0x3e, 0x3f]).toString(
      "base64",
    );

    expect(parseEncryptedSecret(build(`${validIv.slice(0, -1)}+`))).toBeUndefined();
    expect(parseEncryptedSecret(build(`${validIv.slice(0, -1)}/`))).toBeUndefined();
    expect(parseEncryptedSecret(build(`${validIv}=`))).toBeUndefined();
    expect(parseEncryptedSecret(build(`${validIv.slice(0, -1)} `))).toBeUndefined();
    expect(parseEncryptedSecret(build(ciphertextInStandardBase64))).toBeUndefined();
  });

  it.each([0, 11, 13, 16])("returns undefined when iv is %i bytes", (length) => {
    const value = joinParts("v1", encode(Buffer.alloc(length, 1)), validCiphertext, validTag);

    expect(parseEncryptedSecret(value)).toBeUndefined();
  });

  it.each([0, 12, 15, 17])("returns undefined when tag is %i bytes", (length) => {
    const value = joinParts("v1", validIv, validCiphertext, encode(Buffer.alloc(length, 1)));

    expect(parseEncryptedSecret(value)).toBeUndefined();
  });
});
