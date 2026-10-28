import type { Type } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import { configureApiApp } from "../../src/api-app.js";
import { ApiModule } from "../../src/api.module.js";
import { ZoneServers } from "../../src/infra/zones/zone-servers.js";
import type { ZonePorts } from "../../src/infra/zones/zone.js";
import { findFreePort } from "./e2e-server.js";
import type { ZoneProbeApp } from "./zone-probe.js";

async function findZonePorts(): Promise<ZonePorts> {
  return {
    public: await findFreePort(),
    operator: await findFreePort(),
    internal: await findFreePort(),
    management: await findFreePort(),
  };
}

function stubZonePorts(ports: ZonePorts): void {
  vi.stubEnv("SOWA_PUBLIC_PORT", String(ports.public));
  vi.stubEnv("SOWA_OPERATOR_PORT", String(ports.operator));
  vi.stubEnv("SOWA_INTERNAL_PORT", String(ports.internal));
  vi.stubEnv("SOWA_MANAGEMENT_PORT", String(ports.management));
}

export async function startZoneE2eApp(controllers: Type[] = []): Promise<ZoneProbeApp> {
  const ports = await findZonePorts();
  stubZonePorts(ports);
  const moduleRef = await Test.createTestingModule({
    imports: [ApiModule],
    controllers,
  }).compile();
  const app = moduleRef.createNestApplication<NestExpressApplication>({ bufferLogs: true });
  configureApiApp(app);
  await app.init();
  await app.get(ZoneServers).listen(app);
  return { app, ports };
}
