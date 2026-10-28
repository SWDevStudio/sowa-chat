import { envSchema } from "./env.schema.js";

const requiredEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
};

type Env = Record<string, string | undefined>;

function withoutVariable(name: keyof typeof requiredEnv): Env {
  const env: Env = { ...requiredEnv };
  delete env[name];
  return env;
}

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

describe("envSchema", () => {
  it("принимает полный набор обязательных переменных", () => {
    expect(isAccepted(requiredEnv)).toBe(true);
  });

  it("принимает посторонние переменные окружения", () => {
    const env = { ...requiredEnv, PATH: "/usr/bin", HOME: "/home/sowa" };

    expect(isAccepted(env)).toBe(true);
  });

  describe("обязательные переменные", () => {
    it.each(["DATABASE_URL", "REDIS_URL"] as const)(
      "без %s отклоняет и называет переменную",
      (name) => {
        const env = withoutVariable(name);

        expect(isAccepted(env)).toBe(false);
        expect(describeErrors(env)).toContain(name);
      },
    );

    it("называет все отсутствующие переменные сразу", () => {
      const env: Env = { ...requiredEnv };
      delete env.DATABASE_URL;
      delete env.REDIS_URL;

      const errors = describeErrors(env);

      expect(errors).toContain("DATABASE_URL");
      expect(errors).toContain("REDIS_URL");
    });
  });

  describe("SOWA_ENV", () => {
    it.each(["development", "production"])("принимает %s", (value) => {
      const env = { ...requiredEnv, SOWA_ENV: value };

      expect(envSchema.parse(env).SOWA_ENV).toBe(value);
    });

    it("отклоняет staging и называет переменную с причиной", () => {
      const env = { ...requiredEnv, SOWA_ENV: "staging" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toMatch(/SOWA_ENV: \S+/);
    });
  });

  describe("NODE_ENV", () => {
    it("читается как есть", () => {
      const env = { ...requiredEnv, NODE_ENV: "test" };

      expect(envSchema.parse(env).NODE_ENV).toBe("test");
    });

    it("необязательна", () => {
      const env: Env = { ...requiredEnv, NODE_ENV: undefined };

      expect(isAccepted(env)).toBe(true);
    });
  });

  describe("порты", () => {
    it("превращает строку в целое число", () => {
      const env = { ...requiredEnv, SOWA_PUBLIC_PORT: "18080" };

      expect(envSchema.parse(env).SOWA_PUBLIC_PORT).toBe(18080);
    });

    it("отклоняет SOWA_PUBLIC_PORT=abc и называет переменную с причиной", () => {
      const env = { ...requiredEnv, SOWA_PUBLIC_PORT: "abc" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toMatch(/SOWA_PUBLIC_PORT: \S+/);
    });

    it.each(["0", "65536", "-1", "80.5"])("отклоняет порт %j", (value) => {
      const env = { ...requiredEnv, SOWA_OPERATOR_PORT: value };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toContain("SOWA_OPERATOR_PORT");
    });

    it.each(["1", "65535"])("принимает граничный порт %s", (value) => {
      const env = { ...requiredEnv, SOWA_INTERNAL_PORT: value };

      expect(envSchema.parse(env).SOWA_INTERNAL_PORT).toBe(Number(value));
    });

    it("отклоняет два одинаковых порта зон и называет их", () => {
      const env = { ...requiredEnv, SOWA_PUBLIC_PORT: "8085", SOWA_INTERNAL_PORT: "8085" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toMatch(/SOWA_PUBLIC_PORT|SOWA_INTERNAL_PORT/);
    });

    it("отклоняет порт, совпавший со значением по умолчанию другой зоны", () => {
      const env = { ...requiredEnv, SOWA_OPERATOR_PORT: "9090" };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toMatch(/SOWA_OPERATOR_PORT|SOWA_MANAGEMENT_PORT/);
    });
  });

  describe("SOWA_DB_POOL_SIZE", () => {
    it("по умолчанию 10", () => {
      expect(envSchema.parse(requiredEnv).SOWA_DB_POOL_SIZE).toBe(10);
    });

    it("превращает строку в целое число", () => {
      const env = { ...requiredEnv, SOWA_DB_POOL_SIZE: "25" };

      expect(envSchema.parse(env).SOWA_DB_POOL_SIZE).toBe(25);
    });

    it.each(["1", "100"])("принимает граничное значение %s", (value) => {
      const env = { ...requiredEnv, SOWA_DB_POOL_SIZE: value };

      expect(envSchema.parse(env).SOWA_DB_POOL_SIZE).toBe(Number(value));
    });

    it.each(["abc", "0", "101", "-1", "10.5", ""])(
      "отклоняет %j и называет переменную",
      (value) => {
        const env = { ...requiredEnv, SOWA_DB_POOL_SIZE: value };

        expect(isAccepted(env)).toBe(false);
        expect(describeErrors(env)).toContain("SOWA_DB_POOL_SIZE");
      },
    );
  });

  describe("SOWA_MIGRATION_DATABASE_URL", () => {
    const migrationUrl = "postgres://migrator:secret@127.0.0.1:5432/sowa";

    it("необязательна", () => {
      const result = envSchema.parse(requiredEnv);

      expect(result.SOWA_MIGRATION_DATABASE_URL).toBeUndefined();
    });

    it("принимает заданный URL как есть", () => {
      const env = { ...requiredEnv, SOWA_MIGRATION_DATABASE_URL: migrationUrl };

      expect(envSchema.parse(env).SOWA_MIGRATION_DATABASE_URL).toBe(migrationUrl);
    });

    it("считает пустую строку незаданной переменной", () => {
      const env = { ...requiredEnv, SOWA_MIGRATION_DATABASE_URL: "" };

      expect(isAccepted(env)).toBe(true);
      expect(envSchema.parse(env).SOWA_MIGRATION_DATABASE_URL).toBeUndefined();
    });

    it.each(["not-a-url", "postgres"])("отклоняет %j и называет переменную", (value) => {
      const env = { ...requiredEnv, SOWA_MIGRATION_DATABASE_URL: value };

      expect(isAccepted(env)).toBe(false);
      expect(describeErrors(env)).toContain("SOWA_MIGRATION_DATABASE_URL");
    });
  });

  describe("значения по умолчанию", () => {
    it("подставляет их, если необязательных переменных нет", () => {
      expect(envSchema.parse(requiredEnv)).toMatchObject({
        SOWA_ENV: "production",
        SOWA_PUBLIC_PORT: 8080,
        SOWA_OPERATOR_PORT: 8081,
        SOWA_INTERNAL_PORT: 8082,
        SOWA_MANAGEMENT_PORT: 9090,
      });
    });

    it("не трогает заданные значения", () => {
      const env = {
        ...requiredEnv,
        SOWA_ENV: "development",
        SOWA_PUBLIC_PORT: "18080",
        SOWA_OPERATOR_PORT: "18081",
        SOWA_INTERNAL_PORT: "18082",
        SOWA_MANAGEMENT_PORT: "19090",
      };

      expect(envSchema.parse(env)).toMatchObject({
        SOWA_ENV: "development",
        SOWA_PUBLIC_PORT: 18080,
        SOWA_OPERATOR_PORT: 18081,
        SOWA_INTERNAL_PORT: 18082,
        SOWA_MANAGEMENT_PORT: 19090,
      });
    });
  });
});
