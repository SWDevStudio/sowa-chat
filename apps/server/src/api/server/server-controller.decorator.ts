import { applyDecorators, Controller, UseGuards } from "@nestjs/common";
import { Zone } from "../../infra/zones/zone.decorator.js";
import { ServerKeyGuard } from "./server-key.guard.js";

export function ServerController(path: string) {
  return applyDecorators(Controller(`server/${path}`), Zone("internal"), UseGuards(ServerKeyGuard));
}
