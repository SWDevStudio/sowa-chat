import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const databaseConfig = registerAs("database", () => {
  const env = parseEnv(process.env);
  return {
    url: env.DATABASE_URL,
    poolSize: env.SOWA_DB_POOL_SIZE,
    migrationUrl: env.SOWA_MIGRATION_DATABASE_URL ?? env.DATABASE_URL,
  };
});
