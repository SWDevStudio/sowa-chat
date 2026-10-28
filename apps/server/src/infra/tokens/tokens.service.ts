import type { KeyObject } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { SignJWT, jwtVerify } from "jose";
import type { JWTHeaderParameters, JWTPayload } from "jose";
import type { TokenSigningKey } from "../config/token-signing-keys.schema.js";
import { tokenSigningConfig } from "../config/token-signing.config.js";

export const tokenAudiences = ["operator", "visitor"] as const;
export type TokenAudience = (typeof tokenAudiences)[number];

export interface SignTokenInput {
  audience: TokenAudience;
  subject: string;
  claims: Record<string, string>;
  ttlSeconds: number;
}

export interface SignedToken {
  token: string;
  expiresAt: Date;
}

export interface VerifiedToken {
  subject: string;
  claims: JWTPayload;
}

@Injectable()
export class TokensService {
  private readonly publicKeys = new Map<string, KeyObject>();
  private readonly currentKey: TokenSigningKey | undefined;

  constructor(@Inject(tokenSigningConfig.KEY) config: ConfigType<typeof tokenSigningConfig>) {
    for (const { kid, publicKey } of config.keys) {
      this.publicKeys.set(kid, publicKey);
    }
    this.currentKey = config.keys.find(({ kid }) => kid === config.currentKeyId);
  }

  async sign(input: SignTokenInput): Promise<SignedToken> {
    if (this.currentKey === undefined) {
      throw new Error("SOWA_TOKEN_SIGNING_KEYS is not set");
    }

    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + input.ttlSeconds;
    const token = await new SignJWT({ ...input.claims })
      .setProtectedHeader({ alg: "EdDSA", kid: this.currentKey.kid, typ: "JWT" })
      .setSubject(input.subject)
      .setAudience(input.audience)
      .setIssuedAt(issuedAt)
      .setExpirationTime(expiresAt)
      .sign(this.currentKey.privateKey);

    return { token, expiresAt: new Date(expiresAt * 1000) };
  }

  async verify(token: string, audience: TokenAudience): Promise<VerifiedToken | undefined> {
    try {
      const { payload } = await jwtVerify(token, (header) => this.findPublicKey(header), {
        algorithms: ["EdDSA"],
        audience,
        requiredClaims: ["sub", "exp", "iat"],
      });
      if (payload.sub === undefined) {
        return undefined;
      }
      return { subject: payload.sub, claims: payload };
    } catch {
      return undefined;
    }
  }

  private findPublicKey(header: JWTHeaderParameters): KeyObject {
    const publicKey = header.kid === undefined ? undefined : this.publicKeys.get(header.kid);
    if (publicKey === undefined) {
      throw new Error("Token kid is missing or unknown");
    }
    return publicKey;
  }
}
