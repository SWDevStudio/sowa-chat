import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { outputLines, run } from "./shell.mjs";

export function worktreeFingerprint(worktree, base) {
  const hash = crypto.createHash("sha1");
  hash.update(run(`git diff ${base}`, worktree).output);
  const untracked = outputLines(run("git ls-files --others --exclude-standard", worktree).output);
  for (const file of untracked.sort()) {
    hash.update(file);
    hash.update(fs.readFileSync(path.join(worktree, file)));
  }
  return hash.digest("hex");
}
