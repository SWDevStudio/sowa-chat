import { readArgs, runMain } from "./lib/args.mjs";
import { logFile, mainRoot } from "./lib/paths.mjs";
import { outputLines, run, runOrFail } from "./lib/shell.mjs";
import { reportSteps, runStep } from "./lib/steps.mjs";

const usage = "node .claude/scripts/epic/final-check.mjs <epic>";
const composeFile = "deploy/compose/docker-compose.dev.yml";

const checks = [
  ["e2e", "pnpm --filter @sowa-chat/server test:e2e"],
  ["format", "pnpm format:check"],
  ["lint", "pnpm lint"],
  ["types", "pnpm check-types"],
  ["tests", "pnpm test"],
];

function isInfraRunning(root) {
  const result = run(`docker compose -f ${composeFile} ps --status running -q`, root);
  return result.ok && outputLines(result.output).length > 0;
}

function main() {
  const [epic] = readArgs(usage, 1);
  const root = mainRoot();
  const startedInfra = !isInfraRunning(root);
  if (startedInfra) {
    runOrFail("pnpm infra:up", root);
  }
  const steps = checks.map(([name, command]) => runStep(name, command, root));
  if (startedInfra) {
    run("pnpm infra:down", root);
  }
  return reportSteps(steps, logFile(root, epic, "final"));
}

runMain(main);
