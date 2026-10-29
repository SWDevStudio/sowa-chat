import { Module } from "@nestjs/common";
import { ApiKeysRepository } from "./api-keys.repository.js";
import { ApiKeysService } from "./api-keys.service.js";
import { IdentityKeysRepository } from "./identity-keys.repository.js";
import { IdentityKeysService } from "./identity-keys.service.js";

@Module({
  providers: [ApiKeysRepository, ApiKeysService, IdentityKeysRepository, IdentityKeysService],
  exports: [ApiKeysService, IdentityKeysService],
})
export class KeysModule {}
