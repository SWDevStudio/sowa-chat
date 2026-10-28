import fs from "node:fs";
import path from "node:path";
import { readArgs, runMain } from "./lib/args.mjs";
import { epicBranch, mainRoot, worktreePath } from "./lib/paths.mjs";
import { outputLines, quoteAll, run, runOrFail } from "./lib/shell.mjs";

const usage = "node .claude/scripts/epic/task-sync.mjs <epic> <task>";

function isMerging(worktree) {
  return run("git rev-parse -q --verify MERGE_HEAD", worktree).ok;
}

function unmergedFiles(worktree) {
  return outputLines(run("git diff --name-only --diff-filter=U", worktree).output);
}

function hasConflictMarkers(worktree, file) {
  const fullPath = path.join(worktree, file);
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  return /^<{7} /m.test(fs.readFileSync(fullPath, "utf8"));
}

function resolveGraphConflicts(worktree) {
  const graphFiles = unmergedFiles(worktree).filter((file) => file.startsWith("graphify-out/"));
  if (graphFiles.length > 0) {
    runOrFail(`git checkout --theirs -- ${quoteAll(graphFiles)}`, worktree);
    runOrFail(`git add -- ${quoteAll(graphFiles)}`, worktree);
  }
}

function finishMerge(worktree) {
  const files = unmergedFiles(worktree);
  const withMarkers = files.filter((file) => hasConflictMarkers(worktree, file));
  if (withMarkers.length > 0) {
    console.log(`CONFLICT ${withMarkers.join(" ")}`);
    return 2;
  }
  if (files.length > 0) {
    runOrFail(`git add -- ${quoteAll(files)}`, worktree);
  }
  runOrFail("git commit --no-edit", worktree);
  console.log("SYNCED");
  return 0;
}

function commitWork(worktree) {
  const changes = outputLines(run("git status --porcelain", worktree).output);
  if (changes.length === 0) {
    return;
  }
  runOrFail("git add -A", worktree);
  runOrFail('git commit -m "WIP: work"', worktree);
}

function main() {
  const [epic, task] = readArgs(usage, 2);
  const worktree = worktreePath(mainRoot(), epic, task);
  if (isMerging(worktree)) {
    return finishMerge(worktree);
  }
  commitWork(worktree);
  if (run(`git merge --no-edit ${epicBranch(epic)}`, worktree).ok) {
    console.log("SYNCED");
    return 0;
  }
  resolveGraphConflicts(worktree);
  return finishMerge(worktree);
}

runMain(main);
