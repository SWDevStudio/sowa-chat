import type { JsonObject } from "@sowa-chat/protocol";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { Conversation } from "./conversation.entity.js";

export type ConversationEventActorKind = "visitor" | "operator" | "bot" | "system";

@Entity({ name: "conversation_events" })
export class ConversationEvent {
  @PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })
  id!: string;

  @Column({ name: "conversation_id", type: "uuid" })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "conversation_id" })
  conversation?: Relation<Conversation>;

  @Column({ type: "text" })
  type!: string;

  @Column({ name: "actor_kind", type: "text" })
  actorKind!: ConversationEventActorKind;

  @Column({ name: "actor_id", type: "uuid", nullable: true })
  actorId!: string | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  data!: JsonObject;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
