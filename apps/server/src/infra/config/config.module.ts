import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./app.config.js";
import { databaseConfig } from "./database.config.js";
import { encryptionConfig } from "./encryption.config.js";
import { loggingConfig } from "./logging.config.js";
import { parseEnv } from "./parse-env.js";
import { portsConfig } from "./ports.config.js";
import { redisConfig } from "./redis.config.js";
import { s3Config } from "./s3.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        portsConfig,
        databaseConfig,
        encryptionConfig,
        redisConfig,
        s3Config,
        loggingConfig,
      ],
      validate: parseEnv,
    }),
  ],
})
export class AppConfigModule {}
