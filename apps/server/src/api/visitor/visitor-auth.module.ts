import { Module } from "@nestjs/common";
import { TokensModule } from "../../infra/tokens/tokens.module.js";
import { OperationStepsModule } from "../../telemetry/operation-steps/operation-steps.module.js";
import { VisitorAuthGuard } from "./visitor-auth.guard.js";

@Module({
  imports: [TokensModule, OperationStepsModule],
  providers: [VisitorAuthGuard],
  exports: [VisitorAuthGuard, TokensModule, OperationStepsModule],
})
export class VisitorAuthModule {}
