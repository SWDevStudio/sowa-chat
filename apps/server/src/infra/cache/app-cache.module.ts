import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { LocalCacheInvalidation } from "./local-cache-invalidation.listener.js";

export const cacheTtlMs = 60_000;

@Global()
@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: cacheTtlMs })],
  providers: [LocalCacheInvalidation],
})
export class AppCacheModule {}
