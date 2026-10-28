import { Inject, Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import type { OperationStep, OperationTiming } from "./operation-step.js";
import { operationTimingKey } from "./operation-timing.js";

@Injectable()
export class OperationSteps {
  constructor(@Inject(ClsService) private readonly cls: ClsService) {}

  current(): OperationTiming | undefined {
    if (!this.cls.isActive()) {
      return undefined;
    }
    return this.cls.get<OperationTiming>(operationTimingKey);
  }

  record(step: OperationStep, durationMs: number): void {
    const timing = this.current();
    if (!timing) {
      return;
    }
    timing.steps[step] = (timing.steps[step] ?? 0) + durationMs;
  }

  async measure<T>(step: OperationStep, work: () => Promise<T>): Promise<T> {
    const started = performance.now();
    try {
      return await work();
    } finally {
      this.record(step, performance.now() - started);
    }
  }
}
