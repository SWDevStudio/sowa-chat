import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { parseKey } from "../src/domain/keys/key-format.js";
import { readSecretsFile } from "./support/development-secrets-env.js";
import { spawnServer } from "./support/e2e-server.js";
import type { Env, RunningServer } from "./support/e2e-server.js";
import { buildServer } from "./support/project-cli.js";
import { allRowsAsText, projectRows, sha256 } from "./support/project-rows.js";
import { waitForLive, zonePortsEnv } from "./support/startup-server.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const keysLine = /Development project main: publicKey (pk_[^\s",]+), serverKey (sk_[^\s",]+)/;
const warningLine = /Development project main: publicKey (pk_[^\s",]+), serverKey is not in/;

interface PrintedKeys {
  publicKey: string;
  serverKey: string;
}

function printedKeys(output: string): PrintedKeys {
  const match = keysLine.exec(output);
  expect(match, output).not.toBeNull();
  return { publicKey: match?.[1] ?? "", serverKey: match?.[2] ?? "" };
}

describe("проект main при старте api в development", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const directories: string[] = [];
  const servers: RunningServer[] = [];

  function createSecretsDirectory(): string {
    const directory = mkdtempSync(join(tmpdir(), "sowa-dev-main-"));
    directories.push(directory);
    return directory;
  }

  async function startApi(directory: string, overrides: Env = {}): Promise<RunningServer> {
    const env: Env = {
      ...process.env,
      ...(await zonePortsEnv()),
      SOWA_DEV_SECRETS_DIR: directory,
      ...overrides,
    };
    const server = spawnServer("api", env);
    servers.push(server);
    const live = await waitForLive(server, env);
    expect(live, server.output()).toBe(true);
    return server;
  }

  async function apiKeyRows(): Promise<ApiKey[]> {
    return getDataSource().getRepository(ApiKey).find();
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

  describe("первый старт на чистой базе", () => {
    it("создаёт проект main с доменами localhost и одним ключом server", async () => {
      await startApi(createSecretsDirectory());

      const rows = await projectRows(getDataSource());
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        name: "main",
        allowed_origins: "{http://localhost:5173}",
        operator_allowed_origins: "{http://localhost:5174}",
      });
      const keyRows = await apiKeyRows();
      expect(keyRows).toHaveLength(1);
      expect(keyRows[0]).toMatchObject({ kind: "server", projectId: rows[0]?.id });
    });

    it("печатает в лог pk_ и sk_ проекта, sk_ в базе только хешем", async () => {
      const server = await startApi(createSecretsDirectory());

      const keys = printedKeys(server.output());
      expect(parseKey(keys.publicKey, "publicKey")).toBeDefined();
      expect(parseKey(keys.serverKey, "serverKey")).toBeDefined();
      const [row] = await projectRows(getDataSource());
      expect(row?.public_key).toBe(keys.publicKey);
      const [keyRow] = await apiKeyRows();
      expect(keyRow?.keyHash.equals(sha256(keys.serverKey))).toBe(true);
      expect(await allRowsAsText(getDataSource())).not.toContain(keys.serverKey);
    });

    it("записывает ключи в mainProject файла секретов", async () => {
      const directory = createSecretsDirectory();
      const server = await startApi(directory);

      const keys = printedKeys(server.output());
      expect(readSecretsFile(directory).mainProject).toEqual(keys);
    });
  });

  describe("повторный старт", () => {
    it("с той же папкой секретов печатает те же ключи и не добавляет строк", async () => {
      const directory = createSecretsDirectory();
      const first = await startApi(directory);
      const firstKeys = printedKeys(first.output());
      const projectsBefore = await projectRows(getDataSource());
      const keysBefore = await apiKeyRows();
      await first.stop();

      const second = await startApi(directory);

      expect(printedKeys(second.output())).toEqual(firstKeys);
      expect(await projectRows(getDataSource())).toEqual(projectsBefore);
      expect(await apiKeyRows()).toEqual(keysBefore);
      expect(readSecretsFile(directory).mainProject).toEqual(firstKeys);
    });

    it("с новой папкой секретов предупреждает без sk_ и не выпускает новый ключ", async () => {
      const first = await startApi(createSecretsDirectory());
      const firstKeys = printedKeys(first.output());
      const keysBefore = await apiKeyRows();
      await first.stop();
      const emptyDirectory = createSecretsDirectory();

      const second = await startApi(emptyDirectory);

      const output = second.output();
      expect(warningLine.exec(output)?.[1], output).toBe(firstKeys.publicKey);
      expect(output).toContain(basename(emptyDirectory));
      expect(output).not.toMatch(/serverKey sk_/);
      expect(output).not.toContain(firstKeys.serverKey);
      expect(await apiKeyRows()).toEqual(keysBefore);
      expect(await projectRows(getDataSource())).toHaveLength(1);
    });
  });

  describe("переменные SOWA_INIT_*", () => {
    it("SOWA_INIT_ALLOWED_ORIGINS задаёт домены сайта main", async () => {
      await startApi(createSecretsDirectory(), {
        SOWA_INIT_ALLOWED_ORIGINS: "https://shop.example.com",
      });

      const [row] = await projectRows(getDataSource());
      expect(row).toMatchObject({
        name: "main",
        allowed_origins: "{https://shop.example.com}",
        operator_allowed_origins: "{http://localhost:5174}",
      });
    });

    it("SOWA_INIT_OPERATOR_ALLOWED_ORIGINS задаёт домены админки main", async () => {
      await startApi(createSecretsDirectory(), {
        SOWA_INIT_OPERATOR_ALLOWED_ORIGINS: "https://admin.example.com",
      });

      const [row] = await projectRows(getDataSource());
      expect(row).toMatchObject({
        allowed_origins: "{http://localhost:5173}",
        operator_allowed_origins: "{https://admin.example.com}",
      });
    });

    it("SOWA_INIT_PROJECT и SOWA_INIT_SERVER_KEY в development не читаются", async () => {
      const server = await startApi(createSecretsDirectory(), {
        SOWA_INIT_PROJECT: "shop",
        SOWA_INIT_SERVER_KEY: "sk_not_a_valid_key",
      });

      const rows = await projectRows(getDataSource());
      expect(rows.map((row) => row.name)).toEqual(["main"]);
      expect(printedKeys(server.output()).serverKey).not.toBe("sk_not_a_valid_key");
    });
  });
});
