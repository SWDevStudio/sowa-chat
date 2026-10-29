import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import {
  createProjectsServiceProbe,
  issuedServerKey,
  projectRow,
} from "../../../test/support/projects-service-probe.js";
import type { ProjectsServiceProbe } from "../../../test/support/projects-service-probe.js";
import { mainProjectInput } from "../../../test/support/project-rows.js";
import { generateKey, parseKey } from "../keys/key-format.js";
import { InvalidOriginError } from "./origin.js";
import { ProjectsRepository } from "./projects.repository.js";
import { InvalidProjectNameError } from "./projects.service.js";

function expectNothingCreated(probe: ProjectsServiceProbe): void {
  expect(probe.create).not.toHaveBeenCalled();
  expect(probe.publish).not.toHaveBeenCalled();
  expect(probe.issue).not.toHaveBeenCalled();
}

describe("ProjectsService.createInitial", () => {
  let probe: ProjectsServiceProbe;

  beforeEach(async () => {
    probe = await createProjectsServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("берёт блокировку до findByName", async () => {
    await probe.service.createInitial(mainProjectInput());

    expect(probe.lockInitialProject).toHaveBeenCalledTimes(1);
    expect(probe.findByName).toHaveBeenCalledWith("main");
    const [lockOrder] = probe.lockInitialProject.mock.invocationCallOrder;
    const [findOrder] = probe.findByName.mock.invocationCallOrder;
    expect(lockOrder).toBeLessThan(findOrder ?? 0);
  });

  it("проекта нет — создаёт его как create и возвращает CreatedProject", async () => {
    const created = await probe.service.createInitial(mainProjectInput({ actorKind: "system" }));

    expect(created).toEqual({
      projectId: "project-1",
      name: "main",
      publicKey: expect.any(String),
      serverKey: issuedServerKey.key,
      serverKeyPrefix: issuedServerKey.prefix,
    });
    expect(parseKey(created?.publicKey ?? "", "publicKey")).toBeDefined();
    expect(probe.create).toHaveBeenCalledTimes(1);
    expect(probe.create).toHaveBeenCalledWith({
      name: "main",
      publicKey: created?.publicKey,
      allowedOrigins: ["https://shop.example.com"],
      operatorAllowedOrigins: [],
    });
    expect(probe.publish).toHaveBeenCalledTimes(1);
    expect(probe.publish).toHaveBeenCalledWith("project.created", {
      projectId: "project-1",
      name: "main",
      actorKind: "system",
    });
    expect(probe.issue).toHaveBeenCalledTimes(1);
    expect(probe.issue).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: "project-1", kind: "server", actorKind: "system" }),
    );
  });

  it("проект с таким именем есть — undefined, ничего не создаёт и не публикует", async () => {
    probe.findByName.mockResolvedValue(projectRow({ name: "main" }));

    const created = await probe.service.createInitial(mainProjectInput());

    expect(created).toBeUndefined();
    expect(probe.lockInitialProject).toHaveBeenCalledTimes(1);
    expectNothingCreated(probe);
  });

  it("serverKey из входа передаётся в issue как key", async () => {
    const serverKey = generateKey("serverKey");

    await probe.service.createInitial(mainProjectInput({ serverKey }));

    expect(probe.issue).toHaveBeenCalledWith({
      projectId: "project-1",
      kind: "server",
      actorKind: "cli",
      key: serverKey,
    });
  });

  it("без serverKey в issue не уходит готовый ключ", async () => {
    await probe.service.createInitial(mainProjectInput());

    const [issueInput] = probe.issue.mock.calls[0] as [{ key?: string }];
    expect(issueInput.key).toBeUndefined();
  });

  it("выполняется в транзакции", async () => {
    await probe.service.createInitial(mainProjectInput());

    expect(TransactionHost.getInstance).toHaveBeenCalled();
  });

  it.each([["Main"], ["-a"], [""], ["a".repeat(64)], ["a_b"]])(
    "имя %j — InvalidProjectNameError до блокировки, ничего не создано",
    async (name) => {
      await expect(probe.service.createInitial(mainProjectInput({ name }))).rejects.toThrow(
        InvalidProjectNameError,
      );

      expect(probe.lockInitialProject).not.toHaveBeenCalled();
      expect(probe.findByName).not.toHaveBeenCalled();
      expectNothingCreated(probe);
    },
  );

  it("имя из 63 символов допустимо", async () => {
    const name = "a".repeat(63);

    const created = await probe.service.createInitial(mainProjectInput({ name }));

    expect(created?.name).toBe(name);
    expect(probe.findByName).toHaveBeenCalledWith(name);
  });

  it("неверный origin — InvalidOriginError до блокировки, ничего не создано", async () => {
    await expect(
      probe.service.createInitial(mainProjectInput({ operatorAllowedOrigins: ["example.com"] })),
    ).rejects.toThrow(InvalidOriginError);

    expect(probe.lockInitialProject).not.toHaveBeenCalled();
    expectNothingCreated(probe);
  });

  it("блокировка упала — ошибка наружу, findByName не вызывается", async () => {
    probe.lockInitialProject.mockRejectedValue(new Error("lock failed"));

    await expect(probe.service.createInitial(mainProjectInput())).rejects.toThrow("lock failed");

    expect(probe.findByName).not.toHaveBeenCalled();
    expectNothingCreated(probe);
  });
});

describe("ProjectsService.create с serverKey", () => {
  let probe: ProjectsServiceProbe;

  beforeEach(async () => {
    probe = await createProjectsServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("serverKey из входа передаётся в issue как key", async () => {
    const serverKey = generateKey("serverKey");

    await probe.service.create(mainProjectInput({ serverKey }));

    expect(probe.issue).toHaveBeenCalledWith(expect.objectContaining({ key: serverKey }));
  });

  it("create не берёт блокировку начального проекта", async () => {
    await probe.service.create(mainProjectInput());

    expect(probe.lockInitialProject).not.toHaveBeenCalled();
  });
});

describe("ProjectsRepository.lockInitialProject", () => {
  it("берёт pg_advisory_xact_lock по имени sowa-chat:initial-project", async () => {
    const query = vi.fn().mockResolvedValue([]);
    const txHost = { tx: { query } } as unknown as TransactionHost<TransactionalAdapterTypeOrm>;
    const repository = new ProjectsRepository(txHost);

    await repository.lockInitialProject();

    expect(query).toHaveBeenCalledTimes(1);
    const [sql, parameters] = query.mock.calls[0] as [string, unknown[]];
    expect(sql).toMatch(/SELECT\s+pg_advisory_xact_lock\(\s*hashtext\(\s*\$1\s*\)\s*\)/i);
    expect(parameters).toEqual(["sowa-chat:initial-project"]);
  });
});
