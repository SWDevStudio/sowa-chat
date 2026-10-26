import { spawn, spawnSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverDirectory = join(repositoryRoot, "apps", "server");
const protocolIndexPath = join(repositoryRoot, "packages", "protocol", "src", "index.ts");
const commandTimeout = 600_000;
const startupTimeout = 30_000;
const moduleLoadingError =
  /ERR_MODULE_NOT_FOUND|ERR_UNKNOWN_FILE_EXTENSION|ERR_PACKAGE_PATH_NOT_EXPORTED|ERR_UNSUPPORTED_DIR_IMPORT|Cannot find module/;

interface CommandResult {
  exitCode: number | null;
  output: string;
}

function runInRoot(command: string): CommandResult {
  const result = spawnSync(command, {
    cwd: repositoryRoot,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { exitCode: result.status, output: `${result.stdout}${result.stderr}` };
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

async function respondsToHttp(url: string): Promise<boolean> {
  try {
    await fetch(url);
    return true;
  } catch {
    return false;
  }
}

async function waitForHttp(url: string, isStopped: () => boolean): Promise<boolean> {
  const deadline = Date.now() + startupTimeout;
  while (Date.now() < deadline && !isStopped()) {
    if (await respondsToHttp(url)) {
      return true;
    }
    await delay(250);
  }
  return false;
}

async function startBuiltServer(): Promise<{ started: boolean; output: string }> {
  const port = await findFreePort();
  const server = spawn(process.execPath, ["dist/main.js"], {
    cwd: serverDirectory,
    env: { ...process.env, SOWA_PUBLIC_PORT: String(port) },
  });
  let output = "";
  let stopped = false;
  const collectOutput = (chunk: Buffer) => {
    output += chunk.toString();
  };
  server.stdout.on("data", collectOutput);
  server.stderr.on("data", collectOutput);
  server.on("close", () => {
    stopped = true;
  });

  try {
    const started = await waitForHttp(`http://127.0.0.1:${port}/`, () => stopped);
    return { started, output };
  } finally {
    server.kill();
  }
}

function serverSourceFiles(): string[] {
  const sourceDirectory = join(serverDirectory, "src");
  return readdirSync(sourceDirectory, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".ts"))
    .map((file) => join(sourceDirectory, file));
}

describe("protocol в сервере", { timeout: commandTimeout }, () => {
  let buildResult: CommandResult;

  beforeAll(() => {
    buildResult = runInRoot("pnpm build");
  }, commandTimeout);

  it("сервер зависит от @sowa-chat/protocol из workspace", () => {
    const manifest = JSON.parse(readFileSync(join(serverDirectory, "package.json"), "utf8"));

    expect(manifest.dependencies["@sowa-chat/protocol"]).toBe("workspace:*");
  });

  it("сервер импортирует protocol только через точку входа", () => {
    const sources = serverSourceFiles().map((file) => readFileSync(file, "utf8"));

    expect(sources.some((source) => source.includes('from "@sowa-chat/protocol"'))).toBe(true);
    expect(sources.some((source) => source.includes("@sowa-chat/protocol/"))).toBe(false);
  });

  it("pnpm build проходит", () => {
    expect(buildResult.exitCode, buildResult.output).toBe(0);
  });

  it("pnpm check-types проходит", () => {
    const result = runInRoot("pnpm check-types");

    expect(result.exitCode, result.output).toBe(0);
  });

  it("собранный сервер стартует без ошибок загрузки модулей", async () => {
    const { started, output } = await startBuiltServer();

    expect(output).not.toMatch(moduleLoadingError);
    expect(started, output).toBe(true);
  });

  it("несовместимое изменение protocol роняет проверку типов сервера", () => {
    const originalIndex = readFileSync(protocolIndexPath, "utf8");
    try {
      writeFileSync(protocolIndexPath, "export {};\n");

      const result = runInRoot("pnpm check-types --continue=always");

      expect(result.exitCode).not.toBe(0);
      expect(result.output).toMatch(
        /@sowa-chat\/server:check-types:.*error TS\d+.*@sowa-chat\/protocol/,
      );
    } finally {
      writeFileSync(protocolIndexPath, originalIndex);
    }
  });
});
