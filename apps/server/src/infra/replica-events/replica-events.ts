import { z } from "zod";

export const replicaEventPatterns = {
  cacheInvalidate: "cache.invalidate",
} as const;

export const cacheInvalidateEventSchema = z.object({
  keys: z.array(z.string().min(1).max(256)).min(1).max(100),
});
export type CacheInvalidateEvent = z.infer<typeof cacheInvalidateEventSchema>;
