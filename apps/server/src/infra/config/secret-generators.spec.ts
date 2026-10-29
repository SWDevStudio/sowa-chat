import { sign, verify } from "node:crypto";
import { encryptionKeysSchema } from "./encryption-keys.schema.js";
import { envSchema } from "./env.schema.js";
import { firstTokenSigningKeyIds, generatedSecrets } from "./generated-secrets.js";
import type { SecretsMode } from "./generated-secrets.js";
import { generateEncryptionKeyEntry, generateTokenSigningKeyEntry } from "./secret-generators.js";
import { tokenSigningKeysSchema } from "./token-signing-keys.schema.js";

const minimalEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_ENV: "development",
};

function generateAll(mode: SecretsMode): Record<string, string> {
  return Object.assign({}, ...generatedSecrets.map((secret) => secret.generate(mode)));
}

describe("generateEncryptionKeyEntry", () => {
  it("начинает запись с версии и двоеточия", () => {
    expect(generateEncryptionKeyEntry(3).startsWith("3:")).toBe(true);
  });

  it("проходит encryptionKeysSchema: версия 3, ключ 32 байта", () => {
    const keys = encryptionKeysSchema.parse(generateEncryptionKeyEntry(3));

    expect(keys).toHaveLength(1);
    expect(keys?.[0].version).toBe(3);
    expect(keys?.[0].key).toHaveLength(32);
  });

  it("даёт разные значения при двух вызовах", () => {
    expect(generateEncryptionKeyEntry(1)).not.toBe(generateEncryptionKeyEntry(1));
  });
});

describe("generateTokenSigningKeyEntry", () => {
  it("проходит tokenSigningKeysSchema: kid key-7, тип ed25519", () => {
    const keys = tokenSigningKeysSchema.parse(generateTokenSigningKeyEntry("key-7"));

    expect(keys).toHaveLength(1);
    expect(keys?.[0].kid).toBe("key-7");
    expect(keys?.[0].privateKey.asymmetricKeyType).toBe("ed25519");
  });

  it("создаёт рабочую пару ключей: подпись проверяется публичным ключом", () => {
    const [key] = tokenSigningKeysSchema.parse(generateTokenSigningKeyEntry("key-7")) ?? [];
    const data = Buffer.from("payload");

    const signature = sign(null, data, key.privateKey);

    expect(verify(null, data, key.publicKey, signature)).toBe(true);
  });

  it("даёт разные значения при двух вызовах", () => {
    expect(generateTokenSigningKeyEntry("key-7")).not.toBe(generateTokenSigningKeyEntry("key-7"));
  });
});

describe("firstTokenSigningKeyIds", () => {
  it("задаёт dev-1 для development и key-1 для production", () => {
    expect(firstTokenSigningKeyIds).toEqual({ development: "dev-1", production: "key-1" });
  });
});

describe("generatedSecrets", () => {
  it("содержит две записи в порядке: ключ шифрования, ключ подписи", () => {
    expect(generatedSecrets.map((secret) => secret.variables)).toEqual([
      ["SOWA_ENCRYPTION_KEYS"],
      ["SOWA_TOKEN_SIGNING_KEYS", "SOWA_TOKEN_SIGNING_KEY_ID"],
    ]);
  });

  it.each<SecretsMode>(["development", "production"])(
    "generate(%s) возвращает значения ровно для variables записи",
    (mode) => {
      for (const secret of generatedSecrets) {
        expect(Object.keys(secret.generate(mode)).sort()).toEqual([...secret.variables].sort());
      }
    },
  );

  it("объединение generate(development) с минимальным env проходит envSchema", () => {
    const result = envSchema.safeParse({ ...minimalEnv, ...generateAll("development") });

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(result.data?.SOWA_ENCRYPTION_KEYS?.[0].version).toBe(1);
    expect(result.data?.SOWA_TOKEN_SIGNING_KEYS?.[0].kid).toBe("dev-1");
  });

  it("generate(production) выдаёт kid key-1 и в списке ключей, и в текущем kid", () => {
    const values = generateAll("production");

    expect(values.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-1");
    expect(tokenSigningKeysSchema.parse(values.SOWA_TOKEN_SIGNING_KEYS)?.[0].kid).toBe("key-1");
    expect(encryptionKeysSchema.parse(values.SOWA_ENCRYPTION_KEYS)?.[0].version).toBe(1);
  });

  it("каждый вызов generate даёт новые значения", () => {
    expect(generateAll("development")).not.toEqual(generateAll("development"));
  });
});
