export interface RedisConnectionOptions {
  host: string;
  port: number;
  db: number;
  username?: string;
  password?: string;
  tls?: Record<string, never>;
}

const defaultRedisPort = 6379;
const defaultRedisDb = 0;

function parseUrl(redisUrl: string): URL {
  try {
    return new URL(redisUrl);
  } catch {
    throw new Error("Invalid Redis URL");
  }
}

function stripIpv6Brackets(hostname: string): string {
  return hostname.replace(/^\[(.*)\]$/, "$1");
}

function parseDatabase(pathname: string): number {
  const database = pathname.slice(1);
  return database === "" ? defaultRedisDb : Number(database);
}

export function redisTransportOptions(redisUrl: string): RedisConnectionOptions {
  const url = parseUrl(redisUrl);
  const options: RedisConnectionOptions = {
    host: stripIpv6Brackets(url.hostname),
    port: url.port === "" ? defaultRedisPort : Number(url.port),
    db: parseDatabase(url.pathname),
  };
  if (url.username !== "") {
    options.username = decodeURIComponent(url.username);
  }
  if (url.password !== "") {
    options.password = decodeURIComponent(url.password);
  }
  if (url.protocol === "rediss:") {
    options.tls = {};
  }
  return options;
}
