import { Module } from "@nestjs/common";
import { CryptoModule } from "./crypto.module.js";
import { encryptedFields } from "./encrypted-field.js";
import { registeredEncryptedFields } from "./registered-encrypted-fields.js";
import { SecretsReencryptionService } from "./secrets-reencryption.service.js";

@Module({
  imports: [CryptoModule],
  providers: [
    SecretsReencryptionService,
    { provide: encryptedFields, useValue: registeredEncryptedFields },
  ],
  exports: [SecretsReencryptionService, encryptedFields],
})
export class SecretsReencryptionModule {}
