import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { DevelopmentSecrets } from "../../src/infra/config/development-secrets-file.js";
import { developmentSecretsPath } from "../../src/infra/config/development-secrets-file.js";

export const testEncryptionKeys = "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=";
export const testTokenSigningKeys =
  "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";
export const testTokenSigningKeyId = "test-1";

export const allTestSecrets: Record<string, string> = {
  SOWA_ENCRYPTION_KEYS: testEncryptionKeys,
  SOWA_TOKEN_SIGNING_KEYS: testTokenSigningKeys,
  SOWA_TOKEN_SIGNING_KEY_ID: testTokenSigningKeyId,
};

export const fileSecrets: Record<string, string> = {
  SOWA_ENCRYPTION_KEYS: "1:ISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISE=",
  SOWA_TOKEN_SIGNING_KEYS: testTokenSigningKeys.replace("test-1", "dev-1"),
  SOWA_TOKEN_SIGNING_KEY_ID: "dev-1",
};

export const fileMainProject = { publicKey: "pk_file", serverKey: "sk_file" };

export const emptySecrets: Record<string, string> = {
  SOWA_ENCRYPTION_KEYS: "",
  SOWA_TOKEN_SIGNING_KEYS: "",
  SOWA_TOKEN_SIGNING_KEY_ID: "",
};

export const developmentEnvWithoutSecrets: Record<string, string> = {
  NODE_ENV: "test",
  SOWA_ENV: "development",
  SOWA_PUBLIC_PORT: "18080",
  SOWA_OPERATOR_PORT: "18081",
  SOWA_INTERNAL_PORT: "18082",
  SOWA_MANAGEMENT_PORT: "19090",
  DATABASE_URL: "postgres://test:test@127.0.0.1:5432/test",
  REDIS_URL: "redis://127.0.0.1:6380",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:9333",
  SOWA_S3_ACCESS_KEY: "test-access",
  SOWA_S3_SECRET_KEY: "test-secret",
  SOWA_S3_BUCKET: "test-bucket",
};

export function thrownMessage(action: () => unknown): string {
  try {
    action();
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
  return "";
}

export function createSecretsDirectory(): string {
  return mkdtempSync(join(tmpdir(), "sowa-dev-secrets-"));
}

export function removeSecretsDirectory(directory: string): void {
  rmSync(directory, { recursive: true, force: true });
}

export function listSecretsDirectory(directory: string): string[] {
  return readdirSync(directory);
}

export function readSecretsFileText(directory: string): string {
  return readFileSync(developmentSecretsPath(directory), "utf8");
}

export function readSecretsFile(directory: string): DevelopmentSecrets {
  return JSON.parse(readSecretsFileText(directory)) as DevelopmentSecrets;
}

export function writeCompactSecretsFile(directory: string, secrets: DevelopmentSecrets): string {
  const text = JSON.stringify(secrets);
  writeFileSync(developmentSecretsPath(directory), text);
  return text;
}

export function writeBrokenSecretsFile(directory: string): void {
  writeFileSync(developmentSecretsPath(directory), "{");
}

export function developmentSource(
  directory: string,
  overrides: Record<string, string | undefined> = {},
): Record<string, unknown> {
  return { ...developmentEnvWithoutSecrets, SOWA_DEV_SECRETS_DIR: directory, ...overrides };
}

export function stubDevelopmentEnv(
  directory: string,
  overrides: Record<string, string | undefined> = {},
): void {
  const env = {
    ...developmentEnvWithoutSecrets,
    ...emptySecrets,
    SOWA_DEV_SECRETS_DIR: directory,
    ...overrides,
  };
  for (const [name, value] of Object.entries(env)) {
    vi.stubEnv(name, value);
  }
}
