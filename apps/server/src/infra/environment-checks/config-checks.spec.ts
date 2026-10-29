import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";
import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import { environmentChecksConfig } from "../config/environment-checks.config.js";
import {
  exampleSecretsCheck,
  exampleSecretValues,
  publicUrlsHttpsCheck,
  s3PublicUrlCheck,
} from "./config-checks.js";
import type { CheckContext, CheckFinding } from "./environment-check.js";
import { registeredEnvironmentChecks } from "./registered-environment-checks.js";

type Settings = CheckContext["settings"];

const productionSettings: Settings = {
  env: "production",
  publicUrl: "https://chat.example.com",
  s3PublicUrl: "https://chat.example.com/storage",
  databaseUrl: "postgres://sowa:own-password@db.internal:5432/sowa",
  migrationDatabaseUrl: undefined,
  s3SecretKey: "own-s3-secret",
};

const exampleDatabaseUrl = "postgres://sowa:sowa@db.internal:5432/sowa";
const httpsMessage = "must use https in production: set an https:// address";
const databaseMessage =
  "uses the example password from .env.example: set your own database password";

function contextWith(overrides: Partial<Settings>): CheckContext {
  return {
    settings: { ...productionSettings, ...overrides },
    dataSource: {} as DataSource,
    redis: {} as Redis,
  };
}

function productionContext(overrides: Partial<Settings> = {}): CheckContext {
  return contextWith({ env: "production", ...overrides });
}

function developmentContext(overrides: Partial<Settings> = {}): CheckContext {
  return contextWith({ env: "development", ...overrides });
}

function stopFinding(message: string): CheckFinding {
  return { level: "stop", message };
}

describe("exampleSecretValues", () => {
  it("совпадает с apps/server/.env.example", () => {
    const path = join(import.meta.dirname, "../../../.env.example");
    const example = parseEnv(readFileSync(path, "utf8"));
    const databasePassword = decodeURIComponent(new URL(example.DATABASE_URL ?? "").password);

    expect(exampleSecretValues.s3SecretKey).toBe(example.SOWA_S3_SECRET_KEY);
    expect(exampleSecretValues.databasePassword).toBe(databasePassword);
  });
});

describe("registeredEnvironmentChecks", () => {
  it("содержит три проверки настроек, все работают и при старте, и в doctor", () => {
    expect(registeredEnvironmentChecks).toEqual([
      publicUrlsHttpsCheck,
      exampleSecretsCheck,
      s3PublicUrlCheck,
    ]);
    expect(registeredEnvironmentChecks.map((check) => check.name)).toEqual([
      "publicUrlsHttps",
      "exampleSecrets",
      "s3PublicUrl",
    ]);
    expect(registeredEnvironmentChecks.map((check) => check.onlyInDoctor)).toEqual([
      false,
      false,
      false,
    ]);
  });
});

describe("publicUrlsHttpsCheck", () => {
  it("в production с http в обоих адресах даёт две находки stop с именами переменных", async () => {
    const context = productionContext({
      publicUrl: "http://chat.example.com",
      s3PublicUrl: "http://chat.example.com/storage",
    });

    await expect(publicUrlsHttpsCheck.run(context)).resolves.toEqual([
      stopFinding(`SOWA_PUBLIC_URL ${httpsMessage}`),
      stopFinding(`SOWA_S3_PUBLIC_URL ${httpsMessage}`),
    ]);
  });

  it("в production с http только в SOWA_PUBLIC_URL даёт одну находку", async () => {
    const findings = await publicUrlsHttpsCheck.run(
      productionContext({ publicUrl: "http://chat.example.com" }),
    );

    expect(findings).toEqual([stopFinding(`SOWA_PUBLIC_URL ${httpsMessage}`)]);
  });

  it("в production с http только в SOWA_S3_PUBLIC_URL даёт одну находку", async () => {
    const findings = await publicUrlsHttpsCheck.run(
      productionContext({ s3PublicUrl: "http://chat.example.com/storage" }),
    );

    expect(findings).toEqual([stopFinding(`SOWA_S3_PUBLIC_URL ${httpsMessage}`)]);
  });

  it("в production с https в обоих адресах ничего не находит", async () => {
    await expect(publicUrlsHttpsCheck.run(productionContext())).resolves.toEqual([]);
  });

  it("в production без адресов ничего не находит", async () => {
    const context = productionContext({ publicUrl: undefined, s3PublicUrl: undefined });

    await expect(publicUrlsHttpsCheck.run(context)).resolves.toEqual([]);
  });

  it("в development с http ничего не находит", async () => {
    const context = developmentContext({
      publicUrl: "http://localhost:8080",
      s3PublicUrl: "http://localhost:8333",
    });

    await expect(publicUrlsHttpsCheck.run(context)).resolves.toEqual([]);
  });
});

describe("exampleSecretsCheck", () => {
  it("в production с примерным SOWA_S3_SECRET_KEY даёт stop без значения секрета", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({ s3SecretKey: exampleSecretValues.s3SecretKey }),
    );

    expect(findings).toEqual([
      stopFinding(
        "SOWA_S3_SECRET_KEY has the example value from .env.example: set your own secret",
      ),
    ]);
    expect(JSON.stringify(findings)).not.toContain(exampleSecretValues.s3SecretKey);
  });

  it("в production с примерным паролем DATABASE_URL даёт stop без пароля и адреса", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({ databaseUrl: exampleDatabaseUrl }),
    );

    expect(findings).toEqual([stopFinding(`DATABASE_URL ${databaseMessage}`)]);
    expect(JSON.stringify(findings)).not.toContain("postgres://");
    expect(JSON.stringify(findings)).not.toContain("db.internal");
  });

  it("в production с примерным паролем SOWA_MIGRATION_DATABASE_URL называет эту переменную", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({ migrationDatabaseUrl: exampleDatabaseUrl }),
    );

    expect(findings).toEqual([stopFinding(`SOWA_MIGRATION_DATABASE_URL ${databaseMessage}`)]);
  });

  it("с тремя примерными значениями даёт три находки stop", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({
        s3SecretKey: exampleSecretValues.s3SecretKey,
        databaseUrl: exampleDatabaseUrl,
        migrationDatabaseUrl: exampleDatabaseUrl,
      }),
    );

    expect(findings.map((finding) => finding.level)).toEqual(["stop", "stop", "stop"]);
  });

  it("узнаёт примерный пароль, записанный через процентное кодирование", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({ databaseUrl: "postgres://sowa:s%6Fwa@db.internal:5432/sowa" }),
    );

    expect(findings).toEqual([stopFinding(`DATABASE_URL ${databaseMessage}`)]);
  });

  it("не принимает за пароль имя пользователя или базы sowa", async () => {
    const findings = await exampleSecretsCheck.run(
      productionContext({ databaseUrl: "postgres://sowa:sowa-test@db.internal:5432/sowa" }),
    );

    expect(findings).toEqual([]);
  });

  it("со своими секретами и без SOWA_MIGRATION_DATABASE_URL ничего не находит", async () => {
    await expect(exampleSecretsCheck.run(productionContext())).resolves.toEqual([]);
  });

  it("адрес базы без пароля не считается примерным", async () => {
    const context = productionContext({ databaseUrl: "postgres://sowa@db.internal:5432/sowa" });

    await expect(exampleSecretsCheck.run(context)).resolves.toEqual([]);
  });

  it("в development с примерными значениями ничего не находит", async () => {
    const context = developmentContext({
      s3SecretKey: exampleSecretValues.s3SecretKey,
      databaseUrl: exampleDatabaseUrl,
      migrationDatabaseUrl: exampleDatabaseUrl,
    });

    await expect(exampleSecretsCheck.run(context)).resolves.toEqual([]);
  });
});

describe("s3PublicUrlCheck", () => {
  it("в production без SOWA_S3_PUBLIC_URL даёт предупреждение warn", async () => {
    const findings = await s3PublicUrlCheck.run(productionContext({ s3PublicUrl: undefined }));

    expect(findings).toEqual([
      {
        level: "warn",
        message:
          "SOWA_S3_PUBLIC_URL is not set: browsers cannot open file links until it is the public https address of the storage",
      },
    ]);
  });

  it("в production с SOWA_S3_PUBLIC_URL ничего не находит", async () => {
    await expect(s3PublicUrlCheck.run(productionContext())).resolves.toEqual([]);
  });

  it("в development без SOWA_S3_PUBLIC_URL ничего не находит", async () => {
    const context = developmentContext({ s3PublicUrl: undefined });

    await expect(s3PublicUrlCheck.run(context)).resolves.toEqual([]);
  });
});

describe("environmentChecksConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("отдаёт адреса, адреса базы и секрет S3 из окружения", () => {
    const values = {
      SOWA_ENV: "production",
      DATABASE_URL: "postgres://sowa:own-password@db.internal:5432/sowa",
      SOWA_MIGRATION_DATABASE_URL: "postgres://migrator:other-password@db.internal:5432/sowa",
      REDIS_URL: "redis://127.0.0.1:6379",
      SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
      SOWA_S3_ACCESS_KEY: "access",
      SOWA_S3_SECRET_KEY: "own-s3-secret",
      SOWA_S3_BUCKET: "sowa-chat",
      SOWA_PUBLIC_URL: "https://chat.example.com",
      SOWA_S3_PUBLIC_URL: "https://chat.example.com/storage",
      SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
      SOWA_TOKEN_SIGNING_KEYS:
        "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
      SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
    };
    for (const [name, value] of Object.entries(values)) {
      vi.stubEnv(name, value);
    }

    expect(environmentChecksConfig()).toEqual({
      env: "production",
      publicUrl: values.SOWA_PUBLIC_URL,
      s3PublicUrl: values.SOWA_S3_PUBLIC_URL,
      databaseUrl: values.DATABASE_URL,
      migrationDatabaseUrl: values.SOWA_MIGRATION_DATABASE_URL,
      s3SecretKey: values.SOWA_S3_SECRET_KEY,
    });
  });
});
