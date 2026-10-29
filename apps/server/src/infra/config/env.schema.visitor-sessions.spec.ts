import { envSchema } from "./env.schema.js";
import { visitorSessionsConfig } from "./visitor-sessions.config.js";

const requiredEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_PUBLIC_URL: "https://chat.example.com",
  SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
  SOWA_TOKEN_SIGNING_KEYS:
    "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
  SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
};

function describeErrors(env: Record<string, string | undefined>): string {
  const result = envSchema.safeParse(env);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe("envSchema: SOWA_VISITOR_REFRESH_TTL_DAYS", () => {
  it("по умолчанию 30", () => {
    expect(envSchema.parse(requiredEnv)).toMatchObject({ SOWA_VISITOR_REFRESH_TTL_DAYS: 30 });
  });

  it("строка 7 становится числом 7", () => {
    const env = { ...requiredEnv, SOWA_VISITOR_REFRESH_TTL_DAYS: "7" };

    expect(envSchema.parse(env)).toMatchObject({ SOWA_VISITOR_REFRESH_TTL_DAYS: 7 });
  });

  it.each(["1", "365"])("принимает границу %s", (value) => {
    const env = { ...requiredEnv, SOWA_VISITOR_REFRESH_TTL_DAYS: value };

    expect(envSchema.parse(env)).toMatchObject({ SOWA_VISITOR_REFRESH_TTL_DAYS: Number(value) });
  });

  it.each(["0", "366", "abc", "1.5"])("отклоняет %j и называет переменную", (value) => {
    const env = { ...requiredEnv, SOWA_VISITOR_REFRESH_TTL_DAYS: value };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain("SOWA_VISITOR_REFRESH_TTL_DAYS");
  });
});

describe("visitorSessionsConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("возвращает refreshTtlDays из SOWA_VISITOR_REFRESH_TTL_DAYS", () => {
    for (const [name, value] of Object.entries(requiredEnv)) {
      vi.stubEnv(name, value);
    }
    vi.stubEnv("SOWA_VISITOR_REFRESH_TTL_DAYS", "7");

    expect(visitorSessionsConfig()).toEqual({ refreshTtlDays: 7 });
  });

  it("без переменной возвращает 30", () => {
    for (const [name, value] of Object.entries(requiredEnv)) {
      vi.stubEnv(name, value);
    }
    vi.stubEnv("SOWA_VISITOR_REFRESH_TTL_DAYS", undefined);

    expect(visitorSessionsConfig()).toEqual({ refreshTtlDays: 30 });
  });
});
