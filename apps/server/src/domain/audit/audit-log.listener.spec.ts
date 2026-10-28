import { Logger } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { Propagation, TransactionHost } from "@nestjs-cls/transactional";
import type { TestHappenedEvent } from "../../../test/support/test-domain-events.js";
import { testAuditRules } from "../../../test/support/test-audit-rules.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import { TelemetryModule } from "../../telemetry/telemetry.module.js";
import { AuditLogListener } from "./audit-log.listener.js";
import { AuditLogRepository } from "./audit-log.repository.js";
import { auditedEventNames, auditRules } from "./audit-rule.js";
import { AuditModule } from "./audit.module.js";

const happened: TestHappenedEvent = {
  projectId: "project-1",
  operatorId: "operator-1",
  conversationId: "conversation-1",
  deletedMessages: 3,
  operatorEmail: "operator@example.com",
  visitorIp: "203.0.113.7",
};

const personalValues = [happened.operatorEmail, happened.visitorIp];

const eventValues = [
  happened.projectId,
  happened.operatorId,
  happened.conversationId,
  happened.operatorEmail,
  happened.visitorIp,
];

describe("AuditLogListener", () => {
  let moduleRef: TestingModule;
  let bus: DomainEventBus;
  let create: ReturnType<typeof vi.fn>;
  let propagations: unknown[];

  beforeAll(() => {
    stubTestEnv();
  });

  beforeEach(async () => {
    const { AppConfigModule } = await import("../../infra/config/config.module.js");
    create = vi.fn().mockResolvedValue({});
    propagations = [];
    moduleRef = await Test.createTestingModule({
      imports: [AppConfigModule, TelemetryModule],
      providers: [
        AuditLogListener,
        { provide: auditRules, useValue: testAuditRules },
        { provide: AuditLogRepository, useValue: { create } },
        {
          provide: TransactionHost,
          useValue: {
            withTransaction: (propagation: unknown, run: () => Promise<unknown>) => {
              propagations.push(propagation);
              return run();
            },
          },
        },
      ],
    }).compile();
    await moduleRef.init();
    bus = moduleRef.get(DomainEventBus);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await moduleRef.close();
  });

  it("записывает test.happened один раз полями из правила и action равным имени события", async () => {
    await bus.publish("test.happened", happened);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      projectId: happened.projectId,
      actorKind: "operator",
      actorId: happened.operatorId,
      targetKind: "conversation",
      targetId: happened.conversationId,
      data: { deletedMessages: happened.deletedMessages },
      action: "test.happened",
    });
  });

  it("не передаёт в запись operatorEmail и visitorIp", async () => {
    await bus.publish("test.happened", happened);

    const serialized = JSON.stringify(create.mock.calls);
    expect(serialized).not.toContain("operatorEmail");
    expect(serialized).not.toContain("visitorIp");
    for (const value of personalValues) {
      expect(serialized).not.toContain(value);
    }
  });

  it("пишет запись во вложенной транзакции Propagation.Nested", async () => {
    await bus.publish("test.happened", happened);

    expect(propagations).toEqual([Propagation.Nested]);
  });

  it("не записывает событие, которого нет в списке правил", async () => {
    await bus.publish("test.ignored", { projectId: happened.projectId });

    expect(create).not.toHaveBeenCalled();
  });

  it("при ошибке записи publish разрешается, а ошибка уходит в лог с action без данных события", async () => {
    const failure = new Error("insert failed");
    create.mockRejectedValue(failure);
    const logError = vi.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);

    await expect(bus.publish("test.happened", happened)).resolves.toBeUndefined();

    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(
      { err: failure, action: "test.happened" },
      "Audit log write failed",
    );
    const serialized = JSON.stringify(logError.mock.calls);
    for (const value of eventValues) {
      expect(serialized).not.toContain(value);
    }
    expect(serialized).not.toContain("deletedMessages");
  });

  it("при синхронной ошибке записи publish тоже разрешается", async () => {
    create.mockImplementation(() => {
      throw new Error("sync failure");
    });
    const logError = vi.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);

    await expect(bus.publish("test.happened", happened)).resolves.toBeUndefined();

    expect(logError).toHaveBeenCalledTimes(1);
  });

  it("после ошибки записи следующее событие снова записывается", async () => {
    vi.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);
    create.mockRejectedValueOnce(new Error("insert failed"));

    await bus.publish("test.happened", happened);
    await bus.publish("test.happened", happened);

    expect(create).toHaveBeenCalledTimes(2);
  });
});

describe("auditedEventNames", () => {
  it("возвращает имена событий из списка правил", () => {
    expect(auditedEventNames(testAuditRules)).toEqual(["test.happened"]);
  });

  it("возвращает пустой список для пустых правил", () => {
    expect(auditedEventNames({})).toEqual([]);
  });
});

describe("подключение AuditModule", () => {
  beforeAll(() => {
    stubTestEnv();
  });

  it.each([
    ["ApiModule", async () => (await import("../../api.module.js")).ApiModule],
    ["WorkerModule", async () => (await import("../../worker.module.js")).WorkerModule],
    ["CliModule", async () => (await import("../../cli.module.js")).CliModule],
  ])("%s импортирует AuditModule сразу после TelemetryModule", async (_name, loadMode) => {
    const mode = await loadMode();
    const imports: unknown[] = Reflect.getMetadata("imports", mode);

    expect(imports).toContain(AuditModule);
    expect(imports.indexOf(AuditModule)).toBe(imports.indexOf(TelemetryModule) + 1);
  });
});
