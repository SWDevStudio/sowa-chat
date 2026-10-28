import { Module } from "@nestjs/common";
import { OperatorsModule } from "../../domain/operators/operators.module.js";
import { OperatorTokenController } from "./operator-token.controller.js";

@Module({
  imports: [OperatorsModule],
  controllers: [OperatorTokenController],
})
export class ServerApiModule {}
