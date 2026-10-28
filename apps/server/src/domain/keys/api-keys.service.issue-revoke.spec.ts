import { TransactionHost } from "@nestjs-cls/transactional";
import {
  createApiKeysServiceProbe,
  createdRow,
  deferred,
  sha256,
  storedRow,
} from "../../../test/support/api-keys-service-probe.js";
import type { ApiKeysServiceProbe } from "../../../test/support/api-keys-service-probe.js";
import type { ApiKey } from "./api-key.entity.js";
import { generateKey, parseKey } from "./key-format.js";

const eventFields = ["actorKind", "apiKeyId", "botId", "kind", "prefix", "projectId"];

describe("ApiKeysService.issue", () => {
  let probe: ApiKeysServiceProbe;

  beforeEach(async () => {
    probe = await createApiKeysServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("server: сохраняет хеш и lookupPrefix в транзакции и публикует apiKey.issued", async () => {
    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "server",
      actorKind: "cli",
    });

    expect(issued.apiKeyId).toBe("api-key-1");
    expect(issued.prefix).toBe(parseKey(issued.key, "serverKey")?.lookupPrefix);
    expect(probe.repository.create).toHaveBeenCalledTimes(1);
    expect(probe.repository.create).toHaveBeenCalledWith({
      projectId: "project-1",
      kind: "server",
      prefix: issued.prefix,
      keyHash: sha256(issued.key),
      botId: null,
    });
    expect(probe.publish).toHaveBeenCalledTimes(1);
    expect(probe.publish).toHaveBeenCalledWith("apiKey.issued", {
      apiKeyId: "api-key-1",
      projectId: "project-1",
      kind: "server",
      prefix: issued.prefix,
      botId: null,
      actorKind: "cli",
    });
    expect(TransactionHost.getInstance).toHaveBeenCalled();
  });

  it("bot: ключ bk_ с botId в строке и событии", async () => {
    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "bot",
      botId: "bot-1",
      actorKind: "system",
    });

    expect(parseKey(issued.key, "botKey")).toBeDefined();
    expect(probe.repository.create).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "bot", botId: "bot-1", prefix: issued.prefix }),
    );
    expect(probe.publish).toHaveBeenCalledWith(
      "apiKey.issued",
      expect.objectContaining({ kind: "bot", botId: "bot-1", actorKind: "system" }),
    );
  });

  it("открытого ключа нет в записи, а ключа и хеша нет в событии", async () => {
    const issued = await probe.service.issue({
      projectId: "project-1",
      kind: "server",
      actorKind: "cli",
    });
    const [createInput] = probe.repository.create.mock.calls[0] as [Partial<ApiKey>];
    const [, event] = probe.publish.mock.calls[0] as [string, Record<string, unknown>];

    expect(JSON.stringify({ ...createInput, keyHash: undefined })).not.toContain(issued.key);
    expect(JSON.stringify(event)).not.toContain(issued.key);
    expect(JSON.stringify(event)).not.toContain(sha256(issued.key).toString("hex"));
    expect(Object.keys(event).sort()).toEqual(eventFields);
  });

  it("каждый выпуск даёт новый ключ и не отзывает старые", async () => {
    const input = { projectId: "project-1", kind: "server", actorKind: "cli" } as const;

    const first = await probe.service.issue(input);
    const second = await probe.service.issue(input);

    expect(first.key).not.toBe(second.key);
    expect(probe.repository.revokeByPrefix).not.toHaveBeenCalled();
  });

  it("публикует событие после записи и ждёт публикацию до возврата", async () => {
    const created = deferred();
    const published = deferred();
    probe.repository.create.mockImplementation(async (input: Partial<ApiKey>) => {
      await created.promise;
      return createdRow(input);
    });
    probe.publish.mockReturnValue(published.promise);
    let settled = false;

    const pending = probe.service
      .issue({ projectId: "project-1", kind: "server", actorKind: "cli" })
      .then((result) => {
        settled = true;
        return result;
      });
    await vi.waitFor(() => expect(probe.repository.create).toHaveBeenCalled());
    expect(probe.publish).not.toHaveBeenCalled();
    created.resolve();
    await vi.waitFor(() => expect(probe.publish).toHaveBeenCalled());
    await Promise.resolve();
    expect(settled).toBe(false);
    published.resolve();

    await expect(pending).resolves.toBeDefined();
  });

  it("ошибка записи пробрасывается, событие не публикуется", async () => {
    probe.repository.create.mockRejectedValue(new Error("insert failed"));

    await expect(
      probe.service.issue({ projectId: "project-1", kind: "server", actorKind: "cli" }),
    ).rejects.toThrow("insert failed");

    expect(probe.publish).not.toHaveBeenCalled();
  });
});

describe("ApiKeysService.revoke", () => {
  let probe: ApiKeysServiceProbe;

  beforeEach(async () => {
    probe = await createApiKeysServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ключа нет или он уже отозван — false без события", async () => {
    await expect(
      probe.service.revoke({ prefix: "sk_000000000000", actorKind: "cli" }),
    ).resolves.toBe(false);

    expect(probe.repository.revokeByPrefix).toHaveBeenCalledWith("sk_000000000000");
    expect(probe.publish).not.toHaveBeenCalled();
  });

  it("отзывает ключ, публикует apiKey.revoked без ключа и хеша и возвращает true", async () => {
    const key = generateKey("botKey");
    const row = storedRow(key, "bot", { revokedAt: new Date() });
    probe.repository.revokeByPrefix.mockResolvedValue(row);

    await expect(probe.service.revoke({ prefix: row.prefix, actorKind: "system" })).resolves.toBe(
      true,
    );

    expect(probe.publish).toHaveBeenCalledTimes(1);
    expect(probe.publish).toHaveBeenCalledWith("apiKey.revoked", {
      apiKeyId: row.id,
      projectId: row.projectId,
      kind: "bot",
      prefix: row.prefix,
      botId: "bot-1",
      actorKind: "system",
    });
    const published = JSON.stringify(probe.publish.mock.calls);
    expect(published).not.toContain(key);
    expect(published).not.toContain(sha256(key).toString("hex"));
  });

  it("выполняется в транзакции и ждёт публикацию до возврата", async () => {
    const row = storedRow(generateKey("serverKey"), "server", { revokedAt: new Date() });
    probe.repository.revokeByPrefix.mockResolvedValue(row);
    const published = deferred();
    probe.publish.mockReturnValue(published.promise);
    let settled = false;

    const pending = probe.service
      .revoke({ prefix: row.prefix, actorKind: "cli" })
      .then((result) => {
        settled = true;
        return result;
      });
    await vi.waitFor(() => expect(probe.publish).toHaveBeenCalled());
    await Promise.resolve();
    expect(settled).toBe(false);
    published.resolve();

    await expect(pending).resolves.toBe(true);
    expect(TransactionHost.getInstance).toHaveBeenCalled();
  });
});
