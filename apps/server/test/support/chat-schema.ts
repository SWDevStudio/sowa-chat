export type ColumnSpec = [type: string, nullable: boolean];

const uuid: ColumnSpec = ["uuid", false];
const nullableUuid: ColumnSpec = ["uuid", true];
const text: ColumnSpec = ["text", false];
const nullableText: ColumnSpec = ["text", true];
const integer: ColumnSpec = ["integer", false];
const nullableInteger: ColumnSpec = ["integer", true];
const jsonb: ColumnSpec = ["jsonb", false];
const nullableJsonb: ColumnSpec = ["jsonb", true];
const boolean: ColumnSpec = ["boolean", false];
const timestamptz: ColumnSpec = ["timestamp with time zone", false];
const nullableTimestamptz: ColumnSpec = ["timestamp with time zone", true];

export const expectedTables: Record<string, Record<string, ColumnSpec>> = {
  visitors: {
    id: uuid,
    project_id: uuid,
    display_code: nullableInteger,
    external_id: nullableText,
    name: nullableText,
    email: nullableText,
    phone: nullableText,
    data: jsonb,
    tech: jsonb,
    merged_into_id: nullableUuid,
    first_seen_at: timestamptz,
    last_seen_at: timestamptz,
  },
  channels: {
    id: uuid,
    project_id: uuid,
    kind: text,
    is_active: boolean,
  },
  conversations: {
    id: uuid,
    project_id: uuid,
    visitor_id: uuid,
    channel_id: uuid,
    status: text,
    assignee_id: nullableUuid,
    active_bot_id: nullableUuid,
    context: jsonb,
    handoff: nullableJsonb,
    last_seq: integer,
    last_message_at: timestamptz,
    routing_cycle: nullableJsonb,
    created_at: timestamptz,
    closed_at: nullableTimestamptz,
    close_reason: nullableText,
  },
  participants: {
    conversation_id: uuid,
    kind: text,
    participant_id: uuid,
    last_delivered_seq: integer,
    last_read_seq: integer,
    joined_at: timestamptz,
    left_at: nullableTimestamptz,
  },
  messages: {
    id: uuid,
    conversation_id: uuid,
    seq: integer,
    sender_kind: text,
    sender_id: nullableUuid,
    type: text,
    custom_type: nullableText,
    body: nullableText,
    payload: nullableJsonb,
    is_internal: boolean,
    client_msg_id: nullableUuid,
    created_at: timestamptz,
  },
  conversation_events: {
    id: uuid,
    conversation_id: uuid,
    type: text,
    actor_kind: text,
    actor_id: nullableUuid,
    data: jsonb,
    created_at: timestamptz,
  },
};

export const expectedColumnCounts: Record<string, number> = {
  visitors: 12,
  channels: 4,
  conversations: 15,
  participants: 7,
  messages: 12,
  conversation_events: 7,
};

export const expectedForeignKeys: Record<string, string> = {
  "visitors.project_id": "CASCADE",
  "visitors.merged_into_id": "SET NULL",
  "channels.project_id": "CASCADE",
  "conversations.project_id": "CASCADE",
  "conversations.visitor_id": "CASCADE",
  "conversations.channel_id": "NO ACTION",
  "participants.conversation_id": "CASCADE",
  "messages.conversation_id": "CASCADE",
  "conversation_events.conversation_id": "CASCADE",
};

export const expectedUniqueIndexes: { table: string; columns: string }[] = [
  { table: "visitors", columns: "project_id, display_code" },
  { table: "visitors", columns: "project_id, external_id" },
  { table: "messages", columns: "conversation_id, seq" },
  { table: "messages", columns: "conversation_id, client_msg_id" },
];
