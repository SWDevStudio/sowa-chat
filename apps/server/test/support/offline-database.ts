import type { TestingModuleBuilder } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";

export function withOfflineDatabase(builder: TestingModuleBuilder): TestingModuleBuilder {
  return builder.overrideProvider(getDataSourceToken()).useValue({ isInitialized: false });
}
