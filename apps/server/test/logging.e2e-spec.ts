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
const serviceName = "sowa-chat-server";
const nestStartMessage = "Starting Nest application";
const requestedPath = "/no-such-path";

type Env = Record<string, string | undefined>;

interface LogEntry {
  "service.name"?: unknown;
  mode?: unknown;
  msg?: unknown;
  req?: { method?: unknown; url?: unknown };
  res?: { statusCode?: unknown };
}

interface RunningServer {
  process: ChildProcessWithoutNullStreams;
  output: () => string;
  isStopped: () => boolean;
  stop: () => Promise<void>;
}

interface RunResult {
  exitCode: number | null;
  output: string;
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

async function serverEnvironment(): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
  };
}

function spawnServer(mode: string, env: Env): RunningServer {
  const server = spawn(process.execPath, ["dist/main.js", mode], {
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
    process: server,
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

function runToExit(mode: string, env: Env): Promise<RunResult> {
  return new Promise((resolveRun) => {
    const server = spawnServer(mode, env);
    const timer = setTimeout(() => server.process.kill(), startupTimeout);
    server.process.on("close", (exitCode) => {
      clearTimeout(timer);
      resolveRun({ exitCode, output: server.output() });
    });
  });
}

function outputLines(output: string): string[] {
  return output.split(/\r?\n/).filter((line) => line.trim() !== "");
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
  return outputLines(output)
    .map(parseLogLine)
    .filter((entry) => entry !== undefined);
}

function isNestStartEntry(entry: LogEntry): boolean {
  return typeof entry.msg === "string" && entry.msg.includes(nestStartMessage);
}

function isRequestEntry(entry: LogEntry): boolean {
  return entry.req?.url === requestedPath && entry.res?.statusCode === 404;
}

function expectOnlyJsonLines(output: string, mode: string) {
  const lines = outputLines(output);
  expect(lines.length, output).toBeGreaterThan(0);
  for (const line of lines) {
    const entry = parseLogLine(line);
    expect(entry, line).toBeDefined();
    expect(entry?.["service.name"], line).toBe(serviceName);
    expect(entry?.mode, line).toBe(mode);
  }
}

async function fetchStatus(url: string): Promise<number | undefined> {
  try {
    const response = await fetch(url);
    return response.status;
  } catch {
    return undefined;
  }
}

async function waitForHttpStatus(url: string, server: RunningServer): Promise<number | undefined> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    const status = await fetchStatus(url);
    if (status !== undefined) {
      return status;
    }
    await delay(250);
  }
  return undefined;
}

async function waitForLogEntry(
  server: RunningServer,
  matches: (entry: LogEntry) => boolean,
): Promise<void> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    if (logEntries(server.output()).some(matches)) {
      return;
    }
    await delay(100);
  }
}

describe("JSON-логи сервера", { timeout: commandTimeout }, () => {
  let apiOutput = "";
  let apiStatus: number | undefined;

  beforeAll(async () => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);

    const env = await serverEnvironment();
    const server = spawnServer("api", env);
    try {
      apiStatus = await waitForHttpStatus(
        `http://127.0.0.1:${env.SOWA_PUBLIC_PORT}${requestedPath}`,
        server,
      );
      await waitForLogEntry(server, isRequestEntry);
    } finally {
      await server.stop();
      apiOutput = server.output();
    }
  }, commandTimeout);

  it("api выводит только JSON-строки с service.name и mode api", () => {
    expect(apiStatus, apiOutput).toBe(404);
    expectOnlyJsonLines(apiOutput, "api");
  });

  it("системные сообщения Nest при запуске api идут JSON-строками", () => {
    const entries = logEntries(apiOutput);

    expect(entries.some(isNestStartEntry), apiOutput).toBe(true);
  });

  it("ответ на HTTP-запрос даёт строку лога запроса", () => {
    const requestEntry = logEntries(apiOutput).find(isRequestEntry);

    expect(requestEntry, apiOutput).toBeDefined();
    expect(requestEntry?.req?.method, apiOutput).toBe("GET");
    expect(requestEntry?.["service.name"], apiOutput).toBe(serviceName);
    expect(requestEntry?.mode, apiOutput).toBe("api");
  });

  it("worker пишет логи в том же формате", async () => {
    const result = await runToExit("worker", await serverEnvironment());

    expectOnlyJsonLines(result.output, "worker");
    expect(logEntries(result.output).some(isNestStartEntry), result.output).toBe(true);
  });

  it.each(["migrate", "cli"])("%s пишет логи в том же формате", async (mode) => {
    const result = await runToExit(mode, await serverEnvironment());

    expectOnlyJsonLines(result.output, mode);
    expect(logEntries(result.output).some(isNestStartEntry), result.output).toBe(true);
  });
});
