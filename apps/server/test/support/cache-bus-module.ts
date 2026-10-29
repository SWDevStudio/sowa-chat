import { Global, Module } from "@nestjs/common";
import { DomainEventBus } from "../../src/telemetry/events/domain-event-bus.js";

@Global()
@Module({ providers: [DomainEventBus], exports: [DomainEventBus] })
export class CacheBusModule {}
