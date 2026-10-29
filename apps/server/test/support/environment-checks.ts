import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import type {
  CheckContext,
  CheckFinding,
  EnvironmentCheck,
} from "../../src/infra/environment-checks/environment-check.js";

export function createCheckSettings(
  env: CheckContext["settings"]["env"],
): CheckContext["settings"] {
  return {
    env,
    publicUrl: undefined,
    s3PublicUrl: undefined,
    databaseUrl: "postgres://sowa:own-password@db.internal:5432/sowa",
    migrationDatabaseUrl: undefined,
    s3SecretKey: "own-s3-secret",
  };
}

export function createCheckContext(env: CheckContext["settings"]["env"]): CheckContext {
  return {
    settings: createCheckSettings(env),
    dataSource: {} as DataSource,
    redis: {} as Redis,
  };
}

export function createCheck(
  name: string,
  findings: CheckFinding[],
  onlyInDoctor = false,
): EnvironmentCheck {
  return { name, onlyInDoctor, run: vi.fn(async () => findings) };
}

export function createFailingCheck(name: string, error: Error): EnvironmentCheck {
  return {
    name,
    onlyInDoctor: false,
    run: vi.fn(async () => {
      throw error;
    }),
  };
}
