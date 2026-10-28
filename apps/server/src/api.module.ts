import { Module } from "@nestjs/common";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { ZonesModule } from "./infra/zones/zones.module.js";
import { ApiHttpModule } from "./infra/http/api-http.module.js";

@Module({
  imports: [AppConfigModule, AppClsModule, createLoggerModule("api"), ZonesModule, ApiHttpModule],
})
export class ApiModule {}
