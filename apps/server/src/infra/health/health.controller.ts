import { Controller, Get, Res, ServiceUnavailableException, VERSION_NEUTRAL } from "@nestjs/common";
import type { HealthCheckResult } from "@nestjs/terminus";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import type { Response } from "express";
import { Zone } from "../zones/zone.decorator.js";
import { DependencyChecks } from "./dependency-checks.js";
import { ReplicaReadiness } from "./replica-readiness.js";

@Zone("management")
@Controller({ path: "health", version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly readiness: ReplicaReadiness,
    private readonly checks: DependencyChecks,
  ) {}

  @Get("live")
  @HealthCheck()
  live(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  @Get("ready")
  @HealthCheck()
  async ready(@Res({ passthrough: true }) response: Response): Promise<unknown> {
    try {
      return await this.health.check([
        () => this.readiness.isHealthy("replica"),
        () => this.checks.postgres(),
        () => this.checks.redis(),
      ]);
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        response.status(503);
        return error.getResponse();
      }
      throw error;
    }
  }
}
