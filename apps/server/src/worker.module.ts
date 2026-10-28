import { Module } from "@nestjs/common";
import { databaseEntities } from "./database-entities.js";
import { AuditModule } from "./domain/audit/audit.module.js";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { DatabaseModule } from "./infra/database/database.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { TelemetryModule } from "./telemetry/telemetry.module.js";
import { RedisModule } from "./infra/redis/redis.module.js";

@Module({
  imports: [
    AppConfigModule,
    AppClsModule,
    DatabaseModule.forRoot(databaseEntities),
    RedisModule,
    createLoggerModule("worker"),
    TelemetryModule,
    AuditModule,
  ],
})
export class WorkerModule {}
