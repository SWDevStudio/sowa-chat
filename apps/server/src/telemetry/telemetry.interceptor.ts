import { Inject, Injectable } from "@nestjs/common";
import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import type { Request, Response } from "express";
import type { Observable } from "rxjs";
import { portsConfig } from "../infra/config/ports.config.js";
import { zoneOfPort } from "../infra/zones/zone-of-port.js";
import { HttpMetrics } from "./http-metrics/http-metrics.js";
import { OperationSteps } from "./operation-steps/operation-steps.js";
import type { OperationTiming } from "./operation-steps/operation-step.js";
import { SlowOperations } from "./slow-operations/slow-operations.js";

@Injectable()
export class TelemetryInterceptor implements NestInterceptor {
  constructor(
    @Inject(HttpMetrics) private readonly httpMetrics: HttpMetrics,
    @Inject(portsConfig.KEY) private readonly ports: ConfigType<typeof portsConfig>,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
    @Inject(SlowOperations) private readonly slowOperations: SlowOperations,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== "http") {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startedAt = performance.now();
    const timing = this.operationSteps.current();
    response.once("finish", () => {
      const route = request.route?.path;
      if (!route) {
        return;
      }
      this.recordHttpMetrics(request, response, route, startedAt);
      this.reportSlowOperation(request, route, timing);
    });
    return next.handle();
  }

  private recordHttpMetrics(
    request: Request,
    response: Response,
    route: string,
    startedAt: number,
  ): void {
    const zone = zoneOfPort(this.ports, request.socket.localPort);
    if (!zone) {
      return;
    }
    this.httpMetrics.record({
      zone,
      method: request.method,
      route,
      status: response.statusCode,
      durationSeconds: (performance.now() - startedAt) / 1000,
    });
  }

  private reportSlowOperation(
    request: Request,
    route: string,
    timing: OperationTiming | undefined,
  ): void {
    if (!timing) {
      return;
    }
    this.slowOperations.report({
      name: `${request.method} ${route}`,
      durationMs: performance.now() - timing.startedAt,
      steps: timing.steps,
    });
  }
}
