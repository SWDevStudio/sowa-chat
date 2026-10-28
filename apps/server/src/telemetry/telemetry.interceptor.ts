import { Inject, Injectable } from "@nestjs/common";
import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import type { Request, Response } from "express";
import type { Observable } from "rxjs";
import { portsConfig } from "../infra/config/ports.config.js";
import { zoneOfPort } from "../infra/zones/zone-of-port.js";
import { HttpMetrics } from "./http-metrics/http-metrics.js";

@Injectable()
export class TelemetryInterceptor implements NestInterceptor {
  constructor(
    @Inject(HttpMetrics) private readonly httpMetrics: HttpMetrics,
    @Inject(portsConfig.KEY) private readonly ports: ConfigType<typeof portsConfig>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== "http") {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startedAt = performance.now();
    response.once("finish", () => {
      this.recordHttpMetrics(request, response, startedAt);
    });
    return next.handle();
  }

  private recordHttpMetrics(request: Request, response: Response, startedAt: number): void {
    const zone = zoneOfPort(this.ports, request.socket.localPort);
    if (!zone) {
      return;
    }
    this.httpMetrics.record({
      zone,
      method: request.method,
      route: request.route.path,
      status: response.statusCode,
      durationSeconds: (performance.now() - startedAt) / 1000,
    });
  }
}
