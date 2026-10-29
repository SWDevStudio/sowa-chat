import { Get } from "@nestjs/common";
import request from "supertest";
import { ServerController } from "../src/api/server/server-controller.decorator.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsService } from "../src/domain/projects/projects.service.js";
import { cacheKeys } from "../src/infra/cache/cache-keys.js";
import { findFreePort } from "./support/e2e-server.js";
import { keyRowByPrefix, revokeKey, setupMainProject } from "./support/key-cli.js";
import type { OriginGroup } from "./support/origin-cli.js";
import { originGroups, originsOf, runOriginCommand } from "./support/origin-cli.js";
import { outputOf } from "./support/project-cli.js";
import { recordCacheInvalidate } from "./support/replica-cli-probe.js";
import { cacheInvalidateSubscribers, cacheOf } from "./support/replica-events-probe.js";
import { useTestDatabase } from "./support/test-database.js";
import { useTestRedis } from "./support/test-redis.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const probePath = "/v1/server/replica-probe";
const commandTimeout = 120_000;
const deliveryTimeout = 2000;
const subscribeTimeout = 10_000;
const newOrigin = "https://shop.example.com";

@ServerController("replica-probe")
class ReplicaProbeController {
  @Get()
  probe() {
    return { ok: true };
  }
}

function redisUrl(): string {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL is not set");
  }
  return url;
}

describe("сброс кэша на всех репликах из CLI", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getRedis = useTestRedis();
  let apps: ZoneProbeApp[] = [];

  beforeAll(async () => {
    const before = await cacheInvalidateSubscribers(getRedis());
    apps = [
      await startZoneE2eApp([ReplicaProbeController], [ProjectsModule]),
      await startZoneE2eApp([ReplicaProbeController], [ProjectsModule]),
    ];
    await vi.waitFor(
      async () => expect(await cacheInvalidateSubscribers(getRedis())).toBe(before + 2),
      { timeout: subscribeTimeout },
    );
  }, commandTimeout);

  afterAll(async () => {
    await Promise.all(apps.map((probe) => probe.app.close()));
    vi.unstubAllEnvs();
  });

  function probeWithKey(probe: ZoneProbeApp, key: string) {
    return request(`http://127.0.0.1:${probe.ports.internal}`)
      .get(probePath)
      .set("Authorization", `Bearer ${key}`);
  }

  async function expectStatusOnAll(key: string, status: number): Promise<void> {
    for (const probe of apps) {
      expect((await probeWithKey(probe, key)).status).toBe(status);
    }
  }

  async function expectCachedOnAll(key: string): Promise<void> {
    for (const { app } of apps) {
      expect(await cacheOf(app).get(key)).toBeDefined();
    }
  }

  function snapshotOn(probe: ZoneProbeApp, projectId: string) {
    return probe.app.get(ProjectsService).findSnapshotById(projectId);
  }

  describe("key:revoke", () => {
    it("оба экземпляра отвечают 401 тем же ключом в течение 2 секунд", async () => {
      const { firstKey, firstPrefix } = await setupMainProject();
      await expectStatusOnAll(firstKey, 200);
      await expectCachedOnAll(cacheKeys.apiKey(firstPrefix));

      const result = await revokeKey(firstPrefix);

      expect(result.exitCode, outputOf(result)).toBe(0);
      for (const probe of apps) {
        await vi.waitFor(
          async () => expect((await probeWithKey(probe, firstKey)).status).toBe(401),
          {
            timeout: deliveryTimeout,
          },
        );
      }
    });

    it("событие уходит после коммита: при получении revoked_at уже заполнен", async () => {
      const { firstKey, firstPrefix } = await setupMainProject();
      await expectStatusOnAll(firstKey, 200);
      const recorder = await recordCacheInvalidate(redisUrl(), async () => {
        const row = await keyRowByPrefix(getDataSource(), firstPrefix);
        return row.revokedAt;
      });
      try {
        const result = await revokeKey(firstPrefix);

        expect(result.exitCode, outputOf(result)).toBe(0);
        await vi.waitFor(() => expect(recorder.received).toHaveLength(1), {
          timeout: deliveryTimeout,
        });
        const [received] = recorder.received;
        expect(received?.message).toEqual({
          pattern: "cache.invalidate",
          data: { keys: [cacheKeys.apiKey(firstPrefix)] },
        });
        expect(received?.observed).toBeInstanceOf(Date);
        expect(JSON.stringify(received?.message)).not.toContain(firstKey);
      } finally {
        await recorder.close();
      }
    });

    it("без доставки события экземпляры держат запись: сброс идёт через Redis", async () => {
      const { firstKey, firstPrefix } = await setupMainProject();
      await expectStatusOnAll(firstKey, 200);
      const workingRedisUrl = redisUrl();
      vi.stubEnv("REDIS_URL", `redis://127.0.0.1:${await findFreePort()}`);
      try {
        const result = await revokeKey(firstPrefix);

        expect(result.exitCode, outputOf(result)).toBe(0);
      } finally {
        vi.stubEnv("REDIS_URL", workingRedisUrl);
      }
      await expectStatusOnAll(firstKey, 200);
    });
  });

  describe.each(originGroups)("$prefix:add", (group: OriginGroup) => {
    it("оба экземпляра возвращают новый список доменов в течение 2 секунд", async () => {
      const { projectId } = await setupMainProject();
      for (const probe of apps) {
        expect((await snapshotOn(probe, projectId))?.[group.list]).toEqual([]);
      }
      await expectCachedOnAll(cacheKeys.project(projectId));

      const result = await runOriginCommand(group, "add", { project: "main", origin: newOrigin });

      expect(result.exitCode, outputOf(result)).toBe(0);
      for (const probe of apps) {
        await vi.waitFor(
          async () =>
            expect((await snapshotOn(probe, projectId))?.[group.list]).toEqual([newOrigin]),
          { timeout: deliveryTimeout },
        );
        expect((await snapshotOn(probe, projectId))?.[group.other]).toEqual([]);
      }
    });

    it("событие уходит после коммита: при получении домен уже в БД", async () => {
      const { projectId } = await setupMainProject();
      const recorder = await recordCacheInvalidate(redisUrl(), async () => {
        const origins = await originsOf(getDataSource(), "main");
        return origins[group.list];
      });
      try {
        const result = await runOriginCommand(group, "add", { project: "main", origin: newOrigin });

        expect(result.exitCode, outputOf(result)).toBe(0);
        await vi.waitFor(() => expect(recorder.received).toHaveLength(1), {
          timeout: deliveryTimeout,
        });
        expect(recorder.received[0]).toEqual({
          message: { pattern: "cache.invalidate", data: { keys: [cacheKeys.project(projectId)] } },
          observed: [newOrigin],
        });
      } finally {
        await recorder.close();
      }
    });
  });
});
