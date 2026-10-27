import { Module } from "@nestjs/common";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";

@Module({
  imports: [AppConfigModule, createLoggerModule("cli")],
})
export class CliModule {}
