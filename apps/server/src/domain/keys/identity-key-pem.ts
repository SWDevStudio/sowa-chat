import { createPublicKey } from "node:crypto";
import type { KeyObject } from "node:crypto";
import { exportJWK } from "jose";
import type { JWK } from "jose";
import type { IdentityKeyAlgorithm } from "./identity-key.entity.js";

const publicKeyHeader = "-----BEGIN PUBLIC KEY-----";
const privateKeyMarker = "PRIVATE KEY";
const publicKeyRequiredMessage =
  "Identity key file must contain a public key in PEM format (BEGIN PUBLIC KEY)";
const unsupportedKeyMessage = "Unsupported identity key: use Ed25519 or ECDSA P-256";

export interface ParsedIdentityKey {
  alg: IdentityKeyAlgorithm;
  publicKey: JWK;
}

export class InvalidIdentityKeyError extends Error {}

export async function parseIdentityPublicKey(pem: string): Promise<ParsedIdentityKey> {
  const keyObject = readPublicKeyObject(pem);
  const alg = algorithmOf(keyObject);
  const publicKey = await exportJWK(keyObject);
  return { alg, publicKey };
}

function readPublicKeyObject(pem: string): KeyObject {
  if (!pem.includes(publicKeyHeader) || pem.includes(privateKeyMarker)) {
    throw new InvalidIdentityKeyError(publicKeyRequiredMessage);
  }
  try {
    return createPublicKey({ key: pem, format: "pem" });
  } catch {
    throw new InvalidIdentityKeyError(publicKeyRequiredMessage);
  }
}

function algorithmOf(keyObject: KeyObject): IdentityKeyAlgorithm {
  if (keyObject.asymmetricKeyType === "ed25519") {
    return "EdDSA";
  }
  if (isP256(keyObject)) {
    return "ES256";
  }
  throw new InvalidIdentityKeyError(unsupportedKeyMessage);
}

function isP256(keyObject: KeyObject): boolean {
  return (
    keyObject.asymmetricKeyType === "ec" &&
    keyObject.asymmetricKeyDetails?.namedCurve === "prime256v1"
  );
}
