export const serverModes = ["api", "worker", "migrate", "cli"] as const;

export type ServerMode = (typeof serverModes)[number];

export function parseServerMode(argument: string | undefined): ServerMode | undefined {
  return serverModes.find((mode) => mode === argument);
}
