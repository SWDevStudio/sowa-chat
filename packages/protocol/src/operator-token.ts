import { z } from "zod";
import { operatorRoles } from "./operator-role.js";

export const operatorTokenRequestSchema = z.object({
  externalId: z.string().trim().min(1).max(255),
  name: z.string().trim().min(1).max(255),
  avatarUrl: z
    .url({ protocol: /^https?$/ })
    .max(2048)
    .optional(),
  role: z.enum(operatorRoles),
});

export type OperatorTokenRequest = z.infer<typeof operatorTokenRequestSchema>;

export const operatorTokenResponseSchema = z.object({
  token: z.string(),
  expiresAt: z.iso.datetime(),
});

export type OperatorTokenResponse = z.infer<typeof operatorTokenResponseSchema>;
