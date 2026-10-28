import { Test } from "@nestjs/testing";
import { ClsModule, ClsService } from "nestjs-cls";
import type { AfterQueryEvent, DataSource } from "typeorm";
import { OperationSteps } from "../../telemetry/operation-steps/operation-steps.js";
import { beginOperation } from "../../telemetry/operation-steps/operation-timing.js";
import { DatabaseStepSubscriber } from "./database-step.subscriber.js";

function queryEvent(executionTime: number | undefined): AfterQueryEvent {
  return { executionTime } as AfterQueryEvent;
}

describe("DatabaseStepSubscriber", () => {
  let cls: ClsService;
  let steps: OperationSteps;
  let subscribers: unknown[];
  let subscriber: DatabaseStepSubscriber;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClsModule.forRoot({ global: true })],
      providers: [OperationSteps],
    }).compile();
    cls = moduleRef.get(ClsService);
    steps = moduleRef.get(OperationSteps);
  });

  beforeEach(() => {
    subscribers = [];
    subscriber = new DatabaseStepSubscriber({ subscribers } as unknown as DataSource, steps);
  });

  it("добавляет себя в dataSource.subscribers", () => {
    expect(subscribers).toEqual([subscriber]);
  });

  it("afterQuery суммирует executionTime в шаг db", () => {
    cls.run(() => {
      const timing = beginOperation(cls);

      subscriber.afterQuery(queryEvent(7));
      subscriber.afterQuery(queryEvent(7));

      expect(timing.steps.db).toBe(14);
    });
  });

  it("неудачный запрос без executionTime шаг не меняет", () => {
    cls.run(() => {
      const timing = beginOperation(cls);

      subscriber.afterQuery(queryEvent(undefined));

      expect(timing.steps).toEqual({});
    });
  });

  it("executionTime 0 создаёт шаг db со значением 0", () => {
    cls.run(() => {
      const timing = beginOperation(cls);

      subscriber.afterQuery(queryEvent(0));

      expect(timing.steps.db).toBe(0);
    });
  });

  it("вне контекста CLS не бросает исключение", () => {
    expect(() => subscriber.afterQuery(queryEvent(5))).not.toThrow();
  });

  it("в контексте CLS без beginOperation не бросает исключение", () => {
    cls.run(() => {
      expect(() => subscriber.afterQuery(queryEvent(5))).not.toThrow();
    });
  });
});
