import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
  Unique,
} from "typeorm";

import { Visitor } from "./visitor.entity.js";

@Entity({ name: "visitor_sessions" })
@Unique("UQ_visitor_sessions_refresh_hash", ["refreshHash"])
@Index("IDX_visitor_sessions_family_id", ["familyId"])
@Index("IDX_visitor_sessions_visitor_id", ["visitorId"])
export class VisitorSession {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_visitor_sessions",
  })
  id!: string;

  @Column({ name: "visitor_id", type: "uuid" })
  visitorId!: string;

  @ManyToOne(() => Visitor, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "visitor_id", foreignKeyConstraintName: "FK_visitor_sessions_visitor_id" })
  visitor?: Relation<Visitor>;

  @Column({ name: "family_id", type: "uuid" })
  familyId!: string;

  @Column({ name: "refresh_hash", type: "bytea" })
  refreshHash!: Buffer;

  @Column({ name: "expires_at", type: "timestamptz" })
  expiresAt!: Date;

  @Column({ name: "used_at", type: "timestamptz", nullable: true })
  usedAt!: Date | null;

  @Column({ name: "revoked_at", type: "timestamptz", nullable: true })
  revokedAt!: Date | null;
}
