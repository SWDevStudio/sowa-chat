import type { NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import { Redis } from "ioredis";
import type { ZonePorts } from "../../src/infra/zones/zone.js";
import { findFreePort } from "./e2e-server.js";
import { withOfflineDatabase } from "./offline-database.js";
import { stubTestEnv } from "./unit-probe.js";
import type { ZoneProbeApp } from "./zone-probe.js";

export interface RedisStub {
  status: string;
  ping: () => Promise<string>;
  quit: () => Promise<string>;
  disconnect: () => undefined;
}

export const readyRedis: RedisStub = {
  status: "ready",
  ping: () => Promise.resolve("PONG"),
  quit: () => Promise.resolve("OK"),
  disconnect: () => undefined,
};

export async function startRedisStubProbeApp(redis: RedisStub = readyRedis): Promise<ZoneProbeApp> {
  const ports: ZonePorts = {
    public: await findFreePort(),
    operator: await findFreePort(),
    internal: await findFreePort(),
    management: await findFreePort(),
  };
  stubTestEnv({
    SOWA_PUBLIC_PORT: String(ports.public),
    SOWA_OPERATOR_PORT: String(ports.operator),
    SOWA_INTERNAL_PORT: String(ports.internal),
    SOWA_MANAGEMENT_PORT: String(ports.management),
  });
  vi.resetModules();
  const { ApiModule } = await import("../../src/api.module.js");
  const { configureApiApp } = await import("../../src/api-app.js");
  const { ZoneServers } = await import("../../src/infra/zones/zone-servers.js");
  const moduleRef = await withOfflineDatabase(Test.createTestingModule({ imports: [ApiModule] }))
    .overrideProvider(Redis)
    .useValue(redis)
    .compile();
  const app = moduleRef.createNestApplication<NestExpressApplication>({ bufferLogs: true });
  configureApiApp(app);
  await app.init();
  await app.get(ZoneServers).listen(app);
  return { app, ports };
}
