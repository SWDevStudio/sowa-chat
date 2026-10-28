import { applyDecorators, Controller, UseGuards } from "@nestjs/common";
import { Zone } from "../../infra/zones/zone.decorator.js";
import { OperatorAuthGuard } from "./operator-auth.guard.js";

export function OperatorController(path: string) {
  return applyDecorators(
    Controller(`operator/${path}`),
    Zone("operator"),
    UseGuards(OperatorAuthGuard),
  );
}
