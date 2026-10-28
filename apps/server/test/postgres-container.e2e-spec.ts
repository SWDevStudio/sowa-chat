import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { DataSource } from "typeorm";
import { inject } from "vitest";

const queryTimeout = 30_000;
const envTestPort = "5432";

interface VersionRow {
  server_version: string;
}

interface IdentityRow {
  user: string;
  database: string;
}

function databaseUrl(): URL {
  return new URL(process.env.DATABASE_URL ?? "");
}

async function queryDatabase<Row>(url: string, sql: string): Promise<Row[]> {
  const dataSource = new DataSource({ type: "postgres", url });
  await dataSource.initialize();
  try {
    return await dataSource.query(sql);
  } finally {
    await dataSource.destroy();
  }
}

describe("postgres container for e2e", () => {
  it("points DATABASE_URL at the container, not at the port from .env.test", () => {
    const envTest = parseEnv(readFileSync(join(import.meta.dirname, "..", ".env.test"), "utf8"));
    const envTestUrl = envTest.DATABASE_URL;
    if (envTestUrl === undefined) {
      throw new Error(".env.test has no DATABASE_URL");
    }
    expect(new URL(envTestUrl).port).toBe(envTestPort);

    expect(databaseUrl().protocol).toBe("postgres:");
    expect(databaseUrl().port).not.toBe("");
    expect(databaseUrl().port).not.toBe(envTestPort);
  });

  it("uses the address provided by global setup", () => {
    expect(inject("databaseUrl")).toBeTruthy();
    expect(process.env.DATABASE_URL).toBe(inject("databaseUrl"));
  });

  it(
    "runs PostgreSQL 18.6 behind DATABASE_URL",
    async () => {
      const rows = await queryDatabase<VersionRow>(
        process.env.DATABASE_URL ?? "",
        "SHOW server_version",
      );
      expect(rows).toHaveLength(1);
      expect(rows[0].server_version.startsWith("18.6")).toBe(true);
    },
    queryTimeout,
  );

  it(
    "connects as sowa to the sowa database",
    async () => {
      const rows = await queryDatabase<IdentityRow>(
        process.env.DATABASE_URL ?? "",
        'SELECT current_user AS "user", current_database() AS "database"',
      );
      expect(rows).toEqual([{ user: "sowa", database: "sowa" }]);
    },
    queryTimeout,
  );

  it(
    "database contains the tables created by migrations",
    async () => {
      const rows = await queryDatabase<{ table_name: string }>(
        process.env.DATABASE_URL ?? "",
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
      );
      const tableNames = rows.map((row) => row.table_name);
      expect(tableNames).toEqual(expect.arrayContaining(["migrations", "projects"]));
    },
    queryTimeout,
  );

  it("passes DATABASE_URL to child processes started with a copy of process.env", () => {
    const child = spawnSync(
      process.execPath,
      ["-e", "process.stdout.write(process.env.DATABASE_URL ?? '')"],
      {
        env: { ...process.env },
        encoding: "utf8",
      },
    );
    expect(child.status).toBe(0);
    expect(child.stdout).toBe(process.env.DATABASE_URL);
  });
});
