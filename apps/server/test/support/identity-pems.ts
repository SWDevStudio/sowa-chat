import { generateKeyPairSync } from "node:crypto";
import type { KeyObject } from "node:crypto";

export interface IdentityKeyPems {
  publicPem: string;
  privatePem: string;
}

function exportPems(publicKey: KeyObject, privateKey: KeyObject): IdentityKeyPems {
  return {
    publicPem: publicKey.export({ type: "spki", format: "pem" }).toString(),
    privatePem: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
  };
}

export function generateEd25519Pems(): IdentityKeyPems {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return exportPems(publicKey, privateKey);
}

export function generateP256Pems(): IdentityKeyPems {
  const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  return exportPems(publicKey, privateKey);
}
