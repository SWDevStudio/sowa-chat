/**
 * @description Конверт исходящих событий: общие поля события, которые сервер
 * отправляет подписчикам (боты, вебхуки). Конкретное событие задает свой
 * payload через createEventEnvelopeSchema.
 */
import { z } from "zod";

export const eventEnvelopeSchema = z.object({
  eventId: z.uuid(),
  type: z.string().min(1),
  occurredAt: z.iso.datetime(),
  projectId: z.uuid(),
  conversationId: z.uuid().optional(),
  payload: z.record(z.string(), z.unknown()),
});

export type EventEnvelope = z.infer<typeof eventEnvelopeSchema>;

export function createEventEnvelopeSchema<
  EventType extends string,
  PayloadSchema extends z.ZodObject,
>(type: EventType, payloadSchema: PayloadSchema) {
  return eventEnvelopeSchema.extend({
    type: z.literal(type),
    payload: payloadSchema,
  });
}
