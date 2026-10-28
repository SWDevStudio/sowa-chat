import type { MigrationInterface } from "typeorm";
import { AddConversationIndexes1793215983154 } from "./migrations/1793215983154-AddConversationIndexes.js";
import { CreateAuditLog1793200000000 } from "./migrations/1793200000000-CreateAuditLog.js";
import { CreateChatTables1793215389271 } from "./migrations/1793215389271-CreateChatTables.js";
import { CreateProjects1793193549883 } from "./migrations/1793193549883-CreateProjects.js";

export type DatabaseMigration = new () => MigrationInterface;

export const databaseMigrations: DatabaseMigration[] = [
  CreateProjects1793193549883,
  CreateChatTables1793215389271,
  AddConversationIndexes1793215983154,
  CreateAuditLog1793200000000,
];
