import pino from "pino";
import { parseLogLine, spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { productionOverrides } from "./support/production-env.js";
import { buildServer } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";
import { useTestRedis } from "./support/test-redis.js";
import { waitForLive, waitForOutput, zonePortsEnv } from "./support/startup-server.js";

const commandTimeout = 600_000;
const superuserMessage = "connects to PostgreSQL as a superuser";
const schemaMessage = "can change the database schema";
const versionMessage = "is older than 18";
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

describe("проверки PostgreSQL при старте api", { timeout: commandTimeout }, () => {
  useTestDatabase();
  useTestRedis();
  const servers: RunningServer[] = [];

  async function startApi(overrides: Env = {}): Promise<{ server: RunningServer; env: Env }> {
    const env: Env = { ...process.env, ...(await zonePortsEnv()), ...overrides };
    delete env.SOWA_MIGRATION_DATABASE_URL;
    const server = spawnServer("api", env);
    servers.push(server);
    return { server, env };
  }

  beforeAll(() => {
    buildServer();
  }, commandTimeout);

  afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => server.stop()));
  });

  describe("production под суперпользователем тестового PostgreSQL", () => {
    it("стартует и предупреждает о суперпользователе и о праве менять схему", async () => {
      const { server, env } = await startApi(productionOverrides);

      const live = await waitForLive(server, env);
      const superuserWarned = await waitForOutput(server, new RegExp(superuserMessage));
      const schemaWarned = await waitForOutput(server, new RegExp(schemaMessage));

      expect(live, server.output()).toBe(true);
      expect(superuserWarned, server.output()).toBe(true);
      expect(schemaWarned, server.output()).toBe(true);
    });

    it("пишет оба предупреждения уровнем warn", async () => {
      const { server, env } = await startApi(productionOverrides);

      await waitForLive(server, env);
      await waitForOutput(server, new RegExp(schemaMessage));

      for (const text of [superuserMessage, schemaMessage]) {
        const entries = entriesWith(server.output(), text);
        expect(entries.length, server.output()).toBeGreaterThan(0);
        for (const entry of entries) {
          expect(entry.level, server.output()).toBe(warnLevel);
        }
      }
    });

    it("не пишет про версию: тестовый PostgreSQL 18", async () => {
      const { server, env } = await startApi(productionOverrides);

      await waitForLive(server, env);
      await waitForOutput(server, new RegExp(schemaMessage));

      expect(server.output()).not.toContain(versionMessage);
    });
  });

  describe("development", () => {
    it("стартует без предупреждений о суперпользователе и праве менять схему", async () => {
      const { server, env } = await startApi();

      const live = await waitForLive(server, env);

      expect(live, server.output()).toBe(true);
      expect(server.output()).not.toContain(superuserMessage);
      expect(server.output()).not.toContain(schemaMessage);
    });
  });
});
