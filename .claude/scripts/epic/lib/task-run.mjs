import fs from "node:fs";
import path from "node:path";
import { runsDir } from "./paths.mjs";

function taskRunFile({ root, epic, task }) {
  return path.join(runsDir(root, epic), `TASK-${task}.json`);
}

export function readTaskRun(taskRef) {
  const file = taskRunFile(taskRef);
  if (!fs.existsSync(file)) {
    return { base: null, tests: [] };
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function updateTaskRun(taskRef, changes) {
  const taskRun = { ...readTaskRun(taskRef), ...changes };
  fs.writeFileSync(taskRunFile(taskRef), `${JSON.stringify(taskRun, null, 2)}\n`);
}
