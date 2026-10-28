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
} from "typeorm";
import { Project } from "../projects/project.entity.js";
import type { ActorKind } from "./actor-kind.js";

@Entity({ name: "audit_log" })
@Index("IDX_audit_log_project_id_created_at", ["projectId", "createdAt"])
@Check(
  "CHK_audit_log_actor_kind",
  `"actor_kind" IN ('system', 'cli', 'server', 'operator', 'bot', 'visitor')`,
)
export class AuditLogEntry {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_audit_log",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid", nullable: true })
  projectId!: string | null;

  @ManyToOne(() => Project, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_audit_log_project_id" })
  project?: Project | null;

  @Column({ name: "actor_kind", type: "text" })
  actorKind!: ActorKind;

  @Column({ name: "actor_id", type: "text", nullable: true })
  actorId!: string | null;

  @Column({ type: "text" })
  action!: string;

  @Column({ name: "target_kind", type: "text" })
  targetKind!: string;

  @Column({ name: "target_id", type: "text", nullable: true })
  targetId!: string | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  data!: JsonObject;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
