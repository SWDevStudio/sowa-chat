import type { ConfigType } from "@nestjs/config";
import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import { createCheckSettings } from "../../../test/support/environment-checks.js";
import type { redisConfig } from "../../infra/config/redis.config.js";
import type { CheckResult } from "../../infra/environment-checks/environment-check.js";
import { registeredEnvironmentChecks } from "../../infra/environment-checks/registered-environment-checks.js";
import { runEnvironmentChecks } from "../../infra/environment-checks/run-environment-checks.js";
import { closeRedis, createRedisClient, waitForRedis } from "../../infra/redis/redis-client.js";
import { DoctorCommand } from "./doctor.command.js";

vi.mock("../../infra/redis/redis-client.js", () => ({
  redisStartupTimeoutMs: 5000,
  createRedisClient: vi.fn(),
  waitForRedis: vi.fn(),
  closeRedis: vi.fn(),
}));

vi.mock("../../infra/environment-checks/run-environment-checks.js", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("../../infra/environment-checks/run-environment-checks.js")
    >();
  return { ...actual, runEnvironmentChecks: vi.fn() };
});

const redisUrl = "redis://sowa:secret-pass@redis.internal:6379";
function createClient(): Redis {
  return { status: "ready", options: { enableOfflineQueue: true } } as Redis;
}

let client: Redis;
const dataSource = {} as DataSource;
const redis: ConfigType<typeof redisConfig> = { url: redisUrl };

function createCommand(env: "production" | "development" = "production"): DoctorCommand {
  return new DoctorCommand(dataSource, redis, createCheckSettings(env));
}

function stopResult(check: string): CheckResult {
  return { check, level: "stop", message: `${check} is broken` };
}

function warnResult(check: string): CheckResult {
  return { check, level: "warn", message: `${check} is doubtful` };
}

describe("DoctorCommand", () => {
  let written: string;

  beforeEach(() => {
    written = "";
    client = createClient();
    vi.mocked(createRedisClient).mockReturnValue(client);
    vi.mocked(waitForRedis).mockResolvedValue(undefined);
    vi.mocked(closeRedis).mockResolvedValue(undefined);
    vi.mocked(runEnvironmentChecks).mockResolvedValue([]);
    vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      written += String(chunk);
      return true;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe("запуск проверок", () => {
    it("создаёт клиент Redis по REDIS_URL и ждёт его готовности", async () => {
      await createCommand().run();

      expect(createRedisClient).toHaveBeenCalledWith(redisUrl);
      expect(waitForRedis).toHaveBeenCalledWith(client, 5000);
    });

    it("запускает реестр проверок для doctor с настройками, базой и клиентом Redis", async () => {
      const command = createCommand();

      await command.run();

      expect(runEnvironmentChecks).toHaveBeenCalledWith(
        registeredEnvironmentChecks,
        { settings: createCheckSettings("production"), dataSource, redis: client },
        "doctor",
      );
    });

    it("закрывает клиент Redis после проверок", async () => {
      await createCommand().run();

      expect(closeRedis).toHaveBeenCalledWith(client);
    });

    it("закрывает клиент Redis, даже когда проверки бросили ошибку", async () => {
      vi.mocked(runEnvironmentChecks).mockRejectedValue(new Error("boom"));

      await expect(createCommand().run()).rejects.toThrow("boom");

      expect(closeRedis).toHaveBeenCalledWith(client);
    });
  });

  describe("отчёт", () => {
    it("без результатов печатает одну строку no problems found", async () => {
      await createCommand().run();

      expect(written).toBe("no problems found\n");
    });

    it("по строке на результат: уровень, проверка и текст через табуляцию, в порядке результатов", async () => {
      vi.mocked(runEnvironmentChecks).mockResolvedValue([
        warnResult("second"),
        warnResult("first"),
      ]);

      await createCommand().run();

      expect(written).toBe("warn\tsecond\tsecond is doubtful\nwarn\tfirst\tfirst is doubtful\n");
    });

    it("только предупреждения: команда завершается без ошибки", async () => {
      vi.mocked(runEnvironmentChecks).mockResolvedValue([warnResult("redisAppendOnly")]);

      await expect(createCommand().run()).resolves.toBeUndefined();
    });
  });

  describe("остановки", () => {
    it("печатает отчёт и бросает ошибку с числом stop", async () => {
      vi.mocked(runEnvironmentChecks).mockResolvedValue([
        stopResult("publicUrlsHttps"),
        warnResult("s3PublicUrl"),
        stopResult("exampleSecrets"),
      ]);

      await expect(createCommand().run()).rejects.toThrow(
        "doctor found problems that stop the service: 2",
      );

      expect(written).toContain("stop\tpublicUrlsHttps\tpublicUrlsHttps is broken\n");
      expect(written).toContain("warn\ts3PublicUrl\ts3PublicUrl is doubtful\n");
    });

    it("одна остановка — число 1", async () => {
      vi.mocked(runEnvironmentChecks).mockResolvedValue([stopResult("postgresVersion")]);

      await expect(createCommand().run()).rejects.toThrow(
        "doctor found problems that stop the service: 1",
      );
    });
  });

  describe("недоступный Redis", () => {
    const failure = new Error("Redis is unavailable: connect ECONNREFUSED 127.0.0.1:1");

    beforeEach(() => {
      vi.mocked(waitForRedis).mockRejectedValue(failure);
    });

    it("в production добавляет stop redisConnection первой строкой отчёта и бросает ошибку", async () => {
      vi.mocked(runEnvironmentChecks).mockResolvedValue([warnResult("redisAppendOnly")]);

      await expect(createCommand("production").run()).rejects.toThrow(
        "doctor found problems that stop the service: 1",
      );

      expect(written.split("\n")[0]).toBe(`stop\tredisConnection\t${failure.message}`);
      expect(written).toContain("warn\tredisAppendOnly\t");
    });

    it("в development добавляет warn redisConnection и не бросает ошибку", async () => {
      await expect(createCommand("development").run()).resolves.toBeUndefined();

      expect(written).toBe(`warn\tredisConnection\t${failure.message}\n`);
    });

    it("проверки всё равно выполняются и клиент закрывается", async () => {
      await expect(createCommand("production").run()).rejects.toThrow();

      expect(runEnvironmentChecks).toHaveBeenCalledTimes(1);
      expect(closeRedis).toHaveBeenCalledWith(client);
    });

    it("выключает очередь команд клиента, чтобы проверки не зависали на недоступном Redis", async () => {
      await expect(createCommand("production").run()).rejects.toThrow();

      expect(client.options.enableOfflineQueue).toBe(false);
    });

    it("не трогает очередь команд, когда Redis доступен", async () => {
      vi.mocked(waitForRedis).mockResolvedValue(undefined);

      await createCommand("production").run();

      expect(client.options.enableOfflineQueue).toBe(true);
    });

    it("текст ошибки без адреса и пароля попадает в отчёт как есть", async () => {
      await expect(createCommand("production").run()).rejects.toThrow();

      expect(written).not.toContain("secret-pass");
      expect(written).not.toContain("redis.internal");
    });
  });
});
