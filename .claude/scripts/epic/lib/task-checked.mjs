import { worktreePath } from "./paths.mjs";
import { readTaskRun } from "./task-run.mjs";
import { worktreeFingerprint } from "./worktree-state.mjs";

export function isTaskChecked(taskRef) {
  const { base, checkedState } = readTaskRun(taskRef);
  if (!checkedState) {
    return false;
  }
  const worktree = worktreePath(taskRef.root, taskRef.epic, taskRef.task);
  return worktreeFingerprint(worktree, base) === checkedState;
}
