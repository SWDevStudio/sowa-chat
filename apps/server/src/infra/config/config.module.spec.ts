import type { ConfigType } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { appConfig } from "./app.config.js";
import { databaseConfig } from "./database.config.js";
import { portsConfig } from "./ports.config.js";
import { redisConfig } from "./redis.config.js";
import { s3Config } from "./s3.config.js";

const testEnv = {
  NODE_ENV: "test",
  SOWA_ENV: "development",
  SOWA_PUBLIC_PORT: "18080",
  SOWA_OPERATOR_PORT: "18081",
  SOWA_INTERNAL_PORT: "18082",
  SOWA_MANAGEMENT_PORT: "19090",
  DATABASE_URL: "postgres://test:test@127.0.0.1:5432/test",
  REDIS_URL: "redis://127.0.0.1:6380",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:9333",
  SOWA_S3_ACCESS_KEY: "test-access",
  SOWA_S3_SECRET_KEY: "test-secret",
  SOWA_S3_BUCKET: "test-bucket",
  SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
  SOWA_TOKEN_SIGNING_KEYS:
    "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
  SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
};

function stubTestEnv(): void {
  for (const [name, value] of Object.entries(testEnv)) {
    vi.stubEnv(name, value);
  }
}

async function compileConfigModule(): Promise<TestingModule> {
  vi.resetModules();
  const { AppConfigModule } = await import("./config.module.js");
  return Test.createTestingModule({ imports: [AppConfigModule] }).compile();
}

describe("AppConfigModule", () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    stubTestEnv();
    moduleRef = await compileConfigModule();
  });

  afterEach(async () => {
    await moduleRef.close();
    vi.unstubAllEnvs();
  });

  it("отдаёт группу app", () => {
    const app = moduleRef.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    expect(app).toEqual({ env: "development", nodeEnv: "test" });
  });

  it("отдаёт группу ports числами без префиксов", () => {
    const ports = moduleRef.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);

    expect(ports).toEqual({ public: 18080, operator: 18081, internal: 18082, management: 19090 });
  });

  it("отдаёт группу database", () => {
    const database = moduleRef.get<ConfigType<typeof databaseConfig>>(databaseConfig.KEY);

    expect(database).toEqual({
      url: testEnv.DATABASE_URL,
      poolSize: 10,
      migrationUrl: testEnv.DATABASE_URL,
    });
  });

  it("отдаёт группу redis", () => {
    const redis = moduleRef.get<ConfigType<typeof redisConfig>>(redisConfig.KEY);

    expect(redis).toEqual({ url: testEnv.REDIS_URL });
  });

  it("отдаёт группу s3", () => {
    const s3 = moduleRef.get<ConfigType<typeof s3Config>>(s3Config.KEY);

    expect(s3).toEqual({
      endpoint: testEnv.SOWA_S3_ENDPOINT,
      accessKey: testEnv.SOWA_S3_ACCESS_KEY,
      secretKey: testEnv.SOWA_S3_SECRET_KEY,
      bucket: testEnv.SOWA_S3_BUCKET,
    });
  });

  it("типизирует группы через ConfigType", () => {
    expectTypeOf<ConfigType<typeof appConfig>>()
      .toHaveProperty("env")
      .toEqualTypeOf<"development" | "production">();
    expectTypeOf<ConfigType<typeof portsConfig>>().toHaveProperty("public").toEqualTypeOf<number>();
    expectTypeOf<ConfigType<typeof portsConfig>>()
      .toHaveProperty("management")
      .toEqualTypeOf<number>();
    expectTypeOf<ConfigType<typeof databaseConfig>>().toHaveProperty("url").toEqualTypeOf<string>();
    expectTypeOf<ConfigType<typeof databaseConfig>>()
      .toHaveProperty("poolSize")
      .toEqualTypeOf<number>();
    expectTypeOf<ConfigType<typeof databaseConfig>>()
      .toHaveProperty("migrationUrl")
      .toEqualTypeOf<string>();
  });
});

describe("AppConfigModule, группа database с переменными базы", () => {
  const migrationUrl = "postgres://migrator:secret@127.0.0.1:5432/test";
  let moduleRef: TestingModule;

  async function compileWith(
    extraEnv: Record<string, string>,
  ): Promise<ConfigType<typeof databaseConfig>> {
    stubTestEnv();
    for (const [name, value] of Object.entries(extraEnv)) {
      vi.stubEnv(name, value);
    }
    moduleRef = await compileConfigModule();
    return moduleRef.get<ConfigType<typeof databaseConfig>>(databaseConfig.KEY);
  }

  afterEach(async () => {
    await moduleRef.close();
    vi.unstubAllEnvs();
  });

  it("отдаёт poolSize из SOWA_DB_POOL_SIZE", async () => {
    const database = await compileWith({ SOWA_DB_POOL_SIZE: "25" });

    expect(database.poolSize).toBe(25);
  });

  it("отдаёт migrationUrl из SOWA_MIGRATION_DATABASE_URL", async () => {
    const database = await compileWith({ SOWA_MIGRATION_DATABASE_URL: migrationUrl });

    expect(database).toEqual({
      url: testEnv.DATABASE_URL,
      poolSize: 10,
      migrationUrl,
    });
  });

  it("при пустом SOWA_MIGRATION_DATABASE_URL отдаёт migrationUrl равный DATABASE_URL", async () => {
    const database = await compileWith({ SOWA_MIGRATION_DATABASE_URL: "" });

    expect(database.migrationUrl).toBe(testEnv.DATABASE_URL);
  });
});
