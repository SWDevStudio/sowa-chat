import { Controller, Inject, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import {
  operatorReplicaEventSchema,
  replicaEventPatterns,
} from "../../infra/replica-events/replica-events.js";
import { DisabledOperators } from "./disabled-operators.js";

@Controller()
export class OperatorReplicaEventsController {
  private readonly logger = new Logger(OperatorReplicaEventsController.name);

  constructor(@Inject(DisabledOperators) private readonly disabledOperators: DisabledOperators) {}

  @EventPattern(replicaEventPatterns.operatorDisabled)
  disabled(@Payload() payload: unknown): void {
    const event = operatorReplicaEventSchema.safeParse(payload);
    if (!event.success) {
      this.logger.warn("Ignored malformed operator replica event");
      return;
    }
    this.disabledOperators.add(event.data.operatorId);
  }

  @EventPattern(replicaEventPatterns.operatorEnabled)
  enabled(@Payload() payload: unknown): void {
    const event = operatorReplicaEventSchema.safeParse(payload);
    if (!event.success) {
      this.logger.warn("Ignored malformed operator replica event");
      return;
    }
    this.disabledOperators.remove(event.data.operatorId);
  }
}
