import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const appConfig = registerAs("app", () => {
  const env = parseEnv(process.env);
  return { env: env.SOWA_ENV, nodeEnv: env.NODE_ENV };
});
