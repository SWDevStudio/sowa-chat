import { Injectable } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type {
  TestHappenedEvent,
  TestIgnoredEvent,
} from "../../../test/support/test-domain-events.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { TelemetryModule } from "../telemetry.module.js";
import { DomainEventBus } from "./domain-event-bus.js";
import type { DomainEventHandler } from "./domain-events.js";
import { OnDomainEvent } from "./on-domain-event.decorator.js";

const happened: TestHappenedEvent = {
  projectId: "project-1",
  operatorId: "operator-1",
  conversationId: "conversation-1",
  deletedMessages: 3,
  operatorEmail: "operator@example.com",
  visitorIp: "203.0.113.7",
};

@Injectable()
class TestListener {
  readonly received: TestHappenedEvent[] = [];
  readonly ignored: TestIgnoredEvent[] = [];

  @OnDomainEvent("test.happened")
  onHappened(data: TestHappenedEvent): void {
    this.received.push(data);
  }

  @OnDomainEvent("test.ignored")
  onIgnored(data: TestIgnoredEvent): void {
    this.ignored.push(data);
  }
}

describe("DomainEventBus", () => {
  let moduleRef: TestingModule;
  let bus: DomainEventBus;
  let listener: TestListener;

  beforeAll(() => {
    stubTestEnv();
  });

  beforeEach(async () => {
    const { AppConfigModule } = await import("../../infra/config/config.module.js");
    moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, TelemetryModule],
      providers: [TestListener],
    }).compile();
    await moduleRef.init();
    bus = moduleRef.get(DomainEventBus);
    listener = moduleRef.get(TestListener);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it("delivers published data to the decorated method", async () => {
    await bus.publish("test.happened", happened);

    expect(listener.received).toEqual([happened]);
  });

  it("delivers published data to a subscribe handler", async () => {
    const received: TestHappenedEvent[] = [];
    bus.subscribe("test.happened", (data) => {
      received.push(data);
    });

    await bus.publish("test.happened", happened);

    expect(received).toEqual([happened]);
  });

  it("does not deliver to handlers of another event", async () => {
    const ignored: TestIgnoredEvent[] = [];
    bus.subscribe("test.ignored", (data) => {
      ignored.push(data);
    });

    await bus.publish("test.happened", happened);

    expect(ignored).toEqual([]);
    expect(listener.ignored).toEqual([]);
  });

  it("delivers to the matching event only", async () => {
    await bus.publish("test.ignored", { projectId: "project-1" });

    expect(listener.ignored).toEqual([{ projectId: "project-1" }]);
    expect(listener.received).toEqual([]);
  });

  it("resolves publish only after an async handler finished", async () => {
    let finished = false;
    bus.subscribe("test.happened", async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      finished = true;
    });

    await bus.publish("test.happened", happened);

    expect(finished).toBe(true);
  });

  it("rejects publish when a handler throws", async () => {
    bus.subscribe("test.happened", () => {
      throw new Error("handler failed");
    });

    await expect(bus.publish("test.happened", happened)).rejects.toThrow("handler failed");
  });

  it("resolves publish without subscribers", async () => {
    await expect(bus.publish("test.ignored", { projectId: "p" })).resolves.toBeUndefined();
  });

  it("types publish and handler parameters", () => {
    expectTypeOf<
      Parameters<typeof bus.publish<"test.happened">>[1]
    >().toEqualTypeOf<TestHappenedEvent>();
    expectTypeOf<
      Parameters<DomainEventHandler<"test.happened">>[0]
    >().toEqualTypeOf<TestHappenedEvent>();
    expectTypeOf<Parameters<ReturnType<typeof OnDomainEvent<"test.happened">>>[2]>().toEqualTypeOf<
      TypedPropertyDescriptor<DomainEventHandler<"test.happened">>
    >();
  });
});

describe("TelemetryModule wiring", () => {
  beforeAll(() => {
    stubTestEnv();
  });

  it.each([
    ["ApiModule", async () => (await import("../../api.module.js")).ApiModule],
    ["WorkerModule", async () => (await import("../../worker.module.js")).WorkerModule],
    ["CliModule", async () => (await import("../../cli.module.js")).CliModule],
  ])("%s imports TelemetryModule", async (_name, loadMode) => {
    const mode = await loadMode();
    const imports: unknown[] = Reflect.getMetadata("imports", mode);

    expect(imports).toContain(TelemetryModule);
  });
});
