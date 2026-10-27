import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Injectable,
  Logger as NestLogger,
  Post,
} from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
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

const redacted = "[Redacted]";
const setCookieSecret = "set-cookie-secret-value";

const tokenAndKeyFields = [
  "token",
  "accessToken",
  "refreshToken",
  "publicKey",
  "serverKey",
  "botKey",
  "secret",
  "password",
  "key",
];
const messageAndContactFields = ["text", "body", "email", "phone", "name"];
const integratorDataFields = ["context", "visitorData", "payload"];

type LogEntry = Record<string, unknown> & {
  probe?: unknown;
  req?: { method?: unknown; url?: unknown; headers?: Record<string, unknown> };
  res?: { statusCode?: unknown; headers?: Record<string, unknown> };
};

interface CapturedLogs {
  lines: string[];
  entries: LogEntry[];
}

@Injectable()
class RedactionProbeService {
  private readonly logger = new NestLogger(RedactionProbeService.name);

  log(fields: Record<string, unknown>): void {
    this.logger.log(fields);
  }
}

@Controller("redaction-probe")
class RedactionProbeController {
  constructor(
    @Inject(RedactionProbeService) private readonly probeService: RedactionProbeService,
  ) {}

  @Post("log")
  @HttpCode(204)
  log(@Body() fields: Record<string, unknown>): void {
    this.probeService.log(fields);
  }

  @Get("cookie")
  @Header("Set-Cookie", `session=${setCookieSecret}`)
  cookie() {
    return { ok: true };
  }
}

function stubTestEnv(): void {
  for (const [name, value] of Object.entries(testEnv)) {
    vi.stubEnv(name, value);
  }
}

function redirectLogsTo(logs: CapturedLogs): void {
  const captureStream = {
    write: (line: string) => {
      logs.lines.push(line);
      logs.entries.push(JSON.parse(line) as LogEntry);
    },
  };
  Reflect.set(PinoLogger.root, pino.symbols.streamSym, captureStream);
}

async function createProbeApp(logs: CapturedLogs): Promise<INestApplication> {
  const { ApiModule } = await import("../../api.module.js");
  const moduleRef = await Test.createTestingModule({
    imports: [ApiModule],
    controllers: [RedactionProbeController],
    providers: [RedactionProbeService],
  }).compile();
  redirectLogsTo(logs);
  const app = moduleRef.createNestApplication({ bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.init();
  return app;
}

function secretValueOf(field: string, place: string): string {
  return `secret-${place}-${field}-value`;
}

function fieldValueOf(field: string, place: string): unknown {
  const secret = secretValueOf(field, place);
  if (integratorDataFields.includes(field)) {
    return { note: secret };
  }
  return secret;
}

describe("скрытие секретов и персональных данных в логах", () => {
  const logs: CapturedLogs = { lines: [], entries: [] };
  let app: INestApplication;

  function allOutput(): string {
    return logs.lines.join("\n");
  }

  async function logFromService(fields: Record<string, unknown>): Promise<LogEntry> {
    const response = await request(app.getHttpServer()).post("/redaction-probe/log").send(fields);
    expect(response.status).toBe(204);
    const entry = logs.entries.find((candidate) => candidate.probe === fields.probe);
    expect(entry, allOutput()).toBeDefined();
    return entry as LogEntry;
  }

  async function waitForRequestEntry(url: string): Promise<LogEntry> {
    let found: LogEntry | undefined;
    await vi.waitFor(() => {
      found = logs.entries.find(
        (entry) => entry.req?.url === url && entry.res?.statusCode !== undefined,
      );
      expect(found).toBeDefined();
    });
    return found as LogEntry;
  }

  beforeAll(async () => {
    stubTestEnv();
    vi.resetModules();
    app = await createProbeApp(logs);
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  describe("заголовки запроса и ответа", () => {
    let requestEntry: LogEntry;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .get("/redaction-probe/cookie")
        .set("Authorization", "Bearer sk_test")
        .set("Cookie", "session=cookie-secret-value")
        .set("X-Api-Key", "api-key-secret-value")
        .set("X-Visible-Note", "visible-note-value");
      expect(response.status).toBe(200);
      requestEntry = await waitForRequestEntry("/redaction-probe/cookie");
    });

    it("Authorization: Bearer sk_test в логе равен [Redacted], строки sk_test в выводе нет", () => {
      expect(requestEntry.req?.headers?.authorization, allOutput()).toBe(redacted);
      expect(allOutput()).not.toContain("sk_test");
    });

    it.each([
      { header: "cookie", secret: "cookie-secret-value" },
      { header: "x-api-key", secret: "api-key-secret-value" },
    ])("заголовок запроса $header равен [Redacted]", ({ header, secret }) => {
      expect(requestEntry.req?.headers?.[header], allOutput()).toBe(redacted);
      expect(allOutput()).not.toContain(secret);
    });

    it("заголовок ответа set-cookie равен [Redacted]", () => {
      expect(requestEntry.res?.headers?.["set-cookie"], allOutput()).toBe(redacted);
      expect(allOutput()).not.toContain(setCookieSecret);
    });

    it("запрос логируется, заголовки не из списка остаются как есть", () => {
      expect(requestEntry.req?.method).toBe("GET");
      expect(requestEntry.req?.headers?.["x-visible-note"], allOutput()).toBe("visible-note-value");
    });
  });

  it('лог объекта { message: { text: "привет" }, email: "a@b.c" } не содержит привет и a@b.c', async () => {
    await logFromService({
      probe: "acceptance-message",
      message: { text: "привет" },
      email: "a@b.c",
    });

    expect(allOutput()).not.toContain("привет");
    expect(allOutput()).not.toContain("a@b.c");
  });

  describe.each([
    { group: "токены и ключи", fields: tokenAndKeyFields },
    { group: "тексты сообщений и контакты", fields: messageAndContactFields },
    { group: "данные интегратора", fields: integratorDataFields },
  ])("$group", ({ fields }) => {
    it.each(fields)("поле %s на верхнем уровне заменяется на [Redacted]", async (field) => {
      const entry = await logFromService({
        probe: `top-${field}`,
        [field]: fieldValueOf(field, "top"),
      });

      expect(entry[field], JSON.stringify(entry)).toBe(redacted);
      expect(allOutput()).not.toContain(secretValueOf(field, "top"));
    });

    it.each(fields)("поле %s во вложенном объекте заменяется на [Redacted]", async (field) => {
      const entry = await logFromService({
        probe: `nested-${field}`,
        data: { [field]: fieldValueOf(field, "nested") },
      });

      const data = entry.data as Record<string, unknown> | undefined;
      expect(data?.[field], JSON.stringify(entry)).toBe(redacted);
      expect(allOutput()).not.toContain(secretValueOf(field, "nested"));
    });
  });

  it("поля, которых нет в списке, логируются как есть", async () => {
    const entry = await logFromService({
      probe: "unlisted-fields",
      chatId: "chat-42",
      status: "open",
      message: { id: "message-1", text: "скрытый текст" },
    });

    expect(entry.chatId).toBe("chat-42");
    expect(entry.status).toBe("open");
    expect(entry.message).toEqual({ id: "message-1", text: redacted });
  });
});
