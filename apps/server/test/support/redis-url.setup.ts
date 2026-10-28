import { inject } from "vitest";

process.env.REDIS_URL = inject("redisUrl");
