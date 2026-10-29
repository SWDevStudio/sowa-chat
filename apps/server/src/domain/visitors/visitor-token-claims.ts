import { z } from "zod";

export const visitorTokenClaimsSchema = z.object({ projectId: z.string().min(1) });

export type VisitorTokenClaims = z.infer<typeof visitorTokenClaimsSchema>;
