import { logEvent } from "./metrics.mjs";
import { pathsOverlap, readOwnedPaths } from "./owned-paths.mjs";
import { mainRoot } from "./paths.mjs";
import { readTasks } from "./task-table.mjs";

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

function describeTask(task) {
  if (task.executor === "разработчик") {
    return `developer ${task.number}`;
  }
  const testsModel = task.complexity === "simple" ? "haiku" : task.testsModel;
  return `start ${task.number} executor=${task.executor} tests=${testsModel} complexity=${task.complexity}`;
}

export function nextTaskLines(epic) {
  const root = mainRoot();
  const tasks = readTasks(root, epic);
  const startable = pickStartable(root, epic, tasks);
  const lines = startable.map(describeTask);
  const running = tasks.filter((task) => runningStatuses.includes(task.status));
  if (startable.length === 0 && running.length === 0) {
    lines.push("done");
  }
  if (startable.length === 0 && running.length > 0) {
    const runningNumbers = running.map((task) => task.number);
    logEvent(root, { event: "waiting", epic, tasks: runningNumbers });
    lines.push(`waiting ${runningNumbers.join(" ")}`);
  }
  return lines;
}
