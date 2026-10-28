import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";
import { apiZones } from "../zones/zone.js";
import type { ApiZone } from "../zones/zone.js";

@Zone("public")
@Controller("visitor")
class VisitorProbeController {
  @Get("ping")
  ping(): string {
    return "pong";
  }
}

@Zone("public")
@Controller({ path: "headers-probe/public", version: VERSION_NEUTRAL })
class PublicProbeController {
  @Get()
  handle(): string {
    return "public";
  }
}

@Zone("operator")
@Controller({ path: "headers-probe/operator", version: VERSION_NEUTRAL })
class OperatorProbeController {
  @Get()
  handle(): string {
    return "operator";
  }
}

@Zone("internal")
@Controller({ path: "headers-probe/internal", version: VERSION_NEUTRAL })
class InternalProbeController {
  @Get()
  handle(): string {
    return "internal";
  }
}

@Zone("management")
@Controller({ path: "headers-probe/management", version: VERSION_NEUTRAL })
class ManagementProbeController {
  @Get()
  handle(): string {
    return "management";
  }
}

const probeControllers = [
  VisitorProbeController,
  PublicProbeController,
  OperatorProbeController,
  InternalProbeController,
  ManagementProbeController,
];

function zoneUrl(probe: ZoneProbeApp, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${probe.ports[zone]}${path}`;
}

describe("заголовки безопасности", { timeout: 20_000 }, () => {
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

  it.each(apiZones)("порт зоны %s отдаёт HSTS с max-age=", async (zone) => {
    const response = await fetch(zoneUrl(probe, zone, `/headers-probe/${zone}`));

    expect(response.status).toBe(200);
    expect(response.headers.get("strict-transport-security")).toMatch(/max-age=\d+/);
  });

  it.each(apiZones)("порт зоны %s отдаёт X-Content-Type-Options: nosniff", async (zone) => {
    const response = await fetch(zoneUrl(probe, zone, `/headers-probe/${zone}`));

    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it.each(apiZones)("порт зоны %s отдаёт CSP с default-src 'self'", async (zone) => {
    const response = await fetch(zoneUrl(probe, zone, `/headers-probe/${zone}`));

    expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
  });

  it.each(apiZones)("порт зоны %s не отдаёт X-Powered-By", async (zone) => {
    const response = await fetch(zoneUrl(probe, zone, `/headers-probe/${zone}`));

    expect(response.headers.has("x-powered-by")).toBe(false);
  });

  it("ответ 200 на /v1/visitor/ping содержит Cache-Control: no-store", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/v1/visitor/ping"));

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it.each(apiZones)("ответ 200 на порту зоны %s содержит Cache-Control: no-store", async (zone) => {
    const response = await fetch(zoneUrl(probe, zone, `/headers-probe/${zone}`));

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it.each(apiZones)(
    "ответ 404 на неизвестный маршрут порта зоны %s содержит Cache-Control: no-store",
    async (zone) => {
      const response = await fetch(zoneUrl(probe, zone, "/no-such-path"));

      expect(response.status).toBe(404);
      expect(response.headers.get("cache-control")).toBe("no-store");
    },
  );

  it.each(apiZones)(
    "ответ 404 на порту зоны %s содержит заголовки helmet и не содержит X-Powered-By",
    async (zone) => {
      const response = await fetch(zoneUrl(probe, zone, "/no-such-path"));

      expect(response.status).toBe(404);
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      expect(response.headers.get("strict-transport-security")).toMatch(/max-age=\d+/);
      expect(response.headers.has("x-powered-by")).toBe(false);
    },
  );
});
