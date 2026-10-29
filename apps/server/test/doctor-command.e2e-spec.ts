import type { CliRunResult } from "./support/cli-run.js";
import { runCliInProcess } from "./support/cli-run.js";
import { findFreePort } from "./support/e2e-server.js";
import { productionOverrides } from "./support/production-env.js";
import { nonEmptyLines, outputOf } from "./support/project-cli.js";

const commandTimeout = 120_000;
const redisPassword = "s3cret-Redis-Pass-91";
const stopSummary = "error: doctor found problems that stop the service: ";

function stubProductionEnv(overrides: Record<string, string> = {}): void {
  for (const [name, value] of Object.entries({ ...productionOverrides, ...overrides })) {
    vi.stubEnv(name, value);
  }
}

async function runDoctor(): Promise<CliRunResult> {
  return runCliInProcess(["doctor"]);
}

function reportLines(result: CliRunResult): string[] {
  return nonEmptyLines(result.stdout);
}

function linesOfLevel(result: CliRunResult, level: string): string[] {
  return reportLines(result).filter((line) => line.startsWith(`${level}\t`));
}

function lineOfCheck(result: CliRunResult, check: string): string | undefined {
  return reportLines(result).find((line) => line.split("\t")[1] === check);
}

describe("команда doctor", { timeout: commandTimeout }, () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("production, настройки в порядке", () => {
    it("выходит с кодом 0 и печатает предупреждения redisAppendOnly, postgresSuperuser, s3PublicUrl", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(lineOfCheck(result, "redisAppendOnly")).toMatch(/^warn\tredisAppendOnly\t.+/);
      expect(lineOfCheck(result, "postgresSuperuser")).toMatch(/^warn\tpostgresSuperuser\t.+/);
      expect(lineOfCheck(result, "s3PublicUrl")).toMatch(/^warn\ts3PublicUrl\t.+/);
    });

    it("не печатает строк stop и ошибку в stderr", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(linesOfLevel(result, "stop")).toEqual([]);
      expect(result.stderr).not.toContain("error:");
    });

    it("каждая строка отчёта — уровень, проверка и текст через табуляцию", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      const lines = reportLines(result);
      expect(lines.length).toBeGreaterThan(0);
      for (const line of lines) {
        expect(line, outputOf(result)).toMatch(/^(stop|warn)\t[A-Za-z0-9]+\t\S.*$/);
      }
    });

    it("не печатает no problems found, когда есть предупреждения", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      expect(result.stdout).not.toContain("no problems found");
    });

    it("проверки Redis выполняются: нет строк check could not run", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      expect(result.stdout).not.toContain("check could not run");
    });

    it("не печатает строку redisConnection, когда Redis доступен", async () => {
      stubProductionEnv();

      const result = await runDoctor();

      expect(lineOfCheck(result, "redisConnection")).toBeUndefined();
    });
  });

  describe("production, http-адрес и пример секрета", () => {
    const badSettings = {
      SOWA_PUBLIC_URL: "http://chat.example.com",
      SOWA_S3_SECRET_KEY: "sowa-dev-secret",
    };

    it("печатает обе строки stop, выходит с кодом 1 и пишет в stderr число остановок", async () => {
      stubProductionEnv(badSettings);

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(lineOfCheck(result, "publicUrlsHttps")).toMatch(/^stop\tpublicUrlsHttps\t.+/);
      expect(lineOfCheck(result, "exampleSecrets")).toMatch(/^stop\texampleSecrets\t.+/);
      expect(result.stderr).toContain(`${stopSummary}2`);
    });

    it("строк stop ровно две, остальные — предупреждения", async () => {
      stubProductionEnv(badSettings);

      const result = await runDoctor();

      expect(linesOfLevel(result, "stop")).toHaveLength(2);
      expect(lineOfCheck(result, "redisAppendOnly")).toMatch(/^warn\t/);
    });

    it("строки идут в порядке реестра: publicUrlsHttps раньше exampleSecrets", async () => {
      stubProductionEnv(badSettings);

      const result = await runDoctor();

      const checks = reportLines(result).map((line) => line.split("\t")[1]);
      expect(checks.indexOf("publicUrlsHttps")).toBeGreaterThanOrEqual(0);
      expect(checks.indexOf("publicUrlsHttps")).toBeLessThan(checks.indexOf("exampleSecrets"));
    });

    it("отчёт идёт в stdout, ошибка — в stderr, а не наоборот", async () => {
      stubProductionEnv(badSettings);

      const result = await runDoctor();

      expect(result.stdout).not.toContain("error:");
      expect(result.stderr).not.toContain("stop\tpublicUrlsHttps");
    });

    it("одна остановка: в stderr число 1", async () => {
      stubProductionEnv({ SOWA_PUBLIC_URL: "http://chat.example.com" });

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(linesOfLevel(result, "stop")).toHaveLength(1);
      expect(result.stderr).toContain(`${stopSummary}1`);
    });
  });

  describe("development", () => {
    it("с http-адресом и примером секрета выходит с кодом 0 и без строк stop", async () => {
      vi.stubEnv("SOWA_PUBLIC_URL", "http://chat.example.com");
      vi.stubEnv("SOWA_S3_SECRET_KEY", "sowa-dev-secret");

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(linesOfLevel(result, "stop")).toEqual([]);
      expect(result.stderr).not.toContain("error:");
    });

    it("не находит ничего у проверок https и секретов из примера", async () => {
      vi.stubEnv("SOWA_PUBLIC_URL", "http://chat.example.com");
      vi.stubEnv("SOWA_S3_SECRET_KEY", "sowa-dev-secret");

      const result = await runDoctor();

      expect(lineOfCheck(result, "publicUrlsHttps")).toBeUndefined();
      expect(lineOfCheck(result, "exampleSecrets")).toBeUndefined();
    });

    it("недоступный Redis даёт warn redisConnection и код 0", async () => {
      const port = await findFreePort();
      vi.stubEnv("REDIS_URL", `redis://127.0.0.1:${port}`);

      const result = await runDoctor();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(lineOfCheck(result, "redisConnection")).toMatch(
        /^warn\tredisConnection\tRedis is unavailable: .+/,
      );
      expect(linesOfLevel(result, "stop")).toEqual([]);
    });
  });

  describe("production, Redis недоступен", () => {
    async function runWithRefusedRedis(): Promise<CliRunResult> {
      const port = await findFreePort();
      stubProductionEnv({ REDIS_URL: `redis://sowa:${redisPassword}@127.0.0.1:${port}` });
      return runDoctor();
    }

    it("выходит с кодом 1 и печатает stop redisConnection с текстом Redis is unavailable", async () => {
      const result = await runWithRefusedRedis();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(lineOfCheck(result, "redisConnection")).toMatch(
        /^stop\tredisConnection\tRedis is unavailable: .+/,
      );
      expect(result.stderr).toContain(`${stopSummary}1`);
    });

    it("строка redisConnection — первая в отчёте", async () => {
      const result = await runWithRefusedRedis();

      expect(reportLines(result)[0]).toMatch(/^stop\tredisConnection\t/);
    });

    it("остальные проверки всё равно выполняются: проверки PostgreSQL дают предупреждение", async () => {
      const result = await runWithRefusedRedis();

      expect(lineOfCheck(result, "postgresSuperuser")).toMatch(/^warn\tpostgresSuperuser\t/);
      expect(lineOfCheck(result, "s3PublicUrl")).toMatch(/^warn\ts3PublicUrl\t/);
    });

    it("в выводе нет пароля из REDIS_URL", async () => {
      const result = await runWithRefusedRedis();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(outputOf(result)).not.toContain(redisPassword);
    });
  });
});
