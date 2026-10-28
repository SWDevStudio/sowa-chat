import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { findFreePort, spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverPackageJson = resolve(import.meta.dirname, "../package.json");
const commandTimeout = 600_000;
const startupTimeout = 30_000;

interface DependencyStatusBody {
  status: string;
  reason?: string;
}

interface StatusBody {
  version: string;
  mode: string;
  uptimeSeconds: number;
  postgres: DependencyStatusBody;
  redis: DependencyStatusBody;
}

function serverVersion(): string {
  return (JSON.parse(readFileSync(serverPackageJson, "utf8")) as { version: string }).version;
}

async function serverEnvironment(): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
  };
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

describe("проверки здоровья и /status", { timeout: commandTimeout }, () => {
  let env: Env;
  let server: RunningServer;

  function managementUrl(path: string): string {
    return `http://127.0.0.1:${env.SOWA_MANAGEMENT_PORT}${path}`;
  }

  beforeAll(async () => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
    env = await serverEnvironment();
    server = spawnServer("api", env);
    const status = await waitForHttpStatus(managementUrl("/health/live"), server);
    expect(status, server.output()).toBe(200);
  }, commandTimeout);

  afterAll(async () => {
    await server?.stop();
  });

  it("/health/live на служебном порту отвечает 200", async () => {
    const response = await fetch(managementUrl("/health/live"));

    expect(response.status, server.output()).toBe(200);
  });

  it("/health/ready на служебном порту отвечает 200, postgres, redis и replica up", async () => {
    const response = await fetch(managementUrl("/health/ready"));
    const body = (await response.json()) as {
      status: string;
      info: Record<string, { status: string }>;
    };

    expect(response.status, server.output()).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.info.postgres.status).toBe("up");
    expect(body.info.redis.status).toBe("up");
    expect(body.info.replica.status).toBe("up");
  });

  it("/status отвечает 200 с версией сервера, режимом api, целым аптаймом и postgres, redis up", async () => {
    const response = await fetch(managementUrl("/status"));
    const body = (await response.json()) as StatusBody;

    expect(response.status, server.output()).toBe(200);
    expect(body.version).toBe(serverVersion());
    expect(body.mode).toBe("api");
    expect(Number.isInteger(body.uptimeSeconds)).toBe(true);
    expect(body.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(body.postgres).toEqual({ status: "up" });
    expect(body.redis).toEqual({ status: "up" });
  });

  it("в теле /status нет DATABASE_URL, REDIS_URL и пароля базы", async () => {
    const databaseUrl = process.env.DATABASE_URL ?? "";
    const redisUrl = process.env.REDIS_URL ?? "";
    const databasePassword = new URL(databaseUrl).password;

    const text = await (await fetch(managementUrl("/status"))).text();

    expect(databasePassword.length).toBeGreaterThan(0);
    expect(text).not.toContain(databaseUrl);
    expect(text).not.toContain(redisUrl);
    expect(text).not.toContain(databasePassword);
  });

  it.each(["/health/live", "/health/ready", "/status"])(
    "%s на публичном порту отвечает 404",
    async (path) => {
      const response = await fetch(`http://127.0.0.1:${env.SOWA_PUBLIC_PORT}${path}`);

      expect(response.status).toBe(404);
    },
  );
});
