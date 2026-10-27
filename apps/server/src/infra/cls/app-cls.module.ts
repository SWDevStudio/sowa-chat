import { ClsModule } from "nestjs-cls";
import { echoRequestId, resolveRequestId } from "../request-id/request-id.js";

export const AppClsModule = ClsModule.forRoot({
  global: true,
  middleware: {
    mount: true,
    generateId: true,
    idGenerator: resolveRequestId,
    setup: (cls, _request, response) => echoRequestId(cls.getId(), response),
  },
});
