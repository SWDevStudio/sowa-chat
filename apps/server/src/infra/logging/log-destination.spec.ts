import type { INestApplication } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { pino } from "pino";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";

const stdoutDescriptor = 1;

interface LogDestination {
  fd?: unknown;
  sync?: unknown;
  maxLength?: unknown;
  write: (line: string) => boolean;
  once: (event: "drop", listener: (data: string) => void) => void;
}

function currentDestination(): LogDestination {
  return Reflect.get(PinoLogger.root, pino.symbols.streamSym) as LogDestination;
}

function configuredMaxLength(destination: LogDestination): number {
  expect(typeof destination.maxLength, "maxLength").toBe("number");
  const maxLength = destination.maxLength as number;
  expect(maxLength).toBeGreaterThan(0);
  expect(Number.isFinite(maxLength)).toBe(true);
  return maxLength;
}

describe("буфер записи логов в stdout", () => {
  let app: INestApplication;
  let destination: LogDestination;

  beforeAll(async () => {
    stubTestEnv({ SOWA_LOG_FORMAT: "json" });
    app = await createProbeApp();
    destination = currentDestination();
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("пишет в stdout", () => {
    expect(destination.fd).toBe(stdoutDescriptor);
  });

  it("пишет асинхронно", () => {
    expect(destination.sync).toBe(false);
  });

  it("у буфера задан предел maxLength", () => {
    configuredMaxLength(destination);
  });

  it("строка больше предела отбрасывается с событием drop", () => {
    const maxLength = configuredMaxLength(destination);
    const oversizedLine = `${"x".repeat(maxLength + 1)}\n`;
    const dropped: string[] = [];
    destination.once("drop", (data) => dropped.push(data));

    destination.write(oversizedLine);

    expect(dropped).toEqual([oversizedLine]);
  });
});
