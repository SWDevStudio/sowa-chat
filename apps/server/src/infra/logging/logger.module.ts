import type { DynamicModule } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import type { ServerMode } from "../../server-mode.js";

const serviceName = "sowa-chat-server";

export function createLoggerModule(mode: ServerMode): DynamicModule {
  return LoggerModule.forRoot({
    pinoHttp: {
      base: { "service.name": serviceName, mode },
    },
  });
}
