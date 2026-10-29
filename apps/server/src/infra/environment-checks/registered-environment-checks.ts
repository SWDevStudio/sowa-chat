import type { EnvironmentCheck } from "./environment-check.js";

export const environmentChecks = Symbol("environmentChecks");

export const registeredEnvironmentChecks: EnvironmentCheck[] = [];
