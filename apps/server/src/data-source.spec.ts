import { stubTestEnv } from "../test/support/unit-probe.js";

const migrationUrl = "postgres://migrator:secret@127.0.0.1:5432/test";

async function loadDataSource() {
  vi.resetModules();
  const { DataSource } = await import("typeorm");
  const { databaseEntities } = await import("./database-entities.js");
  const module = await import("./data-source.js");
  return { DataSource, databaseEntities, dataSource: module.default };
}

describe("data-source", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("exports a DataSource", async () => {
    stubTestEnv();

    const { DataSource, dataSource } = await loadDataSource();

    expect(dataSource).toBeInstanceOf(DataSource);
  });

  it("uses the same entities as the application", async () => {
    stubTestEnv();

    const { databaseEntities, dataSource } = await loadDataSource();

    expect(dataSource.options.entities).toBe(databaseEntities);
  });

  it("uses SOWA_MIGRATION_DATABASE_URL when it is set", async () => {
    stubTestEnv({ SOWA_MIGRATION_DATABASE_URL: migrationUrl });

    const { dataSource } = await loadDataSource();

    expect(dataSource.options).toMatchObject({ url: migrationUrl });
  });

  it("falls back to DATABASE_URL when SOWA_MIGRATION_DATABASE_URL is not set", async () => {
    stubTestEnv();
    vi.stubEnv("SOWA_MIGRATION_DATABASE_URL", undefined);

    const { dataSource } = await loadDataSource();

    expect(dataSource.options).toMatchObject({ url: "postgres://test:test@127.0.0.1:5432/test" });
  });

  it("carries the migration list and transaction mode", async () => {
    stubTestEnv();

    const { dataSource } = await loadDataSource();

    expect(dataSource.options).toMatchObject({ migrationsTransactionMode: "each" });
  });
});
