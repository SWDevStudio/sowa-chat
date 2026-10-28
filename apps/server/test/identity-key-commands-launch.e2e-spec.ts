import { setupMainProject } from "./support/identity-key-cli.js";
import { identityKeyRows } from "./support/identity-key-rows.js";
import { buildServer, runMainCli } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

describe(
  "запуск identity-key-команд через node dist/main.js cli",
  { timeout: commandTimeout },
  () => {
    const getDataSource = useTestDatabase();

    beforeAll(buildServer, commandTimeout);

    it("справка перечисляет три команды с описаниями", () => {
      const result = runMainCli(["--help"]);

      expect(result.exitCode, result.output).toBe(0);
      const help = result.output.replace(/\s+/g, " ");
      expect(help).toContain("identity-key:add");
      expect(help).toContain("Register a public identity key of the site backend");
      expect(help).toContain("identity-key:list");
      expect(help).toContain("List identity keys of a project");
      expect(help).toContain("identity-key:revoke");
      expect(help).toContain("Revoke an identity key");
    });

    it.each([
      { name: "без --project", args: ["--kid", "k", "--file", "f"], option: "--project" },
      { name: "без --kid", args: ["--project", "main", "--file", "f"], option: "--kid" },
      { name: "без --file", args: ["--project", "main", "--kid", "k"], option: "--file" },
    ])("identity-key:add $name: код 1, жалоба на параметр, ключ не добавлен", async (scenario) => {
      await setupMainProject();

      const result = runMainCli(["identity-key:add", ...scenario.args]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain(scenario.option);
      expect(await identityKeyRows(getDataSource())).toEqual([]);
    });

    it("identity-key:list без --project: код 1, жалоба на --project", () => {
      const result = runMainCli(["identity-key:list"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--project");
    });

    it.each([
      { name: "без --project", args: ["--kid", "k"], option: "--project" },
      { name: "без --kid", args: ["--project", "main"], option: "--kid" },
    ])("identity-key:revoke $name: код 1, жалоба на параметр", (scenario) => {
      const result = runMainCli(["identity-key:revoke", ...scenario.args]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain(scenario.option);
    });
  },
);
