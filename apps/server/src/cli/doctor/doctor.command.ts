import { Inject } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { InjectDataSource } from "@nestjs/typeorm";
import type { Redis } from "ioredis";
import { Command, CommandRunner } from "nest-commander";
import type { DataSource } from "typeorm";
import { environmentChecksConfig } from "../../infra/config/environment-checks.config.js";
import { redisConfig } from "../../infra/config/redis.config.js";
import type { CheckLevel, CheckResult } from "../../infra/environment-checks/environment-check.js";
import { registeredEnvironmentChecks } from "../../infra/environment-checks/registered-environment-checks.js";
import { runEnvironmentChecks } from "../../infra/environment-checks/run-environment-checks.js";
import {
  closeRedis,
  createRedisClient,
  redisStartupTimeoutMs,
  waitForRedis,
} from "../../infra/redis/redis-client.js";
import { writeLine } from "../cli-output.js";

const noProblemsReport = "no problems found";

function redisConnectionLevel(env: string): CheckLevel {
  if (env === "development") {
    return "warn";
  }
  return "stop";
}

function formatResult(result: CheckResult): string {
  return `${result.level}\t${result.check}\t${result.message}`;
}

function printReport(results: CheckResult[]): void {
  if (results.length === 0) {
    writeLine(noProblemsReport);
    return;
  }
  for (const result of results) {
    writeLine(formatResult(result));
  }
}

@Command({
  name: "doctor",
  description: "Check the environment and print what is wrong and how to fix it",
})
export class DoctorCommand extends CommandRunner {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(redisConfig.KEY) private readonly redis: ConfigType<typeof redisConfig>,
    @Inject(environmentChecksConfig.KEY)
    private readonly settings: ConfigType<typeof environmentChecksConfig>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const results = await this.collectResults();
    printReport(results);
    const stopCount = results.filter((result) => result.level === "stop").length;
    if (stopCount > 0) {
      throw new Error(`doctor found problems that stop the service: ${stopCount}`);
    }
  }

  private async collectResults(): Promise<CheckResult[]> {
    const client = createRedisClient(this.redis.url);
    try {
      const connectionResults = await this.checkRedisConnection(client);
      const checkResults = await runEnvironmentChecks(
        registeredEnvironmentChecks,
        { settings: this.settings, dataSource: this.dataSource, redis: client },
        "doctor",
      );
      return [...connectionResults, ...checkResults];
    } finally {
      await closeRedis(client);
    }
  }

  private async checkRedisConnection(client: Redis): Promise<CheckResult[]> {
    try {
      await waitForRedis(client, redisStartupTimeoutMs);
      return [];
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return [
        { check: "redisConnection", level: redisConnectionLevel(this.settings.env), message },
      ];
    }
  }
}
