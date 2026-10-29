import fs from "node:fs";
import path from "node:path";
import { logEvent } from "./metrics.mjs";
import { groupByPackage, hasScript, packageDirOf } from "./packages.mjs";
import { logFile, mainRoot, worktreePath } from "./paths.mjs";
import { outputLines, quoteAll, run } from "./shell.mjs";
import { failedStep, passedStep, reportSteps, runStep } from "./steps.mjs";
import { readTaskRun, updateTaskRun } from "./task-run.mjs";
import { worktreeFingerprint } from "./worktree-state.mjs";

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
  const unitTests = tests.filter(
    (file) => file.endsWith(".spec.ts") && !file.endsWith(".e2e-spec.ts"),
  );
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

export function checkTask(epic, task) {
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
  const passed = exitCode === 0;
  const checkedState = passed ? worktreeFingerprint(worktree, taskRun.base) : null;
  updateTaskRun({ root, epic, task }, { checkedState });
  logEvent(root, { event: "checked", epic, task, passed });
  return exitCode;
}
