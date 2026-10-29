import { crc32 } from "node:zlib";
import { base62Alphabet, encodeBase62 } from "../../src/domain/keys/base62.js";

export function forgeKeyWithSameLookupPrefix(key: string): string {
  const [prefix = "", body = ""] = key.split("_");
  const index = 30;
  const replacement = base62Alphabet.split("").find((char) => char !== body[index]) ?? "0";
  const forgedBody = body.slice(0, index) + replacement + body.slice(index + 1);
  const checksum = encodeBase62(BigInt(crc32(`${prefix}_${forgedBody}`)), 6);
  return `${prefix}_${forgedBody}_${checksum}`;
}
