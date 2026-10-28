import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import { ClsPluginTransactional } from "@nestjs-cls/transactional";
import { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { databaseConfig } from "../config/database.config.js";
import { createDataSourceOptions } from "./database-options.js";
import type { DatabaseEntity } from "./database-options.js";

const typeOrmModules = new WeakMap<DatabaseEntity[], DynamicModule>();

function createTypeOrmModule(entities: DatabaseEntity[]): DynamicModule {
  return TypeOrmModule.forRootAsync({
    inject: [databaseConfig.KEY],
    useFactory: (database: ConfigType<typeof databaseConfig>) => ({
      ...createDataSourceOptions({
        url: database.url,
        poolSize: database.poolSize,
        entities,
      }),
      retryAttempts: 3,
      retryDelay: 1000,
    }),
  });
}

function getTypeOrmModule(entities: DatabaseEntity[]): DynamicModule {
  const cached = typeOrmModules.get(entities);
  if (cached) {
    return cached;
  }
  const created = createTypeOrmModule(entities);
  typeOrmModules.set(entities, created);
  return created;
}

@Module({})
export class DatabaseModule {
  static forRoot(entities: DatabaseEntity[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        getTypeOrmModule(entities),
        ClsModule.registerPlugins([
          new ClsPluginTransactional({
            adapter: new TransactionalAdapterTypeOrm({ dataSourceToken: getDataSourceToken() }),
          }),
        ]),
      ],
    };
  }
}
