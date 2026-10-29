import { createHash } from "node:crypto";

export function sha256(text: string): Buffer {
  return createHash("sha256").update(text).digest();
}

export function replaceLastChar(text: string): string {
  const last = text.at(-1) === "A" ? "B" : "A";
  return `${text.slice(0, -1)}${last}`;
}

function textForms(value: unknown): string[] {
  if (Buffer.isBuffer(value)) {
    return [value.toString("utf8"), value.toString("base64url"), value.toString("hex")];
  }
  return [JSON.stringify(value) ?? ""];
}

export function rowsContainText(rows: Record<string, unknown>[], text: string): boolean {
  const values = rows.flatMap((row) => Object.values(row));
  return values.flatMap(textForms).some((form) => form.includes(text));
}
