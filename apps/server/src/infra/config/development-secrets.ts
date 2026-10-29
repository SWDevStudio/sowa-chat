import { generatedSecrets } from "./generated-secrets.js";
import type { GeneratedSecret } from "./generated-secrets.js";
import {
  createDevelopmentSecrets,
  defaultDevelopmentSecretsDirectory,
  readDevelopmentSecrets,
  writeDevelopmentSecrets,
} from "./development-secrets-file.js";
import type { DevelopmentSecrets } from "./development-secrets-file.js";

type Values = Record<string, string>;

function isSet(value: unknown): boolean {
  return value !== undefined && value !== "";
}

function findMissingSecrets(source: Record<string, unknown>): GeneratedSecret[] {
  return generatedSecrets.filter((secret) =>
    secret.variables.every((variable) => !isSet(source[variable])),
  );
}

function resolveDirectory(source: Record<string, unknown>): string {
  const directory = source.SOWA_DEV_SECRETS_DIR;
  if (typeof directory === "string" && directory !== "") {
    return directory;
  }
  return defaultDevelopmentSecretsDirectory;
}

function pickFromFile(secret: GeneratedSecret, fileEnv: Values): Values | undefined {
  const values: Values = {};
  for (const variable of secret.variables) {
    const value = fileEnv[variable];
    if (value === undefined || value === "") {
      return undefined;
    }
    values[variable] = value;
  }
  return values;
}

function generateAll(secrets: GeneratedSecret[]): Values {
  const values: Values = {};
  for (const secret of secrets) {
    Object.assign(values, secret.generate("development"));
  }
  return values;
}

function completeFile(
  directory: string,
  file: DevelopmentSecrets,
  missing: GeneratedSecret[],
): Values {
  const provided: Values = {};
  const generated: Values = {};
  for (const secret of missing) {
    const fromFile = pickFromFile(secret, file.env);
    if (fromFile) {
      Object.assign(provided, fromFile);
    } else {
      Object.assign(generated, secret.generate("development"));
    }
  }
  if (Object.keys(generated).length > 0) {
    writeDevelopmentSecrets(directory, { ...file, env: { ...file.env, ...generated } });
  }
  return { ...provided, ...generated };
}

function createFile(directory: string, missing: GeneratedSecret[]): Values {
  const generated = generateAll(missing);
  if (createDevelopmentSecrets(directory, { env: generated })) {
    return generated;
  }
  const file = readDevelopmentSecrets(directory) ?? { env: {} };
  return completeFile(directory, file, missing);
}

export function provideDevelopmentSecrets(source: Record<string, unknown>): Values {
  if (source.SOWA_ENV !== "development") {
    return {};
  }
  const missing = findMissingSecrets(source);
  if (missing.length === 0) {
    return {};
  }
  const directory = resolveDirectory(source);
  const file = readDevelopmentSecrets(directory);
  if (file === undefined) {
    return createFile(directory, missing);
  }
  return completeFile(directory, file, missing);
}
