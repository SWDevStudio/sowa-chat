import { z } from "zod";
import { encryptionKeysSchema } from "./encryption-keys.schema.js";
import { tokenSigningKeysSchema } from "./token-signing-keys.schema.js";

const portVariables = [
  "SOWA_PUBLIC_PORT",
  "SOWA_OPERATOR_PORT",
  "SOWA_INTERNAL_PORT",
  "SOWA_MANAGEMENT_PORT",
] as const;

type PortVariable = (typeof portVariables)[number];

const nonEmptyString = z.string().min(1);

const logLevels = ["trace", "debug", "info", "warn", "error", "fatal"] as const;

export type LogLevel = (typeof logLevels)[number];

const logFormats = ["json", "pretty"] as const;

function integerInRange(min: number, max: number, defaultValue: number) {
  return z
    .string()
    .regex(/^\d+$/, "must be an integer")
    .transform(Number)
    .pipe(z.number().min(min).max(max))
    .default(defaultValue);
}

function port(defaultValue: number) {
  return integerInRange(1, 65535, defaultValue);
}

function optionalUrl() {
  return z.preprocess((value) => (value === "" ? undefined : value), z.url().optional());
}

const envObjectSchema = z.object({
  SOWA_ENV: z.enum(["development", "production"]).default("production"),
  NODE_ENV: z.string().optional(),
  SOWA_PUBLIC_PORT: port(8080),
  SOWA_OPERATOR_PORT: port(8081),
  SOWA_INTERNAL_PORT: port(8082),
  SOWA_MANAGEMENT_PORT: port(9090),
  DATABASE_URL: z.url(),
  SOWA_DB_POOL_SIZE: integerInRange(1, 100, 10),
  SOWA_MIGRATION_DATABASE_URL: optionalUrl(),
  REDIS_URL: z.url(),
  SOWA_S3_ENDPOINT: z.url(),
  SOWA_S3_ACCESS_KEY: nonEmptyString,
  SOWA_S3_SECRET_KEY: nonEmptyString,
  SOWA_S3_BUCKET: nonEmptyString,
  SOWA_ENCRYPTION_KEYS: encryptionKeysSchema,
  SOWA_TOKEN_SIGNING_KEYS: tokenSigningKeysSchema,
  SOWA_TOKEN_SIGNING_KEY_ID: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().optional(),
  ),
  SOWA_LOG_LEVEL: z.enum(logLevels).default("info"),
  SOWA_LOG_FORMAT: z.enum(logFormats).default("json"),
  SOWA_SLOW_OPERATION_MS: integerInRange(1, 600000, 500),
});

type EnvObject = z.infer<typeof envObjectSchema>;

function findPortWithSameValue(env: EnvObject, variable: PortVariable): PortVariable | undefined {
  return portVariables.find((other) => other !== variable && env[other] === env[variable]);
}

function checkPrettyLogFormat(env: EnvObject, context: z.RefinementCtx): void {
  if (env.SOWA_LOG_FORMAT !== "pretty" || env.SOWA_ENV !== "production") {
    return;
  }
  context.addIssue({
    code: "custom",
    path: ["SOWA_LOG_FORMAT"],
    message: "pretty is allowed only when SOWA_ENV is development",
  });
}

function checkEncryptionKeysInProduction(env: EnvObject, context: z.RefinementCtx): void {
  if (env.SOWA_ENV !== "production" || env.SOWA_ENCRYPTION_KEYS !== undefined) {
    return;
  }
  context.addIssue({
    code: "custom",
    path: ["SOWA_ENCRYPTION_KEYS"],
    message: "is required when SOWA_ENV is production",
  });
}

function checkTokenSigningKeysInProduction(env: EnvObject, context: z.RefinementCtx): void {
  if (env.SOWA_ENV !== "production" || env.SOWA_TOKEN_SIGNING_KEYS !== undefined) {
    return;
  }
  context.addIssue({
    code: "custom",
    path: ["SOWA_TOKEN_SIGNING_KEYS"],
    message: "is required when SOWA_ENV is production",
  });
}

function checkTokenSigningKeyId(env: EnvObject, context: z.RefinementCtx): void {
  const keyId = env.SOWA_TOKEN_SIGNING_KEY_ID;
  const keys = env.SOWA_TOKEN_SIGNING_KEYS ?? [];
  if (keyId === undefined) {
    if (keys.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["SOWA_TOKEN_SIGNING_KEY_ID"],
        message: "is required when SOWA_TOKEN_SIGNING_KEYS is set",
      });
    }
    return;
  }
  if (keys.some((key) => key.kid === keyId)) {
    return;
  }
  context.addIssue({
    code: "custom",
    path: ["SOWA_TOKEN_SIGNING_KEY_ID"],
    message: "must be one of the kids in SOWA_TOKEN_SIGNING_KEYS",
  });
}

export const envSchema = envObjectSchema.superRefine((env, context) => {
  for (const variable of portVariables) {
    const other = findPortWithSameValue(env, variable);
    if (other) {
      context.addIssue({
        code: "custom",
        path: [variable],
        message: `must differ from ${other}`,
      });
    }
  }
  checkPrettyLogFormat(env, context);
  checkEncryptionKeysInProduction(env, context);
  checkTokenSigningKeysInProduction(env, context);
  checkTokenSigningKeyId(env, context);
});

export type Env = z.infer<typeof envSchema>;
