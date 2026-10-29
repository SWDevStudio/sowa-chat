import { applyDecorators, Controller, UseGuards } from "@nestjs/common";
import { Zone } from "../../infra/zones/zone.decorator.js";
import { VisitorAuthGuard } from "./visitor-auth.guard.js";

export function VisitorController(path: string) {
  return applyDecorators(
    Controller(`visitor/${path}`),
    Zone("public"),
    UseGuards(VisitorAuthGuard),
  );
}
