import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const databaseConfig = registerAs("database", () => {
  const env = parseEnv(process.env);
  return { url: env.DATABASE_URL };
});
