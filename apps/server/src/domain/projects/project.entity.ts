import type { JsonObject } from "@sowa-chat/protocol";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "projects" })
export class Project {
  @PrimaryColumn({ type: "uuid", default: () => "uuidv7()" })
  id!: string;

  @Column({ type: "text", unique: true })
  name!: string;

  @Column({ name: "allowed_origins", type: "text", array: true, default: () => "'{}'" })
  allowedOrigins!: string[];

  @Column({ type: "jsonb", default: () => "'{}'" })
  settings!: JsonObject;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
