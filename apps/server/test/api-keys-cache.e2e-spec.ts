import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import { createHash, randomUUID } from "node:crypto";
import type { MockInstance } from "vitest";
import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { ApiKeysRepository } from "../src/domain/keys/api-keys.repository.js";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import type { IssuedApiKey } from "../src/domain/keys/api-keys.service.js";
import { generateKey, parseKey } from "../src/domain/keys/key-format.js";
import { KeysModule } from "../src/domain/keys/keys.module.js";
import { cacheTtlMs } from "../src/infra/cache/app-cache.module.js";
import { cacheKeys } from "../src/infra/cache/cache-keys.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { forgeKeyWithSameLookupPrefix } from "./support/forged-api-keys.js";
import { useTestDatabase } from "./support/test-database.js";

function sha256Hex(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

describe("кэш проверенных ключей sk_", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let keys: ApiKeysService;
  let cache: Cache;
  let findByPrefix: MockInstance<ApiKeysRepository["findByPrefix"]>;

  async function issueServerKey(): Promise<IssuedApiKey> {
    const project = await createProject(getDataSource());
    return keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
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
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
    findByPrefix = vi.spyOn(moduleRef.get(ApiKeysRepository, { strict: false }), "findByPrefix");
  });

  beforeEach(async () => {
    await cache.clear();
    findByPrefix.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterAll(async () => {
    findByPrefix?.mockRestore();
    await moduleRef?.close();
  });

  describe("попадание", () => {
    it("две verify подряд — одинаковый результат, findByPrefix один раз", async () => {
      const issued = await issueServerKey();

      const first = await keys.verify(issued.key, "server");
      const second = await keys.verify(issued.key, "server");

      expect(first).toMatchObject({ apiKeyId: issued.apiKeyId, botId: null });
      expect(second).toEqual(first);
      expect(findByPrefix).toHaveBeenCalledTimes(1);
      expect(findByPrefix).toHaveBeenCalledWith(issued.prefix);
    });

    it("через 59 секунд запись ещё в кэше, через 61 секунду verify снова идёт в БД", async () => {
      const issued = await issueServerKey();
      vi.useFakeTimers({ toFake: ["Date"] });
      await keys.verify(issued.key, "server");

      vi.setSystemTime(Date.now() + cacheTtlMs - 1_000);
      await keys.verify(issued.key, "server");
      expect(findByPrefix).toHaveBeenCalledTimes(1);

      vi.setSystemTime(Date.now() + 2_000);
      await expect(keys.verify(issued.key, "server")).resolves.toMatchObject({
        apiKeyId: issued.apiKeyId,
      });
      expect(findByPrefix).toHaveBeenCalledTimes(2);
    });
  });

  describe("отзыв", () => {
    it("после revoke следующая verify — undefined и снова вызывает findByPrefix", async () => {
      const issued = await issueServerKey();
      await expect(keys.verify(issued.key, "server")).resolves.toBeDefined();

      await keys.revoke({ prefix: issued.prefix, actorKind: "cli" });
      findByPrefix.mockClear();

      await expect(keys.verify(issued.key, "server")).resolves.toBeUndefined();
      expect(findByPrefix).toHaveBeenCalledTimes(1);
      expect(findByPrefix).toHaveBeenCalledWith(issued.prefix);
    });

    it("отозванный ключ не кэшируется: каждая verify идёт в БД", async () => {
      const issued = await issueServerKey();
      await keys.revoke({ prefix: issued.prefix, actorKind: "cli" });
      findByPrefix.mockClear();

      await expect(keys.verify(issued.key, "server")).resolves.toBeUndefined();
      await expect(keys.verify(issued.key, "server")).resolves.toBeUndefined();

      expect(findByPrefix).toHaveBeenCalledTimes(2);
      expect(await cache.get(cacheKeys.apiKey(issued.prefix))).toBeUndefined();
    });

    it("отзыв одного ключа не сбрасывает запись второго ключа", async () => {
      const first = await issueServerKey();
      const second = await issueServerKey();
      await keys.verify(first.key, "server");
      await keys.verify(second.key, "server");

      await keys.revoke({ prefix: first.prefix, actorKind: "cli" });

      expect(await cache.get(cacheKeys.apiKey(first.prefix))).toBeUndefined();
      expect(await cache.get(cacheKeys.apiKey(second.prefix))).toBeDefined();
    });
  });

  describe("неудачные проверки", () => {
    it("ключ, которого нет в БД, при каждой verify снова вызывает findByPrefix", async () => {
      const key = generateKey("serverKey");
      const prefix = parseKey(key, "serverKey")?.lookupPrefix ?? "";

      await expect(keys.verify(key, "server")).resolves.toBeUndefined();
      await expect(keys.verify(key, "server")).resolves.toBeUndefined();
      await expect(keys.verify(key, "server")).resolves.toBeUndefined();

      expect(findByPrefix).toHaveBeenCalledTimes(3);
      expect(await cache.get(cacheKeys.apiKey(prefix))).toBeUndefined();
    });

    it("подделка с тем же lookupPrefix до проверки настоящего ключа каждый раз идёт в БД", async () => {
      const issued = await issueServerKey();
      const forged = forgeKeyWithSameLookupPrefix(issued.key);
      expect(parseKey(forged, "serverKey")?.lookupPrefix).toBe(issued.prefix);

      await expect(keys.verify(forged, "server")).resolves.toBeUndefined();
      await expect(keys.verify(forged, "server")).resolves.toBeUndefined();

      expect(findByPrefix).toHaveBeenCalledTimes(2);
      expect(await cache.get(cacheKeys.apiKey(issued.prefix))).toBeUndefined();
      await expect(keys.verify(issued.key, "server")).resolves.toMatchObject({
        apiKeyId: issued.apiKeyId,
      });
    });

    it("подделка при настоящем ключе в кэше — undefined без findByPrefix, настоящий проходит", async () => {
      const issued = await issueServerKey();
      const forged = forgeKeyWithSameLookupPrefix(issued.key);
      await keys.verify(issued.key, "server");
      findByPrefix.mockClear();

      await expect(keys.verify(forged, "server")).resolves.toBeUndefined();
      await expect(keys.verify(issued.key, "server")).resolves.toMatchObject({
        apiKeyId: issued.apiKeyId,
      });

      expect(findByPrefix).not.toHaveBeenCalled();
    });
  });

  describe("значение в кэше", () => {
    it("лежит под cacheKeys.apiKey(prefix), содержит keyHash в hex и не содержит открытого ключа", async () => {
      const issued = await issueServerKey();
      const verified = await keys.verify(issued.key, "server");

      const cached = await cache.get(cacheKeys.apiKey(issued.prefix));

      expect(cached).toEqual({ ...verified, kind: "server", keyHash: sha256Hex(issued.key) });
      const serialized = JSON.stringify(cached);
      expect(serialized).toContain(sha256Hex(issued.key));
      expect(serialized).not.toContain(issued.key);
      expect(serialized).not.toContain(issued.key.slice(issued.prefix.length));
      expect(await cache.get(cacheKeys.apiKey(issued.key))).toBeUndefined();
    });

    it("ключ bot с записью server в кэше — undefined без findByPrefix", async () => {
      const project = await createProject(getDataSource());
      const bot = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId: randomUUID(),
        actorKind: "cli",
      });
      await cache.set(cacheKeys.apiKey(bot.prefix), {
        apiKeyId: bot.apiKeyId,
        projectId: project.id,
        botId: null,
        kind: "server",
        keyHash: sha256Hex(bot.key),
      });

      await expect(keys.verify(bot.key, "bot")).resolves.toBeUndefined();

      expect(findByPrefix).not.toHaveBeenCalled();
    });
  });

  describe("last_used_at", () => {
    it("при попадании в кэш last_used_at не меняется, после промаха обновляется", async () => {
      const issued = await issueServerKey();
      await keys.verify(issued.key, "server");
      await shiftLastUsedAt(issued.apiKeyId, "2 minutes");
      const shifted = await lastUsedAt(issued.apiKeyId);

      await keys.verify(issued.key, "server");
      expect((await lastUsedAt(issued.apiKeyId))?.getTime()).toBe(shifted?.getTime());

      await cache.clear();
      await keys.verify(issued.key, "server");
      const updated = await lastUsedAt(issued.apiKeyId);
      expect(updated?.getTime()).toBeGreaterThan((shifted?.getTime() ?? 0) + 60_000);
    });

    it("неудачная verify подделки не трогает last_used_at", async () => {
      const issued = await issueServerKey();
      await keys.verify(issued.key, "server");
      await shiftLastUsedAt(issued.apiKeyId, "2 minutes");
      const shifted = await lastUsedAt(issued.apiKeyId);
      await cache.clear();

      await keys.verify(forgeKeyWithSameLookupPrefix(issued.key), "server");

      expect((await lastUsedAt(issued.apiKeyId))?.getTime()).toBe(shifted?.getTime());
    });
  });
});
