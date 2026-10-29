import {
  chmodSync,
  existsSync,
  linkSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  createDevelopmentSecrets,
  defaultDevelopmentSecretsDirectory,
  developmentSecretsFileName,
  developmentSecretsPath,
  InvalidDevelopmentSecretsError,
  readDevelopmentSecrets,
  writeDevelopmentSecrets,
} from "./development-secrets-file.js";
import type { DevelopmentSecrets } from "./development-secrets-file.js";

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return {
    ...actual,
    linkSync: vi.fn(actual.linkSync),
    renameSync: vi.fn(actual.renameSync),
  };
});

const secrets: DevelopmentSecrets = {
  env: { SOWA_ENCRYPTION_KEYS: "1:secret-value-one" },
  mainProject: { publicKey: "pk_public", serverKey: "sk_secret-value-two" },
};

const itOnPosix = it.skipIf(process.platform === "win32");

let root: string;
let directory: string;

function fileMode(path: string): number {
  return statSync(path).mode & 0o777;
}

function messageOf(action: () => unknown): string {
  try {
    action();
  } catch (error) {
    return (error as Error).message;
  }
  return "";
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sowa-dev-secrets-"));
  directory = join(root, "nested", "dir");
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe("константы и путь", () => {
  it("папка по умолчанию .sowa-dev, файл secrets.json", () => {
    expect(defaultDevelopmentSecretsDirectory).toBe(".sowa-dev");
    expect(developmentSecretsFileName).toBe("secrets.json");
  });

  it("developmentSecretsPath соединяет папку и имя файла", () => {
    expect(developmentSecretsPath("some/dir")).toBe(join("some/dir", "secrets.json"));
  });
});

describe("readDevelopmentSecrets", () => {
  it("возвращает undefined, если файла нет", () => {
    expect(readDevelopmentSecrets(directory)).toBeUndefined();
  });

  it("возвращает undefined, если нет и самой папки", () => {
    expect(readDevelopmentSecrets(join(root, "missing"))).toBeUndefined();
  });

  it("читает то, что записал createDevelopmentSecrets, вместе с mainProject", () => {
    createDevelopmentSecrets(directory, secrets);

    expect(readDevelopmentSecrets(directory)).toEqual(secrets);
  });

  it("читает файл без mainProject", () => {
    createDevelopmentSecrets(directory, { env: { A: "b" } });

    expect(readDevelopmentSecrets(directory)).toEqual({ env: { A: "b" } });
  });

  it("не JSON: InvalidDevelopmentSecretsError с путём файла", () => {
    createDevelopmentSecrets(directory, secrets);
    const path = developmentSecretsPath(directory);
    writeFileSync(path, "not json");

    expect(() => readDevelopmentSecrets(directory)).toThrow(InvalidDevelopmentSecretsError);
    expect(() => readDevelopmentSecrets(directory)).toThrow(
      `Development secrets file ${path} is not valid: fix or delete it`,
    );
  });

  it.each([
    ["env не объект", { env: "x" }],
    ["нет env", { mainProject: { publicKey: "a", serverKey: "b" } }],
    ["значение env не строка", { env: { SOWA_ENCRYPTION_KEYS: 1 } }],
    ["в mainProject нет serverKey", { env: {}, mainProject: { publicKey: "a" } }],
    ["корень — массив", []],
  ])("не проходит схему (%s): InvalidDevelopmentSecretsError", (_name, content) => {
    createDevelopmentSecrets(directory, secrets);
    writeFileSync(developmentSecretsPath(directory), JSON.stringify(content));

    expect(() => readDevelopmentSecrets(directory)).toThrow(InvalidDevelopmentSecretsError);
  });

  it("в тексте ошибки нет значений файла", () => {
    createDevelopmentSecrets(directory, secrets);
    const content = {
      env: { SOWA_ENCRYPTION_KEYS: "leaked-value-1" },
      mainProject: { publicKey: "leaked-value-2" },
    };
    writeFileSync(developmentSecretsPath(directory), JSON.stringify(content));

    const message = messageOf(() => readDevelopmentSecrets(directory));

    expect(message).not.toBe("");
    expect(message).not.toContain("leaked-value");
  });
});

describe("createDevelopmentSecrets", () => {
  it("создаёт вложенную папку и файл и возвращает true", () => {
    expect(createDevelopmentSecrets(directory, secrets)).toBe(true);
    expect(existsSync(developmentSecretsPath(directory))).toBe(true);
  });

  it("пишет JSON с отступом 2 и переводом строки в конце", () => {
    createDevelopmentSecrets(directory, secrets);

    expect(readFileSync(developmentSecretsPath(directory), "utf8")).toBe(
      `${JSON.stringify(secrets, null, 2)}\n`,
    );
  });

  it("не оставляет временных файлов ни после создания, ни после отказа", () => {
    createDevelopmentSecrets(directory, secrets);
    createDevelopmentSecrets(directory, secrets);

    expect(readdirSync(directory)).toEqual([developmentSecretsFileName]);
  });

  it("файл появляется сразу с полным содержимым: ссылкой на готовый временный файл", () => {
    vi.mocked(linkSync).mockClear();
    let contentAtLink = "";
    vi.mocked(linkSync).mockImplementationOnce((existing, target) => {
      contentAtLink = readFileSync(existing, "utf8");
      expect(existsSync(target)).toBe(false);
    });

    createDevelopmentSecrets(directory, secrets);

    expect(contentAtLink).toBe(`${JSON.stringify(secrets, null, 2)}
`);
  });

  it("второй вызов возвращает false и не меняет файл", () => {
    createDevelopmentSecrets(directory, secrets);
    const before = readFileSync(developmentSecretsPath(directory), "utf8");

    expect(createDevelopmentSecrets(directory, { env: { OTHER: "value" } })).toBe(false);
    expect(readFileSync(developmentSecretsPath(directory), "utf8")).toBe(before);
  });

  it("не трогает уже существующий файл, даже если он повреждён", () => {
    createDevelopmentSecrets(directory, secrets);
    writeFileSync(developmentSecretsPath(directory), "not json");

    expect(createDevelopmentSecrets(directory, secrets)).toBe(false);
    expect(readFileSync(developmentSecretsPath(directory), "utf8")).toBe("not json");
  });

  itOnPosix("файл с правами 0600, папка 0700", () => {
    createDevelopmentSecrets(directory, secrets);

    expect(fileMode(developmentSecretsPath(directory))).toBe(0o600);
    expect(fileMode(directory)).toBe(0o700);
  });
});

describe("writeDevelopmentSecrets", () => {
  it("создаёт файл, если его нет", () => {
    writeDevelopmentSecrets(directory, secrets);

    expect(readDevelopmentSecrets(directory)).toEqual(secrets);
  });

  it("перезаписывает существующий файл", () => {
    createDevelopmentSecrets(directory, secrets);
    const updated = { env: { SOWA_ENCRYPTION_KEYS: "2:new" } };

    writeDevelopmentSecrets(directory, updated);

    expect(readDevelopmentSecrets(directory)).toEqual(updated);
    expect(readFileSync(developmentSecretsPath(directory), "utf8")).toBe(
      `${JSON.stringify(updated, null, 2)}\n`,
    );
  });

  it("имя временного файла каждый раз новое, а не по номеру процесса", () => {
    vi.mocked(renameSync).mockClear();

    writeDevelopmentSecrets(directory, secrets);
    writeDevelopmentSecrets(directory, secrets);

    const names = vi.mocked(renameSync).mock.calls.map(([from]) => String(from));
    expect(new Set(names).size).toBe(2);
  });

  it("не оставляет временных файлов в папке", () => {
    writeDevelopmentSecrets(directory, secrets);
    writeDevelopmentSecrets(directory, secrets);

    expect(readdirSync(directory)).toEqual([developmentSecretsFileName]);
  });

  itOnPosix("файл 0600 и папка 0700 после перезаписи", () => {
    createDevelopmentSecrets(directory, secrets);
    chmodSync(developmentSecretsPath(directory), 0o644);

    writeDevelopmentSecrets(directory, secrets);

    expect(fileMode(developmentSecretsPath(directory))).toBe(0o600);
    expect(fileMode(directory)).toBe(0o700);
  });

  itOnPosix("создаёт папку с правами 0700, если её нет", () => {
    writeDevelopmentSecrets(directory, secrets);

    expect(fileMode(directory)).toBe(0o700);
    expect(fileMode(developmentSecretsPath(directory))).toBe(0o600);
  });
});
