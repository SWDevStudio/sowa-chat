import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import { createConnection, createServer } from "node:net";
import type { AddressInfo, Server } from "node:net";
import { findFreePort } from "../../../test/support/e2e-server.js";
import { withOfflineDatabase } from "../../../test/support/offline-database.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "./zone.decorator.js";
import { apiZones } from "./zone.js";
import type { ApiZone, ZonePorts } from "./zone.js";

@Zone("public")
@Controller({ path: "zone-probe/public", version: VERSION_NEUTRAL })
class PublicProbeController {
  @Get()
  handle(): string {
    return "public";
  }
}

@Zone("operator")
@Controller({ path: "zone-probe/operator", version: VERSION_NEUTRAL })
class OperatorProbeController {
  @Get()
  handle(): string {
    return "operator";
  }
}

@Zone("internal")
@Controller({ path: "zone-probe/internal", version: VERSION_NEUTRAL })
class InternalProbeController {
  @Get()
  handle(): string {
    return "internal";
  }
}

@Zone("management")
@Controller({ path: "zone-probe/management", version: VERSION_NEUTRAL })
class ManagementProbeController {
  @Get()
  handle(): string {
    return "management";
  }
}

const probeControllers = [
  PublicProbeController,
  OperatorProbeController,
  InternalProbeController,
  ManagementProbeController,
];

function zoneUrl(ports: ZonePorts, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${ports[zone]}${path}`;
}

function connectionErrorCode(port: number): Promise<string | undefined> {
  return new Promise((resolveCode) => {
    const socket = createConnection({ port, host: "127.0.0.1" });
    socket.once("connect", () => {
      socket.destroy();
      resolveCode(undefined);
    });
    socket.once("error", (error: NodeJS.ErrnoException) => resolveCode(error.code));
  });
}

function occupyPort(port: number): Promise<Server> {
  return new Promise((resolveServer, reject) => {
    const blocker = createServer();
    blocker.once("error", reject);
    blocker.listen(port, () => resolveServer(blocker));
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolveClose) => {
    server.close(() => resolveClose());
  });
}

async function findZonePorts(): Promise<ZonePorts> {
  return {
    public: await findFreePort(),
    operator: await findFreePort(),
    internal: await findFreePort(),
    management: await findFreePort(),
  };
}

describe("ZoneServers", () => {
  let app: INestApplication | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it.each(apiZones)("зона %s отвечает 200 на своём порту", async (zone) => {
    const probe = await startZoneProbeApp(probeControllers);
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, zone, `/zone-probe/${zone}`));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(zone);
  });

  it.each(apiZones)("неизвестный путь на порту зоны %s даёт 404", async (zone) => {
    const probe = await startZoneProbeApp(probeControllers);
    app = probe.app;

    const response = await fetch(zoneUrl(probe.ports, zone, "/no-such-path"));

    expect(response.status).toBe(404);
  });

  it("getServer возвращает сервер с портом своей зоны", async () => {
    const probe = await startZoneProbeApp(probeControllers);
    app = probe.app;
    const { ZoneServers } = await import("./zone-servers.js");
    const zoneServers = probe.app.get(ZoneServers);

    for (const zone of apiZones) {
      const server = zoneServers.getServer(zone);

      expect(server?.listening, zone).toBe(true);
      const address = server?.address() as AddressInfo | undefined;
      expect(address?.port, zone).toBe(probe.ports[zone]);
    }
  });

  it("после app.close подключение к каждому порту отклоняется с ECONNREFUSED", async () => {
    const probe = await startZoneProbeApp(probeControllers);
    const { ZoneServers } = await import("./zone-servers.js");
    const zoneServers = probe.app.get(ZoneServers);
    for (const zone of apiZones) {
      expect(await connectionErrorCode(probe.ports[zone]), zone).toBeUndefined();
    }

    await probe.app.close();

    for (const zone of apiZones) {
      expect(await connectionErrorCode(probe.ports[zone]), zone).toBe("ECONNREFUSED");
      expect(zoneServers.getServer(zone), zone).toBeUndefined();
    }
  });

  it("listen отклоняется с EADDRINUSE, если порт зоны занят", async () => {
    const ports = await findZonePorts();
    stubTestEnv({
      SOWA_PUBLIC_PORT: String(ports.public),
      SOWA_OPERATOR_PORT: String(ports.operator),
      SOWA_INTERNAL_PORT: String(ports.internal),
      SOWA_MANAGEMENT_PORT: String(ports.management),
    });
    const blocker = await occupyPort(ports.internal);
    vi.resetModules();
    const { ApiModule } = await import("../../api.module.js");
    const { configureApiApp } = await import("../../api-app.js");
    const { ZoneServers } = await import("./zone-servers.js");
    const moduleRef = await withOfflineDatabase(
      Test.createTestingModule({ imports: [ApiModule] }),
    ).compile();
    const expressApp = moduleRef.createNestApplication<NestExpressApplication>({
      bufferLogs: true,
    });
    app = expressApp;
    configureApiApp(expressApp);
    await app.init();

    try {
      await expect(app.get(ZoneServers).listen(app)).rejects.toMatchObject({
        code: "EADDRINUSE",
      });
    } finally {
      await app.close();
      app = undefined;
      await closeServer(blocker);
    }
  });
});
