import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import { createHash, randomUUID } from "node:crypto";
import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import { parseKey } from "../src/domain/keys/key-format.js";
import { KeysModule } from "../src/domain/keys/keys.module.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { forgeKeyWithSameLookupPrefix } from "./support/forged-api-keys.js";
import { useTestDatabase } from "./support/test-database.js";

function sha256(text: string): Buffer {
  return createHash("sha256").update(text).digest();
}

describe("ключи server и bot", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let keys: ApiKeysService;

  async function apiKeyRows(): Promise<ApiKey[]> {
    return getDataSource().getRepository(ApiKey).find();
  }

  async function auditRows(): Promise<AuditLogEntry[]> {
    return getDataSource()
      .getRepository(AuditLogEntry)
      .find({ order: { createdAt: "ASC" } });
  }

  async function lastUsedAt(id: string): Promise<Date | null> {
    const row = await getDataSource().getRepository(ApiKey).findOneByOrFail({ id });
    return row.lastUsedAt;
  }

  async function shiftLastUsedAt(id: string, interval: string): Promise<void> {
    await getDataSource().query(
      `UPDATE "api_keys" SET "last_used_at" = now() - $2::interval WHERE "id" = $1`,
      [id, interval],
    );
  }

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, KeysModule],
    }).compile();
    await moduleRef.init();
    keys = moduleRef.get(ApiKeysService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  describe("выпуск", () => {
    it("в строке api_keys нет открытого ключа, key_hash — SHA-256 ключа, prefix — lookupPrefix", async () => {
      const project = await createProject(getDataSource());

      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      const raw: Record<string, unknown>[] = await getDataSource().query(
        'SELECT * FROM "api_keys"',
      );
      expect(raw).toHaveLength(1);
      const row = raw[0] ?? {};
      for (const value of Object.values(row)) {
        expect(String(value)).not.toContain(issued.key);
      }
      expect(JSON.stringify(raw)).not.toContain(issued.key);
      expect(row.key_hash).toEqual(sha256(issued.key));
      expect(row.prefix).toBe(parseKey(issued.key, "serverKey")?.lookupPrefix);
      expect(row.id).toBe(issued.apiKeyId);
      expect(issued.prefix).toBe(row.prefix);
      expect(row.kind).toBe("server");
      expect(row.bot_id).toBeNull();
    });

    it("выданный ключ server проходит verify и возвращает проект", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      await expect(keys.verify(issued.key, "server")).resolves.toEqual({
        apiKeyId: issued.apiKeyId,
        projectId: project.id,
        botId: null,
      });
    });

    it("выданный ключ bot проходит verify и возвращает проект и botId", async () => {
      const project = await createProject(getDataSource());
      const botId = randomUUID();

      const issued = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId,
        actorKind: "system",
      });

      expect(parseKey(issued.key, "botKey")).toBeDefined();
      await expect(keys.verify(issued.key, "bot")).resolves.toEqual({
        apiKeyId: issued.apiKeyId,
        projectId: project.id,
        botId,
      });
      await expect(keys.verify(issued.key, "server")).resolves.toBeUndefined();
    });

    it("два выпущенных ключа проекта проходят оба", async () => {
      const project = await createProject(getDataSource());

      const first = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      const second = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      expect(first.key).not.toBe(second.key);
      await expect(keys.verify(first.key, "server")).resolves.toMatchObject({
        projectId: project.id,
      });
      await expect(keys.verify(second.key, "server")).resolves.toMatchObject({
        projectId: project.id,
      });
      expect((await apiKeyRows()).every((row) => row.revokedAt === null)).toBe(true);
    });

    it("issue для несуществующего проекта падает и не оставляет ни ключа, ни записи журнала", async () => {
      await expect(
        keys.issue({ projectId: randomUUID(), kind: "server", actorKind: "cli" }),
      ).rejects.toThrow();

      expect(await apiKeyRows()).toEqual([]);
      expect(await auditRows()).toEqual([]);
    });
  });

  describe("отзыв и чужой хеш", () => {
    it("после revoke ключ не проходит verify, повторный revoke возвращает false", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      await expect(keys.revoke({ prefix: issued.prefix, actorKind: "cli" })).resolves.toBe(true);

      await expect(keys.verify(issued.key, "server")).resolves.toBeUndefined();
      await expect(keys.revoke({ prefix: issued.prefix, actorKind: "cli" })).resolves.toBe(false);
      const [row] = await apiKeyRows();
      expect(row?.revokedAt).toBeInstanceOf(Date);
    });

    it("revoke неизвестного prefix возвращает false и не пишет журнал", async () => {
      await expect(keys.revoke({ prefix: "sk_000000000000", actorKind: "cli" })).resolves.toBe(
        false,
      );

      expect(await auditRows()).toEqual([]);
    });

    it("отзыв одного ключа не трогает второй ключ проекта", async () => {
      const project = await createProject(getDataSource());
      const first = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      const second = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      await keys.revoke({ prefix: first.prefix, actorKind: "cli" });

      await expect(keys.verify(first.key, "server")).resolves.toBeUndefined();
      await expect(keys.verify(second.key, "server")).resolves.toMatchObject({
        projectId: project.id,
      });
    });

    it("два одновременных revoke: true только у одного и одна запись apiKey.revoked", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      const results = await Promise.all([
        keys.revoke({ prefix: issued.prefix, actorKind: "cli" }),
        keys.revoke({ prefix: issued.prefix, actorKind: "cli" }),
      ]);

      expect([...results].sort()).toEqual([false, true]);
      const revoked = (await auditRows()).filter((row) => row.action === "apiKey.revoked");
      expect(revoked).toHaveLength(1);
    });

    it("ключ с верным prefix, но другим хешем не проходит verify и не трогает last_used_at", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      const forged = forgeKeyWithSameLookupPrefix(issued.key);

      expect(forged).not.toBe(issued.key);
      expect(parseKey(forged, "serverKey")?.lookupPrefix).toBe(issued.prefix);
      await expect(keys.verify(forged, "server")).resolves.toBeUndefined();
      expect(await lastUsedAt(issued.apiKeyId)).toBeNull();
    });
  });

  describe("last_used_at", () => {
    it("verify проставляет last_used_at, вторая verify подряд его не меняет", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      expect(await lastUsedAt(issued.apiKeyId)).toBeNull();

      await keys.verify(issued.key, "server");
      const afterFirst = await lastUsedAt(issued.apiKeyId);
      await keys.verify(issued.key, "server");
      const afterSecond = await lastUsedAt(issued.apiKeyId);

      expect(afterFirst).toBeInstanceOf(Date);
      expect(afterSecond?.getTime()).toBe(afterFirst?.getTime());
    });

    it("одновременные verify проставляют last_used_at и все проходят", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      const results = await Promise.all(
        Array.from({ length: 5 }, () => keys.verify(issued.key, "server")),
      );

      expect(results.every((result) => result?.apiKeyId === issued.apiKeyId)).toBe(true);
      expect(await lastUsedAt(issued.apiKeyId)).toBeInstanceOf(Date);
    });

    it("last_used_at старше минуты обновляется следующей verify", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      await keys.verify(issued.key, "server");
      await shiftLastUsedAt(issued.apiKeyId, "2 minutes");
      const shifted = await lastUsedAt(issued.apiKeyId);
      await moduleRef.get<Cache>(CACHE_MANAGER).clear();

      await keys.verify(issued.key, "server");

      const updated = await lastUsedAt(issued.apiKeyId);
      expect(updated?.getTime()).toBeGreaterThan((shifted?.getTime() ?? 0) + 60_000);
    });

    it("last_used_at моложе минуты не меняется", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      await keys.verify(issued.key, "server");
      await shiftLastUsedAt(issued.apiKeyId, "50 seconds");
      const shifted = await lastUsedAt(issued.apiKeyId);

      await keys.verify(issued.key, "server");

      expect((await lastUsedAt(issued.apiKeyId))?.getTime()).toBe(shifted?.getTime());
    });
  });

  describe("журнал аудита", () => {
    it("issue и revoke пишут по одной записи с target_id ключа и без открытого ключа", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      await keys.revoke({ prefix: issued.prefix, actorKind: "system" });

      const rows = await auditRows();
      expect(rows.map((row) => row.action).sort()).toEqual(["apiKey.issued", "apiKey.revoked"]);
      expect(rows.find((row) => row.action === "apiKey.issued")).toMatchObject({
        projectId: project.id,
        actorKind: "cli",
        targetKind: "apiKey",
        targetId: issued.apiKeyId,
      });
      expect(rows.find((row) => row.action === "apiKey.revoked")).toMatchObject({
        projectId: project.id,
        actorKind: "system",
        targetKind: "apiKey",
        targetId: issued.apiKeyId,
      });
      const raw: unknown[] = await getDataSource().query('SELECT * FROM "audit_log"');
      const serialized = JSON.stringify(raw);
      expect(serialized).not.toContain(issued.key);
      expect(serialized).not.toContain(sha256(issued.key).toString("hex"));
      expect(serialized).not.toContain(sha256(issued.key).toString("base64"));
    });

    it("выпуск ключа bot пишет запись с botId и prefix в data", async () => {
      const project = await createProject(getDataSource());
      const botId = randomUUID();

      const issued = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId,
        actorKind: "cli",
      });

      const rows = await auditRows();
      expect(rows).toHaveLength(1);
      expect(rows[0]?.data).toEqual({ kind: "bot", prefix: issued.prefix, botId });
    });

    it("повторный revoke не пишет вторую запись apiKey.revoked", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      await keys.revoke({ prefix: issued.prefix, actorKind: "cli" });

      await keys.revoke({ prefix: issued.prefix, actorKind: "cli" });

      const revoked = (await auditRows()).filter((row) => row.action === "apiKey.revoked");
      expect(revoked).toHaveLength(1);
    });
  });
});
