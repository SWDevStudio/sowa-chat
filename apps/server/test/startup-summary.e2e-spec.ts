import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { apiZones } from "../src/infra/zones/zone.js";
import { spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { buildServer } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";
import { waitForLive, waitForOutput, zonePortsEnv } from "./support/startup-server.js";

const commandTimeout = 600_000;
const lastSummaryLine = /Secret SOWA_INIT_SERVER_KEY: \w+/;

const zonePortVariables = {
  public: "SOWA_PUBLIC_PORT",
  operator: "SOWA_OPERATOR_PORT",
  internal: "SOWA_INTERNAL_PORT",
  management: "SOWA_MANAGEMENT_PORT",
} as const;

function secretValues(): string[] {
  const encryptionKeys = process.env.SOWA_ENCRYPTION_KEYS ?? "";
  const signingKeys = process.env.SOWA_TOKEN_SIGNING_KEYS ?? "";
  return [
    encryptionKeys,
    encryptionKeys.split(":")[1] ?? "",
    signingKeys,
    signingKeys.split(":")[1] ?? "",
  ];
}

describe("сводка при старте api и worker", { timeout: commandTimeout }, () => {
  useTestDatabase();
  const directories: string[] = [];
  const servers: RunningServer[] = [];

  function createSecretsDirectory(): string {
    const directory = mkdtempSync(join(tmpdir(), "sowa-startup-summary-"));
    directories.push(directory);
    return directory;
  }

  async function startApi(overrides: Env = {}): Promise<{ server: RunningServer; env: Env }> {
    const env: Env = {
      ...process.env,
      ...(await zonePortsEnv()),
      SOWA_DEV_SECRETS_DIR: createSecretsDirectory(),
      ...overrides,
    };
    const server = spawnServer("api", env);
    servers.push(server);
    expect(await waitForLive(server, env), server.output()).toBe(true);
    return { server, env };
  }

  async function startWorker(overrides: Env = {}): Promise<RunningServer> {
    const env: Env = {
      ...process.env,
      ...(await zonePortsEnv()),
      SOWA_DEV_SECRETS_DIR: createSecretsDirectory(),
      ...overrides,
    };
    const server = spawnServer("worker", env);
    servers.push(server);
    expect(await waitForOutput(server, lastSummaryLine), server.output()).toBe(true);
    return server;
  }

  beforeAll(() => {
    buildServer();
  }, commandTimeout);

  afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => server.stop()));
    for (const directory of directories.splice(0)) {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  describe("api в development", () => {
    it("пишет режим и SOWA_ENV", async () => {
      const { server } = await startApi();

      expect(server.output()).toContain("Startup summary: mode api, SOWA_ENV development");
    });

    it.each(apiZones)("пишет зону %s с её портом", async (zone) => {
      const { server, env } = await startApi();

      const port = env[zonePortVariables[zone]];
      expect(server.output()).toContain(`Zone ${zone}: port ${port}`);
    });

    it("пишет проект main с доменом localhost", async () => {
      const { server } = await startApi();

      const output = server.output();
      expect(output).toContain("Projects: 1");
      expect(output).toContain("Project main: allowedOrigins http://localhost:5173");
      expect(output).toContain("operatorAllowedOrigins http://localhost:5174");
    });

    it("пишет Secret SOWA_ENCRYPTION_KEYS: set для ключа из env", async () => {
      const { server } = await startApi();

      const output = server.output();
      expect(output).toContain("Secret SOWA_ENCRYPTION_KEYS: set");
      expect(output).toContain("Secret SOWA_TOKEN_SIGNING_KEYS: set");
      expect(output).toContain("Secret SOWA_INIT_SERVER_KEY: notSet");
    });

    it("пишет generatedForDevelopment для сгенерированных секретов", async () => {
      const { server } = await startApi({
        SOWA_ENCRYPTION_KEYS: "",
        SOWA_TOKEN_SIGNING_KEYS: "",
        SOWA_TOKEN_SIGNING_KEY_ID: "",
      });

      const output = server.output();
      expect(output).toContain("Secret SOWA_ENCRYPTION_KEYS: generatedForDevelopment");
      expect(output).toContain("Secret SOWA_TOKEN_SIGNING_KEYS: generatedForDevelopment");
    });

    it("пишет сводку после начальной настройки проекта", async () => {
      const { server } = await startApi();

      const output = server.output();
      const created = output.indexOf("Development project main: publicKey");
      const summary = output.indexOf("Startup summary: mode api");
      expect(created).toBeGreaterThanOrEqual(0);
      expect(summary).toBeGreaterThan(created);
    });

    it("не пишет значения SOWA_ENCRYPTION_KEYS и SOWA_TOKEN_SIGNING_KEYS", async () => {
      const { server } = await startApi();

      const output = server.output();
      for (const value of secretValues()) {
        expect(value).not.toBe("");
        expect(output).not.toContain(value);
      }
    });
  });

  describe("worker", () => {
    it("пишет Startup summary: mode worker и не пишет зоны", async () => {
      const server = await startWorker();

      const output = server.output();
      expect(output).toContain("Startup summary: mode worker, SOWA_ENV development");
      expect(output).not.toMatch(/Zone (public|operator|internal|management): port/);
    });

    it("пишет проекты и секреты", async () => {
      const server = await startWorker();

      const output = server.output();
      expect(output).toMatch(/Projects: \d+/);
      expect(output).toContain("Secret SOWA_ENCRYPTION_KEYS: set");
    });

    it("не пишет значения SOWA_ENCRYPTION_KEYS и SOWA_TOKEN_SIGNING_KEYS", async () => {
      const server = await startWorker();

      const output = server.output();
      for (const value of secretValues()) {
        expect(value).not.toBe("");
        expect(output).not.toContain(value);
      }
    });
  });
});
