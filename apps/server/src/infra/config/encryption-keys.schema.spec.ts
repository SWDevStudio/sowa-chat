import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { encryptionKeysSchema } from "./encryption-keys.schema.js";
import { envSchema } from "./env.schema.js";

const requiredEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_ENV: "development",
};

const key1Bytes = Buffer.alloc(32, 1);
const key2Bytes = Buffer.alloc(32, 2);
const key1 = key1Bytes.toString("base64");
const key2 = key2Bytes.toString("base64");

function parseKeys(value: string) {
  return envSchema.safeParse({ ...requiredEnv, SOWA_ENCRYPTION_KEYS: value });
}

function describeErrors(value: string): string {
  const result = parseKeys(value);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe("encryptionKeysSchema", () => {
  it("разбирает один ключ", () => {
    expect(encryptionKeysSchema.parse(`1:${key1}`)).toEqual([{ version: 1, key: key1Bytes }]);
  });

  it("разбирает два ключа в Buffer по 32 байта", () => {
    const keys = encryptionKeysSchema.parse(`1:${key1},2:${key2}`);

    expect(keys).toEqual([
      { version: 1, key: key1Bytes },
      { version: 2, key: key2Bytes },
    ]);
    expect(Buffer.isBuffer(keys?.[0]?.key)).toBe(true);
    expect(keys?.[1]?.key.length).toBe(32);
  });

  it("сортирует по возрастанию версии", () => {
    const keys = encryptionKeysSchema.parse(`2:${key2},1:${key1}`);

    expect(keys?.map((item) => item.version)).toEqual([1, 2]);
    expect(keys?.[0]?.key).toEqual(key1Bytes);
  });

  it("принимает границы версий 1 и 999999", () => {
    const keys = encryptionKeysSchema.parse(`999999:${key2},1:${key1}`);

    expect(keys?.map((item) => item.version)).toEqual([1, 999999]);
  });

  it("пустая строка и отсутствие дают undefined", () => {
    expect(encryptionKeysSchema.parse("")).toBeUndefined();
    expect(encryptionKeysSchema.parse(undefined)).toBeUndefined();
  });
});

describe("envSchema: SOWA_ENCRYPTION_KEYS", () => {
  it("без переменной принимает окружение", () => {
    const result = envSchema.safeParse(requiredEnv);

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_ENCRYPTION_KEYS).toBeUndefined();
  });

  it("пустая строка принимается как отсутствие", () => {
    const result = parseKeys("");

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_ENCRYPTION_KEYS).toBeUndefined();
  });

  it("два ключа попадают в результат", () => {
    const result = parseKeys(`2:${key2},1:${key1}`);

    expect(result.data?.SOWA_ENCRYPTION_KEYS).toEqual([
      { version: 1, key: key1Bytes },
      { version: 2, key: key2Bytes },
    ]);
  });

  const shortKey = Buffer.alloc(16, 3).toString("base64");
  const longKey = Buffer.alloc(33, 3).toString("base64");
  const nonCanonicalKey = key1.replace(/=$/, "");
  const notBase64 = "!".repeat(44);

  it.each([
    {
      name: "ключ короче 32 байт",
      value: `1:${shortKey}`,
      secret: shortKey,
      message: "key of version 1 must be 32 bytes in base64",
    },
    {
      name: "ключ длиннее 32 байт",
      value: `1:${longKey}`,
      secret: longKey,
      message: "key of version 1 must be 32 bytes in base64",
    },
    {
      name: "ключ не base64",
      value: `1:${notBase64}`,
      secret: notBase64,
      message: "key of version 1 must be 32 bytes in base64",
    },
    {
      name: "ключ без паддинга",
      value: `3:${nonCanonicalKey}`,
      secret: nonCanonicalKey,
      message: "key of version 3 must be 32 bytes in base64",
    },
  ])("$name отклоняется без значения ключа в ошибке", ({ value, secret, message }) => {
    const errors = describeErrors(value);

    expect(parseKeys(value).success).toBe(false);
    expect(errors).toContain("SOWA_ENCRYPTION_KEYS");
    expect(errors).toContain(message);
    expect(errors).not.toContain(secret);
  });

  it.each(["0", "01", "abc", "1000000", "-1", "1.5"])("версия %s отклоняется", (version) => {
    const value = `${version}:${key1}`;
    const errors = describeErrors(value);

    expect(parseKeys(value).success).toBe(false);
    expect(errors).toContain("SOWA_ENCRYPTION_KEYS");
    expect(errors).toContain("version must be an integer from 1 to 999999");
    expect(errors).not.toContain(key1);
  });

  it("повтор версии отклоняется", () => {
    const value = `1:${key1},1:${key2}`;
    const errors = describeErrors(value);

    expect(parseKeys(value).success).toBe(false);
    expect(errors).toContain("SOWA_ENCRYPTION_KEYS");
    expect(errors).toContain("version 1 is repeated");
    expect(errors).not.toContain(key1);
    expect(errors).not.toContain(key2);
  });

  it.each([key1, `1${key1}`, `1:${key1},${key2}`, `1:${key1},`, `1:${key1}:x`])(
    "элемент не вида версия:ключ (%#) отклоняется",
    (value) => {
      const errors = describeErrors(value);

      expect(parseKeys(value).success).toBe(false);
      expect(errors).toContain("SOWA_ENCRYPTION_KEYS");
      expect(errors).toContain("must be a comma-separated list of version:key");
      expect(errors).not.toContain(key1);
    },
  );

  it("пробелы в списке отклоняются", () => {
    expect(parseKeys(`1:${key1}, 2:${key2}`).success).toBe(false);
  });
});

describe("encryptionConfig", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("возвращает ключ из SOWA_ENCRYPTION_KEYS", async () => {
    stubTestEnv({ SOWA_ENCRYPTION_KEYS: `1:${key1}` });
    const { encryptionConfig } = await import("./encryption.config.js");

    expect(encryptionConfig()).toEqual({ keys: [{ version: 1, key: key1Bytes }] });
  });

  it("при пустой строке возвращает пустой список", async () => {
    stubTestEnv({ SOWA_ENCRYPTION_KEYS: "" });
    const { encryptionConfig } = await import("./encryption.config.js");

    expect(encryptionConfig()).toEqual({ keys: [] });
  });

  it("при неверном ключе падает с именем переменной", async () => {
    stubTestEnv({ SOWA_ENCRYPTION_KEYS: "1:AAAA" });
    const { encryptionConfig } = await import("./encryption.config.js");

    expect(() => encryptionConfig()).toThrow(/SOWA_ENCRYPTION_KEYS/);
  });
});
