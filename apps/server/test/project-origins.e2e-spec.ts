import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { MockInstance } from "vitest";
import { InvalidOriginError } from "../src/domain/projects/origin.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsService } from "../src/domain/projects/projects.service.js";
import type { OriginList } from "../src/domain/projects/projects.service.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { WorkerModule } from "../src/worker.module.js";
import { auditRows } from "./support/identity-key-rows.js";
import { mainProjectInput, projectRows } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const eventNames: Record<OriginList, string> = {
  allowedOrigins: "project.allowedOriginsChanged",
  operatorAllowedOrigins: "project.operatorAllowedOriginsChanged",
};

const columns: Record<OriginList, "allowed_origins" | "operator_allowed_origins"> = {
  allowedOrigins: "allowed_origins",
  operatorAllowedOrigins: "operator_allowed_origins",
};

const otherList: Record<OriginList, OriginList> = {
  allowedOrigins: "operatorAllowedOrigins",
  operatorAllowedOrigins: "allowedOrigins",
};

const lists: OriginList[] = ["allowedOrigins", "operatorAllowedOrigins"];

const emptyLists = { allowedOrigins: [], operatorAllowedOrigins: [] };

describe("домены проекта: addOrigin и removeOrigin", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let projects: ProjectsService;
  let publish: MockInstance<DomainEventBus["publish"]>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, ProjectsModule],
    }).compile();
    await moduleRef.init();
    projects = moduleRef.get(ProjectsService);
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

  async function createMain(overrides = {}): Promise<string> {
    const created = await projects.create(mainProjectInput(overrides));
    publish.mockClear();
    return created.projectId;
  }

  async function listRow(list: OriginList): Promise<string> {
    const [row] = await projectRows(getDataSource());
    return row?.[columns[list]] ?? "";
  }

  function publishedOriginEvents(): unknown[][] {
    return publish.mock.calls.filter(([name]) => String(name).includes("OriginsChanged"));
  }

  async function originAuditRows(): Promise<Awaited<ReturnType<typeof auditRows>>> {
    const rows = await auditRows(getDataSource());
    return rows.filter((row) => row.action.includes("OriginsChanged"));
  }

  describe.each(lists)("список %s", (list) => {
    const eventName = eventNames[list];
    const untouched = otherList[list];

    it("addOrigin нормализует origin, возвращает added и меняет только свой список", async () => {
      const projectId = await createMain(emptyLists);

      const change = await projects.addOrigin({
        projectId,
        list,
        origin: "https://Shop.Example.com/",
        actorKind: "cli",
      });

      expect(change).toBe("added");
      expect(await listRow(list)).toBe("{https://shop.example.com}");
      expect(await listRow(untouched)).toBe("{}");
    });

    it("addOrigin публикует событие с полным новым списком и пишет журнал", async () => {
      const first = "https://a.example.com";
      const projectId = await createMain(emptyLists);
      await projects.addOrigin({ projectId, list, origin: first, actorKind: "cli" });
      publish.mockClear();

      await projects.addOrigin({
        projectId,
        list,
        origin: "http://localhost:5173",
        actorKind: "system",
      });

      const origins = [first, "http://localhost:5173"];
      expect(publishedOriginEvents()).toEqual([
        [eventName, { projectId, origins, actorKind: "system" }],
      ]);
      const rows = await originAuditRows();
      expect(rows.map((row) => row.action)).toEqual([eventName, eventName]);
      expect(rows[1]).toMatchObject({
        projectId,
        actorKind: "system",
        actorId: null,
        targetKind: "project",
        targetId: projectId,
        data: { origins },
      });
    });

    it("addOrigin существующего origin — unchanged, без события и записи журнала", async () => {
      const projectId = await createMain(emptyLists);
      await projects.addOrigin({ projectId, list, origin: "https://a.com", actorKind: "cli" });
      publish.mockClear();

      const change = await projects.addOrigin({
        projectId,
        list,
        origin: "https://A.com/",
        actorKind: "cli",
      });

      expect(change).toBe("unchanged");
      expect(await listRow(list)).toBe("{https://a.com}");
      expect(publishedOriginEvents()).toEqual([]);
      expect(await originAuditRows()).toHaveLength(1);
    });

    it("removeOrigin удаляет по нормализованному origin, остальные остаются по порядку", async () => {
      const projectId = await createMain(emptyLists);
      for (const origin of ["https://a.com", "https://shop.example.com", "https://c.com"]) {
        await projects.addOrigin({ projectId, list, origin, actorKind: "cli" });
      }
      publish.mockClear();

      const change = await projects.removeOrigin({
        projectId,
        list,
        origin: "https://Shop.example.com/",
        actorKind: "cli",
      });

      expect(change).toBe("removed");
      expect(await listRow(list)).toBe("{https://a.com,https://c.com}");
      expect(publishedOriginEvents()).toEqual([
        [eventName, { projectId, origins: ["https://a.com", "https://c.com"], actorKind: "cli" }],
      ]);
      const rows = await originAuditRows();
      expect(rows.at(-1)).toMatchObject({
        targetId: projectId,
        data: { origins: ["https://a.com", "https://c.com"] },
      });
    });

    it("повторный removeOrigin — unchanged, без события и новой записи журнала", async () => {
      const projectId = await createMain(emptyLists);
      await projects.addOrigin({ projectId, list, origin: "https://a.com", actorKind: "cli" });
      const input = { projectId, list, origin: "https://a.com", actorKind: "cli" } as const;
      await expect(projects.removeOrigin(input)).resolves.toBe("removed");
      publish.mockClear();
      const auditCount = (await originAuditRows()).length;

      await expect(projects.removeOrigin(input)).resolves.toBe("unchanged");

      expect(await listRow(list)).toBe("{}");
      expect(publishedOriginEvents()).toEqual([]);
      expect(await originAuditRows()).toHaveLength(auditCount);
    });

    it("removeOrigin не трогает другой список с тем же origin", async () => {
      const projectId = await createMain({
        allowedOrigins: ["https://a.com"],
        operatorAllowedOrigins: ["https://a.com"],
      });

      await projects.removeOrigin({ projectId, list, origin: "https://a.com", actorKind: "cli" });

      expect(await listRow(list)).toBe("{}");
      expect(await listRow(untouched)).toBe("{https://a.com}");
    });

    it("изменение одного проекта не трогает другой", async () => {
      const first = await createMain({ ...emptyLists, name: "first" });
      const second = await createMain({ ...emptyLists, name: "second" });

      await projects.addOrigin({
        projectId: first,
        list,
        origin: "https://a.com",
        actorKind: "cli",
      });

      const rows = await projectRows(getDataSource());
      const secondRow = rows.find((row) => row.id === second);
      expect(secondRow?.allowed_origins).toBe("{}");
      expect(secondRow?.operator_allowed_origins).toBe("{}");
    });

    it.each([["https://a.com/path"], ["*"], ["https://*.a.com"], ["a.com"], [""]])(
      "addOrigin %j — InvalidOriginError, список, события и журнал не меняются",
      async (origin) => {
        const projectId = await createMain(emptyLists);

        await expect(
          projects.addOrigin({ projectId, list, origin, actorKind: "cli" }),
        ).rejects.toThrow(InvalidOriginError);

        expect(await listRow(list)).toBe("{}");
        expect(publishedOriginEvents()).toEqual([]);
        expect(await originAuditRows()).toEqual([]);
      },
    );

    it.each([["https://a.com/path"], ["*"]])(
      "removeOrigin %j — InvalidOriginError, список не меняется",
      async (origin) => {
        const projectId = await createMain({
          allowedOrigins: ["https://a.com"],
          operatorAllowedOrigins: ["https://a.com"],
        });

        await expect(
          projects.removeOrigin({ projectId, list, origin, actorKind: "cli" }),
        ).rejects.toThrow(InvalidOriginError);

        expect(await listRow(list)).toBe("{https://a.com}");
        expect(publishedOriginEvents()).toEqual([]);
      },
    );

    it("падение публикации события откатывает добавление", async () => {
      const projectId = await createMain(emptyLists);
      publish.mockRejectedValueOnce(new Error("bus down"));

      await expect(
        projects.addOrigin({ projectId, list, origin: "https://a.com", actorKind: "cli" }),
      ).rejects.toThrow("bus down");

      expect(await listRow(list)).toBe("{}");
      expect(await originAuditRows()).toEqual([]);
    });

    it("20 одновременных addOrigin разных origin — в списке все 20", async () => {
      const projectId = await createMain(emptyLists);
      const origins = Array.from({ length: 20 }, (_, index) => `https://site-${index}.example.com`);

      const changes = await Promise.all(
        origins.map((origin) => projects.addOrigin({ projectId, list, origin, actorKind: "cli" })),
      );

      expect(changes).toEqual(origins.map(() => "added"));
      const stored = (await listRow(list)).slice(1, -1).split(",");
      expect(stored.sort()).toEqual([...origins].sort());
      expect(publishedOriginEvents()).toHaveLength(20);
      expect(await originAuditRows()).toHaveLength(20);
    });

    it("20 одновременных addOrigin одного origin — один added и 19 unchanged", async () => {
      const projectId = await createMain(emptyLists);

      const changes = await Promise.all(
        Array.from({ length: 20 }, () =>
          projects.addOrigin({ projectId, list, origin: "https://a.com", actorKind: "cli" }),
        ),
      );

      expect(changes.filter((change) => change === "added")).toHaveLength(1);
      expect(changes.filter((change) => change === "unchanged")).toHaveLength(19);
      expect(await listRow(list)).toBe("{https://a.com}");
      expect(publishedOriginEvents()).toHaveLength(1);
    });
  });

  it("allowedOrigins публикует только project.allowedOriginsChanged", async () => {
    const projectId = await createMain();

    await projects.addOrigin({
      projectId,
      list: "allowedOrigins",
      origin: "https://new.example.com",
      actorKind: "cli",
    });

    expect(publishedOriginEvents().map(([name]) => name)).toEqual([
      "project.allowedOriginsChanged",
    ]);
  });

  it("operatorAllowedOrigins публикует только project.operatorAllowedOriginsChanged", async () => {
    const projectId = await createMain();

    await projects.addOrigin({
      projectId,
      list: "operatorAllowedOrigins",
      origin: "https://ops.example.com",
      actorKind: "cli",
    });

    expect(publishedOriginEvents().map(([name]) => name)).toEqual([
      "project.operatorAllowedOriginsChanged",
    ]);
    expect(await listRow("allowedOrigins")).toBe("{https://shop.example.com}");
  });
});
