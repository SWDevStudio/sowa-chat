import { Global, Module } from "@nestjs/common";
import { DisabledOperatorsModule } from "../../domain/operators/disabled-operators.module.js";
import { OperatorsModule } from "../../domain/operators/operators.module.js";
import { TokensModule } from "../../infra/tokens/tokens.module.js";
import { OperationStepsModule } from "../../telemetry/operation-steps/operation-steps.module.js";
import { OperatorAuthGuard } from "./operator-auth.guard.js";

@Global()
@Module({
  imports: [TokensModule, OperatorsModule, DisabledOperatorsModule, OperationStepsModule],
  providers: [OperatorAuthGuard],
  exports: [
    OperatorAuthGuard,
    TokensModule,
    OperatorsModule,
    DisabledOperatorsModule,
    OperationStepsModule,
  ],
})
export class OperatorAuthModule {}
