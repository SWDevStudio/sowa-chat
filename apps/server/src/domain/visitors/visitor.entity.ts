import type { JsonObject } from "@sowa-chat/protocol";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";

import { Project } from "../projects/project.entity.js";

@Entity({ name: "visitors" })
@Index(["projectId", "displayCode"], { unique: true })
@Index(["projectId", "externalId"], { unique: true })
export class Visitor {
  @PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project?: Relation<Project>;

  @Column({ name: "display_code", type: "integer", nullable: true })
  displayCode!: number | null;

  @Column({ name: "external_id", type: "text", nullable: true })
  externalId!: string | null;

  @Column({ type: "text", nullable: true })
  name!: string | null;

  @Column({ type: "text", nullable: true })
  email!: string | null;

  @Column({ type: "text", nullable: true })
  phone!: string | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  data!: JsonObject;

  @Column({ type: "jsonb", default: () => "'{}'" })
  tech!: JsonObject;

  @Column({ name: "merged_into_id", type: "uuid", nullable: true })
  mergedIntoId!: string | null;

  @ManyToOne(() => Visitor, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "merged_into_id" })
  mergedInto?: Relation<Visitor> | null;

  @Column({ name: "first_seen_at", type: "timestamptz", default: () => "now()" })
  firstSeenAt!: Date;

  @Column({ name: "last_seen_at", type: "timestamptz", default: () => "now()" })
  lastSeenAt!: Date;
}
