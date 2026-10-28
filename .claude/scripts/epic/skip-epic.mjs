import { readArgs, runMain } from "./lib/args.mjs";
import { mainRoot } from "./lib/paths.mjs";
import { skipEpic } from "./lib/skipped-epics.mjs";

const usage = 'node .claude/scripts/epic/skip-epic.mjs <epic> "<reason>"';

function main() {
  const [epic, reason] = readArgs(usage, 2);
  skipEpic(mainRoot(), epic, reason);
  console.log(`skipped ${epic}: ${reason}`);
  return 0;
}

runMain(main);
