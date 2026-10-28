import { Injectable } from "@nestjs/common";
import type { HealthIndicatorResult } from "@nestjs/terminus";
import { DependencyChecks } from "./dependency-checks.js";
import { readServerVersion } from "./server-version.js";

export type DependencyStatus = { status: "up" } | { status: "down"; reason: string };

export interface ServerStatus {
  version: string;
  mode: "api";
  uptimeSeconds: number;
  postgres: DependencyStatus;
  redis: DependencyStatus;
}

function toDependencyStatus(key: string, result: HealthIndicatorResult): DependencyStatus {
  const entry = result[key];
  if (entry?.status === "up") {
    return { status: "up" };
  }
  return { status: "down", reason: String(entry?.message ?? "unknown") };
}

@Injectable()
export class StatusService {
  private readonly version = readServerVersion();

  constructor(private readonly checks: DependencyChecks) {}

  async read(): Promise<ServerStatus> {
    const [postgres, redis] = await Promise.all([this.checks.postgres(), this.checks.redis()]);
    return {
      version: this.version,
      mode: "api",
      uptimeSeconds: Math.floor(process.uptime()),
      postgres: toDependencyStatus("postgres", postgres),
      redis: toDependencyStatus("redis", redis),
    };
  }
}
