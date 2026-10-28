import type { DataSourceOptions } from "typeorm";
import { databaseMigrations } from "./database-migrations.js";

export type DatabaseEntity = new () => object;

export interface DatabaseConnection {
  url: string;
  poolSize: number;
  entities: DatabaseEntity[];
}

export function createDataSourceOptions(connection: DatabaseConnection): DataSourceOptions {
  return {
    type: "postgres",
    url: connection.url,
    poolSize: connection.poolSize,
    entities: connection.entities,
    synchronize: false,
    applicationName: "sowa-chat-server",
    connectTimeoutMS: 5000,
    migrations: databaseMigrations,
    migrationsTransactionMode: "each",
  };
}
