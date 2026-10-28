import { createHash } from "node:crypto";

export function hashKey(key: string): Buffer {
  return createHash("sha256").update(key).digest();
}
