import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { Redis } from "ioredis";
import { inject } from "vitest";
import { useTestRedis } from "./support/test-redis.js";

const queryTimeout = 30_000;
const envTestPort = "6379";

function redisUrl(): URL {
  return new URL(process.env.REDIS_URL ?? "");
}

describe("valkey container for e2e", () => {
  const getRedis = useTestRedis();

  it("points REDIS_URL at the container, not at the port from .env.test", () => {
    const envTest = parseEnv(readFileSync(join(import.meta.dirname, "..", ".env.test"), "utf8"));
    const envTestUrl = envTest.REDIS_URL;
    if (envTestUrl === undefined) {
      throw new Error(".env.test has no REDIS_URL");
    }
    expect(new URL(envTestUrl).port).toBe(envTestPort);

    expect(redisUrl().protocol).toBe("redis:");
    expect(redisUrl().port).not.toBe("");
    expect(redisUrl().port).not.toBe(envTestPort);
  });

  it("uses the address provided by global setup", () => {
    expect(inject("redisUrl")).toBeTruthy();
    expect(process.env.REDIS_URL).toBe(inject("redisUrl"));
  });

  it("passes REDIS_URL to child processes started with a copy of process.env", () => {
    const child = spawnSync(
      process.execPath,
      ["-e", "process.stdout.write(process.env.REDIS_URL ?? '')"],
      { env: { ...process.env }, encoding: "utf8" },
    );
    expect(child.status).toBe(0);
    expect(child.stdout).toBe(process.env.REDIS_URL);
  });

  it(
    "executes SET and GET through ioredis",
    async () => {
      const client = new Redis(process.env.REDIS_URL ?? "");
      try {
        await client.set("valkey-spec:key", "value");
        expect(await client.get("valkey-spec:key")).toBe("value");
        expect(await client.get("valkey-spec:missing")).toBeNull();
      } finally {
        await client.flushall();
        await client.quit();
      }
    },
    queryTimeout,
  );

  it(
    "runs Valkey 9.2",
    async () => {
      const info = await getRedis().info("server");
      expect(info).toContain("valkey_version:9.2");
    },
    queryTimeout,
  );

  describe("useTestRedis cleanup", () => {
    it("writes a key", async () => {
      await getRedis().set("valkey-spec:leftover", "1");
      expect(await getRedis().get("valkey-spec:leftover")).toBe("1");
    });

    it("does not see the key from the previous test", async () => {
      expect(await getRedis().get("valkey-spec:leftover")).toBeNull();
      expect(await getRedis().dbsize()).toBe(0);
    });
  });
});
