import { Module } from "@nestjs/common";
import { IdentityKeyAddCommand } from "./cli/identity-keys/identity-key-add.command.js";
import { IdentityKeyListCommand } from "./cli/identity-keys/identity-key-list.command.js";
import { IdentityKeyRevokeCommand } from "./cli/identity-keys/identity-key-revoke.command.js";
import { KeyCreateCommand } from "./cli/keys/key-create.command.js";
import { KeyGenerateCommand } from "./cli/keys/key-generate.command.js";
import { KeyListCommand } from "./cli/keys/key-list.command.js";
import { KeyRevokeCommand } from "./cli/keys/key-revoke.command.js";
import {
  OperatorOriginAddCommand,
  OperatorOriginListCommand,
  OperatorOriginRemoveCommand,
  OriginAddCommand,
  OriginListCommand,
  OriginRemoveCommand,
} from "./cli/origins/origin.commands.js";
import { ProjectCreateCommand } from "./cli/projects/project-create.command.js";
import { ProjectListCommand } from "./cli/projects/project-list.command.js";
import { SecretsReencryptCommand } from "./cli/secrets/secrets-reencrypt.command.js";
import { databaseEntities } from "./database-entities.js";
import { AuditModule } from "./domain/audit/audit.module.js";
import { KeysModule } from "./domain/keys/keys.module.js";
import { ProjectsModule } from "./domain/projects/projects.module.js";
import { AppClsModule } from "./infra/cls/app-cls.module.js";
import { AppConfigModule } from "./infra/config/config.module.js";
import { SecretsReencryptionModule } from "./infra/crypto/secrets-reencryption.module.js";
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
    KeysModule,
    ProjectsModule,
    SecretsReencryptionModule,
  ],
  providers: [
    KeyCreateCommand,
    KeyGenerateCommand,
    KeyListCommand,
    KeyRevokeCommand,
    IdentityKeyAddCommand,
    IdentityKeyListCommand,
    IdentityKeyRevokeCommand,
    OriginAddCommand,
    OriginRemoveCommand,
    OriginListCommand,
    OperatorOriginAddCommand,
    OperatorOriginRemoveCommand,
    OperatorOriginListCommand,
    ProjectCreateCommand,
    ProjectListCommand,
    SecretsReencryptCommand,
  ],
})
export class CliModule {}
