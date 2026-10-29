import { spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { productionOverrides } from "./support/production-env.js";
import { buildServer } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";
import { waitForExit, waitForLive, waitForOutput, zonePortsEnv } from "./support/startup-server.js";

const commandTimeout = 600_000;
const exampleS3Secret = "sowa-dev-secret";
const exampleDatabaseRole = "sowa_example_password";
const exampleDatabasePassword = "sowa";

describe("настройки production при старте api", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const servers: RunningServer[] = [];

  async function productionEnv(overrides: Env = {}): Promise<Env> {
    return {
      ...process.env,
      ...(await zonePortsEnv()),
      ...productionOverrides,
      ...overrides,
    };
  }

  function startApi(env: Env): RunningServer {
    const server = spawnServer("api", env);
    servers.push(server);
    return server;
  }

  beforeAll(() => {
    buildServer();
  }, commandTimeout);

  afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => server.stop()));
  });

  describe("критичные настройки", () => {
    it("с http в SOWA_PUBLIC_URL и примерным SOWA_S3_SECRET_KEY завершается с ошибкой и называет обе проблемы", async () => {
      const env = await productionEnv({
        SOWA_PUBLIC_URL: "http://chat.example.com",
        SOWA_S3_SECRET_KEY: exampleS3Secret,
      });
      const server = startApi(env);

      const exitCode = await waitForExit(server);

      expect(exitCode, server.output()).not.toBe(0);
      expect(exitCode, server.output()).not.toBeNull();
      expect(server.output()).toContain("SOWA_PUBLIC_URL must use https");
      expect(server.output()).toContain("SOWA_S3_SECRET_KEY has the example value");
    });

    it("не пишет примерный секрет в вывод", async () => {
      const env = await productionEnv({ SOWA_S3_SECRET_KEY: exampleS3Secret });
      const server = startApi(env);

      const exitCode = await waitForExit(server);

      expect(exitCode, server.output()).not.toBe(0);
      expect(server.output()).toContain("SOWA_S3_SECRET_KEY has the example value");
      expect(server.output()).not.toContain(exampleS3Secret);
    });

    it("с http в SOWA_S3_PUBLIC_URL завершается с ошибкой", async () => {
      const env = await productionEnv({ SOWA_S3_PUBLIC_URL: "http://chat.example.com/storage" });
      const server = startApi(env);

      const exitCode = await waitForExit(server);

      expect(exitCode, server.output()).not.toBe(0);
      expect(server.output()).toContain("SOWA_S3_PUBLIC_URL must use https");
    });

    it("с примерным паролем DATABASE_URL завершается с ошибкой без пароля в выводе", async () => {
      const dataSource = getDataSource();
      await dataSource.query(
        `CREATE ROLE ${exampleDatabaseRole} LOGIN PASSWORD '${exampleDatabasePassword}'`,
      );
      await dataSource.query(`GRANT ALL ON ALL TABLES IN SCHEMA public TO ${exampleDatabaseRole}`);
      const url = new URL(process.env.DATABASE_URL ?? "");
      url.username = exampleDatabaseRole;
      url.password = exampleDatabasePassword;
      const env = await productionEnv({ DATABASE_URL: url.toString() });
      const server = startApi(env);

      const exitCode = await waitForExit(server);
      await dataSource.query(`DROP OWNED BY ${exampleDatabaseRole}`);
      await dataSource.query(`DROP ROLE ${exampleDatabaseRole}`);

      expect(exitCode, server.output()).not.toBe(0);
      expect(server.output()).toContain("DATABASE_URL uses the example password");
      expect(server.output()).not.toContain(url.toString());
    });
  });

  describe("production с productionOverrides", () => {
    it("стартует и пишет предупреждение, что SOWA_S3_PUBLIC_URL не задан", async () => {
      const env = await productionEnv();
      const server = startApi(env);

      const live = await waitForLive(server, env);
      const warned = await waitForOutput(server, /SOWA_S3_PUBLIC_URL is not set/);

      expect(live, server.output()).toBe(true);
      expect(warned, server.output()).toBe(true);
    });

    it("с https в SOWA_S3_PUBLIC_URL стартует без этого предупреждения", async () => {
      const env = await productionEnv({ SOWA_S3_PUBLIC_URL: "https://chat.example.com/storage" });
      const server = startApi(env);

      const live = await waitForLive(server, env);

      expect(live, server.output()).toBe(true);
      expect(server.output()).not.toContain("SOWA_S3_PUBLIC_URL is not set");
    });
  });

  describe("development", () => {
    it("стартует с http в SOWA_PUBLIC_URL", async () => {
      const env: Env = {
        ...process.env,
        ...(await zonePortsEnv()),
        SOWA_PUBLIC_URL: "http://localhost:8080",
      };
      const server = startApi(env);

      const live = await waitForLive(server, env);

      expect(live, server.output()).toBe(true);
      expect(server.output()).not.toContain("must use https");
    });
  });
});
