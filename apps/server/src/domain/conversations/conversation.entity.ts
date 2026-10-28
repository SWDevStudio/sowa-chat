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
import { Channel } from "../channels/channel.entity.js";
import { Project } from "../projects/project.entity.js";
import { Visitor } from "../visitors/visitor.entity.js";

export const conversationStatuses = ["bot", "queued", "assigned", "resolved"] as const;
export type ConversationStatus = (typeof conversationStatuses)[number];

export const conversationCloseReasons = ["operator", "inactivity", "bot"] as const;
export type ConversationCloseReason = (typeof conversationCloseReasons)[number];

@Entity({ name: "conversations" })
@Check("CHK_conversations_status", sqlInList("status", conversationStatuses))
@Check("CHK_conversations_close_reason", sqlInList("close_reason", conversationCloseReasons))
@Index("IDX_conversations_context", { synchronize: false })
@Index("IDX_conversations_project_status_last_message_at", { synchronize: false })
export class Conversation {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_conversations",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_conversations_project_id" })
  project?: Relation<Project>;

  @Column({ name: "visitor_id", type: "uuid" })
  visitorId!: string;

  @ManyToOne(() => Visitor, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "visitor_id", foreignKeyConstraintName: "FK_conversations_visitor_id" })
  visitor?: Relation<Visitor>;

  @Column({ name: "channel_id", type: "uuid" })
  channelId!: string;

  @ManyToOne(() => Channel, { nullable: false })
  @JoinColumn({ name: "channel_id", foreignKeyConstraintName: "FK_conversations_channel_id" })
  channel?: Relation<Channel>;

  @Column({ type: "text" })
  status!: ConversationStatus;

  @Column({ name: "assignee_id", type: "uuid", nullable: true })
  assigneeId!: string | null;

  @Column({ name: "active_bot_id", type: "uuid", nullable: true })
  activeBotId!: string | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  context!: JsonObject;

  @Column({ type: "jsonb", nullable: true })
  handoff!: JsonObject | null;

  @Column({ name: "last_seq", type: "integer", default: 0 })
  lastSeq!: number;

  @Column({ name: "last_message_at", type: "timestamptz", default: () => "now()" })
  lastMessageAt!: Date;

  @Column({ name: "routing_cycle", type: "jsonb", nullable: true })
  routingCycle!: JsonObject | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @Column({ name: "closed_at", type: "timestamptz", nullable: true })
  closedAt!: Date | null;

  @Column({ name: "close_reason", type: "text", nullable: true })
  closeReason!: ConversationCloseReason | null;
}
