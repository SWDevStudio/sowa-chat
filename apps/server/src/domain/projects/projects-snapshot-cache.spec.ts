import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import type { Mock, MockInstance } from "vitest";
import { projectRow } from "../../../test/support/projects-service-probe.js";
import { cacheKeys } from "../../infra/cache/cache-keys.js";
import { cacheTtlMs } from "../../infra/cache/app-cache.module.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import { ApiKeysService } from "../keys/api-keys.service.js";
import type { ProjectSnapshot } from "./project-snapshot.js";
import { ProjectsRepository } from "./projects.repository.js";
import { ProjectsService } from "./projects.service.js";

const project = projectRow({
  id: "project-1",
  publicKey: "pk_AAAA",
  allowedOrigins: ["https://shop.example.com"],
  operatorAllowedOrigins: ["https://ops.example.com"],
  settings: { theme: "dark" },
});

const snapshot: ProjectSnapshot = {
  id: "project-1",
  name: "main",
  publicKey: "pk_AAAA",
  allowedOrigins: ["https://shop.example.com"],
  operatorAllowedOrigins: ["https://ops.example.com"],
  settings: { theme: "dark" },
};

describe("ProjectsService: снимок проекта в кэше", () => {
  let moduleRef: TestingModule;
  let service: ProjectsService;
  let cache: Cache;
  let set: MockInstance<Cache["set"]>;
  let findById: Mock;
  let findByPublicKey: Mock;

  beforeEach(async () => {
    findById = vi.fn().mockResolvedValue(project);
    findByPublicKey = vi.fn().mockResolvedValue(project);
    moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register({ ttl: cacheTtlMs })],
      providers: [
        ProjectsService,
        { provide: ProjectsRepository, useValue: { findById, findByPublicKey } },
        { provide: ApiKeysService, useValue: {} },
        { provide: DomainEventBus, useValue: {} },
      ],
    }).compile();
    service = moduleRef.get(ProjectsService);
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
    set = vi.spyOn(cache, "set");
  });

  afterEach(async () => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    await moduleRef.close();
  });

  describe("findSnapshotById", () => {
    it("промах: читает проект, кладёт снимок без собственного срока и возвращает его", async () => {
      await expect(service.findSnapshotById("project-1")).resolves.toStrictEqual(snapshot);

      expect(findById).toHaveBeenCalledWith("project-1");
      expect(set).toHaveBeenCalledTimes(1);
      expect(set.mock.calls[0]).toStrictEqual([cacheKeys.project("project-1"), snapshot]);
    });

    it("попадание: второй вызов не идёт в репозиторий", async () => {
      await service.findSnapshotById("project-1");

      await expect(service.findSnapshotById("project-1")).resolves.toStrictEqual(snapshot);

      expect(findById).toHaveBeenCalledTimes(1);
    });

    it("запись, положенная в кэш заранее, возвращается без репозитория", async () => {
      const cached: ProjectSnapshot = { ...snapshot, name: "from-cache" };
      await cache.set(cacheKeys.project("project-1"), cached);

      await expect(service.findSnapshotById("project-1")).resolves.toStrictEqual(cached);

      expect(findById).not.toHaveBeenCalled();
    });

    it("разные проекты не мешают друг другу", async () => {
      findById.mockImplementation(async (id: string) => projectRow({ id, name: `name-${id}` }));

      const first = await service.findSnapshotById("project-1");
      const second = await service.findSnapshotById("project-2");

      expect(first).toMatchObject({ id: "project-1", name: "name-project-1" });
      expect(second).toMatchObject({ id: "project-2", name: "name-project-2" });
      expect(findById).toHaveBeenCalledTimes(2);
    });

    it("не найден: undefined, в кэш ничего не пишется, повтор снова идёт в репозиторий", async () => {
      findById.mockResolvedValue(null);

      await expect(service.findSnapshotById("missing")).resolves.toBeUndefined();
      await expect(service.findSnapshotById("missing")).resolves.toBeUndefined();

      expect(set).not.toHaveBeenCalled();
      expect(findById).toHaveBeenCalledTimes(2);
    });

    it("ошибка репозитория пробрасывается и не кэшируется", async () => {
      findById.mockRejectedValueOnce(new Error("db down"));

      await expect(service.findSnapshotById("project-1")).rejects.toThrow("db down");
      await expect(service.findSnapshotById("project-1")).resolves.toStrictEqual(snapshot);

      expect(findById).toHaveBeenCalledTimes(2);
    });

    it("запись живёт 60 секунд: на 59-й секунде попадание, на 61-й промах", async () => {
      vi.useFakeTimers();
      await service.findSnapshotById("project-1");

      vi.advanceTimersByTime(59_000);
      await service.findSnapshotById("project-1");
      expect(findById).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(2_000);
      await service.findSnapshotById("project-1");
      expect(findById).toHaveBeenCalledTimes(2);
    });
  });

  describe("findSnapshotByPublicKey", () => {
    it("промах: кладёт ID по publicKey и снимок по ID, возвращает снимок", async () => {
      await expect(service.findSnapshotByPublicKey("pk_AAAA")).resolves.toStrictEqual(snapshot);

      expect(findByPublicKey).toHaveBeenCalledWith("pk_AAAA");
      expect(findById).not.toHaveBeenCalled();
      expect(set).toHaveBeenCalledTimes(2);
      expect(set.mock.calls).toContainEqual([
        cacheKeys.projectIdByPublicKey("pk_AAAA"),
        "project-1",
      ]);
      expect(set.mock.calls).toContainEqual([cacheKeys.project("project-1"), snapshot]);
    });

    it("попадание: второй вызов не идёт ни в findByPublicKey, ни в findById", async () => {
      await service.findSnapshotByPublicKey("pk_AAAA");

      await expect(service.findSnapshotByPublicKey("pk_AAAA")).resolves.toStrictEqual(snapshot);

      expect(findByPublicKey).toHaveBeenCalledTimes(1);
      expect(findById).not.toHaveBeenCalled();
    });

    it("после поиска по publicKey findSnapshotById берёт снимок из кэша", async () => {
      await service.findSnapshotByPublicKey("pk_AAAA");

      await expect(service.findSnapshotById("project-1")).resolves.toStrictEqual(snapshot);

      expect(findById).not.toHaveBeenCalled();
    });

    it("снимок сброшен, ID по publicKey остался: проект читается по ID, не по publicKey", async () => {
      await service.findSnapshotByPublicKey("pk_AAAA");
      await cache.del(cacheKeys.project("project-1"));

      await expect(service.findSnapshotByPublicKey("pk_AAAA")).resolves.toStrictEqual(snapshot);

      expect(findByPublicKey).toHaveBeenCalledTimes(1);
      expect(findById).toHaveBeenCalledWith("project-1");
    });

    it("запись ID по publicKey, положенная заранее, ведёт в findSnapshotById", async () => {
      await cache.set(cacheKeys.projectIdByPublicKey("pk_AAAA"), "project-1");

      await expect(service.findSnapshotByPublicKey("pk_AAAA")).resolves.toStrictEqual(snapshot);

      expect(findByPublicKey).not.toHaveBeenCalled();
      expect(findById).toHaveBeenCalledWith("project-1");
    });

    it("не найден: undefined, в кэш ничего не пишется, повтор снова идёт в репозиторий", async () => {
      findByPublicKey.mockResolvedValue(null);

      await expect(service.findSnapshotByPublicKey("pk_missing")).resolves.toBeUndefined();
      await expect(service.findSnapshotByPublicKey("pk_missing")).resolves.toBeUndefined();

      expect(set).not.toHaveBeenCalled();
      expect(findByPublicKey).toHaveBeenCalledTimes(2);
    });

    it("запись по publicKey живёт 60 секунд: на 61-й секунде снова findByPublicKey", async () => {
      vi.useFakeTimers();
      await service.findSnapshotByPublicKey("pk_AAAA");

      vi.advanceTimersByTime(59_000);
      await service.findSnapshotByPublicKey("pk_AAAA");
      expect(findByPublicKey).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(2_000);
      await service.findSnapshotByPublicKey("pk_AAAA");
      expect(findByPublicKey).toHaveBeenCalledTimes(2);
    });
  });
});
