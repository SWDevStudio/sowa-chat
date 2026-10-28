import type { NestExpressApplication } from "@nestjs/platform-express";
import { bodyParserErrorToHttpException } from "./body-parser-error.middleware.js";

export const bodyLimit = "64kb";

export function useBodyLimit(app: NestExpressApplication): void {
  app.useBodyParser("json", { limit: bodyLimit });
  app.useBodyParser("urlencoded", { limit: bodyLimit, extended: true });
  app.use(bodyParserErrorToHttpException);
}
