import type { JsonObject } from "@sowa-chat/protocol";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { sqlInList } from "../../infra/database/sql-in-list.js";
import { Conversation } from "./conversation.entity.js";

export const conversationEventActorKinds = ["visitor", "operator", "bot", "system"] as const;
export type ConversationEventActorKind = (typeof conversationEventActorKinds)[number];

@Entity({ name: "conversation_events" })
@Check("CHK_conversation_events_actor_kind", sqlInList("actor_kind", conversationEventActorKinds))
export class ConversationEvent {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_conversation_events",
  })
  id!: string;

  @Column({ name: "conversation_id", type: "uuid" })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({
    name: "conversation_id",
    foreignKeyConstraintName: "FK_conversation_events_conversation_id",
  })
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
