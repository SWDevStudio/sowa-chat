import { z } from "zod";

export interface EncryptionKey {
  version: number;
  key: Buffer;
}

const keyLengthInBytes = 32;
const versionPattern = /^[1-9]\d{0,5}$/;

function reject(context: z.RefinementCtx, message: string): undefined {
  context.addIssue({ code: "custom", message });
  return undefined;
}

function parseEntry(entry: string, context: z.RefinementCtx): EncryptionKey | undefined {
  const parts = entry.split(":");
  if (parts.length !== 2) {
    return reject(context, "must be a comma-separated list of version:key");
  }
  const [versionText, keyText] = parts;
  if (!versionPattern.test(versionText)) {
    return reject(context, "version must be an integer from 1 to 999999");
  }
  const version = Number(versionText);
  const key = Buffer.from(keyText, "base64");
  if (key.length !== keyLengthInBytes || key.toString("base64") !== keyText) {
    return reject(context, `key of version ${version} must be 32 bytes in base64`);
  }
  return { version, key };
}

function parseKeys(value: string, context: z.RefinementCtx): EncryptionKey[] | undefined {
  const keys: EncryptionKey[] = [];
  for (const entry of value.split(",")) {
    const key = parseEntry(entry, context);
    if (key === undefined) {
      return undefined;
    }
    if (keys.some((existing) => existing.version === key.version)) {
      return reject(context, `version ${key.version} is repeated`);
    }
    keys.push(key);
  }
  return keys.sort((first, second) => first.version - second.version);
}

export const encryptionKeysSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z
    .string()
    .transform((value, context) => parseKeys(value, context) ?? z.NEVER)
    .optional(),
);
