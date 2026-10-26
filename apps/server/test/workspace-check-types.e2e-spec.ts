import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "../../..");
const probeFileName = "acceptance-probe.ts";
const librariesWithOwnChecks = ["protocol", "sdk", "bot-sdk", "server-sdk"];

interface CommandResult {
  exitCode: number | null;
  stdout: string;
  output: string;
}

interface PlannedTask {
  package: string;
  command: string;
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

function probePath(packageDirectory: string): string {
  return join(repositoryRoot, "packages", packageDirectory, "src", probeFileName);
}

function writeProbe(packageDirectory: string, source: string): void {
  writeFileSync(probePath(packageDirectory), source);
}

function plannedCheckTypesTasks(): PlannedTask[] {
  const result = runInRoot("pnpm exec turbo run check-types --dry=json");
  return JSON.parse(result.stdout).tasks;
}

describe("pnpm check-types во всех пакетах", { timeout: 300_000 }, () => {
  afterEach(() => {
    for (const packageDirectory of librariesWithOwnChecks) {
      rmSync(probePath(packageDirectory), { force: true });
    }
  });

  it("запускает проверку типов в пяти пакетах", () => {
    const commandsByPackage = new Map(
      plannedCheckTypesTasks().map((task) => [task.package, task.command]),
    );

    expect(commandsByPackage.get("@sowa-chat/server")).toBe("tsc --noEmit");
    for (const packageDirectory of librariesWithOwnChecks) {
      expect(commandsByPackage.get(`@sowa-chat/${packageDirectory}`)).toBe("tsc --noEmit");
    }
  });

  it("проходит без ошибок", () => {
    const result = runInRoot("pnpm check-types");

    expect(result.exitCode, result.output).toBe(0);
  });

  it.each(librariesWithOwnChecks)("падает на ошибке типов в пакете %s", (packageDirectory) => {
    writeProbe(packageDirectory, 'export const acceptanceProbe: number = "text";\n');

    const result = runInRoot("pnpm check-types");

    expect(result.exitCode).not.toBe(0);
    expect(result.output).toMatch(/acceptance-probe\.ts.*error TS2322/);
  });

  it("в protocol нет типов window", () => {
    writeProbe("protocol", "export const acceptanceProbe = window;\n");

    const result = runInRoot("pnpm check-types");

    expect(result.exitCode).not.toBe(0);
    expect(result.output).toContain("Cannot find name 'window'");
  });

  it("в protocol нет типов process", () => {
    writeProbe("protocol", "export const acceptanceProbe = process.env;\n");

    const result = runInRoot("pnpm check-types");

    expect(result.exitCode).not.toBe(0);
    expect(result.output).toContain("Cannot find name 'process'");
  });

  it("в sdk есть типы DOM", () => {
    writeProbe("sdk", "export const acceptanceProbe = (): Document => window.document;\n");

    const result = runInRoot("pnpm check-types");

    expect(result.exitCode, result.output).toBe(0);
  });

  it.each(["bot-sdk", "server-sdk"])("в %s есть типы Node.js", (packageDirectory) => {
    writeProbe(packageDirectory, "export const acceptanceProbe = (): string => process.version;\n");

    const result = runInRoot("pnpm check-types");

    expect(result.exitCode, result.output).toBe(0);
  });
});
