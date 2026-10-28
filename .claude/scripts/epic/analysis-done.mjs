import { readArgs, runMain } from "./lib/args.mjs";
import { logEvent } from "./lib/metrics.mjs";
import { mainRoot } from "./lib/paths.mjs";

const usage = "node .claude/scripts/epic/analysis-done.mjs <number>";

function main() {
  const [number] = readArgs(usage, 1);
  logEvent(mainRoot(), { event: "analysis", number: Number(number) });
  console.log(`analysis ${number} logged`);
  return 0;
}

runMain(main);
