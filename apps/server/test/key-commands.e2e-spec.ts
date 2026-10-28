import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { parseKey, toLookupPrefix } from "../src/domain/keys/key-format.js";
import { createProject } from "./support/fixtures.js";
import {
  auditRowsByAction,
  createKey,
  createdKey,
  keyRowByPrefix,
  setupMainProject,
  useApiKeysService,
} from "./support/key-cli.js";
import {
  buildServer,
  nonEmptyLines,
  onceWarning,
  outputOf,
  runMainCli,
  valueOf,
} from "./support/project-cli.js";
import { allRowsAsText } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

describe("команды key:create и запуск key-команд", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getKeys = useApiKeysService();

  describe("key:create", () => {
    it("печатает в stdout ровно prefix и serverKey, prefix — lookup-префикс ключа", async () => {
      await setupMainProject();

      const result = await createKey("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      const lines = nonEmptyLines(result.stdout);
      expect(lines.map((line) => line.split(": ")[0])).toEqual(["prefix", "serverKey"]);
      const serverKey = valueOf(lines, "serverKey");
      expect(parseKey(serverKey, "serverKey"), result.stdout).toBeDefined();
      expect(valueOf(lines, "prefix")).toBe(toLookupPrefix(serverKey));
    });

    it("пишет предупреждение «показывается один раз» в stderr, а не в stdout", async () => {
      await setupMainProject();

      const result = await createKey("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stderr).toContain(onceWarning);
      expect(result.stdout).not.toContain(onceWarning);
    });

    it("оба ключа проекта проходят verify как server", async () => {
      const main = await setupMainProject();

      const added = await createdKey("main");

      expect(await getKeys().verify(main.firstKey, "server")).toMatchObject({
        projectId: main.projectId,
      });
      expect(await getKeys().verify(added.key, "server")).toMatchObject({
        projectId: main.projectId,
      });
    });

    it("не трогает старый ключ: в api_keys два активных server-ключа проекта", async () => {
      const main = await setupMainProject();

      await createKey("main");

      const rows = await getDataSource().getRepository(ApiKey).find();
      expect(rows).toHaveLength(2);
      for (const row of rows) {
        expect(row).toMatchObject({ projectId: main.projectId, kind: "server", revokedAt: null });
      }
    });

    it("пишет в audit_log apiKey.issued от cli для нового ключа", async () => {
      const main = await setupMainProject();

      const added = await createdKey("main");

      const row = await keyRowByPrefix(getDataSource(), added.prefix);
      const issued = await auditRowsByAction(getDataSource(), "apiKey.issued");
      const forNewKey = issued.filter((entry) => entry.targetId === row.id);
      expect(forNewKey).toHaveLength(1);
      expect(forNewKey[0]).toMatchObject({
        projectId: main.projectId,
        actorKind: "cli",
        targetKind: "apiKey",
        data: { kind: "server", prefix: added.prefix },
      });
    });

    it("не пишет ключ в stderr и не хранит его в БД, включая audit_log", async () => {
      await setupMainProject();

      const result = await createKey("main");

      const serverKey = valueOf(nonEmptyLines(result.stdout), "serverKey");
      expect(serverKey).not.toBe("");
      expect(result.stderr).not.toContain(serverKey);
      expect(await allRowsAsText(getDataSource())).not.toContain(serverKey);
    });

    it("неизвестный проект: код 1, ошибка Project not found, ничего не выпущено", async () => {
      await setupMainProject();

      const result = await createKey("unknown");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
      expect(result.stdout).not.toContain("sk_");
      expect(result.stderr).not.toContain(onceWarning);
      expect(await getDataSource().getRepository(ApiKey).count()).toBe(1);
      expect(await auditRowsByAction(getDataSource(), "apiKey.issued")).toHaveLength(1);
    });

    it("ключ выпускается в указанный проект и не попадает в другой", async () => {
      const main = await setupMainProject();
      const other = await createProject(getDataSource(), { name: "other" });

      const added = await createdKey("other");

      expect(await getKeys().verify(added.key, "server")).toMatchObject({ projectId: other.id });
      expect(await getKeys().list(main.projectId, "server")).toHaveLength(1);
      expect(await getKeys().list(other.id, "server")).toHaveLength(1);
    });
  });

  describe("запуск через node dist/main.js cli", () => {
    beforeAll(buildServer, commandTimeout);

    it("справка перечисляет три команды с описаниями", () => {
      const result = runMainCli(["--help"]);

      expect(result.exitCode, result.output).toBe(0);
      expect(result.output).toContain("key:create");
      expect(result.output).toContain("Issue a new serverKey for a project");
      expect(result.output).toContain("key:list");
      expect(result.output).toContain("List serverKeys of a project");
      expect(result.output).toContain("key:revoke");
      expect(result.output).toContain("Revoke a serverKey by its prefix");
    });

    it("key:create без --project: код 1, жалоба на --project, ключ не выпущен", async () => {
      await setupMainProject();

      const result = runMainCli(["key:create"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--project");
      expect(await getDataSource().getRepository(ApiKey).count()).toBe(1);
    });

    it("key:list без --project: код 1, жалоба на --project", () => {
      const result = runMainCli(["key:list"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--project");
    });

    it("key:revoke без --prefix: код 1, жалоба на --prefix, ключ не отозван", async () => {
      await setupMainProject();

      const result = runMainCli(["key:revoke"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--prefix");
      const rows = await getDataSource().getRepository(ApiKey).find();
      expect(rows.every((row) => row.revokedAt === null)).toBe(true);
    });
  });
});
