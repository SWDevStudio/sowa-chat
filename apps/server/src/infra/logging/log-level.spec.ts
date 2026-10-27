import { Controller, Get, Inject, Injectable, Logger as NestLogger } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { setTimeout as delay } from "node:timers/promises";
import { Logger, PinoLogger } from "nestjs-pino";
import { pino } from "pino";
import request from "supertest";

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

const probePath = "/log-level-probe";
const infoProbe = "info-probe";
const warnProbe = "warn-probe";
const infoLevel = pino.levels.values.info;
const warnLevel = pino.levels.values.warn;

interface LogEntry {
  level?: unknown;
  msg?: unknown;
  req?: { url?: unknown };
  res?: { statusCode?: unknown };
}

@Injectable()
class LevelProbeService {
  private readonly logger = new NestLogger(LevelProbeService.name);

  logBothLevels(): void {
    this.logger.log(infoProbe);
    this.logger.warn(warnProbe);
  }
}

@Controller("log-level-probe")
class LevelProbeController {
  constructor(@Inject(LevelProbeService) private readonly probeService: LevelProbeService) {}

  @Get()
  probe() {
    this.probeService.logBothLevels();
    return { ok: true };
  }
}

function stubTestEnv(overrides: Record<string, string>): void {
  for (const [name, value] of Object.entries({ ...testEnv, ...overrides })) {
    vi.stubEnv(name, value);
  }
}

function redirectLogsTo(entries: LogEntry[]): void {
  const captureStream = {
    write: (line: string) => {
      entries.push(JSON.parse(line) as LogEntry);
    },
  };
  Reflect.set(PinoLogger.root, pino.symbols.streamSym, captureStream);
}

async function createProbeApp(entries: LogEntry[]): Promise<INestApplication> {
  vi.resetModules();
  const { ApiModule } = await import("../../api.module.js");
  const moduleRef = await Test.createTestingModule({
    imports: [ApiModule],
    controllers: [LevelProbeController],
    providers: [LevelProbeService],
  }).compile();
  redirectLogsTo(entries);
  const app = moduleRef.createNestApplication({ bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.init();
  return app;
}

function hasMessage(entries: LogEntry[], message: string): boolean {
  return entries.some((entry) => entry.msg === message);
}

function isProbeRequestEntry(entry: LogEntry): boolean {
  return entry.req?.url === probePath && entry.res?.statusCode !== undefined;
}

describe("уровень логов из SOWA_LOG_LEVEL", () => {
  describe("SOWA_LOG_LEVEL=warn", () => {
    const entries: LogEntry[] = [];
    let app: INestApplication;

    beforeAll(async () => {
      stubTestEnv({ SOWA_LOG_LEVEL: "warn" });
      app = await createProbeApp(entries);
      const response = await request(app.getHttpServer()).get(probePath);
      expect(response.status).toBe(200);
      await vi.waitFor(() => {
        expect(hasMessage(entries, warnProbe), JSON.stringify(entries)).toBe(true);
      });
      await delay(200);
    });

    afterAll(async () => {
      await app?.close();
      vi.unstubAllEnvs();
    });

    it("строк уровня info нет", () => {
      const infoEntries = entries.filter((entry) => entry.level === infoLevel);

      expect(infoEntries, JSON.stringify(infoEntries)).toEqual([]);
    });

    it("сообщение logger.log не попадает в вывод", () => {
      expect(hasMessage(entries, infoProbe)).toBe(false);
    });

    it("строка лога запроса уровня info не пишется", () => {
      expect(entries.some(isProbeRequestEntry), JSON.stringify(entries)).toBe(false);
    });

    it("строки уровня warn пишутся", () => {
      const warnEntry = entries.find((entry) => entry.msg === warnProbe);

      expect(warnEntry?.level).toBe(warnLevel);
    });
  });

  describe("без SOWA_LOG_LEVEL", () => {
    const entries: LogEntry[] = [];
    let app: INestApplication;

    beforeAll(async () => {
      stubTestEnv({});
      app = await createProbeApp(entries);
      const response = await request(app.getHttpServer()).get(probePath);
      expect(response.status).toBe(200);
      await vi.waitFor(() => {
        expect(entries.some(isProbeRequestEntry), JSON.stringify(entries)).toBe(true);
      });
    });

    afterAll(async () => {
      await app?.close();
      vi.unstubAllEnvs();
    });

    it("уровень info по умолчанию: строки info пишутся", () => {
      const infoEntry = entries.find((entry) => entry.msg === infoProbe);

      expect(infoEntry?.level).toBe(infoLevel);
    });

    it("строки ниже info не пишутся", () => {
      const belowInfo = entries.filter(
        (entry) => typeof entry.level === "number" && entry.level < infoLevel,
      );

      expect(belowInfo, JSON.stringify(belowInfo)).toEqual([]);
    });
  });
});
