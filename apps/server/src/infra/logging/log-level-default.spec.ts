import type { INestApplication } from "@nestjs/common";
import { pino } from "pino";
import request from "supertest";
import {
  infoProbe,
  isProbeRequestEntry,
  LevelProbeController,
  LevelProbeService,
  probePath,
} from "../../../test/support/level-probe.js";
import type { LevelLogEntry } from "../../../test/support/level-probe.js";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";

const infoLevel = pino.levels.values.info;

describe("уровень логов без SOWA_LOG_LEVEL", () => {
  const entries: LevelLogEntry[] = [];
  let app: INestApplication;

  beforeAll(async () => {
    stubTestEnv();
    app = await createProbeApp({
      controllers: [LevelProbeController],
      providers: [LevelProbeService],
      onLogLine: (line) => entries.push(JSON.parse(line) as LevelLogEntry),
    });
    const response = await request(app.getHttpServer()).get(probePath);
    expect(response.status).toBe(200);
    await vi.waitFor(() => {
      expect(entries.some(isProbeRequestEntry), JSON.stringify(entries)).toBe(true);
    });
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("уровень info по умолчанию: строки info пишутся", () => {
    const infoEntry = entries.find((entry) => entry.msg === infoProbe);

    expect(infoEntry?.level).toBe(infoLevel);
  });

  it("строки ниже info не пишутся", () => {
    const belowInfo = entries.filter(
      (entry) => typeof entry.level === "number" && entry.level < infoLevel,
    );

    expect(belowInfo, JSON.stringify(belowInfo)).toEqual([]);
  });
});
