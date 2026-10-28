import { Global, Module } from "@nestjs/common";
import { KeysModule } from "../../domain/keys/keys.module.js";
import { OperationStepsModule } from "../../telemetry/operation-steps/operation-steps.module.js";
import { ServerKeyGuard } from "./server-key.guard.js";

@Global()
@Module({
  imports: [KeysModule, OperationStepsModule],
  providers: [ServerKeyGuard],
  exports: [ServerKeyGuard, KeysModule, OperationStepsModule],
})
export class ServerAuthModule {}
