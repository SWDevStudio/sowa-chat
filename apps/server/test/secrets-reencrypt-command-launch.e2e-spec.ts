import { buildServer, runMainCli } from "./support/project-cli.js";

const commandTimeout = 600_000;
const description = "Re-encrypt stored secrets with the current encryption key";

describe(
  "запуск secrets:reencrypt через node dist/main.js cli",
  { timeout: commandTimeout },
  () => {
    beforeAll(buildServer, commandTimeout);

    it("справка перечисляет команду с описанием", () => {
      const result = runMainCli(["--help"]);

      expect(result.exitCode, result.output).toBe(0);
      const help = result.output.replace(/\s+/g, " ");
      expect(help).toContain("secrets:reencrypt");
      expect(help).toContain(description);
    });

    it("справка команды показывает --dry-run", () => {
      const result = runMainCli(["secrets:reencrypt", "--help"]);

      expect(result.exitCode, result.output).toBe(0);
      expect(result.output).toContain("--dry-run");
    });

    it("неизвестный параметр: код 1, жалоба на параметр", () => {
      const result = runMainCli(["secrets:reencrypt", "--bogus"]);

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--bogus");
    });
  },
);
