import type { MigrationInterface } from "typeorm";
import { CreateAuditLog1793200000000 } from "./migrations/1793200000000-CreateAuditLog.js";
import { CreateProjects1793193549883 } from "./migrations/1793193549883-CreateProjects.js";

export type DatabaseMigration = new () => MigrationInterface;

export const databaseMigrations: DatabaseMigration[] = [
  CreateProjects1793193549883,
  CreateAuditLog1793200000000,
];
