import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");
const serverDirectory = join(repositoryRoot, "apps", "server");
const runTimeout = 60_000;

export const onceWarning = "serverKey is shown only once: store it in your secret storage now";
export const listHeader = ["name", "id", "publicKey", "allowedOrigins", "operatorAllowedOrigins"];
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const fullOriginArguments = [
  "--origin",
  "https://Shop.Example.com/",
  "--origin",
  "http://localhost:5173",
  "--operator-origin",
  "https://admin.example.com",
];

export function outputOf(result: CliRunResult): string {
  return `exit=${result.exitCode}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`;
}

export function nonEmptyLines(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}

export function valueOf(lines: string[], field: string): string {
  const line = lines.find((candidate) => candidate.startsWith(`${field}: `));
  return line?.slice(field.length + 2) ?? "";
}

export function createMain(extraArguments: string[] = []): Promise<CliRunResult> {
  return runCliInProcess(["project:create", "--name", "main", ...extraArguments]);
}

export function buildServer(): void {
  const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
    cwd: repositoryRoot,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
}

export function runMainCli(args: string[]) {
  const result = spawnSync(process.execPath, ["dist/main.js", "cli", ...args], {
    cwd: serverDirectory,
    env: process.env,
    encoding: "utf8",
    timeout: runTimeout,
  });
  return { exitCode: result.status, output: `${result.stdout}${result.stderr}` };
}
