import type { TestingModuleBuilder } from "@nestjs/testing";
import { Redis } from "ioredis";

const offlineRedis = {
  status: "end",
  ping: () => Promise.reject(new Error("Redis is offline in unit tests")),
  quit: () => Promise.resolve("OK"),
  disconnect: () => undefined,
};

export function withOfflineRedis(builder: TestingModuleBuilder): TestingModuleBuilder {
  return builder.overrideProvider(Redis).useValue(offlineRedis);
}
