import { Global, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DomainEventBus } from "./events/domain-event-bus.js";
import { HttpMetrics } from "./http-metrics/http-metrics.js";
import { MetricsModule } from "./metrics/metrics.module.js";
import { OperationStepsModule } from "./operation-steps/operation-steps.module.js";
import { SlowOperationsModule } from "./slow-operations/slow-operations.module.js";
import { TelemetryInterceptor } from "./telemetry.interceptor.js";

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MetricsModule,
    OperationStepsModule,
    SlowOperationsModule,
  ],
  providers: [
    DomainEventBus,
    HttpMetrics,
    { provide: APP_INTERCEPTOR, useClass: TelemetryInterceptor },
  ],
  exports: [DomainEventBus],
})
export class TelemetryModule {}
