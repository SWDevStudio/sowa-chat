import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";
import { pino } from "pino";
import { serverModes } from "../../server-mode.js";
import type { ServerMode } from "../../server-mode.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { createLogDestination, logFileDescriptor } from "./log-destination.js";

const stdoutDescriptor = 1;
const stderrDescriptor = 2;
const stdoutModes = serverModes.filter((mode) => mode !== "cli");

interface LogDestination {
  fd?: unknown;
  sync?: unknown;
  maxLength?: unknown;
}

function rootDestination(): LogDestination {
  return Reflect.get(PinoLogger.root, pino.symbols.streamSym) as LogDestination;
}

describe("logFileDescriptor", () => {
  it("cli пишет логи в stderr", () => {
    expect(logFileDescriptor("cli")).toBe(stderrDescriptor);
  });

  it.each(stdoutModes)("%s пишет логи в stdout", (mode) => {
    expect(logFileDescriptor(mode)).toBe(stdoutDescriptor);
  });

  it("для каждого режима возвращает 1 или 2", () => {
    for (const mode of serverModes) {
      expect([stdoutDescriptor, stderrDescriptor], mode).toContain(logFileDescriptor(mode));
    }
  });
});

describe("createLogDestination", () => {
  it.each<[ServerMode, number]>([
    ["cli", stderrDescriptor],
    ["api", stdoutDescriptor],
    ["worker", stdoutDescriptor],
    ["migrate", stdoutDescriptor],
  ])("режим %s: поток с fd %i", (mode, descriptor) => {
    const destination = createLogDestination(mode) as LogDestination;

    expect(destination.fd).toBe(descriptor);
  });

  it("поток остаётся асинхронным с пределом буфера", () => {
    const destination = createLogDestination("cli") as LogDestination;

    expect(destination.sync).toBe(false);
    expect(destination.maxLength).toBeGreaterThan(0);
  });
});

describe("createLoggerModule в режиме cli", () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    stubTestEnv({ SOWA_LOG_FORMAT: "json" });
    vi.resetModules();
    const { AppConfigModule } = await import("../config/config.module.js");
    const { AppClsModule } = await import("../cls/app-cls.module.js");
    const { createLoggerModule } = await import("./logger.module.js");
    moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, AppClsModule, createLoggerModule("cli")],
    }).compile();
  });

  afterAll(async () => {
    await moduleRef?.close();
    vi.unstubAllEnvs();
  });

  it("json-логгер пишет в поток с fd 2", () => {
    expect(rootDestination().fd).toBe(stderrDescriptor);
  });

  it("поток остаётся асинхронным", () => {
    expect(rootDestination().sync).toBe(false);
  });
});
