import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const loggingConfig = registerAs("logging", () => {
  const env = parseEnv(process.env);
  return { level: env.SOWA_LOG_LEVEL, format: env.SOWA_LOG_FORMAT };
});
