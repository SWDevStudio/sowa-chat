import { z } from "zod";

export const pageQuerySchema = z.object({
  limit: z.coerce.number<number>().int().min(1).max(100).default(50),
});

export type PageQuery = z.infer<typeof pageQuerySchema>;
