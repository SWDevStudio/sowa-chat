import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverEntry = join(repositoryRoot, "apps", "server", "dist", "main.js");
const commandTimeout = 600_000;
const exitTimeout = 30_000;

const validEnv = {
  DATABASE_URL: "postgres://sowa:sowa@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "sowa-dev",
  SOWA_S3_SECRET_KEY: "sowa-dev-secret",
  SOWA_S3_BUCKET: "sowa-chat",
};

type Env = Record<string, string | undefined>;

interface RunResult {
  exitCode: number | null;
  output: string;
}

function isConfigVariable(name: string): boolean {
  return name.startsWith("SOWA_") || name === "DATABASE_URL" || name === "REDIS_URL";
}

function systemEnvironment(): Env {
  const env: Env = {};
  for (const [name, value] of Object.entries(process.env)) {
    if (!isConfigVariable(name)) {
      env[name] = value;
    }
  }
  return env;
}

function serverEnvironment(overrides: Env): Env {
  const env: Env = { ...systemEnvironment(), ...validEnv, ...overrides };
  for (const [name, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete env[name];
    }
  }
  return env;
}

function runServer(env: Env, workingDirectory: string): Promise<RunResult> {
  return new Promise((resolveRun) => {
    const server = spawn(process.execPath, [serverEntry, "api"], { cwd: workingDirectory, env });
    let output = "";
    const collectOutput = (chunk: Buffer) => {
      output += chunk.toString();
    };
    server.stdout.on("data", collectOutput);
    server.stderr.on("data", collectOutput);
    const timer = setTimeout(() => server.kill(), exitTimeout);
    server.on("close", (exitCode) => {
      clearTimeout(timer);
      resolveRun({ exitCode, output });
    });
  });
}

describe("запуск сервера с неверным окружением", { timeout: commandTimeout }, () => {
  let workingDirectory: string;

  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
    workingDirectory = mkdtempSync(join(tmpdir(), "sowa-config-"));
  }, commandTimeout);

  afterAll(() => {
    rmSync(workingDirectory, { recursive: true, force: true });
  });

  it.each([
    { reason: "без DATABASE_URL", overrides: { DATABASE_URL: undefined }, named: /DATABASE_URL/ },
    { reason: "с SOWA_ENV=staging", overrides: { SOWA_ENV: "staging" }, named: /SOWA_ENV/ },
    {
      reason: "с SOWA_PUBLIC_PORT=abc",
      overrides: { SOWA_PUBLIC_PORT: "abc" },
      named: /SOWA_PUBLIC_PORT/,
    },
    {
      reason: "с одинаковыми портами зон",
      overrides: { SOWA_PUBLIC_PORT: "18085", SOWA_INTERNAL_PORT: "18085" },
      named: /SOWA_PUBLIC_PORT|SOWA_INTERNAL_PORT/,
    },
  ])("$reason не стартует и называет переменную", async ({ overrides, named }) => {
    const result = await runServer(serverEnvironment(overrides), workingDirectory);

    expect(result.exitCode, result.output).not.toBeNull();
    expect(result.exitCode, result.output).not.toBe(0);
    expect(result.output).toMatch(named);
  });
});
