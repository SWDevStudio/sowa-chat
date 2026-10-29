import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import type {
  CheckContext,
  CheckFinding,
  EnvironmentCheck,
} from "../../src/infra/environment-checks/environment-check.js";

export function createCheckContext(env: CheckContext["settings"]["env"]): CheckContext {
  return {
    settings: { env },
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
