import { z } from "zod";

const portVariables = [
  "SOWA_PUBLIC_PORT",
  "SOWA_OPERATOR_PORT",
  "SOWA_INTERNAL_PORT",
  "SOWA_MANAGEMENT_PORT",
] as const;

type PortVariable = (typeof portVariables)[number];

const nonEmptyString = z.string().min(1);

function port(defaultValue: number) {
  return z
    .string()
    .regex(/^\d+$/, "must be an integer")
    .transform(Number)
    .pipe(z.number().min(1).max(65535))
    .default(defaultValue);
}

const envObjectSchema = z.object({
  SOWA_ENV: z.enum(["development", "production"]).default("production"),
  NODE_ENV: z.string().optional(),
  SOWA_PUBLIC_PORT: port(8080),
  SOWA_OPERATOR_PORT: port(8081),
  SOWA_INTERNAL_PORT: port(8082),
  SOWA_MANAGEMENT_PORT: port(9090),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  SOWA_S3_ENDPOINT: z.url(),
  SOWA_S3_ACCESS_KEY: nonEmptyString,
  SOWA_S3_SECRET_KEY: nonEmptyString,
  SOWA_S3_BUCKET: nonEmptyString,
});

type EnvObject = z.infer<typeof envObjectSchema>;

function findPortWithSameValue(env: EnvObject, variable: PortVariable): PortVariable | undefined {
  return portVariables.find((other) => other !== variable && env[other] === env[variable]);
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
});

export type Env = z.infer<typeof envSchema>;
