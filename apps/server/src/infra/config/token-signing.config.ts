import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const tokenSigningConfig = registerAs("tokenSigning", () => {
  const env = parseEnv(process.env);
  return {
    keys: env.SOWA_TOKEN_SIGNING_KEYS ?? [],
    currentKeyId: env.SOWA_TOKEN_SIGNING_KEY_ID,
  };
});
