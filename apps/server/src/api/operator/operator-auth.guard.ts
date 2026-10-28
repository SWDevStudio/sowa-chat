import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { operatorRoles } from "@sowa-chat/protocol";
import type { Request } from "express";
import { z } from "zod";
import { DisabledOperators } from "../../domain/operators/disabled-operators.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { bearerToken } from "../../infra/http/bearer-token.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import { OperationSteps } from "../../telemetry/operation-steps/operation-steps.js";

const operatorClaimsSchema = z.object({
  projectId: z.string().min(1),
  role: z.enum(operatorRoles),
});

@Injectable()
export class OperatorAuthGuard implements CanActivate {
  constructor(
    @Inject(TokensService) private readonly tokens: TokensService,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
    @Inject(DisabledOperators) private readonly disabledOperators: DisabledOperators,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = bearerToken(context.switchToHttp().getRequest<Request>());
    if (!token) {
      throw this.unauthorized();
    }
    const verified = await this.operationSteps.measure("auth", () =>
      this.tokens.verify(token, "operator"),
    );
    if (!verified) {
      throw this.unauthorized();
    }
    const claims = operatorClaimsSchema.safeParse(verified.claims);
    if (!claims.success) {
      throw this.unauthorized();
    }
    if (this.disabledOperators.has(verified.subject)) {
      throw this.unauthorized();
    }
    this.requestContext.setProjectId(claims.data.projectId);
    this.requestContext.setOperator({ operatorId: verified.subject, role: claims.data.role });
    return true;
  }

  private unauthorized(): ApiException {
    return new ApiException({
      code: "unauthorized",
      message: "Operator token is missing or invalid",
    });
  }
}
