import { Module } from "@nestjs/common";
import { KeyGenerateCommand } from "./cli/keys/key-generate.command.js";
import { ProjectCreateCommand } from "./cli/projects/project-create.command.js";
import { ProjectListCommand } from "./cli/projects/project-list.command.js";
import { databaseEntities } from "./database-entities.js";
import { AuditModule } from "./domain/audit/audit.module.js";
import { ProjectsModule } from "./domain/projects/projects.module.js";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { DatabaseModule } from "./infra/database/database.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { TelemetryModule } from "./telemetry/telemetry.module.js";

@Module({
  imports: [
    AppConfigModule,
    AppClsModule,
    DatabaseModule.forRoot(databaseEntities),
    createLoggerModule("cli"),
    TelemetryModule,
    AuditModule,
    ProjectsModule,
  ],
  providers: [KeyGenerateCommand, ProjectCreateCommand, ProjectListCommand],
})
export class CliModule {}
