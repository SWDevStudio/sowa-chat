import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { spawnServer } from "./support/e2e-server.js";
import {
  cacheInvalidateSubscribers,
  cacheOf,
  publishCacheInvalidate,
  publishRawCacheInvalidate,
  workerEnvironment,
} from "./support/replica-events-probe.js";
import { useTestRedis } from "./support/test-redis.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const commandTimeout = 600_000;
const deliveryTimeout = 2000;
const subscribeTimeout = 10_000;
const workerStartupTimeout = 30_000;

describe("события реплик cache.invalidate", { timeout: commandTimeout }, () => {
  const getRedis = useTestRedis();
  let apps: ZoneProbeApp[] = [];

  beforeAll(async () => {
    const before = await cacheInvalidateSubscribers(getRedis());
    apps = [await startZoneE2eApp(), await startZoneE2eApp()];
    await vi.waitFor(
      async () => expect(await cacheInvalidateSubscribers(getRedis())).toBe(before + 2),
      { timeout: subscribeTimeout },
    );
  });

  afterAll(async () => {
    await Promise.all(apps.map((probe) => probe.app.close()));
    vi.unstubAllEnvs();
  });

  async function seed(...keys: string[]): Promise<void> {
    for (const { app } of apps) {
      for (const key of keys) {
        await cacheOf(app).set(key, `${key}-value`);
      }
    }
  }

  async function waitUntilDeleted(key: string): Promise<void> {
    for (const { app } of apps) {
      await vi.waitFor(async () => expect(await cacheOf(app).get(key)).toBeUndefined(), {
        timeout: deliveryTimeout,
      });
    }
  }

  async function expectKept(key: string): Promise<void> {
    for (const { app } of apps) {
      expect(await cacheOf(app).get(key)).toBe(`${key}-value`);
    }
  }

  it("событие с keys: [a] удаляет a в обоих экземплярах, b остаётся", async () => {
    await seed("a", "b");

    await publishCacheInvalidate(getRedis(), { keys: ["a"] });

    await waitUntilDeleted("a");
    await expectKept("b");
  });

  it("событие с несколькими ключами удаляет их все и неизвестные ключи не мешают", async () => {
    await seed("a", "b", "c");

    await publishCacheInvalidate(getRedis(), { keys: ["a", "missing", "c"] });

    await waitUntilDeleted("a");
    await waitUntilDeleted("c");
    await expectKept("b");
  });

  it("событие со 100 ключами обрабатывается", async () => {
    const keys = Array.from({ length: 100 }, (_, index) => `bulk-${index}`);
    await seed(...keys, "keep");

    await publishCacheInvalidate(getRedis(), { keys });

    await waitUntilDeleted("bulk-0");
    await waitUntilDeleted("bulk-99");
    await expectKept("keep");
  });

  it("неверные данные ничего не удаляют, следующее верное событие обрабатывается", async () => {
    await seed("a", "b");
    const tooMany = Array.from({ length: 101 }, (_, index) => (index === 0 ? "b" : `k-${index}`));
    const malformedData = [
      { keys: "b" },
      { keys: [] },
      { keys: ["b", ""] },
      { keys: ["b", 1] },
      { keys: tooMany },
      { keys: ["b".repeat(257)] },
      {},
      "b",
      null,
      ["b"],
      42,
    ];
    for (const data of malformedData) {
      await publishCacheInvalidate(getRedis(), data);
    }
    await publishRawCacheInvalidate(getRedis(), "not a json");
    await publishRawCacheInvalidate(getRedis(), '["b"]');
    await publishRawCacheInvalidate(getRedis(), "{}");

    await publishCacheInvalidate(getRedis(), { keys: ["a"] });

    await waitUntilDeleted("a");
    await expectKept("b");
  });

  it("экземпляры остаются рабочими после неверных событий", async () => {
    await publishCacheInvalidate(getRedis(), { keys: "a" });
    await publishCacheInvalidate(getRedis(), { keys: ["z"] });
    await seed("a");

    await publishCacheInvalidate(getRedis(), { keys: ["a"] });

    await waitUntilDeleted("a");
    expect(await cacheInvalidateSubscribers(getRedis())).toBeGreaterThanOrEqual(2);
  });
});

describe("worker и события реплик", { timeout: commandTimeout }, () => {
  const getRedis = useTestRedis();

  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  it("запущенный worker добавляет ровно одного подписчика cache.invalidate", async () => {
    const before = await cacheInvalidateSubscribers(getRedis());
    const server = spawnServer("worker", await workerEnvironment());
    try {
      await vi.waitFor(
        async () => {
          expect(server.isStopped(), server.output()).toBe(false);
          expect(await cacheInvalidateSubscribers(getRedis())).toBe(before + 1);
        },
        { timeout: workerStartupTimeout },
      );
    } finally {
      await server.stop();
    }
  });

  it("worker переживает неверное событие и предупреждает без его содержимого", async () => {
    const marker = "secret-marker-5d2e";
    const before = await cacheInvalidateSubscribers(getRedis());
    const server = spawnServer("worker", await workerEnvironment());
    try {
      await vi.waitFor(
        async () => expect(await cacheInvalidateSubscribers(getRedis())).toBe(before + 1),
        { timeout: workerStartupTimeout },
      );

      await publishCacheInvalidate(getRedis(), { keys: marker, token: marker });
      await publishCacheInvalidate(getRedis(), { keys: ["a"] });

      await vi.waitFor(
        () => expect(server.output()).toContain("Ignored malformed cache.invalidate event"),
        { timeout: deliveryTimeout * 2 },
      );
      await delay(500);
      expect(server.isStopped(), server.output()).toBe(false);
      expect(server.output()).not.toContain(marker);
    } finally {
      await server.stop();
    }
  });
});
