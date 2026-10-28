import type { MigrationInterface } from "typeorm";
import { CreateProjects1793193549883 } from "./migrations/1793193549883-CreateProjects.js";

export type DatabaseMigration = new () => MigrationInterface;

export const databaseMigrations: DatabaseMigration[] = [CreateProjects1793193549883];
