import type { INestApplication } from "@nestjs/common";
import { ClsMiddleware } from "nestjs-cls";
import { beginOperation } from "../../telemetry/operation-steps/operation-timing.js";
import { echoRequestId, resolveRequestId } from "../request-id/request-id.js";

export function useClsMiddleware(app: INestApplication): void {
  app.use(
    new ClsMiddleware({
      generateId: true,
      idGenerator: resolveRequestId,
      setup: (cls, _request, response) => {
        echoRequestId(cls.getId(), response);
        beginOperation(cls);
      },
    }).use,
  );
}
