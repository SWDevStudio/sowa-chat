import { EventEmitterModule } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { MockInstance } from "vitest";
import { CacheBusModule } from "../../../test/support/cache-bus-module.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { OperatorBlockEvent } from "../../telemetry/events/domain-events.js";
import { DisabledOperators } from "./disabled-operators.js";
import { OperatorsRepository } from "./operators.repository.js";

interface Probe {
  disabledOperators: DisabledOperators;
  findDisabledIds: MockInstance<OperatorsRepository["findDisabledIds"]>;
}

async function createProbe(initialIds: string[] = []): Promise<Probe> {
  const findDisabledIds = vi
    .fn<OperatorsRepository["findDisabledIds"]>()
    .mockResolvedValue(initialIds);
  const moduleRef = await Test.createTestingModule({
    providers: [DisabledOperators, { provide: OperatorsRepository, useValue: { findDisabledIds } }],
  }).compile();
  return { disabledOperators: moduleRef.get(DisabledOperators), findDisabledIds };
}

describe("DisabledOperators", () => {
  it("до load список пуст", async () => {
    const { disabledOperators } = await createProbe(["operator-1"]);

    expect(disabledOperators.has("operator-1")).toBe(false);
  });

  it("после load has истинен ровно для ID из findDisabledIds", async () => {
    const { disabledOperators } = await createProbe(["operator-1", "operator-2"]);

    await disabledOperators.load();

    expect(disabledOperators.has("operator-1")).toBe(true);
    expect(disabledOperators.has("operator-2")).toBe(true);
    expect(disabledOperators.has("operator-3")).toBe(false);
    expect(disabledOperators.has("")).toBe(false);
  });

  it("load с пустым ответом оставляет список пустым", async () => {
    const { disabledOperators } = await createProbe([]);

    await disabledOperators.load();

    expect(disabledOperators.has("operator-1")).toBe(false);
  });

  it("onApplicationBootstrap загружает список", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);

    await disabledOperators.onApplicationBootstrap();

    expect(findDisabledIds).toHaveBeenCalledTimes(1);
    expect(disabledOperators.has("operator-1")).toBe(true);
  });

  it("onApplicationBootstrap не перехватывает ошибку БД", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe();
    findDisabledIds.mockRejectedValue(new Error("connection refused"));

    await expect(disabledOperators.onApplicationBootstrap()).rejects.toThrow("connection refused");
  });

  it("add делает has истинным, остальные ID не затрагиваются", async () => {
    const { disabledOperators } = await createProbe();

    disabledOperators.add("operator-1");

    expect(disabledOperators.has("operator-1")).toBe(true);
    expect(disabledOperators.has("operator-2")).toBe(false);
  });

  it("повторный add не ломает список, один remove его снимает", async () => {
    const { disabledOperators } = await createProbe();

    disabledOperators.add("operator-1");
    disabledOperators.add("operator-1");
    disabledOperators.remove("operator-1");

    expect(disabledOperators.has("operator-1")).toBe(false);
  });

  it("remove снимает ID, загруженный из базы", async () => {
    const { disabledOperators } = await createProbe(["operator-1", "operator-2"]);
    await disabledOperators.load();

    disabledOperators.remove("operator-1");

    expect(disabledOperators.has("operator-1")).toBe(false);
    expect(disabledOperators.has("operator-2")).toBe(true);
  });

  it("remove неизвестного ID не бросает", async () => {
    const { disabledOperators } = await createProbe(["operator-1"]);
    await disabledOperators.load();

    expect(() => disabledOperators.remove("unknown")).not.toThrow();
    expect(disabledOperators.has("operator-1")).toBe(true);
  });

  it("повторный load заменяет список, а не дополняет", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);
    await disabledOperators.load();
    disabledOperators.add("operator-added");
    findDisabledIds.mockResolvedValue(["operator-2"]);

    await disabledOperators.load();

    expect(disabledOperators.has("operator-1")).toBe(false);
    expect(disabledOperators.has("operator-added")).toBe(false);
    expect(disabledOperators.has("operator-2")).toBe(true);
  });

  it("повторный load с пустым ответом очищает список", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);
    await disabledOperators.load();
    findDisabledIds.mockResolvedValue([]);

    await disabledOperators.load();

    expect(disabledOperators.has("operator-1")).toBe(false);
  });

  it("пока load ждёт базу, has отвечает по старому списку", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);
    await disabledOperators.load();
    let resolveIds: (ids: string[]) => void = () => undefined;
    findDisabledIds.mockReturnValue(new Promise((resolve) => (resolveIds = resolve)));

    const loading = disabledOperators.load();

    expect(disabledOperators.has("operator-1")).toBe(true);
    resolveIds(["operator-2"]);
    await loading;
    expect(disabledOperators.has("operator-1")).toBe(false);
    expect(disabledOperators.has("operator-2")).toBe(true);
  });

  it("ошибка повторного load оставляет прежний список", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);
    await disabledOperators.load();
    findDisabledIds.mockRejectedValue(new Error("connection refused"));

    await expect(disabledOperators.load()).rejects.toThrow("connection refused");

    expect(disabledOperators.has("operator-1")).toBe(true);
  });

  it("has не обращается к репозиторию", async () => {
    const { disabledOperators, findDisabledIds } = await createProbe(["operator-1"]);
    await disabledOperators.load();
    findDisabledIds.mockClear();

    disabledOperators.has("operator-1");
    disabledOperators.has("operator-2");

    expect(findDisabledIds).not.toHaveBeenCalled();
  });
});

interface BusProbe {
  moduleRef: TestingModule;
  bus: DomainEventBus;
  disabledOperators: DisabledOperators;
}

function blockEvent(operatorId: string): OperatorBlockEvent {
  return {
    operatorId,
    projectId: "project-1",
    externalId: "ext-1",
    actorKind: "cli",
  };
}

async function createBusProbe(initialIds: string[] = []): Promise<BusProbe> {
  const findDisabledIds = vi
    .fn<OperatorsRepository["findDisabledIds"]>()
    .mockResolvedValue(initialIds);
  const moduleRef = await Test.createTestingModule({
    imports: [EventEmitterModule.forRoot(), CacheBusModule],
    providers: [DisabledOperators, { provide: OperatorsRepository, useValue: { findDisabledIds } }],
  }).compile();
  await moduleRef.init();
  return {
    moduleRef,
    bus: moduleRef.get(DomainEventBus),
    disabledOperators: moduleRef.get(DisabledOperators),
  };
}

describe("DisabledOperators и доменные события своего процесса", () => {
  let probe: BusProbe | undefined;

  afterEach(async () => {
    await probe?.moduleRef.close();
    probe = undefined;
  });

  it("operator.disabled сразу делает has истинным", async () => {
    probe = await createBusProbe();

    await probe.bus.publish("operator.disabled", blockEvent("operator-1"));

    expect(probe.disabledOperators.has("operator-1")).toBe(true);
    expect(probe.disabledOperators.has("operator-2")).toBe(false);
  });

  it("operator.enabled сразу снимает блокировку", async () => {
    probe = await createBusProbe();
    await probe.bus.publish("operator.disabled", blockEvent("operator-1"));

    await probe.bus.publish("operator.enabled", blockEvent("operator-1"));

    expect(probe.disabledOperators.has("operator-1")).toBe(false);
  });

  it("operator.enabled снимает ID, загруженный при старте, и не трогает другие", async () => {
    probe = await createBusProbe(["operator-1", "operator-2"]);
    expect(probe.disabledOperators.has("operator-1")).toBe(true);

    await probe.bus.publish("operator.enabled", blockEvent("operator-1"));

    expect(probe.disabledOperators.has("operator-1")).toBe(false);
    expect(probe.disabledOperators.has("operator-2")).toBe(true);
  });

  it("повторное operator.disabled оставляет оператора в списке", async () => {
    probe = await createBusProbe(["operator-1"]);

    await probe.bus.publish("operator.disabled", blockEvent("operator-1"));

    expect(probe.disabledOperators.has("operator-1")).toBe(true);
  });

  it("operator.enabled для оператора не из списка не бросает", async () => {
    probe = await createBusProbe();

    await expect(
      probe.bus.publish("operator.enabled", blockEvent("operator-1")),
    ).resolves.toBeUndefined();
    expect(probe.disabledOperators.has("operator-1")).toBe(false);
  });

  it("другие доменные события список не меняют", async () => {
    probe = await createBusProbe(["operator-1"]);

    await probe.bus.publish("apiKey.revoked", {
      apiKeyId: "operator-2",
      projectId: "project-1",
      kind: "server",
      prefix: "sk_AbCdEfGhIjKl",
      botId: null,
      actorKind: "cli",
    });

    expect(probe.disabledOperators.has("operator-1")).toBe(true);
    expect(probe.disabledOperators.has("operator-2")).toBe(false);
  });

  it("без EventEmitterModule прежний модуль собирается и список работает", async () => {
    const { disabledOperators } = await createProbe();

    disabledOperators.add("operator-1");

    expect(disabledOperators.has("operator-1")).toBe(true);
  });
});
