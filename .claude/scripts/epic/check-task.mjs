import { readArgs, runMain } from "./lib/args.mjs";
import { checkTask } from "./lib/check-task.mjs";

const usage = "node .claude/scripts/epic/check-task.mjs <epic> <task>";

function main() {
  const [epic, task] = readArgs(usage, 2);
  return checkTask(epic, task);
}

runMain(main);
