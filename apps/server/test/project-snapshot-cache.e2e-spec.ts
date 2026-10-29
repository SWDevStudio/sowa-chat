import { randomUUID } from "node:crypto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import type { MockInstance } from "vitest";
import { generateKey } from "../src/domain/keys/key-format.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import { ProjectsService } from "../src/domain/projects/projects.service.js";
import type { OriginList } from "../src/domain/projects/projects.service.js";
import { cacheKeys } from "../src/infra/cache/cache-keys.js";
import { WorkerModule } from "../src/worker.module.js";
import { mainProjectInput } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const lists: OriginList[] = ["allowedOrigins", "operatorAllowedOrigins"];

describe("кэш снимка проекта", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let projects: ProjectsService;
  let cache: Cache;
  let findById: MockInstance<ProjectsRepository["findById"]>;
  let findByPublicKey: MockInstance<ProjectsRepository["findByPublicKey"]>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, ProjectsModule],
    }).compile();
    await moduleRef.init();
    projects = moduleRef.get(ProjectsService);
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  beforeEach(() => {
    const repository = moduleRef.get(ProjectsRepository);
    findById = vi.spyOn(repository, "findById");
    findByPublicKey = vi.spyOn(repository, "findByPublicKey");
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await cache.clear();
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  describe("findSnapshotById", () => {
    it("возвращает поля ProjectSnapshot без createdAt, второй вызов читает кэш", async () => {
      const created = await projects.create(mainProjectInput());

      const first = await projects.findSnapshotById(created.projectId);
      const second = await projects.findSnapshotById(created.projectId);

      const expected = {
        id: created.projectId,
        name: "main",
        publicKey: created.publicKey,
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: [],
        settings: {},
      };
      expect(first).toStrictEqual(expected);
      expect(second).toStrictEqual(expected);
      expect(findById).toHaveBeenCalledTimes(1);
    });

    it("снимок в кэше JSON-совместим и лежит под ключом проекта", async () => {
      const created = await projects.create(mainProjectInput());

      const snapshot = await projects.findSnapshotById(created.projectId);

      const cached = await cache.get(cacheKeys.project(created.projectId));
      expect(cached).toStrictEqual(snapshot);
      expect(JSON.parse(JSON.stringify(cached))).toStrictEqual(snapshot);
    });

    it("settings из строки проекта попадают в снимок", async () => {
      const created = await projects.create(mainProjectInput());
      await getDataSource().query(`UPDATE "projects" SET "settings" = $1 WHERE "id" = $2`, [
        JSON.stringify({ theme: "dark", limits: { messages: 5 } }),
        created.projectId,
      ]);

      const snapshot = await projects.findSnapshotById(created.projectId);

      expect(snapshot?.settings).toStrictEqual({ theme: "dark", limits: { messages: 5 } });
    });

    it("неизвестный ID: undefined, в кэше пусто, повтор снова идёт в репозиторий", async () => {
      const unknownId = randomUUID();

      await expect(projects.findSnapshotById(unknownId)).resolves.toBeUndefined();
      await expect(projects.findSnapshotById(unknownId)).resolves.toBeUndefined();

      expect(findById).toHaveBeenCalledTimes(2);
      expect(await cache.get(cacheKeys.project(unknownId))).toBeUndefined();
    });

    it("снимки разных проектов не смешиваются", async () => {
      const first = await projects.create(mainProjectInput({ name: "first" }));
      const second = await projects.create(mainProjectInput({ name: "second" }));

      const firstSnapshot = await projects.findSnapshotById(first.projectId);
      const secondSnapshot = await projects.findSnapshotById(second.projectId);

      expect(firstSnapshot?.name).toBe("first");
      expect(secondSnapshot?.name).toBe("second");
      expect(findById).toHaveBeenCalledTimes(2);
    });
  });

  describe("findSnapshotByPublicKey", () => {
    it("второй вызов читает кэш, findSnapshotById того же проекта не идёт в findById", async () => {
      const created = await projects.create(mainProjectInput());

      const first = await projects.findSnapshotByPublicKey(created.publicKey);
      const second = await projects.findSnapshotByPublicKey(created.publicKey);
      const byId = await projects.findSnapshotById(created.projectId);

      expect(first).toMatchObject({ id: created.projectId, publicKey: created.publicKey });
      expect(second).toStrictEqual(first);
      expect(byId).toStrictEqual(first);
      expect(findByPublicKey).toHaveBeenCalledTimes(1);
      expect(findById).not.toHaveBeenCalled();
    });

    it("в кэше ID проекта по publicKey и снимок по ID", async () => {
      const created = await projects.create(mainProjectInput());

      const snapshot = await projects.findSnapshotByPublicKey(created.publicKey);

      expect(await cache.get(cacheKeys.projectIdByPublicKey(created.publicKey))).toBe(
        created.projectId,
      );
      expect(await cache.get(cacheKeys.project(created.projectId))).toStrictEqual(snapshot);
    });

    it("неизвестный publicKey: undefined, в кэше пусто, повтор снова идёт в репозиторий", async () => {
      await projects.create(mainProjectInput());
      const unknownKey = generateKey("publicKey");

      await expect(projects.findSnapshotByPublicKey(unknownKey)).resolves.toBeUndefined();
      await expect(projects.findSnapshotByPublicKey(unknownKey)).resolves.toBeUndefined();

      expect(findByPublicKey).toHaveBeenCalledTimes(2);
      expect(await cache.get(cacheKeys.projectIdByPublicKey(unknownKey))).toBeUndefined();
    });

    it("publicKey другого проекта не возвращает чужой снимок", async () => {
      const first = await projects.create(mainProjectInput({ name: "first" }));
      const second = await projects.create(mainProjectInput({ name: "second" }));

      const byFirstKey = await projects.findSnapshotByPublicKey(first.publicKey);
      const bySecondKey = await projects.findSnapshotByPublicKey(second.publicKey);

      expect(byFirstKey?.name).toBe("first");
      expect(bySecondKey?.name).toBe("second");
    });
  });

  describe.each(lists)("сброс после addOrigin в %s", (list) => {
    it("findSnapshotById возвращает новый список доменов", async () => {
      const created = await projects.create(mainProjectInput());
      const before = await projects.findSnapshotById(created.projectId);

      await projects.addOrigin({
        projectId: created.projectId,
        list,
        origin: "https://new.example.com",
        actorKind: "cli",
      });

      const after = await projects.findSnapshotById(created.projectId);
      expect(after?.[list]).toEqual([...(before?.[list] ?? []), "https://new.example.com"]);
      const otherList = lists.find((name) => name !== list) ?? list;
      expect(after?.[otherList]).toEqual(before?.[otherList]);
      expect(findById).toHaveBeenCalledTimes(2);
    });

    it("findSnapshotByPublicKey тоже видит новый список, запись по publicKey остаётся", async () => {
      const created = await projects.create(mainProjectInput());
      await projects.findSnapshotByPublicKey(created.publicKey);

      await projects.addOrigin({
        projectId: created.projectId,
        list,
        origin: "https://new.example.com",
        actorKind: "cli",
      });

      const after = await projects.findSnapshotByPublicKey(created.publicKey);
      expect(after?.[list]).toContain("https://new.example.com");
      expect(findByPublicKey).toHaveBeenCalledTimes(1);
      expect(await cache.get(cacheKeys.projectIdByPublicKey(created.publicKey))).toBe(
        created.projectId,
      );
    });

    it("removeOrigin тоже сбрасывает снимок", async () => {
      const created = await projects.create(
        mainProjectInput({
          allowedOrigins: ["https://a.example.com", "https://b.example.com"],
          operatorAllowedOrigins: ["https://a.example.com", "https://b.example.com"],
        }),
      );
      await projects.findSnapshotById(created.projectId);

      await projects.removeOrigin({
        projectId: created.projectId,
        list,
        origin: "https://a.example.com",
        actorKind: "cli",
      });

      const after = await projects.findSnapshotById(created.projectId);
      expect(after?.[list]).toEqual(["https://b.example.com"]);
    });

    it("origin уже в списке: изменения нет, снимок остаётся в кэше", async () => {
      const created = await projects.create(
        mainProjectInput({
          allowedOrigins: ["https://a.example.com"],
          operatorAllowedOrigins: ["https://a.example.com"],
        }),
      );
      await projects.findSnapshotById(created.projectId);

      await projects.addOrigin({
        projectId: created.projectId,
        list,
        origin: "https://a.example.com",
        actorKind: "cli",
      });

      await projects.findSnapshotById(created.projectId);
      expect(findById).toHaveBeenCalledTimes(1);
    });
  });

  it("сброс одного проекта не трогает снимок другого", async () => {
    const first = await projects.create(mainProjectInput({ name: "first" }));
    const second = await projects.create(mainProjectInput({ name: "second" }));
    await projects.findSnapshotById(first.projectId);
    await projects.findSnapshotById(second.projectId);
    findById.mockClear();

    await projects.addOrigin({
      projectId: first.projectId,
      list: "allowedOrigins",
      origin: "https://new.example.com",
      actorKind: "cli",
    });

    await projects.findSnapshotById(second.projectId);
    expect(findById).not.toHaveBeenCalled();
    await projects.findSnapshotById(first.projectId);
    expect(findById).toHaveBeenCalledTimes(1);
  });
});
