import { logAgentSpec } from "./lib/agent-log.mjs";
import { parseOptions, runMain } from "./lib/args.mjs";
import { checkTask } from "./lib/check-task.mjs";
import { mainRoot } from "./lib/paths.mjs";

const usage = 'node .claude/scripts/epic/task-check.mjs <epic> <task> [--log "<role> <model>"]';

function main() {
  const { positional, options } = parseOptions(usage, 2, ["log"]);
  const [epic, task] = positional;
  options.log.forEach((spec) => logAgentSpec({ root: mainRoot(), epic, task }, spec));
  return checkTask(epic, task);
}

runMain(main);
