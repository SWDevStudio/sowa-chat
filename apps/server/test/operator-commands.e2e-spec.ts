import { Test } from "@nestjs/testing";
import { ApiModule } from "../src/api.module.js";
import { CliModule } from "../src/cli.module.js";
import { DisabledOperators } from "../src/domain/operators/disabled-operators.js";
import { DisabledOperatorsModule } from "../src/domain/operators/disabled-operators.module.js";
import { OperatorsService } from "../src/domain/operators/operators.service.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { setupMainProject } from "./support/key-cli.js";
import {
  operatorBlockAuditRows,
  operatorRow,
  runOperatorCommand,
  useOperatorsService,
} from "./support/operator-cli.js";
import { outputOf } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const externalId = "ext-1";

describe("команды operator:disable и operator:enable", () => {
  const getDataSource = useTestDatabase();
  const getOperators = useOperatorsService();

  async function setupOperator(): Promise<{ projectId: string; operatorId: string }> {
    const { projectId } = await setupMainProject();
    await getOperators().issueToken({ projectId, externalId, name: "Alice", role: "operator" });
    const row = await operatorRow(getDataSource(), projectId, externalId);
    return { projectId, operatorId: row.id };
  }

  async function disabledAtOf(projectId: string, id = externalId): Promise<Date | null> {
    return (await operatorRow(getDataSource(), projectId, id)).disabledAt;
  }

  describe("operator:disable", { timeout: commandTimeout }, () => {
    it("код 0, disabled в stdout, disabled_at заполнен, в журнале operator.disabled от cli", async () => {
      const { projectId, operatorId } = await setupOperator();

      const result = await runOperatorCommand("disable", { project: "main", externalId });

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toBe("disabled: ext-1\n");
      expect(await disabledAtOf(projectId)).toBeInstanceOf(Date);
      const rows = await operatorBlockAuditRows(getDataSource());
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        projectId,
        actorKind: "cli",
        actorId: null,
        action: "operator.disabled",
        targetKind: "operator",
        targetId: operatorId,
        data: { externalId },
      });
    });

    it("повтор: код 0, already disabled, disabled_at и журнал не меняются", async () => {
      const { projectId } = await setupOperator();
      await runOperatorCommand("disable", { project: "main", externalId });
      const before = await disabledAtOf(projectId);

      const result = await runOperatorCommand("disable", { project: "main", externalId });

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toBe("already disabled: ext-1\n");
      expect(await disabledAtOf(projectId)).toEqual(before);
      expect(await operatorBlockAuditRows(getDataSource())).toHaveLength(1);
    });

    it("не трогает других операторов проекта", async () => {
      const { projectId } = await setupOperator();
      await getOperators().issueToken({
        projectId,
        externalId: "ext-2",
        name: "Bob",
        role: "operator",
      });

      await runOperatorCommand("disable", { project: "main", externalId });

      expect(await disabledAtOf(projectId, "ext-2")).toBeNull();
    });

    it("неизвестный --external-id: код 1, Operator not found, ничего не изменилось", async () => {
      const { projectId } = await setupOperator();

      const result = await runOperatorCommand("disable", {
        project: "main",
        externalId: "missing",
      });

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Operator "missing" not found');
      expect(result.stdout).not.toContain("disabled");
      expect(await disabledAtOf(projectId)).toBeNull();
      expect(await operatorBlockAuditRows(getDataSource())).toEqual([]);
    });

    it("неизвестный --project: код 1, Project not found, оператор не тронут", async () => {
      const { projectId } = await setupOperator();

      const result = await runOperatorCommand("disable", { project: "unknown", externalId });

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
      expect(result.stdout).toBe("");
      expect(await disabledAtOf(projectId)).toBeNull();
      expect(await operatorBlockAuditRows(getDataSource())).toEqual([]);
    });

    it("оператор другого проекта с тем же externalId не блокируется", async () => {
      const { projectId } = await setupOperator();
      await createProject(getDataSource(), { name: "other" });

      const result = await runOperatorCommand("disable", { project: "other", externalId });

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain(`error: Operator "${externalId}" not found`);
      expect(await disabledAtOf(projectId)).toBeNull();
    });
  });

  describe("operator:enable", { timeout: commandTimeout }, () => {
    it("код 0, enabled в stdout, disabled_at пуст, в журнале operator.enabled от cli", async () => {
      const { projectId, operatorId } = await setupOperator();
      await runOperatorCommand("disable", { project: "main", externalId });

      const result = await runOperatorCommand("enable", { project: "main", externalId });

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toBe("enabled: ext-1\n");
      expect(await disabledAtOf(projectId)).toBeNull();
      const rows = await operatorBlockAuditRows(getDataSource());
      expect(rows.map((row) => row.action)).toEqual(["operator.disabled", "operator.enabled"]);
      expect(rows[1]).toMatchObject({
        projectId,
        actorKind: "cli",
        actorId: null,
        targetKind: "operator",
        targetId: operatorId,
        data: { externalId },
      });
    });

    it("повтор: код 0, already enabled, журнал без третьей записи", async () => {
      const { projectId } = await setupOperator();
      await runOperatorCommand("disable", { project: "main", externalId });
      await runOperatorCommand("enable", { project: "main", externalId });

      const result = await runOperatorCommand("enable", { project: "main", externalId });

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toBe("already enabled: ext-1\n");
      expect(await disabledAtOf(projectId)).toBeNull();
      expect(await operatorBlockAuditRows(getDataSource())).toHaveLength(2);
    });

    it("незаблокированный оператор: already enabled, журнал пуст", async () => {
      await setupOperator();

      const result = await runOperatorCommand("enable", { project: "main", externalId });

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toBe("already enabled: ext-1\n");
      expect(await operatorBlockAuditRows(getDataSource())).toEqual([]);
    });

    it("неизвестный --external-id: код 1, Operator not found, блокировка остаётся", async () => {
      const { projectId } = await setupOperator();
      await runOperatorCommand("disable", { project: "main", externalId });

      const result = await runOperatorCommand("enable", {
        project: "main",
        externalId: "missing",
      });

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Operator "missing" not found');
      expect(result.stdout).not.toContain("enabled");
      expect(await disabledAtOf(projectId)).toBeInstanceOf(Date);
    });

    it("неизвестный --project: код 1, Project not found, блокировка остаётся", async () => {
      const { projectId } = await setupOperator();
      await runOperatorCommand("disable", { project: "main", externalId });

      const result = await runOperatorCommand("enable", { project: "unknown", externalId });

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
      expect(result.stdout).toBe("");
      expect(await disabledAtOf(projectId)).toBeInstanceOf(Date);
    });
  });

  describe("блокировка и выдача токена", { timeout: commandTimeout }, () => {
    it("после operator:disable issueToken отказывает, после operator:enable выдаёт токен", async () => {
      const { projectId } = await setupOperator();
      const profile = { projectId, externalId, name: "Alice", role: "operator" } as const;

      await runOperatorCommand("disable", { project: "main", externalId });
      await expect(getOperators().issueToken(profile)).rejects.toThrow("Operator is disabled");

      await runOperatorCommand("enable", { project: "main", externalId });
      await expect(getOperators().issueToken(profile)).resolves.toMatchObject({
        token: expect.any(String),
      });
    });
  });

  describe("состав модулей", { timeout: commandTimeout }, () => {
    it("CliModule содержит OperatorsService, но не DisabledOperators", async () => {
      const moduleRef = await Test.createTestingModule({ imports: [CliModule] }).compile();
      try {
        expect(moduleRef.get(OperatorsService, { strict: false })).toBeInstanceOf(OperatorsService);
        expect(() => moduleRef.get(DisabledOperators, { strict: false })).toThrow();
      } finally {
        await moduleRef.close();
      }
    });

    it("ApiModule содержит DisabledOperators", async () => {
      const moduleRef = await Test.createTestingModule({ imports: [ApiModule] }).compile();
      try {
        expect(moduleRef.get(DisabledOperators, { strict: false })).toBeInstanceOf(
          DisabledOperators,
        );
      } finally {
        await moduleRef.close();
      }
    });

    it("DisabledOperatorsModule отдаёт DisabledOperators поверх OperatorsModule", async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [WorkerModule, DisabledOperatorsModule],
      }).compile();
      try {
        expect(moduleRef.get(DisabledOperators, { strict: false })).toBeInstanceOf(
          DisabledOperators,
        );
        expect(moduleRef.get(OperatorsService, { strict: false })).toBeInstanceOf(OperatorsService);
      } finally {
        await moduleRef.close();
      }
    });
  });
});
