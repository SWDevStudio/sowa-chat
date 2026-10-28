import { Inject, Injectable } from "@nestjs/common";
import type { INestApplication, OnApplicationShutdown } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { createServer } from "node:http";
import type { RequestListener, Server } from "node:http";
import { portsConfig } from "../config/ports.config.js";
import { apiZones } from "./zone.js";
import type { ApiZone } from "./zone.js";

function startListening(server: Server, port: number): Promise<void> {
  return new Promise((resolveListening, reject) => {
    server.once("error", reject);
    server.listen(port, () => {
      server.off("error", reject);
      resolveListening();
    });
  });
}

function stopListening(server: Server): Promise<void> {
  return new Promise((resolveClosed, reject) => {
    server.close((error) => (error ? reject(error) : resolveClosed()));
  });
}

@Injectable()
export class ZoneServers implements OnApplicationShutdown {
  private readonly servers = new Map<ApiZone, Server>();

  constructor(@Inject(portsConfig.KEY) private readonly ports: ConfigType<typeof portsConfig>) {}

  async listen(app: INestApplication): Promise<void> {
    const requestListener: RequestListener = app.getHttpAdapter().getInstance();
    for (const zone of apiZones) {
      const server = createServer(requestListener);
      await startListening(server, this.ports[zone]);
      this.servers.set(zone, server);
    }
  }

  getServer(zone: ApiZone): Server | undefined {
    return this.servers.get(zone);
  }

  async onApplicationShutdown(): Promise<void> {
    const servers = [...this.servers.values()];
    this.servers.clear();
    await Promise.all(servers.map(stopListening));
  }
}
