import type { JsonObject } from "@sowa-chat/protocol";
import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity({ name: "projects" })
@Unique("UQ_projects_public_key", ["publicKey"])
export class Project {
  @PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })
  id!: string;

  @Column({ type: "text", unique: true })
  name!: string;

  @Column({ name: "allowed_origins", type: "text", array: true, default: () => "'{}'" })
  allowedOrigins!: string[];

  @Column({ name: "public_key", type: "text", nullable: true })
  publicKey!: string | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  settings!: JsonObject;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
