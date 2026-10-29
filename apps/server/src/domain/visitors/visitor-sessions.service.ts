import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Transactional } from "@nestjs-cls/transactional";
import { randomUUID } from "node:crypto";
import { visitorSessionsConfig } from "../../infra/config/visitor-sessions.config.js";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import { parseKey } from "../keys/key-format.js";
import { hashKey } from "../keys/key-hash.js";
import { ProjectsRepository } from "../projects/projects.repository.js";
import { generateRefreshToken } from "./refresh-token.js";
import { VisitorSessionsRepository } from "./visitor-sessions.repository.js";
import type { VisitorTokenClaims } from "./visitor-token-claims.js";
import type { Visitor } from "./visitor.entity.js";
import { VisitorsRepository } from "./visitors.repository.js";

export const visitorAccessTokenTtlSeconds = 3600;

const millisecondsPerDay = 86_400_000;

export interface VisitorSessionTokens {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
}

type RefreshExchange = { status: "issued"; tokens: VisitorSessionTokens } | { status: "rejected" };

export class InvalidPublicKeyError extends Error {
  constructor() {
    super("Public key is invalid");
  }
}

export class InvalidRefreshTokenError extends Error {
  constructor() {
    super("Refresh token is invalid");
  }
}

@Injectable()
export class VisitorSessionsService {
  constructor(
    @Inject(ProjectsRepository) private readonly projects: ProjectsRepository,
    @Inject(VisitorsRepository) private readonly visitors: VisitorsRepository,
    @Inject(VisitorSessionsRepository) private readonly sessions: VisitorSessionsRepository,
    @Inject(TokensService) private readonly tokens: TokensService,
    @Inject(visitorSessionsConfig.KEY)
    private readonly config: ConfigType<typeof visitorSessionsConfig>,
  ) {}

  @Transactional()
  async create(publicKey: string): Promise<VisitorSessionTokens> {
    if (parseKey(publicKey, "publicKey") === undefined) {
      throw new InvalidPublicKeyError();
    }
    const project = await this.projects.findByPublicKey(publicKey);
    if (project === null) {
      throw new InvalidPublicKeyError();
    }
    const visitor = await this.visitors.createAnonymous(project.id);
    return this.issueTokens(visitor, randomUUID());
  }

  async refresh(refreshToken: string): Promise<VisitorSessionTokens> {
    const exchange = await this.exchangeRefreshToken(refreshToken);
    if (exchange.status === "rejected") {
      throw new InvalidRefreshTokenError();
    }
    return exchange.tokens;
  }

  @Transactional()
  private async exchangeRefreshToken(refreshToken: string): Promise<RefreshExchange> {
    const refreshHash = hashKey(refreshToken);
    const familyId = await this.sessions.findFamilyIdByRefreshHash(refreshHash);
    if (familyId === null) {
      return { status: "rejected" };
    }
    await this.sessions.lockFamily(familyId);
    const session = await this.sessions.findByRefreshHashForUpdate(refreshHash);
    if (session === null || session.revokedAt !== null) {
      return { status: "rejected" };
    }
    if (session.usedAt !== null) {
      await this.sessions.revokeFamily(session.familyId);
      return { status: "rejected" };
    }
    if (session.expiresAt <= new Date()) {
      return { status: "rejected" };
    }
    await this.sessions.markUsed(session.id);
    const visitor = await this.visitors.findByIdOrFail(session.visitorId);
    const tokens = await this.issueTokens(visitor, session.familyId);
    return { status: "issued", tokens };
  }

  private async issueTokens(visitor: Visitor, familyId: string): Promise<VisitorSessionTokens> {
    const refreshToken = generateRefreshToken();
    await this.sessions.create({
      visitorId: visitor.id,
      familyId,
      refreshHash: hashKey(refreshToken),
      expiresAt: this.refreshExpiresAt(),
    });
    const claims: VisitorTokenClaims = { projectId: visitor.projectId };
    const signed = await this.tokens.sign({
      audience: "visitor",
      subject: visitor.id,
      claims,
      ttlSeconds: visitorAccessTokenTtlSeconds,
    });
    return {
      accessToken: signed.token,
      accessTokenExpiresAt: signed.expiresAt,
      refreshToken,
    };
  }

  private refreshExpiresAt(): Date {
    return new Date(Date.now() + this.config.refreshTtlDays * millisecondsPerDay);
  }
}
