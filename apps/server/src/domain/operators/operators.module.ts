import { Module } from "@nestjs/common";
import { TokensModule } from "../../infra/tokens/tokens.module.js";
import { OperatorsRepository } from "./operators.repository.js";
import { OperatorsService } from "./operators.service.js";

@Module({
  imports: [TokensModule],
  providers: [OperatorsRepository, OperatorsService],
  exports: [OperatorsService, OperatorsRepository],
})
export class OperatorsModule {}
