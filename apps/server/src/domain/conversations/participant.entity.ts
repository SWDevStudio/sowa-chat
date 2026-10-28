import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from "typeorm";

import { Conversation } from "./conversation.entity.js";

export type ParticipantKind = "visitor" | "operator" | "bot";

@Entity({ name: "participants" })
export class Participant {
  @PrimaryColumn({ name: "conversation_id", type: "uuid" })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "conversation_id" })
  conversation?: Relation<Conversation>;

  @PrimaryColumn({ type: "text" })
  kind!: ParticipantKind;

  @PrimaryColumn({ name: "participant_id", type: "uuid" })
  participantId!: string;

  @Column({ name: "last_delivered_seq", type: "integer", default: 0 })
  lastDeliveredSeq!: number;

  @Column({ name: "last_read_seq", type: "integer", default: 0 })
  lastReadSeq!: number;

  @Column({ name: "joined_at", type: "timestamptz", default: () => "now()" })
  joinedAt!: Date;

  @Column({ name: "left_at", type: "timestamptz", nullable: true })
  leftAt!: Date | null;
}
