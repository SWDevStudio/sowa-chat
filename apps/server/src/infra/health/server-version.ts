import { readFileSync } from "node:fs";

export function readServerVersion(): string {
  const packageJson = readFileSync(new URL("../../../package.json", import.meta.url), "utf8");
  return (JSON.parse(packageJson) as { version: string }).version;
}
