import { Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import type { Mock, MockInstance } from "vitest";
import { appConfig } from "../../infra/config/app.config.js";
import { developmentSecretsConfig } from "../../infra/config/development-secrets.config.js";
import { initialProjectConfig } from "../../infra/config/initial-project.config.js";
import {
  createSecretsDirectory,
  removeSecretsDirectory,
} from "../../../test/support/development-secrets-env.js";
import { projectRow } from "../../../test/support/projects-service-probe.js";
import type { ApiKeySummary } from "../keys/api-keys.service.js";
import { ApiKeysService } from "../keys/api-keys.service.js";
import { generateKey, toLookupPrefix } from "../keys/key-format.js";
import type { CreatedProject } from "../projects/projects.service.js";
import { ProjectsService } from "../projects/projects.service.js";
import { InitialProjectService } from "./initial-project.service.js";

type InitialProjectSettings = ConfigType<typeof initialProjectConfig>;

const serverKey = generateKey("serverKey");
const otherServerKey = generateKey("serverKey");
const createdLine = "Initial project shop created from SOWA_INIT_PROJECT";
const mismatchWarning = "SOWA_INIT_SERVER_KEY does not match any active serverKey of project shop";
const missingKeyError = "SOWA_INIT_SERVER_KEY is required when SOWA_INIT_PROJECT is set";
const invalidKeyError =
  "SOWA_INIT_SERVER_KEY must be a serverKey (sk_...) with a valid checksum: generate one with sowa-chat key:generate";
const anyKeyPattern = /(pk|sk)_[0-9A-Za-z]{43}_[0-9A-Za-z]{6}/;

const createdProject: CreatedProject = {
  projectId: "project-shop",
  name: "shop",
  publicKey: generateKey("publicKey"),
  serverKey,
  serverKeyPrefix: toLookupPrefix(serverKey),
};

const existingProject = projectRow({ id: "project-shop", name: "shop" });

function withBrokenChecksum(key: string): string {
  const last = key.at(-1) === "A" ? "B" : "A";
  return `${key.slice(0, -1)}${last}`;
}

function keySummary(key: string, revokedAt: Date | null = null): ApiKeySummary {
  return {
    prefix: toLookupPrefix(key),
    createdAt: new Date("2026-01-01T00:00:00Z"),
    lastUsedAt: null,
    revokedAt,
  };
}

function shopSettings(overrides: Partial<InitialProjectSettings> = {}): InitialProjectSettings {
  return {
    projectName: "shop",
    serverKey,
    allowedOrigins: ["https://shop.example.com"],
    operatorAllowedOrigins: ["https://admin.example.com"],
    ...overrides,
  };
}

describe("InitialProjectService.setUp в production", () => {
  let directory: string;
  let createInitial: Mock;
  let getByName: Mock;
  let list: Mock;
  let log: MockInstance;
  let warn: MockInstance;

  async function createService(
    initialProject: InitialProjectSettings,
    env: "development" | "production" = "production",
  ): Promise<InitialProjectService> {
    const app: ConfigType<typeof appConfig> = { env, nodeEnv: "test" };
    const developmentSecrets: ConfigType<typeof developmentSecretsConfig> = { directory };
    const moduleRef = await Test.createTestingModule({
      providers: [
        InitialProjectService,
        { provide: appConfig.KEY, useValue: app },
        { provide: initialProjectConfig.KEY, useValue: initialProject },
        { provide: developmentSecretsConfig.KEY, useValue: developmentSecrets },
        { provide: ProjectsService, useValue: { createInitial, getByName } },
        { provide: ApiKeysService, useValue: { list } },
      ],
    }).compile();
    log.mockClear();
    warn.mockClear();
    return moduleRef.get(InitialProjectService);
  }

  function printedText(): string {
    return JSON.stringify([...log.mock.calls, ...warn.mock.calls]);
  }

  beforeEach(() => {
    directory = createSecretsDirectory();
    createInitial = vi.fn().mockResolvedValue(createdProject);
    getByName = vi.fn().mockResolvedValue(existingProject);
    list = vi.fn().mockResolvedValue([keySummary(serverKey)]);
    log = vi.spyOn(Logger.prototype, "log").mockImplementation(() => undefined);
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    removeSecretsDirectory(directory);
  });

  describe("SOWA_INIT_PROJECT не задан", () => {
    it("ничего не делает", async () => {
      const service = await createService(
        shopSettings({ projectName: undefined, serverKey: undefined }),
      );

      await service.setUp();

      expect(createInitial).not.toHaveBeenCalled();
      expect(getByName).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
      expect(log).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    });

    it("не проверяет SOWA_INIT_SERVER_KEY без SOWA_INIT_PROJECT", async () => {
      const service = await createService(
        shopSettings({ projectName: undefined, serverKey: "sk_not_a_key" }),
      );

      await expect(service.setUp()).resolves.toBeUndefined();
      expect(createInitial).not.toHaveBeenCalled();
    });
  });

  describe("проверка SOWA_INIT_SERVER_KEY", () => {
    it("ключа нет — ошибка про обязательный ключ, проект не создаётся", async () => {
      const service = await createService(shopSettings({ serverKey: undefined }));

      await expect(service.setUp()).rejects.toThrow(missingKeyError);
      expect(createInitial).not.toHaveBeenCalled();
    });

    it.each([
      { case: "испорченная контрольная сумма", key: withBrokenChecksum(serverKey) },
      { case: "publicKey вместо serverKey", key: generateKey("publicKey") },
      { case: "botKey вместо serverKey", key: generateKey("botKey") },
      { case: "ключ короче на символ", key: serverKey.slice(0, -1) },
      { case: "не ключ", key: "sk_not_a_key" },
    ])("$case — ошибка без текста ключа, проект не создаётся", async ({ key }) => {
      const service = await createService(shopSettings({ serverKey: key }));

      const error: unknown = await service.setUp().then(
        () => undefined,
        (reason: unknown) => reason,
      );

      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(invalidKeyError);
      expect((error as Error).message).not.toContain(key);
      expect(createInitial).not.toHaveBeenCalled();
      expect(getByName).not.toHaveBeenCalled();
      expect(printedText()).not.toContain(key);
    });

    it("неверный ключ отклоняется и тогда, когда проект уже есть", async () => {
      createInitial.mockResolvedValue(undefined);
      const service = await createService(
        shopSettings({ serverKey: withBrokenChecksum(serverKey) }),
      );

      await expect(service.setUp()).rejects.toThrow(invalidKeyError);
      expect(list).not.toHaveBeenCalled();
    });
  });

  describe("проекта ещё нет", () => {
    it("создаёт проект из SOWA_INIT_* с переданным ключом от имени system", async () => {
      const service = await createService(shopSettings());

      await service.setUp();

      expect(createInitial).toHaveBeenCalledTimes(1);
      expect(createInitial).toHaveBeenCalledWith({
        name: "shop",
        allowedOrigins: ["https://shop.example.com"],
        operatorAllowedOrigins: ["https://admin.example.com"],
        serverKey,
        actorKind: "system",
      });
      expect(getByName).not.toHaveBeenCalled();
      expect(list).not.toHaveBeenCalled();
    });

    it("передаёт пустые списки доменов как есть", async () => {
      const service = await createService(
        shopSettings({ allowedOrigins: [], operatorAllowedOrigins: [] }),
      );

      await service.setUp();

      expect(createInitial).toHaveBeenCalledWith(
        expect.objectContaining({ allowedOrigins: [], operatorAllowedOrigins: [] }),
      );
    });

    it("пишет одну строку о создании без pk_ и sk_", async () => {
      const service = await createService(shopSettings());

      await service.setUp();

      expect(log.mock.calls).toEqual([[createdLine]]);
      expect(warn).not.toHaveBeenCalled();
      expect(printedText()).not.toMatch(anyKeyPattern);
      expect(printedText()).not.toContain(createdProject.publicKey);
      expect(printedText()).not.toContain(createdProject.serverKeyPrefix);
    });
  });

  describe("проект уже был", () => {
    beforeEach(() => {
      createInitial.mockResolvedValue(undefined);
    });

    it("ключ совпадает с активным serverKey — без предупреждений и строк о создании", async () => {
      const service = await createService(shopSettings());

      await service.setUp();

      expect(getByName).toHaveBeenCalledWith("shop");
      expect(list).toHaveBeenCalledWith("project-shop", "server");
      expect(log).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    });

    it("активный ключ совпадает среди нескольких — без предупреждения", async () => {
      list.mockResolvedValue([keySummary(otherServerKey), keySummary(serverKey)]);
      const service = await createService(shopSettings());

      await service.setUp();

      expect(warn).not.toHaveBeenCalled();
    });

    it.each([
      { case: "у проекта другой активный ключ", keys: () => [keySummary(otherServerKey)] },
      {
        case: "ключ с тем же префиксом отозван",
        keys: () => [keySummary(serverKey, new Date("2026-02-01T00:00:00Z"))],
      },
      { case: "у проекта нет ключей", keys: () => [] },
    ])("$case — предупреждение без ключа и префикса", async ({ keys }) => {
      list.mockResolvedValue(keys());
      const service = await createService(shopSettings());

      await service.setUp();

      expect(warn.mock.calls).toEqual([[mismatchWarning]]);
      expect(log).not.toHaveBeenCalled();
      expect(printedText()).not.toContain(serverKey);
      expect(printedText()).not.toContain(toLookupPrefix(serverKey));
      expect(printedText()).not.toMatch(anyKeyPattern);
    });
  });

  describe("development", () => {
    it("не читает SOWA_INIT_PROJECT и SOWA_INIT_SERVER_KEY и не смотрит ключи проекта", async () => {
      createInitial.mockResolvedValue(undefined);
      getByName.mockResolvedValue(projectRow({ publicKey: "pk_file" }));
      const service = await createService(
        shopSettings({ serverKey: withBrokenChecksum(serverKey) }),
        "development",
      );

      await expect(service.setUp()).resolves.toBeUndefined();

      expect(createInitial).toHaveBeenCalledWith(expect.objectContaining({ name: "main" }));
      expect(list).not.toHaveBeenCalled();
    });
  });
});
