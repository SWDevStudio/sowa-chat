import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ApiException } from "../../infra/http/api-exception.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { supervisorOnlyMetadataKey } from "./supervisor-only.decorator.js";

@Injectable()
export class OperatorRoleGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    @Inject(RequestContext) private readonly requestContext: RequestContext,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const supervisorOnly = this.reflector.getAllAndOverride<boolean | undefined>(
      supervisorOnlyMetadataKey,
      [context.getHandler(), context.getClass()],
    );
    if (supervisorOnly !== true) {
      return true;
    }
    if (this.requestContext.operator().role === "supervisor") {
      return true;
    }
    throw new ApiException({ code: "forbidden", message: "Supervisor role is required" });
  }
}
