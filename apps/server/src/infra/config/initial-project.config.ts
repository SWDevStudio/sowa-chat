import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const initialProjectConfig = registerAs("initialProject", () => {
  const env = parseEnv(process.env);
  return {
    projectName: env.SOWA_INIT_PROJECT,
    serverKey: env.SOWA_INIT_SERVER_KEY,
    allowedOrigins: env.SOWA_INIT_ALLOWED_ORIGINS,
    operatorAllowedOrigins: env.SOWA_INIT_OPERATOR_ALLOWED_ORIGINS,
  };
});
