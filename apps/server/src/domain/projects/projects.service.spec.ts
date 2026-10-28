import { TransactionHost } from "@nestjs-cls/transactional";
import {
  createProjectsServiceProbe,
  issuedServerKey,
  projectRow,
} from "../../../test/support/projects-service-probe.js";
import type { ProjectsServiceProbe } from "../../../test/support/projects-service-probe.js";
import { mainProjectInput } from "../../../test/support/project-rows.js";
import { parseKey } from "../keys/key-format.js";
import { InvalidOriginError } from "./origin.js";
import type { Project } from "./project.entity.js";
import {
  InvalidProjectNameError,
  ProjectAlreadyExistsError,
  ProjectNotFoundError,
} from "./projects.service.js";

function expectNothingCreated(probe: ProjectsServiceProbe): void {
  expect(probe.create).not.toHaveBeenCalled();
  expect(probe.publish).not.toHaveBeenCalled();
  expect(probe.issue).not.toHaveBeenCalled();
}

describe("ProjectsService", () => {
  let probe: ProjectsServiceProbe;

  beforeEach(async () => {
    probe = await createProjectsServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("create", () => {
    it("создаёт проект с pk_ и нормализованными origins, публикует событие и выпускает sk_", async () => {
      const created = await probe.service.create(mainProjectInput());

      expect(probe.findByName).toHaveBeenCalledWith("main");
      expect(probe.create).toHaveBeenCalledTimes(1);
      const [newProject] = probe.create.mock.calls[0] ?? [];
      expect(newProject).toEqual({
        name: "main",
        publicKey: created.publicKey,
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: [],
      });
      expect(parseKey(created.publicKey, "publicKey")).toBeDefined();
      expect(probe.publish).toHaveBeenCalledTimes(1);
      expect(probe.publish).toHaveBeenCalledWith("project.created", {
        projectId: "project-1",
        name: "main",
        actorKind: "cli",
      });
      expect(probe.issue).toHaveBeenCalledTimes(1);
      expect(probe.issue).toHaveBeenCalledWith({
        projectId: "project-1",
        kind: "server",
        actorKind: "cli",
      });
      expect(created).toEqual({
        projectId: "project-1",
        name: "main",
        publicKey: created.publicKey,
        serverKey: issuedServerKey.key,
        serverKeyPrefix: issuedServerKey.prefix,
      });
    });

    it("работает в транзакции", async () => {
      await probe.service.create(mainProjectInput());

      expect(TransactionHost.getInstance).toHaveBeenCalled();
    });

    it("передаёт actorKind system в событие и выпуск ключа", async () => {
      await probe.service.create(mainProjectInput({ actorKind: "system" }));

      expect(probe.publish).toHaveBeenCalledWith("project.created", {
        projectId: "project-1",
        name: "main",
        actorKind: "system",
      });
      expect(probe.issue).toHaveBeenCalledWith({
        projectId: "project-1",
        kind: "server",
        actorKind: "system",
      });
    });

    it("нормализует оба списка и убирает повторы", async () => {
      await probe.service.create(
        mainProjectInput({
          allowedOrigins: ["https://A.com/", "https://a.com", "http://b.com"],
          operatorAllowedOrigins: ["https://Ops.Example.com:443/", "https://ops.example.com"],
        }),
      );

      expect(probe.create).toHaveBeenCalledWith(
        expect.objectContaining({
          allowedOrigins: ["https://a.com", "http://b.com"],
          operatorAllowedOrigins: ["https://ops.example.com"],
        }),
      );
    });

    it("каждый проект получает свой publicKey", async () => {
      const first = await probe.service.create(mainProjectInput({ name: "first" }));
      const second = await probe.service.create(mainProjectInput({ name: "second" }));

      expect(first.publicKey).not.toBe(second.publicKey);
    });

    it("вызывает шаги по очереди: findByName, create, publish, issue", async () => {
      const steps: string[] = [];
      probe.findByName.mockImplementation(async () => {
        steps.push("findByName");
        return null;
      });
      probe.create.mockImplementation(async (input: Partial<Project>) => {
        steps.push("create");
        return projectRow(input);
      });
      probe.publish.mockImplementation(async () => {
        steps.push("publish");
      });
      probe.issue.mockImplementation(async () => {
        steps.push("issue");
        return issuedServerKey;
      });

      await probe.service.create(mainProjectInput());

      expect(steps).toEqual(["findByName", "create", "publish", "issue"]);
    });

    it("выпускает ключ только после того, как публикация завершилась", async () => {
      let finishPublish: () => void = () => {};
      probe.publish.mockReturnValue(
        new Promise<void>((resolve) => {
          finishPublish = resolve;
        }),
      );

      const pending = probe.service.create(mainProjectInput());
      await vi.waitFor(() => expect(probe.publish).toHaveBeenCalled());
      await Promise.resolve();
      expect(probe.issue).not.toHaveBeenCalled();
      finishPublish();

      await expect(pending).resolves.toMatchObject({ serverKey: issuedServerKey.key });
    });

    it("ошибка issue пробрасывается из create", async () => {
      const failure = new Error("issue failed");
      probe.issue.mockRejectedValue(failure);

      await expect(probe.service.create(mainProjectInput())).rejects.toBe(failure);
    });

    it.each([
      ["Main"],
      ["-a"],
      [""],
      ["a".repeat(64)],
      ["a_b"],
      ["a b"],
      ["a.b"],
      [" main"],
      ["main "],
      ["проект"],
    ])("имя %j — InvalidProjectNameError, ничего не создаётся", async (name) => {
      await expect(probe.service.create(mainProjectInput({ name }))).rejects.toThrow(
        InvalidProjectNameError,
      );

      expect(probe.findByName).not.toHaveBeenCalled();
      expectNothingCreated(probe);
    });

    it("текст ошибки имени", async () => {
      await expect(probe.service.create(mainProjectInput({ name: "Main" }))).rejects.toThrow(
        'Invalid project name "Main": use 1-63 lowercase letters, digits and "-", starting with a letter or digit',
      );
    });

    it.each([["a"], ["0"], ["a".repeat(63)], ["a-"], ["1-shop-2"], ["0a"]])(
      "имя %j допустимо",
      async (name) => {
        await expect(probe.service.create(mainProjectInput({ name }))).resolves.toMatchObject({
          name,
        });
      },
    );

    it("неверный origin сайта — InvalidOriginError, ничего не создаётся", async () => {
      await expect(
        probe.service.create(mainProjectInput({ allowedOrigins: ["https://a.com", "a.com"] })),
      ).rejects.toThrow(InvalidOriginError);

      expectNothingCreated(probe);
    });

    it("неверный origin оператора — InvalidOriginError, ничего не создаётся", async () => {
      await expect(
        probe.service.create(
          mainProjectInput({ operatorAllowedOrigins: ["https://ops.com/path"] }),
        ),
      ).rejects.toThrow(InvalidOriginError);

      expectNothingCreated(probe);
    });

    it("имя занято — ProjectAlreadyExistsError, ничего не создаётся", async () => {
      probe.findByName.mockResolvedValue(projectRow());

      await expect(probe.service.create(mainProjectInput())).rejects.toThrow(
        ProjectAlreadyExistsError,
      );
      await expect(probe.service.create(mainProjectInput())).rejects.toThrow(
        'Project "main" already exists',
      );

      expectNothingCreated(probe);
    });
  });

  describe("getByName", () => {
    it("возвращает найденный проект", async () => {
      const project = projectRow();
      probe.findByName.mockResolvedValue(project);

      await expect(probe.service.getByName("main")).resolves.toBe(project);
      expect(probe.findByName).toHaveBeenCalledWith("main");
    });

    it("нет проекта — ProjectNotFoundError с именем", async () => {
      await expect(probe.service.getByName("nope")).rejects.toThrow(ProjectNotFoundError);
      await expect(probe.service.getByName("nope")).rejects.toThrow('Project "nope" not found');
    });
  });

  describe("list", () => {
    it("возвращает проекты из findAll", async () => {
      const projects = [projectRow({ id: "p-1", name: "a" }), projectRow({ id: "p-2", name: "b" })];
      probe.findAll.mockResolvedValue(projects);

      await expect(probe.service.list()).resolves.toEqual(projects);
    });

    it("пустой список, если проектов нет", async () => {
      await expect(probe.service.list()).resolves.toEqual([]);
    });
  });

  describe("ошибки", () => {
    it("наследуют Error", () => {
      expect(new InvalidProjectNameError("x")).toBeInstanceOf(Error);
      expect(new ProjectAlreadyExistsError("x")).toBeInstanceOf(Error);
      expect(new ProjectNotFoundError("x")).toBeInstanceOf(Error);
    });
  });
});
