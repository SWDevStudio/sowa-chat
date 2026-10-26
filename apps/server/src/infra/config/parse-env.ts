import { envSchema } from "./env.schema.js";
import type { Env } from "./env.schema.js";

export function parseEnv(source: Record<string, unknown>): Env {
  const result = envSchema.safeParse(source);
  if (result.success) {
    return result.data;
  }
  const problems = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
  throw new Error(`Invalid environment variables:\n${problems.join("\n")}`);
}
