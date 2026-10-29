import { PostgreSqlContainer } from "@testcontainers/postgresql";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

export function startPostgresContainer(): Promise<StartedPostgreSqlContainer> {
  return new PostgreSqlContainer("postgres:18.6")
    .withDatabase("sowa")
    .withUsername("sowa")
    .withPassword("sowa-test")
    .start();
}
