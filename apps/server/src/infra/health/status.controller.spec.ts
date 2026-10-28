import type { INestApplication } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { startRedisStubProbeApp } from "../../../test/support/redis-stub-probe.js";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZonePorts } from "../zones/zone.js";

interface DependencyStatusBody {
  status: string;
  reason?: string;
}

interface StatusBody {
  version: string;
  mode: string;
  uptimeSeconds: number;
  postgres: DependencyStatusBody;
  redis: DependencyStatusBody;
}

const databasePassword = "unit-status-db-password-4e8b";
const redisPassword = "unit-status-redis-password-a71c";
const databaseUrl = `postgres://sowa:${databasePassword}@127.0.0.1:5432/sowa`;
const redisUrl = `redis://:${redisPassword}@127.0.0.1:6380`;

function serverVersion(): string {
  const packageJson = readFileSync(new URL("../../../package.json", import.meta.url), "utf8");
  return (JSON.parse(packageJson) as { version: string }).version;
}

function statusUrl(ports: ZonePorts): string {
  return `http://127.0.0.1:${ports.management}/status`;
}

describe("StatusController", () => {
  let app: INestApplication | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("при недоступном PostgreSQL и работающем Redis отвечает 200, postgres down с причиной, redis up", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;

    const response = await fetch(statusUrl(probe.ports));
    const body = (await response.json()) as StatusBody;

    expect(response.status).toBe(200);
    expect(body.postgres.status).toBe("down");
    expect(typeof body.postgres.reason).toBe("string");
    expect(body.postgres.reason?.length).toBeGreaterThan(0);
    expect(body.redis).toEqual({ status: "up" });
  });

  it("отдаёт версию из package.json, режим api и целый аптайм не меньше 0", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;

    const body = (await (await fetch(statusUrl(probe.ports))).json()) as StatusBody;

    expect(body.version).toBe(serverVersion());
    expect(body.mode).toBe("api");
    expect(Number.isInteger(body.uptimeSeconds)).toBe(true);
    expect(body.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it("отдаёт только поля version, mode, uptimeSeconds, postgres и redis", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;

    const body = (await (await fetch(statusUrl(probe.ports))).json()) as StatusBody;

    expect(Object.keys(body).sort()).toEqual(
      ["mode", "postgres", "redis", "uptimeSeconds", "version"].sort(),
    );
  });

  it("при оборванном Redis отвечает 200 и redis.reason = Redis connection is end", async () => {
    const probe = await startZoneProbeApp([]);
    app = probe.app;

    const response = await fetch(statusUrl(probe.ports));
    const body = (await response.json()) as StatusBody;

    expect(response.status).toBe(200);
    expect(body.redis).toEqual({ status: "down", reason: "Redis connection is end" });
    expect(body.postgres.status).toBe("down");
  });

  it("при переподключающемся Redis не шлёт PING и отдаёт Redis connection is reconnecting", async () => {
    const ping = vi.fn(() => Promise.resolve("PONG"));
    const probe = await startRedisStubProbeApp({
      status: "reconnecting",
      ping,
      quit: () => Promise.resolve("OK"),
      disconnect: () => undefined,
    });
    app = probe.app;

    const body = (await (await fetch(statusUrl(probe.ports))).json()) as StatusBody;

    expect(body.redis).toEqual({ status: "down", reason: "Redis connection is reconnecting" });
    expect(ping).not.toHaveBeenCalled();
  });

  it("при зависшем PING Redis отвечает 200 с причиной timeout of 1000ms exceeded", async () => {
    const probe = await startRedisStubProbeApp({
      status: "ready",
      ping: () => new Promise<string>(() => undefined),
      quit: () => Promise.resolve("OK"),
      disconnect: () => undefined,
    });
    app = probe.app;
    const startedAt = Date.now();

    const response = await fetch(statusUrl(probe.ports));
    const body = (await response.json()) as StatusBody;

    expect(response.status).toBe(200);
    expect(body.redis).toEqual({ status: "down", reason: "timeout of 1000ms exceeded" });
    expect(Date.now() - startedAt).toBeLessThan(5000);
  });

  it("не отдаёт DATABASE_URL, REDIS_URL и их пароли", async () => {
    const probe = await startZoneProbeApp([], { DATABASE_URL: databaseUrl, REDIS_URL: redisUrl });
    app = probe.app;

    const text = await (await fetch(statusUrl(probe.ports))).text();

    expect(text).not.toContain(databaseUrl);
    expect(text).not.toContain(redisUrl);
    expect(text).not.toContain(databasePassword);
    expect(text).not.toContain(redisPassword);
  });
});
