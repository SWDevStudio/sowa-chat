import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { databaseConfig } from "../config/database.config.js";
import type { PreparationStep } from "../preparation/preparation-step.js";
import { runDatabaseMigrations } from "./run-database-migrations.js";

@Injectable()
export class DatabaseMigrationStep implements PreparationStep {
  readonly name = "databaseMigrations";
  private readonly logger = new Logger(DatabaseMigrationStep.name);

  constructor(
    @Inject(databaseConfig.KEY) private readonly database: ConfigType<typeof databaseConfig>,
  ) {}

  async run(): Promise<void> {
    const migrations = await runDatabaseMigrations(this.database.migrationUrl);
    this.logger.log({ msg: "Database migrations applied", migrations });
  }
}
