import type { TestProject } from "vitest/node";
import { runDatabaseMigrations } from "../../src/infra/database/run-database-migrations.js";
import { startPostgresContainer } from "./postgres-container.js";
import { startValkeyContainer, valkeyUrl } from "./valkey-container.js";

export default async function setup(project: TestProject) {
  const [postgres, valkey] = await Promise.all([startPostgresContainer(), startValkeyContainer()]);
  await runDatabaseMigrations(postgres.getConnectionUri());
  project.provide("databaseUrl", postgres.getConnectionUri());
  project.provide("redisUrl", valkeyUrl(valkey));
  return async () => {
    await Promise.all([postgres.stop(), valkey.stop()]);
  };
}
