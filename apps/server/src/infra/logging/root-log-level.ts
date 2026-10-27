import { Inject, Injectable } from "@nestjs/common";
import type { OnModuleInit } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PinoLogger } from "nestjs-pino";
import { loggingConfig } from "../config/logging.config.js";

@Injectable()
export class RootLogLevel implements OnModuleInit {
  constructor(
    private readonly pinoLogger: PinoLogger,
    @Inject(loggingConfig.KEY) private readonly logging: ConfigType<typeof loggingConfig>,
  ) {}

  onModuleInit(): void {
    this.pinoLogger.logger.level = this.logging.level;
  }
}
