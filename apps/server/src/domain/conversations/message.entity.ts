import type { JsonObject } from "@sowa-chat/protocol";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { sqlInList } from "../../infra/database/sql-in-list.js";
import { Conversation } from "./conversation.entity.js";

export const messageSenderKinds = ["visitor", "operator", "bot", "system"] as const;
export type MessageSenderKind = (typeof messageSenderKinds)[number];

export const messageTypes = ["text", "media", "system", "custom"] as const;
export type MessageType = (typeof messageTypes)[number];

@Entity({ name: "messages" })
@Index("IDX_messages_conversation_id_seq", ["conversationId", "seq"], { unique: true })
@Index("IDX_messages_conversation_id_client_msg_id", ["conversationId", "clientMsgId"], {
  unique: true,
})
@Check("CHK_messages_sender_kind", sqlInList("sender_kind", messageSenderKinds))
@Check("CHK_messages_type", sqlInList("type", messageTypes))
export class Message {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_messages",
  })
  id!: string;

  @Column({ name: "conversation_id", type: "uuid" })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "conversation_id", foreignKeyConstraintName: "FK_messages_conversation_id" })
  conversation?: Relation<Conversation>;

  @Column({ type: "integer" })
  seq!: number;

  @Column({ name: "sender_kind", type: "text" })
  senderKind!: MessageSenderKind;

  @Column({ name: "sender_id", type: "uuid", nullable: true })
  senderId!: string | null;

  @Column({ type: "text" })
  type!: MessageType;

  @Column({ name: "custom_type", type: "text", nullable: true })
  customType!: string | null;

  @Column({ type: "text", nullable: true })
  body!: string | null;

  @Column({ type: "jsonb", nullable: true })
  payload!: JsonObject | null;

  @Column({ name: "is_internal", type: "boolean", default: false })
  isInternal!: boolean;

  @Column({ name: "client_msg_id", type: "uuid", nullable: true })
  clientMsgId!: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
