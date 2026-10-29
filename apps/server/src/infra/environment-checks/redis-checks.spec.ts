import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import type { CheckContext, CheckFinding } from "./environment-check.js";
import { registeredEnvironmentChecks } from "./registered-environment-checks.js";
import {
  readRedisSetting,
  redisAppendOnlyCheck,
  redisEvictionPolicyCheck,
} from "./redis-checks.js";

type ConfigResponse = string[];

function createRedis(config: ReturnType<typeof vi.fn>): Redis {
  return { config } as unknown as Redis;
}

function redisAnswering(response: ConfigResponse): Redis {
  return createRedis(vi.fn(async () => response));
}

function redisRejecting(error: Error): Redis {
  return createRedis(
    vi.fn(async () => {
      throw error;
    }),
  );
}

function contextWith(redis: Redis): CheckContext {
  return {
    settings: {
      env: "production",
      publicUrl: "https://chat.example.com",
      s3PublicUrl: "https://chat.example.com/storage",
      databaseUrl: "postgres://sowa:own-password@db.internal:5432/sowa",
      migrationDatabaseUrl: undefined,
      s3SecretKey: "own-s3-secret",
    },
    dataSource: {} as DataSource,
    redis,
  };
}

function finding(level: CheckFinding["level"], message: string): CheckFinding {
  return { level, message };
}

const noPermission = new Error("NOPERM this user has no permissions to run the 'config' command");
const evictionReadFailed =
  "could not read maxmemory-policy (CONFIG GET is not allowed?): make sure maxmemory-policy is noeviction";
const appendOnlyReadFailed =
  "could not read appendonly (CONFIG GET is not allowed?): make sure AOF is on";

describe("readRedisSetting", () => {
  it("запрашивает настройку через config GET и возвращает второй элемент ответа", async () => {
    const config = vi.fn(async () => ["maxmemory-policy", "noeviction"]);

    const value = await readRedisSetting(createRedis(config), "maxmemory-policy");

    expect(config).toHaveBeenCalledWith("GET", "maxmemory-policy");
    expect(value).toBe("noeviction");
  });

  it("возвращает undefined на пустой ответ", async () => {
    const value = await readRedisSetting(redisAnswering([]), "maxmemory-policy");

    expect(value).toBeUndefined();
  });

  it("не глотает ошибку config", async () => {
    await expect(readRedisSetting(redisRejecting(noPermission), "appendonly")).rejects.toThrow(
      "NOPERM",
    );
  });
});

describe("redisEvictionPolicyCheck", () => {
  it("называется redisEvictionPolicy и работает и при старте, и в doctor", () => {
    expect(redisEvictionPolicyCheck.name).toBe("redisEvictionPolicy");
    expect(redisEvictionPolicyCheck.onlyInDoctor).toBe(false);
  });

  it("при noeviction не находит проблем и читает maxmemory-policy", async () => {
    const config = vi.fn(async () => ["maxmemory-policy", "noeviction"]);

    const findings = await redisEvictionPolicyCheck.run(contextWith(createRedis(config)));

    expect(findings).toEqual([]);
    expect(config).toHaveBeenCalledWith("GET", "maxmemory-policy");
  });

  it("при allkeys-lru даёт stop с названием настройки, значением и noeviction", async () => {
    const findings = await redisEvictionPolicyCheck.run(
      contextWith(redisAnswering(["maxmemory-policy", "allkeys-lru"])),
    );

    expect(findings).toEqual([
      finding(
        "stop",
        "maxmemory-policy is allkeys-lru, but BullMQ needs noeviction: set maxmemory-policy noeviction in the Redis config",
      ),
    ]);
  });

  it("при volatile-lru тоже даёт stop с этим значением", async () => {
    const findings = await redisEvictionPolicyCheck.run(
      contextWith(redisAnswering(["maxmemory-policy", "volatile-lru"])),
    );

    expect(findings).toHaveLength(1);
    expect(findings[0]?.level).toBe("stop");
    expect(findings[0]?.message).toContain("maxmemory-policy is volatile-lru");
  });

  it("при отказе config с NOPERM даёт warn could not read maxmemory-policy", async () => {
    const findings = await redisEvictionPolicyCheck.run(contextWith(redisRejecting(noPermission)));

    expect(findings).toEqual([finding("warn", evictionReadFailed)]);
  });

  it("при пустом ответе config даёт warn, а не stop", async () => {
    const findings = await redisEvictionPolicyCheck.run(contextWith(redisAnswering([])));

    expect(findings).toEqual([finding("warn", evictionReadFailed)]);
  });

  it("не пишет текст ошибки Redis в находку", async () => {
    const findings = await redisEvictionPolicyCheck.run(contextWith(redisRejecting(noPermission)));

    expect(findings[0]?.message).not.toContain("NOPERM");
  });
});

describe("redisAppendOnlyCheck", () => {
  it("называется redisAppendOnly и работает и при старте, и в doctor", () => {
    expect(redisAppendOnlyCheck.name).toBe("redisAppendOnly");
    expect(redisAppendOnlyCheck.onlyInDoctor).toBe(false);
  });

  it("при yes не находит проблем и читает appendonly", async () => {
    const config = vi.fn(async () => ["appendonly", "yes"]);

    const findings = await redisAppendOnlyCheck.run(contextWith(createRedis(config)));

    expect(findings).toEqual([]);
    expect(config).toHaveBeenCalledWith("GET", "appendonly");
  });

  it("при no даёт warn с текущим значением", async () => {
    const findings = await redisAppendOnlyCheck.run(
      contextWith(redisAnswering(["appendonly", "no"])),
    );

    expect(findings).toEqual([
      finding(
        "warn",
        "AOF is off (appendonly no): set appendonly yes so queued jobs survive a Redis restart",
      ),
    ]);
  });

  it("при отказе config даёт warn could not read appendonly", async () => {
    const findings = await redisAppendOnlyCheck.run(contextWith(redisRejecting(noPermission)));

    expect(findings).toEqual([finding("warn", appendOnlyReadFailed)]);
  });

  it("при пустом ответе config даёт warn could not read appendonly", async () => {
    const findings = await redisAppendOnlyCheck.run(contextWith(redisAnswering([])));

    expect(findings).toEqual([finding("warn", appendOnlyReadFailed)]);
  });
});

describe("registeredEnvironmentChecks", () => {
  it("содержит обе проверки Redis после проверок настроек в этом порядке", () => {
    const redisChecks = registeredEnvironmentChecks.slice(3, 5);

    expect(redisChecks).toEqual([redisEvictionPolicyCheck, redisAppendOnlyCheck]);
  });
});
