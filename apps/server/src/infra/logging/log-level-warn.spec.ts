import type { INestApplication } from "@nestjs/common";
import { once } from "node:events";
import { pino } from "pino";
import request from "supertest";
import {
  hasMessage,
  infoProbe,
  isProbeRequestEntry,
  LevelProbeController,
  LevelProbeService,
  probePath,
  warnProbe,
} from "../../../test/support/level-probe.js";
import type { LevelLogEntry } from "../../../test/support/level-probe.js";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";

const infoLevel = pino.levels.values.info;
const warnLevel = pino.levels.values.warn;

describe("уровень логов SOWA_LOG_LEVEL=warn", () => {
  const entries: LevelLogEntry[] = [];
  let app: INestApplication;

  beforeAll(async () => {
    stubTestEnv({ SOWA_LOG_LEVEL: "warn" });
    app = await createProbeApp({
      controllers: [LevelProbeController],
      providers: [LevelProbeService],
      onLogLine: (line) => entries.push(JSON.parse(line) as LevelLogEntry),
    });
    const responseFinished = once(app.get(LevelProbeService).responseFinished, "finish");
    const response = await request(app.getHttpServer()).get(probePath);
    expect(response.status).toBe(200);
    await responseFinished;
    await vi.waitFor(() => {
      expect(hasMessage(entries, warnProbe), JSON.stringify(entries)).toBe(true);
    });
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("строк уровня info нет", () => {
    const infoEntries = entries.filter((entry) => entry.level === infoLevel);

    expect(infoEntries, JSON.stringify(infoEntries)).toEqual([]);
  });

  it("сообщение logger.log не попадает в вывод", () => {
    expect(hasMessage(entries, infoProbe)).toBe(false);
  });

  it("строка лога запроса уровня info не пишется", () => {
    expect(entries.some(isProbeRequestEntry), JSON.stringify(entries)).toBe(false);
  });

  it("строки уровня warn пишутся", () => {
    const warnEntry = entries.find((entry) => entry.msg === warnProbe);

    expect(warnEntry?.level).toBe(warnLevel);
  });
});
