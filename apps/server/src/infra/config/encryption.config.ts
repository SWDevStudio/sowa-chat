import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const encryptionConfig = registerAs("encryption", () => {
  const env = parseEnv(process.env);
  return { keys: env.SOWA_ENCRYPTION_KEYS ?? [] };
});
