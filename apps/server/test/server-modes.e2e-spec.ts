import { spawn, spawnSync } from "node:child_process";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverDirectory = join(repositoryRoot, "apps", "server");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const modes = ["api", "worker", "migrate", "cli"];

type Env = Record<string, string | undefined>;

interface RunResult {
  exitCode: number | null;
  output: string;
}

interface ZonePorts {
  public: number;
  operator: number;
  internal: number;
  management: number;
}

interface RunningServer {
  process: ChildProcessWithoutNullStreams;
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

async function findZonePorts(): Promise<ZonePorts> {
  return {
    public: await findFreePort(),
    operator: await findFreePort(),
    internal: await findFreePort(),
    management: await findFreePort(),
  };
}

function zonePortsEnv(ports: ZonePorts): Env {
  return {
    SOWA_PUBLIC_PORT: String(ports.public),
    SOWA_OPERATOR_PORT: String(ports.operator),
    SOWA_INTERNAL_PORT: String(ports.internal),
    SOWA_MANAGEMENT_PORT: String(ports.management),
  };
}

function serverEnvironment(overrides: Env): Env {
  const env: Env = { ...process.env, ...overrides };
  for (const [name, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete env[name];
    }
  }
  return env;
}

function spawnServer(args: string[], env: Env): RunningServer {
  const server = spawn(process.execPath, ["dist/main.js", ...args], {
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

function runToExit(args: string[], env: Env): Promise<RunResult> {
  return new Promise((resolveRun) => {
    const server = spawnServer(args, env);
    const timer = setTimeout(() => server.process.kill(), startupTimeout);
    server.process.on("close", (exitCode) => {
      clearTimeout(timer);
      resolveRun({ exitCode, output: server.output() });
    });
  });
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

function serverScripts(): Record<string, string> {
  const manifest = JSON.parse(readFileSync(join(serverDirectory, "package.json"), "utf8"));
  return manifest.scripts;
}

function expectModesListed(output: string) {
  for (const mode of modes) {
    expect(output).toContain(mode);
  }
}

describe("режимы запуска сервера", { timeout: commandTimeout }, () => {
  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  it("api отвечает по HTTP 404 на неизвестный путь", async () => {
    const ports = await findZonePorts();
    const server = spawnServer(["api"], serverEnvironment(zonePortsEnv(ports)));
    try {
      const status = await waitForHttpStatus(
        `http://127.0.0.1:${ports.public}/no-such-path`,
        server,
      );

      expect(status, server.output()).toBe(404);
    } finally {
      await server.stop();
    }
  });

  it("worker запускается и завершается с кодом 0", async () => {
    const ports = await findZonePorts();
    const result = await runToExit(["worker"], serverEnvironment(zonePortsEnv(ports)));

    expect(result.exitCode, result.output).toBe(0);
  });

  it.each(["migrate", "cli"])("%s запускается и завершается с кодом 0", async (mode) => {
    const ports = await findZonePorts();
    const result = await runToExit([mode], serverEnvironment(zonePortsEnv(ports)));

    expect(result.exitCode, result.output).toBe(0);
  });

  it("без аргумента завершается с кодом 1 и выводит список режимов", async () => {
    const result = await runToExit([], serverEnvironment({}));

    expect(result.exitCode, result.output).toBe(1);
    expectModesListed(result.output);
  });

  it("с неизвестным режимом foo завершается с кодом 1 и выводит список режимов", async () => {
    const result = await runToExit(["foo"], serverEnvironment({}));

    expect(result.exitCode, result.output).toBe(1);
    expectModesListed(result.output);
  });

  it.each(modes)("режим %s подключает модуль конфигурации", async (mode) => {
    const result = await runToExit([mode], serverEnvironment({ DATABASE_URL: undefined }));

    expect(result.exitCode, result.output).not.toBeNull();
    expect(result.exitCode, result.output).not.toBe(0);
    expect(result.output).toMatch(/DATABASE_URL/);
  });

  it("в package.json есть скрипты start:api и start:worker", () => {
    const scripts = serverScripts();

    expect(scripts["start:api"]).toMatch(/\bapi\b/);
    expect(scripts["start:worker"]).toMatch(/\bworker\b/);
  });

  it.each(["api", "worker"])("в package.json есть скрипт start:%s:dev с --watch", (mode) => {
    const script = serverScripts()[`start:${mode}:dev`];

    expect(script).toBeDefined();
    expect(script).toContain("--watch");
    expect(script).toMatch(new RegExp(`\\b${mode}\\b`));
  });
});
