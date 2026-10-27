import type { DynamicModule } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { ClsServiceManager } from "nestjs-cls";
import { LoggerModule } from "nestjs-pino";
import type { Options } from "pino-http";
import type { DestinationStream } from "pino";
import type { ServerMode } from "../../server-mode.js";
import { loggingConfig } from "../config/logging.config.js";
import { createStdoutDestination } from "./log-destination.js";
import { RootLogLevel } from "./root-log-level.js";
import { redactPaths } from "./redact-paths.js";

const serviceName = "sowa-chat-server";

function currentRequestId(): string {
  return ClsServiceManager.getClsService().getId();
}

function baseOptions(mode: ServerMode, level: ConfigType<typeof loggingConfig>["level"]): Options {
  return {
    level,
    base: { "service.name": serviceName, mode },
    genReqId: currentRequestId,
    mixin: () => ({ requestId: currentRequestId() }),
    redact: redactPaths,
  };
}

function prettyOptions(options: Options): Options {
  return { ...options, transport: { target: "pino-pretty" } };
}

function jsonOptions(options: Options): [Options, DestinationStream] {
  return [options, createStdoutDestination()];
}

export function createLoggerModule(mode: ServerMode): DynamicModule {
  return LoggerModule.forRootAsync({
    inject: [loggingConfig.KEY],
    providers: [RootLogLevel],
    useFactory: (logging: ConfigType<typeof loggingConfig>) => {
      const options = baseOptions(mode, logging.level);
      return {
        renameContext: "loggerName",
        pinoHttp: logging.format === "pretty" ? prettyOptions(options) : jsonOptions(options),
      };
    },
  });
}
