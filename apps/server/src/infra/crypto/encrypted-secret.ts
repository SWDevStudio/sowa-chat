export interface EncryptedSecret {
  version: number;
  iv: Buffer;
  ciphertext: Buffer;
  tag: Buffer;
}

const IV_LENGTH = 12;
const TAG_LENGTH = 16;
const VERSION_PATTERN = /^v([1-9]\d*)$/;
const BASE64URL_PATTERN = /^[A-Za-z0-9_-]*$/;

export function formatEncryptedSecret(secret: EncryptedSecret): string {
  return [
    `v${secret.version}`,
    secret.iv.toString("base64url"),
    secret.ciphertext.toString("base64url"),
    secret.tag.toString("base64url"),
  ].join(".");
}

export function parseEncryptedSecret(value: string): EncryptedSecret | undefined {
  const parts = value.split(".");
  if (parts.length !== 4) {
    return undefined;
  }
  const [versionPart, ivPart, ciphertextPart, tagPart] = parts;

  const versionMatch = VERSION_PATTERN.exec(versionPart);
  if (versionMatch === null) {
    return undefined;
  }
  if (![ivPart, ciphertextPart, tagPart].every((part) => BASE64URL_PATTERN.test(part))) {
    return undefined;
  }

  const iv = Buffer.from(ivPart, "base64url");
  const tag = Buffer.from(tagPart, "base64url");
  if (iv.length !== IV_LENGTH || tag.length !== TAG_LENGTH) {
    return undefined;
  }

  return {
    version: Number(versionMatch[1]),
    iv,
    ciphertext: Buffer.from(ciphertextPart, "base64url"),
    tag,
  };
}
