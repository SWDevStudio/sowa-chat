import fs from "node:fs";
import path from "node:path";

export const analysisInterval = 10;

function metricsFile(root) {
  const dir = path.join(root, ".claude", "epic-runs");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "metrics.jsonl");
}

export function logEvent(root, event) {
  const line = JSON.stringify({ at: new Date().toISOString(), ...event });
  fs.appendFileSync(metricsFile(root), `${line}\n`);
}

export function readEvents(root) {
  const file = metricsFile(root);
  if (!fs.existsSync(file)) {
    return [];
  }
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

export function analysisStatus(root) {
  const events = readEvents(root);
  const analyses = events.filter((event) => event.event === "analysis");
  const lastAnalysisIndex = events.findLastIndex((event) => event.event === "analysis");
  const merged = events
    .slice(lastAnalysisIndex + 1)
    .filter((event) => event.event === "merged").length;
  return { number: analyses.length + 1, merged, due: merged >= analysisInterval };
}
