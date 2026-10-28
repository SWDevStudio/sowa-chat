import type { TestProject } from "vitest/node";
import { startPostgresContainer } from "./postgres-container.js";

export default async function setup(project: TestProject) {
  const container = await startPostgresContainer();
  project.provide("databaseUrl", container.getConnectionUri());
  return async () => {
    await container.stop();
  };
}
