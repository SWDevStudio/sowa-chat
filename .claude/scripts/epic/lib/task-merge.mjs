import fs from "node:fs";
import path from "node:path";
import { logEvent } from "./metrics.mjs";
import { epicBranch, runsDir, taskBranch, worktreePath } from "./paths.mjs";
import { outputLines, quote, run, runOrFail } from "./shell.mjs";
import { isTableTask, setTaskStatus } from "./task-table.mjs";

const graphDir = "graphify-out";

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

function unmergedFiles(root) {
  return outputLines(run("git diff --name-only --diff-filter=U", root).output);
}

function keepEpicGraph(root) {
  runOrFail(`git reset -q HEAD -- ${graphDir}`, root);
  runOrFail(`git checkout -- ${graphDir}`, root);
  runOrFail(`git clean -fdq -- ${graphDir}`, root);
}

function squashTaskBranch(root, epic, task) {
  const result = run(`git merge --squash ${taskBranch(epic, task)}`, root);
  const conflicts = unmergedFiles(root);
  const onlyGraphConflicts = conflicts.every((file) => file.startsWith(`${graphDir}/`));
  if (!result.ok && (conflicts.length === 0 || !onlyGraphConflicts)) {
    throw new Error(`git merge --squash ${taskBranch(epic, task)}\n${result.output}`);
  }
  keepEpicGraph(root);
}

function removeWorktree(root, epic, task) {
  const worktree = worktreePath(root, epic, task);
  run(`git worktree remove --force ${quote(worktree)}`, root);
  fs.rmSync(worktree, { recursive: true, force: true, maxRetries: 3 });
  runOrFail("git worktree prune", root);
  runOrFail(`git branch -D ${taskBranch(epic, task)}`, root);
}

export function mergeTask({ root, epic, task, message }) {
  ensureOnEpicBranch(root, epic);
  squashTaskBranch(root, epic, task);
  commitWithMessage(root, epic, message);
  const commit = runOrFail("git rev-parse --short HEAD", root);
  if (isTableTask(task)) {
    setTaskStatus({ root, epic, task }, "готова");
    runOrFail(`git add -- tasks/EPIC-${epic}`, root);
    commitWithMessage(root, epic, "[DOCS]: update task status and rework notes");
  }
  removeWorktree(root, epic, task);
  logEvent(root, { event: "merged", epic, task });
  return commit;
}
