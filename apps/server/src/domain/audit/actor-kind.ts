export const actorKinds = ["system", "cli", "server", "operator", "bot", "visitor"] as const;
export type ActorKind = (typeof actorKinds)[number];
