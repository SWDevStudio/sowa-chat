export const operationSteps = ["auth", "db", "redis", "queueWait", "bot"] as const;

export type OperationStep = (typeof operationSteps)[number];

export type StepTimes = Partial<Record<OperationStep, number>>;

export interface OperationTiming {
  startedAt: number;
  steps: StepTimes;
}
