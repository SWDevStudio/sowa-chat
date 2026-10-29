import type { Redis } from "ioredis";
import type { CheckContext, CheckFinding, EnvironmentCheck } from "./environment-check.js";

const evictionReadFailed =
  "could not read maxmemory-policy (CONFIG GET is not allowed?): make sure maxmemory-policy is noeviction";
const appendOnlyReadFailed =
  "could not read appendonly (CONFIG GET is not allowed?): make sure AOF is on";

export async function readRedisSetting(redis: Redis, name: string): Promise<string | undefined> {
  const reply = await redis.config("GET", name);
  return reply[1];
}

function isCommandNotAllowed(error: unknown): boolean {
  return error instanceof Error && /^(NOPERM|ERR unknown command)/.test(error.message);
}

async function readSettingOrUndefined(redis: Redis, name: string): Promise<string | undefined> {
  try {
    return await readRedisSetting(redis, name);
  } catch (error) {
    if (isCommandNotAllowed(error)) {
      return undefined;
    }
    throw error;
  }
}

function evictionPolicyFindings(policy: string | undefined): CheckFinding[] {
  if (policy === "noeviction") {
    return [];
  }
  if (policy === undefined) {
    return [{ level: "warn", message: evictionReadFailed }];
  }
  return [
    {
      level: "stop",
      message: `maxmemory-policy is ${policy}, but BullMQ needs noeviction: set maxmemory-policy noeviction in the Redis config`,
    },
  ];
}

function appendOnlyFindings(appendOnly: string | undefined): CheckFinding[] {
  if (appendOnly === "yes") {
    return [];
  }
  if (appendOnly === undefined) {
    return [{ level: "warn", message: appendOnlyReadFailed }];
  }
  return [
    {
      level: "warn",
      message: `AOF is off (appendonly ${appendOnly}): set appendonly yes so queued jobs survive a Redis restart`,
    },
  ];
}

export const redisEvictionPolicyCheck: EnvironmentCheck = {
  name: "redisEvictionPolicy",
  onlyInDoctor: false,
  run: async ({ redis }: CheckContext) => {
    const policy = await readSettingOrUndefined(redis, "maxmemory-policy");
    return evictionPolicyFindings(policy);
  },
};

export const redisAppendOnlyCheck: EnvironmentCheck = {
  name: "redisAppendOnly",
  onlyInDoctor: false,
  run: async ({ redis }: CheckContext) => {
    const appendOnly = await readSettingOrUndefined(redis, "appendonly");
    return appendOnlyFindings(appendOnly);
  },
};
