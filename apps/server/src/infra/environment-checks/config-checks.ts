import type { CheckContext, CheckFinding, EnvironmentCheck } from "./environment-check.js";

export const exampleSecretValues = {
  s3SecretKey: "sowa-dev-secret",
  databasePassword: "sowa",
} as const;

function checkHttps(name: string, value: string | undefined): CheckFinding[] {
  if (value === undefined || new URL(value).protocol === "https:") {
    return [];
  }
  return [
    { level: "stop", message: `${name} must use https in production: set an https:// address` },
  ];
}

function checkDatabasePassword(name: string, url: string | undefined): CheckFinding[] {
  if (url === undefined) {
    return [];
  }
  const password = decodeURIComponent(new URL(url).password);
  if (password !== exampleSecretValues.databasePassword) {
    return [];
  }
  return [
    {
      level: "stop",
      message: `${name} uses the example password from .env.example: set your own database password`,
    },
  ];
}

function checkS3SecretKey(secretKey: string): CheckFinding[] {
  if (secretKey !== exampleSecretValues.s3SecretKey) {
    return [];
  }
  return [
    {
      level: "stop",
      message: "SOWA_S3_SECRET_KEY has the example value from .env.example: set your own secret",
    },
  ];
}

export const publicUrlsHttpsCheck: EnvironmentCheck = {
  name: "publicUrlsHttps",
  onlyInDoctor: false,
  run: async ({ settings }: CheckContext) => {
    if (settings.env === "development") {
      return [];
    }
    return [
      ...checkHttps("SOWA_PUBLIC_URL", settings.publicUrl),
      ...checkHttps("SOWA_S3_PUBLIC_URL", settings.s3PublicUrl),
    ];
  },
};

export const exampleSecretsCheck: EnvironmentCheck = {
  name: "exampleSecrets",
  onlyInDoctor: false,
  run: async ({ settings }: CheckContext) => {
    if (settings.env === "development") {
      return [];
    }
    return [
      ...checkS3SecretKey(settings.s3SecretKey),
      ...checkDatabasePassword("DATABASE_URL", settings.databaseUrl),
      ...checkDatabasePassword("SOWA_MIGRATION_DATABASE_URL", settings.migrationDatabaseUrl),
    ];
  },
};

export const s3PublicUrlCheck: EnvironmentCheck = {
  name: "s3PublicUrl",
  onlyInDoctor: false,
  run: async ({ settings }: CheckContext) => {
    if (settings.env === "development" || settings.s3PublicUrl !== undefined) {
      return [];
    }
    return [
      {
        level: "warn",
        message:
          "SOWA_S3_PUBLIC_URL is not set: browsers cannot open file links until it is the public https address of the storage",
      },
    ];
  },
};
