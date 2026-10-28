import { createPrivateKey, createPublicKey } from "node:crypto";
import type { KeyObject } from "node:crypto";
import { z } from "zod";

export interface TokenSigningKey {
  kid: string;
  privateKey: KeyObject;
  publicKey: KeyObject;
}

const kidPattern = /^[A-Za-z0-9_-]{1,64}$/;

function reject(context: z.RefinementCtx, message: string): undefined {
  context.addIssue({ code: "custom", message });
  return undefined;
}

function parsePrivateKey(keyText: string): KeyObject | undefined {
  const der = Buffer.from(keyText, "base64");
  if (der.toString("base64") !== keyText) {
    return undefined;
  }
  try {
    const privateKey = createPrivateKey({ key: der, format: "der", type: "pkcs8" });
    return privateKey.asymmetricKeyType === "ed25519" ? privateKey : undefined;
  } catch {
    return undefined;
  }
}

function parseEntry(entry: string, context: z.RefinementCtx): TokenSigningKey | undefined {
  const parts = entry.split(":");
  if (parts.length !== 2) {
    return reject(context, "must be a comma-separated list of kid:key");
  }
  const [kid, keyText] = parts;
  if (!kidPattern.test(kid)) {
    return reject(context, "kid must be 1-64 characters: letters, digits, _ or -");
  }
  const privateKey = parsePrivateKey(keyText);
  if (privateKey === undefined) {
    return reject(context, `key of kid ${kid} must be an Ed25519 private key in PKCS8 DER base64`);
  }
  return { kid, privateKey, publicKey: createPublicKey(privateKey) };
}

function parseKeys(value: string, context: z.RefinementCtx): TokenSigningKey[] | undefined {
  const keys: TokenSigningKey[] = [];
  for (const entry of value.split(",")) {
    const key = parseEntry(entry, context);
    if (key === undefined) {
      return undefined;
    }
    if (keys.some((existing) => existing.kid === key.kid)) {
      return reject(context, `kid ${key.kid} is repeated`);
    }
    keys.push(key);
  }
  return keys;
}

export const tokenSigningKeysSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z
    .string()
    .transform((value, context) => parseKeys(value, context) ?? z.NEVER)
    .optional(),
);
