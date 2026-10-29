import { createApiKeysServiceProbe, sha256 } from "../../../test/support/api-keys-service-probe.js";
import type { ApiKeysServiceProbe } from "../../../test/support/api-keys-service-probe.js";
import { InvalidApiKeyError } from "./api-keys.service.js";
import { generateKey, parseKey, toLookupPrefix } from "./key-format.js";

function withBrokenChecksum(key: string): string {
  const lastChar = key.at(-1);
  const replacement = lastChar === "A" ? "B" : "A";
  return `${key.slice(0, -1)}${replacement}`;
}

function bodyOf(key: string): string {
  return key.split("_")[1] ?? "";
}

describe("ApiKeysService.issue с готовым ключом", () => {
  let probe: ApiKeysServiceProbe;

  beforeEach(async () => {
    probe = await createApiKeysServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("верный sk_: сохраняет его хеш и lookupPrefix и возвращает тот же ключ", async () => {
    const key = generateKey("serverKey");

    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "server",
      actorKind: "system",
      key,
    });

    expect(issued).toEqual({ apiKeyId: "api-key-1", prefix: toLookupPrefix(key), key });
    expect(probe.repository.create).toHaveBeenCalledTimes(1);
    expect(probe.repository.create).toHaveBeenCalledWith({
      projectId: "project-1",
      kind: "server",
      prefix: toLookupPrefix(key),
      keyHash: sha256(key),
      botId: null,
    });
    expect(toLookupPrefix(key)).toBe(parseKey(key, "serverKey")?.lookupPrefix);
  });

  it("верный sk_: событие apiKey.issued без ключа", async () => {
    const key = generateKey("serverKey");

    await probe.service.issue({ projectId: "project-1", kind: "server", actorKind: "system", key });

    expect(probe.publish).toHaveBeenCalledWith("apiKey.issued", {
      apiKeyId: "api-key-1",
      projectId: "project-1",
      kind: "server",
      prefix: toLookupPrefix(key),
      botId: null,
      actorKind: "system",
    });
    const serialized = JSON.stringify(probe.publish.mock.calls);
    expect(serialized).not.toContain(key);
    expect(serialized).not.toContain(bodyOf(key));
  });

  it("верный bk_ для бота сохраняется с botId", async () => {
    const key = generateKey("botKey");

    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "bot",
      botId: "bot-1",
      actorKind: "cli",
      key,
    });

    expect(issued.key).toBe(key);
    expect(probe.repository.create).toHaveBeenCalledWith({
      projectId: "project-1",
      kind: "bot",
      prefix: toLookupPrefix(key),
      keyHash: sha256(key),
      botId: "bot-1",
    });
  });

  it("испорченная контрольная сумма — InvalidApiKeyError, ничего не записано", async () => {
    const key = withBrokenChecksum(generateKey("serverKey"));

    await expect(
      probe.service.issue({ projectId: "project-1", kind: "server", actorKind: "system", key }),
    ).rejects.toThrow(InvalidApiKeyError);

    expect(probe.repository.create).not.toHaveBeenCalled();
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("текст ошибки называет тип ключа и не содержит сам ключ", async () => {
    const key = withBrokenChecksum(generateKey("serverKey"));

    const error: unknown = await probe.service
      .issue({ projectId: "project-1", kind: "server", actorKind: "system", key })
      .catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(InvalidApiKeyError);
    const message = (error as Error).message;
    expect(message).toBe("Key is not a valid serverKey: check its prefix, length and checksum");
    expect(message).not.toContain(key);
    expect(message).not.toContain(bodyOf(key));
    expect(JSON.stringify(error)).not.toContain(bodyOf(key));
  });

  it.each([
    ["ключ другого типа (pk_)", () => generateKey("publicKey")],
    ["ключ бота (bk_)", () => generateKey("botKey")],
    ["короче на символ", () => `sk_${bodyOf(generateKey("serverKey")).slice(1)}_AAAAAA`],
    ["лишний символ в теле", () => generateKey("serverKey").replace("sk_", "sk_A")],
    ["произвольный текст", () => "not-a-key"],
  ])("%s для server — InvalidApiKeyError, ничего не записано", async (_label, makeKey) => {
    await expect(
      probe.service.issue({
        projectId: "project-1",
        kind: "server",
        actorKind: "system",
        key: makeKey(),
      }),
    ).rejects.toThrow(InvalidApiKeyError);

    expect(probe.repository.create).not.toHaveBeenCalled();
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("sk_ для бота — InvalidApiKeyError с типом botKey", async () => {
    const key = generateKey("serverKey");

    await expect(
      probe.service.issue({
        projectId: "project-1",
        kind: "bot",
        botId: "bot-1",
        actorKind: "cli",
        key,
      }),
    ).rejects.toThrow("Key is not a valid botKey: check its prefix, length and checksum");

    expect(probe.repository.create).not.toHaveBeenCalled();
  });

  it("без key ключ генерируется заново", async () => {
    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "server",
      actorKind: "cli",
    });

    expect(parseKey(issued.key, "serverKey")).toBeDefined();
    expect(probe.repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ prefix: toLookupPrefix(issued.key), keyHash: sha256(issued.key) }),
    );
  });
});
