import { Test } from "@nestjs/testing";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { Redis } from "ioredis";
import { vi } from "vitest";
import { AppConfigModule } from "../src/infra/config/config.module.js";
import { RedisModule } from "../src/infra/redis/redis.module.js";
import { findFreePort, spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { useTestRedis } from "./support/test-redis.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const exitTimeout = 30_000;
const retryBudget = 20_000;
const clientName = "name=sowa-chat-server";
const unreachablePassword = "unreachable-redis-password-5c1d";

interface RunResult {
  exitCode: number | null;
  output: string;
}

async function serverEnvironment(redisUrl: string): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    REDIS_URL: redisUrl,
  };
}

async function unreachableRedisUrl(): Promise<string> {
  const freePort = await findFreePort();
  return `redis://:${unreachablePassword}@127.0.0.1:${freePort}`;
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

describe("подключение к Redis", { timeout: commandTimeout }, () => {
  const testRedis = useTestRedis();

  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  it("RedisModule отдаёт клиент с PONG и именем соединения, после close клиент закрыт", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, RedisModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    const client = app.get(Redis);

    expect(await client.ping()).toBe("PONG");
    expect(await testRedis().call("CLIENT", "LIST")).toContain(clientName);

    await app.close();

    await vi.waitFor(() => expect(client.status).toBe("end"));
    expect(await testRedis().call("CLIENT", "LIST")).not.toContain(clientName);
  });

  it("api с Valkey контейнера отвечает 404 и держит соединение sowa-chat-server", async () => {
    const env = await serverEnvironment(process.env.REDIS_URL ?? "");
    const server = spawnServer("api", env);
    try {
      const status = await waitForHttpStatus(
        `http://127.0.0.1:${env.SOWA_PUBLIC_PORT}/no-such-path`,
        server,
      );

      expect(status, server.output()).toBe(404);
      expect(await testRedis().call("CLIENT", "LIST")).toContain(clientName);
    } finally {
      await server.stop();
    }
  });

  it.each(["api", "worker"])(
    "%s без доступного Redis завершается с кодом 1 быстрее 20 секунд без пароля в выводе",
    async (mode) => {
      const env = await serverEnvironment(await unreachableRedisUrl());
      const startedAt = Date.now();

      const result = await runToExit(mode, env);

      expect(result.exitCode, result.output).toBe(1);
      expect(Date.now() - startedAt).toBeLessThan(retryBudget);
      expect(result.output).toContain("ECONNREFUSED");
      expect(result.output).not.toContain(unreachablePassword);
    },
  );
});
