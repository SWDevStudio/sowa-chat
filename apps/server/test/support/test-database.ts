import { DataSource } from "typeorm";
import { databaseEntities } from "../../src/database-entities.js";
import { createDataSourceOptions } from "../../src/infra/database/database-options.js";

export async function truncateAllTables(dataSource: DataSource): Promise<void> {
  const rows: { tablename: string }[] = await dataSource.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> 'migrations'",
  );
  if (rows.length === 0) {
    return;
  }
  const tableNames = rows.map((row) => `"${row.tablename}"`).join(", ");
  await dataSource.query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`);
}

export function useTestDatabase(): () => DataSource {
  let dataSource: DataSource;

  beforeAll(async () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }
    dataSource = new DataSource(
      createDataSourceOptions({ url, poolSize: 2, entities: databaseEntities }),
    );
    await dataSource.initialize();
  });

  beforeEach(async () => {
    await truncateAllTables(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  return () => dataSource;
}
