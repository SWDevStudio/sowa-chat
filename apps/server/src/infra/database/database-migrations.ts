import type { MigrationInterface } from "typeorm";

export type DatabaseMigration = new () => MigrationInterface;

export const databaseMigrations: DatabaseMigration[] = [];
