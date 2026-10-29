import type { TestingModuleBuilder } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";

const offlineDataSource = {
  isInitialized: false,
  subscribers: [],
  manager: { getRepository: () => ({ find: async () => [] }) },
};

export function withOfflineDatabase(builder: TestingModuleBuilder): TestingModuleBuilder {
  return builder.overrideProvider(getDataSourceToken()).useValue(offlineDataSource);
}
