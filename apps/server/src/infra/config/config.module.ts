import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./app.config.js";
import { databaseConfig } from "./database.config.js";
import { developmentSecretsConfig } from "./development-secrets.config.js";
import { encryptionConfig } from "./encryption.config.js";
import { environmentChecksConfig } from "./environment-checks.config.js";
import { loadEnv } from "./load-env.js";
import { loggingConfig } from "./logging.config.js";
import { portsConfig } from "./ports.config.js";
import { redisConfig } from "./redis.config.js";
import { s3Config } from "./s3.config.js";
import { slowOperationsConfig } from "./slow-operations.config.js";
import { tokenSigningConfig } from "./token-signing.config.js";
import { visitorSessionsConfig } from "./visitor-sessions.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        portsConfig,
        databaseConfig,
        encryptionConfig,
        environmentChecksConfig,
        tokenSigningConfig,
        visitorSessionsConfig,
        redisConfig,
        s3Config,
        loggingConfig,
        slowOperationsConfig,
        developmentSecretsConfig,
      ],
      validate: loadEnv,
    }),
  ],
})
export class AppConfigModule {}
