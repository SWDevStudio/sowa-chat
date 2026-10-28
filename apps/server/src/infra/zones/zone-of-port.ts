import { apiZones } from "./zone.js";
import type { ApiZone, ZonePorts } from "./zone.js";

export function zoneOfPort(ports: ZonePorts, port: number | undefined): ApiZone | undefined {
  return apiZones.find((zone) => ports[zone] === port);
}
