import { Module } from "@nestjs/common";
import { TokensModule } from "../../infra/tokens/tokens.module.js";
import { DisabledOperators } from "./disabled-operators.js";
import { OperatorsRepository } from "./operators.repository.js";
import { OperatorsService } from "./operators.service.js";

@Module({
  imports: [TokensModule],
  providers: [OperatorsRepository, OperatorsService, DisabledOperators],
  exports: [OperatorsService, OperatorsRepository, DisabledOperators],
})
export class OperatorsModule {}
