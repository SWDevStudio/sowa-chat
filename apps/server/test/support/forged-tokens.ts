import type { KeyObject } from "node:crypto";
import { Logger } from "@nestjs/common";
import { SignJWT, UnsecuredJWT } from "jose";
import type { JWTHeaderParameters, JWTPayload } from "jose";
import type { TokenSigningKey } from "../../src/infra/config/token-signing-keys.schema.js";
import { tokenSigningKeysSchema } from "../../src/infra/config/token-signing-keys.schema.js";

export const test1SigningKey =
  "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";
export const test2SigningKey =
  "test-2:MC4CAQAwBQYDK2VwBCIEICAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/";

export interface ForgedTokenInput {
  header: JWTHeaderParameters;
  payload: JWTPayload;
  key: KeyObject | Uint8Array;
}

export function parseTestSigningKeys(value: string): TokenSigningKey[] {
  const keys = tokenSigningKeysSchema.parse(value);
  if (keys === undefined) {
    throw new Error("test signing keys must parse");
  }
  return keys;
}

export function forgeToken(input: ForgedTokenInput): Promise<string> {
  return new SignJWT(input.payload).setProtectedHeader(input.header).sign(input.key);
}

export function forgeUnsecuredToken(payload: JWTPayload): string {
  return new UnsecuredJWT(payload).encode();
}

function encodePart(value: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

export function replaceHeader(token: string, header: Record<string, unknown>): string {
  const [, payload, signature] = token.split(".");
  return [encodePart(header), payload, signature].join(".");
}

export function replacePayload(token: string, payload: Record<string, unknown>): string {
  const [header, , signature] = token.split(".");
  return [header, encodePart(payload), signature].join(".");
}

export function flipSignatureBit(token: string): string {
  const [header, payload, signature] = token.split(".");
  const bytes = Buffer.from(signature, "base64url");
  bytes[0] ^= 0x01;
  return [header, payload, bytes.toString("base64url")].join(".");
}

export function publicKeyPemBytes(key: TokenSigningKey): Uint8Array {
  const pem = key.publicKey.export({ format: "pem", type: "spki" });
  return new TextEncoder().encode(pem.toString());
}

export function publicKeyRawBytes(key: TokenSigningKey): Uint8Array {
  const jwk = key.publicKey.export({ format: "jwk" });
  return Buffer.from(jwk.x ?? "", "base64url");
}

export function spyOnLogs() {
  return [
    vi.spyOn(console, "log"),
    vi.spyOn(console, "info"),
    vi.spyOn(console, "warn"),
    vi.spyOn(console, "error"),
    vi.spyOn(console, "debug"),
    vi.spyOn(Logger.prototype, "log"),
    vi.spyOn(Logger.prototype, "warn"),
    vi.spyOn(Logger.prototype, "error"),
    vi.spyOn(Logger.prototype, "debug"),
    vi.spyOn(Logger.prototype, "verbose"),
    vi.spyOn(Logger, "log"),
    vi.spyOn(Logger, "warn"),
    vi.spyOn(Logger, "error"),
    vi.spyOn(Logger, "debug"),
    vi.spyOn(Logger, "verbose"),
  ];
}
