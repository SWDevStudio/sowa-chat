import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { setTimeout as delay } from "node:timers/promises";
import type { MockInstance } from "vitest";
import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { ApiKeysService, InvalidApiKeyError } from "../src/domain/keys/api-keys.service.js";
import { generateKey, toLookupPrefix } from "../src/domain/keys/key-format.js";
import { Project } from "../src/domain/projects/project.entity.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import { ProjectsService } from "../src/domain/projects/projects.service.js";
import type { CreatedProject } from "../src/domain/projects/projects.service.js";
import { WorkerModule } from "../src/worker.module.js";
import { allRowsAsText, mainProjectInput, projectRows, sha256 } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

interface Replica {
  moduleRef: TestingModule;
  projects: ProjectsService;
  keys: ApiKeysService;
  repository: ProjectsRepository;
}

async function startReplica(): Promise<Replica> {
  const moduleRef = await Test.createTestingModule({
    imports: [WorkerModule, ProjectsModule],
  }).compile();
  await moduleRef.init();
  return {
    moduleRef,
    projects: moduleRef.get(ProjectsService),
    keys: moduleRef.get(ApiKeysService),
    repository: moduleRef.get(ProjectsRepository),
  };
}

function barrier(parties: number): () => Promise<void> {
  let arrived = 0;
  let open: () => void = () => {};
  const opened = new Promise<void>((resolve) => {
    open = resolve;
  });
  return async () => {
    arrived += 1;
    if (arrived === parties) {
      open();
    }
    await opened;
  };
}

function lockAfterBarrier(
  replica: Replica,
  wait: () => Promise<void>,
): MockInstance<ProjectsRepository["lockInitialProject"]> {
  const lock = replica.repository.lockInitialProject.bind(replica.repository);
  return vi.spyOn(replica.repository, "lockInitialProject").mockImplementation(async () => {
    await wait();
    await lock();
  });
}

describe("начальный проект", () => {
  const getDataSource = useTestDatabase();
  let first: Replica;
  let second: Replica;

  async function apiKeyRows(): Promise<ApiKey[]> {
    return getDataSource().getRepository(ApiKey).find();
  }

  async function projectCreatedRows(): Promise<AuditLogEntry[]> {
    return getDataSource().getRepository(AuditLogEntry).findBy({ action: "project.created" });
  }

  async function expectSingleProject(projectId: string): Promise<void> {
    expect((await projectRows(getDataSource())).map((row) => row.id)).toEqual([projectId]);
    const keys = await apiKeyRows();
    expect(keys).toHaveLength(1);
    expect(keys[0]).toMatchObject({ projectId, kind: "server" });
    const created = await projectCreatedRows();
    expect(created).toHaveLength(1);
    expect(created[0]?.projectId).toBe(projectId);
  }

  function onlyCreated(results: (CreatedProject | undefined)[]): CreatedProject {
    const created = results.filter((result) => result !== undefined);
    expect(created).toHaveLength(1);
    expect(results.filter((result) => result === undefined)).toHaveLength(1);
    const [project] = created;
    if (!project) {
      throw new Error("no project created");
    }
    return project;
  }

  beforeAll(async () => {
    first = await startReplica();
    second = await startReplica();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await first?.moduleRef.close();
    await second?.moduleRef.close();
  });

  describe("две реплики одновременно", () => {
    it("Promise.all: один CreatedProject, второй undefined, в БД один проект, ключ и project.created", async () => {
      const results = await Promise.all([
        first.projects.createInitial(mainProjectInput({ actorKind: "system" })),
        second.projects.createInitial(mainProjectInput({ actorKind: "system" })),
      ]);

      const created = onlyCreated(results);
      await expectSingleProject(created.projectId);
    });

    it("обе реплики доходят до блокировки вместе — проект всё равно создаётся один раз", async () => {
      const wait = barrier(2);
      const firstLock = lockAfterBarrier(first, wait);
      const secondLock = lockAfterBarrier(second, wait);

      const results = await Promise.all([
        first.projects.createInitial(mainProjectInput({ actorKind: "system" })),
        second.projects.createInitial(mainProjectInput({ actorKind: "system" })),
      ]);

      expect(firstLock).toHaveBeenCalledTimes(1);
      expect(secondLock).toHaveBeenCalledTimes(1);
      const created = onlyCreated(results);
      await expectSingleProject(created.projectId);
      await expect(first.keys.verify(created.serverKey, "server")).resolves.toMatchObject({
        projectId: created.projectId,
      });
    });

    it("с одним serverKey у обеих реплик — один ключ с хешем этого ключа", async () => {
      const serverKey = generateKey("serverKey");
      const wait = barrier(2);
      lockAfterBarrier(first, wait);
      lockAfterBarrier(second, wait);

      const results = await Promise.all([
        first.projects.createInitial(mainProjectInput({ serverKey, actorKind: "system" })),
        second.projects.createInitial(mainProjectInput({ serverKey, actorKind: "system" })),
      ]);

      const created = onlyCreated(results);
      await expectSingleProject(created.projectId);
      const [apiKey] = await apiKeyRows();
      expect(apiKey?.keyHash).toEqual(sha256(serverKey));
    });
  });

  it("чужая транзакция держит блокировку — createInitial ждёт и видит её проект", async () => {
    const runner = getDataSource().createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      await runner.query("SELECT pg_advisory_xact_lock(hashtext($1))", [
        "sowa-chat:initial-project",
      ]);
      let settled = false;
      const pending = first.projects.createInitial(mainProjectInput()).finally(() => {
        settled = true;
      });
      await delay(500);
      expect(settled).toBe(false);
      await runner.manager.getRepository(Project).save({ name: "main" });
      await runner.commitTransaction();

      await expect(pending).resolves.toBeUndefined();
    } finally {
      if (runner.isTransactionActive) {
        await runner.rollbackTransaction();
      }
      await runner.release();
    }
    expect(await projectRows(getDataSource())).toHaveLength(1);
    expect(await apiKeyRows()).toEqual([]);
    expect(await projectCreatedRows()).toEqual([]);
  });

  describe("готовый serverKey", () => {
    it("в api_keys.key_hash — sha256 ключа, verify возвращает этот проект", async () => {
      const serverKey = generateKey("serverKey");

      const created = await first.projects.createInitial(
        mainProjectInput({ serverKey, actorKind: "system" }),
      );

      expect(created?.serverKey).toBe(serverKey);
      expect(created?.serverKeyPrefix).toBe(toLookupPrefix(serverKey));
      const [apiKey, ...otherKeys] = await apiKeyRows();
      expect(otherKeys).toEqual([]);
      expect(apiKey?.keyHash).toEqual(sha256(serverKey));
      expect(apiKey?.prefix).toBe(toLookupPrefix(serverKey));
      await expect(first.keys.verify(serverKey, "server")).resolves.toMatchObject({
        projectId: created?.projectId,
      });
    });

    it("открытого ключа нет ни в одной таблице", async () => {
      const serverKey = generateKey("serverKey");

      await first.projects.createInitial(mainProjectInput({ serverKey }));

      const everything = await allRowsAsText(getDataSource());
      expect(everything).not.toContain(serverKey);
      expect(everything).not.toContain(serverKey.split("_")[1]);
    });

    it("повторный старт с другим ключом ничего не меняет", async () => {
      const serverKey = generateKey("serverKey");
      const created = await first.projects.createInitial(mainProjectInput({ serverKey }));
      const otherKey = generateKey("serverKey");

      const repeated = await second.projects.createInitial(
        mainProjectInput({ serverKey: otherKey, allowedOrigins: ["https://other.example.com"] }),
      );

      expect(repeated).toBeUndefined();
      await expectSingleProject(created?.projectId ?? "");
      const [row] = await projectRows(getDataSource());
      expect(row?.allowed_origins).toBe("{https://shop.example.com}");
      await expect(first.keys.verify(otherKey, "server")).resolves.toBeUndefined();
      await expect(first.keys.verify(serverKey, "server")).resolves.toMatchObject({
        projectId: created?.projectId,
      });
    });

    it("проект создан через create — createInitial возвращает undefined", async () => {
      const created = await first.projects.create(mainProjectInput());

      await expect(first.projects.createInitial(mainProjectInput())).resolves.toBeUndefined();

      await expectSingleProject(created.projectId);
    });

    it("serverKey с испорченной контрольной суммой — InvalidApiKeyError, всё откатывается", async () => {
      const validKey = generateKey("serverKey");
      const brokenChar = validKey.endsWith("A") ? "B" : "A";
      const serverKey = `${validKey.slice(0, -1)}${brokenChar}`;

      const error: unknown = await first.projects
        .createInitial(mainProjectInput({ serverKey }))
        .catch((caught: unknown) => caught);

      expect(error).toBeInstanceOf(InvalidApiKeyError);
      expect((error as Error).message).not.toContain(serverKey);
      expect(await projectRows(getDataSource())).toEqual([]);
      expect(await apiKeyRows()).toEqual([]);
      expect(await projectCreatedRows()).toEqual([]);
    });
  });
});
