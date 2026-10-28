import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { startZoneProbeApp } from "../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../test/support/zone-probe.js";
import { Zone } from "./infra/zones/zone.decorator.js";
import type { ApiZone } from "./infra/zones/zone.js";

@Zone("public")
@Controller("visitor")
class VersionedProbeController {
  @Get("ping")
  ping(): string {
    return "pong";
  }
}

@Zone("public")
@Controller({ path: "visitor", version: "2" })
class SecondVersionProbeController {
  @Get("next")
  next(): string {
    return "next";
  }
}

@Zone("management")
@Controller({ path: "health-probe", version: VERSION_NEUTRAL })
class NeutralProbeController {
  @Get()
  handle(): string {
    return "ok";
  }
}

const probeControllers = [
  VersionedProbeController,
  SecondVersionProbeController,
  NeutralProbeController,
];

function zoneUrl(probe: ZoneProbeApp, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${probe.ports[zone]}${path}`;
}

describe("версионирование API", () => {
  let app: INestApplication | undefined;
  let probe: ZoneProbeApp;

  beforeEach(async () => {
    probe = await startZoneProbeApp(probeControllers);
    app = probe.app;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("контроллер без версии отвечает 200 по /v1/visitor/ping на публичном порту", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/v1/visitor/ping"));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("pong");
  });

  it("контроллер без версии даёт 404 по /visitor/ping без префикса", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/visitor/ping"));

    expect(response.status).toBe(404);
  });

  it("контроллер без версии даёт 404 по /v2/visitor/ping", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/v2/visitor/ping"));

    expect(response.status).toBe(404);
  });

  it("контроллер версии 2 отвечает по /v2 и не отвечает по /v1", async () => {
    const v2 = await fetch(zoneUrl(probe, "public", "/v2/visitor/next"));
    const v1 = await fetch(zoneUrl(probe, "public", "/v1/visitor/next"));

    expect(v2.status).toBe(200);
    expect(await v2.text()).toBe("next");
    expect(v1.status).toBe(404);
  });

  it("v1 продолжает работать рядом с v2", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/v1/visitor/ping"));

    expect(response.status).toBe(200);
  });

  it("VERSION_NEUTRAL контроллер на служебном порту отвечает 200 по /health-probe", async () => {
    const response = await fetch(zoneUrl(probe, "management", "/health-probe"));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("ok");
  });

  it("VERSION_NEUTRAL контроллер на служебном порту даёт 404 по /v1/health-probe", async () => {
    const response = await fetch(zoneUrl(probe, "management", "/v1/health-probe"));

    expect(response.status).toBe(404);
  });
});
