import { readArgs, runMain } from "./lib/args.mjs";
import { logEvent } from "./lib/metrics.mjs";
import { mainRoot } from "./lib/paths.mjs";

const usage =
  "node .claude/scripts/epic/log-agent.mjs <epic> <task|-> <role> <model> [tokens=N] [durationMs=N] [effort=<level>]";
const numericKeys = ["tokens", "durationMs"];

function parseOptions(pairs) {
  const options = {};
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    options[key] = numericKeys.includes(key) ? Number(value) : value;
  }
  return options;
}

function main() {
  const [epic, task, role, model, ...pairs] = readArgs(usage, 4);
  const taskNumber = task === "-" ? null : task;
  logEvent(mainRoot(), {
    event: "agentDone",
    epic,
    task: taskNumber,
    role,
    model,
    ...parseOptions(pairs),
  });
  console.log(`logged ${role} ${model}`);
  return 0;
}

runMain(main);
