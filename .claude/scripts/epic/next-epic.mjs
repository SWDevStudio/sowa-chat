import { runMain } from "./lib/args.mjs";
import { readEpics, readRequiredEpics } from "./lib/epic-index.mjs";
import { epicBranch, mainRoot } from "./lib/paths.mjs";
import { readSkipped, skipEpic } from "./lib/skipped-epics.mjs";
import { run } from "./lib/shell.mjs";

function isMerged(root, epic) {
  return run(`git merge-base --is-ancestor ${epicBranch(epic)} pipeline`, root).ok;
}

function isDelivered(root, epic) {
  return epic.status === "готов" || isMerged(root, epic.number);
}

function missingRequirement(root, epics, epic) {
  const delivered = epics.filter((other) => isDelivered(root, other)).map((other) => other.number);
  return readRequiredEpics(root, epic.number).find((number) => !delivered.includes(number));
}

function main() {
  const root = mainRoot();
  const epics = readEpics(root);
  for (const epic of epics) {
    const skipped = readSkipped(root);
    if (isDelivered(root, epic) || skipped[epic.number]) {
      continue;
    }
    const missing = missingRequirement(root, epics, epic);
    if (missing === undefined) {
      console.log(`next ${epic.number}`);
      return 0;
    }
    skipEpic(root, epic.number, `нужен EPIC-${missing}, он не влит в pipeline`);
    console.log(`skipped ${epic.number}: needs EPIC-${missing}`);
  }
  console.log("done");
  return 0;
}

runMain(main);
