import type { ConfigType } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import {
  allTestSecrets,
  createSecretsDirectory,
  listSecretsDirectory,
  readSecretsFile,
  removeSecretsDirectory,
  stubDevelopmentEnv,
} from "../../../test/support/development-secrets-env.js";
import { developmentSecretsConfig } from "./development-secrets.config.js";
import { encryptionConfig } from "./encryption.config.js";
import { tokenSigningConfig } from "./token-signing.config.js";

async function compileConfigModule(): Promise<TestingModule> {
  vi.resetModules();
  const { AppConfigModule } = await import("./config.module.js");
  return Test.createTestingModule({ imports: [AppConfigModule] }).compile();
}

describe("AppConfigModule с секретами development", () => {
  let directory: string;
  let moduleRef: TestingModule | undefined;

  beforeEach(() => {
    directory = createSecretsDirectory();
  });

  afterEach(async () => {
    await moduleRef?.close();
    moduleRef = undefined;
    vi.unstubAllEnvs();
    removeSecretsDirectory(directory);
  });

  async function compileInDevelopment(
    overrides: Record<string, string> = {},
  ): Promise<TestingModule> {
    stubDevelopmentEnv(directory, overrides);
    moduleRef = await compileConfigModule();
    return moduleRef;
  }

  it("без ключей отдаёт сгенерированный ключ шифрования версии 1", async () => {
    const configModule = await compileInDevelopment();

    const encryption = configModule.get<ConfigType<typeof encryptionConfig>>(encryptionConfig.KEY);

    expect(encryption.keys.map((key) => key.version)).toEqual([1]);
    expect(encryption.keys[0]?.key).toHaveLength(32);
  });

  it("без ключей отдаёт ключ подписи с kid dev-1", async () => {
    const configModule = await compileInDevelopment();

    const tokenSigning = configModule.get<ConfigType<typeof tokenSigningConfig>>(
      tokenSigningConfig.KEY,
    );

    expect(tokenSigning.currentKeyId).toBe("dev-1");
    expect(tokenSigning.keys.map((key) => key.kid)).toEqual(["dev-1"]);
  });

  it("отдаёт папку секретов из SOWA_DEV_SECRETS_DIR", async () => {
    const configModule = await compileInDevelopment();

    const developmentSecrets = configModule.get<ConfigType<typeof developmentSecretsConfig>>(
      developmentSecretsConfig.KEY,
    );

    expect(developmentSecrets).toEqual({ directory });
    expect(listSecretsDirectory(directory)).toEqual(["secrets.json"]);
  });

  it("на втором старте отдаёт тот же ключ шифрования из файла", async () => {
    const first = await compileInDevelopment();
    const firstKeys = first.get<ConfigType<typeof encryptionConfig>>(encryptionConfig.KEY).keys;
    await first.close();
    moduleRef = undefined;
    vi.unstubAllEnvs();

    const second = await compileInDevelopment();
    const secondKeys = second.get<ConfigType<typeof encryptionConfig>>(encryptionConfig.KEY).keys;

    expect(secondKeys[0]?.key).toEqual(firstKeys[0]?.key);
    expect(readSecretsFile(directory).env.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
  });

  it("с ключами в env не создаёт файл и отдаёт ключи из env", async () => {
    const configModule = await compileInDevelopment(allTestSecrets);

    const tokenSigning = configModule.get<ConfigType<typeof tokenSigningConfig>>(
      tokenSigningConfig.KEY,
    );

    expect(tokenSigning.currentKeyId).toBe(allTestSecrets.SOWA_TOKEN_SIGNING_KEY_ID);
    expect(listSecretsDirectory(directory)).toEqual([]);
  });
});
