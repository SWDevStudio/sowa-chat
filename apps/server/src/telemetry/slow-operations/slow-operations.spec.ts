import type { INestApplication } from "@nestjs/common";
import { Controller, Get, Inject, Logger } from "@nestjs/common";
import request from "supertest";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";
import { OperationSteps } from "../operation-steps/operation-steps.js";
import { SlowOperations } from "./slow-operations.js";

const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const slowMessage = "Slow operation";

interface LogEntry {
  level?: unknown;
  msg?: unknown;
  operation?: unknown;
  durationMs?: unknown;
  steps?: Record<string, unknown>;
}

@Controller("slow-probe")
class SlowProbeController {
  constructor(@Inject(OperationSteps) private readonly operationSteps: OperationSteps) {}

  @Get("fast/:id")
  fast(): { ok: boolean } {
    return { ok: true };
  }

  @Get("slow/:id")
  async slow(): Promise<{ ok: boolean }> {
    this.operationSteps.record("db", 30);
    await pause(100);
    return { ok: true };
  }
}

describe("медленный HTTP-запрос", () => {
  const entries: LogEntry[] = [];
  let app: INestApplication;

  beforeAll(async () => {
    stubTestEnv({ SOWA_SLOW_OPERATION_MS: "50" });
    app = await createProbeApp({
      controllers: [SlowProbeController],
      providers: [OperationSteps],
      onLogLine: (line) => entries.push(JSON.parse(line) as LogEntry),
    });
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  beforeEach(() => {
    entries.length = 0;
  });

  const slowEntries = (): LogEntry[] => entries.filter((entry) => entry.msg === slowMessage);

  it("даёт ровно одну строку warn с шаблоном маршрута, временем и шагом db", async () => {
    const response = await request(app.getHttpServer()).get("/slow-probe/slow/12345");
    expect(response.status).toBe(200);

    await vi.waitFor(() => {
      expect(slowEntries(), JSON.stringify(entries)).toHaveLength(1);
    });
    const [entry] = slowEntries();
    expect(entry.level).toBe(40);
    expect(entry.operation).toMatch(/^GET \/.*slow-probe\/slow\/:id$/);
    expect(JSON.stringify(entry)).not.toContain("12345");
    expect(entry.durationMs).toBeGreaterThanOrEqual(100);
    expect(Number.isInteger(entry.durationMs)).toBe(true);
    expect(entry.steps?.db).toBe(30);
  });

  it("быстрый запрос не даёт строки Slow operation", async () => {
    const response = await request(app.getHttpServer()).get("/slow-probe/fast/1");
    expect(response.status).toBe(200);
    await pause(50);

    expect(slowEntries(), JSON.stringify(entries)).toEqual([]);
  });
});

describe("SlowOperations.report", () => {
  let warn: ReturnType<typeof vi.spyOn>;
  let slowOperations: SlowOperations;

  beforeEach(() => {
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    slowOperations = new SlowOperations({ thresholdMs: 50 });
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it("durationMs равный порогу строку не пишет", () => {
    slowOperations.report({ name: "job", durationMs: 50, steps: {} });

    expect(warn).not.toHaveBeenCalled();
  });

  it("durationMs на 1 больше порога пишет одну строку warn", () => {
    slowOperations.report({ name: "job", durationMs: 51, steps: {} });

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith({ operation: "job", durationMs: 51, steps: {} }, slowMessage);
  });

  it("округляет durationMs и шаги до целых миллисекунд", () => {
    slowOperations.report({
      name: "job",
      durationMs: 100.6,
      steps: { db: 30.4, redis: 1.5 },
    });

    expect(warn).toHaveBeenCalledWith(
      { operation: "job", durationMs: 101, steps: { db: 30, redis: 2 } },
      slowMessage,
    );
  });
});
