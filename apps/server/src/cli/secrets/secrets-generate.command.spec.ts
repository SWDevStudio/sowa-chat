import { readFileSync } from "node:fs";
import { runCliInProcess } from "../../../test/support/cli-run.js";
import type { CliRunResult } from "../../../test/support/cli-run.js";
import { parseKey } from "../../domain/keys/key-format.js";
import { encryptionKeysSchema } from "../../infra/config/encryption-keys.schema.js";
import { envSchema } from "../../infra/config/env.schema.js";
import { parseEnv } from "../../infra/config/parse-env.js";
import { tokenSigningKeysSchema } from "../../infra/config/token-signing-keys.schema.js";

const encryptionKeys = "1:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=";
const signingKeys = "test-1:MC4CAQAwBQYDK2VwBCIEIAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4f";

const productionEnv = {
  DATABASE_URL: "postgres://sowa:secret@127.0.0.1:5432/sowa",
  REDIS_URL: "redis://127.0.0.1:6379",
  SOWA_S3_ENDPOINT: "http://127.0.0.1:8333",
  SOWA_S3_ACCESS_KEY: "access",
  SOWA_S3_SECRET_KEY: "secret",
  SOWA_S3_BUCKET: "sowa-chat",
  SOWA_PUBLIC_URL: "https://chat.example.com",
  SOWA_ENV: "production",
};

const generatedNames = [
  "SOWA_ENCRYPTION_KEYS",
  "SOWA_TOKEN_SIGNING_KEYS",
  "SOWA_TOKEN_SIGNING_KEY_ID",
  "SOWA_INIT_SERVER_KEY",
];

const rotatedNames = generatedNames.slice(0, 3);

function lineNames(lines: string[]): string[] {
  return lines.map((line) => line.slice(0, line.indexOf("=")));
}

function variablesOf(result: CliRunResult): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const line of linesOf(result)) {
    const separator = line.indexOf("=");
    variables[line.slice(0, separator)] = line.slice(separator + 1);
  }
  return variables;
}

function linesOf(result: CliRunResult): string[] {
  return result.stdout.split(/\r?\n/).filter((line) => line.trim() !== "");
}

function clearConfigEnv(): void {
  for (const name of Object.keys(envSchema.shape)) {
    vi.stubEnv(name, undefined);
  }
}

function sourceOf(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function staticImportPaths(source: string): string[] {
  const paths = [...source.matchAll(/^import\s[^;]*?from\s+"([^"]+)";/gm)];
  return paths.map((match) => match[1] ?? "");
}

describe("secrets:generate без --rotate", () => {
  beforeEach(() => {
    clearConfigEnv();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("печатает четыре строки ИМЯ=значение в заданном порядке, stderr пустой", async () => {
    const result = await runCliInProcess(["secrets:generate"]);

    expect(result.exitCode, result.stderr).toBe(0);
    expect(result.stderr).toBe("");
    expect(lineNames(linesOf(result))).toEqual(generatedNames);
  });

  it("выдаёт ключ шифрования версии 1 и ключ подписи key-1", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate"]));

    expect(
      encryptionKeysSchema.parse(variables.SOWA_ENCRYPTION_KEYS)?.map((k) => k.version),
    ).toEqual([1]);
    expect(variables.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-1");
    expect(
      tokenSigningKeysSchema.parse(variables.SOWA_TOKEN_SIGNING_KEYS)?.map((k) => k.kid),
    ).toEqual(["key-1"]);
  });

  it("выдаёт SOWA_INIT_SERVER_KEY в формате sk_", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate"]));

    expect(variables.SOWA_INIT_SERVER_KEY?.startsWith("sk_")).toBe(true);
    expect(parseKey(variables.SOWA_INIT_SERVER_KEY ?? "", "serverKey")).toBeDefined();
  });

  it("значения проходят parseEnv вместе с остальным минимальным env production", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate"]));

    const env = parseEnv({ ...productionEnv, ...variables });

    expect(env.SOWA_ENV).toBe("production");
    expect(env.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-1");
    expect(env.SOWA_INIT_SERVER_KEY).toBe(variables.SOWA_INIT_SERVER_KEY);
  });

  it("два запуска дают разные значения секретов", async () => {
    const first = variablesOf(await runCliInProcess(["secrets:generate"]));
    const second = variablesOf(await runCliInProcess(["secrets:generate"]));

    expect(second.SOWA_ENCRYPTION_KEYS).not.toBe(first.SOWA_ENCRYPTION_KEYS);
    expect(second.SOWA_TOKEN_SIGNING_KEYS).not.toBe(first.SOWA_TOKEN_SIGNING_KEYS);
    expect(second.SOWA_INIT_SERVER_KEY).not.toBe(first.SOWA_INIT_SERVER_KEY);
  });

  it("не читает env: неверный DATABASE_URL и SOWA_ENV не мешают", async () => {
    vi.stubEnv("DATABASE_URL", "not-a-url");
    vi.stubEnv("SOWA_ENV", "staging");
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", "broken");

    const result = await runCliInProcess(["secrets:generate"]);

    expect(result.exitCode, result.stderr).toBe(0);
    expect(lineNames(linesOf(result))).toEqual(generatedNames);
  });

  it("не печатает значения секретов в stderr", async () => {
    const result = await runCliInProcess(["secrets:generate"]);

    for (const value of Object.values(variablesOf(result))) {
      expect(result.stderr).not.toContain(value);
    }
  });
});

describe("secrets:generate --rotate", () => {
  beforeEach(() => {
    clearConfigEnv();
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", encryptionKeys);
    vi.stubEnv("SOWA_TOKEN_SIGNING_KEYS", signingKeys);
    vi.stubEnv("SOWA_TOKEN_SIGNING_KEY_ID", "test-1");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("печатает три строки, SOWA_INIT_SERVER_KEY не печатает", async () => {
    const result = await runCliInProcess(["secrets:generate", "--rotate"]);

    expect(result.exitCode, result.stderr).toBe(0);
    expect(result.stderr).toBe("");
    expect(lineNames(linesOf(result))).toEqual(rotatedNames);
  });

  it("оставляет ключ шифрования 1 без изменений и добавляет версию 2", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate", "--rotate"]));

    expect(variables.SOWA_ENCRYPTION_KEYS?.startsWith(`${encryptionKeys},2:`)).toBe(true);
    expect(
      encryptionKeysSchema.parse(variables.SOWA_ENCRYPTION_KEYS)?.map((k) => k.version),
    ).toEqual([1, 2]);
  });

  it("оставляет ключ подписи без изменений и делает key-2 текущим", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate", "--rotate"]));

    expect(variables.SOWA_TOKEN_SIGNING_KEYS?.startsWith(`${signingKeys},key-2:`)).toBe(true);
    expect(variables.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-2");
  });

  it("ротированные значения проходят parseEnv", async () => {
    const variables = variablesOf(await runCliInProcess(["secrets:generate", "--rotate"]));

    const env = parseEnv({ ...productionEnv, ...variables });

    expect(env.SOWA_TOKEN_SIGNING_KEY_ID).toBe("key-2");
  });

  it("без SOWA_ENCRYPTION_KEYS выходит с кодом 1 и ошибкой в stderr", async () => {
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", undefined);

    const result = await runCliInProcess(["secrets:generate", "--rotate"]);

    expect(result.exitCode).toBe(1);
    expect(result.stdout).toBe("");
    expect(result.stderr.startsWith("error: SOWA_ENCRYPTION_KEYS is not set")).toBe(true);
  });

  it("с неверным SOWA_ENCRYPTION_KEYS выходит с кодом 1 и не печатает значение", async () => {
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", "1:not-base64-key");

    const result = await runCliInProcess(["secrets:generate", "--rotate"]);

    expect(result.exitCode).toBe(1);
    expect(result.stdout).toBe("");
    expect(result.stderr.startsWith("error: SOWA_ENCRYPTION_KEYS")).toBe(true);
    expect(result.stderr).not.toContain("not-base64-key");
  });
});

describe("статические импорты точек входа", () => {
  const forbiddenForMain = [
    "./api.module.js",
    "./worker.module.js",
    "./migrate.module.js",
    "./cli.module.js",
    "./infra/config/config.module.js",
  ];

  it("main.ts не импортирует модули режимов и config.module.ts статически", () => {
    const paths = staticImportPaths(sourceOf("../../main.ts"));

    for (const forbidden of forbiddenForMain) {
      expect(paths).not.toContain(forbidden);
    }
  });

  it("main.ts импортирует модули режимов динамически", () => {
    const source = sourceOf("../../main.ts");

    for (const module of ["api", "worker", "migrate"]) {
      expect(source).toContain(`import("./${module}.module.js")`);
    }
  });

  it("cli-runner.ts не импортирует cli.module.ts статически, а загружает динамически", () => {
    const source = sourceOf("../cli-runner.ts");

    expect(staticImportPaths(source)).not.toContain("../cli.module.js");
    expect(source).toContain('import("../cli.module.js")');
  });
});
