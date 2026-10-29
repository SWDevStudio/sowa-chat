import { operatorRoles } from "@sowa-chat/protocol";
import { z } from "zod";

export const operatorTokenClaimsSchema = z.object({
  projectId: z.string().min(1),
  role: z.enum(operatorRoles),
});

export type OperatorTokenClaims = z.infer<typeof operatorTokenClaimsSchema>;
