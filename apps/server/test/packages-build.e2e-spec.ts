import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const buildTimeout = 600_000;

const entriesByPackage: Record<string, string[]> = {
  protocol: ["index"],
  sdk: ["index", "visitor/index", "operator/index"],
  "bot-sdk": ["index"],
  "server-sdk": ["index"],
};

const builtFiles = Object.entries(entriesByPackage).flatMap(([packageDirectory, entries]) =>
  entries.flatMap((entry) =>
    [".js", ".cjs", ".d.ts"].map(
      (extension) => `packages/${packageDirectory}/dist/${entry}${extension}`,
    ),
  ),
);

interface CommandResult {
  exitCode: number | null;
  stdout: string;
  output: string;
}

interface PlannedTask {
  package: string;
  cache: { status: string };
}

function runInRoot(command: string): CommandResult {
  const result = spawnSync(command, {
    cwd: repositoryRoot,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return {
    exitCode: result.status,
    stdout: result.stdout,
    output: `${result.stdout}${result.stderr}`,
  };
}

function readBuiltFile(relativePath: string): string {
  return readFileSync(join(repositoryRoot, relativePath), "utf8");
}

function plannedBuildTasks(): PlannedTask[] {
  const result = runInRoot("pnpm exec turbo run build --dry=json");
  return JSON.parse(result.stdout).tasks;
}

describe("pnpm build для пакетов", { timeout: buildTimeout }, () => {
  let buildResult: CommandResult;

  beforeAll(() => {
    for (const packageDirectory of Object.keys(entriesByPackage)) {
      rmSync(join(repositoryRoot, "packages", packageDirectory, "dist"), {
        recursive: true,
        force: true,
      });
    }
    buildResult = runInRoot("pnpm build");
  }, buildTimeout);

  it("проходит", () => {
    expect(buildResult.exitCode, buildResult.output).toBe(0);
  });

  it.each(builtFiles)("собирает %s", (relativePath) => {
    expect(existsSync(join(repositoryRoot, relativePath))).toBe(true);
  });

  it("подключает zod в ESM-сборке protocol через import, а не встраивает", () => {
    expect(readBuiltFile("packages/protocol/dist/index.js")).toMatch(
      /from\s*["']zod(\/[\w-]+)?["']/,
    );
  });

  it("подключает zod в CJS-сборке protocol через require, а не встраивает", () => {
    expect(readBuiltFile("packages/protocol/dist/index.cjs")).toMatch(
      /require\(\s*["']zod(\/[\w-]+)?["']\s*\)/,
    );
  });

  it("при повторной сборке без изменений берёт пакеты из кэша turbo", () => {
    const cacheStatusByPackage = new Map(
      plannedBuildTasks().map((task) => [task.package, task.cache.status]),
    );

    for (const packageDirectory of Object.keys(entriesByPackage)) {
      expect(cacheStatusByPackage.get(`@sowa-chat/${packageDirectory}`)).toBe("HIT");
    }
  });
});
