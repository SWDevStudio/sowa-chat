import { logAgentSpec } from "./lib/agent-log.mjs";
import { parseOptions, runMain } from "./lib/args.mjs";
import { nextTaskLines } from "./lib/next-tasks.mjs";
import { mainRoot } from "./lib/paths.mjs";
import { isTaskChecked } from "./lib/task-checked.mjs";
import { readCommitMessage } from "./lib/task-commit-message.mjs";
import { mergeTask } from "./lib/task-merge.mjs";
import { syncTask } from "./lib/task-sync.mjs";

const usage =
  'node .claude/scripts/epic/task-finish.mjs <epic> <task> [--log "<role> <model>"]... [--message "<commit message>"]';

function main() {
  const { positional, options } = parseOptions(usage, 2, ["log", "message"]);
  const [epic, task] = positional;
  const root = mainRoot();
  if (!isTaskChecked({ root, epic, task })) {
    console.log("NEEDS-CHECK");
    return 4;
  }
  options.log.forEach((spec) => logAgentSpec({ root, epic, task }, spec));
  const message = options.message[0] ?? readCommitMessage(root, epic, task);
  if (!message) {
    console.log("NEEDS-COMMITTER");
    return 3;
  }
  const { conflicts } = syncTask(epic, task);
  if (conflicts.length > 0) {
    console.log(`CONFLICT ${conflicts.join(" ")}`);
    return 2;
  }
  const commit = mergeTask({ root, epic, task, message });
  logAgentSpec({ root, epic, task }, "pipeline-committer script");
  console.log(`MERGED ${commit}`);
  nextTaskLines(epic).forEach((line) => console.log(line));
  return 0;
}

runMain(main);
