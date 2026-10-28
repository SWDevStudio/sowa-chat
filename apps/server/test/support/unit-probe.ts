import type { INestApplication, Provider, Type } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Logger, PinoLogger } from "nestjs-pino";
import { pino } from "pino";
import { withOfflineDatabase } from "./offline-database.js";

const testEnv = {
  NODE_ENV: "test",
  SOWA_ENV: "development",
  SOWA_PUBLIC_PORT: "18080",
  SOWA_OPERATOR_PORT: "18081",
  SOWA_INTERNAL_PORT: "18082",
  SOWA_MANAGEMENT_PORT: "19090",
  DATABASE_URL: "postgres://test:test@127.0.0.1:5432/test",
  REDIS_URL: "redis://127.0.0.1:6380",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:9333",
  SOWA_S3_ACCESS_KEY: "test-access",
  SOWA_S3_SECRET_KEY: "test-secret",
  SOWA_S3_BUCKET: "test-bucket",
};

interface ProbeAppOptions {
  controllers?: Type[];
  providers?: Provider[];
  onLogLine?: (line: string) => void;
}

export function stubTestEnv(overrides: Record<string, string> = {}): void {
  for (const [name, value] of Object.entries({ ...testEnv, ...overrides })) {
    vi.stubEnv(name, value);
  }
}

export function redirectLogsTo(onLogLine: (line: string) => void): void {
  Reflect.set(PinoLogger.root, pino.symbols.streamSym, { write: onLogLine });
}

export async function createProbeApp(options: ProbeAppOptions = {}): Promise<INestApplication> {
  vi.resetModules();
  const { ApiModule } = await import("../../src/api.module.js");
  const { useClsMiddleware } = await import("../../src/infra/cls/cls-middleware.js");
  const moduleRef = await withOfflineDatabase(
    Test.createTestingModule({
      imports: [ApiModule],
      controllers: options.controllers,
      providers: options.providers,
    }),
  ).compile();
  if (options.onLogLine) {
    redirectLogsTo(options.onLogLine);
  }
  const app = moduleRef.createNestApplication({ bufferLogs: true });
  useClsMiddleware(app);
  app.useLogger(app.get(Logger));
  await app.init();
  return app;
}
