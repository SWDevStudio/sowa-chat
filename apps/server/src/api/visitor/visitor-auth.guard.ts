import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { visitorTokenClaimsSchema } from "../../domain/visitors/visitor-token-claims.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { bearerToken } from "../../infra/http/bearer-token.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { TokensService } from "../../infra/tokens/tokens.service.js";
import { OperationSteps } from "../../telemetry/operation-steps/operation-steps.js";

@Injectable()
export class VisitorAuthGuard implements CanActivate {
  constructor(
    @Inject(TokensService) private readonly tokens: TokensService,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = bearerToken(context.switchToHttp().getRequest<Request>());
    if (!token) {
      throw this.unauthorized();
    }
    const verified = await this.operationSteps.measure("auth", () =>
      this.tokens.verify(token, "visitor"),
    );
    if (!verified) {
      throw this.unauthorized();
    }
    const claims = visitorTokenClaimsSchema.safeParse(verified.claims);
    if (!claims.success) {
      throw this.unauthorized();
    }
    this.requestContext.setProjectId(claims.data.projectId);
    this.requestContext.setVisitor({ visitorId: verified.subject });
    return true;
  }

  private unauthorized(): ApiException {
    return new ApiException({
      code: "unauthorized",
      message: "Visitor token is missing or invalid",
    });
  }
}
