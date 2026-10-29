import { Get } from "@nestjs/common";
import { Redis } from "ioredis";
import request from "supertest";
import type { DataSource } from "typeorm";
import { OperatorController } from "../../src/api/operator/operator-controller.decorator.js";
import { Project } from "../../src/domain/projects/project.entity.js";
import type { ZoneProbeApp } from "./zone-probe.js";

export const blockProbePath = "/v1/operator/block-sync-probe";
export const operatorChannels = ["operator.disabled", "operator.enabled"] as const;

export type OperatorChannel = (typeof operatorChannels)[number];

@OperatorController("block-sync-probe")
export class BlockSyncProbeController {
  @Get()
  probe() {
    return { ok: true };
  }
}

export interface ChannelMessages {
  received: unknown[];
  close: () => Promise<void>;
}

export function probeWithToken(probe: ZoneProbeApp, token: string) {
  return request(`http://127.0.0.1:${probe.ports.operator}`)
    .get(blockProbePath)
    .set("Authorization", `Bearer ${token}`);
}

export async function channelSubscribers(redis: Redis, channel: OperatorChannel): Promise<number> {
  const reply = (await redis.call("PUBSUB", "NUMSUB", channel)) as [string, number];
  return Number(reply[1]);
}

export async function publishOperatorEvent(
  redis: Redis,
  channel: OperatorChannel,
  data: unknown,
): Promise<void> {
  await redis.publish(channel, JSON.stringify({ pattern: channel, data }));
}

export async function recordChannel(
  redisUrl: string,
  channel: OperatorChannel,
): Promise<ChannelMessages> {
  const subscriber = new Redis(redisUrl);
  const received: unknown[] = [];
  subscriber.on("message", (_channel: string, message: string) => {
    received.push(JSON.parse(message));
  });
  await subscriber.subscribe(channel);
  return {
    received,
    close: async () => {
      await subscriber.quit();
    },
  };
}

export async function projectNameOf(dataSource: DataSource, projectId: string): Promise<string> {
  const project = await dataSource.getRepository(Project).findOneByOrFail({ id: projectId });
  return project.name;
}
