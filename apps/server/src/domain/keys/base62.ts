export const base62Alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const base = BigInt(base62Alphabet.length);

export function encodeBase62(value: bigint, length: number): string {
  const digits: string[] = [];
  let rest = value;
  while (rest > 0n) {
    digits.unshift(base62Alphabet.charAt(Number(rest % base)));
    rest /= base;
  }
  if (digits.length > length) {
    throw new Error("Value does not fit into base62 length");
  }
  return digits.join("").padStart(length, "0");
}
