import { Inject, Injectable } from "@nestjs/common";
import type { HealthIndicatorResult } from "@nestjs/terminus";
import { HealthIndicatorService, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { Redis } from "ioredis";

const checkTimeoutMs = 1000;

@Injectable()
export class DependencyChecks {
  constructor(
    private readonly typeOrm: TypeOrmHealthIndicator,
    private readonly indicators: HealthIndicatorService,
    @Inject(Redis) private readonly client: Redis,
  ) {}

  async postgres(): Promise<HealthIndicatorResult> {
    return await this.typeOrm.pingCheck("postgres", { timeout: checkTimeoutMs });
  }

  async redis(): Promise<HealthIndicatorResult> {
    return await this.indicators
      .check("redis")
      .attempt(async () => {
        if (this.client.status !== "ready") {
          throw new Error(`Redis connection is ${this.client.status}`);
        }
        await this.client.ping();
      })
      .withTimeout(checkTimeoutMs);
  }
}
