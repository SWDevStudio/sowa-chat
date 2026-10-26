import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const redisConfig = registerAs("redis", () => {
  const env = parseEnv(process.env);
  return { url: env.REDIS_URL };
});
