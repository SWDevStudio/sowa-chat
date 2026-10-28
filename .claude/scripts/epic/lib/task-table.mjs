import path from "node:path";
import { epicDir } from "./paths.mjs";
import { joinRow, readLines, splitRow, writeLines } from "./markdown-file.mjs";

function readmePath(root, epic) {
  return path.join(epicDir(root, epic), "README.md");
}

function findTable(lines) {
  const headerIndex = lines.findIndex((line) => line.startsWith("| № |"));
  if (headerIndex === -1) {
    throw new Error("Task table not found");
  }
  const rowIndexes = [];
  for (let index = headerIndex + 2; lines[index]?.startsWith("|"); index++) {
    rowIndexes.push(index);
  }
  return { header: splitRow(lines[headerIndex]), rowIndexes };
}

function parseDependencies(cell) {
  if (!/\d/.test(cell)) {
    return [];
  }
  return cell.split(",").map((part) => Number(part.trim()));
}

function toTask(header, cells) {
  const cell = (name) => cells[header.indexOf(name)];
  const hasTestsColumn = header.includes("Тесты");
  const hasComplexityColumn = header.includes("Сложность");
  return {
    number: Number(cell("№")),
    executor: cell("Исполнитель"),
    testsModel: hasTestsColumn ? cell("Тесты") : "opus",
    complexity: hasComplexityColumn && cell("Сложность") === "простая" ? "simple" : "normal",
    dependsOn: parseDependencies(cell("Зависит от")),
    status: cell("Статус"),
  };
}

export function readTasks(root, epic) {
  const { lines } = readLines(readmePath(root, epic));
  const { header, rowIndexes } = findTable(lines);
  return rowIndexes.map((index) => toTask(header, splitRow(lines[index])));
}

export function isTableTask(task) {
  return /^\d+$/.test(String(task));
}

export function setTaskStatus({ root, epic, task }, status) {
  const file = readmePath(root, epic);
  const content = readLines(file);
  const { header, rowIndexes } = findTable(content.lines);
  const statusColumn = header.indexOf("Статус");
  const rowIndex = rowIndexes.find((index) => {
    return Number(splitRow(content.lines[index])[0]) === Number(task);
  });
  if (rowIndex === undefined) {
    throw new Error(`Task ${task} not found in EPIC-${epic}`);
  }
  const cells = splitRow(content.lines[rowIndex]);
  cells[statusColumn] = status;
  content.lines[rowIndex] = joinRow(cells);
  writeLines(file, content);
}
