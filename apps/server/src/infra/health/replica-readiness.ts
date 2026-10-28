import { Injectable } from "@nestjs/common";
import type { HealthIndicatorResult } from "@nestjs/terminus";
import { HealthIndicatorService } from "@nestjs/terminus";

@Injectable()
export class ReplicaReadiness {
  private ready = true;

  constructor(private readonly indicators: HealthIndicatorService) {}

  markNotReady(): void {
    this.ready = false;
  }

  isHealthy(key: string): HealthIndicatorResult {
    const session = this.indicators.check(key);
    if (!this.ready) {
      return session.down({ message: "replica is not ready" });
    }
    return session.up();
  }
}
