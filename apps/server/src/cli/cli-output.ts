export const emptyCell = "-";

export function writeLine(text: string): void {
  process.stdout.write(`${text}\n`);
}

export const serverKeyOnceWarning =
  "serverKey is shown only once: store it in your secret storage now";

export function writeWarning(text: string): void {
  process.stderr.write(`${text}\n`);
}

export function writeTable(header: string[], rows: string[][]): void {
  writeLine(header.join("\t"));
  for (const row of rows) {
    writeLine(row.join("\t"));
  }
}

export function formatDate(date: Date | null): string {
  if (date === null) {
    return emptyCell;
  }
  return date.toISOString();
}
