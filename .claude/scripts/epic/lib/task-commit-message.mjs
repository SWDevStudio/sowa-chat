import fs from "node:fs";
import path from "node:path";
import { epicDir } from "./paths.mjs";

const commitLine = /^Коммит:\s*(.+)$/m;

export function readCommitMessage(root, epic, task) {
  const file = path.join(epicDir(root, epic), `TASK-${task}.md`);
  if (!fs.existsSync(file)) {
    return null;
  }
  const match = commitLine.exec(fs.readFileSync(file, "utf8"));
  return match ? match[1].trim() : null;
}
