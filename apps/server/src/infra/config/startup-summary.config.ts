import { registerAs } from "@nestjs/config";
import { readDevelopmentSecrets } from "./development-secrets-file.js";
import { parseEnv } from "./parse-env.js";

export type SecretStatus = "set" | "notSet" | "generatedForDevelopment";

export const summarizedSecrets = [
  "SOWA_ENCRYPTION_KEYS",
  "SOWA_TOKEN_SIGNING_KEYS",
  "SOWA_INIT_SERVER_KEY",
] as const;

export const startupSummaryConfig = registerAs("startupSummary", () => {
  const env = parseEnv(process.env);
  const generated =
    env.SOWA_ENV === "development"
      ? (readDevelopmentSecrets(env.SOWA_DEV_SECRETS_DIR)?.env ?? {})
      : {};
  return {
    env: env.SOWA_ENV,
    secrets: summarizedSecrets.map((name) => ({
      name,
      status: secretStatus(process.env[name], generated[name]),
    })),
  };
});

function secretStatus(value: string | undefined, generatedValue: string | undefined): SecretStatus {
  if (value === undefined || value === "") {
    return "notSet";
  }
  return value === generatedValue ? "generatedForDevelopment" : "set";
}
