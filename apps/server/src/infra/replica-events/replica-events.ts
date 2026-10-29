import { z } from "zod";

export const replicaEventPatterns = {
  cacheInvalidate: "cache.invalidate",
  operatorDisabled: "operator.disabled",
  operatorEnabled: "operator.enabled",
} as const;

export const cacheInvalidateEventSchema = z.object({
  keys: z.array(z.string().min(1).max(256)).min(1).max(100),
});
export type CacheInvalidateEvent = z.infer<typeof cacheInvalidateEventSchema>;

export const operatorReplicaEventSchema = z.object({ operatorId: z.uuid() });
export type OperatorReplicaEvent = z.infer<typeof operatorReplicaEventSchema>;
