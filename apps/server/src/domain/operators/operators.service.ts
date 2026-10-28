import { Inject, Injectable } from "@nestjs/common";
import type { OperatorRole } from "@sowa-chat/protocol";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import type { OperatorTokenClaims } from "./operator-token-claims.js";
import { OperatorsRepository } from "./operators.repository.js";

export const operatorTokenTtlSeconds = 900;

export interface IssueOperatorTokenInput {
  projectId: string;
  externalId: string;
  name: string;
  avatarUrl?: string;
  role: OperatorRole;
}

export interface IssuedOperatorToken {
  token: string;
  expiresAt: Date;
}

export class OperatorDisabledError extends Error {
  constructor() {
    super("Operator is disabled");
  }
}

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(OperatorsRepository) private readonly operators: OperatorsRepository,
    @Inject(TokensService) private readonly tokens: TokensService,
  ) {}

  async issueToken(input: IssueOperatorTokenInput): Promise<IssuedOperatorToken> {
    const operator = await this.operators.upsert({
      projectId: input.projectId,
      externalId: input.externalId,
      name: input.name,
      avatarUrl: input.avatarUrl ?? null,
      role: input.role,
    });
    if (operator.disabledAt !== null) {
      throw new OperatorDisabledError();
    }
    const claims: OperatorTokenClaims = { projectId: operator.projectId, role: operator.role };
    return this.tokens.sign({
      audience: "operator",
      subject: operator.id,
      claims,
      ttlSeconds: operatorTokenTtlSeconds,
    });
  }
}
