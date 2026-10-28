import fs from "node:fs";
import path from "node:path";
import { runOrFail } from "./shell.mjs";

export function mainRoot() {
  const commonDir = runOrFail(
    "git rev-parse --path-format=absolute --git-common-dir",
    process.cwd(),
  );
  return path.dirname(commonDir);
}

export function epicBranch(epic) {
  return `feature/EPIC-${epic}`;
}

export function taskBranch(epic, task) {
  return `epic-${epic}-wip/${task}`;
}

export function worktreePath(root, epic, task) {
  return path.join(root, ".claude", "worktrees", `EPIC-${epic}-${task}`);
}

export function epicDir(root, epic) {
  return path.join(root, "tasks", `EPIC-${epic}`);
}

export function runsDir(root, epic) {
  const dir = path.join(root, ".claude", "epic-runs", `EPIC-${epic}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function logFile(root, epic, name) {
  return path.join(runsDir(root, epic), `${name}.log`);
}
