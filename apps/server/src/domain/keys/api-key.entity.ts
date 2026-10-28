import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { Project } from "../projects/project.entity.js";

export const apiKeyKinds = ["server", "bot"] as const;
export type ApiKeyKind = (typeof apiKeyKinds)[number];

@Entity({ name: "api_keys" })
@Unique("UQ_api_keys_prefix", ["prefix"])
@Index("IDX_api_keys_project_id", ["projectId"])
@Check("CHK_api_keys_kind", `"kind" IN ('server', 'bot')`)
@Check("CHK_api_keys_bot_id", `("kind" = 'bot') = ("bot_id" IS NOT NULL)`)
export class ApiKey {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_api_keys",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_api_keys_project_id" })
  project?: Project;

  @Column({ type: "text" })
  kind!: ApiKeyKind;

  @Column({ type: "text" })
  prefix!: string;

  @Column({ name: "key_hash", type: "bytea" })
  keyHash!: Buffer;

  @Column({ name: "bot_id", type: "uuid", nullable: true })
  botId!: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @Column({ name: "last_used_at", type: "timestamptz", nullable: true })
  lastUsedAt!: Date | null;

  @Column({ name: "revoked_at", type: "timestamptz", nullable: true })
  revokedAt!: Date | null;
}
