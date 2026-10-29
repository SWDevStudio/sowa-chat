import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { parseKey } from "../src/domain/keys/key-format.js";
import { buildServer } from "./support/project-cli.js";

const serverDirectory = resolve(import.meta.dirname, "..");
const commandTimeout = 600_000;
const runTimeout = 60_000;

const generatedNames = [
  "SOWA_ENCRYPTION_KEYS",
  "SOWA_TOKEN_SIGNING_KEYS",
  "SOWA_TOKEN_SIGNING_KEY_ID",
  "SOWA_INIT_SERVER_KEY",
];

const rotationEnv = {
  SOWA_ENCRYPTION_KEYS: "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
  SOWA_TOKEN_SIGNING_KEYS:
    "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f",
  SOWA_TOKEN_SIGNING_KEY_ID: "test-1",
};

type Env = Record<string, string | undefined>;

interface RunResult {
  exitCode: number | null;
  stdout: string;
  stderr: string;
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

function runNode(args: string[], env: Env, cwd = serverDirectory): RunResult {
  const result = spawnSync(process.execPath, args, {
    cwd,
    env,
    encoding: "utf8",
    timeout: runTimeout,
  });
  return { exitCode: result.status, stdout: result.stdout, stderr: result.stderr };
}

function outputOf(result: RunResult): string {
  return `exit=${result.exitCode}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`;
}

function linesOf(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function lineNames(lines: string[]): string[] {
  return lines.map((line) => line.slice(0, line.indexOf("=")));
}

function valueOf(lines: string[], name: string): string {
  const line = lines.find((candidate) => candidate.startsWith(`${name}=`));
  return line?.slice(name.length + 1) ?? "";
}

describe("команда secrets:generate без конфига, БД и Redis", { timeout: commandTimeout }, () => {
  beforeAll(() => {
    buildServer();
  });

  describe.each([
    ["node dist/main.js cli secrets:generate", ["dist/main.js", "cli", "secrets:generate"]],
    ["node dist/sowa-chat.js secrets:generate", ["dist/sowa-chat.js", "secrets:generate"]],
  ])("%s", (_title, args) => {
    it("выходит с кодом 0 на пустом env и печатает четыре строки ИМЯ=значение", () => {
      const result = runNode(args, systemEnvironment());
      const lines = linesOf(result.stdout);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(lineNames(lines), outputOf(result)).toEqual(generatedNames);
      expect(valueOf(lines, "SOWA_TOKEN_SIGNING_KEY_ID")).toBe("key-1");
      expect(parseKey(valueOf(lines, "SOWA_INIT_SERVER_KEY"), "serverKey")).toBeDefined();
    });

    it("в stderr ничего не пишет: сообщения Nest и значения не попадают в лог", () => {
      const result = runNode(args, systemEnvironment());

      expect(result.stderr, outputOf(result)).toBe("");
    });

    it("работает и с неверным env: DATABASE_URL не URL, SOWA_ENV неизвестный", () => {
      const env = { ...systemEnvironment(), DATABASE_URL: "not-a-url", SOWA_ENV: "staging" };

      const result = runNode(args, env);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(lineNames(linesOf(result.stdout)), outputOf(result)).toEqual(generatedNames);
    });

    it("с --rotate печатает три строки: следующие версии ключей, без SOWA_INIT_SERVER_KEY", () => {
      const result = runNode([...args, "--rotate"], { ...systemEnvironment(), ...rotationEnv });
      const lines = linesOf(result.stdout);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(lineNames(lines), outputOf(result)).toEqual(generatedNames.slice(0, 3));
      expect(valueOf(lines, "SOWA_ENCRYPTION_KEYS")).toMatch(
        new RegExp(`^${rotationEnv.SOWA_ENCRYPTION_KEYS},2:`),
      );
      expect(valueOf(lines, "SOWA_TOKEN_SIGNING_KEY_ID")).toBe("key-2");
    });

    it("с --rotate без SOWA_ENCRYPTION_KEYS выходит с кодом 1 и ошибкой в stderr", () => {
      const result = runNode([...args, "--rotate"], systemEnvironment());

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stdout, outputOf(result)).toBe("");
      expect(result.stderr, outputOf(result)).toContain("error: SOWA_ENCRYPTION_KEYS is not set");
    });
  });

  it("два запуска выдают разные секреты", () => {
    const args = ["dist/sowa-chat.js", "secrets:generate"];

    const first = linesOf(runNode(args, systemEnvironment()).stdout);
    const second = linesOf(runNode(args, systemEnvironment()).stdout);

    expect(valueOf(second, "SOWA_ENCRYPTION_KEYS")).not.toBe(
      valueOf(first, "SOWA_ENCRYPTION_KEYS"),
    );
    expect(valueOf(second, "SOWA_INIT_SERVER_KEY")).not.toBe(
      valueOf(first, "SOWA_INIT_SERVER_KEY"),
    );
  });

  it("не создаёт файлы в рабочей папке", () => {
    const workingDirectory = mkdtempSync(join(tmpdir(), "sowa-secrets-generate-"));
    try {
      const result = runNode(
        [join(serverDirectory, "dist", "main.js"), "cli", "secrets:generate"],
        systemEnvironment(),
        workingDirectory,
      );

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(readdirSync(workingDirectory)).toEqual([]);
    } finally {
      rmSync(workingDirectory, { recursive: true, force: true });
    }
  });

  it("node dist/main.js cli --help перечисляет secrets:generate", () => {
    const result = runNode(["dist/main.js", "cli", "--help"], process.env);

    expect(result.exitCode, outputOf(result)).toBe(0);
    expect(result.stdout, outputOf(result)).toContain("secrets:generate");
  });
});
