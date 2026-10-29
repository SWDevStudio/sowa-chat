import type { DataSource } from "typeorm";
import type { CheckContext, CheckFinding } from "./environment-check.js";
import {
  postgresSchemaChangesCheck,
  postgresSuperuserCheck,
  postgresVersionCheck,
} from "./postgres-checks.js";
import { registeredEnvironmentChecks } from "./registered-environment-checks.js";

type Settings = CheckContext["settings"];

const productionSettings: Settings = {
  env: "production",
  publicUrl: "https://chat.example.com",
  s3PublicUrl: "https://chat.example.com/storage",
  databaseUrl: "postgres://sowa:own-password@db.internal:5432/sowa",
  migrationDatabaseUrl: undefined,
  s3SecretKey: "own-s3-secret",
};

function contextWith(
  query: ReturnType<typeof vi.fn>,
  settings: Partial<Settings> = {},
): CheckContext {
  return {
    settings: { ...productionSettings, ...settings },
    dataSource: { query } as unknown as DataSource,
    redis: {} as CheckContext["redis"],
  };
}

function answering(rows: unknown[]): ReturnType<typeof vi.fn> {
  return vi.fn(async () => rows);
}

function finding(level: CheckFinding["level"], message: string): CheckFinding {
  return { level, message };
}

const superuserMessage =
  "the application connects to PostgreSQL as a superuser: use a separate user without superuser rights";
const schemaMessage =
  "the application user can change the database schema and SOWA_MIGRATION_DATABASE_URL is not set: run migrations under a separate user and revoke CREATE on schema public from the application user";
const oldVersionMessage =
  "PostgreSQL server_version_num 170004 is older than 18: upgrade to PostgreSQL 18 or later";

describe("postgresVersionCheck", () => {
  it("называется postgresVersion и работает и при старте, и в doctor", () => {
    expect(postgresVersionCheck.name).toBe("postgresVersion");
    expect(postgresVersionCheck.onlyInDoctor).toBe(false);
  });

  it("читает версию через SHOW server_version_num", async () => {
    const query = answering([{ server_version_num: "180006" }]);

    await postgresVersionCheck.run(contextWith(query));

    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith("SHOW server_version_num");
  });

  it("при 180006 не находит проблем", async () => {
    const findings = await postgresVersionCheck.run(
      contextWith(answering([{ server_version_num: "180006" }])),
    );

    expect(findings).toEqual([]);
  });

  it("при 180000 не находит проблем: граница включена", async () => {
    const findings = await postgresVersionCheck.run(
      contextWith(answering([{ server_version_num: "180000" }])),
    );

    expect(findings).toEqual([]);
  });

  it("при 170004 даёт stop со значением и просьбой обновиться", async () => {
    const findings = await postgresVersionCheck.run(
      contextWith(answering([{ server_version_num: "170004" }])),
    );

    expect(findings).toEqual([finding("stop", oldVersionMessage)]);
  });

  it("при 179999 даёт stop: граница исключена", async () => {
    const findings = await postgresVersionCheck.run(
      contextWith(answering([{ server_version_num: "179999" }])),
    );

    expect(findings).toHaveLength(1);
    expect(findings[0]?.level).toBe("stop");
  });

  it("выполняется и в development", async () => {
    const query = answering([{ server_version_num: "170004" }]);

    const findings = await postgresVersionCheck.run(contextWith(query, { env: "development" }));

    expect(query).toHaveBeenCalledTimes(1);
    expect(findings).toEqual([finding("stop", oldVersionMessage)]);
  });
});

describe("postgresSuperuserCheck", () => {
  it("называется postgresSuperuser и работает и при старте, и в doctor", () => {
    expect(postgresSuperuserCheck.name).toBe("postgresSuperuser");
    expect(postgresSuperuserCheck.onlyInDoctor).toBe(false);
  });

  it("в production при isSuperuser true даёт warn", async () => {
    const findings = await postgresSuperuserCheck.run(
      contextWith(answering([{ isSuperuser: true }])),
    );

    expect(findings).toEqual([finding("warn", superuserMessage)]);
  });

  it("в production при isSuperuser false не находит проблем", async () => {
    const findings = await postgresSuperuserCheck.run(
      contextWith(answering([{ isSuperuser: false }])),
    );

    expect(findings).toEqual([]);
  });

  it("читает rolsuper из pg_roles для current_user", async () => {
    const query = answering([{ isSuperuser: false }]);

    await postgresSuperuserCheck.run(contextWith(query));

    expect(query).toHaveBeenCalledTimes(1);
    const sql = String(query.mock.calls[0]?.[0]);
    expect(sql).toContain("rolsuper");
    expect(sql).toContain("pg_roles");
    expect(sql).toContain("current_user");
  });

  it("в development не выполняет запросов и не находит проблем", async () => {
    const query = answering([{ isSuperuser: true }]);

    const findings = await postgresSuperuserCheck.run(contextWith(query, { env: "development" }));

    expect(query).not.toHaveBeenCalled();
    expect(findings).toEqual([]);
  });
});

describe("postgresSchemaChangesCheck", () => {
  const migrationDatabaseUrl = "postgres://migrator:other-password@db.internal:5432/sowa";

  it("называется postgresSchemaChanges и работает и при старте, и в doctor", () => {
    expect(postgresSchemaChangesCheck.name).toBe("postgresSchemaChanges");
    expect(postgresSchemaChangesCheck.onlyInDoctor).toBe(false);
  });

  it("в production без migrationDatabaseUrl при canChangeSchema true даёт warn", async () => {
    const findings = await postgresSchemaChangesCheck.run(
      contextWith(answering([{ canChangeSchema: true }])),
    );

    expect(findings).toEqual([finding("warn", schemaMessage)]);
  });

  it("в production без migrationDatabaseUrl при canChangeSchema false не находит проблем", async () => {
    const findings = await postgresSchemaChangesCheck.run(
      contextWith(answering([{ canChangeSchema: false }])),
    );

    expect(findings).toEqual([]);
  });

  it("проверяет право CREATE на схему public и владение таблицами", async () => {
    const query = answering([{ canChangeSchema: false }]);

    await postgresSchemaChangesCheck.run(contextWith(query));

    expect(query).toHaveBeenCalledTimes(1);
    const sql = String(query.mock.calls[0]?.[0]);
    expect(sql).toContain("has_schema_privilege(current_user, 'public', 'CREATE')");
    expect(sql).toContain("pg_tables");
    expect(sql).toContain("tableowner = current_user");
    expect(sql).toContain('"canChangeSchema"');
  });

  it("с migrationDatabaseUrl не выполняет запросов и не находит проблем", async () => {
    const query = answering([{ canChangeSchema: true }]);

    const findings = await postgresSchemaChangesCheck.run(
      contextWith(query, { migrationDatabaseUrl }),
    );

    expect(query).not.toHaveBeenCalled();
    expect(findings).toEqual([]);
  });

  it("в development не выполняет запросов и не находит проблем", async () => {
    const query = answering([{ canChangeSchema: true }]);

    const findings = await postgresSchemaChangesCheck.run(
      contextWith(query, { env: "development" }),
    );

    expect(query).not.toHaveBeenCalled();
    expect(findings).toEqual([]);
  });
});

describe("registeredEnvironmentChecks", () => {
  it("содержит три проверки PostgreSQL в конце списка в этом порядке", () => {
    const tail = registeredEnvironmentChecks.slice(-3);

    expect(tail).toEqual([
      postgresVersionCheck,
      postgresSuperuserCheck,
      postgresSchemaChangesCheck,
    ]);
  });
});
