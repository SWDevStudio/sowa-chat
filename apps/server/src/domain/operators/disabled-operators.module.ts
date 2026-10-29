import { Module } from "@nestjs/common";
import { DisabledOperators } from "./disabled-operators.js";
import { OperatorsModule } from "./operators.module.js";

@Module({
  imports: [OperatorsModule],
  providers: [DisabledOperators],
  exports: [DisabledOperators],
})
export class DisabledOperatorsModule {}
