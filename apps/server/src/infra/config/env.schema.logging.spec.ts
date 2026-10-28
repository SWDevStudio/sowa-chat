import { envSchema } from "./env.schema.js";

const requiredEnv = {
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

const logLevels = ["trace", "debug", "info", "warn", "error", "fatal"];

type Env = Record<string, string | undefined>;

function describeErrors(env: Env): string {
  const result = envSchema.safeParse(env);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

function isAccepted(env: Env): boolean {
  return envSchema.safeParse(env).success;
}

describe("envSchema: настройки логов", () => {
  describe("SOWA_LOG_LEVEL", () => {
    it.each(logLevels)("принимает %s", (level) => {
      const env = { ...requiredEnv, SOWA_LOG_LEVEL: level };

      expect(envSchema.parse(env)).toMatchObject({ SOWA_LOG_LEVEL: level });
    });

    it("по умолчанию info", () => {
      expect(envSchema.parse(requiredEnv)).toMatchObject({ SOWA_LOG_LEVEL: "info" });
    });

    it.each(["verbose", "INFO", "silent", ""])("отклоняет %j и называет переменную", (level) => {
      const env = { ...requiredEnv, SOWA_LOG_LEVEL: level };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toContain("SOWA_LOG_LEVEL");
    });
  });

  describe("SOWA_LOG_FORMAT", () => {
    it("по умолчанию json", () => {
      expect(envSchema.parse(requiredEnv)).toMatchObject({ SOWA_LOG_FORMAT: "json" });
    });

    it.each(["development", "production"])("json принимается в %s", (sowaEnv) => {
      const env = { ...requiredEnv, SOWA_ENV: sowaEnv, SOWA_LOG_FORMAT: "json" };

      expect(envSchema.parse(env)).toMatchObject({ SOWA_LOG_FORMAT: "json" });
    });

    it("pretty принимается в development", () => {
      const env = { ...requiredEnv, SOWA_ENV: "development", SOWA_LOG_FORMAT: "pretty" };

      expect(envSchema.parse(env)).toMatchObject({ SOWA_LOG_FORMAT: "pretty" });
    });

    it("pretty в production отклоняется и называет SOWA_LOG_FORMAT", () => {
      const env = { ...requiredEnv, SOWA_ENV: "production", SOWA_LOG_FORMAT: "pretty" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toMatch(/SOWA_LOG_FORMAT: \S+/);
    });

    it("pretty без SOWA_ENV отклоняется, потому что по умолчанию production", () => {
      const env = { ...requiredEnv, SOWA_LOG_FORMAT: "pretty" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toContain("SOWA_LOG_FORMAT");
    });

    it.each(["text", "JSON", ""])("отклоняет %j и называет переменную", (format) => {
      const env = { ...requiredEnv, SOWA_ENV: "development", SOWA_LOG_FORMAT: format };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toContain("SOWA_LOG_FORMAT");
    });
  });
});
