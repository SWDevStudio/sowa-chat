import type { CliRunResult } from "./support/cli-run.js";
import { runCliInProcess } from "./support/cli-run.js";
import { findFreePort } from "./support/e2e-server.js";
import { keyRowByPrefix, revokeKey, setupMainProject } from "./support/key-cli.js";
import type { MainProject } from "./support/key-cli.js";
import { outputOf } from "./support/project-cli.js";
import type { LogCapture } from "./support/replica-cli-probe.js";
import { captureLogLines, startClosingRedisServer } from "./support/replica-cli-probe.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 120_000;
const warningText = "Replica events not sent";
const redisPassword = "s3cret-Redis-Pass-91";

interface CapturedRun {
  result: CliRunResult;
  output: string;
}

describe("публикация из CLI при недоступном Redis", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  let project: MainProject;
  let logs: LogCapture;

  beforeEach(async () => {
    project = await setupMainProject();
    logs = captureLogLines();
  });

  afterEach(() => {
    logs.restore();
    vi.unstubAllEnvs();
  });

  async function runCaptured(commandArguments: string[]): Promise<CapturedRun> {
    const result = await runCliInProcess(commandArguments);
    return { result, output: `${outputOf(result)}\nlogs:\n${logs.lines.join("")}` };
  }

  async function stubRefusedRedis(): Promise<void> {
    const port = await findFreePort();
    vi.stubEnv("REDIS_URL", `redis://sowa:${redisPassword}@127.0.0.1:${port}`);
  }

  describe("порт Redis закрыт", () => {
    beforeEach(stubRefusedRedis);

    it("key:revoke выходит с кодом 0 и предупреждает", async () => {
      const { result, output } = await runCaptured(["key:revoke", "--prefix", project.firstPrefix]);

      expect(result.exitCode, output).toBe(0);
      expect(result.stdout).toContain(`revoked: ${project.firstPrefix}`);
      expect(output).toContain(`${warningText}: `);
    });

    it("в выводе нет пароля из REDIS_URL", async () => {
      const { output } = await runCaptured(["key:revoke", "--prefix", project.firstPrefix]);

      expect(output).toContain(warningText);
      expect(output).not.toContain(redisPassword);
    });

    it("ключ отозван в БД: revoked_at заполнен", async () => {
      const { result, output } = await runCaptured(["key:revoke", "--prefix", project.firstPrefix]);

      expect(result.exitCode, output).toBe(0);
      const row = await keyRowByPrefix(getDataSource(), project.firstPrefix);
      expect(row.revokedAt).toBeInstanceOf(Date);
    });

    it("повторный key:revoke того же ключа — ошибка: первый отзыв закоммичен", async () => {
      await revokeKey(project.firstPrefix);

      const { result, output } = await runCaptured(["key:revoke", "--prefix", project.firstPrefix]);

      expect(result.exitCode, output).toBe(1);
      expect(result.stderr).toContain("No active server key");
    });

    it("project:list выходит с кодом 0 без предупреждения", async () => {
      const { result, output } = await runCaptured(["project:list"]);

      expect(result.exitCode, output).toBe(0);
      expect(result.stdout).toContain(project.projectId);
      expect(output).not.toContain(warningText);
    });

    it("key:generate выходит с кодом 0 без предупреждения", async () => {
      const { result, output } = await runCaptured(["key:generate"]);

      expect(result.exitCode, output).toBe(0);
      expect(output).not.toContain(warningText);
    });

    it("origin:add выходит с кодом 0, предупреждает, домен сохранён", async () => {
      const { result, output } = await runCaptured([
        "origin:add",
        "--project",
        "main",
        "--origin",
        "https://shop.example.com",
      ]);

      expect(result.exitCode, output).toBe(0);
      expect(output).toContain(`${warningText}: `);
      expect(output).not.toContain(redisPassword);
    });
  });

  describe("Redis рвёт соединение", () => {
    it("key:revoke подключается к REDIS_URL, выходит с кодом 0 и предупреждает", async () => {
      const server = await startClosingRedisServer(redisPassword);
      vi.stubEnv("REDIS_URL", server.url);
      try {
        const { result, output } = await runCaptured([
          "key:revoke",
          "--prefix",
          project.firstPrefix,
        ]);

        expect(result.exitCode, output).toBe(0);
        expect(server.connections()).toBeGreaterThan(0);
        expect(output).toContain(`${warningText}: `);
        expect(output).not.toContain(redisPassword);
      } finally {
        await server.close();
      }
    });

    it("команды без изменений к Redis не подключаются", async () => {
      const server = await startClosingRedisServer(redisPassword);
      vi.stubEnv("REDIS_URL", server.url);
      try {
        const list = await runCaptured(["project:list"]);
        const generated = await runCaptured(["key:generate"]);
        const keys = await runCaptured(["key:list", "--project", "main"]);

        expect(list.result.exitCode, list.output).toBe(0);
        expect(generated.result.exitCode, generated.output).toBe(0);
        expect(keys.result.exitCode, keys.output).toBe(0);
        expect(server.connections()).toBe(0);
      } finally {
        await server.close();
      }
    });
  });
});
