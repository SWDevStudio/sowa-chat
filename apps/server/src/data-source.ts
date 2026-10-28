import { DataSource } from "typeorm";
import { databaseEntities } from "./database-entities.js";
import { databaseConfig } from "./infra/config/database.config.js";
import { createDataSourceOptions } from "./infra/database/database-options.js";

const database = databaseConfig();

export default new DataSource(
  createDataSourceOptions({
    url: database.migrationUrl,
    poolSize: database.poolSize,
    entities: databaseEntities,
  }),
);
