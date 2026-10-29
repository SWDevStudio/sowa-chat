import { readArgs, runMain } from "./lib/args.mjs";
import { mainRoot } from "./lib/paths.mjs";
import { mergeTask } from "./lib/task-merge.mjs";

const usage = 'node .claude/scripts/epic/task-merge.mjs <epic> <task> "<commit message>"';

function main() {
  const [epic, task, message] = readArgs(usage, 3);
  const commit = mergeTask({ root: mainRoot(), epic, task, message });
  console.log(`MERGED ${commit}`);
  return 0;
}

runMain(main);
