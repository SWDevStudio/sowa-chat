import { VersioningType } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "nestjs-pino";
import { useClsMiddleware } from "./infra/cls/cls-middleware.js";
import { appConfig } from "./infra/config/app.config.js";
import { portsConfig } from "./infra/config/ports.config.js";
import { setupApiDocs } from "./infra/http/api-docs.js";
import { useBodyLimit } from "./infra/http/body-limit.js";
import { useSecurityHeaders } from "./infra/http/security-headers.js";
import { ZoneGuard } from "./infra/zones/zone.guard.js";

export function configureApiApp(app: NestExpressApplication): void {
  useClsMiddleware(app);
  useSecurityHeaders(app);
  useBodyLimit(app);
  app.useLogger(app.get(Logger));
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
  const ports = app.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);
  app.useGlobalGuards(new ZoneGuard(app.get(Reflector), ports));
  const settings = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  if (settings.env === "development") {
    setupApiDocs(app, ports);
  }
}
