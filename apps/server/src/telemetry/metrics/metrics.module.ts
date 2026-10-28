import { Module } from "@nestjs/common";
import { Registry, collectDefaultMetrics } from "prom-client";
import { MetricsController } from "./metrics.controller.js";

@Module({
  controllers: [MetricsController],
  providers: [
    {
      provide: Registry,
      useFactory: () => {
        const registry = new Registry();
        collectDefaultMetrics({ register: registry });
        return registry;
      },
    },
  ],
  exports: [Registry],
})
export class MetricsModule {}
