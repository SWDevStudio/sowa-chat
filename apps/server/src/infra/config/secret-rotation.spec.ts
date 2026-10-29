import { encryptionKeysSchema } from "./encryption-keys.schema.js";
import { envSchema } from "./env.schema.js";
import {
  nextTokenSigningKeyId,
  rotateConfiguredSecrets,
  rotateSecrets,
} from "./secret-rotation.js";
import { generateTokenSigningKeyEntry } from "./secret-generators.js";
import { tokenSigningKeysSchema } from "./token-signing-keys.schema.js";

const encryptionKeys = "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=";
const signingKeys = "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";

const minimalEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_ENV: "development",
};

const source = {
  SOWA_ENCRYPTION_KEYS: encryptionKeys,
  SOWA_TOKEN_SIGNING_KEYS: signingKeys,
  SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
};

function rotationError(env: Record<string, string | undefined>): string {
  try {
    rotateSecrets(env);
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
  return "";
}

describe("rotateSecrets", () => {
  it("возвращает три переменные в заданном порядке", () => {
    expect(Object.keys(rotateSecrets(source))).toEqual([
      "SOWA_ENCRYPTION_KEYS",
      "SOWA_TOKEN_SIGNING_KEYS",
      "SOWA_TOKEN_SIGNING_KEY_ID",
    ]);
  });

  it("оставляет исходный текст ключей шифрования и добавляет версию 2", () => {
    const rotated = rotateSecrets(source).SOWA_ENCRYPTION_KEYS;

    expect(rotated.startsWith(`${encryptionKeys},2:`)).toBe(true);
    expect(encryptionKeysSchema.parse(rotated)?.map((key) => key.version)).toEqual([1, 2]);
  });

  it("берёт наибольшую версию плюс один, а не количество ключей", () => {
    const rotated = rotateSecrets({
      ...source,
      SOWA_ENCRYPTION_KEYS: `5:${encryptionKeys.slice(2)},3:${encryptionKeys.slice(2)}`,
    }).SOWA_ENCRYPTION_KEYS;

    expect(encryptionKeysSchema.parse(rotated)?.map((key) => key.version)).toEqual([3, 5, 6]);
  });

  it("добавляет новый ключ шифрования со случайным значением", () => {
    const first = rotateSecrets(source).SOWA_ENCRYPTION_KEYS;
    const second = rotateSecrets(source).SOWA_ENCRYPTION_KEYS;

    expect(first).not.toBe(second);
    expect(first.slice(encryptionKeys.length)).not.toContain(encryptionKeys.slice(2));
  });

  it("оставляет исходный текст ключей подписи и добавляет key-2", () => {
    const rotated = rotateSecrets(source).SOWA_TOKEN_SIGNING_KEYS;

    expect(rotated.startsWith(`${signingKeys},key-2:`)).toBe(true);
    expect(tokenSigningKeysSchema.parse(rotated)?.map((key) => key.kid)).toEqual([
      "test-1",
      "key-2",
    ]);
  });

  it("делает новый kid текущим", () => {
    expect(rotateSecrets(source).SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-2");
  });

  it("выбирает kid, которого ещё нет, когда key-2 занят", () => {
    const withKeyTwo = generateTokenSigningKeyEntry("key-2");
    const rotated = rotateSecrets({
      ...source,
      SOWA_TOKEN_SIGNING_KEYS: withKeyTwo,
      SOWA_TOKEN_SIGNING_KEY_ID: "key-2",
    });

    expect(rotated.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-3");
    expect(rotated.SOWA_TOKEN_SIGNING_KEYS.startsWith(`${withKeyTwo},key-3:`)).toBe(true);
  });

  it("результат вместе с минимальным env проходит envSchema", () => {
    const result = envSchema.safeParse({ ...minimalEnv, ...rotateSecrets(source) });

    expect(result.success).toBe(true);
  });

  it("не меняет переданный объект", () => {
    const copy = { ...source };

    rotateSecrets(copy);

    expect(copy).toEqual(source);
  });
});

describe("rotateSecrets: ошибки", () => {
  it.each([undefined, ""])("без SOWA_ENCRYPTION_KEYS (%j) просит задать переменную", (value) => {
    expect(rotationError({ ...source, SOWA_ENCRYPTION_KEYS: value })).toBe(
      "SOWA_ENCRYPTION_KEYS is not set: nothing to rotate",
    );
  });

  it.each([undefined, ""])("без SOWA_TOKEN_SIGNING_KEYS (%j) просит задать переменную", (value) => {
    expect(rotationError({ ...source, SOWA_TOKEN_SIGNING_KEYS: value })).toBe(
      "SOWA_TOKEN_SIGNING_KEYS is not set: nothing to rotate",
    );
  });

  it("неверные ключи шифрования: имя переменной без значения ключа", () => {
    const message = rotationError({ ...source, SOWA_ENCRYPTION_KEYS: "1:AAAA" });

    expect(message.startsWith("SOWA_ENCRYPTION_KEYS: ")).toBe(true);
    expect(message).not.toContain("AAAA");
  });

  it("неверные ключи подписи: имя переменной без значения ключа", () => {
    const message = rotationError({ ...source, SOWA_TOKEN_SIGNING_KEYS: "test-1:AAAA" });

    expect(message.startsWith("SOWA_TOKEN_SIGNING_KEYS: ")).toBe(true);
    expect(message).not.toContain("AAAA");
  });

  it("ключи шифрования с повтором версии не принимаются", () => {
    const message = rotationError({
      ...source,
      SOWA_ENCRYPTION_KEYS: `${encryptionKeys},${encryptionKeys}`,
    });

    expect(message).toBe("SOWA_ENCRYPTION_KEYS: version 1 is repeated");
  });
});

describe("rotateConfiguredSecrets", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("читает process.env", () => {
    for (const [name, value] of Object.entries(source)) {
      vi.stubEnv(name, value);
    }

    const rotated = rotateConfiguredSecrets();

    expect(rotated.SOWA_ENCRYPTION_KEYS.startsWith(`${encryptionKeys},2:`)).toBe(true);
    expect(rotated.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-2");
  });

  it("без ключей в process.env падает с именем переменной", () => {
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", "");

    expect(() => rotateConfiguredSecrets()).toThrow("SOWA_ENCRYPTION_KEYS");
  });
});

describe("nextTokenSigningKeyId", () => {
  it.each([
    [[], "key-1"],
    [["test-1"], "key-2"],
    [["key-1", "key-2"], "key-3"],
    [["key-2"], "key-3"],
    [["dev-1"], "key-2"],
    [["key-1", "key-3"], "key-4"],
    [["a", "key-2", "key-3"], "key-4"],
  ])("%j → %s", (kids, expected) => {
    expect(nextTokenSigningKeyId(kids)).toBe(expected);
  });
});
