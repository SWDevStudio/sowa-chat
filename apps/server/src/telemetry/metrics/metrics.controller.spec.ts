import type { INestApplication } from "@nestjs/common";
import { Counter, Registry } from "prom-client";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ApiZone } from "../../infra/zones/zone.js";

function zoneUrl(probe: ZoneProbeApp, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${probe.ports[zone]}${path}`;
}

describe("MetricsController", () => {
  let app: INestApplication | undefined;
  let probe: ZoneProbeApp;

  beforeEach(async () => {
    probe = await startZoneProbeApp([]);
    app = probe.app;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("GET /metrics на служебном порту отдаёт 200, формат Prometheus и дефолтные метрики", async () => {
    const response = await fetch(zoneUrl(probe, "management", "/metrics"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/^text\/plain;/);
    expect(response.headers.get("content-type")).toContain("version=0.0.4");
    expect(await response.text()).toContain("process_cpu_user_seconds_total");
  });

  it("GET /metrics на публичном порту даёт 404", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/metrics"));

    expect(response.status).toBe(404);
  });

  it("GET /v1/metrics на служебном порту даёт 404", async () => {
    const response = await fetch(zoneUrl(probe, "management", "/v1/metrics"));

    expect(response.status).toBe(404);
  });

  it("метрика, зарегистрированная в app.get(Registry), видна в /metrics", async () => {
    const registry = probe.app.get(Registry);
    new Counter({ name: "probe_total", help: "probe", registers: [registry] }).inc();

    const response = await fetch(zoneUrl(probe, "management", "/metrics"));

    expect(await response.text()).toContain("probe_total 1");
  });
});
