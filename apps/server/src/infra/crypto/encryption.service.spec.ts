import { createDecipheriv } from "node:crypto";
import { Global, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { EncryptionKey } from "../config/encryption-keys.schema.js";
import { encryptionConfig } from "../config/encryption.config.js";
import { CryptoModule } from "./crypto.module.js";
import { formatEncryptedSecret, parseEncryptedSecret } from "./encrypted-secret.js";
import { EncryptionService, SecretDecryptionError } from "./encryption.service.js";

const decryptionErrorMessage = "Encrypted secret cannot be decrypted";
const formatPattern = /^v(\d+)\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]*)\.([A-Za-z0-9_-]+)$/;

const key1: EncryptionKey = { version: 1, key: Buffer.alloc(32, 0x11) };
const key2: EncryptionKey = { version: 2, key: Buffer.alloc(32, 0x22) };
const plaintext = "whsec_super-secret-value";

function createService(keys: EncryptionKey[]): EncryptionService {
  return new EncryptionService({ keys });
}

function captureError(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }
  throw new Error("expected action to throw");
}

function expectDecryptionError(service: EncryptionService, value: string): void {
  const error = captureError(() => service.decrypt(value));

  expect(error).toBeInstanceOf(SecretDecryptionError);
  expect(error).toBeInstanceOf(Error);
  expect((error as Error).message).toBe(decryptionErrorMessage);
}

function tamperPart(value: string, partIndex: number): string {
  const parts = value.split(".");
  const bytes = Buffer.from(parts[partIndex], "base64url");
  bytes[0] ^= 0x01;
  parts[partIndex] = bytes.toString("base64url");
  return parts.join(".");
}

describe("EncryptionService.encrypt", () => {
  it("produces v1.<iv>.<ciphertext>.<tag> in base64url", () => {
    const encrypted = createService([key1]).encrypt(plaintext);
    const match = formatPattern.exec(encrypted);

    expect(match).not.toBeNull();
    expect(match?.[1]).toBe("1");
    expect(Buffer.from(match?.[2] ?? "", "base64url")).toHaveLength(12);
    expect(Buffer.from(match?.[4] ?? "", "base64url")).toHaveLength(16);
    expect(encrypted).not.toContain("=");
  });

  it("does not contain the plaintext", () => {
    const encrypted = createService([key1]).encrypt(plaintext);

    expect(encrypted).not.toContain(plaintext);
    expect(encrypted).not.toContain(Buffer.from(plaintext).toString("base64url"));
  });

  it("uses AES-256-GCM with a 16-byte tag over the UTF-8 bytes", () => {
    const encrypted = createService([key1]).encrypt(plaintext);
    const secret = parseEncryptedSecret(encrypted);
    if (secret === undefined) {
      throw new Error("encrypted value is not parseable");
    }

    const decipher = createDecipheriv("aes-256-gcm", key1.key, secret.iv, { authTagLength: 16 });
    decipher.setAuthTag(secret.tag);
    const decrypted = Buffer.concat([
      decipher.update(secret.ciphertext),
      decipher.final(),
    ]).toString("utf8");

    expect(decrypted).toBe(plaintext);
    expect(secret.ciphertext).toHaveLength(Buffer.byteLength(plaintext, "utf8"));
  });

  it("gives different strings and IVs for the same value", () => {
    const service = createService([key1]);
    const first = service.encrypt(plaintext);
    const second = service.encrypt(plaintext);

    expect(first).not.toBe(second);
    expect(first.split(".")[1]).not.toBe(second.split(".")[1]);
  });

  it("encrypts an empty string into an empty ciphertext part", () => {
    const encrypted = createService([key1]).encrypt("");

    expect(encrypted.split(".")[2]).toBe("");
  });

  it("throws when there are no keys", () => {
    const error = captureError(() => createService([]).encrypt(plaintext));

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("SOWA_ENCRYPTION_KEYS is not set");
    expect((error as Error).message).not.toContain(plaintext);
  });
});

describe("EncryptionService.decrypt", () => {
  it.each([
    ["latin text", plaintext],
    ["empty string", ""],
    ["cyrillic and emoji", "Привет, мир 🌍 секрет"],
    ["long text", "x".repeat(10_000)],
  ])("round-trips %s", (_name, value) => {
    const service = createService([key1]);

    expect(service.decrypt(service.encrypt(value))).toBe(value);
  });

  it.each([
    ["iv", 1],
    ["ciphertext", 2],
    ["tag", 3],
  ])("rejects a tampered %s", (_name, partIndex) => {
    const service = createService([key1]);
    const encrypted = service.encrypt(plaintext);

    expectDecryptionError(service, tamperPart(encrypted, partIndex));
  });

  it("rejects a tampered byte in the middle of the ciphertext", () => {
    const service = createService([key1]);
    const secret = parseEncryptedSecret(service.encrypt(plaintext));
    if (secret === undefined) {
      throw new Error("encrypted value is not parseable");
    }
    const ciphertext = Buffer.from(secret.ciphertext);
    ciphertext[ciphertext.length - 1] ^= 0x80;

    expectDecryptionError(service, formatEncryptedSecret({ ...secret, ciphertext }));
  });

  it.each([15, 12, 4])("rejects a tag shortened to %i bytes", (length) => {
    const service = createService([key1]);
    const secret = parseEncryptedSecret(service.encrypt(plaintext));
    if (secret === undefined) {
      throw new Error("encrypted value is not parseable");
    }
    const parts = formatEncryptedSecret(secret).split(".");
    parts[3] = secret.tag.subarray(0, length).toString("base64url");

    expectDecryptionError(service, parts.join("."));
  });

  it("rejects a value encrypted with another key of the same version", () => {
    const otherKey: EncryptionKey = { version: 1, key: Buffer.alloc(32, 0x33) };
    const encrypted = createService([otherKey]).encrypt(plaintext);

    expectDecryptionError(createService([key1]), encrypted);
  });

  it("rejects an unknown key version", () => {
    const encrypted = createService([key1, key2]).encrypt(plaintext);

    expectDecryptionError(createService([key1]), encrypted);
  });

  it("rejects any value when there are no keys", () => {
    const encrypted = createService([key1]).encrypt(plaintext);

    expectDecryptionError(createService([]), encrypted);
  });

  it.each([
    "",
    "not-encrypted",
    plaintext,
    "v1...",
    "v0.AAAAAAAAAAAAAAAA..AAAAAAAAAAAAAAAAAAAAAA",
    "v1.AAAAAAAAAAAAAAAA.AA.AAAAAAAAAAAAAAAAAAAAAA.extra",
    "v1.AAAA+AAAAAAAAAAA..AAAAAAAAAAAAAAAAAAAAAA",
  ])("rejects a malformed value %j", (value) => {
    expectDecryptionError(createService([key1]), value);
  });

  it("keeps the value, version and key out of the error", () => {
    const service = createService([key1, key2]);
    const encrypted = service.encrypt(plaintext);
    const tampered = tamperPart(encrypted, 2);
    const error = captureError(() => service.decrypt(tampered)) as Error;
    const serialized = `${error.message} ${error.stack ?? ""} ${JSON.stringify(error)} ${String(error.cause ?? "")}`;

    expect(error.message).toBe(decryptionErrorMessage);
    expect(serialized).not.toContain(tampered);
    expect(serialized).not.toContain(tampered.split(".")[2]);
    expect(serialized).not.toContain(plaintext);
    expect(serialized).not.toContain(key2.key.toString("base64"));
    expect(serialized).not.toContain(key2.key.toString("hex"));
    expect(error.message).not.toMatch(/v2|version/i);
  });
});

describe("EncryptionService key rotation", () => {
  it("decrypts a value encrypted with keys [1] by a service with keys [1, 2]", () => {
    const encrypted = createService([key1]).encrypt(plaintext);

    expect(encrypted.startsWith("v1.")).toBe(true);
    expect(createService([key1, key2]).decrypt(encrypted)).toBe(plaintext);
  });

  it("encrypts new values with the highest version", () => {
    const service = createService([key1, key2]);
    const encrypted = service.encrypt(plaintext);

    expect(encrypted.startsWith("v2.")).toBe(true);
    expect(service.decrypt(encrypted)).toBe(plaintext);
  });

  it("does not decrypt a v2 value with a service that has only key [1]", () => {
    const encrypted = createService([key1, key2]).encrypt(plaintext);

    expectDecryptionError(createService([key1]), encrypted);
  });

  it("picks the highest version regardless of gaps", () => {
    const key7: EncryptionKey = { version: 7, key: Buffer.alloc(32, 0x77) };
    const service = createService([key2, key7]);
    const encrypted = service.encrypt(plaintext);

    expect(encrypted.startsWith("v7.")).toBe(true);
    expect(service.decrypt(encrypted)).toBe(plaintext);
    expectDecryptionError(createService([key2]), encrypted);
  });
});

@Global()
@Module({
  providers: [{ provide: encryptionConfig.KEY, useValue: { keys: [key1, key2] } }],
  exports: [encryptionConfig.KEY],
})
class TestEncryptionConfigModule {}

describe("CryptoModule", () => {
  it("provides EncryptionService built from encryptionConfig", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestEncryptionConfigModule, CryptoModule],
    }).compile();
    const service = moduleRef.get(EncryptionService);
    const encrypted = service.encrypt(plaintext);

    expect(encrypted.startsWith("v2.")).toBe(true);
    expect(service.decrypt(encrypted)).toBe(plaintext);
    await moduleRef.close();
  });
});
