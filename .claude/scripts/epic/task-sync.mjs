import { readArgs, runMain } from "./lib/args.mjs";
import { syncTask } from "./lib/task-sync.mjs";

const usage = "node .claude/scripts/epic/task-sync.mjs <epic> <task>";

function main() {
  const [epic, task] = readArgs(usage, 2);
  const { conflicts } = syncTask(epic, task);
  if (conflicts.length > 0) {
    console.log(`CONFLICT ${conflicts.join(" ")}`);
    return 2;
  }
  console.log("SYNCED");
  return 0;
}

runMain(main);
