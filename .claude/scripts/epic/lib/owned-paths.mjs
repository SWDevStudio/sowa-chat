import fs from "node:fs";
import path from "node:path";
import { epicDir } from "./paths.mjs";

function normalize(ownedPath) {
  return ownedPath.trim().replace(/^\.\//, "").replace(/\/$/, "");
}

function ownedLinePaths(text) {
  const line = text.split(/\r?\n/).find((row) => row.startsWith("Владеет:"));
  if (!line) {
    return null;
  }
  return line
    .slice("Владеет:".length)
    .replaceAll("`", "")
    .split(",")
    .map(normalize)
    .filter((ownedPath) => ownedPath !== "");
}

function whereSectionPaths(text) {
  const section = text.split(/^## Где\s*$/m)[1]?.split(/^## /m)[0] ?? "";
  const quoted = section.match(/`[^`]+`/g) ?? [];
  return quoted
    .map((token) => normalize(token.slice(1, -1)))
    .filter((token) => token.includes("/"));
}

export function readOwnedPaths(root, epic, task) {
  const text = fs.readFileSync(path.join(epicDir(root, epic), `TASK-${task}.md`), "utf8");
  return ownedLinePaths(text) ?? whereSectionPaths(text);
}

function isInside(child, parent) {
  return child === parent || child.startsWith(`${parent}/`);
}

export function pathsOverlap(first, second) {
  return first.some((a) => second.some((b) => isInside(a, b) || isInside(b, a)));
}
