import { Controller, Get, Header, Inject, VERSION_NEUTRAL } from "@nestjs/common";
import { Registry } from "prom-client";
import { Zone } from "../../infra/zones/zone.decorator.js";

@Zone("management")
@Controller({ path: "metrics", version: VERSION_NEUTRAL })
export class MetricsController {
  constructor(@Inject(Registry) private readonly registry: Registry) {}

  @Get()
  @Header("Content-Type", Registry.PROMETHEUS_CONTENT_TYPE)
  metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
