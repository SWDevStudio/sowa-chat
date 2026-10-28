import type { INestApplication } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";

export function useSecurityHeaders(app: INestApplication): void {
  app.use(helmet());
  app.use(noStore);
}

function noStore(_request: Request, response: Response, next: NextFunction): void {
  response.setHeader("Cache-Control", "no-store");
  next();
}
