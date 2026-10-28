import { Global, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DomainEventBus } from "./events/domain-event-bus.js";

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [DomainEventBus],
  exports: [DomainEventBus],
})
export class TelemetryModule {}
