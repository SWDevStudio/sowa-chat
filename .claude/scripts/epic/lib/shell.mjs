import { spawnSync } from "node:child_process";

export function run(command, cwd) {
  const result = spawnSync(command, {
    cwd,
    shell: true,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  return { ok: result.status === 0, output };
}

export function runOrFail(command, cwd) {
  const result = run(command, cwd);
  if (!result.ok) {
    throw new Error(`${command}\n${result.output}`);
  }
  return result.output.trim();
}

export function quote(value) {
  return `"${value}"`;
}

export function quoteAll(values) {
  return values.map(quote).join(" ");
}

export function outputLines(output) {
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "");
}
