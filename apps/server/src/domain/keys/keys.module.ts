import { Module } from "@nestjs/common";
import { ApiKeysRepository } from "./api-keys.repository.js";
import { ApiKeysService } from "./api-keys.service.js";

@Module({
  providers: [ApiKeysRepository, ApiKeysService],
  exports: [ApiKeysService],
})
export class KeysModule {}
