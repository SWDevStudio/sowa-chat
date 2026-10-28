import fs from "node:fs";
import path from "node:path";
import { runOrFail } from "./shell.mjs";

const taskWorktreesMarker = "/.claude/worktrees/";

export function mainRoot() {
  const topLevel = runOrFail("git rev-parse --show-toplevel", process.cwd()).replaceAll("\\", "/");
  const markerIndex = topLevel.indexOf(taskWorktreesMarker);
  return markerIndex === -1
    ? path.normalize(topLevel)
    : path.normalize(topLevel.slice(0, markerIndex));
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
