import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import type { IssueApiKeyInput } from "../src/domain/keys/api-keys.service.js";
import { parseKey } from "../src/domain/keys/key-format.js";
import { InvalidOriginError } from "../src/domain/projects/origin.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import {
  InvalidProjectNameError,
  ProjectAlreadyExistsError,
  ProjectNotFoundError,
  ProjectsService,
} from "../src/domain/projects/projects.service.js";
import { WorkerModule } from "../src/worker.module.js";
import { allRowsAsText, mainProjectInput, projectRows, sha256 } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

describe("сервис проектов", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let projects: ProjectsService;
  let keys: ApiKeysService;

  async function apiKeyRows(): Promise<ApiKey[]> {
    return getDataSource().getRepository(ApiKey).find();
  }

  async function auditRows(): Promise<AuditLogEntry[]> {
    return getDataSource()
      .getRepository(AuditLogEntry)
      .find({ order: { createdAt: "ASC" } });
  }

  async function expectNoRows(): Promise<void> {
    expect(await projectRows(getDataSource())).toEqual([]);
    expect(await apiKeyRows()).toEqual([]);
    expect(await auditRows()).toEqual([]);
  }

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, ProjectsModule],
    }).compile();
    await moduleRef.init();
    projects = moduleRef.get(ProjectsService);
    keys = moduleRef.get(ApiKeysService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  describe("create", () => {
    it("записывает pk_ и нормализованные origins в проект, sk_ проходит verify", async () => {
      const created = await projects.create(mainProjectInput());

      expect(parseKey(created.publicKey, "publicKey")).toBeDefined();
      const rows = await projectRows(getDataSource());
      expect(rows).toEqual([
        {
          id: created.projectId,
          name: "main",
          public_key: created.publicKey,
          allowed_origins: "{https://shop.example.com}",
          operator_allowed_origins: "{}",
        },
      ]);
      await expect(keys.verify(created.serverKey, "server")).resolves.toMatchObject({
        projectId: created.projectId,
        botId: null,
      });
    });

    it("sk_ хранится только хешем: открытого ключа нет ни в одной таблице", async () => {
      const created = await projects.create(mainProjectInput());

      expect(parseKey(created.serverKey, "serverKey")).toBeDefined();
      const [apiKey, ...otherKeys] = await apiKeyRows();
      expect(otherKeys).toEqual([]);
      expect(apiKey).toMatchObject({
        projectId: created.projectId,
        kind: "server",
        prefix: created.serverKeyPrefix,
        revokedAt: null,
      });
      expect(apiKey?.keyHash).toEqual(sha256(created.serverKey));
      expect(created.serverKeyPrefix).toBe(parseKey(created.serverKey, "serverKey")?.lookupPrefix);
      const everything = await allRowsAsText(getDataSource());
      expect(everything).not.toContain(created.serverKey);
      expect(everything).not.toContain(created.serverKey.split("_")[1]);
    });

    it("оба списка origins записываются нормализованными", async () => {
      const created = await projects.create(
        mainProjectInput({
          allowedOrigins: ["https://A.com/", "https://a.com", "http://localhost:5173"],
          operatorAllowedOrigins: ["https://Ops.Example.com:443/"],
        }),
      );

      const [row] = await projectRows(getDataSource());
      expect(row?.id).toBe(created.projectId);
      expect(row?.allowed_origins).toBe("{https://a.com,http://localhost:5173}");
      expect(row?.operator_allowed_origins).toBe("{https://ops.example.com}");
    });

    it("ключи двух проектов разные и каждый sk_ ведёт к своему проекту", async () => {
      const first = await projects.create(mainProjectInput({ name: "first" }));
      const second = await projects.create(mainProjectInput({ name: "second" }));

      expect(first.publicKey).not.toBe(second.publicKey);
      expect(first.serverKey).not.toBe(second.serverKey);
      await expect(keys.verify(first.serverKey, "server")).resolves.toMatchObject({
        projectId: first.projectId,
      });
      await expect(keys.verify(second.serverKey, "server")).resolves.toMatchObject({
        projectId: second.projectId,
      });
    });

    it("повторный create с именем main — ProjectAlreadyExistsError, один проект и один ключ", async () => {
      const created = await projects.create(mainProjectInput());

      await expect(projects.create(mainProjectInput({ actorKind: "system" }))).rejects.toThrow(
        ProjectAlreadyExistsError,
      );

      const rows = await projectRows(getDataSource());
      expect(rows.map((row) => row.id)).toEqual([created.projectId]);
      expect(await apiKeyRows()).toHaveLength(1);
      const projectCreatedRows = (await auditRows()).filter(
        (row) => row.action === "project.created",
      );
      expect(projectCreatedRows).toHaveLength(1);
    });

    it.each([["Main"], ["-a"], [""], ["a".repeat(64)], ["a_b"]])(
      "имя %j — InvalidProjectNameError, проекта нет",
      async (name) => {
        await expect(projects.create(mainProjectInput({ name }))).rejects.toThrow(
          InvalidProjectNameError,
        );

        await expectNoRows();
      },
    );

    it("имя из 63 символов допустимо", async () => {
      const name = "a".repeat(63);

      await projects.create(mainProjectInput({ name }));

      expect((await projectRows(getDataSource())).map((row) => row.name)).toEqual([name]);
    });

    it("неверный origin сайта — InvalidOriginError, проекта нет", async () => {
      await expect(
        projects.create(mainProjectInput({ allowedOrigins: ["shop.example.com"] })),
      ).rejects.toThrow(InvalidOriginError);

      await expectNoRows();
    });

    it("неверный origin оператора — InvalidOriginError, проекта нет", async () => {
      await expect(
        projects.create(mainProjectInput({ operatorAllowedOrigins: ["https://*.example.com"] })),
      ).rejects.toThrow(InvalidOriginError);

      await expectNoRows();
    });
  });

  describe("одна транзакция", () => {
    it("issue падает до записи ключа — нет строк в projects, api_keys и audit_log", async () => {
      vi.spyOn(keys, "issue").mockRejectedValue(new Error("issue failed"));

      await expect(projects.create(mainProjectInput())).rejects.toThrow("issue failed");

      await expectNoRows();
    });

    it("issue падает после записи ключа и события — всё откатывается", async () => {
      const issue = keys.issue.bind(keys);
      vi.spyOn(keys, "issue").mockImplementation(async (input: IssueApiKeyInput) => {
        await issue(input);
        throw new Error("issue failed after insert");
      });

      await expect(projects.create(mainProjectInput())).rejects.toThrow(
        "issue failed after insert",
      );

      await expectNoRows();
    });

    it("после отката имя свободно и следующий create проходит", async () => {
      vi.spyOn(keys, "issue").mockRejectedValueOnce(new Error("issue failed"));
      await expect(projects.create(mainProjectInput())).rejects.toThrow("issue failed");

      const created = await projects.create(mainProjectInput());

      expect((await projectRows(getDataSource())).map((row) => row.id)).toEqual([
        created.projectId,
      ]);
      expect(await apiKeyRows()).toHaveLength(1);
    });
  });

  describe("журнал аудита", () => {
    it("пишет project.created и apiKey.issued без открытого ключа", async () => {
      const created = await projects.create(mainProjectInput());

      const rows = await auditRows();
      expect(rows.map((row) => row.action).sort()).toEqual(["apiKey.issued", "project.created"]);
      expect(rows.find((row) => row.action === "project.created")).toMatchObject({
        projectId: created.projectId,
        actorKind: "cli",
        actorId: null,
        targetKind: "project",
        targetId: created.projectId,
        data: { name: "main" },
      });
      const [apiKey] = await apiKeyRows();
      expect(rows.find((row) => row.action === "apiKey.issued")).toMatchObject({
        projectId: created.projectId,
        actorKind: "cli",
        targetKind: "apiKey",
        targetId: apiKey?.id,
      });
      const serialized = JSON.stringify(rows);
      expect(serialized).not.toContain(created.serverKey);
      expect(serialized).not.toContain(sha256(created.serverKey).toString("hex"));
    });

    it("actorKind system попадает в обе записи", async () => {
      await projects.create(mainProjectInput({ actorKind: "system" }));

      const rows = await auditRows();
      expect(rows).toHaveLength(2);
      expect(rows.every((row) => row.actorKind === "system")).toBe(true);
    });
  });

  describe("getByName и list", () => {
    it("getByName находит созданный проект", async () => {
      const created = await projects.create(mainProjectInput());

      await expect(projects.getByName("main")).resolves.toMatchObject({
        id: created.projectId,
        name: "main",
        publicKey: created.publicKey,
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: [],
      });
    });

    it("getByName неизвестного имени — ProjectNotFoundError", async () => {
      await projects.create(mainProjectInput());

      await expect(projects.getByName("unknown")).rejects.toThrow(ProjectNotFoundError);
      await expect(projects.getByName("unknown")).rejects.toThrow('Project "unknown" not found');
    });

    it("list возвращает проекты по имени", async () => {
      await projects.create(mainProjectInput({ name: "main" }));
      await projects.create(mainProjectInput({ name: "b-shop" }));
      await projects.create(mainProjectInput({ name: "a-shop" }));

      const listed = await projects.list();

      expect(listed.map((project) => project.name)).toEqual(["a-shop", "b-shop", "main"]);
    });

    it("list без проектов — пустой список", async () => {
      await expect(projects.list()).resolves.toEqual([]);
    });
  });

  it("ProjectsRepository.create({ name }) создаёт проект без publicKey", async () => {
    const project = await moduleRef.get(ProjectsRepository).create({ name: "bare" });

    expect(await projectRows(getDataSource())).toEqual([
      {
        id: project.id,
        name: "bare",
        public_key: null,
        allowed_origins: "{}",
        operator_allowed_origins: "{}",
      },
    ]);
  });
});
