import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import type { DataSource } from "typeorm";
import { beginOperation } from "../src/telemetry/operation-steps/operation-timing.js";
import { WorkerModule } from "../src/worker.module.js";

describe("шаг db из подписчика TypeORM", () => {
  let moduleRef: TestingModule;
  let dataSource: DataSource;
  let cls: ClsService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({ imports: [WorkerModule] }).compile();
    await moduleRef.init();
    dataSource = moduleRef.get<DataSource>(getDataSourceToken());
    cls = moduleRef.get(ClsService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  it("SELECT 1 добавляет в steps ключ db с числом не меньше 0", async () => {
    await cls.run(async () => {
      const timing = beginOperation(cls);

      await dataSource.query("SELECT 1");

      expect(typeof timing.steps.db).toBe("number");
      expect(timing.steps.db).toBeGreaterThanOrEqual(0);
    });
  });

  it("второй запрос не уменьшает накопленное время db", async () => {
    await cls.run(async () => {
      const timing = beginOperation(cls);

      await dataSource.query("SELECT 1");
      const afterFirst = timing.steps.db ?? 0;
      await dataSource.query("SELECT 1");

      expect(timing.steps.db).toBeGreaterThanOrEqual(afterFirst);
    });
  });

  it("неудачный запрос не добавляет шаг db", async () => {
    await cls.run(async () => {
      const timing = beginOperation(cls);

      await expect(dataSource.query("SELECT * FROM no_such_table_x")).rejects.toThrow();

      expect(timing.steps.db).toBeUndefined();
    });
  });

  it("запрос вне операции не бросает исключение", async () => {
    await expect(dataSource.query("SELECT 1")).resolves.toBeDefined();
  });
});
