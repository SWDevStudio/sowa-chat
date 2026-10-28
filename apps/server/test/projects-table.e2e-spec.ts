import { DataSource } from "typeorm";
import { Project } from "../src/domain/projects/project.entity.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  udt_name: string;
  is_nullable: string;
}

const uniqueViolationCode = "23505";

describe("таблица projects", () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Project],
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(async () => {
    await dataSource.query("DELETE FROM projects");
  });

  it("имеет колонки нужных типов, все NOT NULL", async () => {
    const rows: ColumnRow[] = await dataSource.query(
      "SELECT column_name, data_type, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'projects'",
    );
    const byName = new Map(rows.map((row) => [row.column_name, row]));

    expect([...byName.keys()].sort()).toEqual([
      "allowed_origins",
      "created_at",
      "id",
      "name",
      "settings",
    ]);
    expect(byName.get("id")).toMatchObject({ data_type: "uuid", is_nullable: "NO" });
    expect(byName.get("name")).toMatchObject({ data_type: "text", is_nullable: "NO" });
    expect(byName.get("allowed_origins")).toMatchObject({
      data_type: "ARRAY",
      udt_name: "_text",
      is_nullable: "NO",
    });
    expect(byName.get("settings")).toMatchObject({ data_type: "jsonb", is_nullable: "NO" });
    expect(byName.get("created_at")).toMatchObject({
      data_type: "timestamp with time zone",
      is_nullable: "NO",
    });
  });

  it("сохраняет проект только с name и подставляет default-значения", async () => {
    const repository = dataSource.getRepository(Project);

    const saved = await repository.save(repository.create({ name: "main" }));
    const found = await repository.findOneByOrFail({ name: "main" });

    expect(saved.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(found.id).toBe(saved.id);
    expect(found.allowedOrigins).toEqual([]);
    expect(found.settings).toEqual({});
    expect(found.createdAt).toBeInstanceOf(Date);
  });

  it("сохраняет allowedOrigins и settings как переданы", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(
      repository.create({
        name: "site",
        allowedOrigins: ["https://a.example", "https://b.example"],
        settings: { theme: "dark" },
      }),
    );
    const found = await repository.findOneByOrFail({ name: "site" });

    expect(found.allowedOrigins).toEqual(["https://a.example", "https://b.example"]);
    expect(found.settings).toEqual({ theme: "dark" });
  });

  it("второй проект с тем же name не сохраняется: код 23505", async () => {
    const repository = dataSource.getRepository(Project);
    await repository.save(repository.create({ name: "dup" }));

    const error = await repository.save(repository.create({ name: "dup" })).catch((e) => e);

    expect(error.driverError?.code).toBe(uniqueViolationCode);
  });

  it("проекты с разными name сохраняются", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "one" }));
    await repository.save(repository.create({ name: "two" }));

    expect(await repository.count()).toBe(2);
  });
});
