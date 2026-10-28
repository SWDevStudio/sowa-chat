import type { DataSourceOptions } from "typeorm";

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
  };
}
