import { envSchema } from "./env.schema.js";

const baseEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
  SOWA_TOKEN_SIGNING_KEYS:
    "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
  SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
};

const publicUrl = "https://chat.example.com";
const storageUrl = "https://chat.example.com/storage";
const requiredMessage = "SOWA_PUBLIC_URL: is required when SOWA_ENV is production";

function describeErrors(env: Record<string, string | undefined>): string {
  const result = envSchema.safeParse(env);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe("envSchema: SOWA_PUBLIC_URL в production", () => {
  const production = { ...baseEnv, SOWA_ENV: "production" };

  it("без адреса не проходит и называет переменную", () => {
    expect(envSchema.safeParse(production).success).toBe(false);
    expect(describeErrors(production)).toContain(requiredMessage);
  });

  it("с пустой строкой не проходит", () => {
    const env = { ...production, SOWA_PUBLIC_URL: "" };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain(requiredMessage);
  });

  it("с явным undefined не проходит", () => {
    const env = { ...production, SOWA_PUBLIC_URL: undefined };

    expect(describeErrors(env)).toContain(requiredMessage);
  });

  it("без SOWA_ENV считается production и требует адрес", () => {
    expect(describeErrors(baseEnv)).toContain(requiredMessage);
  });

  it("с https-адресом проходит", () => {
    const env = { ...production, SOWA_PUBLIC_URL: publicUrl };

    expect(envSchema.safeParse(env).success).toBe(true);
    expect(envSchema.parse(env).SOWA_PUBLIC_URL).toBe(publicUrl);
  });

  it("с адресом с путём и портом проходит", () => {
    const env = { ...production, SOWA_PUBLIC_URL: "https://chat.example.com:8443/app" };

    expect(envSchema.safeParse(env).success).toBe(true);
  });

  it("не-адрес не проходит и называет переменную", () => {
    const env = { ...production, SOWA_PUBLIC_URL: "not-a-url" };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain("SOWA_PUBLIC_URL");
  });

  it("не-адрес не даёт ошибку об обязательности", () => {
    const env = { ...production, SOWA_PUBLIC_URL: "not-a-url" };

    expect(describeErrors(env)).not.toContain(requiredMessage);
  });

  it("ошибка об адресе не затрагивает другие переменные", () => {
    const issues = envSchema.safeParse(production).error?.issues ?? [];

    expect(issues.map((issue) => issue.path.join("."))).toEqual(["SOWA_PUBLIC_URL"]);
  });
});

describe("envSchema: SOWA_PUBLIC_URL в development", () => {
  const development = { ...baseEnv, SOWA_ENV: "development" };

  it("без адреса проходит и даёт undefined", () => {
    const result = envSchema.safeParse(development);

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_PUBLIC_URL).toBeUndefined();
  });

  it("с пустой строкой проходит и даёт undefined", () => {
    const result = envSchema.safeParse({ ...development, SOWA_PUBLIC_URL: "" });

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_PUBLIC_URL).toBeUndefined();
  });

  it("с адресом проходит", () => {
    const env = { ...development, SOWA_PUBLIC_URL: publicUrl };

    expect(envSchema.parse(env).SOWA_PUBLIC_URL).toBe(publicUrl);
  });

  it("не-адрес не проходит и называет переменную", () => {
    const env = { ...development, SOWA_PUBLIC_URL: "not-a-url" };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain("SOWA_PUBLIC_URL");
  });
});

describe.each(["production", "development"])("envSchema: SOWA_S3_PUBLIC_URL в %s", (mode) => {
  const env = { ...baseEnv, SOWA_ENV: mode, SOWA_PUBLIC_URL: publicUrl };

  it("без адреса проходит и даёт undefined", () => {
    const result = envSchema.safeParse(env);

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_S3_PUBLIC_URL).toBeUndefined();
  });

  it("с пустой строкой проходит и даёт undefined", () => {
    const result = envSchema.safeParse({ ...env, SOWA_S3_PUBLIC_URL: "" });

    expect(result.success).toBe(true);
    expect(result.data?.SOWA_S3_PUBLIC_URL).toBeUndefined();
  });

  it("с адресом проходит", () => {
    const parsed = envSchema.parse({ ...env, SOWA_S3_PUBLIC_URL: storageUrl });

    expect(parsed.SOWA_S3_PUBLIC_URL).toBe(storageUrl);
  });

  it("не-адрес не проходит и называет переменную", () => {
    const invalid = { ...env, SOWA_S3_PUBLIC_URL: "not-a-url" };

    expect(envSchema.safeParse(invalid).success).toBe(false);
    expect(describeErrors(invalid)).toContain("SOWA_S3_PUBLIC_URL");
  });
});

describe("envSchema: SOWA_S3_PUBLIC_URL не заменяет SOWA_PUBLIC_URL", () => {
  it("в production только с адресом хранилища не проходит", () => {
    const env = { ...baseEnv, SOWA_ENV: "production", SOWA_S3_PUBLIC_URL: storageUrl };

    expect(describeErrors(env)).toContain(requiredMessage);
  });

  it("в production с обоими адресами проходит", () => {
    const env = {
      ...baseEnv,
      SOWA_ENV: "production",
      SOWA_PUBLIC_URL: publicUrl,
      SOWA_S3_PUBLIC_URL: storageUrl,
    };

    expect(envSchema.safeParse(env).success).toBe(true);
  });
});

describe("envSchema: адреса не проверяют схему http и https", () => {
  it("http-адрес не отвергается схемой, проверку делает отдельная задача", () => {
    const env = {
      ...baseEnv,
      SOWA_ENV: "production",
      SOWA_PUBLIC_URL: "http://chat.example.com",
      SOWA_S3_PUBLIC_URL: "http://chat.example.com/storage",
    };

    expect(envSchema.safeParse(env).success).toBe(true);
  });
});
