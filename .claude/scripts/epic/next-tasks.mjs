import { readArgs, runMain } from "./lib/args.mjs";
import { nextTaskLines } from "./lib/next-tasks.mjs";

const usage = "node .claude/scripts/epic/next-tasks.mjs <epic>";

function main() {
  const [epic] = readArgs(usage, 1);
  nextTaskLines(epic).forEach((line) => console.log(line));
  return 0;
}

runMain(main);
