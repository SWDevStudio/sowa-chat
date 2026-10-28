import { DataSource } from "typeorm";
import { databaseMigrations } from "./database-migrations.js";
import type { DatabaseMigration } from "./database-migrations.js";
import { createDataSourceOptions } from "./database-options.js";

export async function runDatabaseMigrations(
  url: string,
  migrations: DatabaseMigration[] = databaseMigrations,
): Promise<string[]> {
  const dataSource = new DataSource({
    ...createDataSourceOptions({ url, poolSize: 1, entities: [] }),
    migrations,
  });
  await dataSource.initialize();
  try {
    const applied = await dataSource.runMigrations();
    return applied.map((migration) => migration.name);
  } finally {
    await dataSource.destroy();
  }
}
