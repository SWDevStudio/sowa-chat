import { exampleSecretsCheck, publicUrlsHttpsCheck, s3PublicUrlCheck } from "./config-checks.js";
import type { EnvironmentCheck } from "./environment-check.js";

export const environmentChecks = Symbol("environmentChecks");

export const registeredEnvironmentChecks: EnvironmentCheck[] = [
  publicUrlsHttpsCheck,
  exampleSecretsCheck,
  s3PublicUrlCheck,
];
