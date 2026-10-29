import { Module } from "@nestjs/common";
import { OperatorAuthModule } from "./api/operator/operator-auth.module.js";
import { ServerApiModule } from "./api/server/server-api.module.js";
import { ServerAuthModule } from "./api/server/server-auth.module.js";
import { databaseEntities } from "./database-entities.js";
import { AuditModule } from "./domain/audit/audit.module.js";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { DatabaseModule } from "./infra/database/database.module.js";
import { EnvironmentChecksModule } from "./infra/environment-checks/environment-checks.module.js";
import { ApiHttpModule } from "./infra/http/api-http.module.js";
import { HealthModule } from "./infra/health/health.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { RedisModule } from "./infra/redis/redis.module.js";
import { RequestContextModule } from "./infra/request-context/request-context.module.js";
import { ZonesModule } from "./infra/zones/zones.module.js";
import { TelemetryModule } from "./telemetry/telemetry.module.js";

@Module({
  imports: [
    AppConfigModule,
    AppClsModule,
    RequestContextModule,
    DatabaseModule.forRoot(databaseEntities),
    RedisModule,
    EnvironmentChecksModule,
    createLoggerModule("api"),
    TelemetryModule,
    AuditModule,
    ZonesModule,
    ApiHttpModule,
    HealthModule,
    ServerAuthModule,
    OperatorAuthModule,
    ServerApiModule,
  ],
})
export class ApiModule {}
