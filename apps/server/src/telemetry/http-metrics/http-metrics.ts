import { Inject, Injectable } from "@nestjs/common";
import { Counter, Histogram, Registry } from "prom-client";
import type { ApiZone } from "../../infra/zones/zone.js";

export interface HttpRequestRecord {
  zone: ApiZone;
  method: string;
  route: string;
  status: number;
  durationSeconds: number;
}

type HttpLabel = "zone" | "method" | "route" | "status";

const labelNames: HttpLabel[] = ["zone", "method", "route", "status"];

@Injectable()
export class HttpMetrics {
  private readonly requests: Counter<HttpLabel>;
  private readonly durations: Histogram<HttpLabel>;

  constructor(@Inject(Registry) registry: Registry) {
    this.requests = new Counter<HttpLabel>({
      name: "http_requests_total",
      help: "Total HTTP requests by route template",
      labelNames,
      registers: [registry],
    });
    this.durations = new Histogram<HttpLabel>({
      name: "http_request_duration_seconds",
      help: "HTTP request duration in seconds by route template",
      labelNames,
      registers: [registry],
    });
  }

  record({ zone, method, route, status, durationSeconds }: HttpRequestRecord): void {
    const labels = { zone, method, route, status: String(status) };
    this.requests.inc(labels);
    this.durations.observe(labels, durationSeconds);
  }
}
