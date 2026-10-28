import { timingSafeEqual } from "node:crypto";
import {
  createApiKeysServiceProbe,
  deferred,
  lookupPrefixOf,
  sha256,
  storedRow,
} from "../../../test/support/api-keys-service-probe.js";
import type { ApiKeysServiceProbe } from "../../../test/support/api-keys-service-probe.js";
import { base62Alphabet } from "./base62.js";
import { generateKey } from "./key-format.js";
import { hashKey } from "./key-hash.js";

vi.mock("node:crypto", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:crypto")>();
  return { ...actual, timingSafeEqual: vi.fn(actual.timingSafeEqual) };
});

function replaceChar(text: string, index: number): string {
  const current = text[index];
  const replacement = base62Alphabet.split("").find((char) => char !== current) ?? "0";
  return text.slice(0, index) + replacement + text.slice(index + 1);
}

const serverKey = generateKey("serverKey");

describe("hashKey", () => {
  it("возвращает SHA-256 ключа в виде Buffer из 32 байт", () => {
    const hash = hashKey(serverKey);

    expect(Buffer.isBuffer(hash)).toBe(true);
    expect(hash).toHaveLength(32);
    expect(hash.equals(sha256(serverKey))).toBe(true);
  });
});

describe("ApiKeysService.verify", () => {
  let probe: ApiKeysServiceProbe;

  beforeEach(async () => {
    vi.mocked(timingSafeEqual).mockClear();
    probe = await createApiKeysServiceProbe();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("до запроса к БД", () => {
    it.each([
      ["изменённый символ тела", replaceChar(serverKey, 10), "server"],
      [
        "изменённый символ контрольной суммы",
        replaceChar(serverKey, serverKey.length - 1),
        "server",
      ],
      ["ключ bk_ при kind server", generateKey("botKey"), "server"],
      ["ключ sk_ при kind bot", serverKey, "bot"],
      ["ключ pk_", generateKey("publicKey"), "server"],
      ["пустая строка", "", "server"],
      ["мусор", "garbage", "server"],
      ["только префикс", "sk_", "server"],
      ["короткое тело", "sk_abc_def", "server"],
      ["без контрольной суммы", `sk_${"a".repeat(43)}`, "server"],
    ] as const)("%s — undefined без findByPrefix", async (_name, text, kind) => {
      await expect(probe.service.verify(text, kind)).resolves.toBeUndefined();

      expect(probe.repository.findByPrefix).not.toHaveBeenCalled();
    });
  });

  describe("по строке из БД", () => {
    it("ищет по lookupPrefix, сравнивает через timingSafeEqual, обновляет last_used_at", async () => {
      probe.repository.findByPrefix.mockResolvedValue(storedRow(serverKey, "server"));

      const verified = await probe.service.verify(serverKey, "server");

      expect(verified).toEqual({ apiKeyId: "api-key-1", projectId: "project-1", botId: null });
      expect(probe.repository.findByPrefix).toHaveBeenCalledWith(
        lookupPrefixOf(serverKey, "server"),
      );
      expect(probe.repository.touchLastUsedAt).toHaveBeenCalledWith("api-key-1");
      expect(timingSafeEqual).toHaveBeenCalled();
    });

    it("ключ bot возвращает botId", async () => {
      const key = generateKey("botKey");
      probe.repository.findByPrefix.mockResolvedValue(storedRow(key, "bot"));

      await expect(probe.service.verify(key, "bot")).resolves.toEqual({
        apiKeyId: "api-key-1",
        projectId: "project-1",
        botId: "bot-1",
      });
    });

    it("ждёт touchLastUsedAt до возврата результата", async () => {
      probe.repository.findByPrefix.mockResolvedValue(storedRow(serverKey, "server"));
      const touch = deferred();
      probe.repository.touchLastUsedAt.mockReturnValue(touch.promise);
      let settled = false;

      const pending = probe.service.verify(serverKey, "server").then((result) => {
        settled = true;
        return result;
      });
      await vi.waitFor(() => expect(probe.repository.touchLastUsedAt).toHaveBeenCalled());
      await Promise.resolve();
      expect(settled).toBe(false);
      touch.resolve();

      await expect(pending).resolves.toBeDefined();
    });

    it("нет строки — undefined без touchLastUsedAt", async () => {
      await expect(probe.service.verify(serverKey, "server")).resolves.toBeUndefined();

      expect(probe.repository.findByPrefix).toHaveBeenCalledTimes(1);
      expect(probe.repository.touchLastUsedAt).not.toHaveBeenCalled();
    });

    it("строка другого вида — undefined без touchLastUsedAt", async () => {
      probe.repository.findByPrefix.mockResolvedValue(
        storedRow(serverKey, "server", { kind: "bot", botId: "bot-1" }),
      );

      await expect(probe.service.verify(serverKey, "server")).resolves.toBeUndefined();

      expect(probe.repository.touchLastUsedAt).not.toHaveBeenCalled();
    });

    it("другой хеш той же длины — undefined после timingSafeEqual", async () => {
      const otherHash = sha256(generateKey("serverKey"));
      probe.repository.findByPrefix.mockResolvedValue(
        storedRow(serverKey, "server", { keyHash: otherHash }),
      );

      await expect(probe.service.verify(serverKey, "server")).resolves.toBeUndefined();

      expect(timingSafeEqual).toHaveBeenCalled();
      expect(probe.repository.touchLastUsedAt).not.toHaveBeenCalled();
    });

    it("хеш другой длины — undefined без вызова timingSafeEqual", async () => {
      const shortHash = sha256(serverKey).subarray(0, 16);
      probe.repository.findByPrefix.mockResolvedValue(
        storedRow(serverKey, "server", { keyHash: shortHash }),
      );

      await expect(probe.service.verify(serverKey, "server")).resolves.toBeUndefined();

      expect(timingSafeEqual).not.toHaveBeenCalled();
      expect(probe.repository.touchLastUsedAt).not.toHaveBeenCalled();
    });

    it("отозванный ключ — undefined без touchLastUsedAt", async () => {
      probe.repository.findByPrefix.mockResolvedValue(
        storedRow(serverKey, "server", { revokedAt: new Date("2026-02-01T00:00:00Z") }),
      );

      await expect(probe.service.verify(serverKey, "server")).resolves.toBeUndefined();

      expect(probe.repository.touchLastUsedAt).not.toHaveBeenCalled();
    });
  });
});
