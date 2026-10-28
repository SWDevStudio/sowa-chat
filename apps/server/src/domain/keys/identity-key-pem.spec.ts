import { generateKeyPairSync } from "node:crypto";
import type { KeyObject } from "node:crypto";
import { describe, expect, it } from "vitest";
import { InvalidIdentityKeyError, parseIdentityPublicKey } from "./identity-key-pem.js";

const publicKeyRequiredMessage =
  "Identity key file must contain a public key in PEM format (BEGIN PUBLIC KEY)";
const unsupportedKeyMessage = "Unsupported identity key: use Ed25519 or ECDSA P-256";

function publicPem(publicKey: KeyObject): string {
  return publicKey.export({ type: "spki", format: "pem" }).toString();
}

function privatePem(privateKey: KeyObject): string {
  return privateKey.export({ type: "pkcs8", format: "pem" }).toString();
}

function ed25519Pair() {
  return generateKeyPairSync("ed25519");
}

function p256Pair() {
  return generateKeyPairSync("ec", { namedCurve: "prime256v1" });
}

async function captureError(pem: string): Promise<unknown> {
  try {
    await parseIdentityPublicKey(pem);
  } catch (error) {
    return error;
  }
  return undefined;
}

async function expectInvalidKey(pem: string, message: string): Promise<void> {
  const error = await captureError(pem);
  expect(error).toBeInstanceOf(InvalidIdentityKeyError);
  expect(error).toBeInstanceOf(Error);
  expect((error as Error).message).toBe(message);
}

describe("parseIdentityPublicKey with supported keys", () => {
  it("reads an Ed25519 public PEM as EdDSA with an OKP JWK", async () => {
    const { publicKey } = ed25519Pair();
    const nodeJwk = publicKey.export({ format: "jwk" });

    const parsed = await parseIdentityPublicKey(publicPem(publicKey));

    expect(parsed.alg).toBe("EdDSA");
    expect(parsed.publicKey).toEqual({ kty: "OKP", crv: "Ed25519", x: nodeJwk.x });
    expect(Object.keys(parsed.publicKey).sort()).toEqual(["crv", "kty", "x"]);
  });

  it.each(["prime256v1", "P-256"])(
    "reads a P-256 public PEM (curve %s) as ES256 with an EC JWK",
    async (namedCurve) => {
      const { publicKey } = generateKeyPairSync("ec", { namedCurve });
      const nodeJwk = publicKey.export({ format: "jwk" });

      const parsed = await parseIdentityPublicKey(publicPem(publicKey));

      expect(parsed.alg).toBe("ES256");
      expect(parsed.publicKey).toEqual({ kty: "EC", crv: "P-256", x: nodeJwk.x, y: nodeJwk.y });
      expect(Object.keys(parsed.publicKey).sort()).toEqual(["crv", "kty", "x", "y"]);
    },
  );

  it("returns only alg and publicKey", async () => {
    const { publicKey } = ed25519Pair();

    const parsed = await parseIdentityPublicKey(publicPem(publicKey));

    expect(Object.keys(parsed).sort()).toEqual(["alg", "publicKey"]);
  });

  it("puts no private part, kid, alg or use into the JWK", async () => {
    for (const { publicKey } of [ed25519Pair(), p256Pair()]) {
      const parsed = await parseIdentityPublicKey(publicPem(publicKey));

      expect(parsed.publicKey).not.toHaveProperty("d");
      expect(parsed.publicKey).not.toHaveProperty("kid");
      expect(parsed.publicKey).not.toHaveProperty("alg");
      expect(parsed.publicKey).not.toHaveProperty("use");
    }
  });

  it("gives different JWKs for different keys", async () => {
    const first = await parseIdentityPublicKey(publicPem(ed25519Pair().publicKey));
    const second = await parseIdentityPublicKey(publicPem(ed25519Pair().publicKey));

    expect(first.publicKey.x).not.toBe(second.publicKey.x);
  });
});

describe("parseIdentityPublicKey with unsupported algorithms", () => {
  const unsupportedPairs = [
    ["RSA", () => generateKeyPairSync("rsa", { modulusLength: 2048 })],
    ["P-384", () => generateKeyPairSync("ec", { namedCurve: "secp384r1" })],
    ["P-521", () => generateKeyPairSync("ec", { namedCurve: "secp521r1" })],
    ["secp256k1", () => generateKeyPairSync("ec", { namedCurve: "secp256k1" })],
    ["X25519", () => generateKeyPairSync("x25519")],
    ["Ed448", () => generateKeyPairSync("ed448")],
  ] as const;

  it.each(unsupportedPairs)("rejects a %s public PEM", async (_name, createPair) => {
    const { publicKey } = createPair();

    await expectInvalidKey(publicPem(publicKey), unsupportedKeyMessage);
  });
});

describe("parseIdentityPublicKey with private keys", () => {
  it("rejects an Ed25519 private PEM", async () => {
    const pem = privatePem(ed25519Pair().privateKey);
    expect(pem).toContain("-----BEGIN PRIVATE KEY-----");

    await expectInvalidKey(pem, publicKeyRequiredMessage);
  });

  it("rejects a P-256 private PEM in PKCS#8", async () => {
    const pem = privatePem(p256Pair().privateKey);
    expect(pem).toContain("-----BEGIN PRIVATE KEY-----");

    await expectInvalidKey(pem, publicKeyRequiredMessage);
  });

  it("rejects a P-256 private PEM in SEC1", async () => {
    const pem = p256Pair().privateKey.export({ type: "sec1", format: "pem" }).toString();
    expect(pem).toContain("-----BEGIN EC PRIVATE KEY-----");

    await expectInvalidKey(pem, publicKeyRequiredMessage);
  });

  it("rejects an encrypted private PEM", async () => {
    const pem = ed25519Pair()
      .privateKey.export({
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "passphrase",
      })
      .toString();
    expect(pem).toContain("-----BEGIN ENCRYPTED PRIVATE KEY-----");

    await expectInvalidKey(pem, publicKeyRequiredMessage);
  });

  it.each([
    ["Ed25519", ed25519Pair],
    ["P-256", p256Pair],
  ] as const)(
    "rejects a %s public PEM with the private block appended",
    async (_name, createPair) => {
      const { publicKey, privateKey } = createPair();

      await expectInvalidKey(
        publicPem(publicKey) + privatePem(privateKey),
        publicKeyRequiredMessage,
      );
    },
  );

  it("rejects a private block placed before the public block", async () => {
    const { publicKey, privateKey } = ed25519Pair();

    await expectInvalidKey(privatePem(privateKey) + publicPem(publicKey), publicKeyRequiredMessage);
  });

  it("does not put the private key into the error message", async () => {
    const pem = privatePem(ed25519Pair().privateKey);
    const privateBody = pem.split("\n")[1] ?? "";

    const error = await captureError(pem);

    expect(privateBody).not.toBe("");
    expect(String((error as Error).message)).not.toContain(privateBody);
    expect(String((error as Error).stack)).not.toContain(privateBody);
  });
});

describe("parseIdentityPublicKey with broken input", () => {
  it("rejects an empty string", async () => {
    await expectInvalidKey("", publicKeyRequiredMessage);
  });

  it("rejects whitespace only", async () => {
    await expectInvalidKey(" \n\t\n", publicKeyRequiredMessage);
  });

  it("rejects text without a PEM block", async () => {
    await expectInvalidKey("not a key at all", publicKeyRequiredMessage);
  });

  it("rejects a PEM block of another type", async () => {
    const pkcs1 = generateKeyPairSync("rsa", { modulusLength: 2048 })
      .publicKey.export({ type: "pkcs1", format: "pem" })
      .toString();
    expect(pkcs1).toContain("-----BEGIN RSA PUBLIC KEY-----");

    await expectInvalidKey(pkcs1, publicKeyRequiredMessage);
  });

  it("rejects a public key header with a garbage body", async () => {
    const pem = "-----BEGIN PUBLIC KEY-----\nbm90IGEga2V5\n-----END PUBLIC KEY-----\n";

    await expectInvalidKey(pem, publicKeyRequiredMessage);
  });

  it("rejects a truncated public PEM", async () => {
    const pem = publicPem(ed25519Pair().publicKey);
    const truncated = pem.slice(0, pem.indexOf("-----END PUBLIC KEY-----") - 10);

    await expectInvalidKey(truncated, publicKeyRequiredMessage);
  });
});
