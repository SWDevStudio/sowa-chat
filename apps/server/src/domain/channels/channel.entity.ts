import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type { Relation } from "typeorm";

import { Project } from "../projects/project.entity.js";

@Entity({ name: "channels" })
export class Channel {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_channels",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @Column({ type: "text" })
  kind!: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_channels_project_id" })
  project?: Relation<Project>;
}
