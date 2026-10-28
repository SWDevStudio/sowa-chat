export function sqlInList(column: string, values: readonly string[]): string {
  const literals = values.map((value) => `'${value}'`).join(", ");
  return `"${column}" IN (${literals})`;
}
