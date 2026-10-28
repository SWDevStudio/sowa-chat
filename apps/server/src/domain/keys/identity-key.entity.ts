import type { JWK } from "jose";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { Project } from "../projects/project.entity.js";

export const identityKeyAlgorithms = ["EdDSA", "ES256"] as const;
export type IdentityKeyAlgorithm = (typeof identityKeyAlgorithms)[number];

@Entity({ name: "identity_keys" })
@Unique("UQ_identity_keys_project_id_kid", ["projectId", "kid"])
@Check("CHK_identity_keys_alg", `"alg" IN ('EdDSA', 'ES256')`)
export class IdentityKey {
  @PrimaryColumn({
    type: "uuid",
    default: () => "uuidv7()",
    primaryKeyConstraintName: "PK_identity_keys",
  })
  id!: string;

  @Column({ name: "project_id", type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id", foreignKeyConstraintName: "FK_identity_keys_project_id" })
  project?: Project;

  @Column({ type: "text" })
  kid!: string;

  @Column({ type: "text" })
  alg!: IdentityKeyAlgorithm;

  @Column({ name: "public_key", type: "jsonb" })
  publicKey!: JWK;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @Column({ name: "revoked_at", type: "timestamptz", nullable: true })
  revokedAt!: Date | null;
}
