import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const s3Config = registerAs("s3", () => {
  const env = parseEnv(process.env);
  return {
    endpoint: env.SOWA_S3_ENDPOINT,
    accessKey: env.SOWA_S3_ACCESS_KEY,
    secretKey: env.SOWA_S3_SECRET_KEY,
    bucket: env.SOWA_S3_BUCKET,
  };
});
