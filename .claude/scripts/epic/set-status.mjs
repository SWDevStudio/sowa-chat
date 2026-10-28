import { readArgs, runMain } from "./lib/args.mjs";
import { setEpicStatus } from "./lib/epic-index.mjs";
import { mainRoot } from "./lib/paths.mjs";
import { setTaskStatus } from "./lib/task-table.mjs";

const usage = 'node .claude/scripts/epic/set-status.mjs <epic> [task] "<status>"';

function main() {
  const args = readArgs(usage, 2);
  const root = mainRoot();
  if (args.length === 2) {
    const [epic, status] = args;
    setEpicStatus(root, epic, status);
    console.log(`EPIC-${epic}: ${status}`);
    return 0;
  }
  const [epic, task, status] = args;
  setTaskStatus({ root, epic, task }, status);
  console.log(`EPIC-${epic} TASK-${task}: ${status}`);
  return 0;
}

runMain(main);
