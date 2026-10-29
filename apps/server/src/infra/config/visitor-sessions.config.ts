import { registerAs } from "@nestjs/config";
import { parseEnv } from "./parse-env.js";

export const visitorSessionsConfig = registerAs("visitorSessions", () => {
  const env = parseEnv(process.env);
  return { refreshTtlDays: env.SOWA_VISITOR_REFRESH_TTL_DAYS };
});
