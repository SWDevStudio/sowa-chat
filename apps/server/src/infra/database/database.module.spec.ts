import type { INestApplication } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";
import { DatabaseModule } from "./database.module.js";

describe("DatabaseModule.forRoot", () => {
  it("returns DatabaseModule with the TypeORM root module among its imports", () => {
    const dynamicModule = DatabaseModule.forRoot([]);

    expect(dynamicModule.module).toBe(DatabaseModule);
    expect(dynamicModule.imports).toContainEqual(
      expect.objectContaining({ module: TypeOrmModule }),
    );
  });

  it("builds a new dynamic module on every call", () => {
    expect(DatabaseModule.forRoot([])).not.toBe(DatabaseModule.forRoot([]));
  });
});

describe("ApiModule in unit tests", () => {
  let app: INestApplication | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("starts without a running PostgreSQL and leaves the data source uninitialized", async () => {
    stubTestEnv({ DATABASE_URL: "postgres://test:test@127.0.0.1:1/test" });

    app = await createProbeApp();

    const dataSource = app.get<{ isInitialized: boolean }>(getDataSourceToken(), {
      strict: false,
    });
    expect(dataSource.isInitialized).toBe(false);
  });
});
