import {
  createCipheriv,
  createDecipheriv,
  createSecretKey,
  randomBytes,
  type KeyObject,
} from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { encryptionConfig } from "../config/encryption.config.js";
import {
  authTagLength,
  formatEncryptedSecret,
  ivLength,
  parseEncryptedSecret,
} from "./encrypted-secret.js";

const algorithm = "aes-256-gcm";

interface CurrentKey {
  version: number;
  key: KeyObject;
}

export class SecretDecryptionError extends Error {
  constructor() {
    super("Encrypted secret cannot be decrypted");
  }
}

@Injectable()
export class EncryptionService {
  private readonly keys = new Map<number, KeyObject>();
  private readonly currentKey: CurrentKey | undefined;

  constructor(@Inject(encryptionConfig.KEY) config: ConfigType<typeof encryptionConfig>) {
    for (const { version, key } of config.keys) {
      const secretKey = createSecretKey(key);
      this.keys.set(version, secretKey);
      if (this.currentKey === undefined || version > this.currentKey.version) {
        this.currentKey = { version, key: secretKey };
      }
    }
  }

  encrypt(plaintext: string): string {
    if (this.currentKey === undefined) {
      throw new Error("SOWA_ENCRYPTION_KEYS is not set");
    }

    const iv = randomBytes(ivLength);
    const cipher = createCipheriv(algorithm, this.currentKey.key, iv, { authTagLength });
    const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);

    return formatEncryptedSecret({
      version: this.currentKey.version,
      iv,
      ciphertext,
      tag: cipher.getAuthTag(),
    });
  }

  decrypt(value: string): string {
    const secret = parseEncryptedSecret(value);
    if (secret === undefined) {
      throw new SecretDecryptionError();
    }
    const key = this.keys.get(secret.version);
    if (key === undefined) {
      throw new SecretDecryptionError();
    }

    try {
      const decipher = createDecipheriv(algorithm, key, secret.iv, { authTagLength });
      decipher.setAuthTag(secret.tag);
      return Buffer.concat([decipher.update(secret.ciphertext), decipher.final()]).toString("utf8");
    } catch {
      throw new SecretDecryptionError();
    }
  }
}
