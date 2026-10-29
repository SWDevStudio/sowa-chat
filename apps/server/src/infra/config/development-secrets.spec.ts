import type { MockInstance } from "vitest";
import {
  allTestSecrets,
  createSecretsDirectory,
  developmentSource,
  fileMainProject,
  fileSecrets,
  listSecretsDirectory,
  readSecretsFile,
  readSecretsFileText,
  removeSecretsDirectory,
  stubDevelopmentEnv,
  testEncryptionKeys,
  testTokenSigningKeyId,
  testTokenSigningKeys,
  thrownMessage,
  writeBrokenSecretsFile,
  writeCompactSecretsFile,
} from "../../../test/support/development-secrets-env.js";
import { EncryptionService } from "../crypto/encryption.service.js";
import {
  defaultDevelopmentSecretsDirectory,
  InvalidDevelopmentSecretsError,
  readDevelopmentSecrets,
} from "./development-secrets-file.js";
import { provideDevelopmentSecrets } from "./development-secrets.js";
import { loadEnv } from "./load-env.js";

vi.mock("./development-secrets-file.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./development-secrets-file.js")>();
  return { ...actual, readDevelopmentSecrets: vi.fn(actual.readDevelopmentSecrets) };
});

let directory: string;

beforeEach(() => {
  directory = createSecretsDirectory();
});

afterEach(() => {
  vi.unstubAllEnvs();
  removeSecretsDirectory(directory);
});

describe("provideDevelopmentSecrets без недостающих секретов", () => {
  it("в production ничего не отдаёт и не создаёт файл", () => {
    const secrets = provideDevelopmentSecrets(
      developmentSource(directory, { SOWA_ENV: "production" }),
    );

    expect(secrets).toEqual({});
    expect(listSecretsDirectory(directory)).toEqual([]);
  });

  it("без SOWA_ENV считает режим production", () => {
    const secrets = provideDevelopmentSecrets(
      developmentSource(directory, { SOWA_ENV: undefined }),
    );

    expect(secrets).toEqual({});
    expect(listSecretsDirectory(directory)).toEqual([]);
  });

  it("в production не читает испорченный файл", () => {
    writeBrokenSecretsFile(directory);
    const source = developmentSource(directory, { SOWA_ENV: "production" });

    expect(provideDevelopmentSecrets(source)).toEqual({});
  });

  it("при всех заданных секретах не читает и не создаёт файл", () => {
    const secrets = provideDevelopmentSecrets(developmentSource(directory, allTestSecrets));

    expect(secrets).toEqual({});
    expect(listSecretsDirectory(directory)).toEqual([]);
  });

  it("при всех заданных секретах не читает испорченный файл", () => {
    writeBrokenSecretsFile(directory);

    expect(provideDevelopmentSecrets(developmentSource(directory, allTestSecrets))).toEqual({});
  });

  it("не трогает частично заданную запись реестра", () => {
    const source = developmentSource(directory, {
      SOWA_ENCRYPTION_KEYS: testEncryptionKeys,
      SOWA_TOKEN_SIGNING_KEYS: testTokenSigningKeys,
      SOWA_TOKEN_SIGNING_KEY_ID: "",
    });

    expect(provideDevelopmentSecrets(source)).toEqual({});
    expect(listSecretsDirectory(directory)).toEqual([]);
  });
});

describe("provideDevelopmentSecrets с недостающими секретами", () => {
  it("без файла генерирует все записи и создаёт файл", () => {
    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(Object.keys(secrets).sort()).toEqual(Object.keys(allTestSecrets).sort());
    expect(secrets.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(secrets.SOWA_TOKEN_SIGNING_KEYS).toMatch(/^dev-1:/);
    expect(secrets.SOWA_ENCRYPTION_KEYS).toMatch(/^1:/);
    expect(readSecretsFile(directory).env).toEqual(secrets);
  });

  it("отдаёт только переменные недостающих записей", () => {
    const secrets = provideDevelopmentSecrets(
      developmentSource(directory, { SOWA_TOKEN_SIGNING_KEY_ID: testTokenSigningKeyId }),
    );

    expect(Object.keys(secrets)).toEqual(["SOWA_ENCRYPTION_KEYS"]);
  });

  it("берёт значения из файла и не перезаписывает его", () => {
    const text = writeCompactSecretsFile(directory, {
      env: fileSecrets,
      mainProject: fileMainProject,
    });

    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(secrets).toEqual(fileSecrets);
    expect(readSecretsFileText(directory)).toBe(text);
  });

  it("значение из env важнее файла", () => {
    const text = writeCompactSecretsFile(directory, { env: fileSecrets });
    const source = developmentSource(directory, { SOWA_ENCRYPTION_KEYS: testEncryptionKeys });

    const secrets = provideDevelopmentSecrets(source);

    expect(secrets).toEqual({
      SOWA_TOKEN_SIGNING_KEYS: fileSecrets.SOWA_TOKEN_SIGNING_KEYS,
      SOWA_TOKEN_SIGNING_KEY_ID: fileSecrets.SOWA_TOKEN_SIGNING_KEY_ID,
    });
    expect(readSecretsFileText(directory)).toBe(text);
  });

  it("дописывает в файл недостающую запись и сохраняет mainProject", () => {
    const encryptionOnly = { SOWA_ENCRYPTION_KEYS: fileSecrets.SOWA_ENCRYPTION_KEYS };
    writeCompactSecretsFile(directory, { env: encryptionOnly, mainProject: fileMainProject });

    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(secrets.SOWA_ENCRYPTION_KEYS).toBe(fileSecrets.SOWA_ENCRYPTION_KEYS);
    expect(secrets.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(readSecretsFile(directory)).toEqual({ env: secrets, mainProject: fileMainProject });
  });

  it("генерирует запись заново, если в файле есть не все её переменные", () => {
    writeCompactSecretsFile(directory, {
      env: { SOWA_TOKEN_SIGNING_KEYS: fileSecrets.SOWA_TOKEN_SIGNING_KEYS },
    });

    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(secrets.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(secrets.SOWA_TOKEN_SIGNING_KEYS).toMatch(/^dev-1:/);
    expect(secrets.SOWA_TOKEN_SIGNING_KEYS).not.toBe(fileSecrets.SOWA_TOKEN_SIGNING_KEYS);
    expect(readSecretsFile(directory).env).toEqual(secrets);
  });

  it("берёт значения из файла, который создал другой процесс", () => {
    const text = writeCompactSecretsFile(directory, { env: fileSecrets });
    vi.mocked(readDevelopmentSecrets).mockReturnValueOnce(undefined);

    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(secrets).toEqual(fileSecrets);
    expect(readSecretsFileText(directory)).toBe(text);
  });

  it("берёт значения из файла после записи, если другой процесс дописал запись раньше", () => {
    const encryptionOnly = { SOWA_ENCRYPTION_KEYS: fileSecrets.SOWA_ENCRYPTION_KEYS };
    vi.mocked(readDevelopmentSecrets)
      .mockReturnValueOnce({ env: encryptionOnly })
      .mockReturnValueOnce({ env: fileSecrets });

    const secrets = provideDevelopmentSecrets(developmentSource(directory));

    expect(secrets).toEqual(fileSecrets);
  });

  it("не скрывает испорченный файл", () => {
    writeBrokenSecretsFile(directory);

    expect(() => provideDevelopmentSecrets(developmentSource(directory))).toThrow(
      InvalidDevelopmentSecretsError,
    );
  });
});

describe("loadEnv", () => {
  function loadFromProcessEnv(): ReturnType<typeof loadEnv> {
    return loadEnv({ ...process.env });
  }

  it("второй старт в development получает те же секреты из файла", () => {
    stubDevelopmentEnv(directory);
    const first = loadFromProcessEnv();
    const fileEnv = readSecretsFile(directory).env;
    const processEnvAfterFirst = {
      SOWA_ENCRYPTION_KEYS: process.env.SOWA_ENCRYPTION_KEYS,
      SOWA_TOKEN_SIGNING_KEYS: process.env.SOWA_TOKEN_SIGNING_KEYS,
      SOWA_TOKEN_SIGNING_KEY_ID: process.env.SOWA_TOKEN_SIGNING_KEY_ID,
    };
    stubDevelopmentEnv(directory);
    const second = loadFromProcessEnv();

    const encrypted = new EncryptionService({ keys: first.SOWA_ENCRYPTION_KEYS ?? [] }).encrypt(
      "secret text",
    );
    const decrypted = new EncryptionService({ keys: second.SOWA_ENCRYPTION_KEYS ?? [] }).decrypt(
      encrypted,
    );

    expect(processEnvAfterFirst).toEqual(fileEnv);
    expect(decrypted).toBe("secret text");
    expect(first.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(second.SOWA_TOKEN_SIGNING_KEY_ID).toBe("dev-1");
    expect(second.SOWA_TOKEN_SIGNING_KEYS?.map((key) => key.kid)).toEqual(["dev-1"]);
  });

  it("оставляет SOWA_ENCRYPTION_KEYS из env и не пишет его в файл", () => {
    stubDevelopmentEnv(directory, { SOWA_ENCRYPTION_KEYS: testEncryptionKeys });

    const env = loadFromProcessEnv();

    expect(process.env.SOWA_ENCRYPTION_KEYS).toBe(testEncryptionKeys);
    expect(env.SOWA_ENCRYPTION_KEYS?.[0]?.key).toEqual(
      Buffer.from(testEncryptionKeys.slice(2), "base64"),
    );
    expect(Object.keys(readSecretsFile(directory).env)).not.toContain("SOWA_ENCRYPTION_KEYS");
  });

  it("при всех секретах в env не создаёт файл", () => {
    stubDevelopmentEnv(directory, allTestSecrets);

    const env = loadFromProcessEnv();

    expect(env.SOWA_TOKEN_SIGNING_KEY_ID).toBe(testTokenSigningKeyId);
    expect(listSecretsDirectory(directory)).toEqual([]);
  });

  it("в production без SOWA_ENCRYPTION_KEYS бросает ошибку и не трогает папку", () => {
    stubDevelopmentEnv(directory, {
      SOWA_ENV: "production",
      SOWA_TOKEN_SIGNING_KEYS: testTokenSigningKeys,
      SOWA_TOKEN_SIGNING_KEY_ID: testTokenSigningKeyId,
    });

    expect(loadFromProcessEnv).toThrow(/SOWA_ENCRYPTION_KEYS/);
    expect(listSecretsDirectory(directory)).toEqual([]);
  });

  it("ошибка частично заданной записи называет переменную без значения ключа", () => {
    stubDevelopmentEnv(directory, { SOWA_TOKEN_SIGNING_KEYS: testTokenSigningKeys });

    const message = thrownMessage(loadFromProcessEnv);

    expect(message).toMatch(/SOWA_TOKEN_SIGNING_KEY_ID/);
    expect(message).not.toContain(testTokenSigningKeys.split(":")[1]);
  });

  it("переносит в process.env строки из файла .env, которых там нет", () => {
    stubDevelopmentEnv(directory, { ...allTestSecrets, SOWA_LOG_LEVEL: undefined });
    const databaseUrl = process.env.DATABASE_URL;

    loadEnv({
      ...process.env,
      SOWA_LOG_LEVEL: "debug",
      DATABASE_URL: "postgres://other:other@127.0.0.1:5432/other",
    });

    expect(process.env.SOWA_LOG_LEVEL).toBe("debug");
    expect(process.env.DATABASE_URL).toBe(databaseUrl);
  });

  it("отдаёт SOWA_DEV_SECRETS_DIR из env", () => {
    stubDevelopmentEnv(directory, allTestSecrets);

    expect(loadFromProcessEnv().SOWA_DEV_SECRETS_DIR).toBe(directory);
  });

  it("при пустом SOWA_DEV_SECRETS_DIR отдаёт папку по умолчанию", () => {
    stubDevelopmentEnv(directory, { ...allTestSecrets, SOWA_DEV_SECRETS_DIR: "" });

    expect(loadFromProcessEnv().SOWA_DEV_SECRETS_DIR).toBe(defaultDevelopmentSecretsDirectory);
  });

  it("не печатает сгенерированные секреты", () => {
    const stdout: MockInstance<typeof process.stdout.write> = vi.spyOn(process.stdout, "write");
    const stderr: MockInstance<typeof process.stderr.write> = vi.spyOn(process.stderr, "write");
    stubDevelopmentEnv(directory);

    loadFromProcessEnv();
    const printed = [...stdout.mock.calls, ...stderr.mock.calls].map(([chunk]) => String(chunk));
    stdout.mockRestore();
    stderr.mockRestore();

    const fileEnv = readSecretsFile(directory).env;
    for (const value of [fileEnv.SOWA_ENCRYPTION_KEYS, fileEnv.SOWA_TOKEN_SIGNING_KEYS]) {
      expect(printed.join("")).not.toContain(value);
    }
  });
});
