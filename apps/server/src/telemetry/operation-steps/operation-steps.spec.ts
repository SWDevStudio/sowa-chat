import type { INestApplication } from "@nestjs/common";
import { Controller, Get, Inject } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ClsModule, ClsService } from "nestjs-cls";
import request from "supertest";
import { createProbeApp, stubTestEnv } from "../../../test/support/unit-probe.js";
import { beginOperation } from "./operation-timing.js";
import { OperationSteps } from "./operation-steps.js";
import { OperationStepsModule } from "./operation-steps.module.js";

const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

describe("OperationSteps", () => {
  let cls: ClsService;
  let steps: OperationSteps;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClsModule.forRoot({ global: true }), OperationStepsModule],
    }).compile();
    cls = moduleRef.get(ClsService);
    steps = moduleRef.get(OperationSteps);
  });

  it("beginOperation кладёт startedAt и пустые steps", () => {
    cls.run(() => {
      const timing = beginOperation(cls);

      expect(typeof timing.startedAt).toBe("number");
      expect(timing.steps).toEqual({});
      expect(steps.current()).toBe(timing);
    });
  });

  it("record суммирует время одного шага", () => {
    cls.run(() => {
      beginOperation(cls);
      steps.record("db", 10);
      steps.record("db", 15);

      expect(steps.current()?.steps).toEqual({ db: 25 });
    });
  });

  it("current видит шаги, записанные позже, по ссылке", () => {
    cls.run(() => {
      beginOperation(cls);
      const taken = steps.current();
      steps.record("bot", 3);

      expect(taken?.steps).toEqual({ bot: 3 });
    });
  });

  it("measure добавляет не меньше реального ожидания и возвращает результат", async () => {
    await cls.run(async () => {
      beginOperation(cls);
      const result = await steps.measure("redis", async () => {
        await pause(30);
        return "ok";
      });

      expect(result).toBe("ok");
      expect(steps.current()?.steps.redis).toBeGreaterThanOrEqual(25);
    });
  });

  it("measure пробрасывает ошибку и всё равно записывает время", async () => {
    await cls.run(async () => {
      beginOperation(cls);
      const failure = new Error("boom");

      await expect(
        steps.measure("queueWait", async () => {
          await pause(10);
          throw failure;
        }),
      ).rejects.toBe(failure);
      expect(steps.current()?.steps.queueWait).toBeGreaterThanOrEqual(5);
    });
  });

  it("параллельные контексты не видят шаги друг друга", async () => {
    const operation = async (step: "db" | "redis", delays: number[]) =>
      cls.run(async () => {
        beginOperation(cls);
        for (const delay of delays) {
          await pause(delay);
          steps.record(step, delay);
        }
        return steps.current()?.steps;
      });

    const [first, second] = await Promise.all([
      operation("db", [5, 15, 5]),
      operation("redis", [10, 5, 20]),
    ]);

    expect(first).toEqual({ db: 25 });
    expect(second).toEqual({ redis: 35 });
  });

  it("вне контекста record не бросает, current возвращает undefined", () => {
    expect(steps.current()).toBeUndefined();
    expect(() => steps.record("db", 5)).not.toThrow();
  });

  it("в контексте без beginOperation record не бросает", () => {
    cls.run(() => {
      expect(steps.current()).toBeUndefined();
      expect(() => steps.record("db", 5)).not.toThrow();
    });
  });

  it("measure вне контекста возвращает результат work", async () => {
    await expect(steps.measure("db", async () => 7)).resolves.toBe(7);
  });
});

@Controller("operation-steps-probe")
class OperationStepsProbeController {
  constructor(@Inject(OperationSteps) private readonly steps: OperationSteps) {}

  @Get()
  read(): { startedAt: number | undefined; steps: unknown } {
    const timing = this.steps.current();
    return { startedAt: timing?.startedAt, steps: timing?.steps };
  }
}

describe("ClsMiddleware начинает операцию", () => {
  let app: INestApplication;

  beforeAll(async () => {
    stubTestEnv();
    app = await createProbeApp({
      controllers: [OperationStepsProbeController],
      providers: [OperationSteps],
    });
  });

  afterAll(async () => {
    await app?.close();
    vi.unstubAllEnvs();
  });

  it("обработчик запроса видит startedAt и пустые steps", async () => {
    const response = await request(app.getHttpServer()).get("/operation-steps-probe");

    expect(response.status).toBe(200);
    expect(typeof response.body.startedAt).toBe("number");
    expect(response.body.steps).toEqual({});
  });
});
