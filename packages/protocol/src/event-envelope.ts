import { z } from "zod";

export const eventEnvelopeSchema = z.object({
  eventId: z.uuid(),
  type: z.string(),
  occurredAt: z.iso.datetime(),
  projectId: z.uuid(),
  conversationId: z.uuid().optional(),
  payload: z.record(z.string(), z.unknown()),
});

export type EventEnvelope = z.infer<typeof eventEnvelopeSchema>;

export function createEventEnvelopeSchema<T extends string, P extends z.ZodObject>(
  type: T,
  payloadSchema: P,
) {
  return eventEnvelopeSchema.extend({
    type: z.literal(type),
    payload: payloadSchema,
  });
}
