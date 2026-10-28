import type { INestApplication } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { useClsMiddleware } from "./infra/cls/cls-middleware.js";

export function configureApiApp(app: INestApplication): void {
  useClsMiddleware(app);
  app.useLogger(app.get(Logger));
}
