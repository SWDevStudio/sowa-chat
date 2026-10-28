import { Inject, Injectable, Logger } from "@nestjs/common";
import { preparationSteps } from "./preparation-step.js";
import type { PreparationStep } from "./preparation-step.js";

@Injectable()
export class PreparationRunner {
  private readonly logger = new Logger(PreparationRunner.name);

  constructor(@Inject(preparationSteps) private readonly steps: PreparationStep[]) {}

  async run(): Promise<void> {
    for (const step of this.steps) {
      this.logger.log({ msg: "Preparation step started", step: step.name });
      await step.run();
      this.logger.log({ msg: "Preparation step finished", step: step.name });
    }
  }
}
