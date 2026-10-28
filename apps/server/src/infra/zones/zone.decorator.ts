import { SetMetadata } from "@nestjs/common";
import type { ApiZone } from "./zone.js";

export const zoneMetadataKey = "zone";

export function Zone(zone: ApiZone) {
  return SetMetadata(zoneMetadataKey, zone);
}
