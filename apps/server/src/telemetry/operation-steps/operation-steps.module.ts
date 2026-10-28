import { Module } from "@nestjs/common";
import { AppClsModule } from "../../infra/cls/app-cls.module.js";
import { OperationSteps } from "./operation-steps.js";

@Module({
  imports: [AppClsModule],
  providers: [OperationSteps],
  exports: [OperationSteps],
})
export class OperationStepsModule {}
