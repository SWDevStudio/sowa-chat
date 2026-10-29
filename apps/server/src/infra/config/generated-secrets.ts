import type { Env } from "./env.schema.js";
import { generateEncryptionKeyEntry, generateTokenSigningKeyEntry } from "./secret-generators.js";

export type SecretsMode = Env["SOWA_ENV"];

export interface GeneratedSecret {
  variables: readonly string[];
  generate: (mode: SecretsMode) => Record<string, string>;
}

export const firstTokenSigningKeyIds: Record<SecretsMode, string> = {
  development: "dev-1",
  production: "key-1",
};

export const generatedSecrets: readonly GeneratedSecret[] = [
  {
    variables: ["SOWA_ENCRYPTION_KEYS"],
    generate: () => ({ SOWA_ENCRYPTION_KEYS: generateEncryptionKeyEntry(1) }),
  },
  {
    variables: ["SOWA_TOKEN_SIGNING_KEYS", "SOWA_TOKEN_SIGNING_KEY_ID"],
    generate: (mode) => {
      const kid = firstTokenSigningKeyIds[mode];
      return {
        SOWA_TOKEN_SIGNING_KEYS: generateTokenSigningKeyEntry(kid),
        SOWA_TOKEN_SIGNING_KEY_ID: kid,
      };
    },
  },
];
