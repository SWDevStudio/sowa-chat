import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const environmentChecksConfig = registerAs("environmentChecks", () => {
  const env = parseEnv(process.env);
  return {
    env: env.SOWA_ENV,
    publicUrl: env.SOWA_PUBLIC_URL,
    s3PublicUrl: env.SOWA_S3_PUBLIC_URL,
    databaseUrl: env.DATABASE_URL,
    migrationDatabaseUrl: env.SOWA_MIGRATION_DATABASE_URL,
    s3SecretKey: env.SOWA_S3_SECRET_KEY,
  };
});
