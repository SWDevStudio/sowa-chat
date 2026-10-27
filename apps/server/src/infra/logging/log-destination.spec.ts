import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Logger, PinoLogger } from "nestjs-pino";
import { pino } from "pino";

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
  SOWA_LOG_FORMAT: "json",
};

const stdoutDescriptor = 1;

interface LogDestination {
  fd?: unknown;
  sync?: unknown;
  maxLength?: unknown;
  write: (line: string) => boolean;
  once: (event: "drop", listener: (data: string) => void) => void;
}

function stubTestEnv(): void {
  for (const [name, value] of Object.entries(testEnv)) {
    vi.stubEnv(name, value);
  }
}

async function createApp(): Promise<INestApplication> {
  vi.resetModules();
  const { ApiModule } = await import("../../api.module.js");
  const moduleRef = await Test.createTestingModule({ imports: [ApiModule] }).compile();
  const app = moduleRef.createNestApplication({ bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.init();
  return app;
}

function currentDestination(): LogDestination {
  return Reflect.get(PinoLogger.root, pino.symbols.streamSym) as LogDestination;
}

function configuredMaxLength(destination: LogDestination): number {
  expect(typeof destination.maxLength, "maxLength").toBe("number");
  const maxLength = destination.maxLength as number;
  expect(maxLength).toBeGreaterThan(0);
  expect(Number.isFinite(maxLength)).toBe(true);
  return maxLength;
}

describe("буфер записи логов в stdout", () => {
  let app: INestApplication;
  let destination: LogDestination;

  beforeAll(async () => {
    stubTestEnv();
    app = await createApp();
    destination = currentDestination();
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("пишет в stdout", () => {
    expect(destination.fd).toBe(stdoutDescriptor);
  });

  it("пишет асинхронно", () => {
    expect(destination.sync).toBe(false);
  });

  it("у буфера задан предел maxLength", () => {
    configuredMaxLength(destination);
  });

  it("строка больше предела отбрасывается с событием drop", () => {
    const maxLength = configuredMaxLength(destination);
    const oversizedLine = `${"x".repeat(maxLength + 1)}\n`;
    const dropped: string[] = [];
    destination.once("drop", (data) => dropped.push(data));

    destination.write(oversizedLine);

    expect(dropped).toEqual([oversizedLine]);
  });
});
