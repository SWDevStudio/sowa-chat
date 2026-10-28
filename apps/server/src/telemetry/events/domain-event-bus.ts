import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { DomainEventHandler, DomainEventName, DomainEvents } from "./domain-events.js";

@Injectable()
export class DomainEventBus {
  constructor(@Inject(EventEmitter2) private readonly emitter: EventEmitter2) {}

  async publish<Name extends DomainEventName>(name: Name, data: DomainEvents[Name]): Promise<void> {
    await this.emitter.emitAsync(name, data);
  }

  subscribe<Name extends DomainEventName>(name: Name, handler: DomainEventHandler<Name>): void {
    this.emitter.on(name, handler);
  }
}
