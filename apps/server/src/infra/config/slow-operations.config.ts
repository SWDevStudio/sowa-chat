import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const slowOperationsConfig = registerAs("slowOperations", () => {
  const env = parseEnv(process.env);
  return { thresholdMs: env.SOWA_SLOW_OPERATION_MS };
});
