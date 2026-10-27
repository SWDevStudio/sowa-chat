import { Controller, Get, Inject, Injectable, Logger as NestLogger, Query } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { ClsServiceManager } from "nestjs-cls";
import { setTimeout as delay } from "node:timers/promises";
import request from "supertest";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const probeStartedMessage = "probe started";
const probeFinishedMessage = "probe finished";

interface LogEntry {
  msg?: unknown;
  requestId?: unknown;
  req?: { url?: unknown };
}

interface ProbeResponse {
  requestIdHeader: unknown;
  clsId: unknown;
}

@Injectable()
class ProbeService {
  private readonly logger = new NestLogger(ProbeService.name);

  async handle(tag: string, delayMs: number): Promise<string | undefined> {
    this.logger.log(`${probeStartedMessage} ${tag}`);
    await delay(delayMs);
    this.logger.log(`${probeFinishedMessage} ${tag}`);
    return ClsServiceManager.getClsService().getId();
  }
}

@Controller()
class ProbeController {
  constructor(@Inject(ProbeService) private readonly probeService: ProbeService) {}

  @Get("probe")
  async probe(@Query("tag") tag: string, @Query("delay") delayMs: string) {
    const clsId = await this.probeService.handle(tag, Number(delayMs));
    return { clsId };
  }
}

function createRequestIdProbeApp(entries: LogEntry[]): Promise<INestApplication> {
  return createProbeApp({
    controllers: [ProbeController],
    providers: [ProbeService],
    onLogLine: (line) => entries.push(JSON.parse(line) as LogEntry),
  });
}

function isServiceEntryOf(entry: LogEntry, tag: string): boolean {
  return (
    entry.msg === `${probeStartedMessage} ${tag}` || entry.msg === `${probeFinishedMessage} ${tag}`
  );
}

function isRequestEntryOf(entry: LogEntry, tag: string): boolean {
  return typeof entry.req?.url === "string" && entry.req.url.startsWith(`/probe?tag=${tag}&`);
}

function entriesOf(entries: LogEntry[], tag: string): LogEntry[] {
  return entries.filter((entry) => isServiceEntryOf(entry, tag) || isRequestEntryOf(entry, tag));
}

function expectRequestIdInAllEntries(entries: LogEntry[], tag: string, requestId: unknown): void {
  const tagEntries = entriesOf(entries, tag);
  const serviceEntries = tagEntries.filter((entry) => isServiceEntryOf(entry, tag));
  expect(serviceEntries, JSON.stringify(tagEntries)).toHaveLength(2);
  for (const entry of tagEntries) {
    expect(entry.requestId, JSON.stringify(entry)).toBe(requestId);
  }
}

describe("сквозной requestId внутри запроса", () => {
  const entries: LogEntry[] = [];
  let app: INestApplication;

  async function sendProbe(
    tag: string,
    delayMs: number,
    requestId?: string,
  ): Promise<ProbeResponse> {
    const probe = request(app.getHttpServer()).get(`/probe?tag=${tag}&delay=${delayMs}`);
    if (requestId !== undefined) {
      probe.set("X-Request-Id", requestId);
    }
    const response = await probe;
    expect(response.status).toBe(200);
    return { requestIdHeader: response.headers["x-request-id"], clsId: response.body.clsId };
  }

  async function waitForRequestEntry(tag: string): Promise<void> {
    await vi.waitFor(() => {
      expect(entries.some((entry) => isRequestEntryOf(entry, tag))).toBe(true);
    });
  }

  beforeAll(async () => {
    stubTestEnv();
    app = await createRequestIdProbeApp(entries);
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("строки лога из сервиса и строка запроса содержат requestId из X-Request-Id", async () => {
    const response = await sendProbe("with-header", 0, "abc-123");
    await waitForRequestEntry("with-header");

    expect(response.requestIdHeader).toBe("abc-123");
    expectRequestIdInAllEntries(entries, "with-header", "abc-123");
  });

  it("requestId доступен в коде через контекст nestjs-cls без передачи параметром", async () => {
    const response = await sendProbe("cls-access", 0, "abc-123");

    expect(response.clsId).toBe("abc-123");
  });

  it("без заголовка строки лога из сервиса содержат новый UUID из ответа", async () => {
    const response = await sendProbe("without-header", 0);
    await waitForRequestEntry("without-header");

    expect(response.requestIdHeader).toMatch(uuidPattern);
    expect(response.clsId).toBe(response.requestIdHeader);
    expectRequestIdInAllEntries(entries, "without-header", response.requestIdHeader);
  });

  it("недопустимый заголовок заменяется новым ID и в контексте, и в логах", async () => {
    const response = await sendProbe("invalid-header", 0, "abc$123");
    await waitForRequestEntry("invalid-header");

    expect(response.requestIdHeader).toMatch(uuidPattern);
    expect(response.clsId).toBe(response.requestIdHeader);
    expectRequestIdInAllEntries(entries, "invalid-header", response.requestIdHeader);
  });

  it("два параллельных запроса не смешивают requestId в контексте и логах", async () => {
    const [slow, fast] = await Promise.all([
      sendProbe("parallel-slow", 300, "parallel-slow-id"),
      sendProbe("parallel-fast", 50, "parallel-fast-id"),
    ]);
    await waitForRequestEntry("parallel-slow");
    await waitForRequestEntry("parallel-fast");

    expect(slow.requestIdHeader).toBe("parallel-slow-id");
    expect(slow.clsId).toBe("parallel-slow-id");
    expect(fast.requestIdHeader).toBe("parallel-fast-id");
    expect(fast.clsId).toBe("parallel-fast-id");
    expectRequestIdInAllEntries(entries, "parallel-slow", "parallel-slow-id");
    expectRequestIdInAllEntries(entries, "parallel-fast", "parallel-fast-id");
  });
});
