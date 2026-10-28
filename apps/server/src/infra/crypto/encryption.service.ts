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
import { formatEncryptedSecret, parseEncryptedSecret } from "./encrypted-secret.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

export class SecretDecryptionError extends Error {
  constructor() {
    super("Encrypted secret cannot be decrypted");
  }
}

@Injectable()
export class EncryptionService {
  private readonly keys = new Map<number, KeyObject>();
  private readonly currentVersion: number | undefined;

  constructor(@Inject(encryptionConfig.KEY) config: ConfigType<typeof encryptionConfig>) {
    for (const { version, key } of config.keys) {
      this.keys.set(version, createSecretKey(key));
    }
    this.currentVersion = this.keys.size === 0 ? undefined : Math.max(...this.keys.keys());
  }

  encrypt(plaintext: string): string {
    const key = this.currentVersion === undefined ? undefined : this.keys.get(this.currentVersion);
    if (this.currentVersion === undefined || key === undefined) {
      throw new Error("SOWA_ENCRYPTION_KEYS is not set");
    }

    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);

    return formatEncryptedSecret({
      version: this.currentVersion,
      iv,
      ciphertext,
      tag: cipher.getAuthTag(),
    });
  }

  decrypt(value: string): string {
    const secret = parseEncryptedSecret(value);
    const key = secret === undefined ? undefined : this.keys.get(secret.version);
    if (secret === undefined || key === undefined) {
      throw new SecretDecryptionError();
    }

    try {
      const decipher = createDecipheriv(ALGORITHM, key, secret.iv, {
        authTagLength: AUTH_TAG_LENGTH,
      });
      decipher.setAuthTag(secret.tag);
      return Buffer.concat([decipher.update(secret.ciphertext), decipher.final()]).toString("utf8");
    } catch {
      throw new SecretDecryptionError();
    }
  }
}
