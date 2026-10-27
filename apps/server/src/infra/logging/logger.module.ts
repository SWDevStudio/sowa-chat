import type { DynamicModule } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { ClsService } from "nestjs-cls";
import { LoggerModule } from "nestjs-pino";
import type { Options } from "pino-http";
import type { DestinationStream } from "pino";
import type { ServerMode } from "../../server-mode.js";
import type { LogLevel } from "../config/env.schema.js";
import { loggingConfig } from "../config/logging.config.js";
import { resolveRequestId } from "../request-id/request-id.js";
import { createStdoutDestination } from "./log-destination.js";
import { redactPaths } from "./redact-paths.js";

const serviceName = "sowa-chat-server";

function currentRequestId(cls: ClsService): string | undefined {
  return cls.getId();
}

function baseOptions(mode: ServerMode, level: LogLevel, cls: ClsService): Options {
  return {
    level,
    base: { "service.name": serviceName, mode },
    genReqId: (request) => currentRequestId(cls) ?? resolveRequestId(request),
    customAttributeKeys: { reqId: "requestId" },
    quietReqLogger: true,
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
    inject: [loggingConfig.KEY, ClsService],
    useFactory: (logging: ConfigType<typeof loggingConfig>, cls: ClsService) => {
      const options = baseOptions(mode, logging.level, cls);
      return {
        renameContext: "loggerName",
        pinoHttp: logging.format === "pretty" ? prettyOptions(options) : jsonOptions(options),
      };
    },
  });
}
