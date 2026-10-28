import type { TestProject } from "vitest/node";
import { runDatabaseMigrations } from "../../src/infra/database/run-database-migrations.js";
import { startPostgresContainer } from "./postgres-container.js";

export default async function setup(project: TestProject) {
  const container = await startPostgresContainer();
  await runDatabaseMigrations(container.getConnectionUri());
  project.provide("databaseUrl", container.getConnectionUri());
  return async () => {
    await container.stop();
  };
}
