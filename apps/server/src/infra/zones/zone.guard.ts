import { NotFoundException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { zoneMetadataKey } from "./zone.decorator.js";
import { zoneOfPort } from "./zone-of-port.js";
import type { ApiZone, ZonePorts } from "./zone.js";

export class ZoneGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly ports: ZonePorts,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== "http") {
      return false;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const routeZone = this.reflector.getAllAndOverride<ApiZone | undefined>(zoneMetadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requestZone = zoneOfPort(this.ports, request.socket.localPort);
    if (!routeZone || routeZone !== requestZone) {
      throw new NotFoundException(`Cannot ${request.method} ${request.originalUrl}`);
    }
    return true;
  }
}
