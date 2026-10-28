import { spawn } from "node:child_process";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { resolve } from "node:path";

const serverDirectory = resolve(import.meta.dirname, "../..");

export type Env = Record<string, string | undefined>;

export interface RunningServer {
  process: ChildProcessWithoutNullStreams;
  output: () => string;
  stdout: () => string;
  stderr: () => string;
  isStopped: () => boolean;
  stop: () => Promise<void>;
}

export function findFreePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address() as AddressInfo;
      probe.close(() => resolvePort(port));
    });
  });
}

export function spawnServer(mode: string, env: Env, args: string[] = []): RunningServer {
  const server = spawn(process.execPath, ["dist/main.js", mode, ...args], {
    cwd: serverDirectory,
    env,
  });
  let output = "";
  let stdout = "";
  let stderr = "";
  let stopped = false;
  server.stdout.on("data", (chunk: Buffer) => {
    output += chunk.toString();
    stdout += chunk.toString();
  });
  server.stderr.on("data", (chunk: Buffer) => {
    output += chunk.toString();
    stderr += chunk.toString();
  });
  const closed = new Promise<void>((resolveClose) => {
    server.on("close", () => {
      stopped = true;
      resolveClose();
    });
  });

  return {
    process: server,
    output: () => output,
    stdout: () => stdout,
    stderr: () => stderr,
    isStopped: () => stopped,
    stop: async () => {
      if (!stopped) {
        server.kill();
      }
      await closed;
    },
  };
}

export function parseLogLine<Entry extends object>(line: string): Entry | undefined {
  try {
    const parsed: unknown = JSON.parse(line);
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Entry;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
