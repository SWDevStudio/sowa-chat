import { readArgs, runMain } from "./lib/args.mjs";
import { pathsOverlap, readOwnedPaths } from "./lib/owned-paths.mjs";
import { mainRoot } from "./lib/paths.mjs";
import { readTasks } from "./lib/task-table.mjs";

const usage = "node .claude/scripts/epic/next-tasks.mjs <epic>";
const runningStatuses = ["в работе", "на доработке"];

function countDependents(tasks, number) {
  const direct = tasks.filter((task) => task.dependsOn.includes(number));
  return direct.reduce((total, task) => total + 1 + countDependents(tasks, task.number), 0);
}

function isReady(tasks, task) {
  const doneNumbers = tasks
    .filter((other) => other.status === "готова")
    .map((other) => other.number);
  return (
    task.status === "не начата" && task.dependsOn.every((number) => doneNumbers.includes(number))
  );
}

function byPriority(tasks) {
  return (first, second) => {
    const dependentsDiff =
      countDependents(tasks, second.number) - countDependents(tasks, first.number);
    return dependentsDiff === 0 ? first.number - second.number : dependentsDiff;
  };
}

function pickStartable(root, epic, tasks) {
  const busyPaths = tasks
    .filter((task) => runningStatuses.includes(task.status))
    .flatMap((task) => readOwnedPaths(root, epic, task.number));
  const picked = [];
  for (const task of tasks
    .filter((candidate) => isReady(tasks, candidate))
    .sort(byPriority(tasks))) {
    const owned = task.executor === "разработчик" ? [] : readOwnedPaths(root, epic, task.number);
    if (!pathsOverlap(owned, busyPaths)) {
      picked.push(task);
      busyPaths.push(...owned);
    }
  }
  return picked;
}

function printTask(task) {
  if (task.executor === "разработчик") {
    console.log(`developer ${task.number}`);
    return;
  }
  console.log(`start ${task.number} executor=${task.executor} tests=${task.testsModel}`);
}

function main() {
  const [epic] = readArgs(usage, 1);
  const root = mainRoot();
  const tasks = readTasks(root, epic);
  const startable = pickStartable(root, epic, tasks);
  startable.forEach(printTask);
  const running = tasks.filter((task) => runningStatuses.includes(task.status));
  if (startable.length === 0 && running.length === 0) {
    console.log("done");
  }
  if (startable.length === 0 && running.length > 0) {
    console.log(`waiting ${running.map((task) => task.number).join(" ")}`);
  }
  return 0;
}

runMain(main);
