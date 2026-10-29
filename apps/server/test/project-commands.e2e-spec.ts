import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { parseKey } from "../src/domain/keys/key-format.js";
import { runCliInProcess } from "./support/cli-run.js";
import { createProject } from "./support/fixtures.js";
import {
  buildServer,
  createMain,
  fullOriginArguments,
  listHeader,
  nonEmptyLines,
  onceWarning,
  outputOf,
  runMainCli,
  uuidPattern,
  valueOf,
} from "./support/project-cli.js";
import { allRowsAsText, projectRows } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

describe("команды project:create и project:list", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();

  async function auditRows(): Promise<AuditLogEntry[]> {
    return getDataSource().getRepository(AuditLogEntry).find();
  }

  describe("project:create", () => {
    it("выходит с кодом 0 и печатает в stdout четыре строки projectId, name, publicKey, serverKey", async () => {
      const result = await createMain(fullOriginArguments);

      expect(result.exitCode, outputOf(result)).toBe(0);
      const lines = nonEmptyLines(result.stdout);
      expect(lines, outputOf(result)).toHaveLength(4);
      expect(lines.map((line) => line.split(": ")[0])).toEqual([
        "projectId",
        "name",
        "publicKey",
        "serverKey",
      ]);
      expect(valueOf(lines, "projectId")).toMatch(uuidPattern);
      expect(valueOf(lines, "name")).toBe("main");
      expect(parseKey(valueOf(lines, "publicKey"), "publicKey"), result.stdout).toBeDefined();
      expect(parseKey(valueOf(lines, "serverKey"), "serverKey"), result.stdout).toBeDefined();
    });

    it("записывает проект с нормализованными allowed_origins и operator_allowed_origins", async () => {
      const result = await createMain(fullOriginArguments);
      const lines = nonEmptyLines(result.stdout);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(await projectRows(getDataSource())).toEqual([
        {
          id: valueOf(lines, "projectId"),
          name: "main",
          public_key: valueOf(lines, "publicKey"),
          allowed_origins: "{https://shop.example.com,http://localhost:5173}",
          operator_allowed_origins: "{https://admin.example.com}",
        },
      ]);
    });

    it("принимает один --origin: список из одного домена", async () => {
      const result = await createMain(["--origin", "https://one.example.com"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      const [row] = await projectRows(getDataSource());
      expect(row?.allowed_origins).toBe("{https://one.example.com}");
      expect(row?.operator_allowed_origins).toBe("{}");
    });

    it("без --origin и --operator-origin создаёт проект с пустыми списками", async () => {
      const result = await createMain();

      expect(result.exitCode, outputOf(result)).toBe(0);
      const [row] = await projectRows(getDataSource());
      expect(row?.allowed_origins).toBe("{}");
      expect(row?.operator_allowed_origins).toBe("{}");
    });

    it("пишет в audit_log запись project.created от cli с именем проекта", async () => {
      const result = await createMain(fullOriginArguments);
      const projectId = valueOf(nonEmptyLines(result.stdout), "projectId");

      expect(result.exitCode, outputOf(result)).toBe(0);
      const created = (await auditRows()).filter((entry) => entry.action === "project.created");
      expect(created).toHaveLength(1);
      expect(created[0]).toMatchObject({
        projectId,
        actorKind: "cli",
        targetKind: "project",
        targetId: projectId,
        data: { name: "main" },
      });
    });

    it("выпускает серверный ключ: в api_keys один активный server-ключ проекта", async () => {
      const result = await createMain();
      const projectId = valueOf(nonEmptyLines(result.stdout), "projectId");

      expect(result.exitCode, outputOf(result)).toBe(0);
      const keys = await getDataSource().getRepository(ApiKey).find();
      expect(keys).toHaveLength(1);
      expect(keys[0]).toMatchObject({ projectId, kind: "server", revokedAt: null });
    });

    it("пишет предупреждение «показывается один раз» в stderr, а не в stdout", async () => {
      const result = await createMain();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stderr).toContain(onceWarning);
      expect(result.stdout).not.toContain(onceWarning);
    });

    it("не пишет sk_ в stderr и не хранит его в строках БД, включая audit_log", async () => {
      const result = await createMain(fullOriginArguments);
      const serverKey = valueOf(nonEmptyLines(result.stdout), "serverKey");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(serverKey).not.toBe("");
      expect(result.stderr).not.toContain(serverKey);
      expect(await allRowsAsText(getDataSource())).not.toContain(serverKey);
    });

    it("повторный project:create --name main выходит с кодом 1 и ошибкой «already exists»", async () => {
      const first = await createMain();

      const second = await createMain();

      expect(first.exitCode, outputOf(first)).toBe(0);
      expect(second.exitCode, outputOf(second)).toBe(1);
      expect(second.stderr).toContain('error: Project "main" already exists');
      expect(await projectRows(getDataSource())).toHaveLength(1);
      expect(await getDataSource().getRepository(ApiKey).count()).toBe(1);
    });

    it("при ошибке не печатает ключи в stdout", async () => {
      await createMain();

      const second = await createMain();

      expect(second.exitCode, outputOf(second)).toBe(1);
      expect(second.stderr).toContain("already exists");
      expect(second.stdout).not.toContain("pk_");
      expect(second.stdout).not.toContain("sk_");
      expect(second.stderr).not.toContain(onceWarning);
    });

    it("--origin с путём выходит с кодом 1 и не создаёт проект", async () => {
      const result = await createMain(["--origin", "https://a.com/path"]);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Invalid origin "https://a.com/path"');
      expect(result.stdout).toBe("");
      expect(await projectRows(getDataSource())).toEqual([]);
      expect(await getDataSource().getRepository(ApiKey).count()).toBe(0);
      expect(await auditRows()).toEqual([]);
    });

    it("неверный --operator-origin выходит с кодом 1 и не создаёт проект", async () => {
      const result = await createMain(["--operator-origin", "*"]);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Invalid origin "*"');
      expect(await projectRows(getDataSource())).toEqual([]);
    });

    it("недопустимое имя проекта выходит с кодом 1 и не создаёт проект", async () => {
      const result = await runCliInProcess(["project:create", "--name", "Bad Name"]);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: Invalid project name");
      expect(await projectRows(getDataSource())).toEqual([]);
    });
  });

  describe("project:create без --name", () => {
    beforeAll(buildServer, commandTimeout);

    it("node dist/main.js cli project:create выходит с кодом 1, жалуется на --name и не создаёт проект", async () => {
      const result = runMainCli(["project:create"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--name");
      expect(await projectRows(getDataSource())).toEqual([]);
    });
  });

  describe("project:list", () => {
    it("без проектов выходит с кодом 0 и печатает только строку заголовка", async () => {
      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([listHeader.join("\t")]);
    });

    it("печатает заголовок и строку проекта с именем, ID, pk_ и обоими списками", async () => {
      const created = await createMain([
        "--origin",
        "https://Shop.Example.com/",
        "--origin",
        "http://localhost:5173",
        "--operator-origin",
        "https://admin.example.com",
      ]);
      const createdLines = nonEmptyLines(created.stdout);

      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([
        listHeader.join("\t"),
        [
          "main",
          valueOf(createdLines, "projectId"),
          valueOf(createdLines, "publicKey"),
          "https://shop.example.com,http://localhost:5173",
          "https://admin.example.com",
        ].join("\t"),
      ]);
    });

    it("пустые списки доменов и пустой publicKey печатает как «-»", async () => {
      const project = await createProject(getDataSource(), { name: "bare" });

      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([
        listHeader.join("\t"),
        ["bare", project.id, "-", "-", "-"].join("\t"),
      ]);
    });

    it("печатает все проекты, по строке на каждый", async () => {
      await createMain();
      await runCliInProcess(["project:create", "--name", "second"]);
      await createProject(getDataSource(), { name: "third" });

      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      const rows = nonEmptyLines(result.stdout).slice(1);
      expect(rows.map((row) => row.split("\t")[0]).sort()).toEqual(["main", "second", "third"]);
    });

    it("не выводит sk_, хеш ключа и settings проекта", async () => {
      const created = await createMain();
      const serverKey = valueOf(nonEmptyLines(created.stdout), "serverKey");
      await createProject(getDataSource(), {
        name: "configured",
        settings: { internalNote: "private-setting-value" },
      });
      const [apiKey] = await getDataSource().getRepository(ApiKey).find();

      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).not.toContain("sk_");
      expect(result.stdout).not.toContain(serverKey);
      expect(result.stdout).not.toContain(apiKey?.keyHash.toString("hex"));
      expect(result.stdout).not.toContain(apiKey?.keyHash.toString("base64"));
      expect(result.stdout).not.toContain("private-setting-value");
      expect(result.stdout).not.toContain("internalNote");
      expect(result.stderr).not.toContain(serverKey);
    });

    it("не меняет БД", async () => {
      await createMain();
      const before = await allRowsAsText(getDataSource());

      const result = await runCliInProcess(["project:list"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(await allRowsAsText(getDataSource())).toBe(before);
    });
  });
});
