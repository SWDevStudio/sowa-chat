export const apiZones = ["public", "operator", "internal", "management"] as const;

export type ApiZone = (typeof apiZones)[number];

export type ZonePorts = Record<ApiZone, number>;
