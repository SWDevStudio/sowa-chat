import { Module } from "@nestjs/common";
import { DisabledOperators } from "./disabled-operators.js";
import { OperatorReplicaEventsController } from "./operator-replica-events.controller.js";
import { OperatorsModule } from "./operators.module.js";

@Module({
  imports: [OperatorsModule],
  controllers: [OperatorReplicaEventsController],
  providers: [DisabledOperators],
  exports: [DisabledOperators],
})
export class DisabledOperatorsModule {}
