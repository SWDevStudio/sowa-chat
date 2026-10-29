import type { OperatorRole } from "@sowa-chat/protocol";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Project } from "../projects/project.entity.js";

@Entity({ name: "operators" })
@Unique("UQ_operators_project_id_external_id", ["projectId", "externalId"])
@Check("CHK_operators_role", `"role" IN ('operator', 'supervisor')`)
export class Operator {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_operators",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_operators_project_id" })
  project?: Project;

  @Column({ name: "external_id", type: "text" })
  externalId!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ name: "avatar_url", type: "text", nullable: true })
  avatarUrl!: string | null;

  @Column({ type: "text" })
  role!: OperatorRole;

  @Column({ name: "max_chats", type: "integer", nullable: true })
  maxChats!: number | null;

  @Column({ name: "disabled_at", type: "timestamptz", nullable: true })
  disabledAt!: Date | null;
}
