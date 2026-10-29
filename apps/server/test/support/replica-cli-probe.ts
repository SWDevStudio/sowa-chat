import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { Redis } from "ioredis";
import { PinoLogger } from "nestjs-pino";
import { pino } from "pino";

const cacheInvalidateChannel = "cache.invalidate";

export interface ObservedMessage<Observed> {
  message: unknown;
  observed: Observed;
}

export interface ChannelRecorder<Observed> {
  received: ObservedMessage<Observed>[];
  close: () => Promise<void>;
}

export interface LogCapture {
  lines: string[];
  restore: () => void;
}

export interface ClosingRedisServer {
  url: string;
  connections: () => number;
  close: () => Promise<void>;
}

export async function recordCacheInvalidate<Observed>(
  redisUrl: string,
  observe: () => Promise<Observed>,
): Promise<ChannelRecorder<Observed>> {
  const subscriber = new Redis(redisUrl);
  const received: ObservedMessage<Observed>[] = [];
  subscriber.on("message", (_channel: string, message: string) => {
    void observe().then((observed) => {
      received.push({ message: JSON.parse(message), observed });
    });
  });
  await subscriber.subscribe(cacheInvalidateChannel);
  return {
    received,
    close: async () => {
      await subscriber.quit();
    },
  };
}

export function captureLogLines(): LogCapture {
  const root = PinoLogger.root;
  if (!root) {
    throw new Error("Root logger is not created yet: run a CLI command first");
  }
  const original: unknown = Reflect.get(root, pino.symbols.streamSym);
  const lines: string[] = [];
  Reflect.set(root, pino.symbols.streamSym, {
    write: (line: string) => {
      lines.push(line);
    },
  });
  return {
    lines,
    restore: () => {
      Reflect.set(root, pino.symbols.streamSym, original);
    },
  };
}

export async function startClosingRedisServer(password: string): Promise<ClosingRedisServer> {
  let connections = 0;
  const server = createServer((socket) => {
    connections += 1;
    socket.destroy();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `redis://sowa:${password}@127.0.0.1:${port}`,
    connections: () => connections,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}
