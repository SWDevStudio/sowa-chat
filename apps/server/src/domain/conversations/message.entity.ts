import type { JsonObject } from "@sowa-chat/protocol";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { Conversation } from "./conversation.entity.js";

export type MessageSenderKind = "visitor" | "operator" | "bot" | "system";
export type MessageType = "text" | "media" | "system" | "custom";

@Entity({ name: "messages" })
@Index(["conversationId", "seq"], { unique: true })
@Index(["conversationId", "clientMsgId"], { unique: true })
export class Message {
  @PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })
  id!: string;

  @Column({ name: "conversation_id", type: "uuid" })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "conversation_id" })
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
