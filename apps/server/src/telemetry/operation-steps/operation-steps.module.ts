import { Module } from "@nestjs/common";
import { OperationSteps } from "./operation-steps.js";

@Module({
  providers: [OperationSteps],
  exports: [OperationSteps],
})
export class OperationStepsModule {}
