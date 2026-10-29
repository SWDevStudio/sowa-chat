import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import type { OperatorRole } from "@sowa-chat/protocol";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { OperatorBlockEvent } from "../../telemetry/events/domain-events.js";
import type { ActorKind } from "../audit/actor-kind.js";
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

export type OperatorActorKind = Extract<ActorKind, "cli" | "system">;

export type OperatorBlockChange = "disabled" | "enabled" | "unchanged";

export interface ChangeOperatorBlockInput {
  projectId: string;
  externalId: string;
  actorKind: OperatorActorKind;
}

export class OperatorDisabledError extends Error {
  constructor() {
    super("Operator is disabled");
  }
}

export class OperatorNotFoundError extends Error {
  constructor(externalId: string) {
    super(`Operator "${externalId}" not found`);
  }
}

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(OperatorsRepository) private readonly operators: OperatorsRepository,
    @Inject(TokensService) private readonly tokens: TokensService,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async disable(input: ChangeOperatorBlockInput): Promise<OperatorBlockChange> {
    const operatorId = await this.operators.markDisabled(input.projectId, input.externalId);
    if (operatorId === undefined) {
      await this.requireOperator(input);
      return "unchanged";
    }
    await this.bus.publish("operator.disabled", this.blockEvent(operatorId, input));
    return "disabled";
  }

  @Transactional()
  async enable(input: ChangeOperatorBlockInput): Promise<OperatorBlockChange> {
    const operatorId = await this.operators.markEnabled(input.projectId, input.externalId);
    if (operatorId === undefined) {
      await this.requireOperator(input);
      return "unchanged";
    }
    await this.bus.publish("operator.enabled", this.blockEvent(operatorId, input));
    return "enabled";
  }

  async findDisabledIds(): Promise<string[]> {
    return this.operators.findDisabledIds();
  }

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

  private blockEvent(operatorId: string, input: ChangeOperatorBlockInput): OperatorBlockEvent {
    return {
      operatorId,
      projectId: input.projectId,
      externalId: input.externalId,
      actorKind: input.actorKind,
    };
  }

  private async requireOperator(input: ChangeOperatorBlockInput): Promise<void> {
    const operator = await this.operators.findByExternalId(input.projectId, input.externalId);
    if (operator === null) {
      throw new OperatorNotFoundError(input.externalId);
    }
  }
}
