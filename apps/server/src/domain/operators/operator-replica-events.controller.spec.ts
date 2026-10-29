import { randomUUID } from "node:crypto";
import { Logger } from "@nestjs/common";
import { PatternHandler } from "@nestjs/microservices/enums/pattern-handler.enum.js";
import { Test } from "@nestjs/testing";
import type { MockInstance } from "vitest";
import { replicaEventPatterns } from "../../infra/replica-events/replica-events.js";
import { DisabledOperators } from "./disabled-operators.js";
import { DisabledOperatorsModule } from "./disabled-operators.module.js";
import { OperatorReplicaEventsController } from "./operator-replica-events.controller.js";
import { OperatorsService } from "./operators.service.js";

const warningText = "Ignored malformed operator replica event";
const secretMarker = "secret-marker-7f3a";

const malformedPayloads = [
  ["operatorId не UUID", { operatorId: "operator-1" }],
  ["пустой operatorId", { operatorId: "" }],
  ["operatorId число", { operatorId: 42 }],
  ["нет operatorId", {}],
  ["строка вместо объекта", "operator-1"],
  ["массив вместо объекта", [randomUUID()]],
  ["null", null],
  ["undefined", undefined],
] as const;

function createDisabledOperators(): DisabledOperators {
  const findDisabledIds = vi.fn<OperatorsService["findDisabledIds"]>().mockResolvedValue([]);
  return new DisabledOperators({ findDisabledIds } as unknown as OperatorsService);
}

describe("OperatorReplicaEventsController", () => {
  let disabledOperators: DisabledOperators;
  let controller: OperatorReplicaEventsController;
  let warn: MockInstance<Logger["warn"]>;

  beforeEach(() => {
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    disabledOperators = createDisabledOperators();
    controller = new OperatorReplicaEventsController(disabledOperators);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("disabled помечен как EventPattern operator.disabled", () => {
    const handler = OperatorReplicaEventsController.prototype.disabled;

    expect(Reflect.getMetadata("microservices:pattern", handler)).toStrictEqual([
      "operator.disabled",
    ]);
    expect(Reflect.getMetadata("microservices:handler_type", handler)).toBe(PatternHandler.EVENT);
  });

  it("enabled помечен как EventPattern operator.enabled", () => {
    const handler = OperatorReplicaEventsController.prototype.enabled;

    expect(Reflect.getMetadata("microservices:pattern", handler)).toStrictEqual([
      "operator.enabled",
    ]);
    expect(Reflect.getMetadata("microservices:handler_type", handler)).toBe(PatternHandler.EVENT);
  });

  it("имена берутся из replicaEventPatterns", () => {
    expect(replicaEventPatterns.operatorDisabled).toBe("operator.disabled");
    expect(replicaEventPatterns.operatorEnabled).toBe("operator.enabled");
  });

  it("верное operator.disabled добавляет оператора в список", () => {
    const operatorId = randomUUID();

    controller.disabled({ operatorId });

    expect(disabledOperators.has(operatorId)).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });

  it("operator.disabled не затрагивает других операторов", () => {
    const operatorId = randomUUID();
    const otherId = randomUUID();

    controller.disabled({ operatorId });

    expect(disabledOperators.has(otherId)).toBe(false);
  });

  it("верное operator.enabled убирает оператора из списка", () => {
    const operatorId = randomUUID();
    const otherId = randomUUID();
    disabledOperators.add(operatorId);
    disabledOperators.add(otherId);

    controller.enabled({ operatorId });

    expect(disabledOperators.has(operatorId)).toBe(false);
    expect(disabledOperators.has(otherId)).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });

  it("operator.enabled для оператора не из списка не бросает", () => {
    expect(() => controller.enabled({ operatorId: randomUUID() })).not.toThrow();
    expect(warn).not.toHaveBeenCalled();
  });

  it("лишние поля события не мешают", () => {
    const operatorId = randomUUID();

    controller.disabled({ operatorId, externalId: "ext-1", projectId: randomUUID() });

    expect(disabledOperators.has(operatorId)).toBe(true);
  });

  it("обработчики синхронные: список меняется до возврата", () => {
    const operatorId = randomUUID();

    const result = controller.disabled({ operatorId });

    expect(result).toBeUndefined();
    expect(disabledOperators.has(operatorId)).toBe(true);
  });

  it.each(malformedPayloads)(
    "неверное operator.disabled (%s) — список не меняется, одно предупреждение",
    (_name, payload) => {
      const add = vi.spyOn(disabledOperators, "add");

      expect(() => controller.disabled(payload)).not.toThrow();

      expect(add).not.toHaveBeenCalled();
      expect(disabledOperators.has("operator-1")).toBe(false);
      expect(disabledOperators.has("")).toBe(false);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledWith(warningText);
    },
  );

  it.each(malformedPayloads)(
    "неверное operator.enabled (%s) — заблокированный остаётся в списке",
    (_name, payload) => {
      const operatorId = randomUUID();
      disabledOperators.add(operatorId);
      const remove = vi.spyOn(disabledOperators, "remove");

      expect(() => controller.enabled(payload)).not.toThrow();

      expect(remove).not.toHaveBeenCalled();
      expect(disabledOperators.has(operatorId)).toBe(true);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledWith(warningText);
    },
  );

  it("неверное operator.enabled с UUID в другом поле не снимает блокировку", () => {
    const operatorId = randomUUID();
    disabledOperators.add(operatorId);

    controller.enabled({ id: operatorId });

    expect(disabledOperators.has(operatorId)).toBe(true);
  });

  it("предупреждение не содержит данных события", () => {
    controller.disabled({ operatorId: secretMarker, token: secretMarker });
    controller.enabled({ operatorId: secretMarker, token: secretMarker });

    expect(warn).toHaveBeenCalledTimes(2);
    expect(JSON.stringify(warn.mock.calls)).not.toContain(secretMarker);
  });

  it("после неверного события следующее верное обрабатывается", () => {
    const operatorId = randomUUID();

    controller.disabled({ operatorId: "operator-1" });
    controller.disabled({ operatorId });

    expect(disabledOperators.has(operatorId)).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe("OperatorReplicaEventsController в модуле Nest", () => {
  it("получает DisabledOperators через DI", async () => {
    const findDisabledIds = vi.fn<OperatorsService["findDisabledIds"]>().mockResolvedValue([]);
    const moduleRef = await Test.createTestingModule({
      controllers: [OperatorReplicaEventsController],
      providers: [DisabledOperators, { provide: OperatorsService, useValue: { findDisabledIds } }],
    }).compile();
    const operatorId = randomUUID();

    moduleRef.get(OperatorReplicaEventsController).disabled({ operatorId });

    expect(moduleRef.get(DisabledOperators).has(operatorId)).toBe(true);
    await moduleRef.close();
  });
});

describe("DisabledOperatorsModule", () => {
  it("регистрирует OperatorReplicaEventsController", () => {
    const controllers = Reflect.getMetadata("controllers", DisabledOperatorsModule) as unknown[];

    expect(controllers).toContain(OperatorReplicaEventsController);
  });

  it("по-прежнему отдаёт DisabledOperators", () => {
    const exported = Reflect.getMetadata("exports", DisabledOperatorsModule) as unknown[];

    expect(exported).toContain(DisabledOperators);
  });
});
