import fs from "node:fs";
import path from "node:path";

function skippedFile(root) {
  const dir = path.join(root, ".claude", "epic-runs");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "pipeline-skipped.json");
}

export function readSkipped(root) {
  const file = skippedFile(root);
  if (!fs.existsSync(file)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function skipEpic(root, epic, reason) {
  const skipped = { ...readSkipped(root), [epic]: reason };
  fs.writeFileSync(skippedFile(root), `${JSON.stringify(skipped, null, 2)}\n`);
}
