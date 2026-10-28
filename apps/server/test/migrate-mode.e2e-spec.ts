import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { Client } from "pg";
import type { MigrationInterface, QueryRunner } from "typeorm";
import { runDatabaseMigrations } from "../src/infra/database/run-database-migrations.js";
import { findFreePort, spawnServer } from "./support/e2e-server.js";
import type { Env } from "./support/e2e-server.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const commandTimeout = 600_000;
const exitTimeout = 30_000;

interface RunResult {
  exitCode: number | null;
  output: string;
}

class BrokenMigration1700000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("SELECT * FROM missing_table");
  }

  async down(): Promise<void> {}
}

function withDatabase(url: string, database: string): string {
  const parsed = new URL(url);
  parsed.pathname = `/${database}`;
  return parsed.toString();
}

async function unreachableUrl(): Promise<string> {
  const port = await findFreePort();
  return `postgres://sowa:sowa@127.0.0.1:${port}/sowa`;
}

async function migrateEnvironment(
  databaseUrl: string,
  migrationUrl: string | undefined,
): Promise<Env> {
  const env: Env = {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    DATABASE_URL: databaseUrl,
  };
  if (migrationUrl === undefined) {
    delete env.SOWA_MIGRATION_DATABASE_URL;
  } else {
    env.SOWA_MIGRATION_DATABASE_URL = migrationUrl;
  }
  return env;
}

async function runMigrate(databaseUrl: string, migrationUrl?: string): Promise<RunResult> {
  const env = await migrateEnvironment(databaseUrl, migrationUrl);
  const server = spawnServer("migrate", env);
  const timer = setTimeout(() => server.process.kill(), exitTimeout);
  const exitCode = await new Promise<number | null>((resolveExit) => {
    server.process.on("close", resolveExit);
  });
  clearTimeout(timer);
  return { exitCode, output: server.output() };
}

async function withClient<Result>(
  url: string,
  action: (client: Client) => Promise<Result>,
): Promise<Result> {
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    return await action(client);
  } finally {
    await client.end();
  }
}

function countMigrationRows(url: string): Promise<number> {
  return withClient(url, async (client) => {
    const result = await client.query("SELECT count(*)::int AS total FROM migrations");
    return result.rows[0].total;
  });
}

describe("режим migrate", { timeout: commandTimeout }, () => {
  const containerUrl = process.env.DATABASE_URL as string;
  const createdDatabases: string[] = [];

  async function createDatabase(): Promise<string> {
    const name = `migrate_${randomUUID().replaceAll("-", "")}`;
    await withClient(containerUrl, (client) => client.query(`CREATE DATABASE ${name}`));
    createdDatabases.push(name);
    return withDatabase(containerUrl, name);
  }

  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  afterAll(async () => {
    for (const name of createdDatabases) {
      await withClient(containerUrl, (client) =>
        client.query(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`),
      );
    }
  });

  it("в новой базе создаёт таблицу migrations, повторный запуск ничего не меняет", async () => {
    const url = await createDatabase();

    const first = await runMigrate(url);
    expect(first.exitCode, first.output).toBe(0);
    const rowsAfterFirst = await countMigrationRows(url);

    const second = await runMigrate(url);
    expect(second.exitCode, second.output).toBe(0);
    expect(await countMigrationRows(url)).toBe(rowsAfterFirst);
  });

  it("пишет в лог начало и конец шага databaseMigrations", async () => {
    const url = await createDatabase();

    const result = await runMigrate(url);

    expect(result.exitCode, result.output).toBe(0);
    expect(result.output).toContain("Preparation step started");
    expect(result.output).toContain("Preparation step finished");
    expect(result.output).toContain("databaseMigrations");
    expect(result.output).toContain("Database migrations applied");
  });

  it("берёт SOWA_MIGRATION_DATABASE_URL вместо недоступного DATABASE_URL", async () => {
    const result = await runMigrate(await unreachableUrl(), containerUrl);

    expect(result.exitCode, result.output).toBe(0);
  });

  it("с недоступным SOWA_MIGRATION_DATABASE_URL выходит с кодом 1 и ECONNREFUSED", async () => {
    const result = await runMigrate(containerUrl, await unreachableUrl());

    expect(result.exitCode, result.output).toBe(1);
    expect(result.output).toContain("ECONNREFUSED");
  });

  it("сломанная миграция отклоняется ошибкой и не попадает в migrations", async () => {
    const url = await createDatabase();

    await expect(runDatabaseMigrations(url, [BrokenMigration1700000000000])).rejects.toThrow(
      /missing_table/,
    );

    const names = await withClient(url, async (client) => {
      const result = await client.query("SELECT name FROM migrations");
      return result.rows.map((row) => row.name);
    });
    expect(names).not.toContain("BrokenMigration1700000000000");
  });

  it("без миграций возвращает пустой список применённых", async () => {
    const url = await createDatabase();

    await expect(runDatabaseMigrations(url, [])).resolves.toEqual([]);
  });
});
