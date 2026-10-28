import { VersioningType } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { useClsMiddleware } from "./infra/cls/cls-middleware.js";
import { portsConfig } from "./infra/config/ports.config.js";
import { useSecurityHeaders } from "./infra/http/security-headers.js";
import { ZoneGuard } from "./infra/zones/zone.guard.js";

export function configureApiApp(app: INestApplication): void {
  useClsMiddleware(app);
  useSecurityHeaders(app);
  app.useLogger(app.get(Logger));
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });
  const ports = app.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);
  app.useGlobalGuards(new ZoneGuard(app.get(Reflector), ports));
}
