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
const nestStartMessage = "Starting Nest application";
const requestedPath = "/no-such-path";
const infoLevel = 30;

type Env = Record<string, string | undefined>;

interface LogEntry {
  level?: unknown;
  msg?: unknown;
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

async function serverEnvironment(overrides: Env): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
    ...overrides,
  };
}

function spawnServer(env: Env): RunningServer {
  const server = spawn(process.execPath, ["dist/main.js", "api"], {
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

function runToExit(env: Env): Promise<RunResult> {
  return new Promise((resolveRun) => {
    const server = spawnServer(env);
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

async function waitForOutput(server: RunningServer, text: string): Promise<void> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !server.isStopped()) {
    if (server.output().includes(text)) {
      return;
    }
    await delay(100);
  }
}

interface ApiRun {
  status: number | undefined;
  output: string;
}

async function runApiWithRequest(overrides: Env, waitForText?: string): Promise<ApiRun> {
  const env = await serverEnvironment(overrides);
  const server = spawnServer(env);
  try {
    const status = await waitForHttpStatus(
      `http://127.0.0.1:${env.SOWA_PUBLIC_PORT}${requestedPath}`,
      server,
    );
    if (waitForText !== undefined) {
      await waitForOutput(server, waitForText);
    }
    await delay(500);
    return { status, output: server.output() };
  } finally {
    await server.stop();
  }
}

describe("уровень и формат логов из конфига", { timeout: commandTimeout }, () => {
  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  it("SOWA_LOG_LEVEL=warn: api работает, строк уровня info нет", async () => {
    const run = await runApiWithRequest({
      SOWA_ENV: "development",
      SOWA_LOG_FORMAT: "json",
      SOWA_LOG_LEVEL: "warn",
    });

    expect(run.status, run.output).toBe(404);
    for (const line of outputLines(run.output)) {
      const entry = parseLogLine(line);
      expect(entry, line).toBeDefined();
      expect(entry?.level, line).not.toBe(infoLevel);
    }
    expect(run.output).not.toContain(nestStartMessage);
  });

  it("SOWA_LOG_FORMAT=pretty в development: вывод не JSON", async () => {
    const run = await runApiWithRequest(
      { SOWA_ENV: "development", SOWA_LOG_FORMAT: "pretty", SOWA_LOG_LEVEL: "info" },
      nestStartMessage,
    );

    expect(run.status, run.output).toBe(404);
    expect(run.output).toContain(nestStartMessage);
    for (const line of outputLines(run.output)) {
      expect(parseLogLine(line), line).toBeUndefined();
    }
  });

  it("SOWA_LOG_FORMAT=pretty в production: сервис не стартует и называет переменную", async () => {
    const env = await serverEnvironment({
      SOWA_ENV: "production",
      SOWA_LOG_FORMAT: "pretty",
    });

    const result = await runToExit(env);

    expect(result.exitCode, result.output).not.toBeNull();
    expect(result.exitCode, result.output).not.toBe(0);
    expect(result.output).toMatch(/SOWA_LOG_FORMAT/);
  });
});
