import { Module } from "@nestjs/common";
import { ZoneServers } from "./zone-servers.js";

@Module({
  providers: [ZoneServers],
  exports: [ZoneServers],
})
export class ZonesModule {}
