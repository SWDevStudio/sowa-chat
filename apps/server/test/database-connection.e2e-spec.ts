import { Test } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { DataSource } from "typeorm";
import { AppConfigModule } from "../src/infra/config/config.module.js";
import { DatabaseModule } from "../src/infra/database/database.module.js";
import { findFreePort, spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const exitTimeout = 30_000;
const retryBudget = 20_000;
const applicationName = "sowa-chat-server";
const unreachablePassword = "unreachable-db-password-7f3a";

interface RunResult {
  exitCode: number | null;
  output: string;
}

async function serverEnvironment(databaseUrl: string): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    DATABASE_URL: databaseUrl,
  };
}

async function unreachableDatabaseUrl(password: string): Promise<string> {
  const freePort = await findFreePort();
  return `postgres://sowa:${password}@127.0.0.1:${freePort}/sowa`;
}

function runToExit(mode: string, env: Env): Promise<RunResult> {
  return new Promise((resolveRun) => {
    const server = spawnServer(mode, env);
    const timer = setTimeout(() => server.process.kill(), exitTimeout);
    server.process.on("close", (exitCode) => {
      clearTimeout(timer);
      resolveRun({ exitCode, output: server.output() });
    });
  });
}

async function fetchStatus(url: string): Promise<number | undefined> {
  try {
    const response = await fetch(url);
    return response.status;
  } catch {
    return undefined;
  }
}

async function waitForHttpStatus(url: string, server: RunningServer): Promise<number | undefined> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    const status = await fetchStatus(url);
    if (status !== undefined) {
      return status;
    }
    await delay(250);
  }
  return undefined;
}

async function countNamedConnections(): Promise<number> {
  const dataSource = new DataSource({ type: "postgres", url: process.env.DATABASE_URL });
  await dataSource.initialize();
  try {
    const rows: { count: number }[] = await dataSource.query(
      "SELECT count(*)::int AS count FROM pg_stat_activity WHERE application_name = $1",
      [applicationName],
    );
    return rows[0].count;
  } finally {
    await dataSource.destroy();
  }
}

describe("подключение к PostgreSQL", { timeout: commandTimeout }, () => {
  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  it("api с базой контейнера отвечает 404 и держит соединение sowa-chat-server", async () => {
    const env = await serverEnvironment(process.env.DATABASE_URL ?? "");
    const server = spawnServer("api", env);
    try {
      const status = await waitForHttpStatus(
        `http://127.0.0.1:${env.SOWA_PUBLIC_PORT}/no-such-path`,
        server,
      );

      expect(status, server.output()).toBe(404);
      expect(await countNamedConnections()).toBeGreaterThanOrEqual(1);
    } finally {
      await server.stop();
    }
  });

  it.each(["api", "worker", "cli"])(
    "%s без доступной базы завершается с кодом 1 и ECONNREFUSED",
    async (mode) => {
      const env = await serverEnvironment(await unreachableDatabaseUrl("sowa"));

      const result = await runToExit(mode, env);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("ECONNREFUSED");
    },
  );

  it("api без базы завершается за время ретраев, а не за 30 секунд", async () => {
    const env = await serverEnvironment(await unreachableDatabaseUrl("sowa"));
    const startedAt = Date.now();

    const result = await runToExit("api", env);

    expect(result.exitCode, result.output).toBe(1);
    expect(Date.now() - startedAt).toBeLessThan(retryBudget);
  });

  it("не пишет пароль из DATABASE_URL в вывод при ошибке подключения", async () => {
    const env = await serverEnvironment(await unreachableDatabaseUrl(unreachablePassword));

    const result = await runToExit("api", env);

    expect(result.exitCode, result.output).toBe(1);
    expect(result.output).not.toContain(unreachablePassword);
  });

  it("DataSource инициализирован после запуска и закрыт после app.close()", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, DatabaseModule.forRoot([])],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    const dataSource = app.get<DataSource>(getDataSourceToken());

    expect(dataSource.isInitialized).toBe(true);

    await app.close();

    expect(dataSource.isInitialized).toBe(false);
  });
});
