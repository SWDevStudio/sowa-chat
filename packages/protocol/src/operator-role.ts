export const operatorRoles = ["operator", "supervisor"] as const;

export type OperatorRole = (typeof operatorRoles)[number];
