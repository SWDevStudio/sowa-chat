import { randomBytes } from "node:crypto";
import { crc32 } from "node:zlib";
import { base62Alphabet, encodeBase62 } from "./base62.js";

export const keyTypes = ["publicKey", "serverKey", "botKey", "webhookSecret"] as const;
export type KeyType = (typeof keyTypes)[number];

export const keyPrefixes: Record<KeyType, string> = {
  publicKey: "pk",
  serverKey: "sk",
  botKey: "bk",
  webhookSecret: "whsec",
};

export interface ParsedKey {
  type: KeyType;
  text: string;
  lookupPrefix: string;
}

const keyRandomBytes = 32;
const bodyLength = 43;
const checksumLength = 6;
const lookupBodyLength = 12;

export function generateKey(type: KeyType): string {
  const prefix = keyPrefixes[type];
  const body = encodeBase62(BigInt(`0x${randomBytes(keyRandomBytes).toString("hex")}`), bodyLength);
  return `${prefix}_${body}_${computeChecksum(prefix, body)}`;
}

export function parseKey(text: string, type: KeyType): ParsedKey | undefined {
  const prefix = keyPrefixes[type];
  if (!text.startsWith(`${prefix}_`)) {
    return undefined;
  }
  const parts = text.slice(prefix.length + 1).split("_");
  if (parts.length !== 2) {
    return undefined;
  }
  const [body = "", checksum = ""] = parts;
  if (!isBase62(body, bodyLength) || !isBase62(checksum, checksumLength)) {
    return undefined;
  }
  if (checksum !== computeChecksum(prefix, body)) {
    return undefined;
  }
  return { type, text, lookupPrefix: `${prefix}_${body.slice(0, lookupBodyLength)}` };
}

function computeChecksum(prefix: string, body: string): string {
  return encodeBase62(BigInt(crc32(`${prefix}_${body}`)), checksumLength);
}

function isBase62(text: string, length: number): boolean {
  return text.length === length && [...text].every((char) => base62Alphabet.includes(char));
}
