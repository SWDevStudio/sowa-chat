import { Module } from "@nestjs/common";
import { databaseEntities } from "./database-entities.js";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { DatabaseModule } from "./infra/database/database.module.js";
import { ApiHttpModule } from "./infra/http/api-http.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { ZonesModule } from "./infra/zones/zones.module.js";

@Module({
  imports: [
    AppConfigModule,
    AppClsModule,
    DatabaseModule.forRoot(databaseEntities),
    createLoggerModule("api"),
    ZonesModule,
    ApiHttpModule,
  ],
})
export class ApiModule {}
