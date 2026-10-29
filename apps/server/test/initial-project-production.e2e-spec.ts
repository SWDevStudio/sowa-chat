import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { generateKey, parseKey, toLookupPrefix } from "../src/domain/keys/key-format.js";
import { spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { productionOverrides } from "./support/production-env.js";
import { buildServer } from "./support/project-cli.js";
import { projectRows, sha256 } from "./support/project-rows.js";
import { waitForExit, waitForLive, waitForOutput, zonePortsEnv } from "./support/startup-server.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const anyKeyPattern = /(pk|sk)_[0-9A-Za-z]{43}_[0-9A-Za-z]{6}/;
const createdLine = "Initial project shop created from SOWA_INIT_PROJECT";
const mismatchWarning = "SOWA_INIT_SERVER_KEY does not match any active serverKey of project shop";
const invalidKeyError = "SOWA_INIT_SERVER_KEY must be a serverKey";

function withBrokenChecksum(key: string): string {
  const last = key.at(-1) === "A" ? "B" : "A";
  return `${key.slice(0, -1)}${last}`;
}

function keyBody(key: string): string {
  return key.split("_")[1] ?? "";
}

function shopEnv(serverKey: string): Env {
  return {
    SOWA_INIT_PROJECT: "shop",
    SOWA_INIT_SERVER_KEY: serverKey,
    SOWA_INIT_ALLOWED_ORIGINS: "https://Shop.Example.com/,https://shop.example.com",
    SOWA_INIT_OPERATOR_ALLOWED_ORIGINS: "https://Admin.Example.com:443/",
  };
}

describe(
  "первый проект из SOWA_INIT_* при старте api в production",
  { timeout: commandTimeout },
  () => {
    const getDataSource = useTestDatabase();
    const servers: RunningServer[] = [];

    async function productionEnv(initEnv: Env): Promise<Env> {
      return {
        ...process.env,
        ...(await zonePortsEnv()),
        ...productionOverrides,
        ...initEnv,
      };
    }

    async function startLiveApi(initEnv: Env): Promise<RunningServer> {
      const env = await productionEnv(initEnv);
      const server = spawnServer("api", env);
      servers.push(server);
      const live = await waitForLive(server, env);
      expect(live, server.output()).toBe(true);
      return server;
    }

    async function startFailingApi(initEnv: Env): Promise<RunningServer> {
      const server = spawnServer("api", await productionEnv(initEnv));
      servers.push(server);
      const exitCode = await waitForExit(server);
      expect(exitCode, server.output()).not.toBeNull();
      expect(exitCode, server.output()).not.toBe(0);
      return server;
    }

    async function startAndStop(initEnv: Env): Promise<string> {
      const server = await startLiveApi(initEnv);
      await server.stop();
      return server.output();
    }

    function apiKeyRows(): Promise<ApiKey[]> {
      return getDataSource()
        .getRepository(ApiKey)
        .find({ order: { createdAt: "ASC" } });
    }

    function expectNoKeys(output: string, ...keys: string[]): void {
      expect(output).not.toMatch(anyKeyPattern);
      for (const key of keys) {
        expect(key).not.toBe("");
        expect(output).not.toContain(key);
        expect(output).not.toContain(keyBody(key));
      }
    }

    beforeAll(() => {
      buildServer();
    }, commandTimeout);

    afterEach(async () => {
      await Promise.all(servers.splice(0).map((server) => server.stop()));
    });

    describe("первый старт на чистой базе", () => {
      it("создаёт проект shop с нормализованными доменами и одним ключом server с хешем переданного sk_", async () => {
        const serverKey = generateKey("serverKey");

        await startLiveApi(shopEnv(serverKey));

        const rows = await projectRows(getDataSource());
        expect(rows).toHaveLength(1);
        expect(rows[0]).toMatchObject({
          name: "shop",
          allowed_origins: "{https://shop.example.com}",
          operator_allowed_origins: "{https://admin.example.com}",
        });
        expect(parseKey(rows[0]?.public_key ?? "", "publicKey")).toBeDefined();
        const keyRows = await apiKeyRows();
        expect(keyRows).toHaveLength(1);
        expect(keyRows[0]).toMatchObject({
          kind: "server",
          projectId: rows[0]?.id,
          prefix: toLookupPrefix(serverKey),
          revokedAt: null,
        });
        expect(keyRows[0]?.keyHash.equals(sha256(serverKey))).toBe(true);
      });

      it("пишет строку о создании, но ни pk_, ни sk_", async () => {
        const serverKey = generateKey("serverKey");
        const server = await startLiveApi(shopEnv(serverKey));

        expect(await waitForOutput(server, new RegExp(createdLine)), server.output()).toBe(true);
        const [row] = await projectRows(getDataSource());
        expectNoKeys(server.output(), serverKey, row?.public_key ?? "");
        expect(server.output()).not.toContain(mismatchWarning);
      });

      it("без SOWA_INIT_PROJECT проект не создаётся, сервис стартует", async () => {
        const output = await startAndStop({});

        expect(await projectRows(getDataSource())).toEqual([]);
        expect(await apiKeyRows()).toEqual([]);
        expect(output).not.toContain(createdLine);
      });
    });

    describe("повторный старт", () => {
      it("с другими доменами и другим верным sk_ ничего не меняет и предупреждает без ключа", async () => {
        const firstKey = generateKey("serverKey");
        const secondKey = generateKey("serverKey");
        const firstOutput = await startAndStop(shopEnv(firstKey));
        const projectsBefore = await projectRows(getDataSource());
        const keysBefore = await apiKeyRows();

        const server = await startLiveApi({
          ...shopEnv(secondKey),
          SOWA_INIT_ALLOWED_ORIGINS: "https://other.example.com",
          SOWA_INIT_OPERATOR_ALLOWED_ORIGINS: "https://other-admin.example.com",
        });

        expect(await waitForOutput(server, new RegExp(mismatchWarning)), server.output()).toBe(
          true,
        );
        expect(await projectRows(getDataSource())).toEqual(projectsBefore);
        expect(await apiKeyRows()).toEqual(keysBefore);
        const publicKey = projectsBefore[0]?.public_key ?? "";
        expectNoKeys(`${firstOutput}\n${server.output()}`, firstKey, secondKey, publicKey);
        expect(server.output()).not.toContain(toLookupPrefix(secondKey));
        expect(server.output()).not.toContain(createdLine);
      });

      it("с тем же sk_ ничего не меняет и не предупреждает", async () => {
        const serverKey = generateKey("serverKey");
        await startAndStop(shopEnv(serverKey));
        const projectsBefore = await projectRows(getDataSource());
        const keysBefore = await apiKeyRows();

        const output = await startAndStop(shopEnv(serverKey));

        expect(await projectRows(getDataSource())).toEqual(projectsBefore);
        expect(await apiKeyRows()).toEqual(keysBefore);
        expect(output).not.toContain(mismatchWarning);
        expect(output).not.toContain(createdLine);
        expectNoKeys(output, serverKey);
      });
    });

    describe("ключ с испорченной контрольной суммой", () => {
      it("процесс завершается с ненулевым кодом без ключа в выводе, проект не создан", async () => {
        const brokenKey = withBrokenChecksum(generateKey("serverKey"));

        const server = await startFailingApi(shopEnv(brokenKey));

        expect(server.output()).toContain(invalidKeyError);
        expectNoKeys(server.output(), brokenKey);
        expect(await projectRows(getDataSource())).toEqual([]);
        expect(await apiKeyRows()).toEqual([]);
      });

      it("проверяется и тогда, когда проект уже есть: старт падает, строки не меняются", async () => {
        const serverKey = generateKey("serverKey");
        await startAndStop(shopEnv(serverKey));
        const projectsBefore = await projectRows(getDataSource());
        const keysBefore = await apiKeyRows();
        const brokenKey = withBrokenChecksum(serverKey);

        const server = await startFailingApi(shopEnv(brokenKey));

        expect(server.output()).toContain(invalidKeyError);
        expectNoKeys(server.output(), brokenKey);
        expect(await projectRows(getDataSource())).toEqual(projectsBefore);
        expect(await apiKeyRows()).toEqual(keysBefore);
      });
    });
  },
);
