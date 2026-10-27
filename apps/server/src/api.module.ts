import { Module } from "@nestjs/common";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";

@Module({
  imports: [AppConfigModule, AppClsModule, createLoggerModule("api")],
})
export class ApiModule {}
