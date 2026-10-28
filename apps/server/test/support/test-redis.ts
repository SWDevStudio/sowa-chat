import { Redis } from "ioredis";

export function useTestRedis(): () => Redis {
  let redis: Redis;

  beforeAll(() => {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL is not set");
    }
    redis = new Redis(url);
  });

  beforeEach(async () => {
    await redis.flushall();
  });

  afterAll(async () => {
    await redis.quit();
  });

  return () => redis;
}
