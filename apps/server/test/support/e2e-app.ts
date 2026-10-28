import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Logger } from "nestjs-pino";
import { ApiModule } from "../../src/api.module.js";
import { useClsMiddleware } from "../../src/infra/cls/cls-middleware.js";

export async function createE2eApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({ imports: [ApiModule] }).compile();
  const app = moduleRef.createNestApplication({ bufferLogs: true });
  useClsMiddleware(app);
  app.useLogger(app.get(Logger));
  await app.init();
  return app;
}
