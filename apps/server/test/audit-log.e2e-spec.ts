import { Inject, Injectable } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { Transactional } from "@nestjs-cls/transactional";
import { randomUUID } from "node:crypto";
import { auditRules } from "../src/domain/audit/audit-rule.js";
import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { Project } from "../src/domain/projects/project.entity.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { testAuditRules } from "./support/test-audit-rules.js";
import type { TestHappenedEvent } from "./support/test-domain-events.js";
import { useTestDatabase } from "./support/test-database.js";

class ScenarioError extends Error {}

function happenedIn(projectId: string): TestHappenedEvent {
  return {
    projectId,
    operatorId: `operator-${randomUUID()}`,
    conversationId: randomUUID(),
    deletedMessages: 5,
    operatorEmail: "operator@example.com",
    visitorIp: "203.0.113.7",
  };
}

@Injectable()
class AuditScenarios {
  constructor(
    @Inject(ProjectsRepository) private readonly projects: ProjectsRepository,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async createProjectAndPublishFor(name: string, projectId: string): Promise<void> {
    await this.projects.create({ name });
    await this.bus.publish("test.happened", happenedIn(projectId));
  }

  @Transactional()
  async createProjectAndPublishForIt(name: string): Promise<string> {
    const project = await this.projects.create({ name });
    await this.bus.publish("test.happened", happenedIn(project.id));
    return project.id;
  }

  @Transactional()
  async createProjectPublishThenFail(name: string): Promise<void> {
    const project = await this.projects.create({ name });
    await this.bus.publish("test.happened", happenedIn(project.id));
    throw new ScenarioError("rollback");
  }
}

describe("журнал аудита на шине событий", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let bus: DomainEventBus;
  let scenarios: AuditScenarios;

  async function auditRows(): Promise<AuditLogEntry[]> {
    return getDataSource().getRepository(AuditLogEntry).find();
  }

  async function projectExists(name: string): Promise<boolean> {
    return getDataSource().getRepository(Project).existsBy({ name });
  }

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, ProjectsModule],
      providers: [AuditScenarios],
    })
      .overrideProvider(auditRules)
      .useValue(testAuditRules)
      .compile();
    await moduleRef.init();
    bus = moduleRef.get(DomainEventBus);
    scenarios = moduleRef.get(AuditScenarios);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  it("test.happened для существующего проекта создаёт одну строку с полями из правила", async () => {
    const project = await createProject(getDataSource());
    const event = happenedIn(project.id);

    await bus.publish("test.happened", event);

    const rows = await auditRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      projectId: project.id,
      actorKind: "operator",
      actorId: event.operatorId,
      action: "test.happened",
      targetKind: "conversation",
      targetId: event.conversationId,
    });
    expect(rows[0]?.data).toEqual({ deletedMessages: event.deletedMessages });
  });

  it("строка журнала не содержит operatorEmail и visitorIp", async () => {
    const project = await createProject(getDataSource());
    const event = happenedIn(project.id);

    await bus.publish("test.happened", event);

    const raw: unknown[] = await getDataSource().query('SELECT * FROM "audit_log"');
    const serialized = JSON.stringify(raw);
    expect(serialized).not.toContain(event.operatorEmail);
    expect(serialized).not.toContain(event.visitorIp);
    expect(serialized).not.toContain("operatorEmail");
    expect(serialized).not.toContain("visitorIp");
  });

  it("test.ignored не создаёт строку журнала", async () => {
    const project = await createProject(getDataSource());

    await bus.publish("test.ignored", { projectId: project.id });

    expect(await auditRows()).toEqual([]);
  });

  it("без внешней транзакции ошибка записи не отклоняет publish и строку не создаёт", async () => {
    await expect(bus.publish("test.happened", happenedIn(randomUUID()))).resolves.toBeUndefined();

    expect(await auditRows()).toEqual([]);
  });

  it("в @Transactional() ошибка записи журнала откатывает только запись, проект сохраняется", async () => {
    const name = `audit-${randomUUID()}`;

    await expect(scenarios.createProjectAndPublishFor(name, randomUUID())).resolves.toBeUndefined();

    expect(await projectExists(name)).toBe(true);
    expect(await auditRows()).toEqual([]);
  });

  it("в @Transactional() запись журнала о новом проекте сохраняется вместе с проектом", async () => {
    const name = `audit-${randomUUID()}`;

    const projectId = await scenarios.createProjectAndPublishForIt(name);

    expect(await projectExists(name)).toBe(true);
    const rows = await auditRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]?.projectId).toBe(projectId);
  });

  it("ошибка сценария после публикации откатывает и проект, и запись журнала", async () => {
    const name = `audit-${randomUUID()}`;

    await expect(scenarios.createProjectPublishThenFail(name)).rejects.toBeInstanceOf(
      ScenarioError,
    );

    expect(await projectExists(name)).toBe(false);
    expect(await auditRows()).toEqual([]);
  });
});
