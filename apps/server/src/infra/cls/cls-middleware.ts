import type { INestApplication } from "@nestjs/common";
import { ClsMiddleware } from "nestjs-cls";
import { echoRequestId, resolveRequestId } from "../request-id/request-id.js";

export function useClsMiddleware(app: INestApplication): void {
  app.use(
    new ClsMiddleware({
      generateId: true,
      idGenerator: resolveRequestId,
      setup: (cls, _request, response) => echoRequestId(cls.getId(), response),
    }).use,
  );
}
