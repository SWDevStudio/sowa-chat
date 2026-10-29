import pino from "pino";
import { parseLogLine, spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { productionOverrides } from "./support/production-env.js";
import { buildServer } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";
import { useTestRedis } from "./support/test-redis.js";
import { waitForExit, waitForLive, waitForOutput, zonePortsEnv } from "./support/startup-server.js";

const commandTimeout = 600_000;
const evictionMessage = "maxmemory-policy is allkeys-lru";
const warnLevel = pino.levels.values.warn;

interface LogEntry {
  level?: unknown;
  msg?: unknown;
}

function entriesWith(output: string, text: string): LogEntry[] {
  return output
    .split(/\r?\n/)
    .map(parseLogLine<LogEntry>)
    .filter((entry) => entry !== undefined)
    .filter((entry) => typeof entry.msg === "string" && entry.msg.includes(text));
}

describe("проверка maxmemory-policy при старте api", { timeout: commandTimeout }, () => {
  useTestDatabase();
  const getRedis = useTestRedis();
  const servers: RunningServer[] = [];

  async function startApi(overrides: Env = {}): Promise<{ server: RunningServer; env: Env }> {
    const env: Env = { ...process.env, ...(await zonePortsEnv()), ...overrides };
    const server = spawnServer("api", env);
    servers.push(server);
    return { server, env };
  }

  beforeAll(() => {
    buildServer();
  }, commandTimeout);

  beforeEach(async () => {
    await getRedis().config("SET", "maxmemory-policy", "allkeys-lru");
  });

  afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => server.stop()));
    await getRedis().config("SET", "maxmemory-policy", "noeviction");
  });

  describe("production", () => {
    it("при allkeys-lru завершается с ненулевым кодом и называет значение", async () => {
      const { server } = await startApi(productionOverrides);

      const exitCode = await waitForExit(server);

      expect(exitCode, server.output()).not.toBe(0);
      expect(exitCode, server.output()).not.toBeNull();
      expect(server.output()).toContain(evictionMessage);
      expect(server.output()).toContain("BullMQ needs noeviction");
    });

    it("при noeviction стартует без этого сообщения", async () => {
      await getRedis().config("SET", "maxmemory-policy", "noeviction");
      const { server, env } = await startApi(productionOverrides);

      const live = await waitForLive(server, env);

      expect(live, server.output()).toBe(true);
      expect(server.output()).not.toContain("maxmemory-policy is");
    });
  });

  describe("development", () => {
    it("при allkeys-lru стартует и пишет то же сообщение предупреждением", async () => {
      const { server, env } = await startApi();

      const live = await waitForLive(server, env);
      const warned = await waitForOutput(server, new RegExp(evictionMessage));

      expect(live, server.output()).toBe(true);
      expect(warned, server.output()).toBe(true);
      const entries = entriesWith(server.output(), evictionMessage);
      expect(entries.length, server.output()).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.level, server.output()).toBe(warnLevel);
      }
    });

    it("при noeviction стартует без этого сообщения", async () => {
      await getRedis().config("SET", "maxmemory-policy", "noeviction");
      const { server, env } = await startApi();

      const live = await waitForLive(server, env);

      expect(live, server.output()).toBe(true);
      expect(server.output()).not.toContain("maxmemory-policy is");
    });
  });
});
