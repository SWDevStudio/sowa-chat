import { Inject, Injectable, type OnApplicationBootstrap } from "@nestjs/common";
import { OnDomainEvent } from "../../telemetry/events/on-domain-event.decorator.js";
import type { OperatorBlockEvent } from "../../telemetry/events/domain-events.js";
import { OperatorsService } from "./operators.service.js";

@Injectable()
export class DisabledOperators implements OnApplicationBootstrap {
  private ids = new Set<string>();

  constructor(@Inject(OperatorsService) private readonly operators: OperatorsService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    this.ids = new Set(await this.operators.findDisabledIds());
  }

  @OnDomainEvent("operator.disabled")
  onOperatorDisabled(event: OperatorBlockEvent): void {
    this.add(event.operatorId);
  }

  @OnDomainEvent("operator.enabled")
  onOperatorEnabled(event: OperatorBlockEvent): void {
    this.remove(event.operatorId);
  }

  add(operatorId: string): void {
    this.ids.add(operatorId);
  }

  remove(operatorId: string): void {
    this.ids.delete(operatorId);
  }

  has(operatorId: string): boolean {
    return this.ids.has(operatorId);
  }
}
