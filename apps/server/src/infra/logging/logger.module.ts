import type { DynamicModule } from "@nestjs/common";
import { ClsServiceManager } from "nestjs-cls";
import { LoggerModule } from "nestjs-pino";
import type { ServerMode } from "../../server-mode.js";
import { redactPaths } from "./redact-paths.js";

const serviceName = "sowa-chat-server";

function currentRequestId(): string {
  return ClsServiceManager.getClsService().getId();
}

export function createLoggerModule(mode: ServerMode): DynamicModule {
  return LoggerModule.forRoot({
    renameContext: "loggerName",
    pinoHttp: {
      base: { "service.name": serviceName, mode },
      genReqId: currentRequestId,
      mixin: () => ({ requestId: currentRequestId() }),
      redact: redactPaths,
    },
  });
}
