import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { MockInstance } from "vitest";
import { Operator } from "../src/domain/operators/operator.entity.js";
import { OperatorsModule } from "../src/domain/operators/operators.module.js";
import {
  OperatorNotFoundError,
  OperatorsService,
} from "../src/domain/operators/operators.service.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { auditRows } from "./support/identity-key-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const blockMethods = ["disable", "enable"] as const;

describe("операторы: disable и enable", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let operators: OperatorsService;
  let publish: MockInstance<DomainEventBus["publish"]>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, OperatorsModule],
    }).compile();
    await moduleRef.init();
    operators = moduleRef.get(OperatorsService);
  });

  beforeEach(() => {
    publish = vi.spyOn(moduleRef.get(DomainEventBus), "publish");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  async function createOperator(): Promise<{ projectId: string; externalId: string }> {
    const project = await createProject(getDataSource());
    const request = { projectId: project.id, externalId: "ext-1", name: "Alice" };
    await operators.issueToken({ ...request, role: "operator" });
    publish.mockClear();
    return { projectId: project.id, externalId: request.externalId };
  }

  async function operatorRow(projectId: string, externalId: string): Promise<Operator> {
    return getDataSource().getRepository(Operator).findOneByOrFail({ projectId, externalId });
  }

  async function blockAuditRows(): Promise<Awaited<ReturnType<typeof auditRows>>> {
    const rows = await auditRows(getDataSource());
    return rows.filter((row) => row.action.startsWith("operator."));
  }

  function publishedBlockEvents(): unknown[][] {
    return publish.mock.calls.filter(([name]) => String(name).startsWith("operator."));
  }

  describe("disable", () => {
    it("ставит disabled_at, возвращает disabled, публикует событие и пишет одну запись журнала", async () => {
      const { projectId, externalId } = await createOperator();
      const operator = await operatorRow(projectId, externalId);

      const change = await operators.disable({ projectId, externalId, actorKind: "cli" });

      expect(change).toBe("disabled");
      expect((await operatorRow(projectId, externalId)).disabledAt).toBeInstanceOf(Date);
      expect(publishedBlockEvents()).toEqual([
        ["operator.disabled", { operatorId: operator.id, projectId, externalId, actorKind: "cli" }],
      ]);
      const rows = await blockAuditRows();
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        projectId,
        actorKind: "cli",
        actorId: null,
        action: "operator.disabled",
        targetKind: "operator",
        targetId: operator.id,
        data: { externalId },
      });
    });

    it("в журнал не попадают имя и аватар оператора", async () => {
      const { projectId, externalId } = await createOperator();

      await operators.disable({ projectId, externalId, actorKind: "cli" });

      const [row] = await blockAuditRows();
      expect(Object.keys(row?.data ?? {})).toEqual(["externalId"]);
      expect(JSON.stringify(row)).not.toContain("Alice");
    });

    it("повторный disable — unchanged, без события и новой записи журнала", async () => {
      const { projectId, externalId } = await createOperator();
      await operators.disable({ projectId, externalId, actorKind: "cli" });
      publish.mockClear();
      const before = (await operatorRow(projectId, externalId)).disabledAt;

      const change = await operators.disable({ projectId, externalId, actorKind: "cli" });

      expect(change).toBe("unchanged");
      expect(publishedBlockEvents()).toEqual([]);
      expect(await blockAuditRows()).toHaveLength(1);
      expect((await operatorRow(projectId, externalId)).disabledAt).toEqual(before);
    });

    it("два одновременных disable — один disabled, один unchanged и одна запись журнала", async () => {
      const { projectId, externalId } = await createOperator();
      const input = { projectId, externalId, actorKind: "cli" } as const;

      const changes = await Promise.all([operators.disable(input), operators.disable(input)]);

      expect([...changes].sort()).toEqual(["disabled", "unchanged"]);
      expect(publishedBlockEvents()).toHaveLength(1);
      expect(await blockAuditRows()).toHaveLength(1);
    });

    it("не трогает других операторов проекта и другие проекты", async () => {
      const first = await createOperator();
      const second = await createOperator();
      await operators.issueToken({
        projectId: first.projectId,
        externalId: "ext-2",
        name: "Bob",
        role: "operator",
      });

      await operators.disable({ ...first, actorKind: "cli" });

      expect((await operatorRow(first.projectId, "ext-2")).disabledAt).toBeNull();
      expect((await operatorRow(second.projectId, second.externalId)).disabledAt).toBeNull();
    });
  });

  describe("enable", () => {
    it("снимает disabled_at, возвращает enabled, публикует событие и пишет запись журнала", async () => {
      const { projectId, externalId } = await createOperator();
      const operator = await operatorRow(projectId, externalId);
      await operators.disable({ projectId, externalId, actorKind: "cli" });
      publish.mockClear();

      const change = await operators.enable({ projectId, externalId, actorKind: "system" });

      expect(change).toBe("enabled");
      expect((await operatorRow(projectId, externalId)).disabledAt).toBeNull();
      expect(publishedBlockEvents()).toEqual([
        [
          "operator.enabled",
          { operatorId: operator.id, projectId, externalId, actorKind: "system" },
        ],
      ]);
      const rows = await blockAuditRows();
      expect(rows.map((row) => row.action)).toEqual(["operator.disabled", "operator.enabled"]);
      expect(rows[1]).toMatchObject({
        projectId,
        actorKind: "system",
        actorId: null,
        targetKind: "operator",
        targetId: operator.id,
        data: { externalId },
      });
    });

    it("enable незаблокированного — unchanged, без события и записи журнала", async () => {
      const { projectId, externalId } = await createOperator();

      const change = await operators.enable({ projectId, externalId, actorKind: "cli" });

      expect(change).toBe("unchanged");
      expect(publishedBlockEvents()).toEqual([]);
      expect(await blockAuditRows()).toEqual([]);
    });

    it("после enable issueToken снова выдаёт токен", async () => {
      const { projectId, externalId } = await createOperator();
      await operators.disable({ projectId, externalId, actorKind: "cli" });
      const profile = { projectId, externalId, name: "Alice", role: "operator" } as const;
      await expect(operators.issueToken(profile)).rejects.toThrow("Operator is disabled");

      await operators.enable({ projectId, externalId, actorKind: "cli" });

      await expect(operators.issueToken(profile)).resolves.toMatchObject({
        token: expect.any(String),
      });
    });

    it("два одновременных enable — один enabled, один unchanged и одна запись enabled", async () => {
      const { projectId, externalId } = await createOperator();
      await operators.disable({ projectId, externalId, actorKind: "cli" });
      publish.mockClear();
      const input = { projectId, externalId, actorKind: "cli" } as const;

      const changes = await Promise.all([operators.enable(input), operators.enable(input)]);

      expect([...changes].sort()).toEqual(["enabled", "unchanged"]);
      expect(publishedBlockEvents()).toHaveLength(1);
      const rows = await blockAuditRows();
      expect(rows.filter((row) => row.action === "operator.enabled")).toHaveLength(1);
    });
  });

  describe.each(blockMethods)("%s: ошибки", (method) => {
    it("неизвестный externalId — OperatorNotFoundError, без события и записи журнала", async () => {
      const { projectId } = await createOperator();

      await expect(
        operators[method]({ projectId, externalId: "missing", actorKind: "cli" }),
      ).rejects.toBeInstanceOf(OperatorNotFoundError);

      expect(publishedBlockEvents()).toEqual([]);
      expect(await blockAuditRows()).toEqual([]);
    });

    it("оператор другого проекта — OperatorNotFoundError, оператор не меняется", async () => {
      const { projectId, externalId } = await createOperator();
      const other = await createProject(getDataSource());
      const before = (await operatorRow(projectId, externalId)).disabledAt;

      await expect(
        operators[method]({ projectId: other.id, externalId, actorKind: "cli" }),
      ).rejects.toBeInstanceOf(OperatorNotFoundError);

      expect((await operatorRow(projectId, externalId)).disabledAt).toEqual(before);
      expect(publishedBlockEvents()).toEqual([]);
      expect(await blockAuditRows()).toEqual([]);
    });

    it("падение публикации события откатывает изменение и запись журнала", async () => {
      const { projectId, externalId } = await createOperator();
      if (method === "enable") {
        await operators.disable({ projectId, externalId, actorKind: "cli" });
      }
      const before = (await operatorRow(projectId, externalId)).disabledAt;
      const auditBefore = (await blockAuditRows()).length;
      publish.mockRejectedValueOnce(new Error("bus down"));

      await expect(operators[method]({ projectId, externalId, actorKind: "cli" })).rejects.toThrow(
        "bus down",
      );

      expect((await operatorRow(projectId, externalId)).disabledAt).toEqual(before);
      expect(await blockAuditRows()).toHaveLength(auditBefore);
    });
  });
});
