import { existsSync } from "node:fs";
import { Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import type { MockInstance } from "vitest";
import { appConfig } from "../../infra/config/app.config.js";
import { developmentSecretsConfig } from "../../infra/config/development-secrets.config.js";
import { developmentSecretsPath } from "../../infra/config/development-secrets-file.js";
import { initialProjectConfig } from "../../infra/config/initial-project.config.js";
import {
  createSecretsDirectory,
  fileMainProject,
  fileSecrets,
  listSecretsDirectory,
  readSecretsFile,
  readSecretsFileText,
  removeSecretsDirectory,
  writeCompactSecretsFile,
} from "../../../test/support/development-secrets-env.js";
import { projectRow } from "../../../test/support/projects-service-probe.js";
import type { ApiKeysService } from "../keys/api-keys.service.js";
import type { CreatedProject, ProjectsService } from "../projects/projects.service.js";
import {
  developmentAllowedOrigins,
  developmentOperatorAllowedOrigins,
  developmentProjectName,
  InitialProjectService,
} from "./initial-project.service.js";

const createdProject: CreatedProject = {
  projectId: "project-1",
  name: "main",
  publicKey: "pk_created",
  serverKey: "sk_created",
  serverKeyPrefix: "sk_created_prefix",
};

const existingProject = projectRow({ publicKey: "pk_file" });

describe("InitialProjectService.setUp", () => {
  let directory: string;
  let createInitial: ReturnType<typeof vi.fn>;
  let getByName: ReturnType<typeof vi.fn>;
  let log: MockInstance;
  let warn: MockInstance;

  function createService(
    options: {
      env?: "development" | "production";
      initialProject?: Partial<ConfigType<typeof initialProjectConfig>>;
    } = {},
  ): InitialProjectService {
    const app: ConfigType<typeof appConfig> = {
      env: options.env ?? "development",
      nodeEnv: "test",
    };
    const initialProject: ConfigType<typeof initialProjectConfig> = {
      projectName: undefined,
      serverKey: undefined,
      allowedOrigins: [],
      operatorAllowedOrigins: [],
      ...options.initialProject,
    };
    const developmentSecrets: ConfigType<typeof developmentSecretsConfig> = { directory };
    const projects = { createInitial, getByName } as unknown as ProjectsService;
    const apiKeys = {} as unknown as ApiKeysService;
    return new InitialProjectService(app, initialProject, developmentSecrets, projects, apiKeys);
  }

  function missingKeyWarning(publicKey: string): string {
    return (
      `Development project main: publicKey ${publicKey}, serverKey is not in ` +
      `${developmentSecretsPath(directory)}: create a new one with sowa-chat key:create --project main`
    );
  }

  beforeEach(() => {
    directory = createSecretsDirectory();
    createInitial = vi.fn().mockResolvedValue(createdProject);
    getByName = vi.fn().mockResolvedValue(existingProject);
    log = vi.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    removeSecretsDirectory(directory);
  });

  it("экспортирует имя и домены development", () => {
    expect(developmentProjectName).toBe("main");
    expect(developmentAllowedOrigins).toEqual(["http://localhost:5173"]);
    expect(developmentOperatorAllowedOrigins).toEqual(["http://localhost:5174"]);
  });

  describe("development, проект создан", () => {
    it("создаёт main с доменами localhost от имени system", async () => {
      await createService().setUp();

      expect(createInitial).toHaveBeenCalledTimes(1);
      expect(createInitial).toHaveBeenCalledWith({
        name: "main",
        allowedOrigins: ["http://localhost:5173"],
        operatorAllowedOrigins: ["http://localhost:5174"],
        actorKind: "system",
      });
      expect(getByName).not.toHaveBeenCalled();
    });

    it("берёт домены из SOWA_INIT_*_ORIGINS, если списки не пустые", async () => {
      await createService({
        initialProject: {
          allowedOrigins: ["https://shop.example.com"],
          operatorAllowedOrigins: ["https://admin.example.com"],
        },
      }).setUp();

      expect(createInitial).toHaveBeenCalledWith({
        name: "main",
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: ["https://admin.example.com"],
        actorKind: "system",
      });
    });

    it("списки доменов заменяются независимо друг от друга", async () => {
      await createService({
        initialProject: { allowedOrigins: ["https://shop.example.com"] },
      }).setUp();

      expect(createInitial).toHaveBeenCalledWith({
        name: "main",
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: ["http://localhost:5174"],
        actorKind: "system",
      });
    });

    it("не читает SOWA_INIT_PROJECT и SOWA_INIT_SERVER_KEY", async () => {
      await createService({
        initialProject: { projectName: "shop", serverKey: "sk_from_env" },
      }).setUp();

      expect(createInitial).toHaveBeenCalledTimes(1);
      const [input] = createInitial.mock.calls[0] ?? [];
      expect(input.name).toBe("main");
      expect(input).not.toHaveProperty("serverKey");
    });

    it("пишет ключи в mainProject, сохраняя секции env", async () => {
      writeCompactSecretsFile(directory, { env: fileSecrets });

      await createService().setUp();

      expect(readSecretsFile(directory)).toEqual({
        env: fileSecrets,
        mainProject: { publicKey: "pk_created", serverKey: "sk_created" },
      });
    });

    it("файла нет — создаёт его с пустым env и mainProject", async () => {
      await createService().setUp();

      expect(readSecretsFile(directory)).toEqual({
        env: {},
        mainProject: { publicKey: "pk_created", serverKey: "sk_created" },
      });
    });

    it("заменяет старый mainProject в файле новыми ключами", async () => {
      writeCompactSecretsFile(directory, { env: fileSecrets, mainProject: fileMainProject });

      await createService().setUp();

      expect(readSecretsFile(directory).mainProject).toEqual({
        publicKey: "pk_created",
        serverKey: "sk_created",
      });
    });

    it("печатает строку с ключами одним текстом сообщения", async () => {
      await createService().setUp();

      expect(log.mock.calls).toEqual([
        ["Development project main: publicKey pk_created, serverKey sk_created"],
      ]);
      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe("development, проект уже был", () => {
    beforeEach(() => {
      createInitial.mockResolvedValue(undefined);
    });

    it("ключи в файле совпадают — печатает ключи из файла и не трогает файл", async () => {
      const text = writeCompactSecretsFile(directory, {
        env: fileSecrets,
        mainProject: fileMainProject,
      });

      await createService().setUp();

      expect(getByName).toHaveBeenCalledWith("main");
      expect(log.mock.calls).toEqual([
        ["Development project main: publicKey pk_file, serverKey sk_file"],
      ]);
      expect(warn).not.toHaveBeenCalled();
      expect(readSecretsFileText(directory)).toBe(text);
    });

    it("файла нет — предупреждение без sk_, файл не создаётся", async () => {
      await createService().setUp();

      expect(warn.mock.calls).toEqual([[missingKeyWarning("pk_file")]]);
      expect(log).not.toHaveBeenCalled();
      expect(listSecretsDirectory(directory)).toEqual([]);
    });

    it("в файле другой publicKey — предупреждение, sk_ из файла не печатается, файл цел", async () => {
      getByName.mockResolvedValue(projectRow({ publicKey: "pk_recreated" }));
      const text = writeCompactSecretsFile(directory, {
        env: fileSecrets,
        mainProject: fileMainProject,
      });

      await createService().setUp();

      expect(warn.mock.calls).toEqual([[missingKeyWarning("pk_recreated")]]);
      expect(log).not.toHaveBeenCalled();
      expect(readSecretsFileText(directory)).toBe(text);
    });

    it("в файле нет mainProject — предупреждение, файл цел", async () => {
      writeCompactSecretsFile(directory, { env: fileSecrets });

      await createService().setUp();

      expect(warn.mock.calls).toEqual([[missingKeyWarning("pk_file")]]);
      expect(log).not.toHaveBeenCalled();
      expect(readSecretsFile(directory)).toEqual({ env: fileSecrets });
    });

    it("у проекта нет publicKey — в предупреждении «-», ключи из файла не печатаются", async () => {
      getByName.mockResolvedValue(projectRow({ publicKey: null }));
      writeCompactSecretsFile(directory, { env: {}, mainProject: fileMainProject });

      await createService().setUp();

      expect(warn.mock.calls).toEqual([[missingKeyWarning("-")]]);
      expect(log).not.toHaveBeenCalled();
    });
  });

  describe("production", () => {
    it("ничего не делает: ни проекта, ни файла, ни логов", async () => {
      await createService({ env: "production" }).setUp();

      expect(createInitial).not.toHaveBeenCalled();
      expect(getByName).not.toHaveBeenCalled();
      expect(log).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
      expect(existsSync(developmentSecretsPath(directory))).toBe(false);
    });

    it("не печатает ключи из файла секретов", async () => {
      writeCompactSecretsFile(directory, { env: {}, mainProject: fileMainProject });

      await createService({ env: "production" }).setUp();

      expect(log).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
