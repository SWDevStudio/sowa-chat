import { redisTransportOptions } from "./redis-transport-options.js";

describe("redisTransportOptions", () => {
  it("разбирает rediss-URL с логином, паролем, портом и базой", () => {
    expect(redisTransportOptions("rediss://user:p%40ss@cache.local:6390/2")).toStrictEqual({
      host: "cache.local",
      port: 6390,
      db: 2,
      username: "user",
      password: "p@ss",
      tls: {},
    });
  });

  it("для redis://127.0.0.1 возвращает только host, port 6379 и db 0", () => {
    expect(redisTransportOptions("redis://127.0.0.1")).toStrictEqual({
      host: "127.0.0.1",
      port: 6379,
      db: 0,
    });
  });

  it("порт и база возвращаются числами", () => {
    const options = redisTransportOptions("redis://cache.local:6380/5");

    expect(options.port).toBe(6380);
    expect(options.db).toBe(5);
  });

  it.each(["redis://cache.local/", "redis://cache.local/0", "redis://cache.local"])(
    "%s — база 0",
    (url) => {
      expect(redisTransportOptions(url).db).toBe(0);
    },
  );

  it("host IPv6 возвращается без квадратных скобок", () => {
    expect(redisTransportOptions("redis://[::1]:6380")).toStrictEqual({
      host: "::1",
      port: 6380,
      db: 0,
    });
  });

  it("только пароль — поля username нет", () => {
    expect(redisTransportOptions("redis://:secret@cache.local")).toStrictEqual({
      host: "cache.local",
      port: 6379,
      db: 0,
      password: "secret",
    });
  });

  it("только логин — поля password нет", () => {
    expect(redisTransportOptions("redis://user@cache.local")).toStrictEqual({
      host: "cache.local",
      port: 6379,
      db: 0,
      username: "user",
    });
  });

  it("пустые логин и пароль не попадают в объект", () => {
    expect(redisTransportOptions("redis://:@cache.local")).toStrictEqual({
      host: "cache.local",
      port: 6379,
      db: 0,
    });
  });

  it("логин и пароль декодируются из процентной записи", () => {
    const options = redisTransportOptions("redis://us%3Aer:p%2Fa%23ss%20word@cache.local");

    expect(options.username).toBe("us:er");
    expect(options.password).toBe("p/a#ss word");
  });

  it("tls: {} только для схемы rediss", () => {
    expect(redisTransportOptions("rediss://cache.local")).toHaveProperty("tls", {});
    expect(redisTransportOptions("redis://cache.local")).not.toHaveProperty("tls");
  });

  it("неверный URL — ошибка без пароля в тексте", () => {
    const password = "secret-password-91ab";
    let thrown: unknown;

    try {
      redisTransportOptions(`redis://user:${password}@cache.local:not-a-port`);
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(Error);
    expect((thrown as Error).message).not.toContain(password);
  });
});
