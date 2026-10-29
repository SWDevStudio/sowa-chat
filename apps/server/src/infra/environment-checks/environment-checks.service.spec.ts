import { Logger } from "@nestjs/common";
import type { Redis } from "ioredis";
import type { DataSource } from "typeorm";
import type { MockInstance } from "vitest";
import { createCheck, createFailingCheck } from "../../../test/support/environment-checks.js";
import type { EnvironmentCheck } from "./environment-check.js";
import { EnvironmentCheckError } from "./environment-check.js";
import { EnvironmentChecksService } from "./environment-checks.service.js";

function createService(
  checks: EnvironmentCheck[],
  env: "development" | "production" = "production",
): EnvironmentChecksService {
  return new EnvironmentChecksService({ env }, {} as DataSource, {} as Redis, checks);
}

describe("EnvironmentChecksService.verifyAtStartup", () => {
  let logWarn: MockInstance<Logger["warn"]>;

  beforeEach(() => {
    logWarn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("не пишет и не бросает, если проблем нет или проверок нет", async () => {
    await expect(createService([]).verifyAtStartup()).resolves.toBeUndefined();
    await expect(
      createService([createCheck("cleanCheck", [])]).verifyAtStartup(),
    ).resolves.toBeUndefined();

    expect(logWarn).not.toHaveBeenCalled();
  });

  it("пишет находку warn одной строкой и не бросает", async () => {
    const service = createService([
      createCheck("warnCheck", [{ level: "warn", message: "something is risky" }]),
    ]);

    await expect(service.verifyAtStartup()).resolves.toBeUndefined();

    expect(logWarn).toHaveBeenCalledTimes(1);
    expect(logWarn).toHaveBeenCalledWith("warnCheck: something is risky");
  });

  it("каждую находку warn пишет отдельной строкой", async () => {
    const service = createService([
      createCheck("firstCheck", [
        { level: "warn", message: "one" },
        { level: "warn", message: "two" },
      ]),
      createCheck("secondCheck", [{ level: "warn", message: "three" }]),
    ]);

    await service.verifyAtStartup();

    expect(logWarn.mock.calls).toEqual([
      ["firstCheck: one"],
      ["firstCheck: two"],
      ["secondCheck: three"],
    ]);
  });

  it("с двумя находками stop бросает EnvironmentCheckError с обеими", async () => {
    const service = createService([
      createCheck("firstCheck", [{ level: "stop", message: "first problem" }]),
      createCheck("secondCheck", [{ level: "stop", message: "second problem" }]),
    ]);

    const error = await service.verifyAtStartup().catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(EnvironmentCheckError);
    expect((error as Error).message).toBe(
      "Environment checks failed:\nfirstCheck: first problem\nsecondCheck: second problem",
    );
  });

  it("в тексте ошибки только находки stop, а warn идут в лог", async () => {
    const service = createService([
      createCheck("firstCheck", [{ level: "warn", message: "only a warning" }]),
      createCheck("secondCheck", [{ level: "stop", message: "fatal problem" }]),
    ]);

    const error = await service.verifyAtStartup().catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(EnvironmentCheckError);
    expect((error as Error).message).not.toContain("only a warning");
    expect((error as Error).message).toContain("secondCheck: fatal problem");
    expect(logWarn).toHaveBeenCalledWith("firstCheck: only a warning");
  });

  it("в development stop не бросает, а пишется предупреждением", async () => {
    const service = createService(
      [createCheck("firstCheck", [{ level: "stop", message: "fatal problem" }])],
      "development",
    );

    await expect(service.verifyAtStartup()).resolves.toBeUndefined();

    expect(logWarn).toHaveBeenCalledWith("firstCheck: fatal problem");
  });

  it("не выполняет проверки onlyInDoctor", async () => {
    const doctorCheck = createCheck(
      "doctorCheck",
      [{ level: "stop", message: "doctor problem" }],
      true,
    );

    await expect(createService([doctorCheck]).verifyAtStartup()).resolves.toBeUndefined();

    expect(doctorCheck.run).not.toHaveBeenCalled();
  });

  it("упавшая проверка даёт предупреждение, а запуск не останавливается", async () => {
    const service = createService([createFailingCheck("brokenCheck", new Error("no access"))]);

    await expect(service.verifyAtStartup()).resolves.toBeUndefined();

    expect(logWarn).toHaveBeenCalledWith("brokenCheck: check could not run: no access");
  });

  it("передаёт в проверку настройки, источник данных и Redis", async () => {
    const dataSource = {} as DataSource;
    const redis = {} as Redis;
    const check = createCheck("contextCheck", []);
    const service = new EnvironmentChecksService({ env: "production" }, dataSource, redis, [check]);

    await service.verifyAtStartup();

    expect(check.run).toHaveBeenCalledWith({
      settings: { env: "production" },
      dataSource,
      redis,
    });
  });
});
