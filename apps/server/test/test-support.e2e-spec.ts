import type { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Project } from "../src/domain/projects/project.entity.js";
import { createE2eApp } from "./support/e2e-app.js";
import { createProject } from "./support/fixtures.js";
import { truncateAllTables, useTestDatabase } from "./support/test-database.js";

async function countRows(dataSource: DataSource, table: string): Promise<number> {
  const rows: { count: string }[] = await dataSource.query(`SELECT count(*) FROM "${table}"`);
  return Number(rows[0]?.count);
}

describe("помощники e2e с базой", () => {
  const getDataSource = useTestDatabase();

  describe("очистка таблиц между тестами", () => {
    it("первый тест создаёт проект", async () => {
      await createProject(getDataSource());

      expect(await countRows(getDataSource(), "projects")).toBe(1);
    });

    it("второй тест видит в projects ноль строк", async () => {
      expect(await countRows(getDataSource(), "projects")).toBe(0);
    });
  });

  describe("truncateAllTables", () => {
    it("не трогает migrations", async () => {
      const before = await countRows(getDataSource(), "migrations");
      await createProject(getDataSource());

      await truncateAllTables(getDataSource());

      expect(before).toBeGreaterThan(0);
      expect(await countRows(getDataSource(), "migrations")).toBe(before);
      expect(await countRows(getDataSource(), "projects")).toBe(0);
    });

    it("не падает при повторном вызове на пустых таблицах", async () => {
      await truncateAllTables(getDataSource());

      await expect(truncateAllTables(getDataSource())).resolves.toBeUndefined();
    });
  });

  describe("createProject", () => {
    it("сохраняет переданные поля", async () => {
      const project = await createProject(getDataSource(), {
        name: "fixture-fields",
        allowedOrigins: ["https://a.example"],
        settings: { theme: "dark" },
      });

      const found = await getDataSource()
        .getRepository(Project)
        .findOneByOrFail({ id: project.id });
      expect(found.name).toBe("fixture-fields");
      expect(found.allowedOrigins).toEqual(["https://a.example"]);
      expect(found.settings).toEqual({ theme: "dark" });
    });

    it("даёт два проекта без имени подряд с разными именами", async () => {
      const first = await createProject(getDataSource());
      const second = await createProject(getDataSource());

      expect(first.name).toMatch(/^project-/);
      expect(second.name).not.toBe(first.name);
      expect(await countRows(getDataSource(), "projects")).toBe(2);
    });

    it("берёт default из базы для пропущенных полей", async () => {
      const project = await createProject(getDataSource(), { name: "fixture-defaults" });

      const found = await getDataSource()
        .getRepository(Project)
        .findOneByOrFail({ id: project.id });
      expect(found.allowedOrigins).toBeDefined();
      expect(found.settings).toBeDefined();
    });
  });

  describe("createE2eApp", () => {
    let app: INestApplication;

    beforeAll(async () => {
      app = await createE2eApp();
    });

    afterAll(async () => {
      await app.close();
    });

    it("находит проект из фикстуры через DataSource приложения", async () => {
      await createProject(getDataSource(), { name: "fixture-main" });

      const found = await app
        .get(DataSource)
        .getRepository(Project)
        .findOneBy({ name: "fixture-main" });

      expect(found?.name).toBe("fixture-main");
    });

    it("не находит несуществующий проект", async () => {
      const found = await app
        .get(DataSource)
        .getRepository(Project)
        .findOneBy({ name: "fixture-missing" });

      expect(found).toBeNull();
    });
  });
});
