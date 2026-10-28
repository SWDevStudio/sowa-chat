import type { INestApplication } from "@nestjs/common";
import { startRedisStubProbeApp } from "../../../test/support/redis-stub-probe.js";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ApiZone, ZonePorts } from "../zones/zone.js";

interface HealthEntry {
  status: string;
  message?: string;
}

interface HealthBody {
  status: string;
  info?: Record<string, HealthEntry>;
  error?: Record<string, HealthEntry>;
  details?: Record<string, HealthEntry>;
}

function zoneUrl(ports: ZonePorts, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${ports[zone]}${path}`;
}

describe("HealthController", () => {
  let app: INestApplication | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("при недоступном PostgreSQL и работающем Redis /health/ready отвечает 503 с postgres в error и redis в info", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, "management", "/health/ready"));
    const body = (await response.json()) as HealthBody;

    expect(response.status).toBe(503);
    expect(body.status).toBe("error");
    expect(body.error?.postgres?.status).toBe("down");
    expect(body.info?.redis?.status).toBe("up");
    expect(body.info?.replica?.status).toBe("up");
    expect(body.error?.redis).toBeUndefined();
  });

  it("при недоступных PostgreSQL и Redis /health/live отвечает 200", async () => {
    const probe = await startZoneProbeApp([]);
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, "management", "/health/live"));
    const body = (await response.json()) as HealthBody;

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
  });

  it("при недоступном PostgreSQL и работающем Redis /health/live отвечает 200", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, "management", "/health/live"));

    expect(response.status).toBe(200);
  });

  it("при оборванном Redis /health/ready отвечает 503 и redis в error с причиной Redis connection is end", async () => {
    const probe = await startZoneProbeApp([]);
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, "management", "/health/ready"));
    const body = (await response.json()) as HealthBody;

    expect(response.status).toBe(503);
    expect(body.error?.redis).toMatchObject({ status: "down", message: "Redis connection is end" });
    expect(body.error?.postgres?.status).toBe("down");
  });

  it("до markNotReady реплика в info, после — /health/ready отвечает 503 и replica в error", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;
    const { ReplicaReadiness } = await import("./replica-readiness.js");
    const url = zoneUrl(probe.ports, "management", "/health/ready");

    const before = (await (await fetch(url)).json()) as HealthBody;
    expect(before.info?.replica?.status).toBe("up");
    expect(before.error?.replica).toBeUndefined();

    probe.app.get(ReplicaReadiness).markNotReady();
    const response = await fetch(url);
    const after = (await response.json()) as HealthBody;

    expect(response.status).toBe(503);
    expect(after.error?.replica).toEqual({ status: "down", message: "replica is not ready" });
    expect(after.info?.redis?.status).toBe("up");
  });

  it("после markNotReady /health/live по-прежнему отвечает 200", async () => {
    const probe = await startRedisStubProbeApp();
    app = probe.app;
    const { ReplicaReadiness } = await import("./replica-readiness.js");

    probe.app.get(ReplicaReadiness).markNotReady();
    const response = await fetch(zoneUrl(probe.ports, "management", "/health/live"));

    expect(response.status).toBe(200);
  });

  it("при зависшем PING Redis /health/ready отвечает 503 с таймаутом 1000 мс", async () => {
    const probe = await startRedisStubProbeApp({
      status: "ready",
      ping: () => new Promise<string>(() => undefined),
      quit: () => Promise.resolve("OK"),
      disconnect: () => undefined,
    });
    app = probe.app;
    const startedAt = Date.now();

    const response = await fetch(zoneUrl(probe.ports, "management", "/health/ready"));
    const body = (await response.json()) as HealthBody;

    expect(response.status).toBe(503);
    expect(body.error?.redis).toMatchObject({
      status: "down",
      message: "timeout of 1000ms exceeded",
    });
    expect(Date.now() - startedAt).toBeLessThan(5000);
  });

  it.each(["/health/live", "/health/ready", "/status"])(
    "%s на публичном порту отвечает 404",
    async (path) => {
      const probe = await startZoneProbeApp([]);
      app = probe.app;

      const response = await fetch(zoneUrl(probe.ports, "public", path));

      expect(response.status).toBe(404);
    },
  );

  it.each(["operator", "internal"] as const)(
    "/health/live и /status на порту зоны %s отвечают 404",
    async (zone) => {
      const probe = await startZoneProbeApp([]);
      app = probe.app;

      const live = await fetch(zoneUrl(probe.ports, zone, "/health/live"));
      const status = await fetch(zoneUrl(probe.ports, zone, "/status"));

      expect(live.status).toBe(404);
      expect(status.status).toBe(404);
    },
  );

  it.each(["/v1/status", "/v1/health/live", "/v1/health/ready"])(
    "%s на служебном порту отвечает 404",
    async (path) => {
      const probe = await startZoneProbeApp([]);
      app = probe.app;

      const response = await fetch(zoneUrl(probe.ports, "management", path));

      expect(response.status).toBe(404);
    },
  );
});
