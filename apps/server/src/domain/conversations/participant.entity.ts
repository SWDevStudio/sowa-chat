import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { sqlInList } from "../../infra/database/sql-in-list.js";
import { Conversation } from "./conversation.entity.js";

export const participantKinds = ["visitor", "operator", "bot"] as const;
export type ParticipantKind = (typeof participantKinds)[number];

@Entity({ name: "participants" })
@Check("CHK_participants_kind", sqlInList("kind", participantKinds))
export class Participant {
  @PrimaryColumn({
    name: "conversation_id",
    type: "uuid",
    primaryKeyConstraintName: "PK_participants",
  })
  conversationId!: string;

  @ManyToOne(() => Conversation, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({
    name: "conversation_id",
    foreignKeyConstraintName: "FK_participants_conversation_id",
  })
  conversation?: Relation<Conversation>;

  @PrimaryColumn({ type: "text", primaryKeyConstraintName: "PK_participants" })
  kind!: ParticipantKind;

  @PrimaryColumn({
    name: "participant_id",
    type: "uuid",
    primaryKeyConstraintName: "PK_participants",
  })
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
