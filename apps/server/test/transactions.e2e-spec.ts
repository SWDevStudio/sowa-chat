import { Inject, Injectable } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";
import { Transactional, TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { randomUUID } from "node:crypto";
import { DataSource, In } from "typeorm";
import { Project } from "../src/domain/projects/project.entity.js";
import { ProjectsModule } from "../src/domain/projects/projects.module.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import { WorkerModule } from "../src/worker.module.js";

class ScenarioError extends Error {}

@Injectable()
class SecondProjectsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(name: string): Promise<void> {
    await this.txHost.tx.getRepository(Project).save({ name });
  }
}

@Injectable()
class TransactionScenarios {
  constructor(
    @Inject(ProjectsRepository) private readonly projects: ProjectsRepository,
    @Inject(SecondProjectsRepository) private readonly secondProjects: SecondProjectsRepository,
  ) {}

  @Transactional()
  async createTwo(firstName: string, secondName: string): Promise<void> {
    await this.projects.create({ name: firstName });
    await this.secondProjects.create(secondName);
  }

  @Transactional()
  async createTwoThenFail(firstName: string, secondName: string): Promise<void> {
    await this.projects.create({ name: firstName });
    await this.secondProjects.create(secondName);
    throw new ScenarioError("rollback");
  }

  async createOneWithoutTransaction(name: string): Promise<void> {
    await this.projects.create({ name });
    throw new ScenarioError("no rollback");
  }

  @Transactional()
  async outerFailsAfterInner(name: string): Promise<void> {
    await this.innerCreate(name);
    throw new ScenarioError("outer rollback");
  }

  @Transactional()
  async innerCreate(name: string): Promise<void> {
    await this.projects.create({ name });
  }
}

describe("транзакции @Transactional()", () => {
  let moduleRef: TestingModule;
  let dataSource: DataSource;
  let scenarios: TransactionScenarios;
  let projects: ProjectsRepository;
  let createdNames: string[];

  function uniqueName(): string {
    const name = `tx-${randomUUID()}`;
    createdNames.push(name);
    return name;
  }

  async function exists(name: string): Promise<boolean> {
    return dataSource.getRepository(Project).existsBy({ name });
  }

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, ProjectsModule],
      providers: [TransactionScenarios, SecondProjectsRepository],
    }).compile();
    await moduleRef.init();
    dataSource = moduleRef.get<DataSource>(getDataSourceToken());
    scenarios = moduleRef.get(TransactionScenarios);
    projects = moduleRef.get(ProjectsRepository);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  beforeEach(() => {
    createdNames = [];
  });

  afterEach(async () => {
    await dataSource.getRepository(Project).delete({ name: In(createdNames) });
  });

  it("ошибка в методе с @Transactional() откатывает записи обоих репозиториев", async () => {
    const firstName = uniqueName();
    const secondName = uniqueName();

    await expect(scenarios.createTwoThenFail(firstName, secondName)).rejects.toBeInstanceOf(
      ScenarioError,
    );

    expect(await exists(firstName)).toBe(false);
    expect(await exists(secondName)).toBe(false);
  });

  it("метод с @Transactional() без ошибки сохраняет оба проекта", async () => {
    const firstName = uniqueName();
    const secondName = uniqueName();

    await scenarios.createTwo(firstName, secondName);

    expect(await exists(firstName)).toBe(true);
    expect(await exists(secondName)).toBe(true);
  });

  it("без @Transactional() запись сохраняется, несмотря на ошибку после неё", async () => {
    const name = uniqueName();

    await expect(scenarios.createOneWithoutTransaction(name)).rejects.toBeInstanceOf(ScenarioError);

    expect(await exists(name)).toBe(true);
  });

  it("вложенный @Transactional() присоединяется к внешней транзакции и откатывается с ней", async () => {
    const name = uniqueName();

    await expect(scenarios.outerFailsAfterInner(name)).rejects.toBeInstanceOf(ScenarioError);

    expect(await exists(name)).toBe(false);
  });

  it("ProjectsRepository.create возвращает проект с полями из базы", async () => {
    const name = uniqueName();

    const created = await projects.create({ name });

    expect(created.name).toBe(name);
    expect(created.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(created.allowedOrigins).toEqual([]);
    expect(created.settings).toEqual({});
    expect(created.createdAt).toBeInstanceOf(Date);
  });

  it("ProjectsRepository.findByName находит созданный проект", async () => {
    const name = uniqueName();
    const created = await projects.create({ name });

    const found = await projects.findByName(name);

    expect(found?.id).toBe(created.id);
    expect(found?.name).toBe(name);
  });

  it("ProjectsRepository.findByName возвращает null для неизвестного имени", async () => {
    expect(await projects.findByName(`missing-${randomUUID()}`)).toBeNull();
  });
});
