import { spawn, spawnSync } from "node:child_process";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverDirectory = join(repositoryRoot, "apps", "server");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const redacted = "[Redacted]";
const requestedPath = "/no-such-path?case=redaction";
const bearerToken = "sk_test";
const cookieSecret = "cookie-secret-value";
const apiKeySecret = "api-key-secret-value";
const visibleNote = "visible-note-value";

interface LogEntry {
  req?: {
    method?: unknown;
    url?: unknown;
    headers?: Record<string, unknown>;
  };
  res?: { statusCode?: unknown };
}

interface RunningServer {
  output: () => string;
  isStopped: () => boolean;
  stop: () => Promise<void>;
}

function findFreePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address() as AddressInfo;
      probe.close(() => resolvePort(port));
    });
  });
}

function spawnServer(env: Record<string, string | undefined>): RunningServer {
  const server: ChildProcessWithoutNullStreams = spawn(process.execPath, ["dist/main.js", "api"], {
    cwd: serverDirectory,
    env,
  });
  let output = "";
  let stopped = false;
  const collectOutput = (chunk: Buffer) => {
    output += chunk.toString();
  };
  server.stdout.on("data", collectOutput);
  server.stderr.on("data", collectOutput);
  const closed = new Promise<void>((resolveClose) => {
    server.on("close", () => {
      stopped = true;
      resolveClose();
    });
  });

  return {
    output: () => output,
    isStopped: () => stopped,
    stop: async () => {
      if (!stopped) {
        server.kill();
      }
      await closed;
    },
  };
}

function parseLogLine(line: string): LogEntry | undefined {
  try {
    const parsed: unknown = JSON.parse(line);
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as LogEntry;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function logEntries(output: string): LogEntry[] {
  return output
    .split(/\r?\n/)
    .map(parseLogLine)
    .filter((entry) => entry !== undefined);
}

function isRequestEntry(entry: LogEntry): boolean {
  return entry.req?.url === requestedPath && entry.res?.statusCode !== undefined;
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

async function waitForRequestEntry(server: RunningServer): Promise<void> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    if (logEntries(server.output()).some(isRequestEntry)) {
      return;
    }
    await delay(100);
  }
}

describe("скрытие секретов в логах запросов api", { timeout: commandTimeout }, () => {
  let apiOutput = "";
  let requestEntry: LogEntry | undefined;

  beforeAll(async () => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);

    const publicPort = await findFreePort();
    const server = spawnServer({
      ...process.env,
      SOWA_PUBLIC_PORT: String(publicPort),
      SOWA_OPERATOR_PORT: String(await findFreePort()),
      SOWA_INTERNAL_PORT: String(await findFreePort()),
      SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    });
    const baseUrl = `http://127.0.0.1:${publicPort}`;
    try {
      await waitUntilResponding(`${baseUrl}/startup-check`, server);
      await fetch(`${baseUrl}${requestedPath}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Cookie: `session=${cookieSecret}`,
          "X-Api-Key": apiKeySecret,
          "X-Visible-Note": visibleNote,
        },
      });
      await waitForRequestEntry(server);
    } finally {
      await server.stop();
      apiOutput = server.output();
    }
    requestEntry = logEntries(apiOutput).find(isRequestEntry);
  }, commandTimeout);

  it("запрос по-прежнему даёт строку лога запроса", () => {
    expect(requestEntry, apiOutput).toBeDefined();
    expect(requestEntry?.req?.method, apiOutput).toBe("GET");
  });

  it("заголовок Authorization: Bearer sk_test в логе равен [Redacted]", () => {
    expect(requestEntry?.req?.headers?.authorization, apiOutput).toBe(redacted);
  });

  it("строки sk_test в выводе api нет", () => {
    expect(apiOutput).not.toContain(bearerToken);
  });

  it.each([
    { header: "cookie", secret: cookieSecret },
    { header: "x-api-key", secret: apiKeySecret },
  ])("заголовок $header в логе равен [Redacted], значения в выводе нет", ({ header, secret }) => {
    expect(requestEntry?.req?.headers?.[header], apiOutput).toBe(redacted);
    expect(apiOutput).not.toContain(secret);
  });

  it("заголовок не из списка логируется как есть", () => {
    expect(requestEntry?.req?.headers?.["x-visible-note"], apiOutput).toBe(visibleNote);
  });
});
