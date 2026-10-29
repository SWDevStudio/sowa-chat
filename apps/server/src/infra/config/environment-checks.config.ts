import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const environmentChecksConfig = registerAs("environmentChecks", () => {
  const env = parseEnv(process.env);
  return { env: env.SOWA_ENV };
});
