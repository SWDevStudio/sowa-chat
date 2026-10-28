import { Get, Inject } from "@nestjs/common";
import type { OperatorRole } from "@sowa-chat/protocol";
import { decodeJwt } from "jose";
import type { JWTPayload } from "jose";
import type { DataSource } from "typeorm";
import { OperatorController } from "../../src/api/operator/operator-controller.decorator.js";
import { Operator } from "../../src/domain/operators/operator.entity.js";
import { OperatorsService } from "../../src/domain/operators/operators.service.js";
import { RequestContext } from "../../src/infra/request-context/request-context.js";
import { OperationSteps } from "../../src/telemetry/operation-steps/operation-steps.js";
import { createProject } from "./fixtures.js";

export const operatorProbePath = "/v1/operator/guard-probe";

@OperatorController("guard-probe")
export class OperatorGuardProbeController {
  constructor(
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {}

  @Get()
  probe() {
    return {
      projectId: this.requestContext.projectId(),
      operator: this.requestContext.operator(),
      authMs: this.operationSteps.current()?.steps.auth,
    };
  }
}

export interface IssuedOperator {
  projectId: string;
  operatorId: string;
  token: string;
  payload: JWTPayload;
}

export async function issueTestOperator(
  dataSource: DataSource,
  operators: OperatorsService,
  role: OperatorRole,
): Promise<IssuedOperator> {
  const project = await createProject(dataSource);
  const externalId = `ext-${role}`;
  const issued = await operators.issueToken({
    projectId: project.id,
    externalId,
    name: "Alice",
    role,
  });
  const row = await dataSource
    .getRepository(Operator)
    .findOneByOrFail({ projectId: project.id, externalId });
  return {
    projectId: project.id,
    operatorId: row.id,
    token: issued.token,
    payload: decodeJwt(issued.token),
  };
}

export function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
