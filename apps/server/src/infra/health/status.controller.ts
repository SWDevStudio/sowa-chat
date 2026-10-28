import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { Zone } from "../zones/zone.decorator.js";
import type { ServerStatus } from "./status.service.js";
import { StatusService } from "./status.service.js";

@Zone("management")
@Controller({ path: "status", version: VERSION_NEUTRAL })
export class StatusController {
  constructor(private readonly status: StatusService) {}

  @Get()
  read(): Promise<ServerStatus> {
    return this.status.read();
  }
}
