import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { IdentityKeysService } from "../src/domain/keys/identity-keys.service.js";
import { KeysModule } from "../src/domain/keys/keys.module.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { auditRows, auditRowsByAction, identityKeyRows } from "./support/identity-key-rows.js";
import { generateEd25519Pems, generateP256Pems } from "./support/identity-pems.js";
import { useTestDatabase } from "./support/test-database.js";

describe("сервис identity-ключей: revoke и list", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let service: IdentityKeysService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, KeysModule],
    }).compile();
    await moduleRef.init();
    service = moduleRef.get(IdentityKeysService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  async function addKey(projectId: string, kid: string): Promise<string> {
    const added = await service.add({
      projectId,
      kid,
      pem: generateEd25519Pems().publicPem,
      actorKind: "cli",
    });
    return added.identityKeyId;
  }

  describe("revoke", () => {
    it("ставит revoked_at, возвращает true и пишет identityKey.revoked", async () => {
      const project = await createProject(getDataSource());
      const id = await addKey(project.id, "k1");

      await expect(
        service.revoke({ projectId: project.id, kid: "k1", actorKind: "system" }),
      ).resolves.toBe(true);

      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeInstanceOf(Date);
      const revoked = await auditRowsByAction(getDataSource(), "identityKey.revoked");
      expect(revoked).toHaveLength(1);
      expect(revoked[0]).toMatchObject({
        projectId: project.id,
        actorKind: "system",
        actorId: null,
        targetKind: "identityKey",
        targetId: id,
        data: { kid: "k1", alg: "EdDSA" },
      });
    });

    it("alg в журнале берётся у ключа: ES256", async () => {
      const project = await createProject(getDataSource());
      await service.add({
        projectId: project.id,
        kid: "ec",
        pem: generateP256Pems().publicPem,
        actorKind: "cli",
      });

      await service.revoke({ projectId: project.id, kid: "ec", actorKind: "cli" });

      const [revoked] = await auditRowsByAction(getDataSource(), "identityKey.revoked");
      expect(revoked?.data).toEqual({ kid: "ec", alg: "ES256" });
    });

    it("повторный revoke — false, revoked_at не меняется, новой записи журнала нет", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");
      await service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" });
      const [before] = await identityKeyRows(getDataSource());

      await expect(
        service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" }),
      ).resolves.toBe(false);

      const [after] = await identityKeyRows(getDataSource());
      expect(after?.revokedAt?.getTime()).toBe(before?.revokedAt?.getTime());
      expect(await auditRowsByAction(getDataSource(), "identityKey.revoked")).toHaveLength(1);
    });

    it("неизвестный kid — false, журнал без identityKey.revoked", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");

      await expect(
        service.revoke({ projectId: project.id, kid: "unknown", actorKind: "cli" }),
      ).resolves.toBe(false);

      expect(await auditRowsByAction(getDataSource(), "identityKey.revoked")).toEqual([]);
      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeNull();
    });

    it("kid из другого проекта не отзывается", async () => {
      const owner = await createProject(getDataSource());
      const stranger = await createProject(getDataSource());
      await addKey(owner.id, "k1");

      await expect(
        service.revoke({ projectId: stranger.id, kid: "k1", actorKind: "cli" }),
      ).resolves.toBe(false);

      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeNull();
      expect(await auditRowsByAction(getDataSource(), "identityKey.revoked")).toEqual([]);
    });

    it("отзыв одного ключа не трогает другие ключи проекта", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");
      await addKey(project.id, "k2");

      await service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" });

      const rows = await identityKeyRows(getDataSource());
      expect(rows.map((row) => [row.kid, row.revokedAt === null])).toEqual([
        ["k1", false],
        ["k2", true],
      ]);
    });

    it("два одновременных revoke: true только у одного и одна запись identityKey.revoked", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");

      const results = await Promise.all([
        service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" }),
        service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" }),
      ]);

      expect([...results].sort()).toEqual([false, true]);
      expect(await auditRowsByAction(getDataSource(), "identityKey.revoked")).toHaveLength(1);
    });

    it("сбой публикации события откатывает отзыв", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");
      vi.spyOn(moduleRef.get(DomainEventBus), "publish").mockRejectedValue(new Error("bus down"));

      await expect(
        service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" }),
      ).rejects.toThrow("bus down");

      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeNull();
    });
  });

  describe("list", () => {
    it("возвращает ключи проекта по дате создания", async () => {
      const project = await createProject(getDataSource());
      const kids = ["third", "first", "second"];
      for (const kid of kids) {
        await addKey(project.id, kid);
      }

      const listed = await service.list(project.id);

      expect(listed.map((key) => key.kid)).toEqual(kids);
    });

    it("не включает ключи других проектов", async () => {
      const project = await createProject(getDataSource());
      const other = await createProject(getDataSource());
      await addKey(project.id, "mine");
      await addKey(other.id, "theirs");

      const listed = await service.list(project.id);

      expect(listed.map((key) => key.kid)).toEqual(["mine"]);
      expect(listed.every((key) => key.projectId === project.id)).toBe(true);
    });

    it("проект без ключей — пустой список", async () => {
      const project = await createProject(getDataSource());

      await expect(service.list(project.id)).resolves.toEqual([]);
    });

    it("отозванный ключ остаётся в списке с revokedAt", async () => {
      const project = await createProject(getDataSource());
      await addKey(project.id, "k1");
      await service.revoke({ projectId: project.id, kid: "k1", actorKind: "cli" });

      const [listed, ...others] = await service.list(project.id);

      expect(others).toEqual([]);
      expect(listed?.revokedAt).toBeInstanceOf(Date);
    });

    it("list ничего не пишет в журнал", async () => {
      const project = await createProject(getDataSource());

      await service.list(project.id);

      expect(await auditRows(getDataSource())).toEqual([]);
    });
  });
});
