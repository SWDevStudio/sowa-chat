import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import {
  createSecretsDirectory,
  fileSecrets,
  removeSecretsDirectory,
  writeBrokenSecretsFile,
} from "../../../test/support/development-secrets-env.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { writeDevelopmentSecrets } from "./development-secrets-file.js";

type Loaded = Awaited<ReturnType<typeof loadConfiguration>>;

async function loadConfiguration() {
  vi.resetModules();
  const { startupSummaryConfig, summarizedSecrets } = await import("./startup-summary.config.js");
  return { configuration: startupSummaryConfig(), summarizedSecrets };
}

function statusOf(loaded: Loaded, name: string): string | undefined {
  return loaded.configuration.secrets.find((secret) => secret.name === name)?.status;
}

describe("startupSummaryConfig", () => {
  let directory: string;

  beforeEach(() => {
    directory = createSecretsDirectory();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    removeSecretsDirectory(directory);
  });

  it("перечисляет в summarizedSecrets три секрета по порядку", async () => {
    stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });

    const { summarizedSecrets } = await loadConfiguration();

    expect(summarizedSecrets).toEqual([
      "SOWA_ENCRYPTION_KEYS",
      "SOWA_TOKEN_SIGNING_KEYS",
      "SOWA_INIT_SERVER_KEY",
    ]);
  });

  it("отдаёт SOWA_ENV и секреты в порядке summarizedSecrets", async () => {
    stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });

    const { configuration } = await loadConfiguration();

    expect(configuration.env).toBe("development");
    expect(configuration.secrets.map((secret) => secret.name)).toEqual([
      "SOWA_ENCRYPTION_KEYS",
      "SOWA_TOKEN_SIGNING_KEYS",
      "SOWA_INIT_SERVER_KEY",
    ]);
  });

  it("даёт set для заданной переменной и notSet для незаданной", async () => {
    stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });
    vi.stubEnv("SOWA_INIT_SERVER_KEY", undefined);

    const loaded = await loadConfiguration();

    expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("set");
    expect(statusOf(loaded, "SOWA_TOKEN_SIGNING_KEYS")).toBe("set");
    expect(statusOf(loaded, "SOWA_INIT_SERVER_KEY")).toBe("notSet");
  });

  it("даёт notSet для пустой строки", async () => {
    stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory, SOWA_INIT_SERVER_KEY: "" });

    const loaded = await loadConfiguration();

    expect(statusOf(loaded, "SOWA_INIT_SERVER_KEY")).toBe("notSet");
  });

  it("даёт notSet для пустого ключа шифрования в development", async () => {
    stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory, SOWA_ENCRYPTION_KEYS: "" });

    const loaded = await loadConfiguration();

    expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("notSet");
  });

  describe("development с файлом секретов", () => {
    beforeEach(() => {
      writeDevelopmentSecrets(directory, { env: fileSecrets });
    });

    it("даёт generatedForDevelopment для значения, равного значению в файле", async () => {
      stubTestEnv({
        SOWA_DEV_SECRETS_DIR: directory,
        SOWA_ENCRYPTION_KEYS: fileSecrets.SOWA_ENCRYPTION_KEYS ?? "",
      });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("generatedForDevelopment");
    });

    it("даёт set для значения, которое отличается от значения в файле", async () => {
      stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("set");
      expect(statusOf(loaded, "SOWA_TOKEN_SIGNING_KEYS")).toBe("set");
    });

    it("даёт generatedForDevelopment каждому секрету, совпавшему с файлом", async () => {
      stubTestEnv({
        SOWA_DEV_SECRETS_DIR: directory,
        SOWA_ENCRYPTION_KEYS: fileSecrets.SOWA_ENCRYPTION_KEYS ?? "",
        SOWA_TOKEN_SIGNING_KEYS: fileSecrets.SOWA_TOKEN_SIGNING_KEYS ?? "",
        SOWA_TOKEN_SIGNING_KEY_ID: fileSecrets.SOWA_TOKEN_SIGNING_KEY_ID ?? "",
      });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("generatedForDevelopment");
      expect(statusOf(loaded, "SOWA_TOKEN_SIGNING_KEYS")).toBe("generatedForDevelopment");
    });
  });

  describe("development без файла секретов", () => {
    it("даёт set для заданного значения", async () => {
      stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("set");
    });
  });

  describe("production", () => {
    beforeEach(() => {
      writeDevelopmentSecrets(directory, { env: fileSecrets });
    });

    it("даёт set для значения, равного значению в файле секретов", async () => {
      stubTestEnv({
        SOWA_ENV: "production",
        SOWA_DEV_SECRETS_DIR: directory,
        SOWA_ENCRYPTION_KEYS: fileSecrets.SOWA_ENCRYPTION_KEYS ?? "",
      });

      const loaded = await loadConfiguration();

      expect(loaded.configuration.env).toBe("production");
      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("set");
    });

    it("не читает файл секретов: повреждённый файл не мешает", async () => {
      writeBrokenSecretsFile(directory);
      stubTestEnv({ SOWA_ENV: "production", SOWA_DEV_SECRETS_DIR: directory });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_ENCRYPTION_KEYS")).toBe("set");
    });

    it("даёт notSet для пустого SOWA_INIT_SERVER_KEY", async () => {
      stubTestEnv({
        SOWA_ENV: "production",
        SOWA_DEV_SECRETS_DIR: directory,
        SOWA_INIT_SERVER_KEY: "",
      });

      const loaded = await loadConfiguration();

      expect(statusOf(loaded, "SOWA_INIT_SERVER_KEY")).toBe("notSet");
    });
  });

  describe("AppConfigModule", () => {
    let moduleRef: TestingModule | undefined;

    afterEach(async () => {
      await moduleRef?.close();
      moduleRef = undefined;
    });

    it("регистрирует startupSummaryConfig в load", async () => {
      stubTestEnv({ SOWA_DEV_SECRETS_DIR: directory });
      vi.resetModules();
      const { AppConfigModule } = await import("./config.module.js");
      const { startupSummaryConfig } = await import("./startup-summary.config.js");

      moduleRef = await Test.createTestingModule({ imports: [AppConfigModule] }).compile();

      const configuration = moduleRef.get<ReturnType<typeof startupSummaryConfig>>(
        startupSummaryConfig.KEY,
      );
      expect(configuration.env).toBe("development");
      expect(configuration.secrets).toHaveLength(3);
    });
  });
});
