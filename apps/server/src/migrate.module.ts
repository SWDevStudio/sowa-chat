import { Module } from "@nestjs/common";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { createLoggerModule } from "./infra/logging/logger.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { DatabaseMigrationStep } from "./infra/database/database-migration.step.js";
import { PreparationRunner } from "./infra/preparation/preparation-runner.js";
import { preparationSteps } from "./infra/preparation/preparation-step.js";

@Module({
  imports: [AppConfigModule, AppClsModule, createLoggerModule("migrate")],
  providers: [
    DatabaseMigrationStep,
    {
      provide: preparationSteps,
      useFactory: (databaseMigration: DatabaseMigrationStep) => [databaseMigration],
      inject: [DatabaseMigrationStep],
    },
    PreparationRunner,
  ],
})
export class MigrateModule {}
