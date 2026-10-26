import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const portsConfig = registerAs("ports", () => {
  const env = parseEnv(process.env);
  return {
    public: env.SOWA_PUBLIC_PORT,
    operator: env.SOWA_OPERATOR_PORT,
    internal: env.SOWA_INTERNAL_PORT,
    management: env.SOWA_MANAGEMENT_PORT,
  };
});
