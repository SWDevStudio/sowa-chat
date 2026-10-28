import path from "node:path";
import { epicDir } from "./paths.mjs";
import { joinRow, readLines, splitRow, writeLines } from "./markdown-file.mjs";

function indexPath(root) {
  return path.join(root, "tasks", "README.md");
}

function epicNumber(line) {
  const match = line.match(/^\| \[EPIC-(\d+)\]/);
  return match ? Number(match[1]) : null;
}

export function readEpics(root) {
  const { lines } = readLines(indexPath(root));
  return lines
    .filter((line) => epicNumber(line) !== null)
    .map((line) => ({ number: epicNumber(line), status: splitRow(line).at(-1) }));
}

export function setEpicStatus(root, epic, status) {
  const file = indexPath(root);
  const content = readLines(file);
  const rowIndex = content.lines.findIndex((line) => epicNumber(line) === Number(epic));
  if (rowIndex === -1) {
    throw new Error(`EPIC-${epic} not found in tasks/README.md`);
  }
  const cells = splitRow(content.lines[rowIndex]);
  cells[cells.length - 1] = status;
  content.lines[rowIndex] = joinRow(cells);
  writeLines(file, content);
}

export function readRequiredEpics(root, epic) {
  const { lines } = readLines(path.join(epicDir(root, epic), "README.md"));
  const line = lines.find((text) => text.startsWith("Нужны эпики:"));
  if (!line) {
    return [];
  }
  return (line.match(/\d+/g) ?? []).map(Number);
}
