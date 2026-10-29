import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { InjectDataSource } from "@nestjs/typeorm";
import { Redis } from "ioredis";
import { DataSource } from "typeorm";
import { environmentChecksConfig } from "../config/environment-checks.config.js";
import type { CheckResult, EnvironmentCheck } from "./environment-check.js";
import { EnvironmentCheckError } from "./environment-check.js";
import { environmentChecks } from "./registered-environment-checks.js";
import { runEnvironmentChecks } from "./run-environment-checks.js";

function describeResult(result: CheckResult): string {
  return `${result.check}: ${result.message}`;
}

@Injectable()
export class EnvironmentChecksService {
  private readonly logger = new Logger("EnvironmentChecks");

  constructor(
    @Inject(environmentChecksConfig.KEY)
    private readonly settings: ConfigType<typeof environmentChecksConfig>,
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(Redis) private readonly redis: Redis,
    @Inject(environmentChecks) private readonly checks: EnvironmentCheck[],
  ) {}

  async verifyAtStartup(): Promise<void> {
    const results = await runEnvironmentChecks(
      this.checks,
      { settings: this.settings, dataSource: this.dataSource, redis: this.redis },
      "startup",
    );
    for (const result of results.filter((item) => item.level === "warn")) {
      this.logger.warn(describeResult(result));
    }
    const stops = results.filter((item) => item.level === "stop");
    if (stops.length > 0) {
      throw new EnvironmentCheckError(
        ["Environment checks failed:", ...stops.map(describeResult)].join("\n"),
      );
    }
  }
}
