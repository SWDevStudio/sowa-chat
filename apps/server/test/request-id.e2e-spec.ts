import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { findFreePort, parseLogLine, spawnServer } from "./support/e2e-server.js";
import type { RunningServer } from "./support/e2e-server.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface LogEntry {
  requestId?: unknown;
  req?: { url?: unknown };
}

interface ProbeResult {
  status: number;
  requestIdHeader: string | null;
  logEntries: LogEntry[];
}

function logEntries(output: string): LogEntry[] {
  return output
    .split(/\r?\n/)
    .map(parseLogLine<LogEntry>)
    .filter((entry) => entry !== undefined);
}

function entriesForPath(output: string, path: string): LogEntry[] {
  return logEntries(output).filter((entry) => entry.req?.url === path);
}

async function isResponding(url: string): Promise<boolean> {
  try {
    await fetch(url);
    return true;
  } catch {
    return false;
  }
}

async function waitUntilResponding(url: string, server: RunningServer): Promise<void> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    if (await isResponding(url)) {
      return;
    }
    await delay(250);
  }
  throw new Error(`api не ответил на ${url}\n${server.output()}`);
}

async function waitForPathEntries(server: RunningServer, path: string): Promise<LogEntry[]> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline) {
    const entries = entriesForPath(server.output(), path);
    if (entries.length > 0) {
      return entries;
    }
    await delay(100);
  }
  return [];
}

describe("сквозной requestId в HTTP-запросах api", { timeout: commandTimeout }, () => {
  let server: RunningServer;
  let baseUrl = "";

  async function sendRequest(path: string, requestId?: string): Promise<ProbeResult> {
    const headers: Record<string, string> = {};
    if (requestId !== undefined) {
      headers["X-Request-Id"] = requestId;
    }
    const response = await fetch(`${baseUrl}${path}`, { headers });
    return {
      status: response.status,
      requestIdHeader: response.headers.get("X-Request-Id"),
      logEntries: await waitForPathEntries(server, path),
    };
  }

  function expectAllEntriesHaveRequestId(result: ProbeResult, requestId: string | null): void {
    expect(result.logEntries.length, server.output()).toBeGreaterThan(0);
    for (const entry of result.logEntries) {
      expect(entry.requestId, JSON.stringify(entry)).toBe(requestId);
    }
  }

  beforeAll(async () => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);

    const publicPort = await findFreePort();
    server = spawnServer("api", {
      ...process.env,
      SOWA_PUBLIC_PORT: String(publicPort),
      SOWA_OPERATOR_PORT: String(await findFreePort()),
      SOWA_INTERNAL_PORT: String(await findFreePort()),
      SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    });
    baseUrl = `http://127.0.0.1:${publicPort}`;
    await waitUntilResponding(`${baseUrl}/startup-check`, server);
  }, commandTimeout);

  afterAll(async () => {
    await server?.stop();
  });

  it("запрос с X-Request-Id: abc-123 пишет его во все строки лога и возвращает в ответе", async () => {
    const result = await sendRequest("/no-such-path?case=with-header", "abc-123");

    expect(result.status).toBe(404);
    expect(result.requestIdHeader).toBe("abc-123");
    expectAllEntriesHaveRequestId(result, "abc-123");
  });

  it("запрос без заголовка получает новый UUID в ответе и в логах", async () => {
    const result = await sendRequest("/no-such-path?case=without-header");

    expect(result.requestIdHeader).toMatch(uuidPattern);
    expectAllEntriesHaveRequestId(result, result.requestIdHeader);
  });

  it("два запроса без заголовка получают разные ID", async () => {
    const first = await sendRequest("/no-such-path?case=without-header-first");
    const second = await sendRequest("/no-such-path?case=without-header-second");

    expect(first.requestIdHeader).toMatch(uuidPattern);
    expect(second.requestIdHeader).toMatch(uuidPattern);
    expect(first.requestIdHeader).not.toBe(second.requestIdHeader);
  });

  it.each([
    { description: "ровно 128 символов", caseName: "valid-128", requestId: "a".repeat(128) },
    {
      description: "латиница, цифры, -, _ и .",
      caseName: "valid-chars",
      requestId: "Req_2026.10-27",
    },
  ])("допустимый заголовок ($description) сохраняется", async ({ caseName, requestId }) => {
    const result = await sendRequest(`/no-such-path?case=${caseName}`, requestId);

    expect(result.requestIdHeader).toBe(requestId);
    expectAllEntriesHaveRequestId(result, requestId);
  });

  it.each([
    { description: "длиннее 128 символов", caseName: "too-long", requestId: "a".repeat(129) },
    { description: "пробел", caseName: "space", requestId: "abc 123" },
    { description: "знак доллара", caseName: "dollar", requestId: "abc$123" },
    { description: "слэш", caseName: "slash", requestId: "abc/123" },
    { description: "кавычки", caseName: "quotes", requestId: 'abc","requestId":"forged' },
    { description: "фигурные скобки", caseName: "braces", requestId: "{abc}" },
  ])(
    "недопустимый заголовок ($description) заменяется новым UUID",
    async ({ caseName, requestId }) => {
      const result = await sendRequest(`/no-such-path?case=invalid-${caseName}`, requestId);

      expect(result.requestIdHeader).not.toBe(requestId);
      expect(result.requestIdHeader).toMatch(uuidPattern);
      expectAllEntriesHaveRequestId(result, result.requestIdHeader);
    },
  );

  it("параллельные запросы не смешивают свои requestId", async () => {
    const requestIds = Array.from({ length: 20 }, (_, index) => `parallel-${index}`);

    const results = await Promise.all(
      requestIds.map(async (requestId) => ({
        requestId,
        result: await sendRequest(`/no-such-path?case=${requestId}`, requestId),
      })),
    );

    for (const { requestId, result } of results) {
      expect(result.requestIdHeader).toBe(requestId);
      expectAllEntriesHaveRequestId(result, requestId);
    }
  });
});
