export const originLists = ["allowedOrigins", "operatorAllowedOrigins"] as const;

export type OriginList = (typeof originLists)[number];
