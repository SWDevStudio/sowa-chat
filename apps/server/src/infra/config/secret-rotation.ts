import type { z } from "zod";
import { encryptionKeysSchema } from "./encryption-keys.schema.js";
import { generateEncryptionKeyEntry, generateTokenSigningKeyEntry } from "./secret-generators.js";
import { tokenSigningKeysSchema } from "./token-signing-keys.schema.js";

const encryptionKeysName = "SOWA_ENCRYPTION_KEYS";
const tokenSigningKeysName = "SOWA_TOKEN_SIGNING_KEYS";
const tokenSigningKeyIdName = "SOWA_TOKEN_SIGNING_KEY_ID";

type Source = Record<string, string | undefined>;

function requireConfiguredValue(source: Source, name: string): string {
  const value = source[name];
  if (value === undefined || value === "") {
    throw new Error(`${name} is not set: nothing to rotate`);
  }
  return value;
}

function parseVariable<T>(name: string, schema: z.ZodType<T>, text: string): T {
  const result = schema.safeParse(text);
  if (!result.success) {
    throw new Error(`${name}: ${result.error.issues[0]?.message}`);
  }
  return result.data;
}

function rotateEncryptionKeys(text: string): string {
  const keys = parseVariable(encryptionKeysName, encryptionKeysSchema, text) ?? [];
  const nextVersion = Math.max(...keys.map((key) => key.version)) + 1;
  return `${text},${generateEncryptionKeyEntry(nextVersion)}`;
}

function rotateTokenSigningKeys(text: string): { keys: string; kid: string } {
  const keys = parseVariable(tokenSigningKeysName, tokenSigningKeysSchema, text) ?? [];
  const kid = nextTokenSigningKeyId(keys.map((key) => key.kid));
  return { keys: `${text},${generateTokenSigningKeyEntry(kid)}`, kid };
}

export function nextTokenSigningKeyId(kids: readonly string[]): string {
  let counter = kids.length + 1;
  while (kids.includes(`key-${counter}`)) {
    counter += 1;
  }
  return `key-${counter}`;
}

export function rotateSecrets(source: Source): Record<string, string> {
  const encryptionKeys = rotateEncryptionKeys(requireConfiguredValue(source, encryptionKeysName));
  const tokenSigningKeys = rotateTokenSigningKeys(
    requireConfiguredValue(source, tokenSigningKeysName),
  );

  return {
    [encryptionKeysName]: encryptionKeys,
    [tokenSigningKeysName]: tokenSigningKeys.keys,
    [tokenSigningKeyIdName]: tokenSigningKeys.kid,
  };
}

export function rotateConfiguredSecrets(): Record<string, string> {
  return rotateSecrets(process.env);
}
