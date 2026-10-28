import { envSchema } from "./env.schema.js";
import { slowOperationsConfig } from "./slow-operations.config.js";

const requiredEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
};

function describeErrors(env: Record<string, string | undefined>): string {
  const result = envSchema.safeParse(env);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe("envSchema: SOWA_SLOW_OPERATION_MS", () => {
  it("по умолчанию 500", () => {
    expect(envSchema.parse(requiredEnv)).toMatchObject({ SOWA_SLOW_OPERATION_MS: 500 });
  });

  it("строка 200 становится числом 200", () => {
    const env = { ...requiredEnv, SOWA_SLOW_OPERATION_MS: "200" };

    expect(envSchema.parse(env)).toMatchObject({ SOWA_SLOW_OPERATION_MS: 200 });
  });

  it.each(["1", "600000"])("принимает границу %s", (value) => {
    const env = { ...requiredEnv, SOWA_SLOW_OPERATION_MS: value };

    expect(envSchema.parse(env)).toMatchObject({ SOWA_SLOW_OPERATION_MS: Number(value) });
  });

  it.each(["0", "600001", "abc", "1.5"])("отклоняет %j и называет переменную", (value) => {
    const env = { ...requiredEnv, SOWA_SLOW_OPERATION_MS: value };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain("SOWA_SLOW_OPERATION_MS");
  });
});

describe("slowOperationsConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("возвращает thresholdMs из SOWA_SLOW_OPERATION_MS", () => {
    for (const [name, value] of Object.entries(requiredEnv)) {
      vi.stubEnv(name, value);
    }
    vi.stubEnv("SOWA_SLOW_OPERATION_MS", "200");

    expect(slowOperationsConfig()).toEqual({ thresholdMs: 200 });
  });

  it("без переменной возвращает 500", () => {
    for (const [name, value] of Object.entries(requiredEnv)) {
      vi.stubEnv(name, value);
    }
    vi.stubEnv("SOWA_SLOW_OPERATION_MS", undefined);

    expect(slowOperationsConfig()).toEqual({ thresholdMs: 500 });
  });
});
