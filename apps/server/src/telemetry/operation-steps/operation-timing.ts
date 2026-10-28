import type { ClsService } from "nestjs-cls";
import type { OperationTiming } from "./operation-step.js";

export const operationTimingKey = "operationTiming";

export function beginOperation(cls: ClsService): OperationTiming {
  const timing: OperationTiming = { startedAt: performance.now(), steps: {} };
  cls.set(operationTimingKey, timing);
  return timing;
}
