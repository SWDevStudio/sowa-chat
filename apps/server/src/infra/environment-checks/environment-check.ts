import type { ConfigType } from "@nestjs/config";
import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import type { environmentChecksConfig } from "../config/environment-checks.config.js";

export type CheckLevel = "stop" | "warn";

export interface CheckFinding {
  level: CheckLevel;
  message: string;
}

export interface CheckContext {
  settings: ConfigType<typeof environmentChecksConfig>;
  dataSource: DataSource;
  redis: Redis;
}

export interface EnvironmentCheck {
  name: string;
  onlyInDoctor: boolean;
  run: (context: CheckContext) => Promise<CheckFinding[]>;
}

export interface CheckResult extends CheckFinding {
  check: string;
}

export class EnvironmentCheckError extends Error {}
