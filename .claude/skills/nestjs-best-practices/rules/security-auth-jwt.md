---
title: Implement Secure JWT Authentication
impact: CRITICAL
impactDescription: Essential for secure APIs
tags: security, jwt, authentication, tokens, jose
---

## Implement Secure JWT Authentication

Sign and verify tokens with `jose`, not `@nestjs/jwt` or Passport. Sign with an asymmetric key (Ed25519, `alg: EdDSA`) that carries a `kid`, so old tokens keep verifying with the old key during rotation. Always pin `algorithms`, `issuer` and `audience` on verification. Access tokens are short-lived and verified by signature only, without a database lookup; refresh tokens are one-time, stored as a hash, and reuse of a spent refresh token revokes the whole session chain. Never put sensitive data in the payload.

**Incorrect (insecure JWT implementation):**

```typescript
// Hardcoded symmetric secret, long lifetime
const token = await new SignJWT({ sub: user.id })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .sign(new TextEncoder().encode('my-secret-key'));

// Sensitive data in the payload
const payload = {
  sub: user.id,
  password: user.password, // NEVER include password!
  email: user.email, // Personal data does not belong in a token
};

// Verification without pinned algorithm, issuer and audience
const { payload: claims } = await jwtVerify(token, key);
// A visitor token would be accepted on an operator route
```

**Correct (jose with Ed25519, pinned claims and a guard):**

```typescript
import { createLocalJWKSet, jwtVerify, SignJWT } from 'jose';

// Signing: keys come from the config module, never from code
@Injectable()
export class TokenIssuer {
  constructor(
    @Inject(authConfig.KEY)
    private readonly auth: ConfigType<typeof authConfig>,
  ) {}

  issueOperatorToken(input: { operatorId: string; projectId: string; role: OperatorRole }): Promise<string> {
    return new SignJWT({ projectId: input.projectId, role: input.role })
      .setProtectedHeader({ alg: 'EdDSA', kid: this.auth.currentKeyId })
      .setSubject(input.operatorId)
      .setIssuer(this.auth.issuer)
      .setAudience('operator')
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(this.auth.currentPrivateKey);
  }
}

// Verification: a public key set selected by kid, claims pinned
@Injectable()
export class TokenVerifier {
  private readonly publicKeys: ReturnType<typeof createLocalJWKSet>;

  constructor(
    @Inject(authConfig.KEY)
    private readonly auth: ConfigType<typeof authConfig>,
  ) {
    this.publicKeys = createLocalJWKSet({ keys: auth.publicJwks });
  }

  async verify(input: { token: string; audience: TokenAudience }): Promise<TokenClaims> {
    const { payload } = await jwtVerify(input.token, this.publicKeys, {
      algorithms: ['EdDSA'],
      issuer: this.auth.issuer,
      audience: input.audience,
    });
    return TokenClaimsSchema.parse(payload);
  }
}

// Guard: the audience comes from the route zone, the identity comes from the token
@Injectable()
export class OperatorAuthGuard implements CanActivate {
  constructor(private readonly verifier: TokenVerifier) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request.operator = await this.verifier.verify({ token, audience: 'operator' });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

// Refresh: one-time token, only its hash is stored, reuse revokes the chain
@Injectable()
export class VisitorSessionService {
  async refresh(refreshToken: string): Promise<TokenPair> {
    const session = await this.sessions.findByRefreshHash(hashToken(refreshToken));
    if (!session) {
      throw new UnauthorizedException();
    }
    if (session.usedAt) {
      await this.sessions.revokeFamily(session.familyId);
      throw new UnauthorizedException();
    }

    await this.sessions.markUsed(session.id);
    return this.issuePair({ visitorId: session.visitorId, familyId: session.familyId });
  }
}
```

The sender of a message (`senderKind`, `senderId`) is always taken from the verified token, never from the request body.

Reference: [jose](https://github.com/panva/jose), [NestJS Guards](https://docs.nestjs.com/guards)
