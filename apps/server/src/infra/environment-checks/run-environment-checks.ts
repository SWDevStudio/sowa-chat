import type {
  CheckContext,
  CheckFinding,
  CheckResult,
  EnvironmentCheck,
} from "./environment-check.js";

export type CheckPlace = "startup" | "doctor";

function checksForPlace(
  checks: readonly EnvironmentCheck[],
  place: CheckPlace,
): readonly EnvironmentCheck[] {
  if (place === "doctor") {
    return checks;
  }
  return checks.filter((check) => !check.onlyInDoctor);
}

async function findProblems(
  check: EnvironmentCheck,
  context: CheckContext,
): Promise<CheckFinding[]> {
  try {
    return await check.run(context);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return [{ level: "warn", message: `check could not run: ${reason}` }];
  }
}

function softenForDevelopment(finding: CheckFinding, context: CheckContext): CheckFinding {
  if (context.settings.env === "development") {
    return { ...finding, level: "warn" };
  }
  return finding;
}

export async function runEnvironmentChecks(
  checks: readonly EnvironmentCheck[],
  context: CheckContext,
  place: CheckPlace,
): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const check of checksForPlace(checks, place)) {
    const findings = await findProblems(check, context);
    for (const finding of findings) {
      results.push({ check: check.name, ...softenForDevelopment(finding, context) });
    }
  }
  return results;
}
