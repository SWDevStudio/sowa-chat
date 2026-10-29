import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const developmentSecretsConfig = registerAs("developmentSecrets", () => {
  const env = parseEnv(process.env);
  return { directory: env.SOWA_DEV_SECRETS_DIR };
});
