import { createProject } from "./support/fixtures.js";
import { setupMainProject } from "./support/key-cli.js";
import {
  operatorActions,
  operatorCommandArguments,
  operatorRow,
  useOperatorsService,
} from "./support/operator-cli.js";
import { buildServer, runMainCli } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const externalId = "ext-1";

const helpEntries = [
  ["operator:disable", "Disable an operator: their tokens stop working at once"],
  ["operator:enable", "Enable a disabled operator"],
];

describe("запуск operator-команд через node dist/main.js cli", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getOperators = useOperatorsService();

  beforeAll(buildServer, commandTimeout);

  async function setupOperator(): Promise<string> {
    const { projectId } = await setupMainProject();
    await getOperators().issueToken({ projectId, externalId, name: "Alice", role: "operator" });
    return projectId;
  }

  async function disabledAtOf(projectId: string): Promise<Date | null> {
    return (await operatorRow(getDataSource(), projectId, externalId)).disabledAt;
  }

  it("справка перечисляет обе команды с описаниями", () => {
    const result = runMainCli(["--help"]);

    expect(result.exitCode, result.output).toBe(0);
    const help = result.output.replace(/\s+/g, " ");
    for (const [name, description] of helpEntries) {
      expect(help).toContain(name);
      expect(help).toContain(description);
    }
  });

  describe.each(operatorActions)("operator:%s", (action) => {
    it("без --external-id: код 1, жалоба на параметр, оператор не изменился", async () => {
      const projectId = await setupOperator();

      const result = runMainCli(operatorCommandArguments(action, { project: "main" }));

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--external-id");
      expect(await disabledAtOf(projectId)).toBeNull();
    });

    it("без --project: код 1, жалоба на --project", async () => {
      await setupOperator();

      const result = runMainCli(operatorCommandArguments(action, { externalId }));

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain("--project");
    });

    it("неизвестный --external-id через dist: код 1, error в выводе", async () => {
      await setupOperator();

      const result = runMainCli(
        operatorCommandArguments(action, { project: "main", externalId: "missing" }),
      );

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain('error: Operator "missing" not found');
    });

    it("неизвестный --project через dist: код 1, error в выводе", async () => {
      await createProject(getDataSource(), { name: "other" });

      const result = runMainCli(
        operatorCommandArguments(action, { project: "unknown", externalId }),
      );

      expect(result.exitCode, result.output).toBe(1);
      expect(result.output).toContain('error: Project "unknown" not found');
    });
  });

  it("disable и enable через dist: код 0, вывод по таблице, disabled_at в БД", async () => {
    const projectId = await setupOperator();
    const args = { project: "main", externalId };

    const disabled = runMainCli(operatorCommandArguments("disable", args));
    expect(disabled.exitCode, disabled.output).toBe(0);
    expect(disabled.output).toContain("disabled: ext-1");
    expect(await disabledAtOf(projectId)).toBeInstanceOf(Date);

    const disabledAgain = runMainCli(operatorCommandArguments("disable", args));
    expect(disabledAgain.output).toContain("already disabled: ext-1");

    const enabled = runMainCli(operatorCommandArguments("enable", args));
    expect(enabled.exitCode, enabled.output).toBe(0);
    expect(enabled.output).toContain("enabled: ext-1");
    expect(await disabledAtOf(projectId)).toBeNull();

    const enabledAgain = runMainCli(operatorCommandArguments("enable", args));
    expect(enabledAgain.output).toContain("already enabled: ext-1");
  });
});
