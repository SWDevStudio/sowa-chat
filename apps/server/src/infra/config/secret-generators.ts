import { generateKeyPairSync, randomBytes } from "node:crypto";

const encryptionKeyLengthInBytes = 32;

export function generateEncryptionKeyEntry(version: number): string {
  const key = randomBytes(encryptionKeyLengthInBytes).toString("base64");
  return `${version}:${key}`;
}

export function generateTokenSigningKeyEntry(kid: string): string {
  const { privateKey } = generateKeyPairSync("ed25519");
  const der = privateKey.export({ format: "der", type: "pkcs8" }).toString("base64");
  return `${kid}:${der}`;
}
