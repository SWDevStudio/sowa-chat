import fs from "node:fs";

export function readLines(file) {
  const text = fs.readFileSync(file, "utf8");
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  return { lines: text.split(eol), eol };
}

export function writeLines(file, { lines, eol }) {
  fs.writeFileSync(file, lines.join(eol));
}

export function splitRow(line) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

export function joinRow(cells) {
  return `| ${cells.join(" | ")} |`;
}
