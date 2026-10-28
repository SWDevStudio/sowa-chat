import fs from "node:fs";
import { readArgs, runMain } from "./lib/args.mjs";
import { logEvent } from "./lib/metrics.mjs";
import { epicBranch, mainRoot, taskBranch, worktreePath } from "./lib/paths.mjs";
import { quote, run, runOrFail } from "./lib/shell.mjs";
import { isTableTask, setTaskStatus } from "./lib/task-table.mjs";
import { updateTaskRun } from "./lib/task-run.mjs";

const usage = "node .claude/scripts/epic/task-start.mjs <epic> <task>";

function branchExists(root, branch) {
  return run(`git rev-parse --verify --quiet refs/heads/${branch}`, root).ok;
}

function enableLongPaths(root) {
  const current = run("git config --get core.longpaths", root).output.trim();
  if (current !== "true") {
    runOrFail("git config core.longpaths true", root);
  }
}

function addWorktree(root, epic, task) {
  enableLongPaths(root);
  const worktree = quote(worktreePath(root, epic, task));
  const branch = taskBranch(epic, task);
  if (branchExists(root, branch)) {
    runOrFail(`git worktree add ${worktree} ${branch}`, root);
    return;
  }
  runOrFail(`git worktree add ${worktree} -b ${branch} ${epicBranch(epic)}`, root);
}

function main() {
  const [epic, task] = readArgs(usage, 2);
  const root = mainRoot();
  const worktree = worktreePath(root, epic, task);
  if (fs.existsSync(worktree)) {
    console.log(`EXISTS ${worktree}`);
    return 0;
  }
  addWorktree(root, epic, task);
  runOrFail("pnpm install --frozen-lockfile --prefer-offline", worktree);
  const taskRef = { root, epic, task };
  updateTaskRun(taskRef, { base: runOrFail("git rev-parse HEAD", worktree) });
  if (isTableTask(task)) {
    setTaskStatus(taskRef, "в работе");
  }
  logEvent(root, { event: "taskStarted", epic, task });
  console.log(`STARTED ${worktree}`);
  return 0;
}

runMain(main);
