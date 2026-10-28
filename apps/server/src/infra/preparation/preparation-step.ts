export interface PreparationStep {
  readonly name: string;
  run(): Promise<void>;
}

export const preparationSteps = Symbol("preparationSteps");
