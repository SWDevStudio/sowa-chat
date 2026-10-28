import { Logger } from "@nestjs/common";
import { EventEmitter } from "node:events";
import type { Redis } from "ioredis";
import { findFreePort } from "../../../test/support/e2e-server.js";
import {
  closeRedis,
  createRedisClient,
  redisStartupTimeoutMs,
  waitForRedis,
} from "./redis-client.js";

class FakeRedis extends EventEmitter {
  disconnect = vi.fn();
  quit = vi.fn().mockResolvedValue("OK");

  constructor(public status: string) {
    super();
  }

  asRedis(): Redis {
    return this as unknown as Redis;
  }
}

describe("redisStartupTimeoutMs", () => {
  it("is 5000", () => {
    expect(redisStartupTimeoutMs).toBe(5000);
  });
});

describe("waitForRedis", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("resolves at once when the client is ready", async () => {
    const client = new FakeRedis("ready");

    await expect(waitForRedis(client.asRedis(), 1000)).resolves.toBeUndefined();
    expect(client.disconnect).not.toHaveBeenCalled();
  });

  it("resolves when the ready event arrives and removes its listeners", async () => {
    const client = new FakeRedis("connecting");

    const waiting = waitForRedis(client.asRedis(), 1000);
    client.emit("ready");
    await waiting;

    expect(client.eventNames()).toEqual([]);
    expect(client.disconnect).not.toHaveBeenCalled();
  });

  it("rejects with the last error after the timeout and disconnects", async () => {
    vi.useFakeTimers();
    const client = new FakeRedis("connecting");

    const waiting = waitForRedis(client.asRedis(), 1000);
    const assertion = expect(waiting).rejects.toThrow("Redis is unavailable: second failure");
    client.emit("error", new Error("first failure"));
    client.emit("error", new Error("second failure"));
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;

    expect(client.disconnect).toHaveBeenCalledTimes(1);
    expect(client.eventNames()).toEqual([]);
  });

  it("rejects with the no-response message when there was no error", async () => {
    vi.useFakeTimers();
    const client = new FakeRedis("connecting");

    const waiting = waitForRedis(client.asRedis(), 1500);
    const assertion = expect(waiting).rejects.toThrow(
      "Redis is unavailable: no response in 1500 ms",
    );
    await vi.advanceTimersByTimeAsync(1500);
    await assertion;

    expect(client.disconnect).toHaveBeenCalledTimes(1);
  });

  it("does not disconnect before the timeout elapses", async () => {
    vi.useFakeTimers();
    const client = new FakeRedis("connecting");

    const waiting = waitForRedis(client.asRedis(), 1000);
    waiting.catch(() => undefined);
    await vi.advanceTimersByTimeAsync(999);

    expect(client.disconnect).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
  });

  it("rejects for a real client on a free port within timeout + 1 s and disconnects the client", async () => {
    const port = await findFreePort();
    vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    const client = createRedisClient(`redis://127.0.0.1:${port}`);
    const disconnect = vi.spyOn(client, "disconnect");
    const timeoutMs = 1000;
    const startedAt = Date.now();

    await expect(waitForRedis(client, timeoutMs)).rejects.toThrow(
      /^Redis is unavailable: connect ECONNREFUSED/,
    );

    expect(Date.now() - startedAt).toBeLessThan(timeoutMs + 1000);
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(client.status).not.toBe("ready");
  });
});

describe("createRedisClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("names the connection and sets timeouts", async () => {
    const port = await findFreePort();
    vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);

    const client = createRedisClient(`redis://127.0.0.1:${port}`);
    client.disconnect();

    expect(client.options.connectionName).toBe("sowa-chat-server");
    expect(client.options.connectTimeout).toBe(5000);
    expect(client.options.maxRetriesPerRequest).toBe(3);
  });

  it("logs connection errors through Logger.warn without the password", async () => {
    const port = await findFreePort();
    const warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    const client = createRedisClient(`redis://:secret-redis-pass-77@127.0.0.1:${port}`);

    await vi.waitFor(() => expect(warn).toHaveBeenCalled());
    client.disconnect();

    const message = String(warn.mock.calls[0][0]);
    expect(message).toMatch(/^Redis connection error: .*ECONNREFUSED/);
    expect(message).not.toContain("secret-redis-pass-77");
  });

  it("has an error listener so ioredis does not print an unhandled error", async () => {
    const port = await findFreePort();
    vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);

    const client = createRedisClient(`redis://127.0.0.1:${port}`);
    client.disconnect();

    expect(client.listenerCount("error")).toBeGreaterThanOrEqual(1);
  });
});

describe("closeRedis", () => {
  it("quits a ready client", async () => {
    const client = new FakeRedis("ready");

    await closeRedis(client.asRedis());

    expect(client.quit).toHaveBeenCalledTimes(1);
    expect(client.disconnect).not.toHaveBeenCalled();
  });

  it.each(["connecting", "reconnecting", "close", "end"])(
    "disconnects without quit when status is %s",
    async (status) => {
      const client = new FakeRedis(status);

      await closeRedis(client.asRedis());

      expect(client.disconnect).toHaveBeenCalledTimes(1);
      expect(client.quit).not.toHaveBeenCalled();
    },
  );
});
