import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { slowOperationsConfig } from "../../infra/config/slow-operations.config.js";
import type { StepTimes } from "../operation-steps/operation-step.js";

export interface FinishedOperation {
  name: string;
  durationMs: number;
  steps: StepTimes;
}

function roundSteps(steps: StepTimes): StepTimes {
  return Object.fromEntries(Object.entries(steps).map(([step, ms]) => [step, Math.round(ms)]));
}

@Injectable()
export class SlowOperations {
  private readonly logger = new Logger(SlowOperations.name);

  constructor(
    @Inject(slowOperationsConfig.KEY)
    private readonly config: ConfigType<typeof slowOperationsConfig>,
  ) {}

  report(operation: FinishedOperation): void {
    if (operation.durationMs <= this.config.thresholdMs) {
      return;
    }
    this.logger.warn(
      {
        operation: operation.name,
        durationMs: Math.round(operation.durationMs),
        steps: roundSteps(operation.steps),
      },
      "Slow operation",
    );
  }
}
