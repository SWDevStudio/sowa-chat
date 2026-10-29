import { z } from "zod";

export const visitorSessionRequestSchema = z.object({
  publicKey: z.string().min(1).max(128),
});

export type VisitorSessionRequest = z.infer<typeof visitorSessionRequestSchema>;

export const visitorSessionRefreshRequestSchema = z.object({
  refreshToken: z.string().min(1).max(128),
});

export type VisitorSessionRefreshRequest = z.infer<typeof visitorSessionRefreshRequestSchema>;

export const visitorSessionResponseSchema = z.object({
  accessToken: z.string(),
  accessTokenExpiresAt: z.iso.datetime(),
  refreshToken: z.string(),
});

export type VisitorSessionResponse = z.infer<typeof visitorSessionResponseSchema>;
