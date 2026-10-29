import { DataSource } from "typeorm";
import { Project } from "../src/domain/projects/project.entity.js";
import { databaseMigrations } from "../src/infra/database/database-migrations.js";
import { AddProjectsOperatorAllowedOrigins1793300003000 } from "../src/infra/database/migrations/1793300003000-AddProjectsOperatorAllowedOrigins.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  udt_name: string;
  is_nullable: string;
}

const uniqueViolationCode = "23505";
const notNullViolationCode = "23502";
const operatorColumn = "operator_allowed_origins";
const projectColumnsSql =
  "SELECT column_name FROM information_schema.columns WHERE table_name = 'projects'";

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

  it("имеет колонки нужных типов", async () => {
    const rows: ColumnRow[] = await dataSource.query(
      "SELECT column_name, data_type, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'projects'",
    );
    const byName = new Map(rows.map((row) => [row.column_name, row]));

    expect([...byName.keys()].sort()).toEqual([
      "allowed_origins",
      "created_at",
      "id",
      "name",
      "operator_allowed_origins",
      "public_key",
      "settings",
    ]);
    expect(byName.get("public_key")).toMatchObject({ data_type: "text", is_nullable: "YES" });
    expect(byName.get("id")).toMatchObject({ data_type: "uuid", is_nullable: "NO" });
    expect(byName.get("name")).toMatchObject({ data_type: "text", is_nullable: "NO" });
    expect(byName.get("allowed_origins")).toMatchObject({
      data_type: "ARRAY",
      udt_name: "_text",
      is_nullable: "NO",
    });
    expect(byName.get("operator_allowed_origins")).toMatchObject({
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
    expect(found.operatorAllowedOrigins).toEqual([]);
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

  it("сохраняет operatorAllowedOrigins, а allowedOrigins остаётся пустым", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(
      repository.create({ name: "admin", operatorAllowedOrigins: ["https://admin.example"] }),
    );
    const found = await repository.findOneByOrFail({ name: "admin" });

    expect(found.operatorAllowedOrigins).toEqual(["https://admin.example"]);
    expect(found.allowedOrigins).toEqual([]);
  });

  it("сохраняет оба списка независимо друг от друга", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(
      repository.create({
        name: "both",
        allowedOrigins: ["https://site.example"],
        operatorAllowedOrigins: ["https://admin.example", "https://admin2.example"],
      }),
    );
    const found = await repository.findOneByOrFail({ name: "both" });

    expect(found.allowedOrigins).toEqual(["https://site.example"]);
    expect(found.operatorAllowedOrigins).toEqual([
      "https://admin.example",
      "https://admin2.example",
    ]);
  });

  it("строка, вставленная сырым SQL без колонки, получает пустой operator_allowed_origins", async () => {
    await dataSource.query("INSERT INTO projects (name) VALUES ('raw')");
    const rows: { operator_allowed_origins: string[] }[] = await dataSource.query(
      "SELECT operator_allowed_origins FROM projects WHERE name = 'raw'",
    );

    expect(rows[0]?.operator_allowed_origins).toEqual([]);
  });

  it("NULL в operator_allowed_origins не принимается: код 23502", async () => {
    const error = await dataSource
      .query(`INSERT INTO projects (name, ${operatorColumn}) VALUES ('nul', NULL)`)
      .catch((e) => e);

    expect(error.code).toBe(notNullViolationCode);
  });

  describe("миграция AddProjectsOperatorAllowedOrigins", () => {
    it("есть в databaseMigrations и стоит позже AddProjectsPublicKey", () => {
      const names = databaseMigrations.map((migration) => migration.name);
      const operatorIndex = names.indexOf("AddProjectsOperatorAllowedOrigins1793300003000");
      const publicKeyIndex = names.indexOf("AddProjectsPublicKey1793300002000");

      expect(publicKeyIndex).toBeGreaterThanOrEqual(0);
      expect(operatorIndex).toBeGreaterThan(publicKeyIndex);
    });

    it("имя миграции совпадает с именем класса", () => {
      expect(new AddProjectsOperatorAllowedOrigins1793300003000().name).toBe(
        "AddProjectsOperatorAllowedOrigins1793300003000",
      );
    });

    it("применённая миграция записана в таблицу migrations", async () => {
      const rows: { name: string }[] = await dataSource.query("SELECT name FROM migrations");

      expect(
        rows.some((row) => row.name === "AddProjectsOperatorAllowedOrigins1793300003000"),
      ).toBe(true);
    });

    it("down удаляет колонку, up возвращает её с пустым значением по умолчанию", async () => {
      const migration = new AddProjectsOperatorAllowedOrigins1793300003000();
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.startTransaction();
      try {
        await migration.down(queryRunner);
        const afterDown: { column_name: string }[] = await queryRunner.query(projectColumnsSql);

        await migration.up(queryRunner);
        await queryRunner.query("INSERT INTO projects (name) VALUES ('after-up')");
        const afterUp: { column_name: string }[] = await queryRunner.query(projectColumnsSql);
        const inserted: { operator_allowed_origins: string[] }[] = await queryRunner.query(
          "SELECT operator_allowed_origins FROM projects WHERE name = 'after-up'",
        );

        const columnsAfterDown = afterDown.map((row) => row.column_name);
        const columnsAfterUp = afterUp.map((row) => row.column_name);
        expect(columnsAfterDown).not.toContain(operatorColumn);
        expect(columnsAfterDown).toContain("allowed_origins");
        expect(columnsAfterUp).toContain(operatorColumn);
        expect(inserted[0]?.operator_allowed_origins).toEqual([]);
      } finally {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
      }
    });
  });

  it("второй проект с тем же name не сохраняется: код 23505", async () => {
    const repository = dataSource.getRepository(Project);
    await repository.save(repository.create({ name: "dup" }));

    const error = await repository.save(repository.create({ name: "dup" })).catch((e) => e);

    expect(error.driverError?.code).toBe(uniqueViolationCode);
  });

  it("сохраняет проект с publicKey и читает его обратно", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "keyed", publicKey: "pk_abc" }));
    const found = await repository.findOneByOrFail({ name: "keyed" });

    expect(found.publicKey).toBe("pk_abc");
  });

  it("проект без publicKey читается с null", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "nokey" }));
    const found = await repository.findOneByOrFail({ name: "nokey" });

    expect(found.publicKey).toBeNull();
  });

  it("второй проект с тем же publicKey не сохраняется: код 23505", async () => {
    const repository = dataSource.getRepository(Project);
    await repository.save(repository.create({ name: "first", publicKey: "pk_same" }));

    const error = await repository
      .save(repository.create({ name: "second", publicKey: "pk_same" }))
      .catch((e) => e);

    expect(error.driverError?.code).toBe(uniqueViolationCode);
  });

  it("два проекта без publicKey сохраняются", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "n1" }));
    await repository.save(repository.create({ name: "n2" }));

    expect(await repository.count()).toBe(2);
  });

  it("проекты с разными publicKey сохраняются", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "k1", publicKey: "pk_1" }));
    await repository.save(repository.create({ name: "k2", publicKey: "pk_2" }));

    expect(await repository.count()).toBe(2);
  });

  it("проекты с разными name сохраняются", async () => {
    const repository = dataSource.getRepository(Project);

    await repository.save(repository.create({ name: "one" }));
    await repository.save(repository.create({ name: "two" }));

    expect(await repository.count()).toBe(2);
  });
});
