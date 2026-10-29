import { readFileSync } from "node:fs";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
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
  SOWA_PUBLIC_URL: "https://chat.example.com",
};

const initVariables = [
  "SOWA_INIT_PROJECT",
  "SOWA_INIT_SERVER_KEY",
  "SOWA_INIT_ALLOWED_ORIGINS",
  "SOWA_INIT_OPERATOR_ALLOWED_ORIGINS",
];

function describeErrors(env: Record<string, string | undefined>): string {
  const result = envSchema.safeParse(env);
  if (result.success) {
    return "";
  }
  return result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
}

describe.each(["SOWA_INIT_ALLOWED_ORIGINS", "SOWA_INIT_OPERATOR_ALLOWED_ORIGINS"] as const)(
  "envSchema: %s",
  (name) => {
    function parseOrigins(value: string | undefined) {
      const env = { ...requiredEnv, SOWA_ENV: "development", [name]: value };
      return envSchema.parse(env)[name];
    }

    it("делит по запятой, обрезает пробелы и отбрасывает пустые части", () => {
      expect(parseOrigins(" https://a.example.com,,https://b.example.com , ")).toEqual([
        "https://a.example.com",
        "https://b.example.com",
      ]);
    });

    it("один адрес даёт список из одного элемента", () => {
      expect(parseOrigins("https://a.example.com")).toEqual(["https://a.example.com"]);
    });

    it("не нормализует адреса", () => {
      expect(parseOrigins("HTTPS://A.example.com/")).toEqual(["HTTPS://A.example.com/"]);
    });

    it("без переменной даёт пустой список", () => {
      expect(parseOrigins(undefined)).toEqual([]);
    });

    it.each(["", " ", ",", " , ,"])("значение %j даёт пустой список", (value) => {
      expect(parseOrigins(value)).toEqual([]);
    });
  },
);

describe("envSchema: SOWA_INIT_PROJECT и SOWA_INIT_SERVER_KEY", () => {
  const development = { ...requiredEnv, SOWA_ENV: "development" };

  it("без переменных дают undefined", () => {
    const parsed = envSchema.parse(development);

    expect(parsed.SOWA_INIT_PROJECT).toBeUndefined();
    expect(parsed.SOWA_INIT_SERVER_KEY).toBeUndefined();
  });

  it("пустые строки дают undefined", () => {
    const parsed = envSchema.parse({
      ...development,
      SOWA_INIT_PROJECT: "",
      SOWA_INIT_SERVER_KEY: "",
    });

    expect(parsed.SOWA_INIT_PROJECT).toBeUndefined();
    expect(parsed.SOWA_INIT_SERVER_KEY).toBeUndefined();
  });

  it("заданные значения возвращаются как есть, формат не проверяется", () => {
    const parsed = envSchema.parse({
      ...development,
      SOWA_INIT_PROJECT: "Not A Valid Name!",
      SOWA_INIT_SERVER_KEY: "not-an-sk-key",
    });

    expect(parsed.SOWA_INIT_PROJECT).toBe("Not A Valid Name!");
    expect(parsed.SOWA_INIT_SERVER_KEY).toBe("not-an-sk-key");
  });
});

describe("envSchema: SOWA_INIT_SERVER_KEY в production", () => {
  const production = { ...requiredEnv, SOWA_ENV: "production" };

  it("SOWA_INIT_PROJECT без ключа не проходит и называет переменную", () => {
    const env = { ...production, SOWA_INIT_PROJECT: "main" };

    expect(envSchema.safeParse(env).success).toBe(false);
    expect(describeErrors(env)).toContain(
      "SOWA_INIT_SERVER_KEY: is required when SOWA_INIT_PROJECT is set",
    );
  });

  it("SOWA_INIT_PROJECT с пустым ключом не проходит", () => {
    const env = { ...production, SOWA_INIT_PROJECT: "main", SOWA_INIT_SERVER_KEY: "" };

    expect(describeErrors(env)).toContain(
      "SOWA_INIT_SERVER_KEY: is required when SOWA_INIT_PROJECT is set",
    );
  });

  it("с ключом проходит", () => {
    const env = { ...production, SOWA_INIT_PROJECT: "main", SOWA_INIT_SERVER_KEY: "sk_value" };

    expect(envSchema.safeParse(env).success).toBe(true);
  });

  it("без SOWA_INIT_PROJECT ключ не нужен", () => {
    expect(envSchema.safeParse(production).success).toBe(true);
  });

  it("пустой SOWA_INIT_PROJECT считается незаданным", () => {
    const env = { ...production, SOWA_INIT_PROJECT: "" };

    expect(envSchema.safeParse(env).success).toBe(true);
  });

  it("ошибка не содержит значение ключа", () => {
    const env = { ...production, SOWA_INIT_PROJECT: "main", SOWA_INIT_SERVER_KEY: undefined };

    expect(describeErrors(env)).not.toContain("main");
  });
});

describe("envSchema: SOWA_INIT_SERVER_KEY в development", () => {
  it("SOWA_INIT_PROJECT без ключа проходит", () => {
    const env = { ...requiredEnv, SOWA_ENV: "development", SOWA_INIT_PROJECT: "main" };

    expect(envSchema.safeParse(env).success).toBe(true);
  });
});

describe("initialProjectConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  async function loadConfig() {
    vi.resetModules();
    const { initialProjectConfig } = await import("./initial-project.config.js");
    return initialProjectConfig();
  }

  function clearInitVariables(): void {
    for (const name of initVariables) {
      vi.stubEnv(name, undefined);
    }
  }

  it("отдаёт значения из env", async () => {
    stubTestEnv({
      SOWA_ENV: "production",
      SOWA_PUBLIC_URL: "https://chat.example.com",
      SOWA_INIT_PROJECT: "main",
      SOWA_INIT_SERVER_KEY: "sk_value",
      SOWA_INIT_ALLOWED_ORIGINS: "https://shop.example.com, https://b.example.com",
      SOWA_INIT_OPERATOR_ALLOWED_ORIGINS: "https://admin.example.com",
    });

    expect(await loadConfig()).toEqual({
      projectName: "main",
      serverKey: "sk_value",
      allowedOrigins: ["https://shop.example.com", "https://b.example.com"],
      operatorAllowedOrigins: ["https://admin.example.com"],
    });
  });

  it("без переменных отдаёт значения по умолчанию", async () => {
    stubTestEnv();
    clearInitVariables();

    expect(await loadConfig()).toEqual({
      projectName: undefined,
      serverKey: undefined,
      allowedOrigins: [],
      operatorAllowedOrigins: [],
    });
  });

  it("пустые строки дают значения по умолчанию", async () => {
    stubTestEnv({
      SOWA_INIT_PROJECT: "",
      SOWA_INIT_SERVER_KEY: "",
      SOWA_INIT_ALLOWED_ORIGINS: "",
      SOWA_INIT_OPERATOR_ALLOWED_ORIGINS: "",
    });

    expect(await loadConfig()).toEqual({
      projectName: undefined,
      serverKey: undefined,
      allowedOrigins: [],
      operatorAllowedOrigins: [],
    });
  });
});

describe(".env.example: SOWA_INIT_*", () => {
  const lines = readFileSync(new URL("../../../.env.example", import.meta.url), "utf8").split(
    /\r?\n/,
  );

  it.each([
    "# SOWA_INIT_PROJECT=main",
    "# SOWA_INIT_SERVER_KEY=<serverKey from sowa-chat key:generate>",
    "# SOWA_INIT_ALLOWED_ORIGINS=https://shop.example.com",
    "# SOWA_INIT_OPERATOR_ALLOWED_ORIGINS=https://admin.example.com",
  ])("содержит выключенную строку %s", (line) => {
    expect(lines).toContain(line);
  });

  it("строки идут после SOWA_DEV_SECRETS_DIR", () => {
    const secretsIndex = lines.indexOf("# SOWA_DEV_SECRETS_DIR=.sowa-dev");

    expect(secretsIndex).toBeGreaterThanOrEqual(0);
    expect(lines.indexOf("# SOWA_INIT_PROJECT=main")).toBeGreaterThan(secretsIndex);
  });
});
