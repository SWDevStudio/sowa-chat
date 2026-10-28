import { readArgs, runMain } from "./lib/args.mjs";
import { mainRoot, worktreePath } from "./lib/paths.mjs";
import { quoteAll, runOrFail } from "./lib/shell.mjs";
import { updateTaskRun } from "./lib/task-run.mjs";

const usage = "node .claude/scripts/epic/task-tests.mjs <epic> <task> <test file>...";

function main() {
  const [epic, task, ...tests] = readArgs(usage, 3);
  const root = mainRoot();
  const worktree = worktreePath(root, epic, task);
  runOrFail(`git add -- ${quoteAll(tests)}`, worktree);
  runOrFail('git commit -m "WIP: tests"', worktree);
  const base = runOrFail("git rev-parse HEAD", worktree);
  updateTaskRun({ root, epic, task }, { base, tests });
  console.log(`TESTS ${base}`);
  return 0;
}

runMain(main);
