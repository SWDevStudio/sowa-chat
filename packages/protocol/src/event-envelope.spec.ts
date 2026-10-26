import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "zod";
import { createEventEnvelopeSchema, eventEnvelopeSchema } from "./index.js";
import type { EventEnvelope } from "./index.js";

const validEnvelope = {
  eventId: "0b7e5b5e-3c1a-4d2f-9a6b-1c2d3e4f5a6b",
  type: "message.created",
  occurredAt: "2026-10-26T10:15:30.000Z",
  projectId: "5f0c1d2e-8a9b-4c3d-8e7f-6a5b4c3d2e1f",
  conversationId: "9c8b7a6f-5e4d-4c3b-a2a1-0f9e8d7c6b5a",
  payload: { messageId: "m-1", text: "hello" },
};

const messageCreatedSchema = createEventEnvelopeSchema(
  "message.created",
  z.object({ messageId: z.string(), text: z.string() }),
);

function isAccepted(value: unknown): boolean {
  return eventEnvelopeSchema.safeParse(value).success;
}

function withoutField(field: keyof typeof validEnvelope): Record<string, unknown> {
  const envelope: Record<string, unknown> = { ...validEnvelope };
  delete envelope[field];
  return envelope;
}

describe("eventEnvelopeSchema", () => {
  it("принимает корректный конверт", () => {
    expect(eventEnvelopeSchema.parse(validEnvelope)).toEqual(validEnvelope);
  });

  it("принимает конверт без conversationId", () => {
    const envelope = { ...withoutField("conversationId"), type: "bot.disabled", payload: {} };

    expect(isAccepted(envelope)).toBe(true);
  });

  it("отклоняет конверт без eventId", () => {
    expect(isAccepted(withoutField("eventId"))).toBe(false);
  });

  it.each(["not-a-uuid", "12345", "", "0b7e5b5e3c1a4d2f9a6b1c2d3e4f5a6b"])(
    "отклоняет eventId, который не UUID: %s",
    (eventId) => {
      expect(isAccepted({ ...validEnvelope, eventId })).toBe(false);
    },
  );

  it.each(["26.10.2026 10:15", "2026-10-26 10:15:30", "yesterday", "", "1729937730000"])(
    "отклоняет occurredAt не в ISO 8601: %s",
    (occurredAt) => {
      expect(isAccepted({ ...validEnvelope, occurredAt })).toBe(false);
    },
  );

  it("отклоняет occurredAt не в UTC", () => {
    expect(isAccepted({ ...validEnvelope, occurredAt: "2026-10-26T13:15:30.000+03:00" })).toBe(
      false,
    );
  });

  it.each(["type", "occurredAt", "projectId", "payload"] as const)(
    "отклоняет конверт без %s",
    (field) => {
      expect(isAccepted(withoutField(field))).toBe(false);
    },
  );

  it("отклоняет projectId и conversationId, которые не UUID", () => {
    expect(isAccepted({ ...validEnvelope, projectId: "project-1" })).toBe(false);
    expect(isAccepted({ ...validEnvelope, conversationId: "conversation-1" })).toBe(false);
  });

  it.each([
    ["строка", "text"],
    ["null", null],
    ["массив", [1, 2]],
  ])("отклоняет payload, который не объект: %s", (_title, payload) => {
    expect(isAccepted({ ...validEnvelope, payload })).toBe(false);
  });
});

describe("createEventEnvelopeSchema", () => {
  it("принимает конверт события с верным payload", () => {
    expect(messageCreatedSchema.parse(validEnvelope)).toEqual(validEnvelope);
  });

  it("отклоняет неверный payload", () => {
    expect(
      messageCreatedSchema.safeParse({ ...validEnvelope, payload: { text: 42 } }).success,
    ).toBe(false);
    expect(messageCreatedSchema.safeParse({ ...validEnvelope, payload: {} }).success).toBe(false);
  });

  it("отклоняет чужой type", () => {
    expect(messageCreatedSchema.safeParse({ ...validEnvelope, type: "bot.disabled" }).success).toBe(
      false,
    );
  });

  it("проверяет поля общего конверта", () => {
    expect(
      messageCreatedSchema.safeParse({ ...validEnvelope, eventId: "not-a-uuid" }).success,
    ).toBe(false);
    expect(messageCreatedSchema.safeParse(withoutField("occurredAt")).success).toBe(false);
  });

  it("типизирует type и payload события", () => {
    type MessageCreatedEnvelope = z.infer<typeof messageCreatedSchema>;

    expectTypeOf<MessageCreatedEnvelope["type"]>().toEqualTypeOf<"message.created">();
    expectTypeOf<MessageCreatedEnvelope["payload"]>().toEqualTypeOf<{
      messageId: string;
      text: string;
    }>();
    expectTypeOf<MessageCreatedEnvelope["eventId"]>().toEqualTypeOf<string>();
  });
});

describe("EventEnvelope", () => {
  it("описывает поля конверта", () => {
    expectTypeOf<EventEnvelope["eventId"]>().toEqualTypeOf<string>();
    expectTypeOf<EventEnvelope["type"]>().toEqualTypeOf<string>();
    expectTypeOf<EventEnvelope["occurredAt"]>().toEqualTypeOf<string>();
    expectTypeOf<EventEnvelope["projectId"]>().toEqualTypeOf<string>();
    expectTypeOf<EventEnvelope["conversationId"]>().toEqualTypeOf<string | undefined>();
  });
});
