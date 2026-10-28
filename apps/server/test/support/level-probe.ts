import { Controller, Get, Inject, Injectable, Logger as NestLogger, Res } from "@nestjs/common";
import { EventEmitter } from "node:events";
import type { ServerResponse } from "node:http";

export const probePath = "/log-level-probe";
export const infoProbe = "info-probe";
export const warnProbe = "warn-probe";

export interface LevelLogEntry {
  level?: unknown;
  msg?: unknown;
  req?: { url?: unknown };
  res?: { statusCode?: unknown };
}

@Injectable()
export class LevelProbeService {
  readonly responseFinished = new EventEmitter();
  private readonly logger = new NestLogger(LevelProbeService.name);

  logBothLevels(): void {
    this.logger.log(infoProbe);
    this.logger.warn(warnProbe);
  }
}

@Controller("log-level-probe")
export class LevelProbeController {
  constructor(@Inject(LevelProbeService) private readonly probeService: LevelProbeService) {}

  @Get()
  probe(@Res({ passthrough: true }) response: ServerResponse) {
    this.probeService.logBothLevels();
    response.once("finish", () => this.probeService.responseFinished.emit("finish"));
    return { ok: true };
  }
}

export function hasMessage(entries: LevelLogEntry[], message: string): boolean {
  return entries.some((entry) => entry.msg === message);
}

export function isProbeRequestEntry(entry: LevelLogEntry): boolean {
  return entry.req?.url === probePath && entry.res?.statusCode !== undefined;
}
