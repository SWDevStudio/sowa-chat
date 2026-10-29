import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { ApiKeysService } from "../../domain/keys/api-keys.service.js";
import { ApiException } from "../../infra/http/api-exception.js";
import { bearerToken } from "../../infra/http/bearer-token.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { OperationSteps } from "../../telemetry/operation-steps/operation-steps.js";

@Injectable()
export class ServerKeyGuard implements CanActivate {
  constructor(
    @Inject(ApiKeysService) private readonly apiKeys: ApiKeysService,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const key = bearerToken(context.switchToHttp().getRequest<Request>());
    if (!key) {
      throw this.unauthorized();
    }
    const verified = await this.operationSteps.measure("auth", () =>
      this.apiKeys.verify(key, "server"),
    );
    if (!verified) {
      throw this.unauthorized();
    }
    this.requestContext.setProjectId(verified.projectId);
    return true;
  }

  private unauthorized(): ApiException {
    return new ApiException({ code: "unauthorized", message: "Server key is missing or invalid" });
  }
}
