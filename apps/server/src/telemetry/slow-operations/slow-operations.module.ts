import { Module } from "@nestjs/common";
import { SlowOperations } from "./slow-operations.js";

@Module({
  providers: [SlowOperations],
  exports: [SlowOperations],
})
export class SlowOperationsModule {}
