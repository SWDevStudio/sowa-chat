import { z } from "zod";

export const errorCodes = {
  validationFailed: "validationFailed",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  notFound: "notFound",
  conflict: "conflict",
  payloadTooLarge: "payloadTooLarge",
  rateLimited: "rateLimited",
  internalError: "internalError",
  contextInvalid: "contextInvalid",
} as const;

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];

const errorDetailSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export const errorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  code: z.enum(errorCodes),
  requestId: z.uuid(),
  details: z.array(errorDetailSchema).optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
