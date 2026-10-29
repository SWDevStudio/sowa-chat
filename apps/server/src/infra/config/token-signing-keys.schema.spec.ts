import { sign, verify } from "node:crypto";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { envSchema } from "./env.schema.js";
import { tokenSigningKeysSchema } from "./token-signing-keys.schema.js";

const requiredEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_ENV: "development",
};

const key1 = "MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";
const key2 = "MC4CAQAwBQYDK2VwBCIEICAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/";
const x25519Key = "MC4CAQAwBQYDK2VuBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";

function parseKeys(value: string) {
  return envSchema.safeParse({ ...requiredEnv, SOWA_TOKEN_SIGNING_KEYS: value });
}

function parseKeyId(env: Record<string, string>) {
  return envSchema.safeParse({ ...requiredEnv, ...env });
}

function describeErrors(result: { success: boolean; error?: { issues: unknown[] } }): string {
  if (result.success) {
    return "";
  }
  const issues = result.error?.issues as { path: PropertyKey[]; message: string }[];
  return issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe("tokenSigningKeysSchema", () => {
  it("разбирает два ключа в том же порядке", () => {
    const keys = tokenSigningKeysSchema.parse(`test-1:${key1},test-2:${key2}`);

    expect(keys?.map((item) => item.kid)).toEqual(["test-1", "test-2"]);
  });

  it("не сортирует ключи", () => {
    const keys = tokenSigningKeysSchema.parse(`test-2:${key2},test-1:${key1}`);

    expect(keys?.map((item) => item.kid)).toEqual(["test-2", "test-1"]);
  });

  it("создаёт приватный и публичный KeyObject Ed25519", () => {
    const keys = tokenSigningKeysSchema.parse(`test-1:${key1},test-2:${key2}`);

    expect(keys).toHaveLength(2);
    for (const item of keys ?? []) {
      expect(item.privateKey.type).toBe("private");
      expect(item.privateKey.asymmetricKeyType).toBe("ed25519");
      expect(item.publicKey.type).toBe("public");
      expect(item.publicKey.asymmetricKeyType).toBe("ed25519");
    }
  });

  it("приватный ключ совпадает с байтами из строки", () => {
    const keys = tokenSigningKeysSchema.parse(`test-1:${key1}`);

    expect(keys?.[0]?.privateKey.export({ format: "der", type: "pkcs8" })).toEqual(
      Buffer.from(key1, "base64"),
    );
  });

  it("публичный ключ проверяет подпись приватного ключа той же пары", () => {
    const keys = tokenSigningKeysSchema.parse(`test-1:${key1},test-2:${key2}`);
    const data = Buffer.from("payload");
    const first = keys?.[0];
    const second = keys?.[1];
    if (!first || !second) {
      throw new Error("keys are missing");
    }

    const signature = sign(null, data, first.privateKey);

    expect(verify(null, data, first.publicKey, signature)).toBe(true);
    expect(verify(null, data, second.publicKey, signature)).toBe(false);
  });

  it("принимает kid длиной 1 и 64 символа и символы _ и -", () => {
    const longKid = "a".repeat(64);
    const keys = tokenSigningKeysSchema.parse(`k:${key1},${longKid}:${key2},A_b-9:${key1}`);

    expect(keys?.map((item) => item.kid)).toEqual(["k", longKid, "A_b-9"]);
  });

  it("пустая строка и отсутствие дают undefined", () => {
    expect(tokenSigningKeysSchema.parse("")).toBeUndefined();
    expect(tokenSigningKeysSchema.parse(undefined)).toBeUndefined();
  });
});

describe("envSchema: SOWA_TOKEN_SIGNING_KEYS", () => {
  it("без переменных принимает окружение development", () => {
    const result = envSchema.safeParse(requiredEnv);

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEYS).toBeUndefined();
    expect(result.data?.SOWA_TOKEN_SIGNING_KEY_ID).toBeUndefined();
  });

  it("пустые строки принимаются как отсутствие", () => {
    const result = parseKeyId({ SOWA_TOKEN_SIGNING_KEYS: "", SOWA_TOKEN_SIGNING_KEY_ID: "" });

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEYS).toBeUndefined();
    expect(result.data?.SOWA_TOKEN_SIGNING_KEY_ID).toBeUndefined();
  });

  it("два ключа и текущий kid попадают в результат", () => {
    const result = parseKeyId({
      SOWA_TOKEN_SIGNING_KEYS: `test-1:${key1},test-2:${key2}`,
      SOWA_TOKEN_SIGNING_KEY_ID: "test-2",
    });

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEYS?.map((item) => item.kid)).toEqual([
      "test-1",
      "test-2",
    ]);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEY_ID).toBe("test-2");
  });

  const notBase64 = "!".repeat(64);
  const notDer = Buffer.alloc(48, 1).toString("base64");
  const urlSafeKey = key2.replace("/", "_");
  const keyWithNewline = `${key1}\n`;

  it.each([
    { name: "ключ не base64", value: `test-1:${notBase64}`, secret: notBase64 },
    { name: "ключ не PKCS8 DER", value: `test-1:${notDer}`, secret: notDer },
    { name: "ключ X25519", value: `test-1:${x25519Key}`, secret: x25519Key },
    { name: "ключ в url-safe base64", value: `test-1:${urlSafeKey}`, secret: urlSafeKey },
    { name: "ключ с переводом строки", value: `test-1:${keyWithNewline}`, secret: key1 },
  ])("$name отклоняется без значения ключа в ошибке", ({ value, secret }) => {
    const result = parseKeys(value);
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).toContain(
      "key of kid test-1 must be an Ed25519 private key in PKCS8 DER base64",
    );
    expect(errors).not.toContain(secret);
  });

  it("второй ключ не Ed25519 называет свой kid", () => {
    const errors = describeErrors(parseKeys(`test-1:${key1},test-2:${x25519Key}`));

    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).toContain(
      "key of kid test-2 must be an Ed25519 private key in PKCS8 DER base64",
    );
    expect(errors).not.toContain("kid test-1");
    expect(errors).not.toContain(x25519Key);
    expect(errors).not.toContain(key1);
  });

  it.each([
    key1,
    `test-1${key1}`,
    `test-1:${key1},${key2}`,
    `test-1:${key1},`,
    `test-1:${key1}:x`,
    `,test-1:${key1}`,
  ])("элемент не вида kid:ключ (%#) отклоняется", (value) => {
    const result = parseKeys(value);
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).toContain("must be a comma-separated list of kid:key");
    expect(errors).not.toContain(key1);
    expect(errors).not.toContain(key2);
  });

  it.each([
    { name: "kid с пробелом", kid: "bad kid" },
    { name: "kid длиннее 64 символов", kid: "a".repeat(65) },
    { name: "kid с точкой", kid: "a.b" },
    { name: "kid с кириллицей", kid: "ключ" },
  ])("$name отклоняется", ({ kid }) => {
    const result = parseKeys(`${kid}:${key1}`);
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).toContain("kid must be 1-64 characters: letters, digits, _ or -");
    expect(errors).not.toContain(key1);
  });

  it("повтор kid отклоняется", () => {
    const result = parseKeys(`test-1:${key1},test-1:${key2}`);
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).toContain("kid test-1 is repeated");
    expect(errors).not.toContain(key1);
    expect(errors).not.toContain(key2);
  });
});

describe("envSchema: SOWA_TOKEN_SIGNING_KEY_ID", () => {
  const keys = `test-1:${key1},test-2:${key2}`;

  it("ключи без SOWA_TOKEN_SIGNING_KEY_ID отклоняются", () => {
    const result = parseKeyId({ SOWA_TOKEN_SIGNING_KEYS: keys });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain(
      "SOWA_TOKEN_SIGNING_KEY_ID: is required when SOWA_TOKEN_SIGNING_KEYS is set",
    );
  });

  it("ключи с пустым SOWA_TOKEN_SIGNING_KEY_ID отклоняются", () => {
    const result = parseKeyId({ SOWA_TOKEN_SIGNING_KEYS: keys, SOWA_TOKEN_SIGNING_KEY_ID: "" });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain(
      "SOWA_TOKEN_SIGNING_KEY_ID: is required when SOWA_TOKEN_SIGNING_KEYS is set",
    );
  });

  it("kid, которого нет среди ключей, отклоняется", () => {
    const result = parseKeyId({
      SOWA_TOKEN_SIGNING_KEYS: keys,
      SOWA_TOKEN_SIGNING_KEY_ID: "test-3",
    });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain(
      "SOWA_TOKEN_SIGNING_KEY_ID: must be one of the kids in SOWA_TOKEN_SIGNING_KEYS",
    );
  });

  it("kid без ключей отклоняется", () => {
    const result = parseKeyId({ SOWA_TOKEN_SIGNING_KEY_ID: "test-1" });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain(
      "SOWA_TOKEN_SIGNING_KEY_ID: must be one of the kids in SOWA_TOKEN_SIGNING_KEYS",
    );
  });

  it("kid с пустыми ключами отклоняется", () => {
    const result = parseKeyId({
      SOWA_TOKEN_SIGNING_KEYS: "",
      SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
    });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain(
      "SOWA_TOKEN_SIGNING_KEY_ID: must be one of the kids in SOWA_TOKEN_SIGNING_KEYS",
    );
  });

  it("kid первого и последнего ключа принимается", () => {
    expect(
      parseKeyId({ SOWA_TOKEN_SIGNING_KEYS: keys, SOWA_TOKEN_SIGNING_KEY_ID: "test-1" }).success,
    ).toBe(true);
    expect(
      parseKeyId({ SOWA_TOKEN_SIGNING_KEYS: keys, SOWA_TOKEN_SIGNING_KEY_ID: "test-2" }).success,
    ).toBe(true);
  });

  it("неверный список ключей не добавляет ошибку про kid", () => {
    const result = parseKeyId({
      SOWA_TOKEN_SIGNING_KEYS: `test-1:${x25519Key}`,
      SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
    });
    const errors = describeErrors(result);

    expect(result.success).toBe(false);
    expect(errors).toContain("SOWA_TOKEN_SIGNING_KEYS");
    expect(errors).not.toContain("SOWA_TOKEN_SIGNING_KEY_ID");
  });
});

describe("tokenSigningConfig", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("возвращает ключ и текущий kid", async () => {
    stubTestEnv({ SOWA_TOKEN_SIGNING_KEYS: `test-1:${key1}`, SOWA_TOKEN_SIGNING_KEY_ID: "test-1" });
    const { tokenSigningConfig } = await import("./token-signing.config.js");

    const config = tokenSigningConfig();

    expect(config.keys).toHaveLength(1);
    expect(config.keys[0]?.kid).toBe("test-1");
    expect(config.keys[0]?.privateKey.asymmetricKeyType).toBe("ed25519");
    expect(config.currentKeyId).toBe("test-1");
  });

  it("возвращает все ключи в порядке строки", async () => {
    stubTestEnv({
      SOWA_TOKEN_SIGNING_KEYS: `test-2:${key2},test-1:${key1}`,
      SOWA_TOKEN_SIGNING_KEY_ID: "test-2",
    });
    const { tokenSigningConfig } = await import("./token-signing.config.js");

    const config = tokenSigningConfig();

    expect(config.keys.map((item) => item.kid)).toEqual(["test-2", "test-1"]);
    expect(config.currentKeyId).toBe("test-2");
  });

  it("при пустых строках возвращает пустой список и undefined", async () => {
    stubTestEnv({ SOWA_TOKEN_SIGNING_KEYS: "", SOWA_TOKEN_SIGNING_KEY_ID: "" });
    const { tokenSigningConfig } = await import("./token-signing.config.js");

    expect(tokenSigningConfig()).toEqual({ keys: [], currentKeyId: undefined });
  });

  it("при неверном ключе падает с именем переменной без значения ключа", async () => {
    stubTestEnv({
      SOWA_TOKEN_SIGNING_KEYS: `test-1:${x25519Key}`,
      SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
    });
    const { tokenSigningConfig } = await import("./token-signing.config.js");

    expect(() => tokenSigningConfig()).toThrow(/SOWA_TOKEN_SIGNING_KEYS/);
    expect(() => tokenSigningConfig()).not.toThrow(new RegExp(x25519Key));
  });

  it("при kid, которого нет среди ключей, падает с именем переменной", async () => {
    stubTestEnv({
      SOWA_TOKEN_SIGNING_KEYS: `test-1:${key1}`,
      SOWA_TOKEN_SIGNING_KEY_ID: "other",
    });
    const { tokenSigningConfig } = await import("./token-signing.config.js");

    expect(() => tokenSigningConfig()).toThrow(/SOWA_TOKEN_SIGNING_KEY_ID/);
  });
});
