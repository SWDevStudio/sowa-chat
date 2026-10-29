import type { CheckContext, CheckFinding, EnvironmentCheck } from "./environment-check.js";

const minimumServerVersionNum = 180000;

const superuserSql = `SELECT rolsuper AS "isSuperuser" FROM pg_roles WHERE rolname = current_user`;

const schemaChangesSql = `SELECT has_schema_privilege(current_user, 'public', 'CREATE')
    OR EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tableowner = current_user)
    AS "canChangeSchema"`;

const superuserMessage =
  "the application connects to PostgreSQL as a superuser: use a separate user without superuser rights";

const schemaChangesMessage =
  "the application user can change the database schema and SOWA_MIGRATION_DATABASE_URL is not set: run migrations under a separate user and revoke CREATE on schema public from the application user";

interface ServerVersionRow {
  server_version_num: string;
}

interface SuperuserRow {
  isSuperuser: boolean;
}

interface SchemaChangesRow {
  canChangeSchema: boolean;
}

function versionFindings(serverVersionNum: number): CheckFinding[] {
  if (serverVersionNum >= minimumServerVersionNum) {
    return [];
  }
  return [
    {
      level: "stop",
      message: `PostgreSQL server_version_num ${serverVersionNum} is older than 18: upgrade to PostgreSQL 18 or later`,
    },
  ];
}

export const postgresVersionCheck: EnvironmentCheck = {
  name: "postgresVersion",
  onlyInDoctor: false,
  run: async ({ dataSource }: CheckContext) => {
    const [row] = await dataSource.query<ServerVersionRow[]>("SHOW server_version_num");
    return versionFindings(Number(row?.server_version_num));
  },
};

export const postgresSuperuserCheck: EnvironmentCheck = {
  name: "postgresSuperuser",
  onlyInDoctor: false,
  run: async ({ settings, dataSource }: CheckContext) => {
    if (settings.env === "development") {
      return [];
    }
    const [row] = await dataSource.query<SuperuserRow[]>(superuserSql);
    if (row?.isSuperuser !== true) {
      return [];
    }
    return [{ level: "warn", message: superuserMessage }];
  },
};

export const postgresSchemaChangesCheck: EnvironmentCheck = {
  name: "postgresSchemaChanges",
  onlyInDoctor: false,
  run: async ({ settings, dataSource }: CheckContext) => {
    if (settings.env === "development" || settings.migrationDatabaseUrl !== undefined) {
      return [];
    }
    const [row] = await dataSource.query<SchemaChangesRow[]>(schemaChangesSql);
    if (row?.canChangeSchema !== true) {
      return [];
    }
    return [{ level: "warn", message: schemaChangesMessage }];
  },
};
