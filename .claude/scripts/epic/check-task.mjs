import fs from "node:fs";
import path from "node:path";
import { readArgs, runMain } from "./lib/args.mjs";
import { logEvent } from "./lib/metrics.mjs";
import { groupByPackage, hasScript, packageDirOf } from "./lib/packages.mjs";
import { logFile, mainRoot, worktreePath } from "./lib/paths.mjs";
import { outputLines, quoteAll, run } from "./lib/shell.mjs";
import { failedStep, passedStep, reportSteps, runStep } from "./lib/steps.mjs";
import { readTaskRun } from "./lib/task-run.mjs";

const usage = "node .claude/scripts/epic/check-task.mjs <epic> <task>";
const lintableFile = /\.(ts|mts|cts|js|mjs|cjs)$/;

function changedFiles(worktree, base) {
  const changed = outputLines(run(`git diff --name-only ${base}`, worktree).output);
  const untracked = outputLines(run("git ls-files --others --exclude-standard", worktree).output);
  return [...new Set([...changed, ...untracked])].filter((file) => {
    return fs.existsSync(path.join(worktree, file));
  });
}

function checkTestsUntouched(worktree, { base, tests }) {
  if (tests.length === 0) {
    return passedStep("tests untouched", "Task has no own tests");
  }
  const result = run(`git diff --name-only ${base} -- ${quoteAll(tests)}`, worktree);
  const touched = outputLines(result.output);
  if (touched.length > 0) {
    return failedStep("tests untouched", `Changed task tests:\n${touched.join("\n")}`);
  }
  return passedStep("tests untouched", "Task tests are unchanged");
}

function runUnitTests(worktree, tests) {
  const unitTests = tests.filter((file) => !file.endsWith(".e2e-spec.ts"));
  const groups = groupByPackage(worktree, unitTests);
  return [...groups].map(([packageDir, files]) => {
    return runStep(
      `tests ${path.basename(packageDir)}`,
      `pnpm exec vitest run ${quoteAll(files)}`,
      packageDir,
    );
  });
}

function runLint(worktree, files) {
  const lintable = files.filter((file) => lintableFile.test(file));
  if (lintable.length === 0) {
    return passedStep("lint", "No files to lint");
  }
  return runStep("lint", `pnpm exec oxlint --type-aware ${quoteAll(lintable)}`, worktree);
}

function runTypeChecks(worktree, files) {
  const packageDirs = new Set(files.map((file) => packageDirOf(worktree, file)).filter(Boolean));
  return [...packageDirs]
    .filter((packageDir) => hasScript(packageDir, "check-types"))
    .map((packageDir) =>
      runStep(`types ${path.basename(packageDir)}`, "pnpm run check-types", packageDir),
    );
}

function main() {
  const [epic, task] = readArgs(usage, 2);
  const root = mainRoot();
  const worktree = worktreePath(root, epic, task);
  const taskRun = readTaskRun({ root, epic, task });
  const files = [...new Set([...changedFiles(worktree, taskRun.base), ...taskRun.tests])];
  const steps = [
    checkTestsUntouched(worktree, taskRun),
    ...runUnitTests(worktree, taskRun.tests),
    runLint(worktree, files),
    ...runTypeChecks(worktree, files),
  ];
  const exitCode = reportSteps(steps, logFile(root, epic, `TASK-${task}.check`));
  logEvent(root, { event: "checked", epic, task, passed: exitCode === 0 });
  return exitCode;
}

runMain(main);
