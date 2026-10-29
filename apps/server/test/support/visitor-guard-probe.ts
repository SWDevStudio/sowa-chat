import { Get, Inject } from "@nestjs/common";
import { VisitorController } from "../../src/api/visitor/visitor-controller.decorator.js";
import { RequestContext } from "../../src/infra/request-context/request-context.js";
import { OperationSteps } from "../../src/telemetry/operation-steps/operation-steps.js";

export const visitorProbePath = "/v1/visitor/guard-probe";

@VisitorController("guard-probe")
export class VisitorGuardProbeController {
  constructor(
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {}

  @Get()
  probe() {
    return {
      projectId: this.requestContext.projectId(),
      visitor: this.requestContext.visitor(),
      authMs: this.operationSteps.current()?.steps.auth,
    };
  }
}
