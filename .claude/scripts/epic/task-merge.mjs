import fs from "node:fs";
import path from "node:path";
import { readArgs, runMain } from "./lib/args.mjs";
import { epicBranch, mainRoot, runsDir, taskBranch, worktreePath } from "./lib/paths.mjs";
import { quote, run, runOrFail } from "./lib/shell.mjs";
import { isTableTask, setTaskStatus } from "./lib/task-table.mjs";

const usage = 'node .claude/scripts/epic/task-merge.mjs <epic> <task> "<commit message>"';

function commitWithMessage(root, epic, message) {
  const messageFile = path.join(runsDir(root, epic), "commit-message.txt");
  fs.writeFileSync(messageFile, `${message}\n`);
  runOrFail(`git commit -F ${quote(messageFile)}`, root);
}

function ensureOnEpicBranch(root, epic) {
  const current = runOrFail("git branch --show-current", root);
  if (current !== epicBranch(epic)) {
    throw new Error(`Main copy is on ${current}, expected ${epicBranch(epic)}`);
  }
}

function removeWorktree(root, epic, task) {
  const worktree = worktreePath(root, epic, task);
  run(`git worktree remove --force ${quote(worktree)}`, root);
  fs.rmSync(worktree, { recursive: true, force: true, maxRetries: 3 });
  runOrFail("git worktree prune", root);
  runOrFail(`git branch -D ${taskBranch(epic, task)}`, root);
}

function main() {
  const [epic, task, message] = readArgs(usage, 3);
  const root = mainRoot();
  ensureOnEpicBranch(root, epic);
  runOrFail(`git merge --squash ${taskBranch(epic, task)}`, root);
  commitWithMessage(root, epic, message);
  const commit = runOrFail("git rev-parse --short HEAD", root);
  if (isTableTask(task)) {
    setTaskStatus({ root, epic, task }, "готова");
    runOrFail(`git add -- tasks/EPIC-${epic}`, root);
    commitWithMessage(root, epic, "[DOCS]: update task status and rework notes");
  }
  removeWorktree(root, epic, task);
  console.log(`MERGED ${commit}`);
  return 0;
}

runMain(main);
