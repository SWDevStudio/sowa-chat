import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

export const defaultDevelopmentSecretsDirectory = ".sowa-dev";
export const developmentSecretsFileName = "secrets.json";

const directoryMode = 0o700;
const fileMode = 0o600;

const developmentSecretsSchema = z.object({
  env: z.record(z.string(), z.string()),
  mainProject: z.object({ publicKey: z.string(), serverKey: z.string() }).optional(),
});

export interface DevelopmentMainProject {
  publicKey: string;
  serverKey: string;
}

export interface DevelopmentSecrets {
  env: Record<string, string>;
  mainProject?: DevelopmentMainProject;
}

export class InvalidDevelopmentSecretsError extends Error {}

function hasErrorCode(error: unknown, code: string): boolean {
  return error instanceof Error && "code" in error && error.code === code;
}

function serialize(secrets: DevelopmentSecrets): string {
  return `${JSON.stringify(secrets, null, 2)}\n`;
}

function parseDevelopmentSecrets(text: string, path: string): DevelopmentSecrets {
  const invalid = new InvalidDevelopmentSecretsError(
    `Development secrets file ${path} is not valid: fix or delete it`,
  );
  let content: unknown;
  try {
    content = JSON.parse(text);
  } catch {
    throw invalid;
  }
  const result = developmentSecretsSchema.safeParse(content);
  if (!result.success) {
    throw invalid;
  }
  return result.data;
}

export function developmentSecretsPath(directory: string): string {
  return join(directory, developmentSecretsFileName);
}

export function readDevelopmentSecrets(directory: string): DevelopmentSecrets | undefined {
  const path = developmentSecretsPath(directory);
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    if (hasErrorCode(error, "ENOENT")) {
      return undefined;
    }
    throw error;
  }
  return parseDevelopmentSecrets(text, path);
}

export function createDevelopmentSecrets(directory: string, secrets: DevelopmentSecrets): boolean {
  mkdirSync(directory, { recursive: true, mode: directoryMode });
  try {
    writeFileSync(developmentSecretsPath(directory), serialize(secrets), {
      flag: "wx",
      mode: fileMode,
    });
    return true;
  } catch (error) {
    if (hasErrorCode(error, "EEXIST")) {
      return false;
    }
    throw error;
  }
}

export function writeDevelopmentSecrets(directory: string, secrets: DevelopmentSecrets): void {
  mkdirSync(directory, { recursive: true, mode: directoryMode });
  const path = developmentSecretsPath(directory);
  const temporaryPath = `${path}.${process.pid}.tmp`;
  writeFileSync(temporaryPath, serialize(secrets), { mode: fileMode });
  renameSync(temporaryPath, path);
}
