import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parseKey } from "../src/domain/keys/key-format.js";
import { createProject } from "./support/fixtures.js";
import { runCliInProcess } from "./support/cli-run.js";
import { useTestDatabase } from "./support/test-database.js";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const serverDirectory = join(repositoryRoot, "apps", "server");
const commandTimeout = 600_000;
const runTimeout = 60_000;
const shebang = "#!/usr/bin/env node";

interface RunResult {
  exitCode: number | null;
  stdout: string;
  stderr: string;
}

function runNode(script: string, args: string[]): RunResult {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: serverDirectory,
    env: process.env,
    encoding: "utf8",
    timeout: runTimeout,
  });
  return { exitCode: result.status, stdout: result.stdout, stderr: result.stderr };
}

function runMainCli(args: string[]): RunResult {
  return runNode("dist/main.js", ["cli", ...args]);
}

function runSowaChat(args: string[]): RunResult {
  return runNode("dist/sowa-chat.js", args);
}

function outputOf(result: RunResult): string {
  return `exit=${result.exitCode}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`;
}

function nonEmptyLines(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function expectSingleServerKey(stdout: string) {
  const lines = nonEmptyLines(stdout);

  expect(lines, stdout).toHaveLength(1);
  expect(parseKey(lines[0] ?? "", "serverKey"), stdout).toBeDefined();
}

function readManifest(): { bin?: Record<string, string> } {
  return JSON.parse(readFileSync(join(serverDirectory, "package.json"), "utf8"));
}

describe("режим cli и программа sowa-chat", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();

  beforeAll(() => {
    const build = spawnSync("pnpm exec turbo run build --filter=@sowa-chat/server", {
      cwd: repositoryRoot,
      shell: true,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    expect(build.status, `${build.stdout}${build.stderr}`).toBe(0);
  }, commandTimeout);

  describe.each([
    ["node dist/main.js cli", runMainCli],
    ["node dist/sowa-chat.js", runSowaChat],
  ])("%s", (_name, run) => {
    it("--help выходит с кодом 0 и выводит справку со списком команд в stdout", () => {
      const result = run(["--help"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toContain("Usage: sowa-chat");
      expect(result.stdout).toContain("key:generate");
    });

    it("без команды выходит с кодом 0 и выводит справку", () => {
      const result = run([]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).toContain("Usage: sowa-chat");
      expect(result.stdout).toContain("key:generate");
    });

    it("неизвестная команда выходит с кодом 1 и пишет unknown command", () => {
      const result = run(["no-such-command"]);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(`${result.stdout}${result.stderr}`).toContain("unknown command");
    });

    it("key:generate выходит с кодом 0 и печатает в stdout одну строку с serverKey", () => {
      const result = run(["key:generate"]);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expectSingleServerKey(result.stdout);
    });

    it("key:generate печатает новый ключ при каждом запуске", () => {
      const first = run(["key:generate"]);
      const second = run(["key:generate"]);

      expect(first.exitCode, outputOf(first)).toBe(0);
      expect(second.exitCode, outputOf(second)).toBe(0);
      expect(first.stdout.trim()).not.toBe(second.stdout.trim());
    });

    it("key:generate не пишет ключ в stderr, где идут логи", () => {
      const result = run(["key:generate"]);
      const key = result.stdout.trim();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(key).not.toBe("");
      expect(result.stderr).not.toContain(key);
    });

    it("key:generate не меняет число строк в projects и api_keys", async () => {
      await createProject(getDataSource());
      const before = await countRows();

      const result = run(["key:generate"]);
      const after = await countRows();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(before.projects).toBe(1);
      expect(after).toEqual(before);
    });
  });

  it("package.json содержит bin.sowa-chat со значением dist/sowa-chat.js", () => {
    expect(readManifest().bin?.["sowa-chat"]).toBe("dist/sowa-chat.js");
  });

  it("первая строка dist/sowa-chat.js — #!/usr/bin/env node", () => {
    const content = readFileSync(join(serverDirectory, "dist", "sowa-chat.js"), "utf8");

    expect(content.split(/\r?\n/)[0]).toBe(shebang);
  });

  describe("runCliInProcess", () => {
    it("key:generate возвращает код 0 и один serverKey в stdout", async () => {
      const result = await runCliInProcess(["key:generate"]);

      expect(result.exitCode, JSON.stringify(result)).toBe(0);
      expectSingleServerKey(result.stdout);
      expect(result.stderr).not.toContain("error:");
    });

    it("возвращает оригинальные process.stdout.write и process.stderr.write", async () => {
      const stdoutWrite = process.stdout.write;
      const stderrWrite = process.stderr.write;

      await runCliInProcess(["key:generate"]);

      expect(process.stdout.write).toBe(stdoutWrite);
      expect(process.stderr.write).toBe(stderrWrite);
    });
  });

  async function countRows(): Promise<{ projects: number; apiKeys: number }> {
    const [projects]: { count: number }[] = await getDataSource().query(
      `SELECT count(*)::int AS count FROM "projects"`,
    );
    const [apiKeys]: { count: number }[] = await getDataSource().query(
      `SELECT count(*)::int AS count FROM "api_keys"`,
    );
    return { projects: projects?.count ?? -1, apiKeys: apiKeys?.count ?? -1 };
  }
});
