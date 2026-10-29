import { originsOf, setupMainProject } from "./support/origin-cli.js";
import { buildServer, runMainCli } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

const helpEntries = [
  ["origin:add", "Allow a site origin for the public zone"],
  ["origin:remove", "Remove a site origin"],
  ["origin:list", "List site origins"],
  ["operator-origin:add", "Allow an admin panel origin for the operator zone"],
  ["operator-origin:remove", "Remove an admin panel origin"],
  ["operator-origin:list", "List admin panel origins"],
];

const prefixes = ["origin", "operator-origin"];

describe("запуск origin-команд через node dist/main.js cli", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();

  beforeAll(buildServer, commandTimeout);

  it("справка перечисляет шесть команд с описаниями", () => {
    const result = runMainCli(["--help"]);

    expect(result.exitCode, result.output).toBe(0);
    const help = result.output.replace(/\s+/g, " ");
    for (const [name, description] of helpEntries) {
      expect(help).toContain(name);
      expect(help).toContain(description);
    }
  });

  describe.each(prefixes)("%s", (prefix) => {
    it.each([
      { name: "без --project", args: ["--origin", "https://a.com"], option: "--project" },
      { name: "без --origin", args: ["--project", "main"], option: "--origin" },
    ])("$name: add и remove — код 1, жалоба на параметр, список не изменился", async (scenario) => {
      await setupMainProject();

      for (const action of ["add", "remove"]) {
        const result = runMainCli([`${prefix}:${action}`, ...scenario.args]);

        expect(result.exitCode, result.output).toBe(1);
        expect(result.output).toContain(scenario.option);
      }
      expect(await originsOf(getDataSource(), "main")).toEqual({
        allowedOrigins: [],
        operatorAllowedOrigins: [],
      });
    });

    it("list без --project: код 1, жалоба на --project", () => {
      const result = runMainCli([`${prefix}:list`]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--project");
    });

    it("add через dist: код 0, added в stdout, значение в БД", async () => {
      await setupMainProject();

      const result = runMainCli([
        `${prefix}:add`,
        "--project",
        "main",
        "--origin",
        "https://Shop.Example.com/",
      ]);

      expect(result.exitCode, result.output).toBe(0);
      expect(result.output).toContain("added: https://shop.example.com");
    });
  });
});
