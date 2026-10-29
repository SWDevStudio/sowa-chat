import { provideDevelopmentSecrets } from "./development-secrets.js";
import type { Env } from "./env.schema.js";
import { parseEnv } from "./parse-env.js";

function exportToProcessEnv(
  source: Record<string, unknown>,
  secrets: Record<string, string>,
): void {
  for (const [name, value] of Object.entries(source)) {
    if (typeof value === "string" && !(name in process.env)) {
      process.env[name] = value;
    }
  }
  Object.assign(process.env, secrets);
}

export function loadEnv(source: Record<string, unknown>): Env {
  const secrets = provideDevelopmentSecrets(source);
  exportToProcessEnv(source, secrets);
  return parseEnv({ ...source, ...secrets });
}
